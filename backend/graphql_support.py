import json
import graphene
from tornado.web import RequestHandler

from .game import Game, STORE


class GameType(graphene.ObjectType):
    id = graphene.ID(required=True)
    players = graphene.List(graphene.String)
    board = graphene.List(graphene.List(graphene.Int))


# TODO: Make this all Relay-compatible, nodes and edges and all sorts, too
class Query(graphene.ObjectType):
    games = graphene.Field(graphene.List(graphene.ID))
    game = graphene.Field(GameType, id=graphene.ID(required=True))

    def resolve_games(self, info):
        return STORE.list()

    def resolve_game(self, info, id):
        return STORE.get(id)


class CreateGameInput(graphene.InputObjectType):
    players = graphene.List(graphene.String)
    board = graphene.List(graphene.List(graphene.Int))


class CreateGame(graphene.Mutation):
    class Arguments:
        game_data = CreateGameInput(required=True)

    id = graphene.ID()

    @staticmethod
    def mutate(self, info, game_data):
        new_game = Game(game_data.players, game_data.board)
        STORE.add(new_game)
        return CreateGame(id=new_game.id)


class UpdateGameInput(graphene.InputObjectType):
    id = graphene.ID()
    board = graphene.List(graphene.List(graphene.Int))


class UpdateGame(graphene.Mutation):
    class Arguments:
        game_data = UpdateGameInput(required=True)

    id = graphene.ID()

    @staticmethod
    def mutate(self, info, game_data):
        game = STORE.get(game_data.id)
        game.board = game_data.board
        return UpdateGame(id=game.id)


class Mutations(graphene.ObjectType):
    create_game = CreateGame.Field()
    update_game = UpdateGame.Field()


SCHEMA = graphene.Schema(query=Query, mutation=Mutations)


class GraphQLHandler(RequestHandler):
    def _write_result(self, result):
        result_data = {}
        if result.data:
            result_data['data'] = result.data
        if result.errors:
            result_data['errors'] = [e.args[0] for e in result.errors]
        self.write(result_data)

    def get(self):
        try:
            query = self.get_query_argument('query')
            variables = self.get_query_argument('variables', None)
            # operation_name = self.get_query_argument('operationName', None)
            result = SCHEMA.execute(query, variable_values=variables)
            self._write_result(result)
        except Exception as exc:
            self.set_status(400)
            self.write({'errors': exc.args})

    def post(self):
        try:
            body = self.request.body.decode('utf8')
            if 'application/graphql' in self.request.headers.get('content-type', ''):
                # treat http body as graphql query
                query = body
                variables = None
            elif 'application/json' in self.request.headers.get('content-type', ''):
                data = json.loads(body)
                query = data['query']
                variables = data.get('variables', None)
                # operation_name = data.get('operationName', None)
            else:
                raise AssertionError('Unsupported Content-Type')
        except Exception as exc:
            self.set_status(400)
            self.write({'errors': exc.args})

        result = SCHEMA.execute(query, variable_values=variables)
        self._write_result(result)


if __name__ == '__main__':
    import sys

    STORE.add(Game(id='abcd', players=['Alice', 'Bob'], board=[[0, 1, 0], [1, 0, 1], [0, 1, 0]]))

    result = SCHEMA.execute(sys.argv[1])
    print('data:', result.data)
    print('errors:', result.errors)

    print('registry state:', STORE.games)

from typing import Text, Tuple, Dict
import uuid



class GameStore:
    games: Dict[Text, 'Game']  = None

    def __init__(self):
        self.games = {}

    def get(self, game_id):
        return self.games.get(game_id)

    def add(self, game):
        self.games[game.id] = game

    def remove(self, game_id):
        del self.games[game_id]

    def list(self):
        return list(self.games.keys())

    def all(self):
        return list(self.games.values())


class Game:

    id: Text
    players: Tuple[Text]
    board: Tuple[Tuple[int]]

    def __init__(self, players, board, id=None, registry=None):
        self._registry = registry or _REGISTRY
        self.id = id or uuid.uuid4().hex
        self.players = players
        self.board = board

    def __repr__(self):
        return f'Game(id={self.id}, players={self.players}, board={self.board})'

    def to_json(self):
        return {
            "type": self.__class__.__name__,
            "id": self.id,
            "attributes": {
                "players": self.players,
                "board": self.board,
            }
        }


STORE = GameStore()

# Continuum Analytics: UI Coding Challenge

Your mission, should you choose to accept it, is to implement a two-player game
of [Tic-tac-toe](https://en.wikipedia.org/wiki/Tic-tac-toe) in the web
browser.

The basic requirements for the game are:
  - display a 3x3 game board
  - allow two players to enter their names, and automatically assign one of
    them the circle and the other the 'x'
  - allow each to play a turn, one at a time, during which the player selects
    a square of the board and it is filled in with their symbol
  - indicate when one of the players has won, or the game is a draw

In addition to implementing basic gameplay, the user must be able to save their
game to the server.

Since this is an UI coding challenge, the success of your mission depends on building a good UI. This includes:
 - attractive design implemented in HTML & CSS
 - a working game, with clear controls
 - clear, concise, and ideally well-tested Javascript implementation

## Technologies

We ask that you implement the game
using [Typescript](https://www.typescriptlang.org/) and [SCSS](http://sass-lang.com/), but you may otherwise
choose the libraries you like.

## Setup

The skeleton application here is designed to work with Python 3.5 and Node.js
4.2+ -- we suggest using [conda](http://conda.pydata.org) and the
supplied
[environment.yml](http://conda.pydata.org/docs/using/envs.html#use-environment-from-file) file
to recreate the environment.

We provide a basic NPM `package.json` and Webpack configuration to build the
Typescript code -- the provided `main.ts` file should work as an entry-point,
and `hello.ts` provides a toy example of creating and importing your own
modules. There is also a basic `index.scss` with some dummy styling, which has
been tested to build correctly with this setup.

We also provide the game & HTML server, written using
the [Tornado](http://tornadoweb.org) web framework, and a `run.py` script that
should build the code and start the server running on localhost.

## Game data structure

A game consists of:
 - two players, represented by their names as strings
 - a 3x3 board, represented by an array of nine elements. The first element in the array
   represents the top left corner of the board, and the array continues left-to-right and
   top-to-bottom for the remaining squares. Each element is `null` if the square is blank,
   or either 0 or 1 to indicate which player controls the square. So, for example, a game
   between Alice and Bhopal, where Alice has won with a diagonal row of squares, might
   look like:

```json
{
  "players": ["Alice", "Bhopal"],
  "board": [   0,    1, null,
            null,    0,    1,
               0,    1,    0]
}
```

## Server API

The server roughly complies with the [JSON API](http://jsonapi.org/)
specification.

- `GET /`: The index URL simply renders the basic `index.html` template,
  including the built Javascript code. In the skeleton application, this prompts
  the user for a name to greet and then pops up an alert saying `Hello ${person}`.

- `GET /api/games`: Return a list of the `Game`s known to the server, as JSON.
  Sample response:

  ```json
  {
    "data": [
      {
        "type": "Game",
        "id": "ab4a45dee83672f",
        "attributes": {
          "players": ["Alice", "Bhopal"],
          "board": [null, null,    1,
                       0, null,    1,
                    null, null, null]
        }
      }
    ]
}
```

- `POST /api/games`: Create a new `Game`, assigning it an ID and returning the
  newly created `Game`.

- `GET /api/games/<id>`: Retrieve a `Game` by its ID, returning a `404` status
  code if no game with that ID exists.

- `POST /api/games/<id>`: Update the `Game` with the given ID, replacing its
  data with the newly `POST`ed data.

## Optional extras

For bonus points, you may choose to implement:
 - viewing & restoring saved games
 - an "AI" player option, where someone can play against the computer

## Submission

Please submit your challenge as a pull request against this repository.

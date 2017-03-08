import React from 'react';
import Header from './Header/Header';
import Board from './Board/Board';
import Players from './Players/Players';
import Game from './Game/Game';
import './index.scss';
import update from 'immutability-helper';
import 'whatwg-fetch';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.boundUpBttn = this.updateBttnState.bind(this);
    this.boundSaveGame = this.saveGame.bind(this);

    this.state = {
      players: {
        value: '',
        player: 'Player 1',
        x: '',
        o: '',
        currentPlayer: 'X'
      },
      bttnCount: 9,
      gameState: [null, null, null, null, null, null, null, null, null],
      winner: ''
    };
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Players
          handleChange={this.handlePlayerChange.bind(this)}
          handleSubmit={this.handlePlayerSubmit.bind(this)}
          player = {this.state.players.player}
          currentPlayer = {this.state.players.currentPlayer}
         />
        <Board
          updateBttnState = {this.boundUpBttn}
        />
        <Game
          x = {this.state.players.x}
          o = {this.state.players.o}
          name = {
            this.state.players[this.state.players.currentPlayer.toLowerCase()]
          }
          winner = {this.state.winner}
          saveGame = {this.boundSaveGame}
        />
      </div>
    );
  }

  handlePlayerChange(event) {
    const players = update(this.state, {
      players: {value: {$set: event.target.value}}
    });

    this.setState(players);
  }

  handlePlayerSubmit(event) {
    event.preventDefault();
    let players = '';
    const x = this.state.players.x;
    if (x === '') {
      players = update(this.state, {
        players: {
          x: {$set: this.state.players.value},
          player: {$set: 'Player 2'},
          currentPlayer: {$set: 'O'}
        }
      });

      this.setState(players);
    } else {
      players = update(this.state, {
        players: {
          o: {$set: this.state.players.value},
          currentPlayer: {$set: 'X'}
        }
      });

      // prevent new player name from renderinng in players component
      setTimeout(() => {
        this.setState(players);
      }, 300);

      document.querySelector('.players').classList.add('hidden');
      document.querySelector('.board').classList.add('visible');
      document.querySelector('.game').classList.add('visible');
    }

    document.querySelector('.players-input').value = '';
  }

  updateBttnState(event) {
    const button = event.target;
    const id = event.target.id;
    const player = this.state.players.currentPlayer;

    event.target.textContent = player;

    const state = update(this.state, {
      bttnCount: {$set: this.state.bttnCount - 1}
    });
    const gameState = update(this.state.gameState, {
      [id]: {$set: player}
    });

    this.setState(state);
    this.setState({gameState});
    button.blur();
    button.removeEventListener('click', this.boundUpBttn, true);
    this.updateCurrentPlayer();
    if (this.state.bttnCount <= 5) {
      this.updateGameState(parseInt(id, 10));
    }
  }

  updateCurrentPlayer() {
    let currentPlayer = this.state.players.currentPlayer;

    if (currentPlayer === 'X') {
      currentPlayer = update(this.state, {
        players: {
          currentPlayer: {$set: 'O'}
        }
      });
    } else {
      currentPlayer = update(this.state, {
        players: {
          currentPlayer: {$set: 'X'}
        }
      });
    }
    this.setState(currentPlayer);
  }

  saveGame() {
    const saveBttn = document.querySelector('.game-save');
    fetch('/api/games', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'players': [this.state.players.x, this.state.players.y],
        'board': this.state.gameState
      })
    });
    saveBttn.classList.add('hidden');
  }

  endGame(bttns) {
    // disable all buttons
    this.arrayify(document.querySelectorAll('button')).forEach((button) => {
      button.removeEventListener('click', this.boundUpBttn, true);
      button.classList.add('disabled');
    });
    if (bttns) {
      let winner = '';
      this.state.players.currentPlayer === 'X'
      ? winner = this.state.players.o
      : winner = this.state.players.x;
      const updateWinner = update(this.state, {
        winner: {$set: winner}
      });
      this.setState(updateWinner);
      // show player won text
      document.querySelector('.game-turn').classList.add('hidden');
      document.querySelector('.game-result').classList.add('visible');

      // highlight winning buttons
      bttns.forEach((bttn) => {
        document.getElementById(bttn).classList.remove('disabled');
        document.getElementById(bttn).classList.add('winner');
      });
    } else {
      // the game resulted in a tie
      document.querySelector('.game-turn').classList.add('hidden');
      document.querySelector('.game-tie').classList.add('visible');
    }
  }

  arrayify(nodeList) {
    return [].slice.call(nodeList);
  }

  evaluateSquares(value, value1, value2, square) {
    const gameState = this.state.gameState;

    if (value === gameState[value1] && value === gameState[value2]) {
      this.endGame([square, value1, value2]);
      return true;
    };
    return false;
  }

  updateGameState(square) {
    let row = '';
    let column = '';
    const gameState = this.state.gameState;
    const value = gameState[square];
    let winner = false;

    // check rows
    if (square > 2 && square < 6) {
      row = 'middle';
      column = square - 3;
      winner = this.evaluateSquares(value, square - 3, square + 3, square);
    } else if (square < 3) {
      winner = this.evaluateSquares(value, square + 3, square + 6, square);
      row = 'bottom';
      column = square;
    } else {
      row = 'top';
      winner = this.evaluateSquares(value, square - 3, square - 6, square);
      column = square - 6;
    }
    // winner wasn't a column, check rows next
    if (column === 0) {
      winner = this.evaluateSquares(value, square + 1, square + 2, square);
    } else if (column === 1) {
      winner = this.evaluateSquares(value, square - 1, square + 1, square);
    } else if (column === 2) {
      winner = this.evaluateSquares(value, square - 1, square - 2, square);
    }
    //  diagonalCheck
    if (square % 2 === 0) {
      if (column === 0) {
        if (row === 'bottom') {
          winner = this.evaluateSquares(value, square + 4, square + 8, square);
        } else {
          winner = this.evaluateSquares(value, square - 2, square - 4, square);
        }
      } else if (column === 1) {
        winner = this.evaluateSquares(value, square - 2, square + 2, square);
        winner = this.evaluateSquares(value, square - 4, square + 4, square);
      } else {
        if (row === 'bottom') {
          winner = this.evaluateSquares(value, square + 2, square + 4, square);
        } else {
          winner = this.evaluateSquares(value, square - 4, square - 8, square);
        }
      }
    }

    if (winner === false && this.state.bttnCount === 0) {
      this.endGame();
    }
  }
}

export default App;

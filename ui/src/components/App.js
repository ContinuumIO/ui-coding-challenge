import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Game from './Game';
import NewGame from './NewGame';
import WinnerBanner from './WinnerBanner';
import axios from 'axios';
import '../styles/App.scss';
import {
  checkForWinner,
  getWinner,
  checkForDraw,
  getCurrentPlayer
} from '../helpers/game';

class App extends Component {
  state = {
    currentGame: null,
    previousPlayers: [],
    saveError: false,
    games: []
  }

  componentDidMount() {
    axios.get('/api/games')
      .then(
        resp => {
          this.setState({
            ...this.state,
            games: resp.data.data
          });
        },

        () => {
          this.setState({
            ...this.state,
            saveError: true
          });
        }
    );
  }

  // Update the game on the server
  handleUpdateGame(game) {
    if (!game._id) {
      return;
    }

    const otherGames = this.state.games.filter(otherGame => {
      return otherGame._id !== game._id;
    });

    axios.post(`/api/games/${game._id}`, game)
      .then(
        resp => {
          this.setState({
            ...this.state,
            games: [...otherGames, resp.data],
            saveError: false
          });
        },

        () => {
          this.setState({
            ...this.state,
            saveError: true
          });
        }
    );
  }

  // When a square is clicked, update the game board
  handleSquareClick = (i) => {
    const { board } = this.state.currentGame;
    const winner = checkForWinner(board);

    // If the space is already occupied, or there is a winner, just return
    if (board[i] !== null || winner) {
      return;
    }

    // create a new copy of board
    const nextBoard = board.slice();
    nextBoard[i] = getCurrentPlayer(board);

    const nextState = {
      ...this.state,
      currentGame: {
        ...this.state.currentGame,
        board: nextBoard
      }
    };

    this.handleUpdateGame(nextState.currentGame);
    this.setState(nextState);
  }

  // Save a new game to the server, update state on completion
  handleSaveNewGame(game) {
    axios.post('/api/games', game)
      .then(
        // Successfull save of game
        resp => {
          this.setState({
            ...this.state,
            games: [...this.state.games, resp.data],
            currentGame: {
              ...this.state.currentGame,
              _id: resp.data.id
            }
          });
        },

        // Error saving game
        () => {
          this.setState({
            ...this.state,
            saveError: true
          });
        }
      );
  }

  // Create a new game
  handleStartGame = (players) => {
    const game = {
      _id: null,
      board: [null, null, null, null, null, null, null, null, null],
      players
    };

    // Persist game to server
    this.handleSaveNewGame(game);

    this.setState({
      ...this.state,
      currentGame: game
    });
  }

  // Reset the currentGame, save a reference to
  // the current players to populate the <NewGame /> component
  handleNewGameClick = () => {
    this.setState({
      ...this.state,
      previousPlayers: this.state.currentGame.players,
      currentGame: null,
      saveError: false
    });
  }

  renderGame() {
    if (this.state.currentGame) {
      const { board, players } = this.state.currentGame;

      return (
        <Game
          winner={getWinner(board)}
          draw={checkForDraw(board)}
          currentPlayer={getCurrentPlayer(board)}
          players={players}
          board={board}
          onNewGameClick={this.handleNewGameClick}
          winningSquares={checkForWinner(board) || []}
          onSquareClick={this.handleSquareClick}
        />
      );
    }
  }

  renderNewGame() {
    // Only show our <NewGame /> component if there is not a current game
    if (!this.state.currentGame) {
      return (
        <NewGame
          players={this.state.previousPlayers}
          onStartGame={this.handleStartGame}
          games={this.state.games}
        />
      );

      return null;
    }
  }

  // Show our <WinnerBanner />
  renderWinnerBanner() {
    const { board } = this.state.currentGame;
    let message = 'Great Job!';
    let winner = getWinner(this.state.currentGame.board);

    if (winner === false && checkForDraw(board)) {
      winner = 'The Cat';
      message = 'Whomp Whomp!';
    } else {
      winner = this.state.currentGame.players[winner];
    }

    if (winner) {
      return (
        <WinnerBanner
          onPlayAgain={this.handleNewGameClick}
          winner={winner}
          message={message}
        />
      );
    }
  }

  render() {
    return (
      <div className="app">
        <h1 className="title">Hal 8999 - TicTacToe</h1>
        <ReactCSSTransitionGroup
          transitionName="winner-banner"
          transitionAppear={true}
          transitionAppearTimeout={2000}
          transitionEnterTimeout={2000}
          transitionLeaveTimeout={300}
        >
          {this.state.currentGame && this.renderWinnerBanner()}
        </ReactCSSTransitionGroup>

        <ReactCSSTransitionGroup
          className="new-game-container"
          transitionName="new-game"
          transitionAppear={true}
          transitionAppearTimeout={300}
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}
        >
          {this.renderNewGame()}
        </ReactCSSTransitionGroup>

        <ReactCSSTransitionGroup
          transitionName="game"
          transitionAppear={true}
          transitionEnterTimeout={500}
          transitionAppearTimeout={500}
          transitionLeaveTimeout={500}
        >
          {this.renderGame()}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

export default App;

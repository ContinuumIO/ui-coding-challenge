import React from 'react';
import { connect } from 'react-redux';

import ScoreBoard from './scoreboard';
import ToeBoard from './toeboard';
import Buttons from './buttons';

const mapStateToProps = (state) => ({
  gameInProgress: state.get('gameInProgress'),
  gameSetupInProgress: state.get('gameSetupInProgress'),
  blankSlate: state.get('blankSlate'),
  winningPlayer: state.get('winningPlayer'),
  winningIndices: state.get('winningIndices'),
  playerOneName: state.get('playerOneName'),
  playerTwoName: state.get('playerTwoName'),
  games: state.get('games'),
  currentPlayer: state.get('currentPlayer'),
  board: state.get('board'),
  gameWon: state.get('gameWon'),
  gameDraw: state.get('gameDraw'),
  againstComputer: state.get('againstComputer'),
  notificationSystem: state.get('notificationSystem'),
})


export class Game extends React.Component {
  constructor() {
    super();
    this.createScoreBoardProps = this.createScoreBoardProps.bind(this);
    this.createToeBoardProps = this.createToeBoardProps.bind(this);
    this.createButtonsProps = this.createButtonsProps.bind(this);
  }

  createScoreBoardProps(props) {
    return {
      blankSlate: props.blankSlate,
      gameSetupInProgress: props.gameSetupInProgress,
      gameInProgress: props.gameInProgress,
      currentPlayer: props.currentPlayer,
      playerOneName: props.playerOneName,
      playerTwoName: props.playerTwoName,
      playerOneGames: props.games['0'],
      playerTwoGame: props.games['1'],
    };
  }

  createToeBoardProps(props) {
    return {
      blankSlate: props.blankSlate,
      gameSetupInProgress: props.gameSetupInProgress,
      gameInProgress: props.gameInProgress,
      currentPlayer: props.currentPlayer,
      board: props.board,
      gameWon: props.gameWon,
      gameDraw: props.gameDraw,
    }
  }

  createButtonsProps(props) {
    return {
      blankSlate: props.blankSlate,
      gameSetupInProgress: props.gameSetupInProgress,
      gameInProgress: props.gameInProgress,
    }
  }

  render () {
    return (
      <div className="container">
        <ScoreBoard {...this.createButtonsProps(this.props)} />
        <ToeBoard {...this.createToeBoardProps(this.props)} />
        <Buttons {...this.createButtonsProps(this.props)}/>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Game);

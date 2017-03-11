import React from 'react';
import { connect } from 'react-redux';

import GameInfo from './game-info';
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
    this.createGameInfoProps = this.createGameInfoProps.bind(this);
    this.createToeBoardProps = this.createToeBoardProps.bind(this);
    this.createButtonsProps = this.createButtonsProps.bind(this);
  }

  createGameInfoProps(props) {
    return {
      blankSlate: props.blankSlate,
      gameSetupInProgress: props.gameSetupInProgress,
      gameInProgress: props.gameInProgress,
      currentPlayer: props.currentPlayer,
      playerOneName: props.playerOneName,
      playerTwoName: props.playerTwoName,
      playerOneGames: props.games['0'],
      playerTwoGames: props.games['1'],
    };
  }

  createToeBoardProps(props) {
    return {
      blankSlate: props.blankSlate,
      gameSetupInProgress: props.gameSetupInProgress,
      gameInProgress: props.gameInProgress,
      currentPlayer: props.currentPlayer,
      winningIndices: props.winningIndices,
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
    let gameClasses = ['container']
    if (this.props.blankSlate) {
      gameClasses.push('blank-slate');
    } else if (this.props.gameSetupInProgress) {
      gameClasses.push('game-setup');
    } else if (this.props.gameWon) {
      gameClasses.push('game-won');
    } else if (this.props.gameDraw) {
      gameClasses.push('game-draw');
    }
    gameClasses= gameClasses.join(' ')
    return (
      <div className={gameClasses}>
        <GameInfo {...this.createGameInfoProps(this.props)} />
        <ToeBoard {...this.createToeBoardProps(this.props)} />
        <Buttons {...this.createButtonsProps(this.props)}/>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Game);

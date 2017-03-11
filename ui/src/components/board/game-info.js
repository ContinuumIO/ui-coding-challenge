import React from 'react';
import { savePlayerName } from '../../redux/actions';
import PlayerScore from './player-score';

export default class GameInfo extends React.Component {

  updateName(playerNumber, event) {
    store.dispatch(savePlayerName(playerNumber, event.target.value));
  }

  render() {
    const playerOneName = `${this.props.playerOneName}`;
    const playerTwoName = `${this.props.playerTwoName}`;
    if (this.props.blankSlate) {
      return (<div></div>);
    } else if (this.props.gameSetupInProgress) {
      return (
        <div className='name-inputs'>
          <input
            type='name'
            value={playerOneName}
            className='name-input'
            onChange={this.updateName.bind(this, 0)}
            placeholder='Player One Name'
          />
          <input
            type='name'
            value={playerTwoName}
            className='name-input'
            onChange={this.updateName.bind(this, 1)}
            placeholder="Player Two Name"
          />
        </div>);
    } else {
      if (this.props.gameWon || this.props.gameDraw) {
        let set = { 0: this.props.playerOneName,
          1: this.props.playerTwoName };
        const message = (this.props.gameWon)
          ? [`Congrats`, `${set[this.props.winningPlayer]}`, `You Won!`]
          : [`Bummer`, `it looks like this one is a`, `Draw!`];
        return (
          <div>
            <div className='overlay'>
              <div className='overlay-message large'> {message[0]} </div>
              <div className='overlay-message'> {message[1]} </div>
              <div className='overlay-message large'> {message[2]} </div>
            </div>
            <div className='scoreboard'>
              <div className='message'></div>
            </div>
          </div>
        );
      } else {
        const message = (this.props.currentPlayer === 0)
          ? `It is your turn, ${this.props.playerOneName.split(' ')[0]}`
          : `It is your turn, ${this.props.playerTwoName.split(' ')[0]}`;
        return (
            <div>
              <div className='scoreboard'>
                <div className='message'> {message} </div>
              </div>
            </div>
        );
      }
    }
  }
}

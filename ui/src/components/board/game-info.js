import React from 'react';
import { savePlayerName } from '../../redux/actions';
import PlayerScore from './player-score';

export default class GameInfo extends React.Component {

  updateName(playerNumber, event) {
    store.dispatch(savePlayerName(playerNumber, event.target.value));
  }

  render () {
    const playerOneName = `${this.props.playerOneName}`;
    const playerTwoName = `${this.props.playerTwoName}`;
    if (this.props.blankSlate) {
      return ( <div></div> );
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
        </div> );
    } else {
      if(this.props.gameWon|| this.props.gameDraw) {
        return <div className='scoreboard'></div>
      } else {
        let message = (this.props.currentPlayer === 0 ) ?
          `It is your turn, ${this.props.playerOneName.split(' ')[0]}` :
          `It is your turn, ${this.props.playerTwoName.split(' ')[0]}`;
        return (
            <div className='scoreboard'>
              <div className='message'> {message} </div>
            </div>
        );
      }
    }
  }
}

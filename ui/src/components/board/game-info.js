import React from 'react';
import { savePlayerName } from '../../redux/actions';
import PlayerScore from './player-score';

export default class GameInfo extends React.Component {

  updateName(playerNumber, event) {
    console.log(playerNumber + 'name input! ' + event.target.value)
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
      return (
          <div className='scoreboard'>
            <PlayerScore
              playerNumber={0}
              currentPlayer={this.props.currentPlayer}
              gamesWon={this.props.playerOneGames}
              playerName={this.props.playerOneName}
            />
            <PlayerScore
              playerNumber={1}
              currentPlayer={this.props.currentPlayer}
              gamesWon={this.props.playerTwoGames}
              playerName={this.props.playerTwoName}
            />
          </div>
      );
    }
  }
}

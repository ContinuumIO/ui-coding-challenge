import React from 'react';
import { connect } from 'react-redux';
const FontAwesome = require('react-fontawesome');

const mapStateToProps = (state) => ({
  playerOneName: state.get('playerOneName'),
  playerTwoName: state.get('playerTwoName'),
  gameInProgress: state.get('gameInProgress'),
  blankSlate: state.get('blankSlate'),
  gameSetupInProgress: state.get('gameSetupInProgress'),
});

export class NameDisplay extends React.Component {
  render() {
    if(this.props.blankSlate) {
      return (
        <div className='game-title'>
            <div className='splash'> Welcome to Tic Tac Toe </div>
        </div>
      )
    } else if (this.props.gameSetupInProgress) {
      return (
        <div className='game-title'>
          <div className='splash'> Enter names for the two players who wish to play </div>
        </div>
      )
    } else {
      return (
        <div className='game-title'>
          <div className='name-display'>
            <div className='player-info'>
                <div className='player-side'>
                  <FontAwesome
                    className='side-logo'
                    name='times'
                    size='3x'
                  />
                </div>
              <div className='player-name'> {this.props.playerOneName} </div>
            </div>
            <div className='player-info'>
              <div className='player-name'> {this.props.playerTwoName} </div>
              <div className='player-side'>
                <FontAwesome
                  className='side-logo'
                  name='circle-o'
                  size='3x'
                />
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default connect(mapStateToProps)(NameDisplay);

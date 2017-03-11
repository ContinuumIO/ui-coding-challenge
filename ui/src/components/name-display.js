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
    return (
      <div className='game-title'>
        { (this.props.blankSlate) ?
          <div className='splash'> Welcome to Tic Tac Toe </div> : null
        }
        {
          (this.props.gameSetupInProgress) ?
          <div className='splash'> Enter names for the two players who wish to play </div> : null
        }
        { (this.props.gameInProgress) ?
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
          </div> : null
        }
      </div>
    );
  }
}

export default connect(mapStateToProps)(NameDisplay);

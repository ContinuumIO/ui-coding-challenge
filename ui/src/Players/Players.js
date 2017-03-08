import React from 'react';
import './Players.scss';

class Player extends React.Component {
  render() {
    return (
      <form className='players' onSubmit={this.props.handleSubmit}>
        <label>
          {this.props.player} ({this.props.currentPlayer}) enter your name.
          <input className='players-input' placeholder='John Hancock' onChange={this.props.handleChange} />
        </label>
        <input className='player-submit bttn' type='submit' value='Submit' />
      </form>
    );
  }
}

export default Player;

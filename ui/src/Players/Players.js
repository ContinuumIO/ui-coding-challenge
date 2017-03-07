import React from 'react';
import './Players.scss';
import update from 'immutability-helper';

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      players: {
        value: '',
        player: 'Player 1',
        x: '',
        o: ''
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    console.log('change', event.target.value)
    // this.setState({players: {value: event.target.value}});
    // this.state.players.value = event.target.value;
    const players = update(this.state, {
      players: {value: {$set: event.target.value}}
    });

    this.setState(players);

  }
  handleSubmit(event) {
    event.preventDefault();
    const x = this.state.players.x;
    console.log('-------', this.state.players)
    if (x === '') {
      // this.setState({players: {x: this.state.value}});
      this.state.players.x = this.state.players.value;
      // this.setState({players: {player: 'Player 2'}});
      this.state.players.player = 'Player 2';
    } else {
      // this.setState({players: {y: this.state.value}});
      this.state.players.y = this.state.players.value;
      document.querySelector('.players').classList.add('hidden');
      document.querySelector('.game').classList.add('visible');
    }

    document.querySelector('.players-input').value = '';
  }

  render() {
    return(
      <form className='players' onSubmit={this.handleSubmit}>
        <label>
          {this.state.players.player}, enter your name.
          <input className='players-input' placeholder='John Hancock' onChange={this.handleChange} />
        </label>
        <input className='player-submit' type='submit' value='Submit' />
      </form>
    )
  }
}

export default Player;

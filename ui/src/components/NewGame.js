import React, { Component, PropTypes } from 'react';
import Button from './Button';
import '../styles/NewGame.scss';

class NewGame extends Component {
  state = {
    player1: this.props.players[0] || '',
    player2: this.props.players[1] || ''
  }

  static propTypes = {
    players: PropTypes.array.isRequired,
    onStartGame: PropTypes.func.isRequired
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { player1, player2 } = this.state;

    if (!player1.trim() || !player2.trim()) {
      return;
    }

    this.props.onStartGame([player1, player2]);
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    // Limit name length to 20 characters
    if (value.length > 20) {
      return;
    }

    this.setState({
      ...this.state,
      [name]: value
    });
  }

  render() {
    const { player1, player2 } = this.state;

    return (
      <div className="new-game">
        <form onSubmit={this.handleSubmit}>
          <fieldset>
            <label htmlFor="player-1">PLAYER 1</label>
            <input type="text"
              name='player1'
              value={this.state.player1}
              onChange={this.handleChange}
            />
          </fieldset>

          <fieldset>
              <label htmlFor="player-2">PLAYER 2</label>
              <input type="text"
                name='player2'
                value={this.state.player2}
                onChange={this.handleChange}
              />
          </fieldset>
          <Button type="submit" disabled={ !player1.trim() || !player2.trim() }>
            Start Game
          </Button>
        </form>
      </div>
    );
  }
}

export default NewGame;

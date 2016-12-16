import React, { Component } from 'react';
import Player from './Player';
import '../styles/Players.scss';

class Players extends Component {
  render() {
    return (
      <div className="players">
        {this.props.players.map((player, i) => (
          <Player
            key={i}
            name={player}
            symbol={i === 0 ? 'X' : 'O'}
            isWinner={this.props.winner !== false && this.props.winner === i}
            isCurrent={i === this.props.currentPlayer}
          />
        ))}
      </div>
    );
  }
}

export default Players;

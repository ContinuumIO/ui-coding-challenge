import React from 'react';
import './Game.scss';

class Game extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (this.props.winner !== nextProps.winner) {
      this.setState({ winner: nextProps.winner });
    }
  }

  arrayify(nodeList) {
    return [].slice.call(nodeList);
  }

  render() {
    return (
      <section className='game'>
        <div className='game-turn'>
          <p className='game-prompt'>Your turn, {this.props.name}</p>
          <p className='game-x'>{this.props.x} = X </p>
          <p className='game-o'>{this.props.o} = O</p>
        </div>
        <button className='game-save bttn' onClick={this.props.saveGame}>Save Game</button>
        <p className='game-result'>{this.props.winner} is the winner!!!</p>
        <p className='game-tie'>The game resulted in a tie</p>
      </section>
    );
  }
}

export default Game;

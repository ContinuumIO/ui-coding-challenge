import React from 'react';
import './Game.scss';

class Game extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  arrayify(nodeList) {
    return [].slice.call(nodeList);
  }

  render() {
    return (
      <section className='game'>
        <div className='game-turn'>
          <p className='game-prompt'>Your turn, Player 1</p>
          <p className='game-result'>Player 1 is the winner</p>
        </div>
      </section>
    );
  }
}

export default Game;

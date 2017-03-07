import React from 'react';
import Header from './Header/Header';
import Board from './Board/Board';
import Players from './Players/Players';
import Game from './Game/Game';
import './index.scss';

class App extends React.Component {
  componentDidMount() {

  }
  render() {
    return (
      <div className="App">
        <Header />
        <Players />
        <Board />
        <Game />
      </div>
    );
  }
}

export default App;

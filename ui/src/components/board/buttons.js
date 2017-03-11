import React from 'react';

import {
  newGame,
  startGame,
  saveGame,
} from '../../redux/actions';

export default class Buttons extends React.Component {
  constructor() {
    super()
    this.newGame = this.newGame.bind(this);
    this.startGame = this.startGame.bind(this);
    this.saveGame = this.saveGame.bind(this);
  }

  newGame(props) {
    if(props.gameInProgress || this.props.gameWon || this.props.gameDraw) {
      store.dispatch(newGame(true));
    } else {
      store.dispatch(newGame(false));
    }
  }

  startGame() {
    store.dispatch(startGame());
  }
  saveGame() {
    store.dispatch(saveGame());
  }

  render () {
    let buttons;
    if(this.props.blankSlate) {
      buttons =
        <div className='buttons buttons-blank-slate'>
          <div
            className='btn btn-new btn-blank-slate'
            onClick = { this.newGame.bind(this, this.props) }
          >
            Start A New Game
          </div>
        </div>
    } else if(this.props.gameSetupInProgress) {
      buttons =
        <div className='buttons buttons-blank-slate'>
          <div className='btn btn-start' onClick = { this.startGame }>
            Start Game
          </div>
        </div>
    } else {
      buttons =
        <div className='buttons'>
          <div
            className='btn btn-new'
            onClick = { this.newGame.bind(this, this.props) }
          >
            New Game
          </div>
          <div className='btn btn-save' onClick = { this.saveGame }>
            Save Game
          </div>
        </div>
    }
    return (
      <div>{buttons}</div>
    );
  }
}

import React from 'react';

export default class TopBar extends React.Component {
  render () {
    return (
      <div className='topbar'>
        <div id='oldGames'>
          <div className='btn btn-game'> Previous Games </div>
        </div>
        <div id='restartGame'>
          <div className='btn btn-game hidden'> Reset App </div>
        </div>
      </div>
    );
  }
}

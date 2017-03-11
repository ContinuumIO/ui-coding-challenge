import React from 'react';
import GameList from './saved';

import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  listOpen: state.get('listOpen'),
  waiting: state.get('waiting'),
  games: state.get('games')
});

export class TopBar extends React.Component {
  render() {
    return (
      <div className='topbar'>
        <GameList
          listOpen = {this.props.listOpen}
          waiting= {this.props.waiting}
          games = {this.props.games}
        />
        <div id='restartGame'>
          <div className='btn btn-game hidden'> Reset App </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(TopBar);

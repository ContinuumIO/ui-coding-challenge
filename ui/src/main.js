import React from 'react';
import ReactDOM from 'react-dom';
import NotificationSystem from 'react-notification-system';
import configureStore from './redux/store';
import reducer from './redux/reducers';
import AppRecord from './redux/record'



import Game from './component/game.js'
/*
import Board from './components/toe-board.js';
import Creator from './components/game-creator.js';
import Score from './components/score.js'
import GameList from './component/game-list';
*/

const store = configureStore({
  AppRecord(),
}, reducers);


window.store = store;

class App extends React.PureComponent {

  componentDidMount() {
    store.dispatch(setNotificationSystem(this.notificationSystem));
  }

  render() {
    return (
      <Provider store={store}>
        <TopBar>
        <div>
          <link rel="stylesheet" href="../assets/index.css" />
          <Game />
          <NotificationSystem
            ref={(notificationSystem) => { this.notificationSystem = notificationSystem; }}
          />
        </div>
      </Provider>
    );
  }
}

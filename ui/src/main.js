import React from 'react';
import ReactDOM from 'react-dom';
import NotificationSystem from 'react-notification-system';
import { Provider } from 'react-redux';
import configureStore from './redux/store';
import reducers from './redux/reducers';
import { AppRecord } from './redux/records';
import { setNotificationSystem } from './redux/actions';

import '../assets/index.scss';

import NameDisplay from './components/name-display';
import Game from './components/board/game';
import TopBar from './components/topbar';
/*
import Board from './components/toe-board.js';
import Creator from './components/game-creator.js';
import Score from './components/score.js'
import GameList from './component/game-list';
*/

const store = configureStore(AppRecord(), reducers);

window.store = store;

class App extends React.PureComponent {

  componentDidMount() {
    store.dispatch(setNotificationSystem(this.notificationSystem));
  }

  render() {
    return (
      <Provider store={store}>
        <div>
          <TopBar />
          <NameDisplay />
          <Game />
          <NotificationSystem
            ref={(notificationSystem) => { this.notificationSystem = notificationSystem; }}
          />
        </div>
      </Provider>
    );
  }
}

ReactDOM.render(
  <App />,
  document.querySelector('#app')
);

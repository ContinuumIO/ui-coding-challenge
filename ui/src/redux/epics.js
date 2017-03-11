import { ActionsObservable } from 'redux-observable';

import * as server from './server-ajax';
import { evalBoard } from '../board-logic';
import { doneStarting,
         gameWon,
         gameDraw,
         toggleWaiting,
         listGames,
         replaceGame
       } from './actions';

const Rx = require('rxjs/Rx');

const Observable = Rx.Observable;
/**
 * Middleware for ajax request, win-checks, and win-action
 * emission
 */
const serverConfig = {
  endpoint: 'http://localhost:8080',
  crossDomain: true
};

export function startGameObservable(store) {
  const state = store.getState();
  const playerOne = state.get('playerOneName');
  const playerTwo = state.get('playerTwoName');
  const notificationSystem = state.get('notificationSystem');
  return Observable.create((observer) => {
    if (playerOne.length > 0 && playerTwo.length > 0) {
      let response;
      server.post(serverConfig, playerOne, playerTwo).subscribe(
        (xhr) => {
          response = xhr.response;
        },
        (err) => {
          observer.error(err);
        },
        () => {
          observer.next(doneStarting(response.id));
          observer.complete();
        }
      );
    } else {
      observer.next({
        type: 'ERROR',
        payload: { message: 'Both players must input a name!' }
      });
      observer.complete();
    }
  });
}

export function checkMove(store) {
  const state = store.getState();
  const board = state.get('board');
  const players = [state.get('playerOneName'), state.get('playerTwoName')];
  const attributes = { players, board };
  const id = state.get('id');
  return Observable.create((observer) => {
    let results = evalBoard(attributes);
    if (results.gameWon) {
      server.update(serverConfig, id, attributes).subscribe(
        (xhr) => {},
        (err) => {
          observer.error(err);
        },
        () => {
          observer.next(gameWon(results.winningPlayer, results.winningIndices));
          observer.complete();
        }
      );
    } else if (results.gameDraw) {
      server.update(serverConfig, id, attributes).subscribe(
          (xhr) => {},
          (err) => {
            observer.error(err);
          },
          () => {
            observer.next(gameDraw(results.winningPlayer, results.winningIndices));
            observer.complete();
          }
      );
    }
  });
}

export function saveObservable(store) {
  const state = store.getState();
  const board = state.get('board');
  const players = [state.get('playerOneName'), state.get('playerTwoName')];
  const attributes = { players, board };
  const id = state.get('id');
  const notificationSystem = state.get('notificationSystem');
  return Observable.create((observer) => {
    server.update(serverConfig, id, attributes).subscribe(
      (xhr) => {},
      (err) => {
        observer.error(err);
      },
      () => {
        notificationSystem.addNotification({
          title: 'Game Saved',
          message: `Your game between ${players[0]} and ${players[1]} was saved.`,
          dismissible: true,
          position: 'tr',
          level: 'success'
        });
        observer.complete();
      }
    );
  });
}

export function listObservable(store) {
  const state = store.getState();
  if (state.get('listOpen') === true) {
    let response;
    return Observable.create((observer) => {
      observer.next(toggleWaiting());
      server.list(serverConfig).subscribe(
        (xhr) => {
          response = xhr.response;
        },
        (err) => {
          observer.error(err);
        },
        () => {
          if (response.data.length > 0) {
            observer.next(listGames(response.data));
          }
          observer.next(toggleWaiting());
          observer.complete();
        }
      );
    });
  } else {
    return Observable.empty();
  }
}

export function loadObservable(action, store) {
  const id = action.id;
  const notificationSystem = store.getState().get('notificationSystem');
  return Observable.create((observer) => {
    let response;
    server.get(serverConfig, id).subscribe(
      (xhr) => {
        response = xhr.response.data;
      },
      (err) => {
        observer.error(err);
      },
      () => {
        let attrs = response.attributes;
        observer.next(replaceGame(attrs));
        notificationSystem.addNotification({
          title: 'Game Saved',
          message: `A game between ${attrs.players[0]} and ${attrs.players[1]} was loaded.`,
          dismissible: true,
          position: 'tr',
          level: 'success'
        });
        observer.complete();
      }
    );
  });
}
export function saveEpic(action$, store) {
  return action$.ofType('SAVE_GAME')
                .mergeMap(action => saveObservable(store));
}

export function startGameEpic(action$, store) {
  return action$.ofType('START_GAME')
                .mergeMap(action => startGameObservable(store));
}

export function moveEpic(action$, store) {
  return action$.ofType('MAKE_MOVE')
                .mergeMap((action) => {
                  return checkMove(store);
                });
}

export function listEpic(action$, store) {
  return action$.ofType('TOGGLE_LIST')
                .mergeMap(action => listObservable(store));
}

export function loadEpic(action$, store) {
  return action$.ofType('LOAD_GAME')
                .mergeMap(action => loadObservable(action, store));
}

export function retryAndEmitError(err, source) {
  return source.startWith({ type: 'ERROR', payload: err, error: true });
}

export const wrapEpic = epic => (...args) =>
  epic(...args).catch(retryAndEmitError);

const epics = [saveEpic, startGameEpic, moveEpic, listEpic, loadEpic].map(wrapEpic);

export default epics;

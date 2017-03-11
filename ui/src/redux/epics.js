import { ActionsObservable } from 'redux-observable';

import * as server from './server-ajax';
import { evalBoard } from '../board-logic';
import { doneStarting, gameWon, gameDraw } from './actions';
const Rx = require('rxjs/Rx');

const Observable = Rx.Observable;
/**
 * Middleware for ajax request, win-checks, and win-action
 * emission
 */
const serverConfig = {
  endpoint: "http://localhost:8080",
  crossDomain: true,
};


export function notifySave(notificationSystem, playerOne, playerTwo) {
  notificationSystem.addNotification({
    title: 'Game Saved',
    message: `Your game between ${playerOne} and ${playerTwo} was saved`,
    dismissible: true,
    position: 'tr',
    level: 'success',
  });
}

export function notifyError(notificationSystem, err) {
  notificationSystem.addNotification({
    title: 'Game Saved',
    message: `${err}`,
    dismissible: true,
    position: 'tr',
    level: 'error',
  });
}

export function startGameObservable(store) {
  const state = store.getState();
  const playerOne = state.get('playerOneName');
  const playerTwo = state.get('playerTwoName');
  const notificationSystem = state.get('notificationSystem');
  return Observable.create((observer) => {
    if(playerOne.length > 0 && playerTwo.length > 0) {
      let response;
      server.post(serverConfig, playerOne, playerTwo).subscribe(observer.next(doneStarting()));
      console.log(response);
      observer.complete();
    } else {
      observer.next(notifyError(notificationSystem, "Both players must input a name!"))
      observer.complete();
    }
  })
}

export function checkMove(store) {
  const state = store.getState();
  const board = state.get('board');
  const id = state.get(id);
  return Observable.create((observer) => {
    let results;
    observer.next(results = evalBoard(board));
    if(results.gameWon) {
      server.update()
    }
  });
}

export function saveEpic(action$) {
  return action$.ofType('SAVE');
}

export function startGameEpic(action$, store) {
  return action$.ofType('START_GAME')
                .mergeMap(action => startGameObservable(store));
}

export function moveEpic(action$) {
  return action$.ofType('MAKE_MOVE')
}

export function listEpic(action$) {
  return action$.ofType('LIST_GAMES')
}

const epics = [saveEpic, startGameEpic, moveEpic, listEpic];

export default epics;

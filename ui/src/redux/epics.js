import { ActionsObservable } from 'redux-observable';

import * as server from './server-ajax';

const Rx = require('rxjs/Rx');

const Observable = Rx.Observable;
/**
 * Middleware for ajax request, win-checks, and win-action
 * emission
 */

export function saveEpic(action$) {
  return action$.ofType('SAVE');
}

export function startGameEpic(action$) {
  return action$.ofType('START_GAME');
}

export function moveEpic(action$) {
  return action$.ofType('MAKE_MOVE')
}

export function listEpic(action$) {
  return action$.ofType('LIST_GAMES')
}

import { createEpicMiddleware, combineEpics } from 'redux-observable';

import epics from './epics';

const rootEpic = combineEpics(...epics);

export const errorMiddleware = store => next => (action) => {
  if (!action.type.includes('ERROR')) {
    return next(action);
  }
  console.error(action);
  let errorText;
  if (action.payload) {
    window.payload = action.payload;
    errorText = `${payload.message}`
  } else {
    errorText = JSON.stringify(action, 2, 2);
  }
  const state = store.getState();
  const notificationSystem = state.get('notificationSystem');
  if (notificationSystem) {
    notificationSystem.addNotification({
      title: action.type,
      message: errorText,
      dismissible: true,
      position: 'tr',
      level: 'error',
    });
  }
  return next(action);
}

const middlewares = [
  createEpicMiddleware(rootEpic),
  errorMiddleware
];

const logger = require('./logger'); // eslint-disable-line global-require
middlewares.push(logger());

export default middlewares;

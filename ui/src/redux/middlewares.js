import { createEpicMiddleware, combineEpics } from 'redux-observable';

import epics from './epics';

const rootEpic = combineEpics(...epics);

const middlewares = [
  createEpicMiddleware(rootEpic)
];

const logger = require('./logger'); // eslint-disable-line global-require
middlewares.push(logger());

export default middlewares;

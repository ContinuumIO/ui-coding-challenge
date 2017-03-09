import { createEpicMiddleware, combineEpics } from 'redux-observable';

import epics from './epics';

const rootEpic = combineEpics(...epics);

const middlewares = [
  createEpicMiddleware(rootEpic)
];

export default middlewares;

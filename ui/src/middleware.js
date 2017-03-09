import { createEpicMiddleware, combineEpics } from 'redux-observable';

import epics from './epic';

const rootEpic = combineEpics(...epics);

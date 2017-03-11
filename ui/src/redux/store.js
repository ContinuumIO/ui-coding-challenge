import { createStore, applyMiddleware } from 'redux';

import middlewares from './middlewares';
import reducer from './reducers';

export default function configureStore(initialState) {
  return createStore(
    reducer,
    initialState,
    applyMiddleware(...middlewares)
  );
}

import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import { reducer } from 'redux-form';
import builderReducer from './reducer';

const middlewares = [
  // reduxImmutableStateInvariant(),
];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  combineReducers({ form: reducer, builder: builderReducer }),
  {},
  composeEnhancers(applyMiddleware(...middlewares))
);

export default store;

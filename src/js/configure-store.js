import { createStore, compose, combineReducers } from 'redux';
import { reducer } from 'redux-form';
import builderReducer from './reducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  combineReducers({ form: reducer, builder: builderReducer }),
  {},
  composeEnhancers()
);

export default store;

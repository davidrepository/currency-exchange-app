import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import currencyDuck from './ducks/currencyDuck';
import amountDuck from './ducks/amountDuck';
import historyDuck from './ducks/historyDuck';
import exchangeRateDuck from './ducks/exchangeRateDuck';

const initialState = {};

const middleware = [thunk];

const reducers = combineReducers({
  currencyDuck,
  amountDuck,
  historyDuck,
  exchangeRateDuck,
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const en = ;
const store = createStore(
  reducers,
  initialState,
  composeEnhancers(applyMiddleware(...middleware)),
);

export default store;

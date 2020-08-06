// REACT
import React, { useEffect } from 'react';
import './App.css';

// Components
import CurrencyExchange from './components/CurrencyExchange/CurrencyExchange';
import CurrencyHistory from './components/CurrencyHistory/CurrencyHistory';
import Logger from './components/Logger/Logger';

// REDUX
import { useSelector, useDispatch } from 'react-redux';

// Actions
import { fetchCurrencyList } from './redux/ducks/currencyDuck';
import { fetchExchangeRate } from './redux/ducks/exchangeRateDuck';
import { listenAmountExchangeRate } from './redux/ducks/amountDuck';
import { fetchHistory, generateCurrentDate } from './redux/ducks/historyDuck';

const App = () => {
  const dispatch = useDispatch();

  // CurrencyDuck state
  const { currencyList, fromCurrency, toCurrency } = useSelector(
    ({ currencyDuck }) => currencyDuck,
  );

  // // AmountDuck state
  const { amount, isFirstAmountActive } = useSelector(
    ({ amountDuck }) => amountDuck,
  );

  // historyDuck state
  const { dateStart, dateEnd } = useSelector(({ historyDuck }) => historyDuck);

  // ExchangeRateDuck state
  const { exchangeRate } = useSelector(
    ({ exchangeRateDuck }) => exchangeRateDuck,
  );

  useEffect(() => {
    dispatch(generateCurrentDate());
    dispatch(fetchCurrencyList());
  }, []);

  useEffect(() => {
    if (currencyList.length > 0) {
      dispatch(fetchExchangeRate(fromCurrency, toCurrency));
    }
  }, [fromCurrency, toCurrency]);

  useEffect(() => {
    if (currencyList.length > 0) {
      dispatch(fetchHistory(dateStart, dateEnd, fromCurrency, toCurrency));
    }
  }, [dateStart, dateEnd, fromCurrency, toCurrency]);

  useEffect(() => {
    if (currencyList.length > 0) {
      dispatch(
        listenAmountExchangeRate(amount, exchangeRate, isFirstAmountActive),
      );
    }
  }, [amount, exchangeRate]);

  return (
    <div className="App">
      <a
        className="repo"
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/davidrepository/currency-app"
      >
        App Github repository &#8599;
      </a>
      <Logger />
      <CurrencyExchange />
      <CurrencyHistory />
    </div>
  );
};

export default App;

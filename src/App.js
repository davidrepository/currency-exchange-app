// React
import React, { useEffect } from 'react';
import './App.css';

// Components
import CurrencyInputs from './components/InputSelect/InputSelect';
import CurrencyHistory from './components/CurrencyHistory/CurrencyHistory';
import Table from './components/Table/Table';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchCurrencyData,
  setFromCurrency,
  setToCurrency,
  fetchSelectedCurrencies,
  currencyLoading,
} from './redux/ducks/currencyDuck';

import {
  setAmount,
  setFromAmount,
  setToAmount,
  setIsFirstAmountActive,
} from './redux/ducks/amountDuck';

import {
  setDateStart,
  setDateEnd,
  generateCurrentDate,
  fetchHistory,
} from './redux/ducks/historyDuck';

const App = () => {
  const dispatch = useDispatch();

  // [SELECT] Currency
  const currencyDuck = useSelector(({ currencyDuck }) => currencyDuck);
  const {
    currencyList,
    fromCurrency,
    toCurrency,
    exchangeRate,
    currencyLoading,
  } = currencyDuck;

  // [INPUT] Amount
  const amountDuck = useSelector(({ amountDuck }) => amountDuck);
  const { amount, fromAmount, toAmount, isFirstAmountActive } = amountDuck;

  // [DATAPICKER] History
  const historyDuck = useSelector(({ historyDuck }) => historyDuck);
  const {
    dateStart,
    dateEnd,
    currencyHistoryList,
    historyLoading,
  } = historyDuck;
  // const [currencyHistoryList, setCurrencyHistoryList] = useState();

  // First run
  useEffect(() => {
    dispatch(fetchCurrencyData());
    dispatch(generateCurrentDate());
  }, []);

  // [SELECT] Currency
  useEffect(() => {
    if (!fromCurrency && !toCurrency) return;

    dispatch(fetchSelectedCurrencies(fromCurrency, toCurrency));
    dispatch(fetchHistory(dateStart, dateEnd, fromCurrency, toCurrency));

    return () => {
      dispatch(fetchSelectedCurrencies(fromCurrency, toCurrency));
      dispatch(fetchHistory(dateStart, dateEnd, fromCurrency, toCurrency));
    };
  }, [fromCurrency, toCurrency]);

  // [INPUT] Amount

  const onChangeFromAmount = e => {
    dispatch(setAmount(e.target.value));
    dispatch(setIsFirstAmountActive(true));
  };

  const onChangeToAmount = e => {
    dispatch(setAmount(e.target.value));
    dispatch(setIsFirstAmountActive(false));
  };

  const updateFromAmountInput = () => {
    dispatch(setFromAmount(amount / exchangeRate));
    dispatch(setToAmount(amount));
  };

  const updateToAmountInput = () => {
    dispatch(setFromAmount(amount));
    dispatch(setToAmount(amount * exchangeRate));
  };

  const checkWhichAmountIsActive = () => {
    if (!exchangeRate) return;
    return isFirstAmountActive
      ? updateToAmountInput()
      : updateFromAmountInput();
  };

  useEffect(() => {
    checkWhichAmountIsActive();

    return () => {
      checkWhichAmountIsActive();
    };
  }, [amount, exchangeRate]);

  // [DATE] History
  useEffect(() => {
    if (!dateStart || !dateEnd) return;
    if (!fromCurrency && !toCurrency) return;
    // use;
    dispatch(fetchHistory(dateStart, dateEnd, fromCurrency, toCurrency));

    return () => {
      dispatch(fetchHistory(dateStart, dateEnd, fromCurrency, toCurrency));
    };
  }, [dateStart, dateEnd]);

  return (
    <div className="App">
      <a
        className="repo"
        target="_blank"
        href="https://github.com/davidrepository/currency-app"
      >
        Repository Link
      </a>
      <h1>{currencyLoading ? 'Loading...' : 'Currency Exchange'}</h1>
      <CurrencyInputs
        // Currency
        currencyList={currencyList}
        selectedCurrency={fromCurrency}
        onChangeCurrency={e => dispatch(setFromCurrency(e.target.value))}
        // Amount
        amount={fromAmount}
        onChangeAmount={onChangeFromAmount}
        currencyLoading={currencyLoading}
      />
      <div className="equivalent">=</div>
      <CurrencyInputs
        currencyList={currencyList}
        selectedCurrency={toCurrency}
        onChangeCurrency={e => dispatch(setToCurrency(e.target.value))}
        // Amount
        amount={toAmount}
        onChangeAmount={onChangeToAmount}
        currencyLoading={currencyLoading}
      />
      <h1>{historyLoading ? 'Loading...' : 'History'}</h1>
      <CurrencyHistory
        label={'from'}
        currentDate={dateStart}
        onChangeDate={e => dispatch(setDateStart(e.target.value))}
      />
      <CurrencyHistory
        label={'to'}
        currentDate={dateEnd}
        onChangeDate={e => dispatch(setDateEnd(e.target.value))}
      />
      <Table
        fromCurrency={fromCurrency}
        toCurrency={toCurrency}
        currencyHistoryList={currencyHistoryList}
      />
    </div>
  );
};

export default App;

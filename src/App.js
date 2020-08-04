// React
import React, { useEffect } from 'react';
import './App.css';

// Components
import CurrencyInputs from './components/CurrencyInputs/index';
import CurrencyHistory from './components/CurrencyHistory';
import Table from './components/Table';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchCurrencyData,
  setFromCurrency,
  setToCurrency,
  setExchangeRate,
  fetchSelectedCurrencies,
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
  const { dateStart, dateEnd, currencyHistoryList } = historyDuck;
  // const [currencyHistoryList, setCurrencyHistoryList] = useState();

  // First run
  useEffect(() => {
    dispatch(fetchCurrencyData());
    dispatch(generateCurrentDate());
    checkWhichAmountIsActive();
  }, []);

  // [SELECT] Currency
  useEffect(() => {
    if (fromCurrency && toCurrency) {
      dispatch(fetchSelectedCurrencies(fromCurrency, toCurrency));
      dispatch(fetchHistory(dateStart, dateEnd, fromCurrency, toCurrency));
    }
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
  }, [amount, exchangeRate]);

  // [DATE] History
  useEffect(() => {
    if (!dateStart || !dateEnd) return;

    dispatch(fetchHistory(dateStart, dateEnd, fromCurrency, toCurrency));
  }, [dateStart, dateEnd]);

  return (
    <div className="App">
      <h1>Hello App</h1>
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
      <div>=</div>
      <CurrencyInputs
        currencyList={currencyList}
        selectedCurrency={toCurrency}
        onChangeCurrency={e => dispatch(setToCurrency(e.target.value))}
        // Amount
        amount={toAmount}
        onChangeAmount={onChangeToAmount}
        currencyLoading={currencyLoading}
      />
      <CurrencyHistory
        currentDate={dateStart}
        onChangeDate={e => dispatch(setDateStart(e.target.value))}
      />
      <CurrencyHistory
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

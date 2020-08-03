import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

// Components
import CurrencyInputs from './components/CurrencyInputs/index';
import CurrencyHistory from './components/CurrencyHistory';
import Table from './components/Table';

// Variables
const BASE_URL = 'https://api.exchangeratesapi.io';
const BASE_URL_LATEST = `${BASE_URL}/latest`;
const BASE_URL_HISTORY = `${BASE_URL}/history`;

const App = () => {
  // [SELECT] Currency
  const [currencyList, setCurrencyList] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  // [INPUT] Amount
  const [amount, setAmount] = useState(1);
  const [fromAmount, setFromAmount] = useState();
  const [toAmount, setToAmount] = useState();
  // [DATAPICKER] History
  const [dateStart, setDateStart] = useState();
  const [dateEnd, setDateEnd] = useState();
  // const [currentDate, setCurrentDate] = useState();
  const [currencyHistoryList, setCurrencyHistoryList] = useState();
  // Others
  const [exchangeRate, setExchangeRate] = useState();
  const [isFirstAmountActive, setIsFirstAmountActive] = useState(true);

  const checkWhichAmountIsActive = () => {
    if (!exchangeRate) return;
    return isFirstAmountActive
      ? updateToAmountInput()
      : updateFromAmountInput();
  };
  // First run
  useEffect(() => {
    const FirstRun = async () => {
      try {
        const getCurrencyList = await axios.get(BASE_URL_LATEST);
        const { base, rates } = getCurrencyList.data;
        const firstCurrency = Object.keys(rates)[0];
        setCurrencyList([base, ...Object.keys(rates)]);
        setFromCurrency(base);
        setToCurrency(firstCurrency);
        setExchangeRate(rates[firstCurrency]);
        checkWhichAmountIsActive();
        generateCurrentDate();
      } catch (error) {
        console.log({
          error,
          msg: 'Fetch currency list error',
        });
      }
    };

    FirstRun();
  }, []);

  // [SELECT] Currency
  useEffect(() => {
    if (fromCurrency && toCurrency) {
      const fetchSelectedCurrencies = async () => {
        try {
          const getSelectedCurrencies = await axios.get(
            `${BASE_URL_LATEST}?base=${fromCurrency}&symbols=${toCurrency}`,
          );
          const { rates } = getSelectedCurrencies.data;
          setExchangeRate(rates[Object.keys(rates)[0]]);
        } catch (error) {
          console.log({
            error,
            msg: 'fetch selected curriences error',
          });
        }
      };

      fetchSelectedCurrencies();
      fetchHistory();
    }
  }, [fromCurrency, toCurrency]);

  // [INPUT] Amount
  useEffect(() => {
    checkWhichAmountIsActive();
  }, [amount, exchangeRate]);

  const updateFromAmountInput = () => {
    setToAmount(amount);
    setFromAmount(amount / exchangeRate);
  };

  const updateToAmountInput = () => {
    setToAmount(amount * exchangeRate);
    setFromAmount(amount);
  };

  const onChangeFromAmount = e => {
    setAmount(e.target.value);
    setIsFirstAmountActive(true);
  };

  const onChangeToAmount = e => {
    setAmount(e.target.value);
    setIsFirstAmountActive(false);
  };

  // [DATE] History

  // Helpers
  const generateCurrentDate = () => {
    const currentDate = new Date();
    const firstDay = '01';
    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth() + 1;
    const dayFormat = currentDay >= 9 ? currentMonth : `0${currentDay}`;
    const monthFormat = currentMonth >= 9 ? currentMonth : `0${currentMonth}`;
    const currentYear = currentDate.getFullYear();

    const dateEndFormat = `${currentYear}-${monthFormat}-${dayFormat}`;
    const dateStartFormat = `${currentYear}-${monthFormat}-${firstDay}`;

    setDateEnd(dateEndFormat);
    setDateStart(dateStartFormat);
  };

  const fetchHistory = async () => {
    if (!dateStart || !dateEnd) return;
    try {
      const getHistory = await axios.get(
        `${BASE_URL_HISTORY}?start_at=${dateStart}&end_at=${dateEnd}&base=${fromCurrency}&symbols=${toCurrency}`,
      );
      const { rates } = getHistory.data;
      setCurrencyHistoryList(Object.entries(rates));
    } catch (error) {
      console.log({ error, msg: 'data error' });
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [dateStart, dateEnd]);

  return (
    <div className="App">
      <h1>Hello App</h1>
      <CurrencyInputs
        // Currency
        currencyList={currencyList}
        selectedCurrency={fromCurrency}
        onChangeCurrency={e => setFromCurrency(e.target.value)}
        // Amount
        amount={fromAmount}
        onChangeAmount={onChangeFromAmount}
      />
      <div>=</div>
      <CurrencyInputs
        currencyList={currencyList}
        selectedCurrency={toCurrency}
        onChangeCurrency={e => setToCurrency(e.target.value)}
        // Amount
        amount={toAmount}
        onChangeAmount={onChangeToAmount}
      />
      <CurrencyHistory
        currentDate={dateStart}
        onChangeDate={e => setDateStart(e.target.value)}
      />
      <CurrencyHistory
        currentDate={dateEnd}
        onChangeDate={e => setDateEnd(e.target.value)}
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

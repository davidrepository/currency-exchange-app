import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

// Components
import CurrencyInputs from './components/CurrencyInputs/index';

// Variables
const BASE_URL = 'https://api.exchangeratesapi.io';
const BASE_URL_LATEST = `${BASE_URL}/latest`;

const App = () => {
  // [SELECT] Currency
  const [currencyList, setCurrencyList] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  // [INPUT] Amount
  const [amount, setAmount] = useState(1);
  const [fromAmount, setFromAmount] = useState();
  const [toAmount, setToAmount] = useState();
  // Others
  const [exchangeRate, setExchangeRate] = useState();
  const [isFirstAmountActive, setIsFirstAmountActive] = useState(true);

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
      console.log({ fromCurrency, toCurrency });
    }
  }, [fromCurrency, toCurrency]);

  // Amount
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

  const checkWhichAmountIsActive = () => {
    if (!exchangeRate) return;
    return isFirstAmountActive
      ? updateToAmountInput()
      : updateFromAmountInput();
  };

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
    </div>
  );
};

export default App;

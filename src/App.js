import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

// Components
import CurrencyInputs from './components/CurrencyInputs';

// Variables
const BASE_URL = 'https://api.exchangeratesapi.io';
const BASE_URL_LATEST = `${BASE_URL}/latest`;

const App = () => {
  // [SELECT] Currency
  const [currencyList, setCurrencyList] = useState([]);

  useEffect(() => {
    const fetchCurrencyList = async () => {
      try {
        const getCurrencyList = await axios.get(BASE_URL_LATEST);
        const { base, rates } = getCurrencyList.data;
        setCurrencyList([base, ...Object.keys(rates)]);
      } catch (error) {
        console.log({ error, msg: 'Fetch currency list error' });
      }
    };

    fetchCurrencyList();
  }, []);

  return (
    <div className="App">
      <h1>Hello App</h1>
      <CurrencyInputs currencyList={currencyList} />
    </div>
  );
};

export default App;

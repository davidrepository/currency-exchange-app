// --- REACT --- //
import React from 'react';

// Components
import CurrencyInputs from './CurrencyInputs/CurrencyInputs';

// Styles
import './CurrencyExchange.css';

// --- REDUX --- //
import { useSelector, useDispatch } from 'react-redux';

// Actions
import {
  setFromCurrency,
  setToCurrency,
  reverseCurrency,
} from '../../redux/ducks/currencyDuck';

import {
  setAmount,
  setIsFirstAmountActive,
} from '../../redux/ducks/amountDuck';

const CurrencyExchange = () => {
  const dispatch = useDispatch();

  // CurrencyDuck state
  const {
    currencyList,
    fromCurrency,
    toCurrency,
    currencyListInProgress,
  } = useSelector(({ currencyDuck }) => currencyDuck);

  // AmountDuck state
  const { fromAmount, toAmount } = useSelector(({ amountDuck }) => amountDuck);

  // ExchangeRateDuck state
  const { exchangeRate, exchangeRateInProgress } = useSelector(
    ({ exchangeRateDuck }) => exchangeRateDuck,
  );

  // HistoryDuck state
  const { lastUpdateDate } = useSelector(({ historyDuck }) => historyDuck);

  return (
    <div className="section CurrencyExchange">
      <h1>Currency Exchange</h1>
      <CurrencyInputs
        currencyList={currencyList}
        selectedCurrency={fromCurrency}
        onChangeCurrency={e => dispatch(setFromCurrency(e.target.value))}
        loadingCurrencyList={currencyListInProgress}
        amount={fromAmount}
        onChangeAmount={e => dispatch(setAmount(e.target.value))}
        onFocusAmount={() => dispatch(setIsFirstAmountActive(true))}
        loadingExchangeRate={exchangeRateInProgress}
      />
      <div className="operations">
        <div className="equivalent">=</div>
        <button onClick={() => dispatch(reverseCurrency())}>
          &#8593;&#8595;
        </button>
      </div>
      <CurrencyInputs
        currencyList={currencyList}
        selectedCurrency={toCurrency}
        onChangeCurrency={e => dispatch(setToCurrency(e.target.value))}
        loadingCurrencyList={currencyListInProgress}
        amount={toAmount}
        onChangeAmount={e => dispatch(setAmount(e.target.value))}
        onFocusAmount={() => dispatch(setIsFirstAmountActive(false))}
        loadingExchangeRate={exchangeRateInProgress}
      />
      <div className="info">
        <p>
          Currently exchange rate for {fromCurrency} to {toCurrency}:{' '}
          {exchangeRate}
        </p>
        <p>Last update was at: {lastUpdateDate}</p>
      </div>
    </div>
  );
};

export default CurrencyExchange;

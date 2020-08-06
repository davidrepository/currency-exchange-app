// --- REACT --- //
import React from 'react';

// Styles
import './CurrencyInputs.css';

const InputSelectGroup = ({
  currencyList,
  amount,
  onChangeAmount,
  selectedCurrency,
  onChangeCurrency,
  onFocusAmount,
  loadingExchangeRate,
  loadingCurrencyList,
}) => {
  return (
    <div className="CurrencyInputs">
      <input
        type="number"
        className={`input ${loadingExchangeRate ? 'loading' : ''}`}
        value={amount}
        onChange={onChangeAmount}
        onFocus={onFocusAmount}
      />
      <select
        className={`select ${loadingCurrencyList ? 'loading' : ''}`}
        value={selectedCurrency}
        onChange={onChangeCurrency}
      >
        {currencyList.map(currency => {
          return (
            <option key={currency} value={currency}>
              {currency}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default InputSelectGroup;

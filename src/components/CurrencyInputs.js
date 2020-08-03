import React from 'react';

const CurrencyInputs = ({
  currencyList,
  selectedCurrency,
  onChangeCurrency,
}) => {
  return (
    <div className="CurrencyInputs">
      <p>Hello CurrencyInputs</p>
      <input></input>
      <select value={selectedCurrency} onChange={onChangeCurrency}>
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

export default CurrencyInputs;

import React from 'react';

const CurrencyInputs = ({ currencyList }) => {
  return (
    <div className="CurrencyInputs">
      <p>Hello CurrencyInputs</p>
      <input></input>
      <select>
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

import React from 'react';
import './InputSelect.css';

// const { dr } = Form;con

const CurrencyInputs = ({
  // Currency
  currencyList,
  selectedCurrency,
  onChangeCurrency,
  // Amount
  onChangeAmount,
  amount,
  currencyLoading,
  label,
}) => {
  return (
    <div className="currency-inputs">
      <label>{label}</label>
      <input value={amount} onChange={onChangeAmount} />
      <select value={selectedCurrency} onChange={onChangeCurrency}>
        {currencyList.map(currency => {
          return (
            <option key={currency} value={currency}>
              {currency}
            </option>
          );
        })}
        <option></option>
      </select>
    </div>
  );
};

export default CurrencyInputs;

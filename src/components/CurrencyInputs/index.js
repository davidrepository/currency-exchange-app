import React from 'react';

const CurrencyInputs = ({
  // Currency
  currencyList,
  selectedCurrency,
  onChangeCurrency,
  // Amount
  onChangeAmount,
  amount,
  currencyLoading,
}) => {
  return (
    <div className="CurrencyInputs">
      <p>{currencyLoading ? 'loading' : 'Hello CurrencyInputs'}</p>
      <input value={amount || ''} onChange={onChangeAmount}></input>
      <select value={selectedCurrency || ''} onChange={onChangeCurrency}>
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

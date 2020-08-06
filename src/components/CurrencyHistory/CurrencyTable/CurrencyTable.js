// --- REACT --- //
import React from 'react';

// Styles
import './CurrencyTable.css';

const Table = ({
  fromCurrency,
  toCurrency,
  currencyHistoryList,
  loadingHistory,
}) => {
  return (
    <div className={`Table ${loadingHistory ? 'loading' : ''}`}>
      {currencyHistoryList !== undefined && currencyHistoryList.length > 0 ? (
        <ul>
          <li className="row first-row">
            <div className="cell">Date</div>
            <div className="cell">
              1 {fromCurrency} = {toCurrency}
            </div>
          </li>
          {currencyHistoryList.map(val => {
            return (
              <li className="row" key={val[0]}>
                <div className="cell">{val[0]}</div>
                <div className="cell">{val[1][toCurrency]}</div>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>Couldn't find anything.</p>
      )}
    </div>
  );
};

export default Table;

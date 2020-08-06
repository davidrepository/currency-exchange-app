// --- REACT --- //
import React from 'react';

// Styles
import './Logger.css';

// --- REDUX --- //
import { useSelector } from 'react-redux';

const Logger = () => {
  const { currencyListInProgress } = useSelector(
    ({ currencyDuck }) => currencyDuck,
  );
  const { exchangeRateInProgress } = useSelector(
    ({ exchangeRateDuck }) => exchangeRateDuck,
  );
  const { historyInProgress } = useSelector(({ historyDuck }) => historyDuck);

  const renderStatus = status => {
    return status && <span className="pending">Pending...</span>;
  };

  return (
    <div className="Logger">
      <h1>Logger</h1>
      <ul>
        <li>Currency list {renderStatus(currencyListInProgress)}</li>
        <li>Exchange rate {renderStatus(exchangeRateInProgress)}</li>
        <li>History {renderStatus(historyInProgress)}</li>
      </ul>
    </div>
  );
};

export default Logger;

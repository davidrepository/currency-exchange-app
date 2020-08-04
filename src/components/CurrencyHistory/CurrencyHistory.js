import React from 'react';
import './CurrencyHistory.css';

const CurrencyHistory = ({ onChangeDate, currentDate, label }) => {
  return (
    <div className="currency-input">
      <label>{label}</label>
      <input type="date" value={currentDate || ''} onChange={onChangeDate} />
    </div>
  );
};

export default CurrencyHistory;

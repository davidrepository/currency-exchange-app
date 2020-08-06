// --- REACT --- //
import React from 'react';

// Styles
import './CurrencyHistoryInput.css';

const CurrencyHistory = ({
  onChangeDate,
  currentDate,
  label,
  loadingHistory,
}) => {
  return (
    <div className="CurrencyHistoryInput">
      <label>{label}</label>
      <input
        className={`input ${loadingHistory ? 'loading' : ''}`}
        type="date"
        value={currentDate || ''}
        onChange={onChangeDate}
      />
    </div>
  );
};

export default CurrencyHistory;

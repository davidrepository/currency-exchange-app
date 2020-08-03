import React from 'react';

const CurrencyHistory = ({ onChangeDate, currentDate }) => {
  return (
    <div className="CurrencyHistory">
      <p>Hello CurrencyHistory</p>
      <input type="date" value={currentDate || ''} onChange={onChangeDate} />
    </div>
  );
};

export default CurrencyHistory;

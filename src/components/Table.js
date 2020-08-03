import React from 'react';

const Table = ({ fromCurrency, toCurrency, currencyHistoryList }) => {
  return (
    <div className="Table">
      <p>
        1 {fromCurrency} = {toCurrency}
      </p>
      {currencyHistoryList !== undefined && currencyHistoryList.length > 0 ? (
        <table>
          <tbody>
            <tr>
              <th>Date</th>
              <th>{toCurrency}</th>
            </tr>
            {currencyHistoryList.map(val => {
              return (
                <tr key={val[0]}>
                  <td>{val[0]}</td>
                  <td>{val[1][toCurrency]}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>Couldn't find anything.</p>
      )}
    </div>
  );
};

export default Table;

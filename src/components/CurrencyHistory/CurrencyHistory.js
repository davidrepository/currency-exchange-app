// --- REACT --- //
import React from 'react';

// Styles
import './CurrencyHistory.css';

// Components
import CurrencyHistoryInput from './CurrencyHistoryInput/CurrencyHistoryInput';
import CurrencyTable from './CurrencyTable/CurrencyTable';

// --- REDUX --- //
import { useSelector, useDispatch } from 'react-redux';

// Actions
import { setDateStart, setDateEnd } from '../../redux/ducks/historyDuck';

const CurrencyHistoryPro = () => {
  const dispatch = useDispatch();

  // CurrencyDuck state
  const { fromCurrency, toCurrency } = useSelector(
    ({ currencyDuck }) => currencyDuck,
  );

  // HistoryDuck state
  const {
    dateStart,
    dateEnd,
    currencyHistoryList,
    historyInProgress,
  } = useSelector(({ historyDuck }) => historyDuck);

  return (
    <div className="section CurrencyHistory">
      <div className="side">
        <div className="sticky">
          <h1>History</h1>
          <div className="input-group">
            <CurrencyHistoryInput
              loadingHistory={historyInProgress}
              label={'from'}
              currentDate={dateStart}
              onChangeDate={e => dispatch(setDateStart(e.target.value))}
            />
            <CurrencyHistoryInput
              loadingHistory={historyInProgress}
              label={'to'}
              currentDate={dateEnd}
              onChangeDate={e => dispatch(setDateEnd(e.target.value))}
            />
          </div>
        </div>
      </div>
      <CurrencyTable
        loadingHistory={historyInProgress}
        fromCurrency={fromCurrency}
        toCurrency={toCurrency}
        currencyHistoryList={currencyHistoryList}
      />
    </div>
  );
};

export default CurrencyHistoryPro;

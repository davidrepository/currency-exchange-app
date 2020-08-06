import axios from 'axios';
import { BASE_URL_HISTORY } from '../../utils/keys';

const FETCH_CURRENCY_HISTORY_LIST_INPROGRESS =
  'FETCH_CURRENCY_HISTORY_LIST_INPROGRESS';
const FETCH_CURRENCY_HISTORY_LIST_SUCCESS =
  'FETCH_CURRENCY_HISTORY_LIST_SUCCESS';
const FETCH_CURRENCY_HISTORY_LIST_ERROR = 'FETCH_CURRENCY_HISTORY_LIST_ERROR';

const SET_DATE_START = 'SET_DATE_START';
const SET_DATE_END = 'SET_DATE_END';

const LAST_UPDATE_DATE = 'LAST_UPDATE_DATE';

const initialState = {
  currencyHistoryList: [],
  historyInProgress: false,
  dateStart: '',
  dateEnd: '',
  error: null,
  lastUpdateDate: '',
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_CURRENCY_HISTORY_LIST_INPROGRESS:
      return { ...state, historyInProgress: true };
    case FETCH_CURRENCY_HISTORY_LIST_SUCCESS:
      return {
        ...state,
        currencyHistoryList: payload,
        historyInProgress: false,
      };
    case FETCH_CURRENCY_HISTORY_LIST_ERROR:
      return { ...state, historyInProgress: false, error: payload };
    case SET_DATE_START:
      return { ...state, dateStart: payload };
    case SET_DATE_END:
      return { ...state, dateEnd: payload };
    case LAST_UPDATE_DATE:
      return { ...state, lastUpdateDate: payload };

    default:
      return state;
  }
};

const sortByNumber = (array, direction) => {
  let fun;
  if (direction === 'asc') {
    fun = (a, b) => {
      const date1 = new Date(a[0]);
      const date2 = new Date(b[0]);

      return date2 - date1;
    };
  }

  if (direction === 'desc') {
    fun = (a, b) => {
      const date1 = new Date(a[0]);
      const date2 = new Date(b[0]);

      return date1 - date2;
    };
  }

  return array.sort(fun);
};

export const generateCurrentDate = () => dispatch => {
  const currentDate = new Date();
  const firstDay = '01';

  const currentDay = currentDate.getDate();
  const dayFormat = currentDay > 9 ? currentDay : `0${currentDay}`;

  const currentMonth = currentDate.getMonth() + 1;
  const monthFormat = currentMonth > 9 ? currentMonth : `0${currentMonth}`;

  const currentYear = currentDate.getFullYear();

  const dateEndFormat = `${currentYear}-${monthFormat}-${dayFormat}`;
  const dateStartFormat = `${currentYear}-${monthFormat}-${firstDay}`;

  dispatch({ type: SET_DATE_END, payload: dateEndFormat });
  dispatch({ type: SET_DATE_START, payload: dateStartFormat });
};

export const setDateStart = payload => async dispatch => {
  dispatch({ type: SET_DATE_START, payload });
};

export const setDateEnd = payload => async dispatch => {
  dispatch({ type: SET_DATE_END, payload });
};

export const fetchHistory = (
  dateStart,
  dateEnd,
  fromCurrency,
  toCurrency,
) => async dispatch => {
  dispatch({ type: FETCH_CURRENCY_HISTORY_LIST_INPROGRESS });

  try {
    const getHistory = await axios.get(
      `${BASE_URL_HISTORY}?start_at=${dateStart}&end_at=${dateEnd}&base=${fromCurrency}&symbols=${toCurrency}`,
    );

    const { rates } = getHistory.data;
    const fetchPayload = sortByNumber(Object.entries(rates), 'asc');
    const lastUpdateDate = fetchPayload[0][0];

    dispatch({ type: LAST_UPDATE_DATE, payload: lastUpdateDate });

    dispatch({
      type: FETCH_CURRENCY_HISTORY_LIST_SUCCESS,
      payload: fetchPayload,
    });
  } catch (error) {
    dispatch({ type: FETCH_CURRENCY_HISTORY_LIST_ERROR, payload: error });
    // console.log({ error, msg: 'fetchHistory error' });
  }
};

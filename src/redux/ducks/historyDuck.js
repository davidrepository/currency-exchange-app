import axios from 'axios';
import { BASE_URL_HISTORY } from '../../utils/keys';

const SET_DATE_START = 'SET_DATE_START';
const SET_DATE_END = 'SET_DATE_END';
const SET_CURRENCY_HISTORY_LIST = 'SET_CURRENCY_HISTORY_LIST';
const HISTORY_LOADING = 'HISTORY_LOADING';

const initialState = {
  historyLoading: false,
  dateStart: '',
  dateEnd: '',
  currencyHistoryList: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case HISTORY_LOADING:
      return { ...state, historyLoading: payload };
    case SET_DATE_START:
      return { ...state, dateStart: payload };
    case SET_DATE_END:
      return { ...state, dateEnd: payload };
    case SET_CURRENCY_HISTORY_LIST:
      return { ...state, currencyHistoryList: payload };
    default:
      return state;
  }
};

export const generateCurrentDate = () => dispatch => {
  const currentDate = new Date();
  const firstDay = '01';
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth() + 1;
  const dayFormat = currentDay >= 9 ? currentMonth : `0${currentDay}`;
  const monthFormat = currentMonth >= 9 ? currentMonth : `0${currentMonth}`;
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

export const setCurrencyHistoryList = payload => async dispatch => {
  dispatch({ type: SET_CURRENCY_HISTORY_LIST, payload });
};

export const fetchHistory = (
  dateStart,
  dateEnd,
  fromCurrency,
  toCurrency,
) => async dispatch => {
  try {
    dispatch({ type: HISTORY_LOADING, payload: true });
    const getHistory = await axios.get(
      `${BASE_URL_HISTORY}?start_at=${dateStart}&end_at=${dateEnd}&base=${fromCurrency}&symbols=${toCurrency}`,
    );
    const { rates } = getHistory.data;
    dispatch(setCurrencyHistoryList(Object.entries(rates)));
    dispatch({ type: HISTORY_LOADING, payload: false });
  } catch (error) {
    console.log({ error, msg: 'data error' });
  }
};

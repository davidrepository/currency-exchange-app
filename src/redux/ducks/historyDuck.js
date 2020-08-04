import axios from 'axios';

const SET_DATE_START = 'SET_DATE_START';
const SET_DATE_END = 'SET_DATE_END';
const SET_CURRENCY_HISTORY_LIST = 'SET_CURRENCY_HISTORY_LIST';

const BASE_URL = 'https://api.exchangeratesapi.io';
const BASE_URL_LATEST = `${BASE_URL}/latest`;
const BASE_URL_HISTORY = `${BASE_URL}/history`;

const initialState = {
  dateStart: '',
  dateEnd: '',
  currencyHistoryList: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
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
    const getHistory = await axios.get(
      `${BASE_URL_HISTORY}?start_at=${dateStart}&end_at=${dateEnd}&base=${fromCurrency}&symbols=${toCurrency}`,
    );
    const { rates } = getHistory.data;
    dispatch(setCurrencyHistoryList(Object.entries(rates)));
  } catch (error) {
    console.log({ error, msg: 'data error' });
  }
};

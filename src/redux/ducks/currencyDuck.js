import axios from 'axios';
import { BASE_URL_LATEST } from '../../utils/keys';

// Variables
const LOADING_CURRENCY = 'LOADING_CURRENCY';
const SET_CURRENCY_LIST = 'SET_CURRENCY_LIST';
const SET_FROM_CURRENCY = 'SET_FROM_CURRENCY';
const SET_TO_CURRENCY = 'SET_TO_CURRENCY';
const SET_EXCHANGE_RATE = 'SET_EXCHANGE_RATE';

const initialState = {
  currencyList: [],
  currencyLoading: false,
  fromCurrency: '',
  toCurrency: '',
  exchangeRate: 0,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case LOADING_CURRENCY:
      return { ...state, currencyLoading: payload };
    case SET_CURRENCY_LIST:
      return { ...state, currencyList: payload };
    case SET_FROM_CURRENCY:
      return { ...state, fromCurrency: payload };
    case SET_TO_CURRENCY:
      return { ...state, toCurrency: payload };
    case SET_EXCHANGE_RATE:
      return { ...state, exchangeRate: payload };
    default:
      return state;
  }
};

export const fetchCurrencyData = () => async dispatch => {
  dispatch({ type: LOADING_CURRENCY, payload: true });

  try {
    const getCurrencyList = await axios.get(BASE_URL_LATEST);
    const { base, rates } = getCurrencyList.data;
    const firstCurrency = Object.keys(rates)[0];

    const setCurrencyList = [base, ...Object.keys(rates)];
    const setFromCurrency = base;
    const setToCurrency = firstCurrency;
    const setExchangeRate = rates[firstCurrency];

    dispatch({ type: SET_CURRENCY_LIST, payload: setCurrencyList });
    dispatch({ type: SET_FROM_CURRENCY, payload: setFromCurrency });
    dispatch({ type: SET_TO_CURRENCY, payload: setToCurrency });
    dispatch({ type: SET_EXCHANGE_RATE, payload: setExchangeRate });
    dispatch({ type: LOADING_CURRENCY, payload: false });
  } catch (error) {
    dispatch({ type: SET_CURRENCY_LIST, payload: [] });
    dispatch({ type: LOADING_CURRENCY, payload: false });
    console.log(error);
  }
};

export const fetchSelectedCurrencies = (
  fromCurrency,
  toCurrency,
) => async dispatch => {
  dispatch({ type: LOADING_CURRENCY, payload: true });

  try {
    const getSelectedCurrencies = await axios.get(
      `${BASE_URL_LATEST}?base=${fromCurrency}&symbols=${toCurrency}`,
    );
    const { rates } = getSelectedCurrencies.data;
    dispatch(setExchangeRate(rates[Object.keys(rates)[0]]));
    dispatch({ type: LOADING_CURRENCY, payload: false });
  } catch (error) {
    console.log({
      error,
      msg: 'fetch selected curriences error',
    });
  }
};

export const setFromCurrency = payload => async dispatch => {
  dispatch({ type: SET_FROM_CURRENCY, payload });
};

export const setToCurrency = payload => async dispatch => {
  dispatch({ type: SET_TO_CURRENCY, payload });
};

export const setExchangeRate = payload => async dispatch => {
  dispatch({ type: SET_EXCHANGE_RATE, payload });
};

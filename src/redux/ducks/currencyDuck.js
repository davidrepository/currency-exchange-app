import axios from 'axios';
import { BASE_URL_LATEST } from '../../utils/keys';

const FETCH_CURRENCY_LIST_INPROGRESS = 'FETCH_CURRENCY_LIST_INPROGRESS';
const FETCH_CURRENCY_LIST_SUCCESS = 'FETCH_CURRENCY_LIST_SUCCESS';
const FETCH_CURRENCY_LIST_ERROR = 'FETCH_CURRENCY_LIST_ERROR';
const SET_FROM_CURRENCY = 'SET_FROM_CURRENCY';
const SET_TO_CURRENCY = 'SET_TO_CURRENCY';
const REVERSE_CURRENCY = 'REVERSE_CURRENCY';

const initialState = {
  currencyList: [],
  currencyListInProgress: false,
  fromCurrency: '',
  toCurrency: '',
  error: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_CURRENCY_LIST_INPROGRESS:
      return { ...state, currencyListInProgress: true };
    case FETCH_CURRENCY_LIST_SUCCESS:
      return {
        ...state,
        currencyList: payload.currencyList,
        fromCurrency: payload.currencies.fromCurrency,
        toCurrency: payload.currencies.toCurrency,
        currencyListInProgress: false,
      };
    case FETCH_CURRENCY_LIST_ERROR:
      return {
        ...state,
        currencyListInProgress: false,
        error: payload,
      };
    case SET_FROM_CURRENCY:
      return { ...state, fromCurrency: payload };
    case SET_TO_CURRENCY:
      return { ...state, toCurrency: payload };
    case REVERSE_CURRENCY:
      return {
        ...state,
        fromCurrency: state.toCurrency,
        toCurrency: state.fromCurrency,
      };

    default:
      return state;
  }
};

export const fetchCurrencyList = () => async dispatch => {
  dispatch({ type: FETCH_CURRENCY_LIST_INPROGRESS });

  try {
    const getCurrencyList = await axios.get(BASE_URL_LATEST);
    const { base, rates } = getCurrencyList.data;

    const firstCurrency = Object.keys(rates)[0];

    const fetchedCurrencyList = [base, ...Object.keys(rates)];
    const fromCurrency = base;
    const toCurrency = firstCurrency;
    // const setExchangeRate = rates[firstCurrency];

    // const elo = fetchedCurrencyList.forEach(item => {
    //   console.log(item);
    // });

    const payload = {
      currencyList: fetchedCurrencyList,
      currencies: { fromCurrency, toCurrency },
    };

    dispatch({
      type: FETCH_CURRENCY_LIST_SUCCESS,
      payload,
    });
  } catch (error) {
    dispatch({ type: FETCH_CURRENCY_LIST_ERROR, payload: error });
    console.log(error);
  }
};

export const fetchCurrencyListInProgress = () => async dispatch => {
  dispatch({ type: FETCH_CURRENCY_LIST_INPROGRESS });
};

export const fetchCurrencyListSuccess = payload => async dispatch => {
  dispatch({ type: FETCH_CURRENCY_LIST_SUCCESS, payload });
};

export const fetchCurrencyListError = payload => async dispatch => {
  dispatch({ type: FETCH_CURRENCY_LIST_ERROR, payload });
};

export const setFromCurrency = payload => async dispatch => {
  dispatch({ type: SET_FROM_CURRENCY, payload });
};

export const setToCurrency = payload => async dispatch => {
  dispatch({ type: SET_TO_CURRENCY, payload });
};

export const reverseCurrency = () => async dispatch => {
  dispatch({ type: REVERSE_CURRENCY });
};

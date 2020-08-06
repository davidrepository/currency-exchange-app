import axios from 'axios';
import { BASE_URL_LATEST } from '../../utils/keys';

const FETCH_EXCHANGE_RATE_INPROGRESS = 'FETCH_EXCHANGE_RATE_INPROGRESS';
const FETCH_EXCHANGE_RATE_SUCCESS = 'FETCH_EXCHANGE_RATE_SUCCESS';
const FETCH_EXCHANGE_RATE_ERROR = 'FETCH_EXCHANGE_RATE_ERROR';

const UPDATE_EXCHANGE_RATE_INPROGRESS = 'UPDATE_EXCHANGE_RATE_INPROGRESS';
const UPDATE_EXCHANGE_RATE_SUCCESS = 'UPDATE_EXCHANGE_RATE_SUCCESS';
const UPDATE_EXCHANGE_RATE_ERROR = 'UPDATE_EXCHANGE_RATE_ERROR';

const initialState = {
  exchangeRate: 0,
  exchangeRateInProgress: false,
  error: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_EXCHANGE_RATE_INPROGRESS:
    case UPDATE_EXCHANGE_RATE_INPROGRESS:
      return { ...state, exchangeRateInProgress: true };
    case FETCH_EXCHANGE_RATE_SUCCESS:
    case UPDATE_EXCHANGE_RATE_SUCCESS:
      return { ...state, exchangeRate: payload, exchangeRateInProgress: false };
    case FETCH_EXCHANGE_RATE_ERROR:
    case UPDATE_EXCHANGE_RATE_ERROR:
      return {
        ...state,
        exchangeRateInProgress: false,
        error: payload,
      };

    default:
      return state;
  }
};

export const fetchExchangeRate = (
  fromCurrency,
  toCurrency,
) => async dispatch => {
  dispatch({
    type: FETCH_EXCHANGE_RATE_INPROGRESS,
  });

  try {
    const getSelectedCurrencies = await axios.get(
      `${BASE_URL_LATEST}?base=${fromCurrency}&symbols=${toCurrency}`,
    );
    const { rates } = getSelectedCurrencies.data;

    const payload = rates[Object.keys(rates)[0]];

    dispatch({
      type: FETCH_EXCHANGE_RATE_SUCCESS,
      payload,
    });
  } catch (error) {
    dispatch({
      type: FETCH_EXCHANGE_RATE_ERROR,
      payload: error,
    });
  }
};

export const updateExchangeRateSuccess = payload => async dispatch => {
  dispatch({ type: UPDATE_EXCHANGE_RATE_SUCCESS, payload });
};

// Variables
const SET_TO_AMOUNT = 'SET_TO_AMOUNT';
const SET_FROM_AMOUNT = 'SET_FROM_AMOUNT';
const SET_AMOUNT = 'SET_AMOUNT';
const SET_IS_FIRST_AMOUNT_ACTIVE = 'SET_IS_FIRST_AMOUNT_ACTIVE';

// Initial State
const initialState = {
  amount: 1,
  fromAmount: 0,
  toAmount: 0,
  isFirstAmountActive: true,
};

// Reducers
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_AMOUNT:
      return { ...state, amount: payload };
    case SET_TO_AMOUNT:
      return { ...state, toAmount: payload };
    case SET_FROM_AMOUNT:
      return { ...state, fromAmount: payload };
    case SET_IS_FIRST_AMOUNT_ACTIVE:
      return { ...state, isFirstAmountActive: payload };

    default:
      return state;
  }
};

// Actions
const setFromAmount = payload => async dispatch => {
  dispatch({ type: SET_FROM_AMOUNT, payload });
};

const setToAmount = payload => async dispatch => {
  dispatch({ type: SET_TO_AMOUNT, payload });
};

export const setAmount = payload => async dispatch => {
  dispatch({ type: SET_AMOUNT, payload });
};

export const setIsFirstAmountActive = payload => async dispatch => {
  dispatch({ type: SET_IS_FIRST_AMOUNT_ACTIVE, payload });
};

// --------------------------

const updateFromAmountInput = (amount, exchangeRate) => async dispatch => {
  dispatch(setFromAmount(amount / exchangeRate));
  dispatch(setToAmount(amount));
};

const updateToAmountInput = (amount, exchangeRate) => async dispatch => {
  dispatch(setFromAmount(amount));
  dispatch(setToAmount(amount * exchangeRate));
};

export const listenAmountExchangeRate = (
  amount,
  exchangeRate,
  isFirstAmountActive,
) => async dispatch => {
  if (isFirstAmountActive) {
    dispatch(updateToAmountInput(amount, exchangeRate));
  } else {
    dispatch(updateFromAmountInput(amount, exchangeRate));
  }
};

export const onChangeFromAmount = e => async dispatch => {
  dispatch(setFromAmount(e.target.value));
};

export const onChangeToAmount = e => async dispatch => {
  dispatch(setToAmount(e.target.value));
};

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from '../redux/ducks/counterDuck';

const Counter = () => {
  const dispatch = useDispatch();
  const count = useSelector(state => state.counterDuck.count);

  return (
    <div>
      <button onClick={() => dispatch(increment())}>+</button>
      <p>{count}</p>
      <button onClick={() => dispatch(decrement())}>-</button>
    </div>
  );
};

export default Counter;

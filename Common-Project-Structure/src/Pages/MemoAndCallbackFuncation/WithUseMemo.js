import React, { useState, useMemo, useCallback } from 'react';

export function WithUseMemo() {
  const [number, setNumber] = useState(1);
  const [inc, setInc] = useState(0);
  const [numberCalback, setNumberCallback] = useState(1);
  const [incCallback, setIncCallback] = useState(0);
  function calculateFactorial(value) {
    console.log('with use memo calculateFactorial called!');
    return value <= 0 ? 1 : value * calculateFactorial(value - 1);
  }

  // function calculateFactorialCallback(value) {
  //   console.log('with use callback calculateFactorial called!');
  //   return value <= 0 ? 1 : value * calculateFactorialCallback(value - 1);
  // }

  const factorialResult = useMemo(() => calculateFactorial(number), [number]);
  const factorialResultData = useCallback(() => {
    console.log('usecall banhefiug ');
    return 'hell';
  }, [number]);

  const onChange = (event) => {
    setNumber(Number(event.target.value));
  };
  const onChangeCallback = (event) => {
    setNumberCallback(Number(event.target.value));
  };
  const onClick = () => setInc((i) => i + 1);
  const onClickUseCallback = () => setIncCallback((i) => i + 1);

  return (
    <div>
      <div>
        Factorial of the following Number usememo
        <input type="number" value={number} onChange={onChange} />
        {` is ${factorialResult}`}
        <button type="button" onClick={onClick}>
          Increment using usememo
        </button>
        <span>{inc}</span>
      </div>
      <div>
        Factorial of the following Number use callback
        <input
          type="number"
          value={numberCalback}
          onChange={onChangeCallback}
        />
        {` is ${factorialResultData()}`}
        <button type="button" onClick={onClickUseCallback}>
          Increment using useCallback
        </button>
        <span>{incCallback}</span>
      </div>
    </div>
  );
}
export default WithUseMemo;

import React, { useState } from 'react';

export function WithoutUseMemo() {
  const [number, setNumber] = useState(1);
  const [inc, setInc] = useState(0);
  function calculateFactorial(value) {
    console.log('calculateFactorial called!');
    return value <= 0 ? 1 : value * calculateFactorial(value - 1);
  }
  const factorialResult = calculateFactorial(number);
  const onChange = (event) => {
    setNumber(Number(event.target.value));
  };
  const onClick = () => setInc((i) => i + 1);

  return (
    <div>
      Factorial of the following Number
      <input type="number" value={number} onChange={onChange} />
      {` is ${factorialResult}`}
      <button type="button" onClick={onClick}>
        Increment
      </button>
      <span>{inc}</span>
    </div>
  );
}
export default WithoutUseMemo;

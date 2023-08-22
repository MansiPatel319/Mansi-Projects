import React, { useState } from 'react';

function List({ items }) {
  console.log('renderList');
  return items.map((item, key) => (
    <div key={key}>
      item:
      {item.text}
    </div>
  ));
}

export default function App() {
  console.log('renderApp');
  const [count, setCount] = useState(0);
  const [items] = useState([
    { id: 1, text: '1' },
    { id: 2, text: '2' },
  ]);
  return (
    <div>
      <h1>{count}</h1>
      <button
        type="button"
        onClick={() => {
          setCount(count + 1);
        }}>
        inc
      </button>
      <List items={items} />
    </div>
  );
}

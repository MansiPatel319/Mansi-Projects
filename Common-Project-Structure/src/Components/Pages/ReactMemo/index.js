import React, { useEffect, useState } from 'react';

function Movie({ title, releaseDate, memo }) {
  console.log(`${memo ? '<MemoizedMovie>' : '<Movie>'} rendered`);
  return (
    <div className="border border-danger m-1 p-2">
      <div>
        <span>
          Movie title:
          {title}
        </span>
      </div>
      <div>
        Release date:
        {releaseDate}
      </div>
    </div>
  );
}

const MemoizedMovie = React.memo(Movie);

const ReactMemoExample = () => {
  const [, setToggle] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setToggle((toggle) => !toggle);
    }, 2000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="m-2">
      <h2>React Hooks - Memo()</h2>
      <span className="mt-2 mb-4">
        Use console to check performance of memo hook
      </span>
      <MemoizedMovie title="Heat" releaseDate="December 15, 1995" memo />
      <Movie title="Heat" releaseDate="December 15, 1995" memo={false} />
    </div>
  );
};

export default ReactMemoExample;

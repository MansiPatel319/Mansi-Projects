import React from 'react';

function Title() {
  console.log('Rendering Title');
  return (
    <div>
      <h2>
        React Hooks - useCallback()
      </h2>
      <span className="mt-2 mb-4">
        Use console to check optimization of react components
      </span>
    </div>
  );
}

export default React.memo(Title);

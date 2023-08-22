import React from 'react';

function Title() {
  console.log('Rendering Title');
  return (
    <div>
      <h2>
        Rendering components without any optimization hooks,
      </h2>
      <span className="mt-2 mb-4">
        Use console to check re-rendring components
      </span>
    </div>
  );
}

export default Title;

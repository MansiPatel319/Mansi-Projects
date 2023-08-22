import React from 'react';

function Button({ handleClick, children }) {
  console.log('Rendering button - ', children);
  return (
    <button className="btn btn-primary" type="submit" onClick={handleClick}>
      {children}
    </button>
  );
}

export default React.memo(Button);

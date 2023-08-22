import React from 'react';

const ErrorLabel = (props) => {
  const { error, classNameStyle } = props;
  return (
    <div>
      <span className={classNameStyle}>{error}</span>
    </div>
  );
};

export default ErrorLabel;

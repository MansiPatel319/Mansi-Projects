import React from 'react';

const Label = (props) => {
  const { label, classNameStyle } = props;
  return (
    <div>
      <span className={classNameStyle}>{label}</span>
    </div>
  );
};

export default Label;

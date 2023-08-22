/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/button-has-type */
import React from 'react';

const CustomButton = ({
  type,
  name,
  id,
  onClick,
  value,
  disabled,
  label,
  className,
}) => (
  <div>
    <button
      type={type || 'button'}
      value={value}
      disabled={disabled || false}
      onClick={onClick}
      name={name}
      id={id}
      className={className}>
      {label}
    </button>
  </div>
);

export default CustomButton;

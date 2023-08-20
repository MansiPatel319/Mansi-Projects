/* eslint-disable react/prop-types */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/button-has-type */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-closing-tag-location */
import React from 'react';

function ButtonElement(props) {
  return (
    <button
      type={props.type || 'button'}
      className={props.className || ''}
      onClick={props.onClick || ''}
    >
      {props.label || ''}
    </button>
  );
}

export default ButtonElement;

/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/require-default-props */
import React from 'react';

function ImageElement(props) {
  return (
    <img
      src={props.src || ''}
      className={props.className || ''}
      alt={props.alt || ''}
    />
  );
}

export default ImageElement;

/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/require-default-props */
import React from 'react';

function InputElement(props) {
  return (
    <>
      {props.showPreIcon ? (
        <span className={props.preIconParentClassName}>
          <span className={props.preIconChildClassName}>
            {props.preIconValue ? props.preIconValue : ''}
          </span>
        </span>
      ) : (
        <></>
      )}
      <div className={props.divClassName}>
        <input
          ref={props.inputRef}
          type={props.type || ''}
          name={props.inputName || ''}
          placeholder={props.placeholder || ''}
          className={props.className || ''}
          value={props.inputValue || ''}
          onChange={props.valueOnChange || ''}
        />
        {props.children}
      </div>
      {props.showPostIcon ? (
        <span className={props.postIconParentClassName}>
          <span className={props.postIconChildClassName}>
            {props.postIconValue ? props.postIconValue : ''}
          </span>
        </span>
      ) : (
        <></>
      )}
    </>
  );
}

export default InputElement;

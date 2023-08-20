/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

function CheckboxElement(props) {
  return (
    <>
      <input
        type="checkbox"
        checked={props.checked}
        className={props.inputClassName || ''}
        id={props.inputId || ''}
        name={props.inputName || ''}
        onChange={props.onSelect || undefined}
      />
      <label
        className={props.labelClassName || ''}
        htmlFor={props.labelHtmlFor || ''}
      >
        {props.labelText || ''}
      </label>
    </>
  );
}

export default CheckboxElement;

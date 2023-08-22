import React from 'react';
import { Form } from 'react-bootstrap';

const RadioInput = (props) => {
  const { label, inline, name, id, value, onChange, type } = props;
  return (
    <Form.Check
      inline={inline}
      label={label}
      name={name}
      type={type}
      id={id}
      value={value}
      onChange={onChange}
    />
  );
};

export default RadioInput;

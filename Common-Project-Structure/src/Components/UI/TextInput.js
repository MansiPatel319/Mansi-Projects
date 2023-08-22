import React from 'react';

const TextInput = (props) => {
  const {
    type,
    placeholder,
    name,
    value,
    onChange,
    onBlur,
    onFocus,
    classNameStyle,
    accept,
  } = props;
  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        className={classNameStyle}
        accept={accept}
      />
    </div>
  );
};

export default TextInput;

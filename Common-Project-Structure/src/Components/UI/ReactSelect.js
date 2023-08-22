import React from 'react';
import Select from 'react-select';

const SelectInput = (props) => {
  const { defaultValue, options, styles, onChange, value } = props;
  return (
    <Select
      defaultValue={defaultValue}
      options={options}
      styles={styles}
      onChange={onChange}
      value={value}
    />
  );
};

export default SelectInput;

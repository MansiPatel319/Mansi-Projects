import React from 'react';
import Select from 'react-select';

const MultiSelect = (props) => {
  const { closeMenuOnSelect, defaultValue, isMulti, options, styles } = props;
  return (
    <Select
      closeMenuOnSelect={closeMenuOnSelect}
      defaultValue={defaultValue}
      isMulti={isMulti}
      options={options}
      styles={styles}
    />
  );
};
export default MultiSelect;

import React from "react";

export interface SelectBasicProps {
  options: any[];
  handleChange: (newValue: any) => void;
  value: String;
  inputName: String;
}

const index = (props: SelectBasicProps) => {
  const {
    options,
    handleChange,
    // value
  } = props;
  return (
    <select
      defaultValue="dfggdfghdf"
      className="form-control location-select"
      onChange={(e) => handleChange(e)}
    >
      {options.map((item: any) => (
        <option value={item.key}>{item.value}</option>
      ))}
    </select>
  );
};

export default index;

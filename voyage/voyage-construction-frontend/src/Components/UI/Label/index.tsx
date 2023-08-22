import React from "react";

// css
import "./style.css";

export interface ILabelProps {
  label: string;
}

const index = (props: ILabelProps) => {
  const { label } = props;

  return (
    // <div className="label-div">
    <label>{label}</label>
    // </div>
  );
};

export default index;

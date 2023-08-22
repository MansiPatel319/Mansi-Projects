import React from "react";

// css
import "./style.css";

export interface IErrorMessageProps {
  errors?: any;
  name?: string;
  containerClass?: string;
}

const index = (props: IErrorMessageProps) => {
  const { errors, containerClass, name = "" } = props;

  return (
    <>
      {errors[`${name}`]?.type === "required" && (
        <div className={`error-message-box ${containerClass}`}>
          <p>{errors[`${name}`].message}</p>
        </div>
      )}
      {errors[`${name}`]?.type === "pattern" && (
        <div className={`error-message-box ${containerClass}`}>
          <p>{errors[`${name}`].message}</p>
        </div>
      )}
      {errors[`${name}`]?.type === "validate" && (
        <div className={`error-message-box ${containerClass}`}>
          <p>{errors[`${name}`].message}</p>
        </div>
      )}
      {errors[`${name}`]?.type === "oneOf" && (
        <div className={`error-message-box ${containerClass}`}>
          <p>{errors[`${name}`].message}</p>
        </div>
      )}
    </>
  );
};

export default index;

import React from "react";

// types
import { ButtonProps } from "./Button.types";

// css
import "./style.css";

const index = (props: ButtonProps) => {
  const {
    varient,
    buttonLabel,
    size,
    handleClick,
    disabled,
    className,
    ...rest
  } = props;

  return (
    <button
      type="button"
      className={`${varient} ${size} ${className}`}
      onClick={handleClick}
      disabled={disabled}
      {...rest}
    >
      {buttonLabel}
    </button>
  );
};

export default index;

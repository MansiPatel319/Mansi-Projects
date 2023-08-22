import React from "react";
import images from "../../../Assets/images";

// types
import { ButtonProps } from "./Button.types";

// css
import "./style.css";

const index = (props: ButtonProps) => {
  const {
    varient,
    buttonLabel,
    buttonIcon,
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
      {/* Filter <img src={images.plusTheme} alt="" />  */}
      {buttonLabel}
      {buttonIcon && <img src={images.plusTheme} alt="" />}
    </button>
  );
};

export default index;

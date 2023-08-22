import React from "react";

// css
import "./style.css";

export interface IInputProps {
  inputName?: string;
  inputType?: string;
  inputPlaceholder?: string;
  rules?: object;
  register?: any;
  iconName?: string;
  disabled?:boolean;
  id?: string;
  // min?:any
  className?: string;
  label?: string;
  handleClick?:any;
  handleIconClick?: () => void;
  minDate:any
}
const defaultClick = () => {
  
}
const disablePastDate = () => {
  const today = new Date();
  const dd = String(today.getDate() + 1).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  const yyyy = today.getFullYear();
  return yyyy + "-" + mm + "-" + dd;
};
const defaultProps: IInputProps = {
  className: "",
  register:{},
    inputName:"",
    handleClick: defaultClick,
    inputPlaceholder:"",
    inputType:"",
    // min:"",
    rules:{},
    iconName:"",
    handleIconClick: defaultClick,
    disabled: false,
    label:"",
  id: "",
  minDate:disablePastDate
};
export default function InputComponent(props: IInputProps) {
  const {
    register,
    handleClick,
    inputName,
    inputPlaceholder,
    inputType,
    rules,
    // min,
    iconName,
    handleIconClick,
    disabled,
    id,
    className = "",
    label = "",
    minDate,
    ...rest
  } = props;
  return (
    <div className="input-control">
      <input
        type={inputType}
        onClick={handleClick}
        min={minDate}
        disabled={disabled}
        className={className==="" ? `form-control` : className}
        placeholder={inputPlaceholder}
        id={id}
        {...register(inputName, rules)}
        {...rest}
      />
      {label}
      {iconName !== "" && (
        <span className="icon-group">
          <button
            type="button"
            id="show_password01"
            name="show_password"
            className="icon-button"
            onClick={handleIconClick}
          >
        <img alt="password-icon" src={iconName}  className="togglePassword" />

            {/* <span className="pass-custom-icon material-icons"></span> */}
          </button>
        </span>
      )}
    </div>
  );
}
InputComponent.defaultProps = defaultProps


// export default InputComponent;

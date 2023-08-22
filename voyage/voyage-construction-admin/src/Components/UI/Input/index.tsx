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
  disabled?: boolean;
  id?: string;
  className?: string;
  label?: string;
  handleIconClick?: () => void;
}
const defaultClick = () => {};
const defaultProps: IInputProps = {
  className: "",
  register: {},
  inputName: "",
  inputPlaceholder: "",
  inputType: "",
  rules: {},
  iconName: "",
  handleIconClick: defaultClick,
  disabled: false,
  label: "",
  id: "",
};
export default function InputComponent(props: IInputProps) {
  const {
    register,
    inputName,
    inputPlaceholder,
    inputType,
    rules,
    iconName,
    handleIconClick,
    disabled,
    id,
    className = "",
    label = "",
    ...rest
  } = props;
  return (
    <>
      <input
        type={inputType}
        disabled={disabled}
        className={className === "" ? `form-control` : className}
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
            <img
              alt="password-icon"
              src={iconName}
              className="togglePassword"
            />

            {/* <span className="pass-custom-icon material-icons"></span> */}
          </button>
        </span>
      )}
    </>
  );
}
InputComponent.defaultProps = defaultProps;

// export default InputComponent;

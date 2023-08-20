import React from "react";
import PropTypes from "prop-types";

const InputComponent = (props) => {
  return (
    <React.Fragment>
      <input
        type={props.inputType}
        placeholder={props.inputPlaceholder}
        id={props.inputID}
        name={props.inputName}
        className={props.inputClassName}
        value={props.inpValue}
        readOnly={props.inpReadonly}
        disabled={props.inpDisabled}
        size={props.inpSize}
        required={props.inpRequired}
        onClick={props.handleOnclick}
        onBlur={props.handleInpBlur}
        onChange={props.onInputChange}
        onFocus={props.handleInpfocus}
        onInput={props.handleOninput}
        onKeyUp={props.handleKeyUp}
        ref={props.handleRef}
        style={props.InputStyle}
        maxLength={props.maxLength}
      />
    </React.Fragment>
  );
};

export default InputComponent;

InputComponent.propTypes = {
  inputType: PropTypes.string,
  inputPlaceholder: PropTypes.string,
  inputID: PropTypes.any,
  inputName: PropTypes.string,
  inpValue: PropTypes.string,
  handleOninput: PropTypes.func,
  handleInpfocus: PropTypes.func,
  onInputChange: PropTypes.func,
  handleInpBlur: PropTypes.func,
  handleOnclick: PropTypes.func,
  inpSize: PropTypes.number,
  maxLength: PropTypes.number,
  inpRequired: PropTypes.bool,
  inpDisabled: PropTypes.bool,
  inpReadonly: PropTypes.bool,
  inputClassName: PropTypes.string,
};

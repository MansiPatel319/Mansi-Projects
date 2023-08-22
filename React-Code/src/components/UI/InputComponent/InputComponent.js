import React from 'react';
import PropTypes from 'prop-types';
// import '../../../assets/css/user/flexible-plans-style.css';
import '../../../assets/css/custom-forms-style.css';

const InputComponent = (props) => {
  return (
    <React.Fragment>
      <span className="custom-icon">
        <span className={`material-icons ${props.icon ? props.icon : ''}`}>
          {props.icon ? props.iconName : ''}
        </span>
      </span>
      <div className="form-group-control">
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
          accept={props.InpAccept}
          maxLength={props.inpMaxlength}
          pattern={props.inpPattern}
          required={props.inpRequired}
          autoFocus={props.inpAutofocus}
          height={props.inpHeight}
          width={props.inpWidth}
          autoComplete={props.inpAutocomplete}
          onClick={props.handleOnclick}
          onDoubleClick={props.handleDbclick}
          onMouseDown={props.handleMousedown}
          onMouseMove={props.handleMousemove}
          onMouseOut={props.handleMouseout}
          onMouseOver={props.handleMouseover}
          onMouseUp={props.handleMouseup}
          onBlur={props.handleInpBlur}
          onChange={props.onInputChange}
          onContextMenu={props.handleContextmenu}
          onFocus={props.handleInpfocus}
          onInput={props.handleOninput}
          onSubmit={props.handleOnsubmit}
          onSelect={props.onSelect}
          onKeyDown={props.handleKeydown}
          onKeyPress={props.handleInpkeypress}
          onKeyUp={props.handleOnkeyup}
          onCopy={props.handleOncopy}
        />
      </div>
    </React.Fragment>
  );
};

export default InputComponent;

InputComponent.propTypes = {
  iconName: PropTypes.string,
  InpAccept: PropTypes.string,
  icon: PropTypes.string,
  inputType: PropTypes.string,
  inputPlaceholder: PropTypes.string,
  inputID: PropTypes.any ,
  inputName: PropTypes.string,
  inpValue: PropTypes.string,
  inpPattern: PropTypes.string,
  handleOncopy: PropTypes.func,
  handleOnkeyup: PropTypes.func,
  handleInpkeypress: PropTypes.func,
  handleKeydown: PropTypes.func,
  onSelect: PropTypes.func,
  handleOnsubmit: PropTypes.func,
  handleOninput: PropTypes.func,
  handleInpfocus: PropTypes.func,
  handleContextmenu: PropTypes.func,
  onInputChange: PropTypes.func,
  handleInpBlur: PropTypes.func,
  handleMouseup: PropTypes.func,
  handleMouseover: PropTypes.func,
  handleMouseout: PropTypes.func,
  handleMousemove: PropTypes.func,
  handleMousedown: PropTypes.func,
  handleDbclick: PropTypes.func,
  handleOnclick: PropTypes.func,
  inpAutocomplete: PropTypes.func,
  inpWidth: PropTypes.number,
  inpHeight: PropTypes.number,
  inpSize: PropTypes.number,
  inpMaxlength: PropTypes.number,
  inpAutofocus: PropTypes.bool,
  inpRequired: PropTypes.bool,
  inpDisabled: PropTypes.bool,
  inpReadonly: PropTypes.bool,
  inputClassName: PropTypes.string,
};

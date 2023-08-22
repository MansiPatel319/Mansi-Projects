import React from 'react';
import PropTypes from 'prop-types';
import '../../../assets/css/custom-forms-style.css';

const CheckboxComponent = (props) => {
  return (
    <React.Fragment>
      <div className="custom-control custom-checkbox mb-45">
        <input
          type="checkbox"
          className={props.checkbocClassName}
          id={props.checkboxId}
          name={props.checkboxName}
          checked={props.checked}
          onClick={props.handleOnClick}
          disabled={props.isDisabled}
          onChange={props.handleOnChange}
        />
        <label className="custom-control-label" htmlFor="remember-me-card">
          {props.checkbocLabel}
        </label>
      </div>
    </React.Fragment>
  );
};

export default CheckboxComponent;

CheckboxComponent.propTypes = {
  checkbocLabel: PropTypes.string,
  checkbocClassName: PropTypes.string,
  checkboxId: PropTypes.string,
  checkboxName: PropTypes.string,
  isDisabled: PropTypes.bool,
  handleOnChange: PropTypes.func,
  handleOnClick: PropTypes.func,
  checked: PropTypes.bool,
};

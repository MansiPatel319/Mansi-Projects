import React from 'react';
import PropTypes from 'prop-types';
// import "../../../assets/css/creator/creator-transfer-funds-style.css";

const ButtonComponent = (props) => {
  return (
    <React.Fragment>
      <div className="general-form-btn">
        <button
          type={props.type}
          className={props.nameOfClass}
          disabled={props.onBtndisabled}
          href={props.btnHref}
          onLoad={props.handleOnload}
          onFocus={props.handleOnfocus}
          onBlur={props.handleOnblur}
          onSelect={props.handleOnselect}
          onSubmit={props.handleOnsubmit}
          onClick={props.handleOnclick}
          onDoubleClick={props.handleOndblclick}
          onMouseDown={props.handleOnmousedown}
          onMouseOut={props.handleOnmouseout}
          onMouseOver={props.handleOnmouseover}
        >
          {props.btnName}
        </button>
      </div>
    </React.Fragment>
  );
};

export default ButtonComponent;

ButtonComponent.defaultProps = {
  nameOfClass: '',
  onBtndisabled: false,
  btnHref: '',
  btnName: '',
  type: '',
  onLoad: () => {},
  handleOnload: () => {},
  handleOnfocus: () => {},
  handleOnblur: () => {},
  handleOnselect: () => {},
  handleOnsubmit: () => {},
  handleOnclick: () => {},
  handleOndblclick: () => {},
  handleOnmousedown: () => {},
  handleOnmouseout: () => {},
  handleOnmouseover: () => {},
};

ButtonComponent.propTypes = {
  btnName: PropTypes.string,
  type: PropTypes.string,
  nameOfClass: PropTypes.string,
  onBtndisabled: PropTypes.bool,
  btnHref: PropTypes.string,
  onLoad: PropTypes.func,
  handleOnload: PropTypes.func,
  handleOnfocus: PropTypes.func,
  handleOnblur: PropTypes.func,
  handleOnselect: PropTypes.func,
  handleOnsubmit: PropTypes.func,
  handleOnclick: PropTypes.func,
  handleOndblclick: PropTypes.func,
  handleOnmousedown: PropTypes.func,
  handleOnmouseout: PropTypes.func,
  handleOnmouseover: PropTypes.func,
};

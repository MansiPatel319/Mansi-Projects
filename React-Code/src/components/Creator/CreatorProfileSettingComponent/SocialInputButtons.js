import React from 'react';
import PropTypes from 'prop-types';
const SocialInputButtons = ({
  onEditClick,
  onHandleChange,
  value,
  placehoder,
  readOnly,
  socialIcon,
  name,
}) => {
  return (
    <div className="social-input-box">
      <div className="input-control-row">
        <div className="social-icon-group">
          <span className="icon-box">
            <i className={socialIcon}></i>
          </span>
          <input
            name={name}
            readOnly={readOnly}
            onChange={onHandleChange}
            type="text"
            className="form-control"
            value={value}
            placeholder={placehoder}
          />
        </div>
        <div className="abs-top-right">
          <button className="edit-btn-icon" onClick={onEditClick}>
            <i className="bg-custom-icon edit-pencil-icon"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SocialInputButtons;
SocialInputButtons.propTypes = {
  onHandleChange: PropTypes.func,
  value: PropTypes.string,
  placehoder: PropTypes.string,
  readOnly: PropTypes.bool,
  socialIcon: PropTypes.string,
  onEditClick: PropTypes.func,
  name: PropTypes.string,
};

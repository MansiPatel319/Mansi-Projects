import React from 'react';
import PropTypes from 'prop-types';

const ProfileInput = ({
  className,
  onHandleChange,
  onHandleBlur,
  value,
  placehoder,
  readOnly,
  name,
  children
}) => {
  return (
    <div className={className}>
      <input
        name={name}
        readOnly={readOnly}
        type="text"
        className="form-control  focus"
        placeholder={placehoder}
        value={value}
        onChange={onHandleChange}
        onBlur={onHandleBlur}
      />
     
    {children}
    </div>
  );
};

export default ProfileInput;
ProfileInput.propTypes = {
  onHandleChange: PropTypes.func,
  value: PropTypes.string,
  placehoder: PropTypes.string,
  readOnly: PropTypes.bool,
  onEditClick: PropTypes.func,
  name: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.any,
  onHandleBlur: PropTypes.any,
};

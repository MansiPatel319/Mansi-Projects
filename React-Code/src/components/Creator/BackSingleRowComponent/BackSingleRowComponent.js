import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const BackSingleRowComponent = ({ handleBackUrl }) => {
  return (
    <div className="col-lg-12 col-md-12 plr-10">
      <div className="back-single-root-div">
        <div className="back-single-div-row">
          <div className="back-single-div-box">
            <Link to="#" className="back-link" onClick={handleBackUrl}>
              <span className="material-icons-outlined">chevron_left</span>
              Back
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackSingleRowComponent;
BackSingleRowComponent.propTypes = {
  backUrl: PropTypes.string,
  handleBackUrl: PropTypes.func,
};

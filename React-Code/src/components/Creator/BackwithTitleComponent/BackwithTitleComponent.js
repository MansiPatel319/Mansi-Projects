import React from 'react';
import { Link } from 'react-router-dom';
import '../../../assets/css/back-banner-style.css';
import PropTypes from 'prop-types';

const BackwithTitleComponent = ({ handleBackUrl, title }) => {
  return (
    <div className="back-with-title-div">
      <div className="container container-1000">
        <div className="back-with-title-root-div">
          <div className="back-div-row">
            <div className="back-div-box">
              <Link to="#" className="back-link" onClick={handleBackUrl}>
                {'< Back'}
              </Link>
            </div>

            <div className="title-div-box">
              <h1>{title}</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackwithTitleComponent;
BackwithTitleComponent.propTypes = {
  backUrl: PropTypes.string,
  title: PropTypes.string,
  handleBackUrl: PropTypes.func,
};

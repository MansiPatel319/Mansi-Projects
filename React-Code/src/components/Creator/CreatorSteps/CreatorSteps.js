import React from 'react';

import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
const CreatorSteps = ({ header, mainClass, tabArray, getcurrentStep, children, isItMaterial }) => {
  return (
    <div className="col-lg-12 col-md-12 plr-10">
      <div className={mainClass}>
        <div className="step-black-root-row">
          <div className="step-black-heading-div">
            <div className="step-black-heading-row">
              <h2>{header}</h2>
            </div>
          </div>

          <div className="step-black-tabs-root-common">
            <div className={`step-tabs-header-common ${isItMaterial ? 'step-tabs-header-common-step2' : 'step-tabs-header-common-step3'} step-ss-01`}>
              {tabArray && tabArray.length > 0 && (
                <ul className="nav nav-tabs">
                  {tabArray.map((data) => {
                    return (
                      <li
                        className={data.id <= getcurrentStep ? 'nav-item step1 done active' : 'nav-item'}
                        key={data.id}
                      >
                        <Link
                          className={
                            data.id === getcurrentStep ? 'nav-link active show' : 'nav-link'
                          }
                          to="#"
                        >
                          <span className="root-span">
                            <span className="number-span">
                              <span className="number">{data.id}</span>
                              <span className="check-span"><span className="material-icons-outlined">check</span></span>
                              {/* {data.id} */}
                            </span>
                            <span className="text"> {data.tabName} </span>
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            <div className="step-tabs-body-common">
              <div className="tab-content step-tab-content">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatorSteps;
CreatorSteps.propTypes = {
  header: PropTypes.string,
  mainClass: PropTypes.string,
  tabArray: PropTypes.array,
  children: PropTypes.object,
  tabActive: PropTypes.string,
  onHandleChangeTab: PropTypes.func,
  getcurrentStep: PropTypes.number,
  isItMaterial: PropTypes.bool
};

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import BackSingleRowComponent from '../BackSingleRowComponent/BackSingleRowComponent';
import CreatorSteps from '../CreatorSteps/CreatorSteps';
import AddClassTabContent from './AddClassTabContent';
import '../../../assets/css/style.css';
import '../../../assets/css/creator/creator-step-main-style.css';
import '../../../assets/css/feather.min.css';
const CreatorAddClassesComponent = () => {
  const history = useHistory();
  const [tabActive, setTabActive] = useState('add_details');
  const onHandleChangeTab = (e, activeTabName) => {
    e.preventDefault();
    setTabActive(activeTabName);
  };
  const handleGoBack = () => {
    const setNextUrl = window.location.pathname;
    localStorage.setItem('next_url', setNextUrl);
    const getPrevUrl = localStorage.getItem('prev_url');
    history.push(getPrevUrl);
  };
  return (
    <div className="main-middle-area creator-main-middle-area main-bg-color">
      <div className="header-footer-with-min-height02">
        <div className="pattern-inner-div pattern-upricing-inner-div">
          <div className="relative-index">
            <section className="step-main-creator-section" id="add-a-class-section">
              <div className="step-main-creator-div">
                <div className="container container-1000">
                  <div className="row mlr-10">
                    <BackSingleRowComponent handleBackUrl={() => handleGoBack()} />
                    <CreatorSteps
                      header="Add a Class"
                      mainClass="step-black-root-div step-add-a-class-div"
                      onHandleChangeTab={onHandleChangeTab}
                      tabActive={tabActive}
                    >
                      <AddClassTabContent getcurrentStep={1} />
                    </CreatorSteps>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div >
  );
};

export default CreatorAddClassesComponent;

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import '../../../assets/css/creator/creator-step-main-style.css';
import '../../../assets/css/style.css';
import '../../../assets/css/feather.min.css';
import BackSingleRowComponent from '../BackSingleRowComponent/BackSingleRowComponent';
import CreatorSteps from '../CreatorSteps/CreatorSteps';
import ScheduleStreamTabContent from './ScheduleStreamTabContent';
import { setScheduleStreamSteps } from '../../../actions/creatorSchedleStreamAction';
const CreatorScheduleStreamComponent = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const getcurrentStep = useSelector((state) => state.CreatorScheduleStream.currentStep);
  const tabArray = [
    {
      id: 1,
      tabName: 'Add Details',
      isActive: true,
      activeTabName: 'add_details',
      activeClassName: 'nav-item step1 active',
    },
    {
      id: 2,
      tabName: 'Schedule & Fix amount',
      isActive: false,
      activeTabName: 'Schedule & Fix amount',
      activeClassName: 'nav-item active step2',
    },
    {
      id: 3,
      tabName: ' Allocate Seats ',
      isActive: false,
      activeTabName: 'Allocate Seats',
      activeClassName: 'nav-item active step3',
    },
  ];
  const [tabActive, setTabActive] = useState('add_details');
  const [tabArrayTest, setTabArrayTest] = useState(tabArray);
  const onHandleChangeTab = (e, activeTabName) => {
    e.preventDefault();
    setTabActive(activeTabName);
    const updateData = [...tabArrayTest];
    updateData.map((data) => {
      if (data.activeTabName === activeTabName) {
        data.isActive = true;
      }
    });
    setTabArrayTest(updateData);
  };
  const handleGoBack = () => {
    const getPrevUrl = localStorage.getItem('prev_url');
    const setNextUrl = window.location.pathname;
    localStorage.setItem('next_url', setNextUrl);
    history.push(getPrevUrl);
    dispatch(setScheduleStreamSteps(1));
  };
  return (
    <div className="main-middle-area creator-main-middle-area main-bg-color">
      <div className="header-footer-with-min-height02">
        <div className="pattern-inner-div pattern-upricing-inner-div">
          <div className="relative-index">
            <section className="step-main-creator-section" id="schedule-a-stream-section">
              <div className="step-main-creator-div">
                <div className="container container-970">
                  <div className="row mlr-10">
                    <BackSingleRowComponent handleBackUrl={() => handleGoBack()} />
                    <CreatorSteps
                      header="Schedule a stream"
                      mainClass="step-black-root-div"
                      tabArray={tabArrayTest}
                      onHandleChangeTab={onHandleChangeTab}
                      tabActive={tabActive}
                      getcurrentStep={getcurrentStep}
                    >
                      <ScheduleStreamTabContent getcurrentStep={getcurrentStep} />
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

export default CreatorScheduleStreamComponent;

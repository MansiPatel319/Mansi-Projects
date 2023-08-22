import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import BackSingleRowComponent from '../BackSingleRowComponent/BackSingleRowComponent';
import CreatorSteps from '../CreatorSteps/CreatorSteps';
import AddMaterialTabContent from './AddMaterialTabContent';
import { setMaterialSteps } from '../../../actions/creatorMaterialAction';
function CreatorAddMaterialComponent() {
  const history = useHistory();
  const dispatch = useDispatch();
  const getcurrentStep = useSelector((state) => state.CreatorMaterial.currentStep);
  const tabArray = [
    {
      id: 1,
      tabName: 'Choose Category ',
      isActive: true,
      activeTabName: 'choose_category',
      activeClassName: 'nav-item step1 active',
    },
    {
      id: 2,
      tabName: 'Add Details',
      isActive: false,
      activeTabName: 'add_details',
      activeClassName: 'nav-item active step2',
    },
  ];
  const [tabActive, setTabActive] = useState('choose_category');
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
    const setNextUrl = window.location.pathname;
    localStorage.setItem('next_url', setNextUrl);
    const getPrevUrl = localStorage.getItem('prev_url');
    history.push(getPrevUrl);
    dispatch(setMaterialSteps(1));
  };
  return (
    <React.Fragment>
      <section className="step-main-creator-section" id="add-material-section">
        <div className="step-main-creator-div">
          <div className="container container-970">
            <div className="row mlr-10">
              <BackSingleRowComponent handleBackUrl={() => handleGoBack()} />
              <CreatorSteps
                header="Add Material"
                mainClass="step-black-root-div step-add-material-div"
                tabArray={tabArrayTest}
                onHandleChangeTab={onHandleChangeTab}
                tabActive={tabActive}
                getcurrentStep={getcurrentStep}
                isItMaterial={true}
              >
                <AddMaterialTabContent getcurrentStep={getcurrentStep} />
              </CreatorSteps>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

export default CreatorAddMaterialComponent;

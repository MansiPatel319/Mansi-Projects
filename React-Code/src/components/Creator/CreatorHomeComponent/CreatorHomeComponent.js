import React, { useState } from 'react';
import SchedualStreamSectionComponent from './SchedualStreamSectionComponent';
import YourSchedualLiveStreamSectionComponent from './YourSchedualLiveStreamSectionComponent';
import '../../../assets/css/creator/creator-home-style.css';
import '../../../assets/css/tab-style.css';
import '../../../assets/css/style.css';
import '../../../assets/css/feather.min.css';
import ListOfSeatHolderComponent from './ListOfSeatHolderComponent';
import ViewDetailsComponent from './ViewDetailsComponent';
import DetailsOfSeatHolderComponent from './DetailsOfSeatHolderComponent';

function CreatorHomeComponent() {
  const [isModalViweDetailsActive, setIsModalViweDetailsActive] = useState(false);
  const [isModalSeatHoladerActive, setIsModalSeatHoladerActive] = useState(false);
  const [selectedStreamDetails, setSelectedStreamDetails] = useState('');
  const [selectedStreamId, setSelectedStreamId] = useState(0);

  const [selectedSessionDetails, setSelectedSessionDetails] = useState('');
  const [isModalSeatHoladerDetailsActive, setIsModalSeatHoladerDetailsActive] = useState(false);
  const handleModal = (data) => {
    setIsModalViweDetailsActive(!isModalViweDetailsActive);
    setSelectedStreamDetails(data);
  };
  const handleOpenSeatHolderModal = (e, id) => {
    e.preventDefault();
    setIsModalSeatHoladerActive(!isModalSeatHoladerActive);
    setSelectedStreamId(id);
  };

  const handleModalClose = () => {
    setIsModalViweDetailsActive(false);
    setIsModalSeatHoladerActive(false);
    setIsModalSeatHoladerDetailsActive(false);
    setSelectedStreamDetails('');
    setSelectedSessionDetails('');
  };
   const handleOpenSeatholderDetailsModal = (e, data) => {
    e.preventDefault();
    setIsModalSeatHoladerDetailsActive(!isModalSeatHoladerDetailsActive);
    setSelectedSessionDetails(data);
  };

  // const handleModalClose = () => {
  //   setIsModalViweDetailsActive(false);
  //   setIsModalSeatHoladerDetailsActive(false);
  //   setSelectedSessionDetails('');
  // };
  return (
    <React.Fragment>
      <div className="main-middle-area creator-main-middle-area main-bg-color">
        <div className="header-footer-with-min-height02">
        {isModalSeatHoladerDetailsActive && (
                                    <DetailsOfSeatHolderComponent
                                      selectedSessionDetail={selectedSessionDetails}
                                      handleModalClose={handleModalClose}
                                    />
                                  )}
                                
        {isModalSeatHoladerActive && (
        <ListOfSeatHolderComponent
          handleModalClose={handleModalClose}
          selectedStreamId={selectedStreamId}
        />
      )}
      {isModalViweDetailsActive && (
        <ViewDetailsComponent
          handleModalClose={handleModalClose}
          selectedStreamDetail={selectedStreamDetails}
        />
      )}
          <div className="pattern-inner-div pattern-upricing-inner-div">
            <div className="relative-index">
              <SchedualStreamSectionComponent />
              <YourSchedualLiveStreamSectionComponent handleOpenSeatHolderModal={handleOpenSeatHolderModal} handleModal={handleModal} handleOpenSeatholderDetailsModal={handleOpenSeatholderDetailsModal} />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default CreatorHomeComponent;

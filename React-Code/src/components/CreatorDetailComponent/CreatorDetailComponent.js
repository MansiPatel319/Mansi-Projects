import React, { useState, useEffect } from 'react';
import '../../assets/css/creators-class-details-style.css';
import '../../assets/css/style.css';
import '../../assets/css/owl-slider-style.css';
import UpComingLiveStreamComponent from '../UpComingLiveStreamComponent/UpComingLiveStreamComponent';
import CreatorsReviewComponent from '../CreatorsReviewComponent/CreatorsReviewComponent';
import CreatorDetailsBannerComponent from './CreatorDetailsBannerComponent';
import BookingModalComponent from '../BookingComponent/BookingModalComponent';
import '../../assets/css/tab-style.css';
import '../../assets/css/custom-forms-style.css';
import '../../assets/css/feather.min.css';
import AuthBookComponent from '../BookingComponent/AuthBookComponent';
import BookingComponent from '../BookingComponent/BookingComponent';
import BookingOneToOneModalComponent from '../BookingComponent/BookingOneToOneModalComponent';
import { get } from '../../network/requests';
import { getUrl } from '../../network/url';
import { useParams, useHistory } from 'react-router-dom';
import { tokenExpire } from '../../services/auth';
import { toast } from 'react-toastify';
toast.configure();
const CreatorDetailComponent = () => {
  const [isOpenAuthModal, setIsOpenAuthModal] = useState(false);
  const [isOpenBookingModal, setisOpenBookingModal] = useState(false);
  const [isOpenBookingOnetoOneModal, setIsOpenBookingOnetoOneModal] = useState(false);
  const [tabChangeHeder, settabChangeHeder] = useState('');
  const [upcomingStreamDetail, setupcomingStreamDetail] = useState('');
  const params = useParams();
  const history = useHistory();

  const getCreatorReviewData = () => {
    const url = getUrl('getUpcomingStreamDetails');
    return get(`${url}${params.id}/`, true)
      .then((response) => {
        const {
          data: { code, data, status, message },
        } = response;
        switch (code) {
          case 200:
            if (status === true) {
              setupcomingStreamDetail(data.creator_reviews);
            }
            break;
          case 400:
            toast.error(message);
            break;
          default:
            toast.error(message);
        }
      })
      .catch((error) => {
        tokenExpire(error.response, history);
      });
  };

  const handleBookNow = () => {
    setIsOpenAuthModal(true);
  };
  const handleBookNowClose = () => {
    setIsOpenAuthModal(false);
    setisOpenBookingModal(false);
    setIsOpenBookingOnetoOneModal(false);
  };
  const handleChangeTabHeader = (tabHeaderValue) => {
    settabChangeHeder(tabHeaderValue);
  };
  const handleSubmitLogin = () => {
    setIsOpenAuthModal(true);
    setisOpenBookingModal(true);
  };
  const handleOpenOneToOneModal = () => {
    setIsOpenBookingOnetoOneModal(true);
  };

  useEffect(() => {
    getCreatorReviewData();
  }, []);

  return (
    <React.Fragment>
      {isOpenAuthModal && (
        <BookingModalComponent
          header1="Login to Book"
          header2="Sign up to Book"
          handleCloseModal={handleBookNowClose}
          changeHederClass={tabChangeHeder}
        >
          <AuthBookComponent
            handleChangeTabHeader={handleChangeTabHeader}
            handleSubmitLogin={handleSubmitLogin}
          />
        </BookingModalComponent>
      )}
      {isOpenBookingModal && (
        <BookingModalComponent
          header1="Booking"
          handleCloseModal={handleBookNowClose}
          changeHederClass="common"
        >
          <BookingComponent handleOpenOneToOneModal={handleOpenOneToOneModal} />
        </BookingModalComponent>
      )}
      {isOpenBookingOnetoOneModal && (
        <BookingModalComponent
          header1="Booking"
          handleCloseModal={handleBookNowClose}
          changeHederClass="common"
        >
          <BookingOneToOneModalComponent />
        </BookingModalComponent>
      )}
      <div className="main-middle-area pt-custom-default">
        <section className="creator-class-details-section" id="creator-class-details-section">
          <div className="creator-class-details-section">
            <CreatorDetailsBannerComponent
              // creatorDetail={perticularCreatorDetailInfo}
              bookMethod={handleBookNow}
            />
          </div>
        </section>
        <CreatorsReviewComponent isClassReview={false} />
        <section className="upcoming-live-streams-section" id="upcoming-live-streams-section">
          <div className="upcoming-live-streams-div">
            <UpComingLiveStreamComponent
              header="Similar upcoming streams"
              handleBookNow={handleBookNow}
              upcomingStreamData={upcomingStreamDetail}
              handleOpenOneToOneModal={handleOpenOneToOneModal}
            />
          </div>
        </section>
      </div>
    </React.Fragment>
  );
};

export default CreatorDetailComponent;

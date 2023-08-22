import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';
import '../../../assets/css/creator/creator-popup-style.css';
import sessionImg from '../../../assets/images/latest/oto-image-full.png';
import noFilterIocnImg from '../../../assets/images/icons-filter/icon-01.png';
import ProfileImage from '../../../assets/images/profile.png';
const DetailsOfSeatHolderComponent = ({ handleModalClose, selectedSessionDetail }) => {
  const data = selectedSessionDetail?.booked_time_slot.replace('Z', '');
  return (
    <React.Fragment>
      <div
        className="modal center center-common-modal fade show"
        id="general-view-details-oto-modal"
        tabIndex="-1"
        role="dialog"
        style={{
          overflowY: 'scroll',
          paddingRight: '16px',
          display: 'block',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true" onClick={handleModalClose}>
                  {' '}
                  <i className="fe fe-x close-icon-x"></i>{' '}
                </span>
              </button>
            </div>

            <div className="modal-body">
              <div className="general-pop-root">
                <section
                  className="general-payment-section payment-details-section general-details-pop-section"
                  id="payment-details-section"
                >
                  <div className="container container-970">
                    <div className="row">
                      <div className="col-lg-12 col-md-12">
                        <div className="general-payment-div general-details-div">
                          <div className="container-general-center">
                            <div className="heading-div">
                              <div className="heading-inner-div">
                                <h1>View Details</h1>
                              </div>
                            </div>

                            <div className="general-view-details-div">
                              <div className="general-view-details-inner">
                                <div className="general-vd-box">
                                  <div className="general-vd-row">
                                    <div className="thumb-div">
                                      <img
                                        src={sessionImg}
                                        className="img-fluid img-responsive"
                                        alt="img"
                                      />
                                    </div>

                                    <div className="general-vd-content-div">
                                      <div className="time-row time-row-user">
                                        <div className="time-box">
                                          <div className="time-box-rounded">
                                            <span className="icon-span">
                                              <i className="bg-custom-icon calendar-time-icon-new"></i>
                                            </span>
                                            <span className="text">
                                              {' '}
                                              {moment(data).format('MMM DD hh:mm A')}{' '}
                                              {selectedSessionDetail.tz_value}
                                            </span>
                                          </div>
                                        </div>

                                        <div className="link-img-div">
                                          <div className="img-div">
                                            <img
                                              src={
                                                selectedSessionDetail.user.profile_image ===
                                                  'https://myapp-user-uploads154822-dev.s3.amazonaws.com/sample.jpg' ||
                                                selectedSessionDetail.user.profile_image === '' ||
                                                selectedSessionDetail.user.profile_image ===
                                                  undefined
                                                  ? ProfileImage
                                                  : selectedSessionDetail.user.profile_image
                                              }
                                              className="img-fluid "
                                              alt="image"
                                            />
                                          </div>
                                          <div className="text-div">
                                            <Link
                                              to="#"
                                              data-toggle="modal"
                                              data-target="#seat-holder-oto-details-modal"
                                              className="link link-color"
                                              style={{ cursor: 'auto' }}
                                            >
                                              {selectedSessionDetail.user.first_name === '' ||
                                              selectedSessionDetail.user.first_name === null ||
                                              selectedSessionDetail.user.first_name === undefined ||
                                              selectedSessionDetail.user.last_name === '' ||
                                              selectedSessionDetail.user.last_name === null ||
                                              selectedSessionDetail.user.last_name === undefined
                                                ? selectedSessionDetail.user.username
                                                : selectedSessionDetail.user.first_name +
                                                  ' ' +
                                                  selectedSessionDetail.user.last_name}
                                            </Link>
                                          </div>
                                        </div>
                                      </div>

                                      <h3>{selectedSessionDetail.description}</h3>

                                      <div className="filter-category-root-div mb-0">
                                        <div className="filter-category-inner">
                                          {selectedSessionDetail.booked_session_keywords.length >
                                            0 && (
                                            <ul className="filter-list-ul">
                                              {selectedSessionDetail.booked_session_keywords.map(
                                                (keywords) => {
                                                  return (
                                                    <li key={keywords.id}>
                                                      <Link to="#" className="filter-link">
                                                        {' '}
                                                        <span className="icon-img-span">
                                                          {' '}
                                                          <img
                                                            src={
                                                              keywords.image === null ||
                                                              keywords.image === undefined ||
                                                              keywords.image ===
                                                                'https://myapp-user-uploads154822-dev.s3.amazonaws.com/sample.jpg'
                                                                ? noFilterIocnImg
                                                                : keywords.image
                                                            }
                                                            alt="img"
                                                            className="img-fluid"
                                                          />{' '}
                                                        </span>{' '}
                                                        <span className="span-text">
                                                          {' '}
                                                          {keywords.keyword}{' '}
                                                        </span>{' '}
                                                      </Link>
                                                    </li>
                                                  );
                                                },
                                              )}
                                            </ul>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default DetailsOfSeatHolderComponent;
DetailsOfSeatHolderComponent.propTypes = {
  handleModalClose: PropTypes.func,
  selectedSessionDetail: PropTypes.any,
};

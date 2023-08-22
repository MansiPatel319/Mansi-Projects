import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router-dom';
import noFilterIocnImg from "../../../assets/images/icons-filter/icon-01.png";

import '../../../assets/css/creator/creator-popup-style.css';
const ViewDetailsComponent = ({ handleModalClose, selectedStreamDetail }) => {
  const data = selectedStreamDetail?.stream_datetime.replace('Z', '');
  return (
    <React.Fragment>
      <div className="modal center center-common-modal fade show" id="general-view-details-modal" tabIndex="-1" role="dialog" style={{ overflowY: 'scroll', paddingRight: '16px', display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)', overflow: 'auto' }}>
        <div className="modal-dialog modal-dialog-centered modal-dialog-lg" role="document">
          <div className="modal-content">

            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleModalClose}><span aria-hidden="true"> <i className="fe fe-x close-icon-x"></i> </span></button>
            </div>

            <div className="modal-body">

              <div className="general-pop-root">
                <section className="general-payment-section payment-details-section general-details-pop-section" id="payment-details-section">
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
                                  <div className="general-vd-row" key={selectedStreamDetail.id}>

                                    <div className="thumb-div">
                                      <img src={selectedStreamDetail.thumbnail_file !== null || selectedStreamDetail.thumbnail_file !== undefined ? selectedStreamDetail.thumbnail_file : ''} className="img-fluid img-responsive" alt="img" />
                                    </div>

                                    <div className="general-vd-content-div">

                                      <div className="time-row">
                                        <div className="time-box">
                                          <div className="time-box-rounded">
                                            <span className="icon-span"><i className="bg-custom-icon calendar-time-icon-new"></i></span>
                                            <span className="text">{
                                            moment(data).format('MMM DD hh:mm A')}
                                        {` ${selectedStreamDetail.tz_value !== null ? selectedStreamDetail.tz_value : ''}`}
                                              </span>
                                          </div>
                                        </div>
                                      </div>

                                      <h3>{selectedStreamDetail.title}</h3>
                                      <p>{selectedStreamDetail.stream_covers.join(' , ')}</p>

                                      <div className="filter-category-root-div">
                                        <div className="filter-category-inner">
                                          <ul className="filter-list-ul">
                                            {selectedStreamDetail.stream_keywords.length > 0 &&
                                              selectedStreamDetail.stream_keywords.map((keyData, i) => {
                                                return (
                                                  <li key={i}><Link to="#" className="filter-link"> <span className="icon-img-span"> <img src={keyData.image === null || keyData.image === undefined || keyData.image === "https://myapp-user-uploads154822-dev.s3.amazonaws.com/sample.jpg" ? noFilterIocnImg : keyData.image} alt="img" className="img-fluid" /> </span> <span className="span-text"> {keyData.keyword} </span> </Link></li>
                                                );
                                              })}
                                          </ul>
                                        </div>
                                      </div>

                                      <div className="border-vd-text-div">
                                        <div className="border-vd-text-row">
                                          <div className="border-vd-text-box left-vd-text-box br-1">
                                            <h2>
                                              <span className="text-label">Fee: </span>
                                              <span className="text-span">{`$${selectedStreamDetail.stream_amount}/Seat`}</span>
                                            </h2>
                                          </div>
                                          <div className="border-vd-text-box right-vd-text-box">
                                            <h2>
                                              <span className="text-label">Total Seats : </span>
                                              <span className="text-span">{selectedStreamDetail.total_seats}</span>
                                            </h2>
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

export default ViewDetailsComponent;
ViewDetailsComponent.propTypes = {
  handleModalClose: PropTypes.func,
  selectedStreamDetail: PropTypes.func,
};

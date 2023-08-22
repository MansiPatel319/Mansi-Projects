/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import successfullImg from "../../../assets/images/character-successfull.png";

const CongratulationModal = ({ closeModel,handleClickAddClass }) => {
  let creatorData = JSON.parse(localStorage.getItem('userCreatorData'));
  return (
    <div
      className="modal messages-modal fade show"
      id="congratulations-modal"
      tabIndex="-1"
      role="dialog"
      style={{ paddingRight: '17px', display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
    >
      <div className="modal center center-common-modal fade show" id="congratulations-modal" tabIndex="-1" role="dialog" style={{ paddingRight: '17px', display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <div className="modal-dialog modal-dialog-centered modal-dialog-lg" role="document">
          <div className="modal-content">

            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => closeModel}><span aria-hidden="true"> <i className="fe fe-x close-icon-x"></i> </span></button>
            </div>

            <div className="modal-body">

              <div className="general-pop-root">
                <section className="general-payment-section congratulations-pop-section general-details-pop-section" id="payment-details-section">
                  <div className="container container-970">
                    <div className="row">
                      <div className="col-lg-12 col-md-12">
                        <div className="general-payment-div general-details-div">
                          <div className="container-general-center">

                            <div className="heading-div mb-0">
                              <div className="heading-inner-div">
                                <h5>{creatorData.first_name},</h5>
                                <h1>Congratulations</h1>
                              </div>
                            </div>

                            <div className="general-message-root">

                              <div className="general-message-inner-div">
                                <div className="gen-mess-thumb-div">
                                  <img src={successfullImg} className="img-fluid img-char" alt="img" />
                                </div>

                                <div className="text-content-div">
                                  <div className="prag-div">
                                    <p>Your stream is scheduled!!</p>
                                  </div>
                                  <div className="btn-div">
                                    <Link onClick={()=>handleClickAddClass()} className="btn btn-common-primary mh-btn55 btn-addclass"> Add a Class </Link>
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
    </div>
  );
};

export default CongratulationModal;

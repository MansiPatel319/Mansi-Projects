/* eslint-disable react/prop-types */
import React from 'react'
import { useHistory } from 'react-router-dom'

const BuyExclusivePopup = ({ liveStreamDetail, closeExlusiveModel }) => {
  const history = useHistory()
  return (
    <div className="modal center center-common-modal fade show" id="general-book-course-modal" role="dialog" style={{ display: 'block', paddingRight: '17px' }}>
      <div className="modal-dialog modal-dialog-centered modal-dialog-lg" role="document">
        <div className="modal-content">

          <div className="modal-header">
            <button type="button" onClick={() => closeExlusiveModel(false)} className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true"> <i className="fe fe-x close-icon-x"></i> </span></button>
          </div>

          <div className="modal-body">

            <div className="general-pop-root general-book-course-root">
              <section className="general-book-course-pop-section" id="general-book-course-section">
                <div className="container container-970">
                  <div className="row">
                    <div className="col-lg-12 col-md-12">
                      <div className="general-book-course-div">
                        <div className="container-general-center">

                          <div className="heading-div">
                            <div className="heading-inner-div">
                              <h1>
                                <span className="block">Buy Our Exclusive  Course </span>
                                <span className="block">Now in <span className="color-txt">${liveStreamDetail.stream_amount}</span></span>
                              </h1>
                            </div>
                          </div>

                          <div className="general-bk-co-details-div">
                            <div className="general-bk-co-details-inner">

                              <div className="bk-co-card-root">
                                <div className="our-pricing-plan-card our-pricing-plan-full-card">
                                  <div className="flex-plan-card-inner">

                                    <div className="flex-plan-card-inner-left-div">
                                      <div className="img-div">
                                        <img src={liveStreamDetail.thumbnail_file} className="img-fluid" alt="img" />
                                      </div>
                                    </div>

                                    <div className="flex-plan-card-inner-right-div">
                                      <div className="check-icon-group">
                                        <span className="check-span-rounded"><i className="bg-custom-icon custom-check-icon"></i></span>
                                      </div>

                                      <div className="min-details-div">
                                        <div className="fp-title-top">
                                          <div className="fp-title-top-left">
                                            <span className="label-span active">PRO</span>
                                          </div>
                                          <div className="fp-title-top-right">
                                            <h3>$199 <span className="text-small">/Year</span></h3>
                                            <p>$192 Billed Yearly</p>
                                          </div>
                                        </div>
                                        <div className="desc-inner-box">
                                          <ul className="check-list-ul">
                                            <li>25 Exclusive Tutorials </li>
                                            <li>{`Over 25 LUT's and Presets`}</li>
                                            <li>Photoshop Brush Tools</li>
                                            <li>SFX Pack</li>
                                            <li>Media Kit Templates</li>
                                          </ul>
                                        </div>
                                      </div>
                                    </div>

                                  </div>
                                </div>
                              </div>

                              <div className="bk-co-card-bottom-root">
                                <div className="plan-btn">
                                  <button onClick={() => history.push("/user/signup")} className="btn btn-primary-outline btn-primary-outline-big min-height-55 btn-get-started-plan active">Buy Now</button>
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
  )
}

export default BuyExclusivePopup

import React from 'react';
import classesGraphic from '../../assets/images/home-block-banner/Hundreds of classes Graphic 1.png';
import liveImg from '../../assets/images/LearnLive/learnlive.png';
import oneTooneImg from '../../assets/images/One-to-One/onetoone.png';
import materialImg from '../../assets/images/home-block-banner/HomeImage2@2x.png';
import { Link, useHistory } from 'react-router-dom';
import { isAuthenticated } from '../../services/auth';
import { useDispatch } from 'react-redux';
import { setPreviousPath } from '../../actions/HandlePreviousRoutes.js';

const BlockMiddelBanner = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const handleRedirection = (url) => {
    if (!isAuthenticated()) {
      history.push('/user/signup');
      dispatch(setPreviousPath(url));
    } else {
      history.push(url);
    }
  };

  return (
    <React.Fragment>
      <section className="block-banner-new-classes-section block-banner-classes-01">
        <div className="block-banner-new-classes-div pattern-top-01 pt-0">
          <div className="block-banner-classes-root">
            <div className="container">
              <div className="row align-items-center-row">
                <div className="col-lg-5 col-md-6 order-lg-2">
                  <div className="center-content-div">
                    <div className="center-content-row">
                      <h2>
                        <span className="block">Find Your&nbsp;</span>
                        <span className="block">Inspiration</span>
                      </h2>
                      <div className="title-line-div">
                        <h4>WITH NEW CONTENT EVERY MONTH</h4>
                      </div>

                      <div className="img-thumb-div d-none">
                        <div className="img-thumb-inner">
                          <img
                            src={classesGraphic}
                            className="img-fluid img-responsive"
                            alt="img"
                          />
                        </div>
                      </div>

                      <div className="desc-div">
                        <p>
                          Explore new crafts, refine your skills and fuel your creative fire. With
                          our library of over 150 classes, you don&apos;t have to look far to find
                          your inspiration. Our 40+ incredible instructors are empowering you with
                          their knowledge, wisdom and expertise to succeed in a creative journey of
                          your own.
                        </p>
                      </div>
                      <div className="button-group-div">
                        <Link
                          to="/user-classes"
                          className="btn btn-primary-outline btn-primary-outline-big"
                        >
                          <span className="text">Start Learning</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-7 col-md-6 order-lg-1">
                  <div className="img-thumb-div m-none blur-bg">
                    <div className="img-thumb-inner">
                      <img src={classesGraphic} className="img img-responsive" alt="img" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="block-banner-new-classes-section block-banner-classes-02">
        <div className="block-banner-new-classes-div pattern-top-02">
          <div className="block-banner-classes-root">
            <div className="container">
              <div className="row align-items-center-row">
                <div className="col-lg-5 col-md-6">
                  <div className="center-content-div">
                    <div className="center-content-row padding-top-130">
                      <h2>
                        {/* <span className="block">New Way </span> */}
                        <span className="block">Learn Live</span>
                      </h2>
                      <div className="title-line-div">
                        <h4>IT’S TIME TO LEARN A NEW WAY</h4>
                      </div>

                      <div className="img-thumb-div d-none">
                        <div className="img-thumb-inner">
                          <img src={liveImg} className="img-fluid img-responsive" alt="img" />
                        </div>
                      </div>

                      <div className="desc-div">
                        <p>
                          Instructor-led live workshops hosted by the best creators in the industry.
                          These interactive classes are designed to inspire you with knowledge and
                          empower you with skills. Grab a pen and some paper, this is going to be
                          good.
                        </p>
                      </div>
                      <div className="button-group-div">
                        <button
                          onClick={() => handleRedirection('/user-live-stream')}
                          className="btn btn-primary-outline btn-primary-outline-big"
                        >
                          <span className="text">Get Started Now</span>
                        </button>
                      </div>
                      <div className="terms-div pt-55">
                        <p>
                          *Live classes require an additional purchase, outside of the annual
                          subscription, priced at the creator’s discretion.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-7 col-md-6">
                  <div className="img-thumb-div m-none">
                    <div className="img-thumb-inner">
                      <img src={liveImg} className="img-fluid img-responsive" alt="img" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="block-banner-new-classes-section block-banner-classes-03">
        <div className="block-banner-new-classes-div pattern-top-01">
          <div className="block-banner-classes-root">
            <div className="container">
              <div className="row align-items-center-row">
                <div className="col-lg-5 col-md-6 order-lg-2">
                  <div className="center-content-div">
                    <div className="center-content-row padding-top-130">
                      <h2>
                        <span className="block">One-to-One </span>
                        <span className="block">Sessions</span>
                      </h2>
                      <div className="title-line-div">
                        <h4>LET’S GET PERSONAL</h4>
                      </div>

                      <div className="img-thumb-div d-none">
                        <div className="img-thumb-inner">
                          <img src={oneTooneImg} className="img-fluid img-responsive" alt="img" />
                        </div>
                      </div>

                      <div className="desc-div">
                        <p>
                          Connect with your favourite creators through a one-to-one video call. Be
                          inquisitve, curious and create together in a live class where teaching is
                          tailored to you and what you want to learn.
                        </p>
                      </div>
                      <div className="button-group-div button-group-cb-div">
                        <button
                          onClick={() => handleRedirection('/user-live-stream')}
                          className="btn btn-primary-outline btn-primary-outline-big"
                        >
                          <span className="text">Book Now</span>
                        </button>
                      </div>

                      <div className="terms-div pt-55">
                        <p>
                          *One-to-One bookings are an additional purchase to the annual
                          subscription. The cost here is for example purposes only and pricing is
                          set at each creator’s discretion.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-7 col-md-6 order-lg-1">
                  <div className="img-thumb-div m-none">
                    <div className="img-thumb-inner">
                      <img src={oneTooneImg} className="img-fluid img-responsive" alt="img" />
                    </div>
                  </div>
                </div>
                <div className="col-lg-5 col-md-6 order-lg-2"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="block-banner-new-classes-section block-banner-classes-04">
        <div className="block-banner-new-classes-div pattern-top-02">
          <div className="block-banner-classes-root">
            <div className="container">
              <div className="row align-items-center-row">
                <div className="col-lg-5 col-md-6">
                  <div className="center-content-div">
                    <div className="center-content-row">
                      <h2>
                        <span className="block">Materials </span>
                      </h2>
                      <div className="title-line-div">
                        <h4>Upgrade your workflow, Elevate your content.</h4>
                      </div>
                      <div className="img-thumb-div d-none">
                        <div className="img-thumb-inner">
                          <img src={materialImg} className="img-fluid img-responsive" alt="img" />
                        </div>
                      </div>
                      <div className="desc-div">
                        <p>
                          A collection of creative assets designed by your favourite creators.
                          Instantly enhance your content with unlimited downloads from our curated
                          library of presets, LUTs, brushes, overlays and so much more.
                        </p>
                      </div>
                      <div className="button-group-div">
                        <Link
                          to="/user-material"
                          className="btn btn-primary-outline btn-primary-outline-big"
                        >
                          <span className="text">Learn More</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-7 col-md-6">
                  <div className="img-thumb-div m-none blur-bg">
                    <div className="img-thumb-inner">
                      <img src={materialImg} className="img-fluid img-responsive" alt="img" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default BlockMiddelBanner;

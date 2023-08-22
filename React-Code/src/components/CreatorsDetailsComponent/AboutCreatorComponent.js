import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import BookYourOneToOneSessionImg from "../../assets/images/latest/Group-Img-New.png";

const AboutCreatorComponent = ({ aboutCreatorDetail }) => {
  return (
    <React.Fragment>
      <div className="block-banner-new-classes-div">
        <div className="block-banner-classes-root">
          <div className="container container-1200">
            <div className="row align-items-center-row">
              <div className="col-lg-5 col-md-6 order-lg-2">
                <div className="center-content-div">
                  <div className="center-content-row">
                    <h3> <span className="block">Book your One-to-One </span> <span className="block">{`Session with ${aboutCreatorDetail.first_name} ${aboutCreatorDetail.last_name}`}</span> </h3>
                    <div className="img-thumb-div d-none">
                      <div className="img-thumb-inner">
                        <img src={BookYourOneToOneSessionImg} className="img-fluid img-responsive" alt="img" />
                      </div>
                    </div>
                    <div className="desc-div">
                      <p>With our one-to-one sessions, you can connect with your favourite creators like never before! In this bespoke 1-hour video call, you can choose exactly what you want to 
cover from receiving feedback, editing, storytelling and so much more. Be inquisitive, curious and create together in a class where teaching is tailored to you.</p>
                    </div>
                    <div className="button-group-div">
                      <Link to={`/user-one-to-one-book/${aboutCreatorDetail.id}`} className="btn btn-primary-outline btn-primary-outline-big button-184">
                        <span className="text">Book Now</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-7 col-md-6 order-lg-1">
                <div className="img-thumb-div m-none blur-bg">
                  <div className="img-thumb-inner">
                    <img src={BookYourOneToOneSessionImg} className="img-fluid img-responsive" alt="img" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AboutCreatorComponent;

AboutCreatorComponent.propTypes = {
  aboutCreatorDetail: PropTypes.any,
};

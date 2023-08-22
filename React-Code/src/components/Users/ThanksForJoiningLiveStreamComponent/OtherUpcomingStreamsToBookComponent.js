import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';
import userProfileImg from "../../../assets/images/profile.png";
import OwlCarousel from 'react-owl-carousel';
import noFilterIocnImg from "../../../assets/images/icons-filter/icon-01.png"
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
function OtherUpcomingStreamsToBookComponent({ thanksForJoiningLiveStreamData }) {
  const options = {
    nav: false,
    dots: false,
    stagePadding: 0,
    margin: 30,
    autoplay: false,
    smartSpeed: 2000,
    responsive: {
      0: {
        items: 1.2,
        autoplay: true,
        dots: true,
        margin: 15,
      },
      600: {
        items: 2,
      },
      1200: {
        items: 3,
      },
      1600: {
        items: 3,
      },

    },
  }
  return (
    <section className="upcoming-live-str-section-new" id="upcoming-live-str-section-new">
      <div className="container container-1200">
        {thanksForJoiningLiveStreamData && thanksForJoiningLiveStreamData.length > 0 ?
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <div className="upcoming-live-str-div-new">
                <div className="common-heading-div">
                  <div className="common-heading-inner-div">
                    <div className="common-heading-title-row">
                      <div className="common-heading-title-left">
                        <h2>Upcoming Live Classes</h2>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="upc-streams-slider-new-main-div">
                  <div className="upc-streams-slider-new-root">
                    {(
                      <OwlCarousel
                        className="owl-carousel owl-theme our-pop-classes-owl"
                        id="upcoming-owl-theme-new"
                        loop={thanksForJoiningLiveStreamData.length > 1 ? true : false}
                        autoplay={true}
                        autoplayTimeout={5000}
                        autoplayHoverPause={true}
                        {...options}
                      >
                        {thanksForJoiningLiveStreamData.length > 0 && thanksForJoiningLiveStreamData.map((data, i) => {
                           const date=data?.stream_datetime.replace('Z','');
                          return (
                            <div className="item" key={i}>
                              <div className="our-video-common-slider-box">
                                <div className="our-video-img-thumb">
                                  <div className="img-thumb"> <img src={data.thumbnail_file} className="img-fluid img-responsive" alt="image" /> </div>
                                </div>
                                <div className="our-content-div">
                                  <div className="label-div">
                                    <ul>
                                      {data && data.stream_keywords && data.stream_keywords.length > 0 && data.stream_keywords.map(
                                        (skillData, i) => {
                                         
                                          return (
                                            <li key={i}>
                                              <Link to="#" className="link link-black">
                                                <span className="icon-img-span">
                                                  <img src={skillData.image === null || skillData.image === undefined || skillData.image === "https://myapp-user-uploads154822-dev.s3.amazonaws.com/sample.jpg" ? noFilterIocnImg : skillData.image} alt="img" className="img-fluid" />
                                                </span>
                                                <span className="span-text">
                                                  {skillData.keyword}
                                                </span>
                                              </Link>
                                            </li>
                                          );
                                        },
                                      )}
                                    </ul>
                                  </div>

                                  <div className="our-content-row">
                                    <div className="our-content-full">
                                      <h4>
                                        <Link to={`/user-creator-class-detail/${data.id}`} className="link">
                                          {data.title}
                                        </Link>
                                      </h4>
                                    </div>

                                    <div className="our-content-row-ls">
                                      <div className="our-content-row-ls-left">
                                        <div className="our-content-left">
                                          <div className="thumb-img">
                                            <Link to={`/user-creator-class-detail/${data.id}`} className="link">
                                              <img src={data.creator.profile_image === undefined || data.creator.profile_image === null || data.creator.profile_image === "https://myapp-user-uploads154822-dev.s3.amazonaws.com/sample.jpg" ? userProfileImg : data.creator.profile_image} className="img-fluid user" alt="user" />
                                            </Link>
                                          </div>
                                        </div>
                                        <div className="our-content-right">
                                          <h3><Link to={`/user-creator-class-detail/${data.id}`} className="link">
                                            {` ${(data.first_name === null || data.first_name === "" || data.last_name === null || data.last_name === "") ? data.username : data.first_name + " " + data.last_name}`}
                                          </Link></h3>
                                        </div>
                                      </div>

                                      <div className="our-content-row-ls-right">
                                        <div className="time-row">
                                          <div className="time-box">
                                            <span className="icon-span"><i className="bg-custom-icon calendar-time-icon-new"></i></span>
                                            <span className="text">{moment(date).format('MMM DD, hh:mm A')}
                                              {` ${data.tz_value}`}</span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="our-content-bottom-row">
                                    <div className="btn-div-group">
                                      <Link to={`/user-creator-class-detail/${data.id}`} className="btn btn-primary-outline-icon-text">
                                        <span className="icon-span"><i className="bg-custom-icon invoice-icon-new"></i></span>
                                        <span className="text">Book Now</span>
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </OwlCarousel>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          : <p style={{ color: 'white', fontSize: '18px', margin: '10px' }}>No data available </p>}
      </div>
    </section>
  );
}

export default OtherUpcomingStreamsToBookComponent;

OtherUpcomingStreamsToBookComponent.propTypes = {
  thanksForJoiningLiveStreamData: PropTypes.array
}
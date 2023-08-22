import React, { useEffect, useState } from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import profileImg from '../../assets/images/profile.png';
import { getUrl } from '../../network/url';
import { get } from '../../network/requests';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
toast.configure();

const MeetTheCreatorsComponent = () => {
  const [meetTheCreatorsData, setsimilarCreators] = useState('');
  const getSimilarCreators = () => {
    const url = getUrl('getCreatorListForUpcomingStream');
    return get(`${url}`)
      .then((response) => {
        const {
          data: { code, data, status, message },
        } = response;
        switch (code) {
          case 200:
            if (status === true) {
              let rows = data.reduce(function (rows, key, index) {
                return (
                  (index % 2 == 0 ? rows.push([key]) : rows[rows.length - 1].push(key)) && rows
                );
              }, []);
              setsimilarCreators(rows);
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
        toast.error(error);
      });
  };
  useEffect(() => {
    getSimilarCreators();
  }, []);
  return (
    <div className="meet-the-creators-div">
      <div className="heading-div">
        <div className="container container-1200">
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <div className="heading-inner-div">
                <h2>Meet the Instructors</h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="creators-owl-slider-main-div">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <div className="creators-owl-slider-main-slider">
                {meetTheCreatorsData && meetTheCreatorsData.length > 0 && (
                  <OwlCarousel
                    className="owl-carousel owl-theme meet-the-creators-owl-div"
                    id="our-classes-owl"
                    loop={meetTheCreatorsData.length >= 5 ? true : false}
                    items={5}
                    margin={15}
                    nav={false}
                    dots={false}
                    stagePadding={0}
                    autoplay={true}
                    smartSpeed={2000}
                    responsiveClass={true}
                    responsive={{
                      0: {
                        items: 2,
                        autoplay: true,
                        center: true,
                        margin: 8,
                      },
                      600: {
                        items: 2.3,
                      },
                      1200: {
                        items: 3.1,
                      },
                      1600: {
                        items: 4.8,
                      },
                    }}
                  >
                    {meetTheCreatorsData.map((data, i) => {
                      return (
                        <div className="item" key={i}>
                          <div className="row">
                            {data.map((colData) => (
                              <div key={colData.id} className="col-lg-12">
                                <div className="creators-img-mask-slider-box">
                                  <Link
                                    to={`/user-creators-details/${colData.id}`}
                                    className="creators-img-link"
                                  >
                                    <div className="creators-img-mask-thumb">
                                      <div className="img-thumb">
                                        <img
                                          src={
                                            colData.profile_image === null ||
                                              colData.profile_image ===
                                              "https://myapp-user-uploads154822-dev.s3.amazonaws.com/sample.jpg"
                                              ? profileImg
                                              : colData.thumb_image_creator
                                              // colData.profile_image
                                          }
                                          className="img-fluid img-responsive"
                                          alt="image"
                                          style={{ width: '372px' }}
                                        />
                                      </div>
                                      <div className="view-details-text">
                                        <p>
                                          <span className="block">View </span>
                                          <span className="block">Details</span>
                                        </p>
                                      </div>
                                    </div>
                                  </Link>
                                  <div className="creators-content-div" style={{ height: '75px' }}>
                                    <h3>
                                      <Link
                                        to={`/user-creators-details/${colData.id}`}
                                        className="link"
                                      >
                                        {colData.full_name}
                                      </Link>
                                    </h3>
                                    <h4>{colData.key_skill}</h4>
                                  </div>
                                </div>
                              </div>
                            ))}
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
    </div>
  );
};

export default MeetTheCreatorsComponent;

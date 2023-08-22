import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../../assets/css/owl-slider-style.css';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { getUrl } from '../../../network/url';
import { get } from '../../../network/requests';
import { toast } from 'react-toastify';
import noImgData from '../../../assets/images/no-post-imge.png';
toast.configure();
const MeetTheCreatorComponent = () => {
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
              const odd = [];
              const even = [];
              data.map((record, i) => {
                if (i % 2 === 0) {
                  even.push(record);
                } else {
                  odd.push(record);
                }
              });
              setsimilarCreators(data);
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
    <React.Fragment>
      <section className="meet-the-creators-section" id="meet-the-creators-section">
        <div className="meet-the-creators-div">
          <div className="heading-div">
            <div className="container container-1000">
              <div className="row">
                <div className="col-lg-12 col-md-12">
                  <div className="heading-inner-div">
                    <h2>Meet The Creators</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="creators-owl-slider-main-div">
            <div className="container container-1000">
              {meetTheCreatorsData ? (
                <div className="row">
                  <div className="col-lg-12 col-md-12">
                    <div className="creators-owl-slider-main-slider">
                      {meetTheCreatorsData && meetTheCreatorsData.length > 0 && (
                        <OwlCarousel
                          className="owl-carousel owl-theme meet-the-creators-owl-div"
                          id="meet-the-creators-owl"
                          loop
                          items={4}
                          autoWidth
                        >
                          {meetTheCreatorsData.map((data, i) => {
                            return (
                              <div className="item" key={i}>
                                <div className="creators-img-mask-slider-box">
                                  <Link
                                    to={`/user-creators-details/${data.id}`}
                                    className="creators-img-link"
                                  >
                                    <div className="creators-img-mask-thumb">
                                      <div className="img-thumb">
                                        <img
                                          src={
                                            data.profile_image === null ||
                                              data.profile_image ===
                                              'https://myapp-user-uploads154822-dev.s3.amazonaws.com/sample.jpg'
                                              ? noImgData
                                              : data.profile_image
                                          }
                                          className="img-fluid img-responsive"
                                          alt="meetCreatorImg"
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
                                  <div className="creators-content-div">
                                    <h3>
                                      <Link
                                        to={`/user-creators-details/${data.id}`}
                                        className="link"
                                      >
                                        {data.full_name}
                                      </Link>
                                    </h3>
                                    <h4>{data.key_skill}</h4>
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
              ) : (
                <img src={noImgData} className="img-fluid img-responsive" width={355} />
              )}
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default MeetTheCreatorComponent;

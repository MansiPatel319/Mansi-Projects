import React, { useState, useEffect } from 'react';
import OtherUpcomingStreamsToBookComponent from './OtherUpcomingStreamsToBookComponent';
import { get } from "../../../network/requests";
import { getUrl } from "../../../network/url";
import { useParams, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { tokenExpire } from "../../../services/auth";
import smileImg from "../../../assets/images/icons/smile.png";
import creatorImg from "../../../assets/images/profile.jpg";
import { useSelector } from 'react-redux';
import Slider from 'react-rangeslider'
toast.configure();
function BannerComponent() {
  const params = useParams();
  const history = useHistory();
  const [thanksForJoiningStreamData, setthanksForJoiningStreamData] = useState([]);
  const [rangeValue, setRangeValue] = useState(50);
  const [isRangeSliderActive, setisRangeSliderActive] = useState(false);
  const [ratingVal, setRatingVal] = useState(3);
  const [submited, setsubmited] = useState(false);
 
  const Type = useSelector((state) => state.JoiningType.type);


  const handleOnRangeUpdate = (value) => {
    if (value > 0 && value < 26) {
      setRatingVal(1);
    }
    if (value > 25 && value < 51) {
      setRatingVal(2);
    }
    if (value > 50 && value < 76) {
      setRatingVal(3);
    }
    if (value > 75 && value < 100) {
      setRatingVal(4);
    }
    if (value === 100) {
      setRatingVal(5);
    }
    setRangeValue(value);
  }
 
  const getThanksForJoiningData = () => {
    const url = getUrl("getUserStreams");
    return get(`${url}?creator=${params.id}`, true)
      .then((response) => {
        const {
          data: { code, data, status, message },
        } = response;
        switch (code) {
          case 200:
            if (status === true) {
              setthanksForJoiningStreamData(data);
            }
            break;
          case 400:
            toast.error(message, {
              pauseOnHover: false,
              position: toast.POSITION.TOP_RIGHT,
            });
            break;
          default:
            toast.error(message, {
              pauseOnHover: false,
              position: toast.POSITION.TOP_RIGHT,
            });
        }
      })
      .catch((error) => {
        tokenExpire(error.response, history);
      });
  }

  const handleChangeComplete = () => {
    setisRangeSliderActive(false);
  }

  const handleChangeStart = () => {
    setisRangeSliderActive(true);
  }

  const handleSubmit = () => {
    setsubmited(true);
  }

  useEffect(() => {
    getThanksForJoiningData();
  }, []);

  return (
    <div className="thanks-joining-ls-div">
      <div className="container container-1000">
        <div className="row">
          <div className="col-lg-12 col-md-12">
            <div className="heading-div">
              {thanksForJoiningStreamData.length > 0 &&
                thanksForJoiningStreamData.slice(0, 1).map((data, i) => {
                  return (
                    <div className="heading-inner-div" key={i}>
                      <div className="user-content-img-bx-md">
                        <div className="img-div">
                          <img src={data.profile_image === "https://myapp-user-uploads154822-dev.s3.amazonaws.com/sample.jpg" || data.profile_image === null || data.profile_image === undefined || data.profile_image === "" ? creatorImg : data.profile_image} className="img-fluid img-responsive" alt="user" />
                          <span className="dot-span dot-active"></span>
                        </div>
                      </div>
                      
                     {Type.type==="BookLiveStream" && <h3>Thanks for joining the live classes</h3>} 
                     {Type.type==="BookOnetoOne" && <h3>Thanks for joining the one-to-one</h3>}  
                      <p>How was your experience with {data.first_name + " " + data.last_name}?</p>
                      {submited ? <div className="thank-you-div" id="thank-you-div">
                        <h4>Thank you</h4>
                      </div>
                        :
                        <div className="center-ex-card-div" id="rating-center-card-div">
                          <div className="experience-rating-card-div">
                            <div className="experience-rating-card-top">
                              <div className="slider-review-div">
                                <div className="slider-review-left-div">
                                  <div className="start-txt-div">
                                    <span className="number-span">{ratingVal}</span>
                                    <span className="material-icons star-material-icon"> star </span>
                                  </div>
                                </div>
                                <div className="slider-review-center-div">
                                  <div className="slider-box slider-box-custom">
                                    <Slider
                                      min={1}
                                      max={100}
                                      value={rangeValue}
                                      className={`rangeslider rangeslider--horizontal ${rangeValue === 0 && 'rangeslider--is-lowest-value'} ${isRangeSliderActive ? 'rangeslider--active' : ''}`}
                                      onChange={handleOnRangeUpdate}
                                      tooltip={false}
                                      // id="js-rangeslider-0"
                                      onChangeStart={handleChangeStart}
                                      onChangeComplete={handleChangeComplete}
                                    >
                                    </Slider>
                                    {/* </div> */}
                                  </div>
                                </div>
                                <div className="slider-review-right-div">
                                  <span className={`smile-span ${ratingVal > 3 ? 'active' : ''}`}>
                                    <img src={smileImg} className="img-fluid img-smile" alt="img" />
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="experience-rating-card-footer">
                              <div className="btn-div">
                                <button type="submit" id="submit-rating-btn" className="btn btn-primary-outline btn-primary-outline-n45" onClick={handleSubmit}>
                                  <span className="text">Submit</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      }
                    </div>
                  );
                })}
            </div>
            {thanksForJoiningStreamData && thanksForJoiningStreamData.length > 0 && <OtherUpcomingStreamsToBookComponent thanksForJoiningLiveStreamData={thanksForJoiningStreamData} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BannerComponent;

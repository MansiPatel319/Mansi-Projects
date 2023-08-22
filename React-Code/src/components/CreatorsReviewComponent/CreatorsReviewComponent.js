/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { isAuthenticated } from '../../services/auth';
import { get, post } from '../../network/requests';
import { getUrl } from '../../network/url';
import noImgData from '../../assets/images/no-post-imge.png';
import { tokenExpire } from '../../services/auth';
import moment from 'moment';
import convertUTCDateToLocalDate from '../../hooks/TimeZoneConversion';
toast.configure();
function CreatorsReviewComponent({ creatorId, isClassReview }) {
  const history = useHistory();
  const [classReviewsData, setclassReviewsData] = useState('');
  const [inputVal, setInputVal] = useState('');
  const [reviewError, setReviewError] = useState('');

  const getClassReview = () => {
    const url = getUrl('userCreatorClassDetails');
    return get(`${url}/${creatorId}/`, true)
      .then((response) => {
        const {
          data: { code, data, status, message },
        } = response;
        switch (code) {
          case 200:
            if (status === true) {
              setclassReviewsData(data.class_reviews);
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
        tokenExpire(error.response, history);
      });
  };

  const getCreatorReview = () => {
    const url = getUrl('getUpcomingStreamDetails');
    return get(`${url}${creatorId}/`, true)
      .then((response) => {
        const {
          data: { code, data, status, message },
        } = response;
        switch (code) {
          case 200:
            if (status === true) {
              setclassReviewsData(data.creator_reviews);
              // setcreatorData(data);
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
        tokenExpire(error.response, history);
      });
  };

  const handleInpChange = (e) => {
    setInputVal(e.target.value);
    setReviewError("");
  };

  const handlePostReview = () => {
    if (isClassReview) {
      if (inputVal.trim() !== '') {
        const reviewData = {
          creator_class: creatorId,
          review: inputVal,
        };
        const url = getUrl('userClassReviewPost');
        return post(`${url}`, reviewData, true)
          .then((response) => {
            const {
              data: { code, status, message },
            } = response;
            switch (code) {
              case 200:
                if (status === true) {
                  toast.success(message);
                  getClassReview();
                  setInputVal('');
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
            tokenExpire(error.response, history);
          });


      } else {
        setReviewError('Review Should be required');
      }
    }
  };

  useEffect(() => {
    if (isClassReview) {
      getClassReview();
    }
    if (!isClassReview) {
      getCreatorReview();
    }
  }, [creatorId]);

  return (


    <div className="tab-pane-inner">
      <div className="us-course-tab max-width-910">
        <div className="us-course-tab-inner">
          <div className="cmp-root-div">
            <div className="cmp-root-inner-div">
              <div className="comment-list-view-div">
                <div className="comment-list-view-row">
                  {classReviewsData &&
                    classReviewsData.length > 0 &&
                    classReviewsData.map((reviewData) => {
                      return (
                        <div className="comment-card-box" key={reviewData.id}>
                          <div className="comment-card-inner">
                            <div className="user-top-row">
                              <div className="user-top-left-div">
                                <div className="img-thumb">
                                  <img
                                    src={
                                      reviewData.profile_image === null ||
                                        reviewData.profile_image === undefined ||
                                        reviewData.profile_image ===
                                        'https://myapp-user-uploads154822-dev.s3.amazonaws.com/sample.jpg'
                                        ? noImgData
                                        : reviewData.profile_image
                                    }
                                    className="img-fluid img-responsive"
                                    alt="testimonials"
                                  />{' '}
                                </div>
                                <div className="text-content-div">
                                  <h3>
                                    <Link to="#" className="link">
                                      {reviewData.first_name === '' ||
                                        reviewData.first_name === null ||
                                        reviewData.last_name === '' ||
                                        reviewData.last_name === null
                                        ? reviewData.username
                                        : reviewData.first_name + ' ' + reviewData.last_name}
                                    </Link>
                                  </h3>
                                </div>
                              </div>
                              <div className="user-top-right-div">
                                <h4>
                                  {' '}
                                  <span className="txt">
                                    {moment(convertUTCDateToLocalDate(new Date(classReviewsData.created_at))).format('MMMM DD, YYYY')}
                                  </span>{' '}
                                </h4>
                              </div>
                            </div>
                            <div className="user-desc-row">
                              <div className="desc-div">
                                <p>{reviewData.review}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
              <div className="text-area-ct-div">
                <div className="form-text-area-ct-div">
                  <div className="form-group">
                    <textarea
                      className="form-control form-textarea"
                      rows="4"
                      placeholder="Write your review"
                      onChange={handleInpChange}
                      value={inputVal}
                    ></textarea>
                    <span className="tl-icon-span">
                      {' '}
                      <span className="bg-custom-icon write-pen-new-icon"></span>{' '}
                    </span>

                  </div>
                  {reviewError && (
                    <div style={{ color: 'red', fontSize: '18px', textAlign: 'left' }}>
                      {reviewError}
                    </div>
                  )}

                  <div className="btn-div">
                    <div className="btn-row-div">
                      <Link
                        to="#"
                        className="btn btn-primary-outline btn-primary-outline-n45"
                        onClick={
                          isAuthenticated()
                            ? (e) => {
                              handlePostReview(e);
                            }
                            : () => { }
                        }
                      >
                        <span className="text">Post</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatorsReviewComponent;

CreatorsReviewComponent.propTypes = {
  classReviews: PropTypes.array,
  creatorId: PropTypes.any,
  isClassReview: PropTypes.bool,
};

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { tokenExpire } from '../../../services/auth';
import ChooseSlotComponent from '../BookOneToOneComponent/ChooseSlotComponent';
import { get, post } from '../../../network/requests';
import { getUrl } from '../../../network/url';
import { useParams, useHistory, useLocation } from 'react-router-dom';
// import noImgData from "../../../assets/images/no-post-imge.png";
import dummyUserImg from '../../../assets/images/profile.png';
import FilterComponent from '../../Filter/FilterComponent';
toast.configure();

let keywordIds = [];
function BookOneToOneComponent() {
  let params = useParams();
  const history = useHistory();
  const location = useLocation();
  const [sessionData, setsessionData] = useState('');
  const [keywordError, setkeywordError] = useState('');
  const [timeSlot, settimeSlot] = useState('');
  const [timeSlotError, settimeSlotError] = useState('');
  const [description, setdescription] = useState('');
  const [descriptionError, setdescriptionError] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSetKeywords = (keywordData) => {
    const searchKey = keywordData === '' ? '' : keywordData.toString();
    setSearchKeyword(searchKey);
    setkeywordError('');
  };
  
  const getSessionData = () => {
    const url = getUrl('get_one_to_one_session');
    // if (creatorId) {
    return get(`${url}${params.id}/`, true)
      .then((response) => {
        const {
          data: { code, data, status, message },
        } = response;
        switch (code) {
          case 200:
            if (status === true) {
              setsessionData(data);
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
    // }
  };
  const getKeywordsData = () => {
    const url = getUrl('getKeywordsDetails');
    return get(`${url}`)
      .then((response) => {
        const {
          data: { code, data, status, message },
        } = response;
        switch (code) {
          case 200:
            if (status === true) {
              for (let i = 0; i < data.length; i++) {
                keywordIds.push(data[i].id);
              }
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

  const handleTimeSlot = (timeSlotId) => {
    if (timeSlotId === 0) {
      if (sessionData.time_slots.length > 0) {
        settimeSlotError('Please select time slot');
      }
    } else {
      localStorage.setItem('TimeSlot', timeSlotId);
      settimeSlot(timeSlotId);
      settimeSlotError('');
    }
  };

  const handleTextInpchange = (e) => {
    if (e.target.value === '') {
      setdescriptionError('Please write description');
    } else {
      localStorage.setItem('Description', e.target.value);
      setdescription(e.target.value);
      setdescriptionError('');
    }
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (description === '') {
      setdescriptionError('Please write description');
    }
    // if (description !== "") {
    //   setdescriptionError("");
    // }
    else if (timeSlot === '' || timeSlot === undefined || timeSlot === null || timeSlot === []) {
      if (sessionData.time_slots.length > 0) {
        settimeSlotError('Please select time slot');
      }
      if (sessionData.time_slots.length === '') {
        settimeSlotError('Please select time slot');
      }
    } else if (descriptionError === '' && timeSlotError === '' && keywordError === '') {
      try {
        setIsProcessing(true);
        handleSubmitForm();
        setIsProcessing(false);
      } catch (err) {
        setIsProcessing(false);
      }
    }
  };
  // eslint-disable-next-line no-unused-vars
  const bookOneToOneSession = () => {
    const url = getUrl('post_one_to_one_session');
    const formdata = new FormData();
    // formdata.append('card_id', tokenData.id);
    formdata.append('creator', sessionData.session.creator.id);
    formdata.append('description', description);
    formdata.append('keywords', searchKeyword !== '' ? searchKeyword : keywordIds.toString());
    formdata.append('time_slot', timeSlot ? timeSlot : '');

    if (sessionData.session.creator.id) {
      return post(`${url}`, formdata, true)
        .then((response) => {
          const {
            data: { code, status, message },
          } = response;
          switch (code) {
            case 201:
              if (status === true) {
                const oneToOneData = {
                  creatorId: sessionData.session.creator.id,
                  description,
                  timeSlot,
                  searchKeywordList: searchKeyword !== '' ? searchKeyword : keywordIds.toString(),
                  sessionAmount: sessionData.session.amount !== undefined ? sessionData.session.amount : '',
                };
                localStorage.setItem('activePlaneDetailsOneToOne', JSON.stringify(oneToOneData));
                // localStorage.removeItem('keywordData');
                // localStorage.removeItem('activePlaneDetailsOneToOne');
                history.push('/user-payment-details-successfull');
              }
              break;
            case 400:
              toast.error(message, {
                pauseOnHover: false,
                position: toast.POSITION.TOP_LEFT,
              });
              break;
            default:
              toast.error(message, {
                pauseOnHover: false,
                position: toast.POSITION.TOP_LEFT,
              });
          }
        })
        .catch((error) => {
          tokenExpire(error.response, history);
        });
    }
  };

  const handleSubmitForm = () => {
    if (sessionData.session.amount === 0) {
      // console.log(`here`)
      bookOneToOneSession();
    } else {
      const oneToOneData = {
        creatorId: sessionData.session.creator.id,
        description,
        timeSlot,
        searchKeywordList: searchKeyword !== '' ? searchKeyword : keywordIds.toString(),
        sessionAmount: sessionData.session.amount !== undefined ? sessionData.session.amount : '',
      };
      localStorage.setItem('activePlaneDetailsOneToOne', JSON.stringify(oneToOneData));
      localStorage.setItem('backButtonPath', location.pathname);
      setTimeout(() => {
        history.push('/user-payment-details');
      }, 3000);
    }
  };

  const handleBack = () => {
    history.goBack();
  };

  useEffect(() => {
    localStorage.removeItem('activePlaneDetailsOneToOne');
    getSessionData();
    getKeywordsData();
  }, []);
  const handlerequestslots =(e) =>{
    e.preventDefault();
    console.log('data===',e);
    const formdata = new FormData();
    var id=location.pathname?.split('/');
    formdata.append('creator_id', id[2]);
    const url = getUrl('request_slot');
    return post(`${url}`, formdata, true)
      .then((response) => {
        const {
          data: { code, message },
        } = response;
        switch (code) {
          case 200:
            toast.success(message);
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
  return (
    <div className="container container-970">
      {sessionData.session ? (
        <div className="row">
          <div className="col-lg-12 col-md-12">
            <div className="general-one-to-one-new-div">
              <div className="container-general-new-center">
                <div className="heading-div">
                  <div className="heading-inner-div">
                    <h1>One-to-One </h1>
                  </div>

                  <div className="user-content-row">
                    <div className="prag-div">
                      <p>With</p>
                    </div>
                    <div className="user-content-img-div">
                      <div className="img-div">
                        <img
                          src={
                            sessionData.session.creator.profile_image === undefined ||
                            sessionData.session.creator.profile_image === null ||
                            sessionData.session.creator.profile_image ===
                              'https://myapp-user-uploads154822-dev.s3.amazonaws.com/sample.jpg'
                              ? dummyUserImg
                              : sessionData.session.creator.profile_image
                          }
                          className="img-fluid img-responsive"
                          alt="user"
                        />
                        <span className="dot-span dot-active"></span>
                      </div>
                    </div>
                    <div className="user-content-txt-div">
                      <h4>{`${
                        sessionData.session !== undefined
                          ? sessionData.session.creator.full_name
                          : ''
                      }`}</h4>
                    </div>
                  </div>
                </div>
                <div className="general-one-to-one-root">
                  <div className="general-top">
                    <div className="general-row">
                      <div className="one-to-one-common-inner">
                        <div className="common-form-div">
                          <form onSubmit={handleSubmit}>
                            <div className="form-group form-group-textarea-ct mb-50">
                              <label className="label-text">
                                {' '}
                                {/* Write description about what do you wanna learn. */}
                                Share a little about you and what you would like to learn.{' '}
                              </label>
                              <div className="input-control-row">
                                <textarea
                                  className="form-control form-textarea"
                                  rows="4"
                                  placeholder="write here"
                                  onChange={(e) => {
                                    handleTextInpchange(e);
                                  }}
                                ></textarea>
                                <span className="tl-icon-span">
                                  {' '}
                                  <span className="bg-custom-icon write-pen-new-icon"></span>{' '}
                                </span>
                              </div>
                              {descriptionError && (
                                <p style={{ color: 'red', fontSize: '18px' }}>{descriptionError}</p>
                              )}
                            </div>

                            <div className="form-group mb-40">
                              <label className="label-text">Choose Category</label>
                              <div className="category-control-row">
                                <div className="category-inner">
                                  <FilterComponent handleSetKeywords={handleSetKeywords} />
                                </div>
                                {keywordError && (
                                  <span style={{ color: 'red', fontSize: '18px' }}>
                                    {keywordError}
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="form-group mb-40">
                              <label className="label-text"> Choose a date and time that suits you </label>
                              {/* <div className="category-control-row">
                                <div className="category-inner">
                                  <ul className="category-list-ul slot-category-list-ul" id="choose-slot-list">
                                    <li><a href="#" className="filter-link"> <span className="icon-img-span"> <i className="bg-custom-icon calendar-time-icon-new"></i> </span> <span className="span-text"> Sept 12, 9:00 PM EST </span> </a></li>
                                    <li><a href="#" className="filter-link"> <span className="icon-img-span"> <i className="bg-custom-icon calendar-time-icon-new"></i> </span> <span className="span-text"> Sept 12, 9:00 PM EST </span> </a></li>
                                  </ul>
                                </div>
                              </div> */}
                              <ChooseSlotComponent
                                sessionTimeSlot={
                                  sessionData.time_slots !== undefined ? sessionData.time_slots : ''
                                }
                                handleTimeSlot={handleTimeSlot}
                                sessionData={sessionData}
                              />
                           
                              {timeSlotError && (
                                <span style={{ color: 'red', fontSize: '18px' }}>
                                  {timeSlotError}
                                </span>
                              )}
                              {sessionData.time_slots.length ===0 &&
                              <>
                              <p style={{color:"white"}} >Please click on  to request creator to add more slots for one to one session. </p>
                              <Link style={{marginTop:"10px",fontSize:"16pz"}} onClick={()=>handlerequestslots()} className="btnreqslots">Request for slot</Link>
                              </>}
                              {sessionData.time_slots.length!==0 &&
                                <span style={{ color: 'white', fontSize: '10px', marginTop: '10px', marginLeft: '0px'}}>
                               *Please note, all one-to-one sessions are limited to 1 hour long.
                                  </span>}

                            </div>
                            {sessionData.time_slots.length!==0 &&
                            <div className="form-group mb-60">
                              <label className="label-text">Total:</label>
                              <div className="h3-row">
                                <h3>
                                  <span className="amount-span">{`$${
                                    sessionData.session !== undefined
                                      ? sessionData.session.amount
                                      : ''
                                  }`}</span>
                                </h3>
                              </div>
                            </div>
                            }
                         </form>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="general-bottom">
                    <div className="general-btn-div justify-content-end">
                      <Link
                        to="#"
                        className="btn btn-primary-outline btn-primary-color-02 mh-btn55 btn-black-back mr-24"
                        onClick={handleBack}
                      >
                        <span className="text">Back</span>
                      </Link>
                      {/* <Link to="/user-payment-details" className="btn btn-common-primary mh-btn55 btn-book"> Book </Link> */}
                      <button
                        className={`btn btn-common-primary mh-btn55 btn-book ${
                          isProcessing || !timeSlot || timeSlot.length === 0 ? 'disabled' : ''
                        }`}
                        onClick={handleSubmit}
                        type="submit"
                        disabled={isProcessing || !timeSlot || timeSlot.length === 0}
                      >
                        {isProcessing ? 'Processing' : 'Book'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
      <><div style={{ color: 'white', fontSize: '18px' }}>
              Sorry! Unfortunately, there are no available one-to-one sessions with this creator right
              now. Please check back soon.
            </div>
            <Link style={{marginTop:"10px",fontSize:"16px"}} onClick={handlerequestslots} className="btnreqslots" to="#">Request for slot</Link></>
      )}
    </div>
  );
}

export default BookOneToOneComponent;

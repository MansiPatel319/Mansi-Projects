import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams, useHistory, useLocation } from "react-router-dom";
import { get, post } from '../../../network/requests';
import { getUrl } from '../../../network/url';
import { toast } from 'react-toastify';
import Loader from "../../UI/Loader/Loader";
import moment from 'moment';
import dummyUserImg from '../../../assets/images/profile.png';
import { tokenExpire } from "../../../services/auth";
toast.configure();
function UserBookaSeatComponent() {
  const params = useParams();
  const location = useLocation()
  const history = useHistory();
  const [isLoading, setIsLoadning] = useState(false);
  const [UserBookSeatData, setbookSeatData] = useState();

  const getBookASeatData = () => {
    setIsLoadning(true);
    const url = getUrl('getUpcomingStreamDetails');
    return get(`${url}${params.id}/`, true)
      .then((response) => {
        const {
          data: { code, data, status, message },
        } = response;
        setIsLoadning(false);
        switch (code) {
          case 200:
            if (status === true) {
              setbookSeatData(data);
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
        setIsLoadning(false);
        tokenExpire(error.response, history);
      });
  }


  const handleBack = (id) => {  
    history.push(`/user-creator-class-detail/${id}`)
   
  }
  const handleBook = (id, streamAmount) => {
    if(streamAmount === 0) {
      handlePurchaseFunction(id)
    } else {
    const streamData = {
      id: id,
      streamAmount: streamAmount
    }
    localStorage.setItem("backButtonPath", location.pathname)
    localStorage.setItem("activePlaneDetailsStream", JSON.stringify(streamData))
    history.push('/user-payment-details')
  }
  }

  const handlePurchaseFunction = (id) => {
    setIsLoadning(true);
    const url = getUrl('book_a_seat_post');
    const formdata = new FormData();
    formdata.append('stream', id);
    post(`${url}`, formdata, true)
      .then((response) => {
        const {
          data: { code, status, message },
        } = response;
        setIsLoadning(false);
        switch (code) {
          case 201:
            if (status === true) {
              // localStorage.removeItem('activePlaneDetailsStream');
              const streamData = {
                id: UserBookSeatData.id,
                streamAmount: UserBookSeatData.streamAmount
              }
              localStorage.setItem("activePlaneDetailsStream", JSON.stringify(streamData))
              history.push('/user-payment-details-successfull');
            }
            break;
          case 400:
            toast.error(message, {
              pauseOnHover: false,
              position: toast.POSITION.TOP_RIGHT,
            });
            history.push('/user-home');
            break;
          default:
            toast.error(message, {
              pauseOnHover: false,
              position: toast.POSITION.TOP_RIGHT,
            });
        }
      })
      .catch((error) => {
        setIsLoadning(false);
        tokenExpire(error.response, history);
      });
  };

  useEffect(() => {
    localStorage.removeItem("activePlaneDetailsStream")
    getBookASeatData();
  }, []);
  const date=UserBookSeatData?.stream_datetime.replace('Z','');
  return (
    <>
      {isLoading && <Loader />}
      <div className="container container-970">
        <div className="row">
          <div className="col-lg-12 col-md-12">
            <div className="general-book-new-div">
              <div className="container-general-new-center">
                <div className="heading-div">
                  <div className="heading-inner-div">
                    <h1>Book a Seat</h1>
                  </div>
                </div>
                <div className="general-bk-seat-new-body">
                  {UserBookSeatData && (
                    <div className="general-bk-seat-new-body-row">
                      <div className="general-bk-seat-new-body-left">
                        <div className="book-seat-user-card-div">
                          <div className="book-seat-user-card-row">
                            <div className="user-thumb-img-div">
                              <div className="img-div">
                                <img src={UserBookSeatData.creator.profile_image === null || UserBookSeatData.creator.profile_image === "https://myapp-user-uploads154822-dev.s3.amazonaws.com/sample.jpg" ? dummyUserImg : UserBookSeatData.creator.profile_image} className="img-fluid img-responsive" alt="creators" />
                              </div>
                            </div>
                            <div className="text-content-div">
                              <h3><Link to="#" className="link">{UserBookSeatData.creator.full_name}</Link></h3>
                              <p>{UserBookSeatData.creator.key_skill}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="general-bk-seat-new-body-right">
                        <div className="text-desc-div">
                          <h2>{`$${UserBookSeatData.stream_amount}`}</h2>
                          <p>{UserBookSeatData.title}</p>
                          <div className="time-box">
                            <div className="time-box-rounded">
                              <span className="icon-span"><i className="bg-custom-icon calendar-time-icon-new"></i></span>
                              <span className="text">
                                {moment(date).format('MMM DD, hh:mm A')}
                                {` ${UserBookSeatData.tz_value !== null ? UserBookSeatData.tz_value : ''}`}
                              </span>
                            
                            </div>
                            <br></br>
                            <span style={{ color: 'white', fontSize: '10px', marginTop: '10px', marginLeft: '15px'}}>
                                    Live streams are a maximum of 1 hour long.
                                  </span>
                          </div>
                          <div className="button-oto-session-div">
                            <Link to={`/user-one-to-one-book/${UserBookSeatData.creator.id}`} className="link-btn"> Click here to book one-to-one session </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="general-bottom">
                  <div className="general-btn-div">
                    <Link to="#" className="btn btn-primary-outline btn-primary-color-02 mh-btn55 btn-black-back mr-24" onClick={()=>handleBack(UserBookSeatData.id)}>
                      <span className="text">Back</span>
                    </Link>
                    {UserBookSeatData && UserBookSeatData.available_seats === 0 ?
                      <button
                        onClick={() => {
                          toast.error('ooops.. All seates are booked')
                        }}
                        className="btn btn-common-primary mh-btn55 btn-book">
                        Book
                      </button> :
                      <button
                        style={UserBookSeatData && UserBookSeatData.is_booked ? { cursor: "not-allowed" } : {}}
                        disabled={UserBookSeatData && UserBookSeatData.is_booked}
                        onClick={() => UserBookSeatData && handleBook(UserBookSeatData.id, UserBookSeatData.stream_amount)}
                        className="btn btn-common-primary mh-btn55 btn-book">
                        Book
                      </button>

                    }

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserBookaSeatComponent;

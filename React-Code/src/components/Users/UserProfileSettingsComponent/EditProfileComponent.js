/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProfileUploaderComponent from '../../Creator/CreatorProfileSettingComponent/ProfileUploaderComponent';
import { get, put } from '../../../network/requests';
import { getUrl } from '../../../network/url';
import { toast } from 'react-toastify';
import Loader from '../../UI/Loader/Loader';
import { useDispatch } from 'react-redux';
import { setSignupData } from '../../../actions/usersAction';
import { useHistory } from 'react-router-dom';
import { tokenExpire } from '../../../services/auth';
import axios from 'axios';

toast.configure();
function EditProfileComponent() {
  const dispatch = useDispatch();
  const history = useHistory();
  // const getPlanDetails = localStorage.getItem('activePlaneDetails');
  const [userProfileData, setuserProfileData] = useState('');
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [userDescription, setuserDescription] = useState('');
  const [profileImg, setprofileImg] = useState('');
  const [isFirstNameError, setisFirstNameError] = useState(false);
  const [firstNameErrorMsg, setFirstNameErrorMsg] = useState('');
  const [lastNameError, setlastNameError] = useState('');
  const [isLastNameError, setisLastNameError] = useState(false);
  const [isLoading, setIsLoadning] = useState(false);
  const [imgSizeError, setimgSizeError] = useState('');
  // const [activePlanDetails, seActivePlanDetails] = useState('');
  // const [accessToken, setAccessToken] = useState('');
  // const [isPlanPurchased, setIsPlanPurchased] = useState(false);
  const [isEditProfileEnable, setisEditProfileEnable] = useState(false);

  const onHandleChangeInp = (evt) => {
    if (evt.target.name === 'first_name') {
      if (evt.target.value === '') {
        setisFirstNameError(true);
        setFirstNameErrorMsg('This field is required');
      } else {
        setfirstName(evt.target.value);
        setisFirstNameError(false);
        setFirstNameErrorMsg('');
      }
    }
    if (evt.target.name === 'last_name') {
      if (evt.target.value === '') {
        setlastNameError('This field is required');
        setisLastNameError(true);
      } else {
        setlastName(evt.target.value);
        setlastNameError('');
        setisLastNameError(false);
      }
    }
    if (evt.target.name === 'description') {
      setuserDescription(evt.target.value);
    }
  };

  const getUserProfileData = () => {
    setIsLoadning(true);
    const url = getUrl('getUserProfileData');
    return get(`${url}`, true)
      .then((response) => {
        const {
          data: { code, data, status, message },
        } = response;
        setIsLoadning(false);
        switch (code) {
          case 200:
            if (status === true) {
              setfirstName(data.first_name);
              setlastName(data.last_name);
              setuserDescription(data.description);
              setprofileImg(data.profile_image);
              setuserProfileData(data);
              dispatch(setSignupData(data));
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
  };

  const updateUserProfile = () => {
    setIsLoadning(true);
    const url = getUrl('getUserProfileData');
    const formdata = new FormData();
    formdata.append('first_name', firstName);
    formdata.append('last_name', lastName);
    formdata.append('description', userDescription);
    return put(`${url}`, formdata, true)
      .then((response) => {
        const {
          data: { code, data, status, message },
        } = response;
        setIsLoadning(false);
        switch (code) {
          case 200:
            if (status === true) {
              toast.success(message, {
                pauseOnHover: false,
                position: toast.POSITION.TOP_RIGHT,
              });
              getUserProfileData(data);
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
  };

  const handleProfileUploader = (event) => {
    setimgSizeError('');
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      const maxAllowedSize = Math.round(img.size / 1024);
      if (maxAllowedSize >= 5120) {
        setimgSizeError('Please select a file less than 5mb');
      } else {
        setIsLoadning(true);
        const url = getUrl('getUserProfileData');
        const formdata = new FormData();
        formdata.append('profile_image', img);
        put(`${url}`, formdata, true)
          .then((response) => {
            const {
              data: { code, data, status, message },
            } = response;
            setIsLoadning(false);
            switch (code) {
              case 200:
                if (status === true) {
                  toast.success(message, {
                    pauseOnHover: false,
                    position: toast.POSITION.TOP_RIGHT,
                  });
                  getUserProfileData(data);
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
    }
  };

  // const handleCancelPlanSubscription = () => {
  //   if (isPlanPurchased) {
  //     let text = confirm('Are you sure you want to cancel subscription?');
  //     if (text === true) {
  //       if (activePlanDetails.stripe_subscription_id === '') {
  //         cancelPlanByPayPal();
  //       } else {
  //         cancelPlanByStripe();
  //       }
  //     }
  //   } else {
  //     toast.error('You dont have any active plan!', {
  //       pauseOnHover: false,
  //       position: toast.POSITION.TOP_RIGHT,
  //     });
  //   }
  // };

  // const cancelPlanByPayPal = () => {
  //   let bodyRes = { reason: 'Not satisfied' };
  //   if (accessToken !== '' || accessToken !== null || accessToken !== undefined) {
  //     fetch(
  //       `${process.env.REACT_APP_PAYPAL_ACCESS_TOKEN_API}/billing/subscriptions/${activePlanDetails.paypal_subscription_id}/cancel`,
  //       {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //         body: JSON.stringify(bodyRes),
  //       },
  //     )
  //       .then((res) => res.json())
  //       .then(
  //         () => {
  //           // toast.success("Your plan cancel succesuflly", {
  //           //   pauseOnHover: false,
  //           //   position: toast.POSITION.TOP_RIGHT,
  //           // });
  //           setIsPlanPurchased(false);
  //           cancelPlanByStripe();
  //           if (typeof getPlanDetails !== undefined || getPlanDetails !== null) {
  //             localStorage.removeItem('activePlaneDetails');
  //           }
  //         },
  //         (error) => {
  //           toast.error(error, {
  //             pauseOnHover: false,
  //             position: toast.POSITION.TOP_RIGHT,
  //           });
  //         },
  //       );
  //   }
  // };

  // const cancelPlanByStripe = () => {
  //   const url = getUrl('cancel_plan_subscription');
  //   return post(`${url}`, {}, true)
  //     .then((response) => {
  //       const {
  //         data: { code, status, message },
  //       } = response;
  //       setIsLoadning(false);
  //       switch (code) {
  //         case 200:
  //           if (status === true) {
  //             toast.success(message, {
  //               pauseOnHover: false,
  //               position: toast.POSITION.TOP_RIGHT,
  //             });
  //             setIsPlanPurchased(false);
  //             if (typeof getPlanDetails !== undefined || getPlanDetails !== null) {
  //               localStorage.removeItem('activePlaneDetails');
  //             }
  //           }
  //           break;
  //         case 400:
  //           toast.error(message, {
  //             pauseOnHover: false,
  //             position: toast.POSITION.TOP_RIGHT,
  //           });
  //           break;
  //         default:
  //           toast.error(message, {
  //             pauseOnHover: false,
  //             position: toast.POSITION.TOP_RIGHT,
  //           });
  //       }
  //     })
  //     .catch((error) => {
  //       setIsLoadning(false);
  //       tokenExpire(error.response, history);
  //     });
  // };

  const getPurchasedPlanDetails = () => {
    // seActivePlanDetails();
    // setIsPlanPurchased(true);
    getAccessToken();
    // const url = getUrl('user-plan');
    // get(url, true)
    //   .then((response) => {
    //     const {
    //       data: { code, data, status, message },
    //     } = response;
    //     switch (code) {
    //       case 200:
    //         if (status === true) {
    //           seActivePlanDetails(data);
    //           setIsPlanPurchased(true);
    //           getAccessToken();
    //         }
    //         break;
    //       case 400:
    //         setIsPlanPurchased(false);
    //         break;
    //       default:
    //         toast.error(message, {
    //           pauseOnHover: false,
    //           position: toast.POSITION.TOP_RIGHT,
    //         });
    //     }
    //   })
    //   .catch(() => {
    //     // toast.error('Something went wrong', {
    //     //   pauseOnHover: false,
    //     //   position: toast.POSITION.TOP_RIGHT,
    //     // });
    //   });
  };

  const handleSaveBtnClick = () => {
    updateUserProfile();
  };

  const getAccessToken = async () => {
    try {
      const {
        data: { access_token },
      } = await axios({
        url: `${process.env.REACT_APP_PAYPAL_ACCESS_TOKEN_API}/oauth2/token`,
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Accept-Language': 'en_US',
          'content-type': 'application/x-www-form-urlencoded',
        },
        auth: {
          username: process.env.REACT_APP_PAYPAL_CLIENT_ID,
          password: process.env.REACT_APP_PAYPAL_PASSWORD,
        },
        params: {
          grant_type: 'client_credentials',
        },
      });
      setAccessToken(access_token);
    } catch (e) {
      console.error(e);
    }
  };

  const handleEditButtonClick = () => {
    setisEditProfileEnable(true);
  };

  const handleCancelButton = () => {
    setisEditProfileEnable(false);
  };

  useEffect(() => {
    getUserProfileData();
    getPurchasedPlanDetails();
  }, []);

  return (
    <React.Fragment>
      {isLoading && <Loader />}
      <div className="tab-pane-inner">
        <div className="edit-profile-div">
          <div className="edit-common-form-div">
            <form>
              {userProfileData && (
                <div className="container container-800">
                  {!isEditProfileEnable ? (
                    <div className="row mlr-10">
                      <div className="col-lg-12 col-md-12 plr-10">
                        <ProfileUploaderComponent
                          pageUploadImage={profileImg}
                          errorMessage={imgSizeError}
                          handleProfileUploader={handleProfileUploader}
                        />
                      </div>
                      <div className="col-lg-12 col-md-12 default-flex-profile plr-10">
                        <div className="text-content-tb-profile-div">
                          <div className="heading-bx">
                            <h2>
                              {userProfileData.first_name || userProfileData.last_name
                                ? userProfileData.first_name + ' ' + userProfileData.last_name
                                : userProfileData.username}
                            </h2>
                          </div>
                          <div className="desc-div">
                            <p>{userProfileData.description}</p>
                          </div>
                        </div>
                      </div>

                      <div className="col-lg-12 col-md-12 default-flex-profile plr-10">
                        <div className="submit-bottom-div">
                          <div className="submit-bottom-div-row pt-30">
                            <Link
                              to="#"
                              className="btn btn-primary-outline btn-primary-color-02 mh-btn55 btn-cancel btn-save"
                              id="edit-profile-btn-link"
                              onClick={handleEditButtonClick}
                            >
                              {' '}
                              Edit Profile{' '}
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="row mlr-10">
                        <div className="col-lg-12 col-md-12 plr-10">
                          <ProfileUploaderComponent
                            pageUploadImage={profileImg}
                            errorMessage={imgSizeError}
                            handleProfileUploader={handleProfileUploader}
                          />
                        </div>
                      </div>
                      <div className="form-general-root pt-20" id="edit-profile-form">
                        <div className="row mlr-10">
                          <div className="col-lg-6 col-md-6 plr-10">
                            <div className="form-group mb-36">
                              <label className="label-text">First name</label>
                              <div className="form-group-control">
                                <input
                                  type="text"
                                  className="form-control focus"
                                  name="first_name"
                                  value={firstName}
                                  onChange={onHandleChangeInp}
                                />
                              </div>
                              {isFirstNameError && (
                                <div className="invalid-feedback d-block">{firstNameErrorMsg}</div>
                              )}
                            </div>
                          </div>

                          <div className="col-lg-6 col-md-6 plr-10">
                            <div className="form-group mb-36">
                              <label className="label-text">Last name</label>
                              <div className="form-group-control">
                                <input
                                  type="text"
                                  className="form-control focus"
                                  name="last_name"
                                  value={lastName}
                                  onChange={onHandleChangeInp}
                                />
                              </div>
                              {isLastNameError && (
                                <div className="invalid-feedback d-block">T{lastNameError}</div>
                              )}
                            </div>
                          </div>

                          <div className="col-lg-12 col-md-12 plr-10">
                            <div className="form-group form-group-textarea-ct-general mb-30">
                              <div className="input-control-row">
                                <textarea
                                  className="form-control form-textarea"
                                  placeholder="Describe yourself"
                                  rows="4"
                                  name="description"
                                  value={userDescription}
                                  onChange={onHandleChangeInp}
                                ></textarea>
                                <span className="tl-icon-span">
                                  <span className="bg-custom-icon write-pen-new-icon"></span>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* <div className="user-btn-div">
                        <div className="col-lg-6 col-md-6 plr-10">
                          <Link
                            to="/flexible-plans"
                            className="btn btn-common-primary btn-save"
                            style={{ fontSize: '18px' }}
                          >
                            Update plan subscription
                          </Link>
                        </div>

                        <div className="col-lg-6 col-md-6 plr-10">
                          <Link
                            to="#"
                            className="btn btn-common-black btn-black-cancel"
                            onClick={handleCancelPlanSubscription}
                          >
                            Cancel plan subscription
                          </Link>
                        </div>
                      </div> */}

                      <div className="col-lg-12 col-md-12 plr-10">
                        <div className="submit-bottom-div">
                          <div className="submit-bottom-div-row my-btn-div">
                            <Link
                              to="#"
                              className="btn btn-primary-outline btn-primary-color-02 mh-btn55 btn-cancel mr-24"
                              id="cancel-edit-profile-btn"
                              onClick={handleCancelButton}
                            >
                              {' '}
                              Cancel{' '}
                            </Link>
                            <Link
                              to="#"
                              className="btn btn-primary-outline btn-primary-color-02 mh-btn55 btn-cancel btn-save"
                              onClick={handleSaveBtnClick}
                            >
                              Save
                            </Link>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default EditProfileComponent;

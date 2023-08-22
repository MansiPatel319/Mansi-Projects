/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { get, post } from '../../../network/requests';
import { getUrl } from '../../../network/url';
import { toast } from 'react-toastify';
import { useHistory, useLocation } from 'react-router-dom';
import Loader from '../../UI/Loader/Loader';
import axios from 'axios';
import { isAuthenticated, tokenExpire } from '../../../services/auth';
toast.configure();
function FlexiblePlansSectionComponent() {
  const location = useLocation();
  const [userPlans, setuserPlans] = useState([]);
  const [purchasedPlan, setpurchasedPlan] = useState(undefined);
  const [isLoading, setIsLoadning] = useState(false);
  const getActivePlanDetails = JSON.parse(localStorage.getItem('activePlaneDetails'));
  const [activePlanStatus, setStatusOfActivePlan] = useState('');
  const [isPlanPurchased, setisPlanPurchased] = useState(false);

  const history = useHistory();
  const getUserPlans = () => {
    setIsLoadning(true);
    const url = getUrl('get_all_user_plans');
    get(url, false)
      .then((response) => {
        const {
          data: { code, data, status, message },
        } = response;
        setIsLoadning(false);
        switch (code) {
          case 200:
            if (status === true) {
              setuserPlans(data);
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
      .catch(() => {
        setIsLoadning(false);
        // toast.error('Something went wrong', {
        //   pauseOnHover: false,
        //   position: toast.POSITION.TOP_RIGHT,
        // });
      });
  };

  const getPurchasedPlanDetails = () => {
    setIsLoadning(true);
    const url = getUrl('user-plan');
    get(url, true)
      .then((response) => {
        const {
          data: { code, data, status, message },
        } = response;
        setIsLoadning(false);
        switch (code) {
          case 200:
            if (status === true) {
              setisPlanPurchased(true);
              setpurchasedPlan(data);
              getAccessToken(data.paypal_subscription_id);
            }
            break;
          case 400:
            if (message === 'You dont have any active plan!') {
              setisPlanPurchased(false);
            }
            break;
          default:
            // toast.error(message, {
            //   pauseOnHover: false,
            //   position: toast.POSITION.TOP_RIGHT,
            // });
        }
      })
      .catch(() => {
        setIsLoadning(false);
        // toast.error('Something went wrong', {
        //   pauseOnHover: false,
        //   position: toast.POSITION.TOP_RIGHT,
        // });
      });
  };

  const statusOfActivePlan = (access_token, paypal_subscription_id) => {
    fetch(
      `${process.env.REACT_APP_PAYPAL_ACCESS_TOKEN_API}/billing/subscriptions/${paypal_subscription_id}/`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${access_token}`,
        },
      },
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setStatusOfActivePlan(result.status);
        },
        (error) => {
          toast.error(error, {
            pauseOnHover: false,
            position: toast.POSITION.TOP_RIGHT,
          });
        },
      );
  };

  const cancelExpiredPlan = (planStatus) => {
    setIsLoadning(true);
    const url = getUrl('cancel_plan_subscription');
    return post(`${url}`, {}, true)
      .then((response) => {
        const {
          data: { code, status, message },
        } = response;
        setIsLoadning(false);
        switch (code) {
          case 200:
            if (status === true) {
              if (planStatus === 'EXPIRED') {
                toast.error('Your plan is expired', {
                  pauseOnHover: false,
                  position: toast.POSITION.TOP_RIGHT,
                });
              }
              // setupdatePlan(false);
              getUserPlans();
              if (typeof getActivePlanDetails !== undefined || getActivePlanDetails !== null) {
                localStorage.removeItem('activePlaneDetails');
              }
              window.location.reload();
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

  const getAccessToken = async (paypal_subscription_id) => {
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
          password: process.env.REACT_APP_PAYPAL_CLIENT_ID,
        },
        params: {
          grant_type: 'client_credentials',
        },
      });
      statusOfActivePlan(access_token, paypal_subscription_id);
    } catch (e) {
      console.error(e);
    }
  };
  const handlePlanBook = (activePlanDetails) => {
    localStorage.setItem('activePlaneDetails', JSON.stringify(activePlanDetails));
    localStorage.setItem('backButtonPath', location.pathname);
    history.push('/user-payment-details');
  };
  useEffect(() => {
    getUserPlans();
    if (isAuthenticated()) {
      getPurchasedPlanDetails();
    }

    if (activePlanStatus === 'CANCELLED' || activePlanStatus === 'EXPIRED') {
      cancelExpiredPlan(activePlanStatus);
    }
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      <div className="our-pricing-plan-div">
        <div className="container container-800">
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <div className="heading-div">
                <div className="heading-inner-div">
                  <h2>Our Pricing Plan</h2>
                  <h3>Browse our annual subscription pricing plan below</h3>
                </div>
              </div>

              <div className="our-pricing-plans-root">
                <div className="our-pricing-plans-top">
                  <div className="our-pricing-plan-row">
                    {isPlanPurchased
                      ? purchasedPlan && (
                          <div className="row justify-content-center">
                            <div className="col-lg-6 col-md-6">
                              <div className={`our-pricing-plan-card `}>
                                <input
                                  type="radio"
                                  className="custom-control-input"
                                  id="plan-select02"
                                  name="select-plan-custom"
                                />
                                <label htmlFor="plan-select02" className="flex-plan-card-inner">
                                  <div className="check-icon-group">
                                    <span className="check-span-rounded">
                                      <i className="bg-custom-icon custom-check-icon"></i>
                                    </span>
                                  </div>
                                  <div className="min-details-div">
                                    <div className="fp-title-top">
                                      <div className="fp-title-top-left">
                                        <span className="label-span active">
                                          {purchasedPlan.plan_id.name}
                                        </span>
                                      </div>
                                      <div className="fp-title-top-right">
                                        <h3>
                                          ${(purchasedPlan.plan_id.plan_amount ).toFixed(2)}{' '}
                                          <span className="text-small">/Year</span>
                                        </h3>
                                        {/* <p>$192 Billed Yearly</p> */}
                                        <p>
                                          {`$${purchasedPlan.plan_id.plan_amount}`} Billed Yearly
                                        </p>
                                      </div>
                                    </div>
                                    <div className="desc-inner-box">
                                      <ul className="check-list-ul">
                                        {purchasedPlan.plan_id.plan_covers.length > 0 &&
                                          purchasedPlan.plan_id.plan_covers.map((data, index) => {
                                            return <li key={index}>{data}</li>;
                                          })}
                                      </ul>
                                    </div>
                                  </div>
                                  <div className="plan-btn">
                                    <label className="w-100" htmlFor="plan-select02">
                                      <Link
                                        to="#"
                                        onClick={() => {
                                          if (isAuthenticated()) {
                                            handlePlanBook(purchasedPlan);
                                          } else {
                                            history.push('/user/signup');
                                          }
                                        }}
                                        className={`btn btn-primary-outline btn-primary-outline-big btn-get-started-plan ${
                                          isPlanPurchased ? 'disabled' : ''
                                        }`}
                                        id="gets-button"
                                      >{`${
                                        isPlanPurchased ? 'Plan Purchased' : 'Buy Now'
                                      }`}</Link>
                                    </label>
                                  </div>
                                </label>
                              </div>
                            </div>
                          </div>
                        )
                      : userPlans &&
                        userPlans.length > 0 &&
                        userPlans.slice(0, 1).map((cardData) => {
                          return (
                            <div className="row justify-content-center" key={cardData.id}>
                              <div className="col-lg-6 col-md-6">
                                <div className={`our-pricing-plan-card `}>
                                  <input
                                    type="radio"
                                    className="custom-control-input"
                                    id="plan-select02"
                                    name="select-plan-custom"
                                  />
                                  <label htmlFor="plan-select02" className="flex-plan-card-inner">
                                    <div className="check-icon-group">
                                      <span className="check-span-rounded">
                                        <i className="bg-custom-icon custom-check-icon"></i>
                                      </span>
                                    </div>
                                    <div className="min-details-div">
                                      <div className="fp-title-top">
                                        <div className="fp-title-top-left">
                                          <span className="label-span active">{cardData.name}</span>
                                        </div>
                                        <div className="fp-title-top-right">
                                          <h3>
                                            ${(cardData.plan_amount)}{' '}
                                            <span className="text-small">/Year</span>
                                          </h3>
                                          {/* <p>$192 Billed Yearly</p> */}
                                          <p>{`$${cardData.plan_amount}`} Billed Yearly</p>
                                        </div>
                                      </div>
                                      <div className="desc-inner-box">
                                        <ul className="check-list-ul">
                                          {cardData.plan_covers.length > 0 &&
                                            cardData.plan_covers.map((data, index) => {
                                              return <li key={index}>{data}</li>;
                                            })}
                                        </ul>
                                      </div>
                                    </div>
                                    <div className="plan-btn">
                                      <label className="w-100" htmlFor="plan-select02">
                                        <Link
                                          to="#"
                                          onClick={() => {
                                            if (isAuthenticated()) {
                                              handlePlanBook(cardData);
                                            } else {
                                              history.push('/user/signup');
                                            }
                                          }}
                                          className={`btn btn-primary-outline btn-primary-outline-big btn-get-started-plan ${
                                            isPlanPurchased ? 'disabled' : ''
                                          }`}
                                          id="gets-button"
                                        >{`${
                                          isPlanPurchased ? 'Plan Purchased' : 'Buy Now'
                                        }`}</Link>
                                      </label>
                                    </div>
                                  </label>
                                </div>
                              </div>
                            </div>
                          );
                        })}
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

export default FlexiblePlansSectionComponent;

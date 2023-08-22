import React, { useEffect, useState } from 'react';
import { get } from '../../network/requests';
import { getUrl } from '../../network/url';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { isAuthenticated } from "../../services/auth";
import { useHistory, useLocation } from 'react-router-dom';
import Loader from '../UI/Loader/Loader';
toast.configure();

const OurNewPricingPlanComponent = () => {
  const history = useHistory();
  const location = useLocation()
  const [isLoading, setIsLoadning] = useState(false);
  const [userPlans, setuserPlans] = useState([]);
  const [isPlanPurchased, setisPlanPurchased] = useState(false);

  const getUserPlansDetails = () => {
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
        toast.error('Something went wrong', {
          pauseOnHover: false,
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  const getUserPlans = () => {
    const url = getUrl('user-plan');
    if (isAuthenticated()) {
      get(url, true)
        .then((response) => {
          const {
            data: { code, status, message },
          } = response;
          switch (code) {
            case 200:
              if (status === true) {
                // setisPlanPurchased(true);
                setisPlanPurchased(true);
              }
              break;
            case 400:
              if (message === "You dont have any active plan!") {
                setisPlanPurchased(false);
              }
              break;
            default:
              toast.error(message, {
                pauseOnHover: false,
                position: toast.POSITION.TOP_RIGHT,
              });
          }
        })
        .catch(() => {
          // toast.error('Something went wrong', {
          //   pauseOnHover: false,
          //   position: toast.POSITION.TOP_RIGHT,
          // });
        });
    }
  };
  useEffect(() => {
    getUserPlansDetails();
    if (isAuthenticated()) {
      getUserPlans();
    }
  }, []);
  const handleSelectPlan = (e, cardId, activeCardData) => {
    e.preventDefault();
    localStorage.setItem("backButtonPath", location.pathname)
    localStorage.setItem('activePlaneDetails', JSON.stringify(activeCardData));
    history.push('/user-payment-details');
  };
  return (
    <section className="our-pricing-plan-section" id="our-pricing-plan-section">
      {isLoading && <Loader />}
      <div className="our-pricing-plan-div">
        <div className="container container-800">
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <div className="heading-div">
                <div className="heading-inner-div">
                  <h2>Our Pricing Plan</h2>
                  <h3>Browse our annual subscription pricing plan</h3>
                </div>
              </div>

              <div className="our-pricing-plans-root">
                <div className="our-pricing-plans-top">
                  <div className="our-pricing-plan-row">
                    {userPlans && userPlans.length > 0 &&
                      userPlans.slice(0, 1).map((cardData) => {
                        return (
                          <div className="row justify-content-center" key={cardData.id}>
                            <div className="col-lg-6 col-md-6">
                              <div className={`our-pricing-plan-card `}>
                                <input type="radio" className="custom-control-input" id="plan-select02" name="select-plan-custom" />
                                <label htmlFor="plan-select02" className="flex-plan-card-inner">
                                  <div className="check-icon-group">
                                    <span className="check-span-rounded"><i className="bg-custom-icon custom-check-icon"></i></span>
                                  </div>
                                  <div className="min-details-div">
                                    <div className="fp-title-top">
                                      <div className="fp-title-top-right">
                                        <h3> ${(cardData.plan_amount)}{' '}
                                            <span className="text-small">/Year</span>
                                          </h3>
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
                                      <Link to="#" onClick={(e) => {
                                        if (isAuthenticated()) {
                                          handleSelectPlan(e, cardData.id, cardData);
                                        } else {
                                          history.push('/user/signup')
                                        }
                                      }} className={`btn btn-primary-outline btn-primary-outline-big btn-get-started-plan ${isPlanPurchased ? 'disabled' : ''}`} id="gets-button">{`${isPlanPurchased ? 'Plan Purchased' : 'Buy Now'}`}</Link>
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
    </section>
  );
};

export default OurNewPricingPlanComponent;

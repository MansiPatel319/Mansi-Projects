import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { get, post } from '../../../network/requests';
import { getUrl } from '../../../network/url';
import stripeLogo from '../../../assets/images/icons/stripe-logo.png';
import Loader from '../../UI/Loader/Loader';
import { useHistory } from 'react-router-dom';
import { tokenExpire } from '../../../services/auth';
import PayoutDetailsComponent from './PayoutDetailsComponent';

toast.configure();
function TransferFundComponent() {
  const history = useHistory();
  const [verifyStipeConnection, setVerifyStipeConnection] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleStripeConnect = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const url = getUrl('creator_stripe_connection');
    post(url, {}, true)
      .then((response) => {
        const {
          data: { code, data, status, message },
        } = response;
        setIsLoading(false);
        switch (code) {
          case 201:
            if (status === true) {
             
              window.location.replace(data.url);
              handleGetStripeConnection();
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
        setIsLoading(false);
        tokenExpire(error.response, history);
      });
  };
  const handleStripeDisconnect = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const url = getUrl('creator_stripe_disconnection');
    post(url, {}, true)
      .then((response) => {
        const {
          data: { code, status, message },
        } = response;
        setIsLoading(false);
        switch (code) {
          case 200:
            if (status === true) {
              toast.success('Your Account Is Disconnected from creator classes Stripe Account', {
                pauseOnHover: false,
                position: toast.POSITION.TOP_RIGHT,
              });
              handleGetStripeConnection();
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
        setIsLoading(false);
        tokenExpire(error.response, history);
      });
  };
  const handleGetStripeConnection = () => {
    setIsLoading(true);
    const url = getUrl('get_check_stripe_connection');
    get(url, true)
      .then((response) => {
        const {
          data: { code, status, message },
        } = response;
        setIsLoading(false);
        switch (code) {
          case 200:
            if (status === true) {
              setVerifyStipeConnection(status);
            }
            break;
          case 400:
            if (status === false) {
              setVerifyStipeConnection(status);
            }
            break;
          default:
            toast.error(message, {
              pauseOnHover: false,
              position: toast.POSITION.TOP_RIGHT,
            });
        }
      })
      .catch((error) => {
        setIsLoading(false);
        tokenExpire(error.response, history);
      });
  };

  useEffect(() => {
    handleGetStripeConnection();
  }, []);
  useEffect(() => { }, [verifyStipeConnection]);
  return (
    <React.Fragment>
      {isLoading && <Loader />}

      {!verifyStipeConnection ? (
        <section className="ct-funds-section" id="ct-funds-section">
          <div className="ct-funds-div">
            <div className="container container-870">
              <div className="row">
                <div className="col-lg-12 col-md-12">
                  <div className="heading-div">
                    <div className="heading-inner-div">
                      <h2 style={{ textAlign: 'center' }}>Transfer Fund</h2>
                    </div>
                  </div>
                </div>


                <div className="col-lg-12 col-md-12">
                  <div className="ct-payment-div">
                    <div className="ct-payment-row">
                      <div className="ct-payment-card-box">
                        <div className="center-img-div">
                          <img src={stripeLogo} className="img-fluid img-stripe" alt="stripe" />
                        </div>
                        <p>
                          We use Stripe, the leading online payment processing for internet
                          businesses, to pay our influencers. It’s secure, fast, and easy to set up.
                        </p>
                        <div className="center-btn-div">
                          <button
                            className="btn btn-primary-outline btn-primary-outline-big flex-center-aj btn-connect"
                            onClick={handleStripeConnect}
                          >
                            Connect
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="affiliate-section" id="affiliate-section">
          <div className="affiliate-div">
            <div className="af-connect-inner-div">
              <div className="af-connect-content-row" id="connect-row">
                <div className="container container-1200">
                  <div className="row mlr-10">
                    <div className="col-lg-12 col-md-12 plr-10">
                      <div className="af-connect-content-row-main">
                        <div className="row mlr-10">
                          <div className="col-lg-6 col-md-6 plr-10">
                            <div className="af-connect-content-left">
                              <div className="str-content-div">
                                <h2>
                                  Disconnect with
                                  <img src={stripeLogo} className="img-fluid img-str" alt="" />
                                </h2>
                              </div>
                            </div>
                          </div>

                          <div className="col-lg-6 col-md-6 plr-10">
                            <div className="af-connect-content-right">
                              <div className="btn-right-div">
                                <button
                                  className="btn btn-primary-outline btn-primary-color-02 btn-primary-outline-big flex-center-aj btn-connect"
                                  id="btn-connect"
                                  onClick={handleStripeDisconnect}
                                >
                                  Disconnect
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <PayoutDetailsComponent />
            </div>
          </div>
        </section>
      )}
    </React.Fragment>
  );
}

export default TransferFundComponent;

/* eslint-disable react/no-unescaped-entities */
import React, { useEffect } from 'react';
import imageSuccess from '../../assets/images/character-successfull.png';
import { useHistory } from 'react-router-dom';
import { get } from '../../network/requests';
import { getUrl } from '../../network/url';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';
import { tokenExpire } from '../../services/auth';
function PaymentSuccessComponent() {
  const history = useHistory();
  let location = useLocation();
  var eventname = '';
  var evntid = '';
  if (location.pathname === '/user-payment-details-successfull') {
    eventname = 'Purchase';
    evntid = 'purchase.15';
  }
  const planeDataStream = JSON.parse(localStorage.getItem('activePlaneDetailsStream'));
  const planeDataOneToOne = JSON.parse(localStorage.getItem('activePlaneDetailsOneToOne'));
  const activePlaneDetails = JSON.parse(localStorage.getItem('activePlaneDetails'));
  var planamount = '';
  var successfulltext = '';
  if (planeDataOneToOne) {
    planamount = planeDataOneToOne.sessionAmount;
    successfulltext =
    'Awesome, your one-to-one session is booked! You can find the details and join the workshop under the My Purchases tab.';
  } else if (planeDataStream) {
    planamount = planeDataStream.streamAmount;
    successfulltext =
    "Awesome, your live class is booked! You can find the details and join the workshop when it's time under the My Purchases tab.";
  } else if (activePlaneDetails) {
    planamount = activePlaneDetails.plan_amount;
    successfulltext =
      'Your subscription is live, you can now access all of our classes and materials. Happy learning!';
  }
  

  
  const userPixelPageviedatapurchase = () => {
    const url = getUrl('PageView');

    return get(
      `${url}?eventName=Purchase&eventUrl=/user-payment-details-successfull&purchaseValue=${planamount}`,
      true,
    )
      .then((response) => {
        const {
          data: { code },
        } = response;
        switch (code) {
          case 201:
            break;
          case 400:
            break;
          default:
        }
      })
      .catch((error) => {
        tokenExpire(error.response, history);
      });
  };
  function handlebacktohome() {
    localStorage.removeItem('activePlaneDetailsStream');
    localStorage.removeItem('activePlaneDetailsOneToOne');
    localStorage.removeItem('keywordData');
    history.push('/user-home');
  }
  const userPixelPageviedataInitiateCheckout = () => {
    const url = getUrl('PageView');
    var encodeurl = encodeURI(
      `${url}?eventName=Initiate Checkout&eventUrl=/user-payment-details-successfull`,
    );
    return get(encodeurl, true)
      .then((response) => {
        const {
          data: { code },
        } = response;
        switch (code) {
          case 201:
            break;
          case 400:
            break;
          default:
        }
      })
      .catch((error) => {
        tokenExpire(error.response, history);
      });
  };
  useEffect(() => {
    userPixelPageviedataInitiateCheckout();
    userPixelPageviedatapurchase();
  }, []);
  return (
    <React.Fragment>
      <Helmet>
        <script>
          {` !(function(f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function() {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = '2.0';
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '599100727404477');
    fbq('track', '${eventname}, {value: ${planamount}, currency: 'GBP'}, {eventID: '${evntid}'});`}
        </script>
      </Helmet>
      <section
        className="general-payment-section payment-details-section"
        id="payment-details-section"
      >
        <div className="container container-970">
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <div className="general-payment-div">
                <div className="container-general-center">
                  <div className="heading-div mb-0">
                    <div className="heading-inner-div">
                      <h5>CONGRATULATIONS!</h5>
                      <h1>Payment Successful</h1>
                    </div>
                  </div>
                  <div className="general-message-root">
                    <div className="general-message-inner-div">
                      <div className="gen-mess-thumb-div">
                        <img src={imageSuccess} className="img-fluid img-char" alt="img" />
                      </div>

                      <div className="text-content-div">
                        <div className="prag-div">
                          <p>{successfulltext}</p>

                          {/* <p>your payment was successfull. you can now access all our courses</p> */}
                        </div>

                        <div className="btn-div">
                          <button
                            onClick={handlebacktohome}
                            className="btn btn-common-primary mh-btn55 btn-back-to-home"
                          >
                            {' '}
                            Back to Homepage{' '}
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
      </section>
    </React.Fragment>
  );
}

export default PaymentSuccessComponent;

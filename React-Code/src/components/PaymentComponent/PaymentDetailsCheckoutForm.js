/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import {
  injectStripe,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from 'react-stripe-elements';
import { useHistory, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import Loader from '../UI/Loader/Loader';
import masterImage from '../../assets/images/icons/card/master-card.svg';
import visaImage from '../../assets/images/icons/card/Visa-light.svg';
import amexImage from '../../assets/images/icons/card/AmericanExpress-light.svg';

const createOptions = {
  style: {
    base: {
      color: '#fff',
      fontSize: '18px',
      fontWeight: 400,
    },
  },
};
import { tokenExpire } from '../../services/auth';
import { toast } from 'react-toastify';
import { get, post } from '../../network/requests';
import { getUrl } from '../../network/url';
// import PayPalButtonComponent from '../UI/PayPalButtonComponent/PayPalButtonComponent';
// import PayPalSubscriptionButtonComponent from '../UI/PayPalSubscriptionButtonComponent/PayPalSubscriptionButtonComponent';
import DropDownList from '../UI/DropDownList/DropDownList';
toast.configure();
// let paypalPlanId = [];

const PaymentDetailsCheckoutForm = ({ stripe }) => {
  const history = useHistory();
  let location = useLocation();
  var eventname = '';
  var eventid = '';
  if (location.pathname === '/user-payment-details') {
    eventname = 'InitiateCheckout';
    eventid = 'initiatecheckout.12';
  }
  let keywordIds = [];
  const planeDataStream = JSON.parse(localStorage.getItem('activePlaneDetailsStream'));

  const planeDataOneToOne = JSON.parse(localStorage.getItem('activePlaneDetailsOneToOne'));
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardNumber, setCardNumber] = useState();
  const [cardExpiry, setCardExpiry] = useState();
  const [cardCvc, setCardCVC] = useState();
  const [cardNumberErr, setCardNumberErr] = useState();
  const [cardExpiryErr, setCardExpiryErr] = useState();
  const [cardCvcErr, setCardCVCErr] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [isLoading, setIsLoadning] = useState(false);
  const [holderName, setholderName] = useState('');
  const [userNameError, setuserNameError] = useState('');
  // const [isPlanPurchased, setisPlanPurchased] = useState(false);
  const [isOnetooneORLivestream, setisOnetooneORLivestream] = useState(false);
  const [cardType, setCardType] = useState();
  const [userPlan, setuserPlan] = useState('');
  // const activePlaneDetails = JSON.parse(localStorage.getItem('activePlaneDetails'));

  const optionCard = [
    {
      value: 'mastercard',
      label: <img src={masterImage} style={{ height: '40px', width: '65px' }} />,
    },
    { value: 'visa', label: <img src={visaImage} style={{ height: '40px', width: '65px' }} /> },

    { value: 'amex', label: <img src={amexImage} style={{ height: '40px', width: '65px' }} /> },
  ];
  const containerStyle = {
    position: 'relative',
    width: '90px !important',
  };
  let controlStyle = {
    width: 'inherit !important',
    background: 'transparent !important',
    border: 'none',
    borderRadius: '2px',
    position: 'relative',
    cursor: 'pointer',
    padding: '5px 5px',
  };
  const valueContainerStyle = {
    padding: ' 5px 5px',
    color: 'inherit',
    textDecoration: 'none',
    overflow: 'hidden',
    display: 'block',
    fontWeight: 'bol',
  };
  const indicatorContainerStyle = {
    border: 'none !important',
    display: 'inline-block',
    width: '12px',
    height: '8px',
    right: '16px',
  };
  const singleValueStyle = {
    width: '34px',
    height: '24px',
    background: '#fff',
    border: '1px solid #d9d9d9',
    borderRadius: '4px',
    objectFit: 'contain',
  };
  const menuStyle = {
    margin: 0,
    padding: 0,
    borderRadius: 0,
    display: 'flex',
    justifyContent: 'center',
    borderBottom: '1px solid #2d2d391a',
  };
  const menuListStyle = {
    margin: 0,
    padding: 0,
    borderBottom: '1px solid #2d2d391a',
  };
  const optionStyle = {
    background: '#fff',
    borderBottom: '1px solid #2d2d391a',
    padding: '5px 5px 0px 5px',
    height: '40px',
    width: '65px',
  };
  const alignLayout = {
    marginLeft: '9%',
  };
  const dropdownIndicatorStyle = {};
  const handleChangeCard = (item) => {
    if (item.value === 'visa') {
      setCardType({
        value: item.value,
        label: <img src={visaImage} style={{ width: '34px', height: '24px' }} />,
      });
    } else if (item.value === 'mastercard') {
      setCardType({
        value: item.value,
        label: <img src={masterImage} style={{ width: '34px', height: '24px' }} />,
      });
    } else if (item.value === 'amex') {
      setCardType({
        value: item.value,
        label: <img src={amexImage} style={{ width: '34px', height: '24px' }} />,
      });
    }
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (holderName === '') {
      setuserNameError('Please enter card holder name');
    }
    if (cardNumber === undefined) {
      setCardNumberErr('Please enter valid card number');
    }
    if (cardExpiry === undefined) {
      setCardExpiryErr('Please enter a card expiry date');
    }
    if (cardCvc === undefined) {
      setCardCVCErr('Please enter a card cvv');
    }
    if (!cardNumber || cardNumber === undefined || cardNumber === '') {
      setErrorMessage(cardNumberErr);
      return;
    }
    if (!cardExpiry) {
      setErrorMessage(cardExpiryErr);
      return;
    }
    if (!cardCvc) {
      setErrorMessage(cardCvcErr);
      return;
    }
    if (errorMessage === '' || !errorMessage) {
      try {
        callPaymentIntent();
      } catch (err) {
        setIsProcessing(false);
      }
    }
  };
  const callPaymentIntent = async () => {
    let formdata;
    setIsProcessing(true);
    const { token } = await stripe.createToken();
   console.log('token', token)
   if(token) {
    const url = getUrl('paymentIntent');
    if (planeDataStream) {
      console.log('called here for plan live ' )
      formdata = JSON.stringify({
        card_id: token.id,
        stream: planeDataStream.id,
        payment_type: 'stream',
      });
      return post(`${url}`, formdata, true)
      .then(async (response) => {
        const {
          data: { code, status, message, data },
        } = response;
        switch (code) {
          case 200:
            if (status === true) {
              const confirmCardPayment = await stripe.confirmCardPayment(data.client_secret, {});
              const { paymentIntent } = confirmCardPayment;
              setIsProcessing(false);
              if (paymentIntent === undefined) {
                // alert('faild');
              } else {
                if (paymentIntent.status === 'succeeded') {
                  // alert('succeeded');
                  if (planeDataStream) {
                    console.log('called here for plan live ' )

                    handlePurchaseFunction(paymentIntent.id);
                  } else if (planeDataOneToOne) {
                    console.log('called here for plan one to one ' )

                    bookOneToOneSession(planeDataOneToOne, paymentIntent.id);
                  } else {
                    console.log('called here for plan' )
                    handlePlanSubscription(paymentIntent.id);
                  }
                }
              }
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
        toast.error(error.message, {
          pauseOnHover: false,
          position: toast.POSITION.TOP_LEFT,
        });
      });
    } else if (planeDataOneToOne) {
      console.log('called here for plan one to one ' )
      formdata = JSON.stringify({
        card_id: token.id,
        creator: planeDataOneToOne.creatorId,
        time_slot: planeDataOneToOne.timeSlot ? planeDataOneToOne.timeSlot : '',
        payment_type: 'session',
      });
      return post(`${url}`, formdata, true)
      .then(async (response) => {
        const {
          data: { code, status, message, data },
        } = response;
        switch (code) {
          case 200:
            if (status === true) {
              const confirmCardPayment = await stripe.confirmCardPayment(data.client_secret, {});
              const { paymentIntent } = confirmCardPayment;
              setIsProcessing(false);
              if (paymentIntent === undefined) {
                // alert('faild');
              } else {
                if (paymentIntent.status === 'succeeded') {
                  // alert('succeeded');
                  if (planeDataStream) {
                    console.log('called here for plan live ' )

                    handlePurchaseFunction(paymentIntent.id);
                  } else if (planeDataOneToOne) {
                    console.log('called here for plan one to one ' )

                    bookOneToOneSession(planeDataOneToOne, paymentIntent.id);
                  } else {
                    console.log('called here for plan' )
                    handlePlanSubscription(paymentIntent.id);
                  }
                }
              }
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
        toast.error(error.message, {
          pauseOnHover: false,
          position: toast.POSITION.TOP_LEFT,
        });
      });
    } else {
      console.log('called here for plan' )
      handlePlanSubscription(token.id);
    }
   } else {
     toast.error('Card is not valid', {
      pauseOnHover: false,
      position: toast.POSITION.TOP_RIGHT,
     })
   }
   
  };
  const bookOneToOneSession = (creatorData, paymentIntentId) => {
    setIsLoadning(true);
    const url = getUrl('post_one_to_one_session');
    const formdata = new FormData();
    formdata.append('creator', creatorData.creatorId);
    formdata.append('description', creatorData.description);
    formdata.append('keywords', creatorData.searchKeywordList);
    formdata.append('time_slot', creatorData.timeSlot ? creatorData.timeSlot : '');
    formdata.append('payment_intent_id', paymentIntentId);
    setIsLoadning(false);
    if (creatorData.creatorId) {
      return post(`${url}`, formdata, true)
        .then((response) => {
          const {
            data: { code, status, message },
          } = response;
          switch (code) {
            case 201:
              if (status === true) {
                localStorage.removeItem('keywordData');
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

  const handlePurchaseFunction = (paymentIntentId) => {
    setIsLoadning(true);
    const url = getUrl('book_a_seat_post');
    const formdata = new FormData();
    formdata.append('stream', planeDataStream.id);
    formdata.append('payment_intent_id', paymentIntentId);
    // formdata.append('card_id', data.id);

    return post(`${url}`, formdata, true)
      .then((response) => {
        const {
          data: { code, status, message },
        } = response;
        setIsLoadning(false);
        switch (code) {
          case 201:
            if (status === true) {
              // localStorage.removeItem('activePlaneDetailsStream');
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

  const handlePlanSubscription = (paymentIntent) => {
    const planeData = JSON.parse(localStorage.getItem('activePlaneDetails'));
    setIsLoadning(true);
    const url = getUrl('plane_purchase_post');
    const formdata = new FormData();
    formdata.append('plan_id', planeData.id);
    formdata.append('card_id', paymentIntent);
    return post(`${url}`, formdata, true)
      .then((response) => {
        const {
          data: { code, status, message },
        } = response;
        setIsLoadning(false);
        switch (code) {
          case 201:
            if (status === true) {
              // localStorage.removeItem('activePlaneDetails');
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

  const checkBrandType = (brand) => {
    optionCard.forEach((item) => {
      if (item.value === brand) {
        handleChangeCard(item);
      }
    });
  };

  const handleChange = (event) => {
    const elementName = event.elementType;
    checkBrandType(event.brand);
    if (elementName === 'cardNumber') {
      setCardNumber(event.complete);
      if (event.error) {
        setErrorMessage(event.error.message);
        if (elementName === 'cardNumber') {
          setCardNumberErr(event.error.message);
        }
      } else {
        setErrorMessage('');
        setCardNumberErr('');
      }
    }
    if (elementName === 'cardExpiry') {
      setCardExpiry(event.complete);
      if (event.error) {
        setErrorMessage(event.error.message);
        if (elementName === 'cardExpiry') {
          setCardExpiryErr(event.error.message);
        }
      } else {
        setErrorMessage('');
        setCardExpiryErr('');
      }
    }
    if (elementName === 'cardCvc') {
      setCardCVC(event.complete);
      if (event.error) {
        setErrorMessage(event.error.message);
        if (elementName === 'cardCvc') {
          setCardCVCErr(event.error.message);
        }
      } else {
        setErrorMessage('');
        setCardCVCErr('');
      }
    }
  };
  const handleInpChange = (event) => {
    if (event.target.name === 'placeholderName') {
      if (event.target.value === '') {
        setuserNameError('Please enter your name');
        setholderName('');
      } else {
        setuserNameError('');
        setholderName(event.target.value);
      }
    }
  };

  // const paypalSubscribe = (data, actions) => {
  //   if (!isPlanPurchased) {
  //     return actions.subscription.create({
  //       plan_id: paypalPlanId[0],
  //     });
  //   } else {
  //     toast.error('Plan is already purchased!', {
  //       pauseOnHover: false,
  //       position: toast.POSITION.TOP_RIGHT,
  //     });
  //   }
  // };

  // const paypalOnError = (err) => {
  //   toast.error(err, {
  //     pauseOnHover: false,
  //     position: toast.POSITION.TOP_RIGHT,
  //   });
  //   if (paypalPlanId[0].length !== 0) {
  //     paypalPlanId.splice(0, 1);
  //   }
  // };

  // const paypalOnApprove = (data) => {
  //   onPlanSubscription(data);
  //   if (paypalPlanId[0].length !== 0) {
  //     paypalPlanId.splice(0, 1);
  //   }
  // };

  // const paypalOnStreamApprove = async (data, details) => {
  //   const order = await details.order.capture();
  //   handlePayPalStreamTransactionData(order);
  // };

  // const handlePayPalStreamTransactionData = (data) => {
  //   let url;
  //   const formdata = new FormData();
  //   url = getUrl('paypal_stream_booking');
  //   formdata.append('stream', planeDataStream.id);
  //   formdata.append('brand', 'PayPal');
  //   formdata.append('transaction_id', data.id);
  //   formdata.append('amount', planeDataStream.streamAmount);
  //   formdata.append('currency', 'USD');
  //   formdata.append('status', data.status);
  //   return post(`${url}`, formdata, true)
  //     .then((response) => {
  //       const {
  //         data: { code, status, message },
  //       } = response;
  //       switch (code) {
  //         case 201:
  //           if (status === true) {
  //             toast.success(message, {
  //               pauseOnHover: false,
  //               position: toast.POSITION.TOP_RIGHT,
  //             });
  //             // localStorage.removeItem('activePlaneDetailsStream');
  //             history.push('/user-payment-details-successfull');
  //           }
  //           break;
  //         case 400:
  //           toast.error(message, {
  //             pauseOnHover: false,
  //             position: toast.POSITION.TOP_LEFT,
  //           });
  //           break;
  //         default:
  //           toast.error(message, {
  //             pauseOnHover: false,
  //             position: toast.POSITION.TOP_LEFT,
  //           });
  //       }
  //     })
  //     .catch((error) => {
  //       tokenExpire(error.response, history);
  //     });
  // };

  // const paypalOnSessionApprove = async (data, details) => {
  //   const order = await details.order.capture();
  //   handlePayPalTransactionData(order);
  // };

  // const handlePayPalTransactionData = (data) => {
  //   const desc = localStorage.getItem('Description');
  //   const timeSLot = localStorage.getItem('TimeSlot');
  //   const formData = new FormData();
  //   let url = getUrl('paypal_session_booking');
  //   formData.append('creator', planeDataOneToOne.creatorId);
  //   formData.append('description', desc);
  //   formData.append(
  //     'keywords',
  //     planeDataOneToOne.searchKeywordList === ''
  //       ? keywordIds.toString()
  //       : planeDataOneToOne.searchKeywordList,
  //   );
  //   formData.append('time_slot', timeSLot);
  //   formData.append('transaction_id', data.id);
  //   formData.append('amount', planeDataOneToOne.sessionAmount);
  //   formData.append('currency', 'USD');
  //   formData.append('status', data.status);
  //   formData.append('brand', 'PayPal');
  //   return post(`${url}`, formData, true)
  //     .then((response) => {
  //       const {
  //         data: { code, status, message },
  //       } = response;
  //       switch (code) {
  //         case 201:
  //           if (status === true) {
  //             toast.success(message, {
  //               pauseOnHover: false,
  //               position: toast.POSITION.TOP_RIGHT,
  //             });
  //             localStorage.removeItem('keywordData');
  //             if (typeof desc !== undefined || desc !== null) {
  //               localStorage.removeItem('Description');
  //             }
  //             if (typeof timeSLot !== undefined || timeSLot !== null) {
  //               localStorage.removeItem('TimeSlot');
  //             }
  //             // localStorage.removeItem('activePlaneDetailsOneToOne');
  //             history.push('/user-payment-details-successfull');
  //           }
  //           break;
  //         case 400:
  //           toast.error(message, {
  //             pauseOnHover: false,
  //             position: toast.POSITION.TOP_LEFT,
  //           });
  //           break;
  //         default:
  //           toast.error(message, {
  //             pauseOnHover: false,
  //             position: toast.POSITION.TOP_LEFT,
  //           });
  //       }
  //     })
  //     .catch((error) => {
  //       tokenExpire(error.response, history);
  //     });
  // };

  // const onPlanSubscription = (data) => {
  //   const planeData = JSON.parse(localStorage.getItem('activePlaneDetails'));
  //   setIsLoadning(true);
  //   const url = getUrl('paypal_plan_subscription');
  //   const formdata = new FormData();
  //   formdata.append('plan_id', planeData.id);
  //   formdata.append('transaction_id', data.subscriptionID);
  //   formdata.append('amount', planeData.plan_amount);
  //   formdata.append('currency', 'USD');
  //   formdata.append('status', 'APPROVAL_PENDING');
  //   formdata.append('paypal_subscription_id', data.subscriptionID);
  //   formdata.append('brand', 'PayPal');

  //   return post(`${url}`, formdata, true)
  //     .then((response) => {
  //       const {
  //         data: { code, status, message },
  //       } = response;
  //       setIsLoadning(false);
  //       switch (code) {
  //         case 201:
  //           if (status === true) {
  //             toast.success(message, {
  //               pauseOnHover: false,
  //               position: toast.POSITION.TOP_RIGHT,
  //             });
  //             history.push('/user-payment-details-successfull');
  //           }
  //           break;
  //         case 400:
  //           toast.error(message, {
  //             pauseOnHover: false,
  //             position: toast.POSITION.TOP_RIGHT,
  //           });
  //           history.push('/user-home');
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

  // const createSessionOrder = (data, actions) => {
  //   return actions.order.create({
  //     intent: 'CAPTURE',
  //     purchase_units: [
  //       {
  //         amount: {
  //           currency_code: 'USD',
  //           value: planeDataOneToOne.sessionAmount,
  //         },
  //       },
  //     ],
  //     redirect_urls: {
  //       return_url: 'http://www.pawelbiernacki.net/PawelBiernackiSklep/Success',
  //       cancel_url: 'http://www.pawelbiernacki.net/PawelBiernackiSklep/Cancel',
  //     },
  //     headers: {
  //       Accept: 'application/json',
  //       'Accept-Language': 'en_US',
  //       'Content-Type': 'application/json',
  //       Authorization: 'Bearer ',
  //     },
  //   });
  // };

  // const createStreamOrder = (data, actions) => {
  //   return actions.order.create({
  //     intent: 'CAPTURE',
  //     purchase_units: [
  //       {
  //         amount: {
  //           currency_code: 'USD',
  //           value: planeDataStream !== undefined && planeDataStream.streamAmount,
  //         },
  //       },
  //     ],
  //     redirect_urls: {
  //       return_url: 'http://www.pawelbiernacki.net/PawelBiernackiSklep/Success',
  //       cancel_url: 'http://www.pawelbiernacki.net/PawelBiernackiSklep/Cancel',
  //     },
  //     headers: {
  //       Accept: 'application/json',
  //       'Accept-Language': 'en_US',
  //       'Content-Type': 'application/json',
  //       Authorization: 'Bearer ',
  //     },
  //   });
  // };

  // const getAccessToken = async () => {
  //   try {
  //     const {
  //       data: { access_token },
  //     } = await axios({
  //       url: `${process.env.REACT_APP_PAYPAL_ACCESS_TOKEN_API}/v1/oauth2/token`,
  //       method: 'post',
  //       headers: {
  //         Accept: 'application/json',
  //         'Accept-Language': 'en_US',
  //         'content-type': 'application/x-www-form-urlencoded',
  //       },
  //       auth: {
  //         username: process.env.REACT_APP_PAYPAL_CLIENT_ID,
  //         password: process.env.REACT_APP_PAYPAL_PASSWORD,
  //       },
  //       params: {
  //         grant_type: 'client_credentials',
  //       },
  //     });
  //     createSubscriptionProduct(access_token);
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };

  // const createSubscriptionProduct = (tokenAccess) => {
  //   if (activePlaneDetails) {
  //     let bodyRes = { name: activePlaneDetails.name };
  //     fetch(`${process.env.REACT_APP_PAYPAL_ACCESS_TOKEN_API}/v1/catalogs/products`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${tokenAccess}`,
  //       },
  //       body: JSON.stringify(bodyRes),
  //     })
  //       .then((res) => res.json())
  //       .then(
  //         (result) => {
  //           createSubscriptionPlan(tokenAccess, result.id);
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

  // const createSubscriptionPlan = (accessToken, planId) => {
  //   if (accessToken && activePlaneDetails) {
  //     let bodyRes = {
  //       product_id: planId,
  //       name: activePlaneDetails.name,
  //       billing_cycles: [
  //         {
  //           frequency: {
  //             interval_unit: 'MONTH',
  //             interval_count: 1,
  //           },
  //           tenure_type: 'REGULAR',
  //           sequence: 1,
  //           total_cycles: 12,
  //           pricing_scheme: {
  //             fixed_price: {
  //               value: activePlaneDetails.plan_amount,
  //               currency_code: 'USD',
  //             },
  //           },
  //         },
  //       ],
  //       payment_preferences: {
  //         auto_bill_outstanding: true,
  //       },
  //     };
  //     fetch(`${process.env.REACT_APP_PAYPAL_ACCESS_TOKEN_API}/v1/billing/plans`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //       body: JSON.stringify(bodyRes),
  //     })
  //       .then((res) => res.json())
  //       .then(
  //         (result) => {
  //           paypalPlanId.push(result.id);
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

  const userPixelPageviedata = () => {
    const url = getUrl('PageView');
    var geturl = `${url}?eventName=InitiateCheckout&eventUrl=/user-payment-details`;
    return get(geturl, true)
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
  const getUserPlans = () => {
    const url = getUrl('get_all_user_plans');
    get(url, false)
      .then((response) => {
        const {
          data: { code, data, status, message },
        } = response;
        switch (code) {
          case 200:
            if (status === true) {
              setuserPlan(data);
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
        // toast.error('Something went wrong', {
        //   pauseOnHover: false,
        //   position: toast.POSITION.TOP_RIGHT,
        // });
      });
  };

  const getUserPlanDetails = () => {
    setIsLoadning(true);
    const url = getUrl('user-plan');
    get(url, true)
      .then((response) => {
        const {
          data: { code, status, message },
        } = response;
        setIsLoadning(false);
        switch (code) {
          case 200:
            if (status === true) {
              setisPlanPurchased(true);
            }
            break;
          case 400:
            if (message === 'You dont have any active plan!') {
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
        setIsLoadning(false);
        // toast.error('Something went wrong', {
        //   pauseOnHover: false,
        //   position: toast.POSITION.TOP_RIGHT,
        // });
      });
  };
  useEffect(() => {
    if (planeDataStream) {
      setisOnetooneORLivestream(true);
    } else if (planeDataOneToOne) {
      setisOnetooneORLivestream(true);
    } else {
      setisOnetooneORLivestream(false);
    }
    getUserPlans();
    userPixelPageviedata();
  }, []);
  useEffect(() => {
    getKeywordsData();
    getUserPlanDetails();
  }, []);

  // useEffect(() => {
  //   getAccessToken();
  //   // openAuthenticationPopup(staticResponse.data)
  // }, []);

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
    fbq('track', '${eventname}', {eventID: '${eventid}'});`}
        </script>
      </Helmet>
      {isLoading && <Loader />}
      {isOnetooneORLivestream && (
     <div className="container container-1000">
     <div className="general-payment-div">
       <div className="container-general-center">
         <div className="row">
           <div className="general-payment-root" style={alignLayout}>
             <div className="heading-div">
               <div className="heading-inner-div">
                 <h1>Payment Details</h1>
               </div>
             </div>
             <div className="general-top">
               <div className="general-row">
                 <div className="form-general-root">
                   <form onSubmit={handleSubmit}>
                     <div className="row mlr-12">
                       <div className="col-xl-12 col-lg-12 col-md-12 plr-12">
                         <div className="form-group">
                           <div className="form-group-control">
                             <input
                               type="text"
                               className="form-control"
                               placeholder="Account holder name"
                               value={holderName}
                               onChange={handleInpChange}
                               name="placeholderName"
                             />
                             {userNameError && (
                               <p className="paymentValidations">{userNameError}</p>
                             )}
                           </div>
                         </div>
                       </div>

                       <div className="col-xl-12 col-lg-12 col-md-12 plr-12">
                         <div className="form-group credit-card-form-group">
                           <div className="form-group-control">
                             <CardNumberElement
                               required
                               onChange={handleChange}
                               className="number credit-card-number form-control payment-padding"
                               // id="cardnumber"
                               placeholder="Card Number"
                               aria-describedby="number"
                               mask="1111 1111 1111 1111"
                               style={createOptions.style}
                             />
                             <div className="select-card-dropdown-div">
                               {/* <div className="dropdown-select-card" id="myDropdown"> */}
                               <DropDownList
                                 value={cardType || handleChangeCard(optionCard[0])}
                                 onChange={handleChangeCard}
                                 options={optionCard}
                                 placeholder=""
                                 className="js-select2"
                                 id="select-filter"
                                 containerStyle={containerStyle}
                                 controlStyle={controlStyle}
                                 valueContainerStyle={valueContainerStyle}
                                 indicatorContainerStyle={indicatorContainerStyle}
                                 optionStyle={optionStyle}
                                 menuStyle={menuStyle}
                                 menuListStyle={menuListStyle}
                                 dropdownIndicatorStyle={dropdownIndicatorStyle}
                                 singleValueStyle={singleValueStyle}
                                 isSearchable={false}
                               />
                             </div>
                           </div>
                           {cardNumberErr && (
                             <p className="paymentValidations">{cardNumberErr}</p>
                           )}
                         </div>
                       </div>

                       <div className="col-xl-6 col-lg-6 col-md-6 plr-12">
                         <div className="form-group">
                           <div className="form-group-control">
                             <CardExpiryElement
                               onChange={handleChange}
                               className="number month-number form-control payment-padding"
                               // id="expiry"
                               placeholder="MM/YY"
                               mask="11/11"
                               name="expiry"
                               style={createOptions.style}
                             />
                           </div>
                           {cardExpiryErr && (
                             <p className="paymentValidations">{cardExpiryErr}</p>
                           )}
                         </div>
                       </div>

                       <div className="col-xl-6 col-lg-6 col-md-6 plr-12">
                         <div className="form-group">
                           <div className="form-group-control">
                             <CardCvcElement
                               onChange={handleChange}
                               className="form-control cvvcode payment-padding-cvv"
                               // id="cvv"
                               placeholder="CVV"
                               aria-describedby="emailHelp"
                               mask="111"
                               name="ccv"
                               style={createOptions.style}
                             />
                           </div>
                           {cardCvcErr && <p className="paymentValidations">{cardCvcErr}</p>}
                         </div>
                       </div>

                       <div className="col-xl-12 col-lg-12 col-md-12 plr-12"></div>
                     </div>
                   </form>
                   <div className="general-bottom">
                     <div className="general-btn-div-row custom-payment-btn">
                     <div className="general-btn-div-right">
                     <button
                           className="btn btn-primary-outline btn-primary-color-02 mh-btn55 btn-black-back mr-24"
                           onClick={() => {
                            localStorage.removeItem('activePlaneDetailsStream');
                            localStorage.removeItem('activePlaneDetailsOneToOne');
                            localStorage.removeItem('keywordData');
                             history.push(localStorage.getItem('backButtonPath'));
                           }}
                         >
                           <span className="text">Back</span>
                         </button>
                         </div>
                       {/* <div id='custom-paypal-button' className="general-btn-div-right custom-paypal-btn mr-24">
                         <Link to="#">
                           {planeDataOneToOne ? (
                             <>
                               <PayPalButtonComponent
                                 bookingAmount={planeDataOneToOne.sessionAmount}
                                 currency="USD"
                                 onApprove={paypalOnSessionApprove}
                                 catchError={paypalOnError}
                                 onError={paypalOnError}
                                 onCancel={paypalOnError}
                                 createOrder={createSessionOrder}
                               />
                             </>
                           ) : (
                             <>
                               {planeDataStream ? (
                                 <>
                                   <PayPalButtonComponent
                                     bookingAmount={planeDataStream.streamAmount}
                                     currency="USD"
                                     onApprove={paypalOnStreamApprove}
                                     catchError={paypalOnError}
                                     onError={paypalOnError}
                                     onCancel={paypalOnError}
                                     createOrder={createStreamOrder}
                                   />
                                 </>
                               ) : (
                                 <>
                                   {activePlaneDetails ? (
                                     <PayPalSubscriptionButtonComponent
                                       bookingAmount={activePlaneDetails.plan_amount}
                                       currency="USD"
                                       onApprove={paypalOnApprove}
                                       catchError={paypalOnError}
                                       onError={paypalOnError}
                                       onCancel={paypalOnError}
                                       createSubscription={paypalSubscribe}
                                     />
                                   ) : (
                                     ''
                                   )}
                                 </>
                               )}
                             </>
                           )}
                         </Link>
                       </div> */}
                       {' '}
                       <div className="general-btn-div-right">
                        
                         <button
                           className="btn btn-common-primary mh-btn55 btn-book"
                           onClick={handleSubmit}
                           type="submit"
                           disabled={isProcessing}
                         >
                           {isProcessing ? 'Processing' : 'Pay Now'}
                         </button>
                         <span></span>
                       
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </div>
     </div>
   </div>
    )}
      {!isOnetooneORLivestream && (
        <div className="container container-1000">
          <div className="general-payment-div">
            <div className="container">
              <div className="row">
                <div className="col-md-6 form-general-root">
                  <div className="heading-div">
                    <div className="heading-inner-div">
                      <h1 style={{ textAlign: 'left' }}>Payment Method:</h1>
                    </div>
                    <div
                      style={{
                        width: '70%',
                        height: '5px',
                        background: 'linear-gradient( 45deg, #d04242, transparent)',
                      }}
                    ></div>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="row mlr-12">
                      <div className="col-xl-12 col-lg-12 col-md-12 plr-12">
                        <div className="form-group">
                          <div className="form-group-control">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Account holder name"
                              value={holderName}
                              onChange={handleInpChange}
                              name="placeholderName"
                            />
                            {userNameError && <p className="paymentValidations">{userNameError}</p>}
                          </div>
                        </div>
                      </div>

                      <div className="col-xl-12 col-lg-12 col-md-12 plr-12">
                        <div className="form-group credit-card-form-group">
                          <div className="form-group-control">
                            <CardNumberElement
                              required
                              onChange={handleChange}
                              className="number credit-card-number form-control payment-padding"
                              // id="cardnumber"
                              placeholder="Card Number"
                              aria-describedby="number"
                              mask="1111 1111 1111 1111"
                              style={createOptions.style}
                            />
                            <div className="select-card-dropdown-div">
                              {/* <div className="dropdown-select-card" id="myDropdown"> */}
                              <DropDownList
                                value={cardType || handleChangeCard(optionCard[0])}
                                onChange={handleChangeCard}
                                options={optionCard}
                                placeholder=""
                                className="js-select2"
                                id="select-filter"
                                containerStyle={containerStyle}
                                controlStyle={controlStyle}
                                valueContainerStyle={valueContainerStyle}
                                indicatorContainerStyle={indicatorContainerStyle}
                                optionStyle={optionStyle}
                                menuStyle={menuStyle}
                                menuListStyle={menuListStyle}
                                dropdownIndicatorStyle={dropdownIndicatorStyle}
                                singleValueStyle={singleValueStyle}
                                isSearchable={false}
                              />
                            </div>
                          </div>
                          {cardNumberErr && <p className="paymentValidations">{cardNumberErr}</p>}
                        </div>
                      </div>

                      <div className="col-xl-6 col-lg-6 col-md-6 plr-12">
                        <div className="form-group">
                          <div className="form-group-control">
                            <CardExpiryElement
                              onChange={handleChange}
                              className="number month-number form-control payment-padding"
                              // id="expiry"
                              placeholder="MM/YY"
                              mask="11/11"
                              name="expiry"
                              style={createOptions.style}
                            />
                          </div>
                          {cardExpiryErr && <p className="paymentValidations">{cardExpiryErr}</p>}
                        </div>
                      </div>

                      <div className="col-xl-6 col-lg-6 col-md-6 plr-12">
                        <div className="form-group">
                          <div className="form-group-control">
                            <CardCvcElement
                              onChange={handleChange}
                              className="form-control cvvcode payment-padding-cvv"
                              // id="cvv"
                              placeholder="CVV"
                              aria-describedby="emailHelp"
                              mask="111"
                              name="ccv"
                              style={createOptions.style}
                            />
                          </div>
                          {cardCvcErr && <p className="paymentValidations">{cardCvcErr}</p>}
                        </div>
                      </div>
                      <p className="note2">Total: $199 billed annually</p>
                      <div className="col-xl-12 col-lg-12 col-md-12 plr-12"></div>
                    </div>
                  </form>
                  <div className="general-bottom">
                    <div className="general-btn-div-row">
                      {/* <div className="general-btn-div-left">
                        <Link to="#">
                          {
                            planeDataOneToOne ? (
                              <>
                                <PayPalButtonComponent
                                  bookingAmount={planeDataOneToOne.sessionAmount}
                                  currency="USD"
                                  onApprove={paypalOnSessionApprove}
                                  catchError={paypalOnError}
                                  onError={paypalOnError}
                                  onCancel={paypalOnError}
                                  createOrder={createSessionOrder}
                                />
                              </>
                            ) : (
                              <>
                                {planeDataStream ? (
                                  <>
                                    <PayPalButtonComponent
                                      bookingAmount={planeDataStream.streamAmount}
                                      currency="USD"
                                      onApprove={paypalOnStreamApprove}
                                      catchError={paypalOnError}
                                      onError={paypalOnError}
                                      onCancel={paypalOnError}
                                      createOrder={createStreamOrder}
                                    />
                                  </>
                                ) : (
                                  <>
                                    {activePlaneDetails ? (
                                      <PayPalSubscriptionButtonComponent
                                        bookingAmount={activePlaneDetails.plan_amount}
                                        currency="USD"
                                        onApprove={paypalOnApprove}
                                        catchError={paypalOnError}
                                        onError={paypalOnError}
                                        onCancel={paypalOnError}
                                        createSubscription={paypalSubscribe}
                                      />
                                    ) : (
                                      ''
                                    )}
                                  </>
                                )}
                              </>
                            )
                          }
                        </Link>
                      </div> */}

                      <div className="general-btn-div-right">
                        <button
                          className="btn btn-primary-outline btn-primary-color-02 mh-btn55 btn-black-back mr-24"
                          onClick={() => {
                            history.push(localStorage.getItem('backButtonPath'));
                          }}
                        >
                          <span className="text">Back</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <p className="note">Transactions are encrypted and secure.</p>
                </div>
                <div className="col-md-6 form-general-root">
                  {/* eslint-disable-next-line no-undef */}

                  {userPlan &&
                    userPlan.length > 0 &&
                    userPlan.slice(0, 1).map((planData) => {
                      return (
                        <div key={planData.id} className="general-bk-co-details-div">
                          <div className="general-bk-co-details-inner">
                            <div className="bk-co-card-root">
                              <div className="our-pricing-plan-card our-pricing-plan-full-card">
                                <div className="flex-plan-card-inner">
                                  <div className="flex-plan-card-inner-right-div">
                                    <div className="check-icon-group">
                                      <span className="check-span-rounded">
                                        <i className="bg-custom-icon custom-check-icon"></i>
                                      </span>
                                    </div>

                                    <div className="min-details-div Paymentdetails">
                                      <div className="fp-title-top">
                                        {/* <div className="fp-title-top-left">
                                   <span className="label-span active">{planData.name}</span>
                               </div> */}
                                        <div className="fp-title-top-right">
                                          <h3>
                                            ${(planData.plan_amount)}{' '}
                                            <span className="text-small">/Year</span>
                                          </h3>
                                          <p>{`$${planData.plan_amount}`} Billed Yearly</p>
                                        </div>
                                      </div>
                                      <div className="desc-inner-box">
                                        <ul className="check-list-ul">
                                          {planData.plan_covers.length > 0 &&
                                            planData.plan_covers.map((data, index) => {
                                              return <li key={index}>{data}</li>;
                                            })}
                                        </ul>
                                      </div>
                                      <button
                                        className="btn btn-common-primary mh-btn55 btn-book"
                                        onClick={handleSubmit}
                                        type="submit"
                                        style={{ marginLeft: '27%', width: '50%' }}
                                        disabled={isProcessing}
                                      >
                                        {isProcessing ? 'Processing' : 'Pay Now'}
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  <p className="note1">
                    By Subscribing, you agree to the Terms of Use and Privacy Policy
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div id="authenticatepin"></div>
    </React.Fragment>
  );
};
export default injectStripe(PaymentDetailsCheckoutForm);
PaymentDetailsCheckoutForm.propTypes = {
  stripe: PropTypes.any,
};

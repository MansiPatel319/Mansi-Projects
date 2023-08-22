import React, { useEffect, useState } from 'react';
import {
  injectStripe,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from 'react-stripe-elements';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
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
import PayPalButtonComponent from '../UI/PayPalButtonComponent/PayPalButtonComponent';
import PayPalSubscriptionButtonComponent from '../UI/PayPalSubscriptionButtonComponent/PayPalSubscriptionButtonComponent';
import DropDownList from '../UI/DropDownList/DropDownList';
toast.configure();
let paypalPlanId = [];

const PaymentDetailsCheckoutForm = ({ stripe }) => {
  const history = useHistory();
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
  const [isPlanPurchased, setisPlanPurchased] = useState(false);
  const [cardType, setCardType] = useState();
  const activePlaneDetails = JSON.parse(localStorage.getItem('activePlaneDetails'));
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
        setIsProcessing(true);

        if (planeDataStream) {
          console.log('live');
          const { token } = await stripe.createToken();
          handlePurchaseFunction(token);
        } else if (planeDataOneToOne) {
          console.log('live');
          const { token } = await stripe.createToken();
          bookOneToOneSession(token, planeDataOneToOne);
        } else {
          console.log('sub');
          const { token } = await stripe.createToken();
          handlePlanSubscription(token);
        }

        setIsProcessing(false);
      } catch (err) {
        setIsProcessing(false);
      }
    }
  };

  // const convertArray = (data) => {
  //   const arr = data.split(',');
  //   return arr;
  // };

  const bookOneToOneSession = (tokenData, creatorData) => {
    const url = getUrl('post_one_to_one_session');
    const formdata = new FormData();
    formdata.append('card_id', tokenData.id);
    formdata.append('creator', creatorData.creatorId);
    formdata.append('description', creatorData.description);
    formdata.append('keywords', creatorData.searchKeywordList);
    formdata.append('time_slot', creatorData.timeSlot ? creatorData.timeSlot : '');

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
                localStorage.removeItem('activePlaneDetailsOneToOne');
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

  const handlePurchaseFunction = (data) => {
    setIsLoadning(true);
    const url = getUrl('book_a_seat_post');
    const formdata = new FormData();
    formdata.append('stream', planeDataStream.id);
    formdata.append('card_id', data.id);
    return post(`${url}`, formdata, true)
      .then((response) => {
        const {
          data: { code, status, message },
        } = response;
        setIsLoadning(false);
        switch (code) {
          case 201:
            if (status === true) {
              localStorage.removeItem('activePlaneDetailsStream');
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

  const handlePlanSubscription = (token) => {
    const planeData = JSON.parse(localStorage.getItem('activePlaneDetails'));
    setIsLoadning(true);
    const url = getUrl('plane_purchase_post');
    const formdata = new FormData();
    formdata.append('plan_id', planeData.id);
    formdata.append('card_id', token.id);
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

  const paypalSubscribe = (data, actions) => {
    if (!isPlanPurchased) {
      return actions.subscription.create({
        plan_id: paypalPlanId[0],
      });
    } else {
      toast.error('Plan is already purchased!', {
        pauseOnHover: false,
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const paypalOnError = (err) => {
    toast.error(err, {
      pauseOnHover: false,
      position: toast.POSITION.TOP_RIGHT,
    });
    if (paypalPlanId[0].length !== 0) {
      paypalPlanId.splice(0, 1);
    }
  };

  const paypalOnApprove = (data) => {
    onPlanSubscription(data);
    if (paypalPlanId[0].length !== 0) {
      paypalPlanId.splice(0, 1);
    }
  };

  const paypalOnStreamApprove = async (data, details) => {
    const order = await details.order.capture();
    handlePayPalStreamTransactionData(order);
  };

  const handlePayPalStreamTransactionData = (data) => {
    let url;
    const formdata = new FormData();
    url = getUrl('paypal_stream_booking');
    formdata.append('stream', planeDataStream.id);
    formdata.append('brand', 'PayPal');
    formdata.append('transaction_id', data.id);
    formdata.append('amount', planeDataStream.streamAmount);
    formdata.append('currency', 'USD');
    formdata.append('status', data.status);
    return post(`${url}`, formdata, true)
      .then((response) => {
        const {
          data: { code, status, message },
        } = response;
        switch (code) {
          case 201:
            if (status === true) {
              toast.success(message, {
                pauseOnHover: false,
                position: toast.POSITION.TOP_RIGHT,
              });
              localStorage.removeItem('activePlaneDetailsStream');
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
  };

  const paypalOnSessionApprove = async (data, details) => {
    const order = await details.order.capture();
    handlePayPalTransactionData(order);
  };

  const handlePayPalTransactionData = (data) => {
    const desc = localStorage.getItem('Description');
    const timeSLot = localStorage.getItem('TimeSlot');
    const formData = new FormData();
    let url = getUrl('paypal_session_booking');
    formData.append('creator', planeDataOneToOne.creatorId);
    formData.append('description', desc);
    formData.append(
      'keywords',
      planeDataOneToOne.searchKeywordList === ''
        ? keywordIds.toString()
        : planeDataOneToOne.searchKeywordList,
    );
    formData.append('time_slot', timeSLot);
    formData.append('transaction_id', data.id);
    formData.append('amount', planeDataOneToOne.sessionAmount);
    formData.append('currency', 'USD');
    formData.append('status', data.status);
    formData.append('brand', 'PayPal');
    return post(`${url}`, formData, true)
      .then((response) => {
        const {
          data: { code, status, message },
        } = response;
        switch (code) {
          case 201:
            if (status === true) {
              toast.success(message, {
                pauseOnHover: false,
                position: toast.POSITION.TOP_RIGHT,
              });
              localStorage.removeItem('keywordData');
              if (typeof desc !== undefined || desc !== null) {
                localStorage.removeItem('Description');
              }
              if (typeof timeSLot !== undefined || timeSLot !== null) {
                localStorage.removeItem('TimeSlot');
              }
              localStorage.removeItem('activePlaneDetailsOneToOne');
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
  };

  const onPlanSubscription = (data) => {
    const planeData = JSON.parse(localStorage.getItem('activePlaneDetails'));
    setIsLoadning(true);
    const url = getUrl('paypal_plan_subscription');
    const formdata = new FormData();
    formdata.append('plan_id', planeData.id);
    formdata.append('transaction_id', data.subscriptionID);
    formdata.append('amount', planeData.plan_amount);
    formdata.append('currency', 'USD');
    formdata.append('status', 'APPROVAL_PENDING');
    formdata.append('paypal_subscription_id', data.subscriptionID);
    formdata.append('brand', 'PayPal');

    return post(`${url}`, formdata, true)
      .then((response) => {
        const {
          data: { code, status, message },
        } = response;
        setIsLoadning(false);
        switch (code) {
          case 201:
            if (status === true) {
              toast.success(message, {
                pauseOnHover: false,
                position: toast.POSITION.TOP_RIGHT,
              });
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

  const createSessionOrder = (data, actions) => {
    return actions.order.create({
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: planeDataOneToOne.sessionAmount,
          },
        },
      ],
      redirect_urls: {
        return_url: 'http://www.pawelbiernacki.net/PawelBiernackiSklep/Success',
        cancel_url: 'http://www.pawelbiernacki.net/PawelBiernackiSklep/Cancel',
      },
      headers: {
        Accept: 'application/json',
        'Accept-Language': 'en_US',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ',
      },
    });
  };

  const createStreamOrder = (data, actions) => {
    return actions.order.create({
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: planeDataStream !== undefined && planeDataStream.streamAmount,
          },
        },
      ],
      redirect_urls: {
        return_url: 'http://www.pawelbiernacki.net/PawelBiernackiSklep/Success',
        cancel_url: 'http://www.pawelbiernacki.net/PawelBiernackiSklep/Cancel',
      },
      headers: {
        Accept: 'application/json',
        'Accept-Language': 'en_US',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ',
      },
    });
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
      createSubscriptionProduct(access_token);
    } catch (e) {
      console.error(e);
    }
  };

  const createSubscriptionProduct = (tokenAccess) => {
    if (activePlaneDetails) {
      let bodyRes = { name: activePlaneDetails.name };
      fetch(`${process.env.REACT_APP_PAYPAL_ACCESS_TOKEN_API}/catalogs/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tokenAccess}`,
        },
        body: JSON.stringify(bodyRes),
      })
        .then((res) => res.json())
        .then(
          (result) => {
            createSubscriptionPlan(tokenAccess, result.id);
          },
          (error) => {
            toast.error(error, {
              pauseOnHover: false,
              position: toast.POSITION.TOP_RIGHT,
            });
          },
        );
    }
  };

  const createSubscriptionPlan = (accessToken, planId) => {
    if (accessToken && activePlaneDetails) {
      let bodyRes = {
        product_id: planId,
        name: activePlaneDetails.name,
        billing_cycles: [
          {
            frequency: {
              interval_unit: 'MONTH',
              interval_count: 1,
            },
            tenure_type: 'REGULAR',
            sequence: 1,
            total_cycles: 12,
            pricing_scheme: {
              fixed_price: {
                value: activePlaneDetails.plan_amount,
                currency_code: 'USD',
              },
            },
          },
        ],
        payment_preferences: {
          auto_bill_outstanding: true,
        },
      };
      fetch(`${process.env.REACT_APP_PAYPAL_ACCESS_TOKEN_API}/billing/plans`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(bodyRes),
      })
        .then((res) => res.json())
        .then(
          (result) => {
            paypalPlanId.push(result.id);
          },
          (error) => {
            toast.error(error, {
              pauseOnHover: false,
              position: toast.POSITION.TOP_RIGHT,
            });
          },
        );
    }
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
    getKeywordsData();
    getUserPlanDetails();
  }, []);

  useEffect(() => {
    getAccessToken();
  }, []);

  return (
    <>
      {isLoading && <Loader />}
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

                <div className="col-xl-12 col-lg-12 col-md-12 plr-12">
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="remember-me-card"
                      name="example1"
                    />
                    <label className="custom-control-label" htmlFor="remember-me-card">
                      Remember this card
                    </label>
                  </div>
                </div>
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
                  <button
                    className="btn btn-common-primary mh-btn55 btn-book"
                    onClick={handleSubmit}
                    type="submit"
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
    </>
  );
};

export default injectStripe(PaymentDetailsCheckoutForm);
PaymentDetailsCheckoutForm.propTypes = {
  stripe: PropTypes.any,
};

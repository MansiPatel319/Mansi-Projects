import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  injectStripe,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from 'react-stripe-elements';
import PropTypes from "prop-types";
import { get, post } from "../../network/requests";
import { getUrl } from "../../network/url";
import { toast } from 'react-toastify';
import ChooseSlotComponent from "../Users/BookOneToOneComponent/ChooseSlotComponent";
import FilterComponent from "../Filter/FilterComponent";
import { tokenExpire } from "../../services/auth";
import { useHistory } from "react-router-dom";
import PayPalButtonComponent from "../UI/PayPalButtonComponent/PayPalButtonComponent";
toast.configure();

let keywordIds = [];
const BookingOneToOneCheckoutForm = ({ stripe, creatorId, handleCloseOneToOneModal, handleBookingModal }) => {
  const history = useHistory();
  const createOptions = {
    style: {
      base: {
        color: '#fff',
        fontSize: '15px',
      },
    },
  };

  const [isProcessing, setIsProcessing] = useState(false);
  const [cardNumber, setCardNumber] = useState();
  const [cardExpiry, setCardExpiry] = useState();
  const [cardCvc, setCardCVC] = useState();
  const [cardNumberErr, setCardNumberErr] = useState();
  const [cardExpiryErr, setCardExpiryErr] = useState();
  const [cardCvcErr, setCardCVCErr] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [sessionData, setsessionData] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [keywordError, setkeywordError] = useState('');
  const [description, setdescription] = useState('');
  const [descriptionError, setdescriptionError] = useState('');
  const [timeSlot, settimeSlot] = useState('');
  const [timeSlotError, settimeSlotError] = useState('');
  const [isButtonEnable, setisButtonEnable] = useState(false);

  const handleSetKeywords = (keywordData) => {
    const searchKey = keywordData === "" ? "" : keywordData.toString();
    setSearchKeyword(searchKey);
    setkeywordError("");
  };

  const handleTimeSlot = (timeSlotId) => {
    if (timeSlotId === 0) {
      settimeSlotError("Please select time slot");
      setisButtonEnable(false);
    }
    else {
      localStorage.setItem("TimeSlot", timeSlotId);
      settimeSlot(timeSlotId);
      settimeSlotError("");
      setisButtonEnable(true);
    }
  }

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

  const getSessionData = () => {
    const url = getUrl("get_one_to_one_session");
    if (creatorId) {
      return get(`${url}${creatorId}/`, true)
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
    }
  }

  const handleTextInpchange = (e) => {
    if (e.target.value === "") {
      setdescriptionError("Please write description");
      setisButtonEnable(false);
    }
    localStorage.setItem("Description", e.target.value);
    setdescription(e.target.value);
    setdescriptionError("");
    setisButtonEnable(true);
  }


  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (description === "") {
      setdescriptionError("Please write description");
    }
    if (description !== "") {
      setdescriptionError("");
    }
    if (timeSlot === "" || timeSlot === undefined || timeSlot === null) {
      settimeSlotError("Please select time slot");
    }
    if (cardNumber === undefined) {
      setCardNumberErr("Please enter a card number");
      return;
    }
    if (cardExpiry === undefined) {
      setCardExpiryErr("Please enter a card expiry date");
      return;
    }
    if (cardCvc === undefined) {
      setCardCVCErr("Please enter a card cvv");
      return;
    }
    if (!cardNumber) {
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
        const { token } = await stripe.createToken();
        bookOneToOneSession(token);
        setIsProcessing(false);
      } catch (err) {
        setIsProcessing(false);
      }
    }
  };
  const handleOnBlur = (event) => {
    if (event.target.value === "") {
      setdescriptionError("Please write description");
    }
    setdescriptionError("");
  }

  const handleChange = (event) => {
    const elementName = event.elementType;

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
        if (elementName === 'cardNumber') {
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
        if (elementName === 'cardNumber') {
          setCardCVCErr(event.error.message);
        }
      } else {
        setErrorMessage('');
        setCardCVCErr('');
      }
    }
  };

  const bookOneToOneSession = (tokenData) => {
    const url = getUrl("post_one_to_one_session");
    const formdata = new FormData();
    formdata.append('card_id', tokenData.id);
    formdata.append('creator', sessionData.session.creator.id);
    formdata.append('description', description);
    formdata.append('keywords', searchKeyword === "" ? keywordIds.toString() : searchKeyword);
    formdata.append('time_slot', timeSlot);

    if (creatorId) {
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
                localStorage.removeItem("keywordData");
                handleCloseOneToOneModal(false);
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
  }

  const paypalOnError = (err) => {
    toast.error(err, {
      pauseOnHover: false,
      position: toast.POSITION.TOP_RIGHT,
    });
  }

  const createOrder = (data, actions) => {
    return actions.order.create({
      intent: "CAPTURE",
      purchase_units: [{
        amount: {
          currency_code: "USD",
          value: sessionData.session.amount,
        },
      }],
      redirect_urls: {
        return_url: 'http://www.pawelbiernacki.net/PawelBiernackiSklep/Success',
        cancel_url: 'http://www.pawelbiernacki.net/PawelBiernackiSklep/Cancel'
      },
      headers: {
        'Accept': 'application/json',
        'Accept-Language': 'en_US',
        'Content-Type': 'application/json',
        'Authorization': "Bearer "
      }
    });
  };

  const paypalOnApprove = async (data, details) => {
    const order = await details.order.capture();
    handlePayPalTransactionData(order);
  };

  const handlePayPalTransactionData = (data) => {
    const desc = localStorage.getItem("Description");
    const timeSLot = localStorage.getItem("TimeSlot");
    const formdata = new FormData();
    let url = getUrl('paypal_session_booking');
    formdata.append('creator', sessionData.session.creator.id);
    formdata.append('description', desc);
    formdata.append('keywords', searchKeyword === "" ? keywordIds.toString() : searchKeyword);
    formdata.append('time_slot', timeSLot);
    formdata.append('transaction_id', data.id);
    formdata.append('amount', sessionData.session.amount);
    formdata.append('currency', "USD");
    formdata.append('status', data.status);
    formdata.append('brand', "PayPal");

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
              localStorage.removeItem("keywordData");
              handleCloseOneToOneModal(false);
              if (typeof desc !== undefined || desc !== null) {
                localStorage.removeItem("Description");
              }
              if (typeof timeSLot !== undefined || timeSLot !== null) {
                localStorage.removeItem("TimeSlot")
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
        tokenExpire(error.response, history);
      });
  };


  useEffect(() => {
    getSessionData();
    getKeywordsData();
  }, []);

  return (
    <>
      <div className="booking-common-inner">
        <div className="booking-oto-form-root">
          <div className="common-form-div">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="oto-label">
                  <span className="text">{`One-to-One session with ${sessionData.session !== undefined ? sessionData.session.creator.full_name : ''}`}</span>
                  <span className="oto-span-text">
                    <span className="bg-custom-icon person-group-icon2"></span>
                    one-to-one
                  </span>
                </label>
                <label className="oto-label">
                  <h3>
                    Amount <span className="amount-span text">{`$${sessionData.session !== undefined ? sessionData.session.amount : ''}`}</span>
                  </h3>
                </label>
                <div className="input-control-row">
                  <textarea
                    className="form-control"
                    placeholder="Write description"
                    rows="4"
                    onChange={(e) => { handleTextInpchange(e) }}
                    onBlur={(e) => { handleOnBlur(e) }}
                  ></textarea>
                </div>
                {descriptionError && <span style={{ color: 'red', fontSize: '18px', margin: '15px' }}>{descriptionError}</span>}
              </div>

              <div className="form-group mb-15">
                <label>
                  <span className="text">Choose Category</span>
                </label>
                <div className="category-control-row">
                  <div className="category-inner">
                    <FilterComponent handleSetKeywords={handleSetKeywords} />
                  </div>
                  {keywordError && <span style={{ color: 'red', fontSize: '18px', margin: '10px' }}>{keywordError}</span>}
                </div>

              </div>

              <div className="form-group mb-15">
                <label>
                  <span className="text">Choose a slot</span>
                </label>
                <ChooseSlotComponent sessionTimeSlot={sessionData.time_slots !== undefined ? sessionData.time_slots : ''} handleTimeSlot={handleTimeSlot} />
                {timeSlotError && <span style={{ color: 'red', fontSize: '18px', margin: '10px' }}>{timeSlotError}</span>}
              </div>

              <div className="account-card-box">
                <div className="account-card-box-row">
                  <div className="icon-div">
                    <i className="bg-custom-icon credit-card-icon"></i> <span></span>
                  </div>
                  <div className="card-number">
                    <CardNumberElement
                      onChange={handleChange}
                      className="number credit-card-number form-control"
                      id="cardnumber"
                      placeholder="Card Number"
                      aria-describedby="number"
                      mask="1111 1111 1111 1111"
                      style={createOptions.style}
                    />
                  </div>
                  <div className="card-exp-time">
                    <CardExpiryElement
                      onChange={handleChange}
                      className="number month-number form-control"
                      id="expiry"
                      placeholder="MM/YY"
                      mask="11/11"
                      name="expiry"
                      style={createOptions.style}
                    />
                  </div>
                  <div className="card-cvc">
                    <CardCvcElement
                      onChange={handleChange}
                      className="form-control cvvcode"
                      id="cvv"
                      placeholder="CVV"
                      aria-describedby="emailHelp"
                      mask="111"
                      name="ccv"
                      style={createOptions.style}
                    />
                  </div>
                </div>
                {cardNumberErr && <p className="paymentValidations" style={{ margin: '10px' }}>{cardNumberErr}</p>}
                {cardExpiryErr && <p className="paymentValidations" style={{ margin: '10px' }}>{cardExpiryErr}</p>}
                {cardCvcErr && <p className="paymentValidations" style={{ margin: '10px' }}>{cardCvcErr}</p>}
              </div>
              <p style={{ color: 'white', fontSize: "25px", textAlign: 'center', fontWeight: 'bold', marginBottom: '20px' }}>OR</p>
              {sessionData.session !== undefined && sessionData.session.amount !== undefined &&
                <PayPalButtonComponent
                  // handleClick={handleOnClick}
                  amount={sessionData.session.amount}
                  currency="USD"
                  onApprove={paypalOnApprove}
                  catchError={paypalOnError}
                  onError={paypalOnError}
                  onCancel={paypalOnError}
                  createOrder={createOrder}
                  // onClick={handleOnClick}
                  isActive={isButtonEnable}
                />}
            </form>
          </div>
        </div>
      </div>
      <div className="booking-common-bottom">
        <div className="booking-common-bottom-row">
          <Link to="#" className="btn btn-common-black btn-black-back" onClick={handleBookingModal}>
            Back
          </Link>
          <button
            className="btn btn-common-primary btn-book"
            onClick={handleSubmit}
            type="submit"
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing' : 'Book'}
          </button>
        </div>
      </div>
    </>
  );
};

export default injectStripe(BookingOneToOneCheckoutForm);
BookingOneToOneCheckoutForm.propTypes = {
  stripe: PropTypes.any,
  creatorId: PropTypes.number,
  handleCloseOneToOneModal: PropTypes.func,
  handleBookingModal: PropTypes.func
};

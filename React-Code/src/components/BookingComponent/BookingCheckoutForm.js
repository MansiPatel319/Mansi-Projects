import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  injectStripe,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from 'react-stripe-elements';
import PropTypes from 'prop-types';
import { get, post } from '../../network/requests';
import { getUrl } from '../../network/url';
import noDataImg from '../../assets/images/no-post-imge.png';
import Loader from '../UI/Loader/Loader';
import { tokenExpire } from "../../services/auth";
import db from "../../Firebase";
import PayPalButtonComponent from "../UI/PayPalButtonComponent/PayPalButtonComponent";

const createOptions = {
  style: {
    base: {
      color: '#fff',
      fontSize: '15px',
    },
  },
};
toast.configure();
const CheckoutForm = ({ stripe, handleOpenOneToOneModal, handleCloseModal }) => {
  const history = useHistory();
  const params = useParams();
  const [isProcessing, setIsProcessing] = useState(false);
  const [UserBookSeatData, setbookSeatData] = useState();
  const [cardNumber, setCardNumber] = useState();
  const [cardExpiry, setCardExpiry] = useState();
  const [cardCvc, setCardCVC] = useState();
  const [cardNumberErr, setCardNumberErr] = useState();
  const [cardExpiryErr, setCardExpiryErr] = useState();
  const [cardCvcErr, setCardCVCErr] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [isLoading, setIsLoadning] = useState(false);
  const [roomDetails, setroomDetails] = useState([]);
  const userData = JSON.parse(localStorage.getItem("userCreatorData"));

  const addUserToChatRoom = () => {
    if (typeof roomDetails !== undefined || UserBookSeatData !== undefined) {
      for (let i = 0; i < roomDetails.length; i++) {
        if (roomDetails[i].data.name === UserBookSeatData.title) {
          localStorage.setItem("roomId", roomDetails[i].id);
          db.collection('rooms').doc(roomDetails[i].id).collection('messages').add({
            id: userData.id,
          })
        }
      }
    }
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault();
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
        handlePurchaseFunction(token);
        setIsProcessing(false);
      } catch (err) {
        setIsProcessing(false);
      }
    }
  };

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

  const handlePurchaseFunction = (data) => {
    setIsLoadning(true);
    const url = getUrl('book_a_seat_post');
    const formdata = new FormData();
    formdata.append('stream', UserBookSeatData.id);
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
              toast.success(message, {
                pauseOnHover: false,
                position: toast.POSITION.TOP_LEFT,
              });
              addUserToChatRoom();
              handleCloseModal(false);
            }
            break;
          case 400:
            toast.error(message, {
              pauseOnHover: false,
              position: toast.POSITION.TOP_LEFT,
            });
            handleCloseModal(false);
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
        setIsLoadning(false);
      });
  };

  const getBookASeatData = () => {
    const url = getUrl('getUpcomingStreamDetails');
    return get(`${url}${params.id}/`, true)
      .then((response) => {
        const {
          data: { code, data, status, message },
        } = response;
        switch (code) {
          case 200:
            if (status === true) {
              setbookSeatData(data);
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
          value: UserBookSeatData.stream_amount,
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
    let url;
    const formdata = new FormData();
    url = getUrl('paypal_stream_booking');
    formdata.append('stream', params.id);
    formdata.append('brand', "PayPal");
    formdata.append('transaction_id', data.id);
    formdata.append('amount', UserBookSeatData.stream_amount);
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
              handleCloseModal(false)
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
    getBookASeatData();
    const unsubscribe = db.collection("rooms").onSnapshot((snapshot) =>
      setroomDetails(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
    return () => {
      unsubscribe();
    }
  }, []);
  return (
    <>
      {isLoading && <Loader />}
      {UserBookSeatData && (
        <div className="booking-common-inner">
          <div className="button-oto-session-div">
            <Link to="#" className="btn btn-oto-session" onClick={handleOpenOneToOneModal}>
              <span className="bg-custom-icon person-group-icon"></span>
              <span className="text-span">Click here to book one-to-one session </span>
            </Link>
          </div>

          <div className="booking-div-card-pay">
            <div className="booking-div-card-pay-inner">
              <div className="img-thumb">
                <img
                  src={
                    UserBookSeatData.creator.profile_image === null ||
                      UserBookSeatData.creator.profile_image ===
                      'https://myapp-user-uploads154822-dev.s3.amazonaws.com/sample.jpg'
                      ? noDataImg
                      : UserBookSeatData.creator.profile_image
                  }
                  className="img-fluid img-responsive"
                  alt="img"
                />
              </div>

              <div className="text-desc-div">
                <h2>{`$${UserBookSeatData.stream_amount}`}</h2>
                <p>{UserBookSeatData.title}</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="account-card-box">
              <div className="account-card-box-row">
                <div className="icon-div">
                  <i className="bg-custom-icon credit-card-icon"></i> <span></span>
                </div>
                <div className="card-number">
                  <CardNumberElement
                    onChange={handleChange}
                    //onReady={(e) => setCardNumberRef(e)}
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
                    //   onReady={(e) => setCardExpiryRef(e)}
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
                    //   onReady={(e) => setCardCVCRef(e)}
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
            <PayPalButtonComponent
              amount={UserBookSeatData.stream_amount}
              currency="USD"
              onApprove={paypalOnApprove}
              catchError={paypalOnError}
              onError={paypalOnError}
              onCancel={paypalOnError}
              createOrder={createOrder}
              isAllowed={(UserBookSeatData.is_booked === true || UserBookSeatData.available_seats <= 0) ? false : true}
            />
          </form>
        </div>
      )}
      <div className="booking-common-bottom">
        <div className="booking-common-bottom-row">
          <Link
            to="#"
            className="btn btn-common-black btn-black-back"
            onClick={() => { handleCloseModal(false) }}
          >
            Back
          </Link>
          {UserBookSeatData && (UserBookSeatData.is_booked === true || UserBookSeatData.available_seats <= 0)
            ?
            <button
              className="btn btn-common-primary btn-book"
              onClick={handleSubmit}
              type="submit"
              disabled={true}
            >
              Booked
              </button>
            :
            <button
              className="btn btn-common-primary btn-book"
              onClick={handleSubmit}
              type="submit"
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing' : 'Book'}
            </button>
          }
        </div>
      </div>
    </>
  );
};

export default injectStripe(CheckoutForm);
CheckoutForm.propTypes = {
  stripe: PropTypes.any,
  handleOpenOneToOneModal: PropTypes.func,
  handleCloseModal: PropTypes.func,
};

/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'react-bootstrap/esm/Image';
import {
  injectStripe,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from 'react-stripe-elements';
import InputComponent from '../../UI/InputComponent/InputComponent';
import { toast } from 'react-toastify';
import Loader from '../../UI/Loader/Loader';
import { post, get } from '../../../network/requests';
import { getUrl } from '../../../network/url';
import { useHistory } from "react-router-dom";
import { tokenExpire } from "../../../services/auth";
import DropDownList from '../../UI/DropDownList/DropDownList';
import masterImage from '../../../assets/images/icons/card/master-card.svg';
import visaImage from '../../../assets/images/icons/card/Visa-light.svg';
import amexImage from '../../../assets/images/icons/card/AmericanExpress-light.svg';

toast.configure();
const createOptions = {
  style: {
    base: {
      color: '#fff',
      fontSize: '14px',
      minHeight: '45px',
      lineHeight: '24px',
      padding: '10px 20px 7px 20px',
    },
  },
};

function CreditCardDetailsFormComponent({ stripe, handleModal }) {
  const history = useHistory();
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCVC] = useState();
  const [cardNumberErr, setCardNumberErr] = useState('');
  const [cardExpiryErr, setCardExpiryErr] = useState('');
  const [cardCvcErr, setCardCVCErr] = useState('');
  const [cardHolderNameerr, setcardHolderNameerr] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoadning] = useState(false);
  const [cardHolderName, setcardHolderNAme] = useState('');
  const [cardType, setCardType] = useState();
  const optionCard = [
    {
      value: 'mastercard',
      label: <img src={masterImage} style={{ height: '40px', width: '65px' }} />,
    },
    { value: 'visa', label: <img src={visaImage} style={{ height: '40px', width: '65px' }} /> },

    { value: 'amex', label: <img src={amexImage} style={{ height: '40px', width: '65px' }} /> },
  ];
  const handleModalClose = () => {
    handleModal(false);
  }
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
  const checkBrandType = (brand) => {
    optionCard.forEach((item) => {
      if (item.value === brand) {
        handleChangeCard(item);
      }
    });
  };
  const handleNameChange = (e) => {
    if (e.target.name === 'cardHolderName') {
      setcardHolderNAme(e.target.value);
    }
    if (e.target.value === '' || e.target.value === undefined || e.target.value === null) {
      setErrorMessage('This field is required');
      setcardHolderNameerr('This field is required');
    } else {
      setErrorMessage('');
      setcardHolderNameerr('');
    }
  };

  const getUserCardDetailsData = () => {
    const url = getUrl("getUserCardDetails");
    return get(`${url}`, true)
      .then((response) => {
        const {
          data: { code, data, status, message },
        } = response;
        switch (code) {
          case 200:
            if (status === true) {
              // handleCardDetails(data);
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
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (cardHolderName === "" || !cardHolderName) {
      setcardHolderNameerr('This field is required');
      return;

    }
    if (cardNumber === undefined || cardNumber.trim() === '' || !cardNumber) {
      setCardNumberErr("This field is required");
      return;

    }
    if (cardExpiry === undefined || cardExpiry === '' || !cardExpiry) {
      setCardExpiryErr("This field is required");
      return;

    }
    if (cardCvc === undefined) {
      setCardCVCErr("This field is required");
    }
    if (!cardHolderName) {
      setErrorMessage(cardHolderNameerr);
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
        setIsLoadning(true);
        const { token } = await stripe.createToken();
        postCardDetails(token);
        setIsLoadning(false);
      } catch (err) {
        setIsLoadning(false);
        toast.error(err, {
          pauseOnHover: false,
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
  };

  const postCardDetails = (cardDetails) => {
    const url = getUrl('getUserCardDetails');
    const formData = new FormData();
    formData.append('card_id', cardDetails.id);
    formData.append('last4', cardDetails.card.last4);
    formData.append('brand', cardDetails.card.brand);
    formData.append('exp_month', cardDetails.card.exp_month);
    formData.append('exp_year', cardDetails.card.exp_year);
    formData.append('card_name', cardHolderName);

    setIsLoadning(true);
    return post(`${url}/`, formData, true)
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
              getUserCardDetailsData();
              handleModal(false);
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
    else if (elementName === 'cardExpiry') {
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
    else if (elementName === 'cardCvc') {
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

  return (
    <React.Fragment>
      {isLoading && <Loader />}
      <div className="general-payment-root">
        <div className="general-top">
          <div className="general-row">
            <div className="form-general-root">
              <div className="row mlr-12">
                <div className="col-xl-12 col-lg-12 col-md-12 plr-12">
                  <div className="form-group">
                    <label className="label-text">Your name</label>
                    <div className="form-group-control">
                      <InputComponent
                        inputType="text"
                        inputClassName="form-control"
                        inputName="cardHolderName"
                        inputPlaceholder=""
                        inpValue={cardHolderName}
                        onInputChange={(e) => {
                          handleNameChange(e);
                        }}
                        e
                      />
                    </div>
                    {cardHolderNameerr && <div className="paymentValidations">{cardHolderNameerr}</div>}
                  </div>
                </div>

                <div className="col-xl-12 col-lg-12 col-md-12 plr-12">
                  <div className="form-group credit-card-form-group">
                    <label className="label-text">Card number</label>
                    <div className="form-group-control">
                      <CardNumberElement
                        onChange={handleChange}
                        className="number credit-card-number form-control"
                        id="card-number"
                        placeholder=""
                        aria-describedby="number"
                        mask="0000 0000 0000 0000"
                        style={createOptions.style}
                        autoComplete="off"
                        name="number"
                        maxLength="19"
                      />

                      <div className="select-card-dropdown-div">
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
                    {cardNumberErr && <div className="paymentValidations">{cardNumberErr}</div>}

                  </div>
                </div>

                <div className="col-xl-6 col-lg-6 col-md-6 plr-12">
                  <div className="form-group">
                    <label className="label-text">Expiry Date</label>
                    <div className="form-group-control">
                      <CardExpiryElement
                        onChange={handleChange}
                        className="number month-number form-control"
                        id="month-number"
                        placeholder=""
                        mask="00/00"
                        name="number"
                        style={createOptions.style}
                        autoComplete="off"
                        maxLength="5"
                      />
                      {cardExpiryErr && <div className="paymentValidations">{cardExpiryErr}</div>}
                    </div>
                  </div>
                </div>

                <div className="col-xl-6 col-lg-6 col-md-6 plr-12">
                  <div className="form-group">
                    <label className="label-text">CVV</label>
                    <div className="form-group-control pass-form-group-control">
                      <CardCvcElement
                        onChange={handleChange}
                        className="form-control cvvcode"
                        id="password1"
                        placeholder=""
                        aria-describedby="emailHelp"
                        mask="000"
                        name="ccv"
                        style={createOptions.style}
                      />
                      {cardCvcErr && <div className="paymentValidations">{cardCvcErr}</div>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="general-bottom">
          <div className="general-btn-div-row justify-content-end">

            <div className="general-btn-div-right">
              <Link to="#" className="btn btn-primary-outline btn-primary-color-02 mh-btn55 btn-black-back mr-24" data-dismiss="modal" onClick={handleModalClose}>
                Cancel
              </Link>
              <button
                type="submit"
                className="btn btn-primary-outline btn-primary-color-02 mh-btn55 btn-save"
                onClick={(e) => handleSubmit(e)}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default injectStripe(CreditCardDetailsFormComponent);

CreditCardDetailsFormComponent.propTypes = {
  stripe: PropTypes.any,
  handleModal: PropTypes.function,
  // handleCardDetails: PropTypes.function
};

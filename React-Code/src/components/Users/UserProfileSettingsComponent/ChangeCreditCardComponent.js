/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import creditCardImg from '../../../assets/images/icons/custom/icon-creadit-card1.svg';
// import CreditCardDetailsModalComponent from './CreditCardDetailsModalComponent';
import ButtonComponent from '../../UI/ButtonComponent/ButtonComponent';
import { get } from "../../../network/requests";
import { getUrl } from "../../../network/url";
import { toast } from 'react-toastify';
import Loader from "../../UI/Loader/Loader";
import { useHistory } from "react-router-dom";
import { tokenExpire } from "../../../services/auth";
toast.configure();
function ChangeCreditCardComponent({changeCreditCardDetails,handleSetModal,handleSetCardDetail}) {
  const history = useHistory();

  const [isLoading, setIsLoading] = useState(false);

  const handleModalClick = (e) => {
    e.preventDefault();
    handleSetModal(true)
 
  };

 

  const getUserCardDetailsData = () => {
    setIsLoading(true);
    const url = getUrl("getUserCardDetails");
    return get(`${url}`, true)
      .then((response) => {
        const {
          data: { code, data, status, message },
        } = response;
        setIsLoading(false);
        switch (code) {
          case 200:
            if (status === true) {
              // handleSetCardDetail(data);
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
  }
  useEffect(() => {
    getUserCardDetailsData();
  }, []);

  return (
    <React.Fragment>
      {isLoading && <Loader />}
      
      {/* {isModal && <CreditCardDetailsModalComponent handleCardDetails={handleCardDetails} handleModal={handleModal} handleBackDrop={handleBackDrop} />} */}
      <div className="tab-pane-inner">
        <div className="pro-credit-card-div">
          <div className="row mlr-10">
            <div className="col-lg-12 col-md-12 plr-10">
              <div className="pro-credit-card-center">
                <div className="pro-credit-card-box">
                  <div className="pro-credit-card-box-inner">
                    <div className="pro-cc-top">
                      <div className="pro-cc-top-right">
                        <div className="icon-div"><img src={creditCardImg} className="img-fluid img-icon" /></div>
                      </div>
                    </div>
                    <div className="pro-cc-bottom">
                      {changeCreditCardDetails && (
                        <div className="pro-cc-details-div">
                          <div className="pro-cc-details-left">
                            <div className="div-box">
                              <p>{changeCreditCardDetails.card_name}</p>
                              <p>{`${changeCreditCardDetails.exp_month}/${changeCreditCardDetails.exp_year}`}</p>
                            </div>
                            <div className="pro-cc-number-div">
                              <p>
                                <span className="text">
                                  <span className="space-text">****</span>
                                  <span className="space-text">****</span>
                                  <span className="space-text">****</span>
                                  <span className="space-text">{changeCreditCardDetails.last4}</span>
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="pro-credit-bottom-div">
                  <div className="pro-credit-bottom-div-row">
                    <ButtonComponent
                      nameOfClass="btn btn-primary-outline mh-btn55 btn-change btn-save"
                      btnName="Change"
                      handleOnclick={handleModalClick}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default ChangeCreditCardComponent;

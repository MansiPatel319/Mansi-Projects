import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { StripeProvider, Elements } from 'react-stripe-elements';
import CreditCardDetailsFormComponent from './CreditCardDetailsFormComponent';

function CreditCardDetailsModalComponent({ handleCardDetails, handleModal }) {
  const [isModalActive, setisModalActive] = useState(true);
  const handleModalClose = (data) => {
    if (data) {
      setisModalActive(data);
      handleModal(false);
    }
    setisModalActive(false);
    handleModal(false);
  };
  return (
    <React.Fragment>
      {isModalActive ? (
        <div
          className="modal center center-common-modal fade show"
          id="change-credit-card-details-modal"
          tabIndex="-1"
          role="dialog"
          style={{ paddingRight: '16px', display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        >
          <div className="modal-dialog modal-dialog-centered modal-dialog-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={handleModalClose}
                >
                  <span aria-hidden="true">
                    <i className="fe fe-x close-icon-x"></i>
                  </span>
                </button>
              </div>

              <div className="modal-body">
                <div className="general-pop-root">
                  <section className="general-payment-section payment-details-section general-details-pop-section" id="payment-details-section">
                    <div className="container container-970">
                      <div className="row">
                        <div className="col-lg-12 col-md-12">
                          <div className="general-payment-div general-details-div">
                            <div className="container-general-center">

                              <div className="heading-div">
                                <div className="heading-inner-div">
                                  <h1>Change Credit Card Details</h1>
                                </div>
                              </div>
                              {/* eslint-disable-next-line no-undef */}
                              <StripeProvider apiKey={process.env.REACT_APP_STRIPEKEY}>
                                <Elements>
                                  <CreditCardDetailsFormComponent handleModal={handleModalClose} handleCardDetails={handleCardDetails} />
                                </Elements>
                              </StripeProvider>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      ) : (
        ''
      )}
       <div className="modal-backdrop fade show" />
    </React.Fragment>
  );
}

export default CreditCardDetailsModalComponent;

CreditCardDetailsModalComponent.propTypes = {
  handleCardDetails: PropTypes.function,
  handleModal: PropTypes.function,
};

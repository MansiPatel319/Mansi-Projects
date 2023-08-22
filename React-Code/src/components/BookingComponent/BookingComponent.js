import React from 'react';
import '../../assets/css/booking-modal-style.css';
import { StripeProvider, Elements } from 'react-stripe-elements';
import BookingCheckoutForm from './BookingCheckoutForm';
import PropTypes from 'prop-types';

const BookingComponent = ({ handleOpenOneToOneModal, handleCloseModal }) => {
  return (
    <div className="common-body-inner-div">
      <div className="booking-common-div">
        {/* eslint-disable-next-line no-undef */}
        <StripeProvider apiKey={process.env.REACT_APP_STRIPEKEY}>
          <Elements>
            <BookingCheckoutForm handleOpenOneToOneModal={handleOpenOneToOneModal} handleCloseModal={handleCloseModal} />
          </Elements>
        </StripeProvider>
      </div>
    </div>
  );
};

export default BookingComponent;
BookingComponent.propTypes = {
  stripe: PropTypes.any,
  handleOpenOneToOneModal: PropTypes.func,
  handleCloseModal: PropTypes.func,
};

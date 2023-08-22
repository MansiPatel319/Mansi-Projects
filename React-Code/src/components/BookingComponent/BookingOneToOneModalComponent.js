import React from 'react';
import PropTypes from 'prop-types';
import { StripeProvider, Elements } from 'react-stripe-elements';
import BookingOneToOneCheckoutForm from './BookingOneToOneCheckoutForm';

const BookingOneToOneModalComponent = ({ creatorId, handleCloseOneToOneModal, handleBookingModal }) => {
  return (
    <div className="common-body-inner-div">
      <div className="booking-common-div">
        {/* eslint-disable-next-line no-undef */}
        <StripeProvider apiKey={process.env.REACT_APP_STRIPEKEY}>
          <Elements>
            <BookingOneToOneCheckoutForm creatorId={creatorId} handleCloseOneToOneModal={handleCloseOneToOneModal} handleBookingModal={handleBookingModal} />
          </Elements>
        </StripeProvider>
      </div>
    </div>
  );
};

export default BookingOneToOneModalComponent;

BookingOneToOneModalComponent.propTypes = {
  creatorId: PropTypes.number,
  handleCloseOneToOneModal: PropTypes.func,
  handleBookingModal: PropTypes.func
}

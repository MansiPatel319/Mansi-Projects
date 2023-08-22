import React from 'react';
import { StripeProvider, Elements } from 'react-stripe-elements';
import PaymentDetailsCheckoutForm from './PaymentDetailsCheckoutForm';

function PaymentComponent() { 
  return (
    <React.Fragment>
      <section
        className="general-payment-section payment-details-section"
        id="payment-details-section"
      >

                    {/* eslint-disable-next-line no-undef */}
                    <StripeProvider apiKey={process.env.REACT_APP_STRIPEKEY}>
                      <Elements>
                        <PaymentDetailsCheckoutForm  />
                      </Elements>
                    </StripeProvider>

      </section>
    </React.Fragment>
  );
}


export default PaymentComponent;
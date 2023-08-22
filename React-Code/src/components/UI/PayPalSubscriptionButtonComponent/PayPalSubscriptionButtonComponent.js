/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
// import React from 'react';
// import { PayPalButton } from "react-paypal-button-v2";
import PropTypes from 'prop-types';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

function PayPalSubscriptionButtonComponent(props) {
  const { bookingAmount, currency, createSubscription, onApprove, catchError, onError, onCancel } =
    props;
  const scriptProviderOptions = {
    'client-id': process.env.REACT_APP_PAYPAL_CLIENT_ID,
    components: 'buttons',
    intent: 'subscription',
    vault: true,
  };

  const [loadState, setLoadState] = useState({ loading: false, loaded: false });
  useEffect(() => {
    if (!loadState.loading && !loadState.loaded) {
      setLoadState({ loading: true, loaded: false });
      const script = document.createElement('script');
      script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.REACT_APP_PAYPAL_CLIENT_ID}&currency=EUR&disable-funding=credit,card,giropay,sepa,sofort`;
      script.addEventListener('load', () => setLoadState({ loading: false, loaded: true }));
      document.body.appendChild(script);
    }
  }, [loadState]);

  return (
    <>
      {!loadState.loading && loadState.loaded && (
        <PayPalScriptProvider options={scriptProviderOptions}>
          <PayPalButtons
            amount={bookingAmount}
            currency={currency}
            createSubscription={(data, details) => createSubscription(data, details)}
            onApprove={(data, details) => onApprove(data, details)}
            onError={(err) => onError(err)}
            catchError={(err) => catchError(err)}
            onCancel={(err) => onCancel(err)}
            style={{
              shape: 'pill',
              color: 'white',
              layout: 'horizontal',
              tagline: false,
              height: 55,
              size: 'responsive',
              // label: 'paypal'
            }}
          />
        </PayPalScriptProvider>
      )}
    </>
  );
}

export default PayPalSubscriptionButtonComponent;

PayPalSubscriptionButtonComponent.propTypes = {
  bookingAmount: PropTypes.number,
  currency: PropTypes.string,
  createSubscription: PropTypes.func,
  onApprove: PropTypes.func,
  catchError: PropTypes.func,
  onError: PropTypes.func,
  onCancel: PropTypes.func,
  onButtonReady: PropTypes.func,
};

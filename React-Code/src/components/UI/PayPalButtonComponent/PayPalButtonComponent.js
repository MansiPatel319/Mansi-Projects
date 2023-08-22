/* eslint-disable no-undef */
import React, { useEffect, useState } from "react";
// import React from "react";
import PropTypes from "prop-types";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

function PayPalButtonComponent(props) {
    // const [paypalLoaded, setPaypalLoaded] = useState(false);
    const { bookingAmount, currency, createOrder, onApprove, catchError, onError, onCancel } = props;
    // const [loadState, setLoadState] = useState({ loading: false, loaded: false });
    const initialOptions = {
        "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID,
        currency: "USD",
        components: "buttons",
        intent: "capture",
        vault: false,
        // onButtonReady: `${() => { setPaypalLoaded('true') }}`
    };
    const [loadState, setLoadState] = useState({ loading: false, loaded: false });
    useEffect(() => {
        if (!loadState.loading && !loadState.loaded) {
            setLoadState({ loading: true, loaded: false });
            const script = document.createElement("script");
            script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.REACT_APP_PAYPAL_CLIENT_ID}&currency=EUR&disable-funding=credit,card,giropay,sepa,sofort`;
            script.addEventListener("load", () =>
                setLoadState({ loading: false, loaded: true })
            );
            document.body.appendChild(script);
        }
    }, [loadState])
    return (
        <>
            {!loadState.loading && loadState.loaded && <PayPalScriptProvider options={initialOptions}>
                {<PayPalButtons
                    amount={bookingAmount}
                    currency={currency}
                    createOrder={(data, details) => createOrder(data, details)}
                    onApprove={(data, details) => onApprove(data, details)}
                    onError={(err) => onError(err)}
                    catchError={(err) => catchError(err)}
                    onCancel={(err) => onCancel(err)}
                    // onClick={(data, actions) => onClick(data, actions)}
                    // onInit={(data, actions) => { handleOnInit(data, actions) }}
                    options={{
                        clientId: process.env.REACT_APP_PAYPAL_CLIENT_ID,
                        currency: 'USD',
                        vault: false,
                        intent: 'capture'
                    }}
                    style={{
                        shape: 'pill',
                        color: 'white',
                        layout: 'horizontal',
                        tagline: false,
                        height: 55,
                        size: 'responsive',
                    }}
                />}
            </PayPalScriptProvider>

            }
        </>
    )
}

export default PayPalButtonComponent;

PayPalButtonComponent.propTypes = {
    bookingAmount: PropTypes.number,
    currency: PropTypes.string,
    createOrder: PropTypes.func,
    onApprove: PropTypes.func,
    catchError: PropTypes.func,
    onError: PropTypes.func,
    onCancel: PropTypes.func,
    setPaypalSDKReady: PropTypes.func,
    handleClick: PropTypes.func,
    isAllowed: PropTypes.bool,
    // onClick: PropTypes.func,
};

import React, { useState } from 'react';
import PropTypes from "prop-types";

function ViewDetailsModalComponent({ handleModal, handleCloseModal, payoutDetails }) {
    const [isModalActive, setisModalActive] = useState(handleModal);
    const handleModalClose = () => {
        setisModalActive(false);
        handleCloseModal(false);
    }

    return (
        <React.Fragment>
            {isModalActive && (
                <div className="modal messages-modal view-details-modal fade show" id="view-details-modal" tabIndex="-1" role="dialog" style={{ display: 'block', paddingRight: ' 17px', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-body">
                                <button type="button" className="close close-btn" data-dismiss="modal" onClick={handleModalClose}> <i className="fe fe-x"></i> </button>
                                <div className="view-details-custom-div">
                                    {payoutDetails &&
                                        <div className="view-details-custom-row">
                                            <div className="heading-title-div">
                                                <h2>Transaction Number : {payoutDetails.transaction_id}</h2>
                                            </div>
                                            <div className="desc-text-div">
                                                <div className="desc-text-row-div">
                                                    <p>Affiliate</p>
                                                    <h2>${payoutDetails.affiliation_commission_total === null || payoutDetails.affiliation_commission_total === undefined ? 0 : payoutDetails.affiliation_commission_total}</h2>
                                                </div>
                                                <div className="desc-text-row-div">
                                                    <p>One-to-One</p>
                                                    <h2>${payoutDetails.session_amount_received === null || payoutDetails.session_amount_received === undefined ? 0 : payoutDetails.session_amount_received}</h2>
                                                </div>
                                                <div className="desc-text-row-div">
                                                    <p>Live-stream</p>
                                                    <h2>${payoutDetails.stream_amount_received === null || payoutDetails.stream_amount_received === undefined ? 0 : payoutDetails.stream_amount_received}</h2>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </React.Fragment>
    );
}

export default ViewDetailsModalComponent;

ViewDetailsModalComponent.propTypes = {
    handleModal: PropTypes.any,
    handleCloseModal: PropTypes.func,
    payoutDetails: PropTypes.any,
}
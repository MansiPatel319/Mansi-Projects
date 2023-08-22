import React, { useEffect, useState } from 'react';
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getUrl } from '../../../network/url';
import { get } from '../../../network/requests';
import { tokenExpire } from '../../../services/auth';
toast.configure();
function EarningHeaderComponent({ activeTab }) {
    const [totalEarning, setTotalEarning] = useState(0);
    // const [affiliateTotalEarning, setaffiliateTotalEarning] = useState(0);
    const [sessionTotalEarning, setsessionTotalEarning] = useState(0);
    const [streamTotalEarning, setstreamTotalEarning] = useState(0);
    const getEarningHistory = () => {
        const url = getUrl('get_creator_earning_history');
        get(url, true)
            .then((response) => {
                const {
                    data: { code, data, status, message },
                } = response;
                switch (code) {
                    case 200:
                        if (status === true) {
                            setTotalEarning(data.total_earnings);
                            // setaffiliateTotalEarning(data.total_affiliation_earnings);
                            setsessionTotalEarning(data.total_session_earnings);
                            setstreamTotalEarning(data.total_stream_earnings);
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
    };

    useEffect(() => {
        getEarningHistory();
    }, []);
    return (
        <React.Fragment>
            <div className="col-lg-12 col-md-12 plr-10">
                <div className="affiliate-button-tab-div">
                    <div className="row mlr-10">

                        <div className="col-lg-4 col-md-6 col-6 plr-10">
                            <div className={`affiliate-button-tab-box ${activeTab === 'Total Earnings' ? 'active' : ''}`}>
                                <Link to="/creator-my-earnings" className="btn btn-big-black">
                                    <div className="button-tab-box-inner">
                                        <div className="head-title"><h2>{`$${totalEarning}`}</h2></div>
                                        <p className="pl-0">Total Earnings</p>
                                    </div>
                                </Link>
                            </div>
                        </div>

                        {/* <div className="col-lg-3 col-md-6 col-6 plr-10">
                            <div className={`affiliate-button-tab-box ${activeTab === 'Affiliate' ? 'active' : ''}`}>
                                <Link to="/creator-affiliate-earnings" className="btn btn-big-black">
                                    <div className="button-tab-box-inner">
                                        <div className="head-title"><h2>${affiliateTotalEarning}</h2></div>
                                        <p>Affiliate <span className="status-rounded status-rounded01"></span> </p>
                                    </div>
                                </Link>
                            </div>
                        </div> */}

                        <div className="col-lg-4 col-md-6 col-6 plr-10">
                            <div className={`affiliate-button-tab-box ${activeTab === 'One-to-One' ? 'active' : ''}`}>
                                <Link to="/creator-one-to-one-earnings" className="btn btn-big-black">
                                    <div className="button-tab-box-inner">
                                        <div className="head-title"><h2>${sessionTotalEarning}</h2></div>
                                        <p>One-to-One <span className="status-rounded status-rounded02"></span> </p>
                                    </div>
                                </Link>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6 col-6 plr-10">
                            <div className={`affiliate-button-tab-box ${activeTab === 'Live-stream' ? 'active' : ''}`}>
                                <Link to="/creator-live-stream-earnings" className="btn btn-big-black">
                                    <div className="button-tab-box-inner">
                                        <div className="head-title"><h2>${streamTotalEarning}</h2></div>
                                        <p>Live-stream <span className="status-rounded status-rounded03"></span> </p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </React.Fragment>
    )
}

export default EarningHeaderComponent;

EarningHeaderComponent.propTypes = {
    activeTab: PropTypes.string
}

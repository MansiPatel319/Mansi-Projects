import React, { useEffect, useState } from 'react';
import SessionUserListingComponent from "./SessionUserListingComponent";
import { Link } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import { getUrl } from '../../../network/url';
import { get } from '../../../network/requests';
import { toast } from 'react-toastify';
import Loader from '../../UI/Loader/Loader';
import { useHistory } from 'react-router-dom';
import { tokenExpire } from '../../../services/auth';
import EarningHeaderComponent from "./EarningHeaderComponent";

toast.configure();
function CreatorOneToOneEarningComponent() {
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);
    const [totalEarning, setTotalEarning] = useState(0);
    const [thisMonthAmount, setThisMonthAmount] = useState(0);
    const [earningLable, setEarningLable] = useState([]);
    const [earningData, setEarningData] = useState([]);
    const [userDetails, setuserDetails] = useState('');
    const [searchKey, setsearchKey] = useState('');
    const [startDate, setstartDate] = useState('');
    const [endDate, setendDate] = useState('');
    const [Flag, setFlag] = useState(0);
    const [currentPAgeNumber, setcurrentPAgeNumber] = useState('');
    const [SessionLinkData, setSessionLinkData] = useState('');

    const getEarningHistory = () => {
        setIsLoading(true);
        const url = getUrl('session_earning');
        get(url, true)
            .then((response) => {
                const {
                    data: { code, data, status, message },
                } = response;
                setIsLoading(false);
                switch (code) {
                    case 200:
                        if (status === true) {
                            const labelData = data.labels.reverse();
                            const graphData = data.session_chart.reverse();
                            setThisMonthAmount(data.this_month_earnings);
                            setTotalEarning(data.total_session_earnings);
                            setEarningLable(labelData);
                            setEarningData(graphData);
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
    };

    const handleSearchInp = (search) => {
        setsearchKey(search);
    }

    const handleDateRange = (startDate, endDate) => {
        setstartDate(startDate);
        setendDate(endDate);
    }

    const getUserListingData = (startDate, endDate, searchKey, currentPAgeNumber) => {
        setIsLoading(true);
        const activePagenumber = currentPAgeNumber === undefined || currentPAgeNumber === null || currentPAgeNumber === "" ? 1 : currentPAgeNumber;
        const searchByStartDate = startDate === undefined || startDate === "" ? "" : startDate;
        const searchByEndDate = endDate === undefined || endDate === "" ? startDate : endDate;
        const searchInput = searchKey === undefined || searchKey === "" ? "" : searchKey;
        const url = getUrl('session_booking_user_listing');
        get(`${url}?start_date=${searchByStartDate}&end_date=${searchByEndDate}&search=${searchInput}&page=${activePagenumber}`, true)
            .then((response) => {
                const {
                    data: { code, data, status, message },
                } = response;
                setIsLoading(false);
                switch (code) {
                    case 200:
                        if (status === true) {
                            setuserDetails(data.data);
                            setSessionLinkData(data.links);
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
    };

    const handleNextPageClick = (nextPage) => {
        setcurrentPAgeNumber(nextPage);
    }

    const handleDateUpdate = (data) => {
        setFlag(data);
    }
    useEffect(() => {
        getEarningHistory();

    }, [])
    useEffect(() => {
        getUserListingData(startDate, endDate, searchKey, currentPAgeNumber);
    }, [searchKey, currentPAgeNumber]);

    useEffect(() => {
        getUserListingData(startDate, endDate, searchKey, 1);
    }, [startDate, endDate, Flag]);

    useEffect(() => {
    }, [currentPAgeNumber])
    var options = {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
            display: false,
        },
        scales: {
            xAxes: [
                {
                    gridLines: {
                        display: false,
                        color: '#FFFFFF',
                    },
                },
            ],
            yAxes: [
                {
                    gridLines: {
                        color: 'rgba(255, 255, 255, 0.1)',
                        zeroLineColor: 'rgba(255, 255, 255, 0.1)',
                    },

                    ticks: {
                        // Include a dollar sign in the ticks
                        callback: function (value) {
                            return '$' + value;
                        },
                        padding: 20,
                    },
                },
            ],
        },
    };

    const data = (canvas) => {
        const ctx = canvas.getContext('2d');
        const gradient = ctx.createLinearGradient(0, 0, 0, 300);
        gradient.addColorStop(0, 'rgba(173, 14, 14,1)');
        gradient.addColorStop(0.1, 'rgba(173, 14, 14,0.9)');
        gradient.addColorStop(0.2, 'rgba(173, 14, 14,0.8)');
        gradient.addColorStop(0.3, 'rgba(173, 14, 14,0.7)');
        gradient.addColorStop(0.4, 'rgba(173, 14, 14,0.6)');
        gradient.addColorStop(0.5, 'rgba(173, 14, 14,0.5)');
        gradient.addColorStop(0.6, 'rgba(173, 14, 14,0.4)');
        gradient.addColorStop(0.7, 'rgba(173, 14, 14,0.3)');
        gradient.addColorStop(0.8, 'rgba(173, 14, 14,0.2)');
        gradient.addColorStop(0.9, 'rgba(173, 14, 14,0.2)');
        gradient.addColorStop(1, 'rgba(173, 14, 14,0)');
        return {
            labels: earningLable,
            datasets: [
                {
                    label: 'One to one earnings',
                    backgroundColor: gradient,
                    borderColor: '#ad0e0e',
                    borderCapStyle: 'butt',
                    borderJoinStyle: 'miter',
                    pointBorderColor: '#ef4343',
                    pointBackgroundColor: '#ef4343',
                    pointBorderWidth: 5,
                    pointHoverRadius: 8,
                    pointHoverBackgroundColor: '#ef4343',
                    pointHoverBorderColor: 'rgba(25, 25, 25, 1)',
                    pointHoverBorderWidth: 5,
                    pointRadius: 4,
                    pointHitRadius: 5,
                    data: earningData,
                },
            ],
        };
    };

    return (
        <React.Fragment>
            {isLoading && <Loader />}
            <section className="affiliate-section" id="affiliate-section">
                <div className="affiliate-div">
                    <div className="container container-1200">
                        <div className="row mlr-10">
                            <EarningHeaderComponent activeTab="One-to-One" />


                            {totalEarning !== 0 ? <div className="col-lg-12 col-md-12 plr-10">
                                <div className="affiliate-me-graph-view-div">
                                    <div className="affiliate-me-graph-view-row">
                                        <div className="affiliate-me-graph-view-header">
                                            <div className="affiliate-me-graph-view-header-row">
                                                <div className="affiliate-me-content-header-left">
                                                    <h2>{`$${thisMonthAmount} `} <span className="text">This Month</span></h2>
                                                </div>
                                                <div className="affiliate-me-content-header-right">
                                                    <p><Link to="/creator-transfer-funds" className="link link-payout">Your Payout </Link></p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="affiliate-me-graph-view-body">
                                            <div className="affiliate-me-graph-view-body-row">
                                                <div className="graph-thumb-div">
                                                    <div className="thumb-img-div">
                                                        <Line data={data} options={options} width={150} height={300} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> : <p style={{ color: 'white', fontSize: '25px', margin: '25px' }}>No data available </p>}
                            {totalEarning !== 0 ? <SessionUserListingComponent recordTableHeader="One-to-One Users Details" userData={userDetails} handleSearchInp={handleSearchInp} handleDateRange={handleDateRange} linkData={SessionLinkData} handleNextPageClick={handleNextPageClick} handleDateChange={handleDateUpdate} /> : ''}
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}

export default CreatorOneToOneEarningComponent;

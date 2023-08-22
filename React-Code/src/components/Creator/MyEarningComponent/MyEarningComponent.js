/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import { getUrl } from '../../../network/url';
import { get } from '../../../network/requests';
import { toast } from 'react-toastify';
import Loader from '../../UI/Loader/Loader';
import { useHistory } from 'react-router-dom';
import { tokenExpire } from '../../../services/auth';
import EarningHeaderComponent from './EarningHeaderComponent';
toast.configure();
function MyEarningComponent() {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [thisMonthAmount, setThisMonthAmount] = useState(0);
  const [earningLable, setEarningLable] = useState([]);
  const [affiliateEarningData, setaffiliateEarningData] = useState([]);
  const [oneToOneEarningData, setoneToOneEarningData] = useState([]);
  const [LiveStreamEarningData, setLiveStreamEarningData] = useState([]);
  const [totalEarning, setTotalEarning] = useState(0);
  const getEarningHistory = () => {
    setIsLoading(true);
    const url = getUrl('get_creator_earning_history');
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
              const affiliateGraphData = data.affiliation_chart.reverse();
              const streamGraphData = data.stream_chart.reverse();
              const sessionGraphData = data.session_chart.reverse();
              setTotalEarning(data.total_earnings);
              setThisMonthAmount(data.this_month_earnings);
              setEarningLable(labelData);
              setaffiliateEarningData(affiliateGraphData);
              setoneToOneEarningData(sessionGraphData);
              setLiveStreamEarningData(streamGraphData);
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

  useEffect(() => {
    getEarningHistory();
  }, []);
  const data = (canvas) => {
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    const Affiliategradient = ctx.createLinearGradient(0, 0, 0, 300);
    const Streamgradient = ctx.createLinearGradient(0, 0, 0, 300);

    Streamgradient.addColorStop(0, 'rgba(62, 140, 196,1)');
    Streamgradient.addColorStop(0.1, 'rgba(62, 140, 196,0.9)');
    Streamgradient.addColorStop(0.2, 'rgba(62, 140, 196,0.8)');
    Streamgradient.addColorStop(0.3, 'rgba(62, 140, 196,0.7)');
    Streamgradient.addColorStop(0.4, 'rgba(62, 140, 196,0.6)');
    Streamgradient.addColorStop(0.5, 'rgba(62, 140, 196,0.5)');
    Streamgradient.addColorStop(0.6, 'rgba(62, 140, 196,0.4)');
    Streamgradient.addColorStop(0.7, 'rgba(62, 140, 196,0.3)');
    Streamgradient.addColorStop(0.8, 'rgba(62, 140, 196,0.2)');
    Streamgradient.addColorStop(0.9, 'rgba(62, 140, 196,0.2)');
    Streamgradient.addColorStop(1, 'rgba(62, 140, 196,0)');

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

    Affiliategradient.addColorStop(0, 'rgba(239, 107, 24,1)');
    Affiliategradient.addColorStop(0.1, 'rgba(239, 107, 24,0.9)');
    Affiliategradient.addColorStop(0.2, 'rgba(239, 107, 24,0.8)');
    Affiliategradient.addColorStop(0.3, 'rgba(239, 107, 24,0.7)');
    Affiliategradient.addColorStop(0.4, 'rgba(239, 107, 24,0.6)');
    Affiliategradient.addColorStop(0.5, 'rgba(239, 107, 24,0.5)');
    Affiliategradient.addColorStop(0.6, 'rgba(239, 107, 24,0.4)');
    Affiliategradient.addColorStop(0.7, 'rgba(239, 107, 24,0.3)');
    Affiliategradient.addColorStop(0.8, 'rgba(239, 107, 24,0.2)');
    Affiliategradient.addColorStop(0.9, 'rgba(239, 107, 24,0.2)');
    Affiliategradient.addColorStop(1, 'rgba(239, 107, 24,0)');

    return {
      labels: earningLable,
      datasets: [
        {
          label: 'Affiliate earnings',
          backgroundColor: Affiliategradient,
          borderColor: '#ef6b18',
          borderCapStyle: 'butt',
          borderJoinStyle: 'miter',
          pointBorderColor: '#fcd368',
          pointBackgroundColor: '#fcd368',
          pointBorderWidth: 5,
          pointHoverRadius: 8,
          pointHoverBackgroundColor: '#fcd368',
          pointHoverBorderColor: 'rgba(25, 25, 25, 1)',
          pointHoverBorderWidth: 5,
          pointRadius: 4,
          pointHitRadius: 5,
          data: affiliateEarningData,
        },
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
          data: oneToOneEarningData,
        },
        {
          label: 'Live stream earnings',
          backgroundColor: Streamgradient,
          borderColor: '#3e8cc4',
          borderCapStyle: 'butt',
          borderJoinStyle: 'miter',
          pointBorderColor: '#50dee1',
          pointBackgroundColor: '#50dee1',
          pointBorderWidth: 5,
          pointHoverRadius: 8,
          pointHoverBackgroundColor: '#50dee1',
          pointHoverBorderColor: 'rgba(25, 25, 25, 1)',
          pointHoverBorderWidth: 5,
          pointRadius: 4,
          pointHitRadius: 5,
          data: LiveStreamEarningData,
        },
      ],
    };
  };

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

  return (
    <React.Fragment>
      {isLoading && <Loader />}
      <section className="my-earnings-section" id="my-earnings-section">
        <div className="my-earnings-div">
          <div className="container container-1000">
            <div className="row mlr-10">
              <EarningHeaderComponent activeTab="Total Earnings" />
              {totalEarning !== 0 ? (
                <div className="col-lg-12 col-md-12 plr-10">
                  <div className="me-graph-view-div">
                    <div className="me-graph-view-row">
                      <div className="me-graph-view-header">
                        <div className="me-graph-view-header-row">
                          <div className="me-content-header-left">
                            <h2>
                              {`$${thisMonthAmount} `} <span className="text">This Month</span>
                            </h2>
                          </div>
                          <div className="me-content-header-right">
                            <p>Monthly report</p>
                          </div>
                        </div>
                      </div>

                      <div className="me-graph-view-body">
                        <div className="me-graph-view-body-row">
                          <div className="graph-thumb-div">
                            <div className="thumb-img-div">
                              <Line data={data} options={options} width={150} height={300} />
                              {/* <img
                                src={graphMeImage}
                                className="img-fluid img-graph"
                                alt="graph"
                              /> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              ) : (
                <p style={{ color: 'white', fontSize: '25px', margin: '25px' }}>
                  No data available
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

export default MyEarningComponent;

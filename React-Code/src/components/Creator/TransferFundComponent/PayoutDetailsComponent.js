/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUrl } from '../../../network/url';
import { get } from '../../../network/requests';
import ViewDetailsModalComponent from './ViewDetailsModalComponent';
import { toast } from 'react-toastify';
import moment from 'moment';
import convertUTCDateToLocalDate from "../../../hooks/TimeZoneConversion";
import { tokenExpire } from '../../../services/auth';
import DateTimePicker from '../../UI/DateTimePicker/DateTimePicker';

toast.configure();
function PayoutDetailsComponent() {
  const [isModalActive, setisModalActive] = useState(false);
  const [payoutData, setpayoutData] = useState('');
  const [linkData, setlinkData] = useState('');
  const [currentPAgeNumber, setactivePagenumber] = useState(1);
  const [startDate, setsearchByStartDate] = useState('');
  const [endDate, setsearchByEndDate] = useState('');
  const [modalData, setmodalData] = useState('');
  const [Flag, setFlag] = useState(0);

  const [addTimeSlot, setAddTimeSlot] = useState([
    {
      id: 0,
      slotVlaue: '',
      is_booked: false,
      selectedTimeZone: null,
      slotVlaueErr: '',
    },
  ]);

  const handleViewDetailsClick = (data) => {
    setisModalActive(true);
    setmodalData(data);
  };
  const handleModalClose = (data) => {
    setisModalActive(data);
  };

  const getPayoutDetails = () => {
    const url = getUrl('payout_listing');
    const activePagenumber =
      currentPAgeNumber === undefined || currentPAgeNumber === null || currentPAgeNumber === ''
        ? 1
        : currentPAgeNumber;
    const searchByStartDate = startDate === undefined || startDate === '' ? '' : startDate;
    const searchByEndDate = endDate === undefined || endDate === '' ? '' : endDate;
    get(
      `${url}?start_date=${searchByStartDate}&end_date=${searchByEndDate}&page=${activePagenumber}`,
      true,
    )
      .then((response) => {
        const {
          data: { code, data, status, message },
        } = response;
        switch (code) {
          case 200:
            if (status === true) {
              setpayoutData(data.data);
              setlinkData(data.links);
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

  const handleNext = () => {
    setactivePagenumber(linkData.next);
  };

  const handlePrevious = () => {
    setactivePagenumber(linkData.previous);
  };

  const handleLastClick = () => {
    setactivePagenumber(linkData.last);
  };

  const handleFirstClick = () => {
    setactivePagenumber(1);
  };

  const handleChangeDate = (date) => {
    if (date.length === 2) {
      const updateData = [...addTimeSlot];
      setAddTimeSlot(updateData);
      setsearchByStartDate(moment(date[0]).format('YYYY-MM-D'));
      setsearchByEndDate(moment(date[1]).format('YYYY-MM-D'));
      setFlag(Flag + 1);
    }
    if (date.length === 0) {
      setsearchByStartDate('');
      setsearchByEndDate('');
    }
  };
  useEffect(() => {
    getPayoutDetails();
  }, [currentPAgeNumber, Flag]);


  return (
    <React.Fragment>
      {isModalActive && (
        <ViewDetailsModalComponent
          handleModal={isModalActive}
          handleCloseModal={handleModalClose}
          payoutDetails={modalData}
        />
      )}
      <div className="container container-1200">
        <div className="row mlr-10">
          <div className="col-lg-12 col-md-12 plr-10">
            <div className="details-root-affiliate-div">
              <div className="details-root-affiliate-top">
                <div className="row mlr-10">
                  <div className="col-lg-6 col-md-6 plr-10">
                    <div className="title-header-div title-header-div02">
                      <h4>Payout Details</h4>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 plr-10">
                    <div
                      className="right-heading-main-box right-bx"
                      style={{ justifyContent: 'flex-end' }}
                    >
                      <div
                        className="right-heading-main-box right-heading-main-box-range"
                        style={{ justifyContent: 'flex-end' }}
                      >
                        <div className="btn-group-div">
                          {addTimeSlot.length > 0 &&
                            addTimeSlot.map((slot, index) => {
                              return (
                                <div className="date-input-box" key={index}>
                                  <DateTimePicker
                                    value={slot.slotVlaue}
                                    handleChangeDate={(date) => handleChangeDate(date)}
                                    placeholder="Select date range"
                                    notMaxDate={true}
                                    datePickerMode="range"
                                    maxDate="today"
                                  />
                                </div>
                              );
                            })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="details-root-affiliate-body">
                {payoutData && payoutData.length !== 0 ? (
                  <div className="row mlr-10">
                    <div className="col-lg-12 col-md-12 plr-10">
                      <div className="card-dark-table-area-inner">
                        <div className="custom-table-div">
                          <div className="table-responsive">
                            <table className="table table-dark-custom table-dark-custom2">
                              <thead>
                                <tr>
                                  <th className="text-left width-30 min-width-150">
                                    Date and Time
                                  </th>
                                  <th className="text-left width-30 min-width-150">
                                    Transaction Number
                                  </th>
                                  <th className="text-left width-20 min-width-90">Amount</th>
                                  <th className="text-left width-20 min-width-150"> &nbsp; </th>
                                </tr>
                              </thead>
                              <tbody className="main-tbody">
                                {payoutData.map((data, i) => {
                                  return (
                                    <tr key={i}>
                                      <td>{moment(convertUTCDateToLocalDate(new Date(data.created_at))).format('D MMM YYYY, hh:mm A')}</td>
                                      <td>{data.transaction_id}</td>
                                      <td>${data.transferred_amount}</td>
                                      <td>
                                        <div className="btn-link-bx-div">
                                          <Link
                                            to="#"
                                            className="link-primary"
                                            data-toggle="modal"
                                            data-target="#view-details-modal"
                                            onClick={() => {
                                              handleViewDetailsClick(data);
                                            }}
                                          >
                                            View Details
                                          </Link>
                                        </div>
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>

                              {payoutData && payoutData.length > 0 ? (
                                <tfoot>
                                  {linkData && (
                                    <tr>
                                      <td colSpan="5">
                                        <div className="custom-pagination">
                                          <ul>
                                            <li>
                                              <Link
                                                to="#"
                                                className={linkData.current === 1 ? 'disabled' : ''}
                                                onClick={
                                                  linkData.current === 1 ? handleFirstClick : null
                                                }
                                              >
                                                <i className="fe fe-arrow-left"></i>
                                              </Link>
                                            </li>
                                            <li>
                                              <Link
                                                to="#"
                                                className={
                                                  linkData.previous !== 0 ? '' : 'disabled'
                                                }
                                                onClick={
                                                  linkData.previous !== 0 ? handlePrevious : null
                                                }
                                              >
                                                <i className="fe fe-chevrons-left"></i>
                                              </Link>
                                            </li>
                                            <li>
                                              <span className="text-span">
                                                <span className="active">
                                                  {linkData.current}-10
                                                </span>{' '}
                                                of {linkData.total}
                                              </span>
                                            </li>
                                            <li>
                                              <Link
                                                to="#"
                                                onClick={linkData.next !== 0 ? handleNext : null}
                                                className={linkData.next !== 0 ? '' : 'disabled'}
                                              >
                                                <i className="fe fe-chevrons-right"></i>
                                              </Link>
                                            </li>
                                            <li>
                                              <Link
                                                to="#"
                                                className={
                                                  linkData.last !== linkData.current
                                                    ? ''
                                                    : 'disabled'
                                                }
                                                onClick={
                                                  linkData.last !== linkData.current
                                                    ? handleLastClick
                                                    : null
                                                }
                                              >
                                                <i className="fe fe-arrow-right"></i>
                                              </Link>
                                            </li>
                                          </ul>
                                        </div>
                                      </td>
                                    </tr>
                                  )}
                                </tfoot>
                              ) : (
                                ''
                              )}
                            </table>
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
        </div>
      </div>

    </React.Fragment>
  );
}

export default PayoutDetailsComponent;

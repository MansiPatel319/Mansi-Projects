import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import DateTimePicker from '../../UI/DateTimePicker/DateTimePicker';
import moment from 'moment';
import profileImg from '../../../assets/images/profile.jpg';
import convertUTCDateToLocalDate from "../../../hooks/TimeZoneConversion";

function AffiliateUserDetailsComponent({
  recordTableHeader,
  userData,
  handleSearchInp,
  handleDateRange,
  linkData,
  handleNextPageClick,
  handleDateChange,
}) {
  const [searchActive, setsearchActive] = useState(false);
  const [Flag, setFlag] = useState(0);
  const [showFilter, setShowfilter] = useState(false);
  const [addTimeSlot, setAddTimeSlot] = useState([
    {
      id: 0,
      slotVlaue: '',
      is_booked: false,
      selectedTimeZone: null,
      slotVlaueErr: '',
    },
  ]);

  const handleSearchIconClick = () => {
    setsearchActive(true);
  };
  const handleCancelSearch = () => {
    setsearchActive(false);
    handleSearchInp('');
  };

  const handleChangeDate = (date) => {
    if (date.length === 2) {
      const updateData = [...addTimeSlot];
      setAddTimeSlot(updateData);
      handleDateRange(moment(date[0]).format('YYYY-MM-D'), moment(date[1]).format('YYYY-MM-D'));
      setFlag(Flag + 1);
      handleDateChange(Flag);
    }
    if (date.length === 0) {
      handleDateRange('', '');
    }
  };

  const handleInpChange = (e) => {
    handleSearchInp(e.target.value);
  };

  const handleNext = () => {
    handleNextPageClick(linkData.next);
  };

  const handlePrevious = () => {
    handleNextPageClick(linkData.previous);
  };

  const handleLastClick = () => {
    handleNextPageClick(linkData.last);
  };

  const handleFirstClick = () => {
    handleNextPageClick(1);
  };

  const handleOnFocus = () => {
    handleNextPageClick(1);
  }

  return (
    <React.Fragment>
      <div className="col-lg-12 col-md-12 plr-10">
        <div className="details-root-affiliate-div">
          <div className="details-root-affiliate-top">
            <div className="row mlr-10">
              <div className="col-lg-6 col-md-5 plr-10">
                <div className="title-header-div">
                  <h4>{recordTableHeader}</h4>
                </div>
              </div>
              <div className="col-lg-6 col-md-7 plr-10">
                <div className="right-heading-main-box right-heading-main-box-range">
                  <div className="search-box-right">
                    <div className="search-div search-hover-div">
                      <div className={`search-box ${searchActive ? 'full-width-input' : ''}`}>
                        <input
                          type="text"
                          placeholder="Search..."
                          className="form-control form-search"
                          onChange={(e) => {
                            handleInpChange(e);
                          }}
                          onFocus={() => handleOnFocus()}
                        />
                        <button
                          className="btn btn-default btn-search"
                          id="search-box-inner-form"
                          onClick={searchActive ? handleCancelSearch : handleSearchIconClick}

                        >
                          <i className="fe fe-search icon-search"></i>
                          <i className="fe fe-x icon-search-cancel"></i>
                        </button>
                      </div>
                    </div>
                  </div>

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
                              handleFocusDate={() => handleOnFocus()}
                            />
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="details-root-affiliate-body">
            <div className="row mlr-10">
              <div className="col-lg-12 col-md-12 plr-10">
                <div className="card-dark-table-area-inner">
                  <div className="custom-table-div">
                    <div className="table-responsive">
                      <table className="table table-dark-custom">
                        <thead>
                          <tr>
                            <th className="text-left width-30 min-width-200">User Name</th>
                            <th className="text-left width-15 min-width-90">Total</th>
                            <th className="text-left width-15 min-width-90">Commission</th>
                            <th className="text-left width-20 min-width-150">Date and Time</th>
                            <th className="text-left width-20 min-width-200">Payment Method</th>
                          </tr>
                        </thead>
                        <tbody
                          className={`collapse filter-body-collapse-root ${showFilter ? 'show' : ''
                            }`}
                          id="filter-collapse01"
                        >
                          <tr>
                            <td className="width-30">
                              <div className="form-group-with-action">
                                <Link
                                  to="#"
                                  className="close-collapse"
                                  onClick={() => setShowfilter(!showFilter)}
                                >
                                  <i className="fe fe-x"></i>
                                </Link>
                                <div className="form-group mb-0">
                                  <input
                                    type="text"
                                    className="form-control mb-0"
                                    placeholder="Filter"
                                  />
                                </div>
                              </div>
                            </td>
                            <td className="width-15">
                              <div className="form-group mb-0">
                                <input
                                  type="text"
                                  className="form-control mb-0"
                                  placeholder="Filter"
                                />
                              </div>
                            </td>
                            <td className="width-15">
                              <div className="form-group mb-0">
                                <input
                                  type="text"
                                  className="form-control mb-0"
                                  placeholder="Filter"
                                />
                              </div>
                            </td>
                            <td className="width-20">
                              <div className="form-group mb-0">
                                <input
                                  type="text"
                                  className="form-control mb-0"
                                  placeholder="Filter"
                                />
                              </div>
                            </td>
                            <td className="width-20 pr-0">
                              <div className="form-group mb-0">
                                <input
                                  type="text"
                                  className="form-control mb-0"
                                  placeholder="Filter"
                                />
                              </div>
                            </td>
                          </tr>
                        </tbody>

                        <tbody className="main-tbody">
                          {userData && userData.length > 0 ? (
                            userData.map((data, i) => {
                              return (
                                <tr key={i}>
                                  <td>
                                    <div className="img-txt-div">
                                      <div className="img-div">
                                        <img
                                          src={
                                            data.user.profile_image ===
                                              'https://myapp-user-uploads154822-dev.s3.amazonaws.com/sample.jpg' ||
                                              data.user.profile_image === '' ||
                                              data.user.profile_image === null ||
                                              data.user.profile_image === undefined
                                              ? profileImg
                                              : data.user.profile_image
                                          }
                                          alt="img"
                                          className="img-fluid rounded-circle user-img"
                                          style={{ objectFit: 'cover' }}
                                        />
                                      </div>
                                      <div className="txt-div">
                                        <p>
                                          {data.user.first_name === '' && data.user.last_name === ''
                                            ? data.user.username
                                            : data.user.first_name + data.user.last_name}
                                        </p>
                                      </div>
                                    </div>
                                  </td>
                                  <td>${data.plan_amount === null ? 0 : data.plan_amount}</td>
                                  <td>${data.commission_amount === null ? 0 : data.commission_amount}</td>
                                  <td>{moment(convertUTCDateToLocalDate(new Date(data.created_at))).format('D MMM YYYY, hh:mm A')}</td>
                                  <td>{data.payment_method}</td>
                                </tr>
                              );
                            })
                          ) : (
                            <p style={{ color: 'white', fontSize: '25px', margin: '25px' }}>
                              No data available{' '}
                            </p>
                          )}
                        </tbody>

                        {userData && userData.length > 0 ? (
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
                                          onClick={linkData.current === 1 ? handleFirstClick : ''}
                                        >
                                          <i className="fe fe-arrow-left"></i>
                                        </Link>
                                      </li>
                                      <li>
                                        <Link
                                          to="#"
                                          className={linkData.previous !== 0 ? '' : 'disabled'}
                                          onClick={linkData.previous !== 0 ? handlePrevious : ''}
                                        >
                                          <i className="fe fe-chevrons-left"></i>
                                        </Link>
                                      </li>
                                      <li>
                                        <span className="text-span">
                                          <span className="active">{linkData.current}-10</span> of{' '}
                                          {linkData.total}
                                        </span>
                                      </li>
                                      <li>
                                        <Link
                                          to="#"
                                          onClick={linkData.next !== 0 ? handleNext : ''}
                                          className={linkData.next !== 0 ? '' : 'disabled'}
                                        >
                                          <i className="fe fe-chevrons-right"></i>
                                        </Link>
                                      </li>
                                      <li>
                                        <Link
                                          to="#"
                                          className={
                                            linkData.last !== linkData.current ? '' : 'disabled'
                                          }
                                          onClick={
                                            linkData.last !== linkData.current
                                              ? handleLastClick
                                              : ''
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
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default AffiliateUserDetailsComponent;

AffiliateUserDetailsComponent.propTypes = {
  recordTableHeader: PropTypes.string,
  userData: PropTypes.any,
  handleSearchInp: PropTypes.func,
  handleSearchDate: PropTypes.func,
  handleDateRange: PropTypes.func,
  linkData: PropTypes.any,
  handleNextPageClick: PropTypes.func,
  handleDateChange: PropTypes.func,
};

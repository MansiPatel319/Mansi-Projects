import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  setScheduleStreamSteps,
  setScheduleStreamStep2,
} from '../../../actions/creatorSchedleStreamAction';
import DropDownList from '../../UI/DropDownList/DropDownList';
import moment from 'moment';
import 'flatpickr/dist/themes/dark.css';
import { getUrl } from "../../../network/url";
import { get } from "../../../network/requests";
import { toast } from 'react-toastify';
import { tokenExpire } from "../../../services/auth";
import convertUTCDateToLocalDate from '../../../hooks/TimeZoneConversion';

function createSeatData(label, value) {
  return {
    label,
    value,
  };
}
let seatRows = [];
let i = 1;
while (i < 32) {
  seatRows.push(createSeatData(i, i));
  i++;
}
let maxOffset = 25;
let thisYear = new Date().getFullYear();
let allYears = [];
for (let x = 0; x <= maxOffset; x++) {
  allYears.push({ label: thisYear + x, value: thisYear + x });
}
const ScheduleFormComponent = () => {
  const dispatch = useDispatch();
  const schedulStreamStem2 = useSelector((state) => state.CreatorScheduleStream.schedulStreamStem2);
  const [selectedDayOption, setSelectedDayOption] = useState(null);
  const [selectedDayOptionErr, setSelectedDayOptionErr] = useState('');
  const [selectedMonthOption, setSelectedMonthOption] = useState(null);
  const [selectedMonthOptionErr, setSelectedMonthOptionErr] = useState('');
  const [selectedYearOption, setSelectedYearOption] = useState(null);
  const [selectedYearOptionErr, setSelectedYearOptionErr] = useState('');
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedMinute, setSelectedMinute] = useState(null);
  const [selectedTimeErr, setSelectedTimeErr] = useState('');
  const [selectedTimeZone, setSelectedTimeZone] = useState(null);
  const [selectTimeZoneError, setselectTimeZoneError] = useState("");
  const [selectedMinuteError, setselectedMinuteError] = useState("");
  const [timeZoneOption, settimeZoneOption] = useState('');
  const [timeZoneVal, settimeZoneVal] = useState(null);
  const [timezoneError, settimezoneError] = useState("");
  const [selectedAmountOptions, setSelectedAmountOptions] = useState(null);
  const [SelectedAmountError, setSelectedAmountError] = useState('');
  const [mainError, setMainError] = useState('')

  const dayOptions = seatRows;
  const monthOptions = [
    { label: 'January', value: '01' },
    { label: 'February', value: '02' },
    { label: 'March', value: '03' },
    { label: 'April', value: '04' },
    { label: 'May', value: '05' },
    { label: 'June', value: '06' },
    { label: 'July', value: '07' },
    { label: 'August', value: '08' },
    { label: 'September', value: '09' },
    { label: 'October', value: '10' },
    { label: 'November', value: '11' },
    { label: 'December', value: '12' },
  ];

  let amountOptions = []
  for (let i = 0; i <= 1000; i++) {
    amountOptions.push({ label: `$${i}`, value: i })
  }

  const hourOptions = [
    { label: '01', value: '01' },
    { label: '02', value: '02' },
    { label: '03', value: '03' },
    { label: '04', value: '04' },
    { label: '05', value: '05' },
    { label: '06', value: '06' },
    { label: '07', value: '07' },
    { label: '08', value: '08' },
    { label: '09', value: '09' },
    { label: '10', value: '10' },
    { label: '11', value: '11' },
    { label: '12', value: '12' },
  ];


  const MinuteOptions = [
    { label: '00', value: '00' },
    { label: '01', value: '01' },
    { label: '02', value: '02' },
    { label: '03', value: '03' },
    { label: '04', value: '04' },
    { label: '05', value: '05' },
    { label: '10', value: '10' },
    { label: '15', value: '15' },
    { label: '20', value: '20' },
    { label: '25', value: '25' },
    { label: '30', value: '30' },
    { label: '35', value: '35' },
    { label: '40', value: '40' },
    { label: '45', value: '45' },
    { label: '50', value: '50' },
    { label: '55', value: '55' },
   
  ];

  const selectedTimezoneOptions = [
    { label: 'am', value: 'am' },
    { label: 'pm', value: 'pm' },
  ];
  const containerStyle = {
    width: '100%!important',
    boxSizing: 'border-box',
    display: 'inline-block',
    margin: 0,
    position: 'relative',
    verticalAlign: ' middle',

  };
  let controlMainStyle = {
    padding: '5px 48px 5px 12px',
    background: '#1e1e27',
    border: '1px solid #282a33',
    minHeight: '56px',
    fontWeight: '600',
    fontSize: '16px',
    color: 'rgba(255, 255, 255, 0.75)',
    marginBottom: '0px',
  }
  let controlStyleDay = {
    borderRadius: '12px',
    ...controlMainStyle

  };
  let controlStyleMonth = {
    borderRadius: '12px',
    ...controlMainStyle

  };
  let controlStyleYear = {
    borderRadius: '12px',
    ...controlMainStyle

  };
  let controlStyleHour = {
    borderRadius: '12px',
    ...controlMainStyle

  };
  let controlStyleMin = {
    borderRadius: '12px',
    ...controlMainStyle

  };
  let controlStyleAmpm = {
    borderRadius: '12px',
    ...controlMainStyle

  };
  let controlStyleTimezone = {
    borderRadius: '12px',
    ...controlMainStyle

  };
  let controlStyleAmount = {
    borderRadius: '12px',
    ...controlMainStyle,

  };
  const valueContainerStyle = {
    color: 'rgb(255 255 255 / 75%)',
    lineHeight: '32px',
    paddingRight: '33px',
    display: 'block',
    paddingLeft: '8px',
    overflow: 'hidden',
    textCverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  };
  const placeholderStyle = {
    color: 'rgba(255, 255, 255, 0.75)',
    fontWeight: '600',
    fontSize: '16px',
  };
  const indicatosContainerStyle = {
    borderRadius: '0 0 0 0',
    height: '44px',
    width: '44px',
    backgroundColor: 'transparent',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: '1px',
    right: '1px',
  };
  const indicatorContainerStyle = {
    border: 'none',
    top: 'auto',
    left: 'auto',
    position: 'relative',
    margin: '0',
    width: 'inherit',
    height: 'inherit',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 15px 0 0',
    fontSize: '24px',
    color: '#acacac',
    fontFamily: 'Feather',
  };
  const menuStyle = {
    backgroundColor: '#1e1e27',
    margin: 0,
    padding: 0,
    borderRadius: '0px 0px 12px 12px',
  };
  const menuListStyle = {
    margin: 0,
    padding: 0,
    borderRadius: '0px 0px 12px 12px',
  };
  const optionStyle = {
    background: '#1e1e27',
    color: 'rgb(255 255 255 / 75%)',
    colorActive: '#fff',
    padding: '15px 22px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
    lineHeight: ' 25px',
    fontWeight: '500',
    fontSize: '16px',
    letterSpacing: '0.5px',

    // background:'transperent',
  };
  const dropdownIndicatorStyle = {

  }
  const svgStyle = {
    height: '44px',
    width: '50px',
  }



  const yearOptions = allYears;
  const handleDayChange = (selectedOption) => {
    setSelectedDayOption(selectedOption);
    setSelectedDayOptionErr('');
    setMainError('')
  };
  const handleMonthChange = (selectedOption) => {
    setSelectedMonthOption(selectedOption);  
    setSelectedMonthOptionErr('');
    setMainError('')

  };
  const handleYearChange = (selectedOption) => {
    setSelectedYearOption(selectedOption);
    setSelectedYearOptionErr('');
    setMainError('')

  };
  const handleAmountChange = (selectedOption) => {
    setSelectedAmountOptions(selectedOption);
    setSelectedAmountError('');
  }
  const handleTimeZoneChange = (selectedOption) => {
    setSelectedTimeZone(selectedOption);
    setselectTimeZoneError("");
  };
  const isFormValidation = () => {
    let isValid = true;

    if (selectedDayOption === null) {
      setSelectedDayOptionErr('This field is required');
      isValid = false;
    }
    if (selectedMonthOption === null) {
      setSelectedMonthOptionErr('This field is required');
      isValid = false;
    }
    if (selectedYearOption === null) {
      setSelectedYearOptionErr('This field is required');
      isValid = false;
    }
    if (selectedTime === null || selectedTime.value === undefined || selectedMinute === null) {
      setSelectedTimeErr('This field is required');
      isValid = false;
    }
    if (selectedMinute === null || selectedMinute.value === null || selectedMinute.value === undefined) {
      setselectedMinuteError('This field is required');
      isValid = false;
    }
    if (selectedAmountOptions === null) {
      setSelectedAmountError('This field is required');
      isValid = false;
    }
    if (timeZoneVal === null || timeZoneVal.value === undefined || timeZoneVal.value === null) {
      settimezoneError('This field is required');
      isValid = false;
    }
    if (selectedTimeZone === null) {
      setselectTimeZoneError('This field is required');
      isValid = false;
    }
    if (selectedMonthOption !== null && selectedDayOption !== null && selectedTime !== null && selectedYearOption !== null && selectedMinute !== null && timeZoneVal !== null) {
      const dt = `${selectedMonthOption.value}/${selectedDayOption.value}/${selectedYearOption.value}`;
      const mydate = new Date(
        `${dt} ${selectedTime.value}:${selectedMinute.value} ${timeZoneVal.value}`,
      );

  



      const distance = Date.parse(mydate) - Date.parse(new Date())
      if (distance <= 0) {
        setMainError('You can not Schedule Stream for  past date');
        isValid = false;
      }
    }

    return isValid;
  };
  const handleScheduleNext = () => {
    const isValid = isFormValidation();
    if (isValid) {
      const hours = selectedTime.value;
      const minute = selectedMinute.value;
      const timeZone = timeZoneVal;
      const ampm = timeZone.value === 'am' ? parseInt(hours) : parseInt(hours) + 12;
      const timeOnly = `${ampm}:${minute}:00`;
      const step2Data = {
        day: selectedDayOption.value,
        month: selectedMonthOption.value,
        year: selectedYearOption.value,
        time: timeOnly,
        tz: selectedTimeZone.value,
        tz_value: selectedTimeZone.label,
        amount: selectedAmountOptions,
        fullDateAndTime: [
          new Date(
            `${selectedYearOption.value}-${selectedMonthOption.value}-${selectedDayOption.value} ${timeOnly}`,
          ),
        ],
      };
      dispatch(setScheduleStreamSteps(3));
      dispatch(setScheduleStreamStep2(step2Data));
    }
  };
  const handleScheduleBack = () => {
    dispatch(setScheduleStreamSteps(1));
  };

  const getTimeZone = () => {
    const url = getUrl('get_timezone');
    get(`${url}`, true)
      .then((response) => {
        const {
          data: { code, data, status, message },
        } = response;
        switch (code) {
          case 200:
            if (status === true) {
              const optionValue = data.map(({ tz: label, pk: value }) => ({
                value,
                label,
              }));
              settimeZoneOption(optionValue);
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
    const day = dayOptions.find((day) => day.value === schedulStreamStem2.day);
    const month = monthOptions.find((month) => month.value === schedulStreamStem2.month);
    const year = yearOptions.find((year) => year.value === schedulStreamStem2.year);
    const tz = schedulStreamStem2.tz === undefined || schedulStreamStem2.tz === null ? null : schedulStreamStem2.tz;
    const tz_value = schedulStreamStem2.tz_value === undefined || schedulStreamStem2.tz_value === null ? null : schedulStreamStem2.tz_value;
    const hour = schedulStreamStem2.fullDateAndTime === undefined ? "" : (moment(convertUTCDateToLocalDate(schedulStreamStem2.fullDateAndTime[0])).format("HH"));
    let updatedHour = hour;
    if (hour >= 13) {
      updatedHour = hour - 12;
    }
    let min = schedulStreamStem2.fullDateAndTime === undefined ? null : (moment(convertUTCDateToLocalDate(schedulStreamStem2.fullDateAndTime[0])).format("mm"));
    let timezoneVal = schedulStreamStem2.fullDateAndTime === undefined ? null : moment(
      
      (schedulStreamStem2.fullDateAndTime[0])).format("A").toLowerCase();

    setSelectedDayOption(day === undefined ? null : day);
    setSelectedMonthOption(month === undefined ? null : month);
    setSelectedYearOption(year === undefined ? null : year);
    // setSelectedTime(updatedHour===undefined?null:updatedHour);
    if (schedulStreamStem2.fullDateAndTime !== undefined) {

      setSelectedTime({ label: updatedHour, value: updatedHour });
    }
    if (schedulStreamStem2.fullDateAndTime !== undefined && min !== null) {
      setSelectedMinute({ label: min, value: min });
    }
    if (timezoneVal !== null || schedulStreamStem2.fullDateAndTime !== undefined) {

      settimeZoneVal({ label: timezoneVal, value: timezoneVal });
    }
    if (tz_value !== null && tz !== null || schedulStreamStem2.fullDateAndTime !== undefined) {
      setSelectedTimeZone({ label: tz_value, value: tz });
    }
    setSelectedAmountOptions(schedulStreamStem2.amount === undefined ? null : schedulStreamStem2.amount);
    getTimeZone();
  }, []);
  return (
    <div className="step-tab-pane-inner">
      <div className="tab-form-div">
        <div className="tab-form-body">
          <div className="center-area-div">
            <div className="container container-750">
              <div className="common-form-div common-form-updated-div">
                <div className="row mlr-12 mb-40">
                  <div className="col-lg-12 col-md-12 plr-12">
                    <div className="form-group select2-form-group select-date-form-group">
                      <div className="label-heading-div">
                        <h4>
                          <span className="icon-span">
                            <i className="bg-custom-icon calendar-time-icon"></i>
                          </span>
                          <span className="text">Date</span>
                        </h4>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-4 col-md-4 plr-12">
                    <div className="form-group select2-form-group select2-new-group select2-new-group2 mb-10">
                      <label htmlFor="">Day</label>
                      <div className="input-control-row">
                        <div className="select-box select-custom2 select-custom2-general round-12 mr-10">
                          <DropDownList
                            value={selectedDayOption}
                            onChange={handleDayChange}
                            options={dayOptions}
                            placeholder="Day"
                            containerStyle={containerStyle}
                            controlStyle={controlStyleDay}
                            valueContainerStyle={valueContainerStyle}
                            placeholderStyle={placeholderStyle}
                            indicatosContainerStyle={indicatosContainerStyle}
                            indicatorContainerStyle={indicatorContainerStyle}
                            menuStyle={menuStyle}
                            optionStyle={optionStyle}
                            menuListStyle={menuListStyle}
                            dropdownIndicatorStyle={dropdownIndicatorStyle}
                            svgStyle={svgStyle}
                            singleValueStyle={placeholderStyle}
                            isSearchable={false}
                          />
                          {selectedDayOptionErr !== '' ? (
                            <div
                              style={{
                                color: 'red',
                                fontSize: '18px',
                                margin: '10px 0px 0px 10px',
                              }}
                            >
                              {selectedDayOptionErr}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-4 col-md-4 plr-12">
                    <div className="form-group select2-form-group select2-new-group select2-new-group2 mb-10">
                      <label htmlFor="">Month</label>
                      <div className="input-control-row">
                        <div className="select-box select-custom2 select-custom2-general round-12 mr-10">
                          <DropDownList
                            value={selectedMonthOption}
                            onChange={handleMonthChange}
                            options={monthOptions}
                            placeholder="Month"
                            containerStyle={containerStyle}
                            controlStyle={controlStyleMonth}
                            valueContainerStyle={valueContainerStyle}
                            placeholderStyle={placeholderStyle}
                            indicatosContainerStyle={indicatosContainerStyle}
                            indicatorContainerStyle={indicatorContainerStyle}
                            menuStyle={menuStyle}
                            optionStyle={optionStyle}
                            menuListStyle={menuListStyle}
                            dropdownIndicatorStyle={dropdownIndicatorStyle}
                            svgStyle={svgStyle}
                            singleValueStyle={placeholderStyle}
                            isSearchable={false}
                          />
                          {selectedMonthOptionErr !== '' ? (
                            <div
                              style={{
                                color: 'red',
                                fontSize: '18px',
                                margin: '10px 0px 0px 10px',
                              }}
                            >
                              {selectedMonthOptionErr}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-4 col-md-4 plr-12">
                    <div className="form-group select2-form-group select2-new-group select2-new-group2 mb-10">
                      <label htmlFor="">Year</label>
                      <div className="input-control-row">
                        <div className="select-box select-custom2 select-custom2-general round-12 mr-10">
                          <DropDownList
                            value={selectedYearOption}
                            onChange={handleYearChange}
                            options={yearOptions}
                            placeholder="Year"
                            containerStyle={containerStyle}
                            controlStyle={controlStyleYear}
                            valueContainerStyle={valueContainerStyle}
                            placeholderStyle={placeholderStyle}
                            indicatosContainerStyle={indicatosContainerStyle}
                            indicatorContainerStyle={indicatorContainerStyle}
                            menuStyle={menuStyle}
                            optionStyle={optionStyle}
                            menuListStyle={menuListStyle}
                            dropdownIndicatorStyle={dropdownIndicatorStyle}
                            svgStyle={svgStyle}
                            singleValueStyle={placeholderStyle}
                            isSearchable={false}
                          />
                          {selectedYearOptionErr !== '' ? (
                            <div
                              style={{
                                color: 'red',
                                fontSize: '18px',
                                margin: '10px 0px 0px 10px',
                              }}
                            >
                              {selectedYearOptionErr}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row mlr-12 mb-40">

                  <div className="col-lg-12 col-md-12 plr-12">
                    <div className="form-group select2-form-group select-date-form-group">
                      <div className="label-heading-div">
                        <h4>
                          <span className="icon-span"> <i className="bg-custom-icon time-clock-icon-new"></i> </span> <span className="text">Time</span></h4>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-3 col-md-3 plr-12">
                    <div className="form-group select2-form-group select2-new-group select2-new-group2 mb-10">
                      <label htmlFor="">Hour</label>
                      <div className="input-control-row">
                        <div className="select-box select-custom2 select-custom2-general round-12 mr-10">
                          <DropDownList
                            value={selectedTime}
                            onChange={(time) => {
                              setSelectedTime(time);
                              setSelectedTimeErr('');
                              setMainError('')
                              // handleCloseDropDown("hour")
                            }}
                            options={hourOptions}
                            placeholder="Hour"
                            containerStyle={containerStyle}
                            controlStyle={controlStyleHour}
                            valueContainerStyle={valueContainerStyle}
                            placeholderStyle={placeholderStyle}
                            indicatosContainerStyle={indicatosContainerStyle}
                            indicatorContainerStyle={indicatorContainerStyle}
                            menuStyle={menuStyle}
                            optionStyle={optionStyle}
                            menuListStyle={menuListStyle}
                            dropdownIndicatorStyle={dropdownIndicatorStyle}
                            svgStyle={svgStyle}
                            singleValueStyle={placeholderStyle}
                            isSearchable={false}
                          />
                          {selectedTimeErr !== '' ? (
                            <div
                              style={{ color: 'red', fontSize: '18px', margin: '10px 0px 0px 10px' }}
                            >
                              {selectedTimeErr}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-3 col-md-3 plr-12">
                    <div className="form-group select2-form-group select2-new-group select2-new-group2 mb-10">
                      <label htmlFor="">Minute</label>
                      <div className="input-control-row">
                        <div className="select-box select-custom2 select-custom2-general round-12 mr-10">
                          <DropDownList
                            value={selectedMinute}
                            onChange={(time) => {
                              setSelectedMinute(time);
                              setselectedMinuteError('');
                              setMainError('')
                            }}
                            options={MinuteOptions}
                            placeholder="Min"
                            containerStyle={containerStyle}
                            controlStyle={controlStyleMin}
                            valueContainerStyle={valueContainerStyle}
                            placeholderStyle={placeholderStyle}
                            indicatosContainerStyle={indicatosContainerStyle}
                            indicatorContainerStyle={indicatorContainerStyle}
                            menuStyle={menuStyle}
                            optionStyle={optionStyle}
                            menuListStyle={menuListStyle}
                            dropdownIndicatorStyle={dropdownIndicatorStyle}
                            svgStyle={svgStyle}
                            singleValueStyle={placeholderStyle}
                            isSearchable={false}
                          />
                          {selectedMinuteError !== '' ? (
                            <div
                              style={{ color: 'red', fontSize: '18px', margin: '10px 0px 0px 10px' }}
                            >
                              {selectedMinuteError}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>


                  <div className="col-lg-3 col-md-3 plr-12">
                    <div className="form-group select2-form-group select2-new-group select2-new-group2 mb-10">
                      <label htmlFor="">am/pm</label>
                      <div className="input-control-row">
                        <div className="select-box select-custom2 select-custom2-general round-12 mr-10 mb-2">
                          <DropDownList
                            value={timeZoneVal}
                            onChange={(time) => {
                              settimeZoneVal(time);
                              settimezoneError('');
                              setMainError('')
                            }}
                            options={selectedTimezoneOptions}
                            placeholder="am/pm"
                            containerStyle={containerStyle}
                            controlStyle={controlStyleAmpm}
                            valueContainerStyle={valueContainerStyle}
                            placeholderStyle={placeholderStyle}
                            indicatosContainerStyle={indicatosContainerStyle}
                            indicatorContainerStyle={indicatorContainerStyle}
                            menuStyle={menuStyle}
                            optionStyle={optionStyle}
                            menuListStyle={menuListStyle}
                            dropdownIndicatorStyle={dropdownIndicatorStyle}
                            svgStyle={svgStyle}
                            singleValueStyle={placeholderStyle}
                            isSearchable={false}
                          />
                          {timezoneError !== '' ? (
                            <div
                              style={{ color: 'red', fontSize: '18px', margin: '10px 0px 0px 10px' }}
                            >
                              {timezoneError}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-3 col-md-3 plr-12">
                    <div className="form-group select2-form-group select2-new-group select2-new-group2 mb-10">
                      <label htmlFor="">Timezone</label>
                      <div className="input-control-row">
                        <div className="select-box select-custom2 select-custom2-general round-12 mr-10">
                          <DropDownList
                            value={selectedTimeZone}
                            onChange={handleTimeZoneChange}
                            options={timeZoneOption}
                            placeholder="EST"
                            containerStyle={containerStyle}
                            controlStyle={controlStyleTimezone}
                            valueContainerStyle={valueContainerStyle}
                            placeholderStyle={placeholderStyle}
                            indicatosContainerStyle={indicatosContainerStyle}
                            indicatorContainerStyle={indicatorContainerStyle}
                            menuStyle={menuStyle}
                            optionStyle={optionStyle}
                            menuListStyle={menuListStyle}
                            dropdownIndicatorStyle={dropdownIndicatorStyle}
                            svgStyle={svgStyle}
                            singleValueStyle={placeholderStyle}
                            isSearchable={false}
                          />
                          {selectTimeZoneError !== '' ? (
                            <div
                              style={{ color: 'red', fontSize: '18px', margin: '10px 0px 0px 10px' }}
                            >
                              {selectTimeZoneError}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>


                <div className="row mlr-12 mb-40">
                  <div className="col-lg-12 col-md-12 plr-12">
                    <div className="form-group select2-form-group select-date-form-group">
                      <div className="label-heading-div">
                        <h4> <span className="icon-span"> <i className="bg-custom-icon money-icon-new"></i> </span> <span className="text">Fix your Amount</span></h4>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-12 col-md-12 plr-12">
                    <div className="form-group select2-form-group select2-new-group select2-new-group2 mb-10">
                      <label htmlFor="">USD</label>
                      <div className="input-control-row">
                        <div className="select-box select-custom2 select-custom2-general round-12 mr-10">
                          <DropDownList
                            value={selectedAmountOptions}
                            onChange={handleAmountChange}
                            options={amountOptions}
                            placeholder="Amount"
                            containerStyle={containerStyle}
                            controlStyle={controlStyleAmount}
                            valueContainerStyle={valueContainerStyle}
                            placeholderStyle={placeholderStyle}
                            indicatosContainerStyle={indicatosContainerStyle}
                            indicatorContainerStyle={indicatorContainerStyle}
                            menuStyle={menuStyle}
                            optionStyle={optionStyle}
                            menuListStyle={menuListStyle}
                            dropdownIndicatorStyle={dropdownIndicatorStyle}
                            svgStyle={svgStyle}
                            singleValueStyle={placeholderStyle}
                            isSearchable={false}
                          />
                          {SelectedAmountError !== '' ? (
                            <div
                              style={{
                                color: 'red',
                                fontSize: '18px',
                                margin: '10px 0px 0px 10px',
                              }}
                            >
                              {SelectedAmountError}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                  {mainError !== '' ? (
                    <div
                      style={{
                        color: 'red',
                        fontSize: '18px',
                        margin: '10px 0px 0px 10px',
                      }}
                    >
                      {mainError}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="tab-form-bottom mt-40">
          <div className="tab-cre-btn-div general-btn-div-row">
            <div className="general-btn-div-right">
              <Link
                to="#"
                className="btn btn-primary-outline btn-primary-color-02 mh-btn55 btn-black-back mr-24"
                onClick={handleScheduleBack}
              >
                Back
            </Link>
              <Link to="#" className="btn btn-common-primary mh-btn55 btn-book" onClick={handleScheduleNext}>
                Next
            </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleFormComponent;

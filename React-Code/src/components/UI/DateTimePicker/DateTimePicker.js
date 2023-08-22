import React from 'react';
import PropTypes from 'prop-types';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/dark.css';

const DateTimePicker = ({
  handleChangeDate,
  value,
  placeholder,
  maxDate,
  notMaxDate,
  minmumDate,
  altFormat,
  enableTime,
  noCalendar,
  disable,
  datePickerMode,
  extraClass,
  iconClass,
  handleFocusDate
}) => {
  return (
    <Flatpickr
      value={value}
      options={{
        wrap: true,
        mode: datePickerMode,
        minDate: minmumDate,
        maxDate: maxDate
          ? maxDate
          : notMaxDate
            ? ''
            : new Date(Date.now() + 0.1 * 24 * 60 * 60 * 1000),
        enableTime: enableTime ? true : false,
        noCalendar: noCalendar ? true : false,
        altInput: true,
        // MMM DD, hh:mm A
        ariaDateFormat: altFormat ? 'M d, h:i K' : 'd-m-Y',
        altFormat: altFormat ? 'M d, h:i K' : 'd-m-Y',
        dateFormat: altFormat ? 'M d, h:i K' : 'd-m-Y',
        disableMobile: 'true',
        monthSelectorType: 'static',
      }}
      onChange={handleChangeDate}
      onFocus={handleFocusDate}
    >
      {/* <div className="date-input-box">
        <div className="input-control-row"> */}
      <div className="input-group" style={disable}>
        <span className={`icon-box`} data-toggle>
          <i className={iconClass || "bg-custom-icon calendar-time-icon"}></i>
        </span>
        <input
          data-input
          type="text"
          className={`form-control custom-form-control ${extraClass}`}
          placeholder={placeholder}
        />
      </div>
      {/* </div>
      </div> */}
    </Flatpickr>
  );
};

export default DateTimePicker;
DateTimePicker.propTypes = {
  value: PropTypes.any,
  handleChangeDate: PropTypes.func,
  placeholder: PropTypes.string,
  notMaxDate: PropTypes.bool,
  altFormat: PropTypes.any,
  enableTime: PropTypes.bool,
  maxDate: PropTypes.any,
  minmumDate: PropTypes.any,
  noCalendar: PropTypes.bool,
  disable: PropTypes.any,
  datePickerMode: PropTypes.string,
  extraClass: PropTypes.string,
  iconClass: PropTypes.string,
  handleFocusDate: PropTypes.func,
};

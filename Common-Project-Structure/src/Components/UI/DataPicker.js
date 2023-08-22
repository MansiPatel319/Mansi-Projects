/* eslint-disable operator-linebreak */
import React from 'react';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_orange.css';

const DatePicker = ({
  handleChangeDate,
  value,
  placeholder,
  maxDate,
  notMaxDate,
  minmumDate,
  altFormat,
  enableTime,
  // className,
}) => (
  <Flatpickr
    value={value}
    options={{
      wrap: true,
      // maxDate:
      minDate: minmumDate,
      maxDate:
        maxDate ||
        (notMaxDate ? '' : new Date(Date.now() + 0.1 * 24 * 60 * 60 * 1000)),
      enableTime: !!enableTime,
      altInput: true,
      ariaDateFormat: altFormat ? 'd-m-Y H:i' : 'm-d-Y',
      altFormat: altFormat ? 'd-m-Y H:i' : 'm-d-Y',
      dateFormat: altFormat ? 'd-m-Y H:i' : 'm-d-Y',
      disableMobile: 'true',
    }}
    onChange={handleChangeDate}>
    <div>
      <input
        className="form-control"
        placeholder={placeholder}
        data-input
        type="date"
      />
      <div className="input-group-addon bg-calendar" data-toggle>
        <span className="svg-icon icon-calendar" />
      </div>
    </div>
  </Flatpickr>
);

export default DatePicker;

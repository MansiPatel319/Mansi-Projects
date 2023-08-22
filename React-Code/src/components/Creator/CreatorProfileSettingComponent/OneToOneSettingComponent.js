import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUrl } from '../../../network/url';
import { get, post } from '../../../network/requests';
import { toast } from 'react-toastify';
import DropDownList from '../../UI/DropDownList/DropDownList';
import DateTimePicker from '../../UI/DateTimePicker/DateTimePicker';
import moment from 'moment';
import Loader from '../../UI/Loader/Loader';
import { tokenExpire } from '../../../services/auth';
import { useHistory } from 'react-router-dom';
toast.configure();
const OneToOneSettingComponent = () => {
  const history = useHistory();
  let amountOption = [];
  for (let i = 0; i <= 1000; i++) {
    amountOption.push({ label: `$${i}`, value: i });
  }

  const [isLoading, setIsLoading] = useState(false);
  const [selectedAmountOption, setSelectedAmountOption] = useState(null);
  const [selectedAmountOptionErr, setSelectedAmountOptionErr] = useState('');
  const [selectedTimeZone, setSelectedTimeZone] = useState(null);
  const [selectedTimeZoneErr, setSelectedTimeZoneErr] = useState(null);
  const [timeZoneOption, settimeZoneOption] = useState([]);
  const [isOpenDropDown, setIsOpenDropDown] = useState(false);

  const [addTimeSlot, setAddTimeSlot] = useState([
    {
      id: 0,
      slotVlaue: '',
      is_booked: false,
      selectedTimeZone: null,
      slotVlaueErr: '',
    },
    {
      id: 1,
      slotVlaue: '',
      is_booked: false,
      selectedTimeZone: null,
      slotVlaueErr: '',
    },
    {
      id: 2,
      slotVlaue: '',
      is_booked: false,
      selectedTimeZone: null,
      slotVlaueErr: '',
    },
  ]);
  const handleClickDropDown = () => {
    setIsOpenDropDown(!isOpenDropDown);
  };

  const handleAmountChange = (selectedOption) => {
    setSelectedAmountOption(selectedOption);
    setSelectedAmountOptionErr('');
  };
  const handleTimeZoneChange = (selectedOption) => {
    setSelectedTimeZone(selectedOption);
    setSelectedTimeZoneErr('');
  };
  const containerStyle = {
    width: '100%!important',
    boxSizing: 'border-box',
    display: 'inline-block',
    margin: 0,
    position: 'relative',
    verticalAlign: ' middle',
  };
  let controlStyle = {
    borderRadius: !isOpenDropDown ? '12px' : '12px 12px 0px 0px',
    padding: '5px 48px 5px 12px',
    background: '#1e1e27',
    border: '1px solid #282a33',
    minHeight: '56px',
    fontWeight: '600',
    fontSize: '16px',
    color: 'rgba(255, 255, 255, 0.75)',
    marginBottom: '0px',
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
  const dropdownIndicatorStyle = {};
  const svgStyle = {
    height: '44px',
    width: '50px',
  };

  const getOneToOneDetails = () => {
    const url = getUrl('get_all_creator_my_sessions');
    setIsLoading(true);
    get(url, true)
      .then((res) => {
        const {
          data: { code, data, status, message },
        } = res;
        setIsLoading(false);
        switch (code) {
          case 200:
            if (status === true) {
              if (data.length > 0) {
                const amountOption = { label: `$${data[0].amount}`, value: data[0].amount };
                setSelectedAmountOption(amountOption);
                const optionValue = { label: `${data[0].tz_value}`, value: data[0].tz };
                setSelectedTimeZone(optionValue);
                const value = [];
                data.map((dt) => {
                  const newData = {
                    id: dt.id,
                    slotVlaue: [new Date(dt.slot_datetime.substr(0, dt.slot_datetime.length - 1))],
                    is_booked: dt.is_booked,
                    slotVlaueErr: '',
                  };
                  //setIsEdit(true);
                  value.push(newData);
                });
                setAddTimeSlot(value);
              } else {
                setAddTimeSlot(addTimeSlot);
              }
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
    getOneToOneDetails();
  }, []);
  useEffect(() => {
    getTimeZone();
  }, []);
  const handleChangeDate = (date, slotData) => {
    const updateData = [...addTimeSlot];
    updateData.map((data) => {
      if (data.id === slotData.id) {
        data.slotVlaue = date;
        data.slotVlaueErr = '';
      }
    });
    setAddTimeSlot(updateData);
  };
  const handleAddTimeSlot = (e) => {
    e.preventDefault();
    const addRecord = {
      id: Math.random(),
      isClosed: true,
      slotVlaue: '',
      selectedTimeZone: null,
      slotVlaueErr: '',
    };
    let newAddTimeSlotRecord = [...addTimeSlot, addRecord];
    setAddTimeSlot(newAddTimeSlotRecord);
  };
  const handleRemoveTimeSlot = (e, index) => {
    e.preventDefault();
    const updateData = [...addTimeSlot];
    updateData.splice(index, 1);
    setAddTimeSlot(updateData);
  };
  const isFormValid = () => {
    let addTimeSlotUpdate = [...addTimeSlot];
    let isValid = true;
    addTimeSlotUpdate.map((data) => {
      if (data.id === 0) {
        if (data.slotVlaue === '') {
          isValid = false;
          data.slotVlaueErr = 'Select Session Time';
        }
      }
    });
    if (selectedTimeZone === null) {
      isValid = false;
      setSelectedTimeZoneErr('Select time zone');
    }
    if (selectedAmountOption === null) {
      isValid = false;
      setSelectedAmountOptionErr('Please select session amount');
    }
    setAddTimeSlot(addTimeSlotUpdate);
    return isValid;
  };
  const handleSubmitForm = (e) => {
    e.preventDefault();
    const isValid = isFormValid();
    if (isValid) {
      let value = [];
      const updateData = [...addTimeSlot];
      updateData.map((data) => {
        const dateTime =
          data.slotVlaue === '' ? '' : moment(data.slotVlaue[0]).format('YYYY-MM-DD HH:mm');
        value.push(dateTime);
      });
      value = value.filter((v) => v != '').join(',');
      const formData = new FormData();
      formData.append('amount', selectedAmountOption.value);
      formData.append('time_slots', value);
      formData.append('tz', selectedTimeZone.value);
      const url = getUrl('creator_sessions');
      setIsLoading(true);
      post(url, formData, true)
        .then((res) => {
          const {
            data: { code, status, message },
          } = res;
          setIsLoading(false);
          switch (code) {
            case 200:
              if (status === true) {
                toast.success(message, {
                  pauseOnHover: false,
                  position: toast.POSITION.TOP_RIGHT,
                });
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
    }
  };
  return (
    <div className="tab-pane-inner">
      {isLoading && <Loader />}
      <div className="edit-profile-div">
        <div className="edit-common-form-div">
          <form>
            <div className="container container-770">
              <div className="form-general-root" id="">
                <div className="row mlr-10">
                  <div className="col-lg-6 col-md-6 plr-10">
                    <div className="form-group select2-form-group select2-new-group select2-new-group2 mb-40">
                      <label>Edit Amount</label>
                      <div className="input-control-row">
                        <div className="select-box select-custom2 select-custom2-general round-12 mr-10">
                          <DropDownList
                            value={selectedAmountOption}
                            onChange={handleAmountChange}
                            options={amountOption}
                            placeholder="Amount"
                            containerStyle={containerStyle}
                            controlStyle={controlStyle}
                            valueContainerStyle={valueContainerStyle}
                            placeholderStyle={placeholderStyle}
                            indicatosContainerStyle={indicatosContainerStyle}
                            indicatorContainerStyle={indicatorContainerStyle}
                            menuStyle={menuStyle}
                            optionStyle={optionStyle}
                            menuListStyle={menuListStyle}
                            handleClick={handleClickDropDown}
                            dropdownIndicatorStyle={dropdownIndicatorStyle}
                            svgStyle={svgStyle}
                            singleValueStyle={placeholderStyle}
                            isSearchable={false}
                          />
                          {selectedAmountOptionErr !== '' ? (
                            <div
                              style={{
                                color: 'red',
                                fontSize: '18px',
                                margin: '10px 0px 0px 0px',
                              }}
                            >
                              {selectedAmountOptionErr}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 plr-10">
                    <div className="form-group select2-form-group select2-form-group-cs1 mb-30">
                      <label>Timezone</label>
                      <div className="form-group select2-form-group select2-form-group-cs1">
                        <div className="select-box select-custom2 select-custom2-general">
                          <DropDownList
                            value={selectedTimeZone}
                            onChange={(selectedOption) => handleTimeZoneChange(selectedOption)}
                            placeholder="Select Timezone"
                            options={timeZoneOption}
                            containerStyle={containerStyle}
                            controlStyle={controlStyle}
                            valueContainerStyle={valueContainerStyle}
                            placeholderStyle={placeholderStyle}
                            indicatosContainerStyle={indicatosContainerStyle}
                            indicatorContainerStyle={indicatorContainerStyle}
                            menuStyle={menuStyle}
                            optionStyle={optionStyle}
                            menuListStyle={menuListStyle}
                            handleClick={handleClickDropDown}
                            dropdownIndicatorStyle={dropdownIndicatorStyle}
                            svgStyle={svgStyle}
                            singleValueStyle={placeholderStyle}
                            isSearchable={false}
                          />
                          {selectedTimeZoneErr !== '' ? (
                            <div
                              style={{
                                color: 'red',
                                fontSize: '18px',
                                margin: '10px 0px 0px 0px',
                              }}
                            >
                              {selectedTimeZoneErr}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-12 col-md-12 plr-10">
                    <div className="form-group mb-30">
                      <label className="label-text">Available Slots</label>
                      <div className="category-control-row category-control-row-with-cancel">
                        <div className="category-inner">
                          <ul
                            className="category-list-ul slot-category-list-ul"
                            id="choose-slot-list"
                          >
                            {addTimeSlot.length > 0 &&
                              addTimeSlot.map((slot, index) => {
                                return (
                                  <li key={slot.id}>
                                    <div className="date-input-box" key={index}>
                                      <div className="input-control-row">
                                        <DateTimePicker
                                          iconClass="bg-custom-icon calendar-time-icon-new"
                                          value={slot.slotVlaue}
                                          handleChangeDate={(date) => handleChangeDate(date, slot)}
                                          placeholder="Select a day and time"
                                          enableTime={true}
                                          altFormat={true}
                                          notMaxDate={true}
                                          datePickerMode="single"
                                          minmumDate="today"
                                          disable={
                                            slot.is_booked
                                              ? { pointerEvents: 'none', opacity: '0.4' }
                                              : {}
                                          }
                                          extraClass="dateClass"
                                        />
                                        <button
                                          style={{ marginTop: '3px' }}
                                          className="cancel-icon-span"
                                          onClick={(e) => handleRemoveTimeSlot(e, index)}
                                        >
                                          <i className="fe fe-x cross-icon"></i>
                                        </button>
                                      </div>
                                    </div>
                                  </li>
                                );
                              })}
                            <li>
                              <Link to="#" className="add-link" onClick={handleAddTimeSlot}>
                                <span className="icon-img-span">
                                  <span className="material-icons-outlined">add</span>
                                </span>
                                <span className="span-text"> Add Slots </span>
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-12 col-md-12 plr-10">
                    <div className="submit-bottom-div">
                      <div className="submit-bottom-div-row">
                        <Link
                          to="#"
                          onClick={() => getOneToOneDetails()}
                          class="btn btn-primary-outline btn-primary-color-02 mh-btn55 btn-cancel mr-24"
                          id="cancel-edit-profile-btn"
                        >
                          Cancel
                        </Link>

                        <Link
                          to="#"
                          className="btn btn-primary-outline btn-primary-color-02 mh-btn55 btn-cancel mr-24 btn-save"
                          onClick={handleSubmitForm}
                        >
                          Save
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OneToOneSettingComponent;

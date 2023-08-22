import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import Flatpickr from "react-flatpickr";
import Select from "react-select";
import toast from 'react-hot-toast'

import ErrorMessage from "../../UI/ErrorMessage";
import images from "../../../Assets/images";
import { setBookingDetails } from "../../../Store/Actions/BookingModule/bookingActionCreator";
import "./style.css";
import "flatpickr/dist/themes/material_green.css";
import FeildErrorMessage from "../../UI/FeildErrorMessage";
import { Link, useParams,useNavigate } from "react-router-dom";
import { getSlots } from '../../../Network/Core/Booking/booking'
import MainLoader from "../../UI/Loader";

const BookingDate = () => {
  const navigate = useNavigate()
  const [selectedRepeatType, setSelectedRepeatType] = useState<any>();
  const [selectedMonthWiseData, setSelectedMonthWiseData] = useState<any>({});
  const [selectedMonthDayWiseData, setSelectedMonthDayWiseData] = useState<any>(
    {}
  );
  const [errorWeekDays, setErrorWeekDays] = useState("");
  const [startDate, setStartDate] = useState("");
  const [dayList, setDayList] = useState<any>([
    {
      label: "M",
      value: "MONDAY",
      active: false,
    },
    {
      label: "T",
      value: "TUESDAY",
      active: false,
    },
    {
      label: "W",
      value: "WEDNESDAY",
      active: false,
    },
    {
      label: "T",
      value: "THURSDAY",
      active: false,
    },
    {
      label: "F",
      value: "FRIDAY",
      active: false,
    },
    {
      label: "S",
      value: "SATURDAY",
      active: false,
    },
    {
      label: "S",
      value: "SUNDAY",
      active: false,
    },
  ]);
  const [repeatEvery, setRepeatEvery] = useState<any>([
    {
      label: "Weekly",
      value: "WEEKLY",
      active: false,
    },
    {
      label: "Monthly",
      value: "MONTHLY",
      active: false,
    },
  ]);
  const [repeatedOn, setRepeatedOn] = useState<any>([
    {
      label: "First",
      value: "FIRST",
      active: false,
    },
    {
      label: "Last",
      value: "LAST",
      active: false,
    },
  ]);
  const [monthDayList, setMonthDayList] = useState<any>([
    {
      label: "Monday",
      value: "MONDAY",
      active: false,
    },
    {
      label: "Tuesday",
      value: "TUESDAY",
      active: false,
    },
    {
      label: "Wednesday",
      value: "WEDNESDAY",
      active: false,
    },
    {
      label: "Thursday",
      value: "THURSDAY",
      active: false,
    },
    {
      label: "Friday",
      value: "FRIDAY",
      active: false,
    },
    {
      label: "Saturday",
      value: "SATURDAY",
      active: false,
    },
    {
      label: "Sunday",
      value: "SUNDAY",
      active: false,
    },
  ]);
  const [isLoading, setIsLoading] = useState(false)

  const dispatch = useDispatch();
  const {project} = useParams()
  const bookingSteps = useSelector((state: any) => state.booking.bookingSteps);
  const bookingType = useSelector((state: any) => state.booking.bookingType);
  const bookingDate = useSelector(
    (state: any) =>
      state.booking.bookingSteps.find(
        (bookingStepItem: any) => bookingStepItem.name === bookingType
      )?.data?.bookingDate
  );
  console.log('bookingDate', bookingDate)
  const {
    register, // this use for evnets and value
    handleSubmit, // this is form submit handle
    setValue,
    setError,
    getValues,
    control,
    clearErrors,
    formState: { errors }, // error like required,validate, etc..
  } = useForm();

  const {
    register: register2,
    setValue: setValue2,
    getValues: getValues2,
    setError: setError2,
    clearErrors: clearErrors2,
    control: control2,
    formState: { errors: errors2 },
    handleSubmit: handleSubmit2,
  } = useForm();

  const handleChange = (e: any) => {
    setSelectedRepeatType(e);
    setValue2("repeatedType", e);
  };
  const handleMonthWeekChange = (e: any) => {
    setSelectedMonthWiseData(e);
    setValue2("repeatedMonthWeekWise", e);
    clearErrors2("repeatedMonthWeekWise");
  };
  const handleMonthDayChange = (e: any) => {
    setSelectedMonthDayWiseData(e);
    setValue2("repeatedMonthDayWise", e);
    clearErrors2("repeatedMonthDayWise");
  };

  const handleadddaylist = (data: any) => {
    const tempDayListData: any = [...dayList];
    tempDayListData.map((item: any) => {
      if (item.value == data.value) {
        item.active = !data.active;
      } else {
        item.active = false;
      }
    });
    setDayList(tempDayListData);
    if (tempDayListData.find((item: any) => item.active)) {
      setErrorWeekDays("");
    }
  };
  const handleNext2 = (formData: any) => {
    if (
      formData.repeatedType.value === "WEEKLY" &&
      dayList.filter((item: any) => item.active).length <= 0
    ) {
      setErrorWeekDays("Please Select Day");
    } else {
      clearErrors2("selectedDate");
      let temp = [...bookingSteps];
      const SelectedDataIndex = temp.findIndex(
        (bookingStepItem: any) => bookingStepItem.name === bookingType
      );
      temp[SelectedDataIndex].stepCount = 3;
      var startDate = formatDate(formData.selectedStartDate);
      var endDate = formatDate(formData.selectedEndDate);
      temp[SelectedDataIndex].data.bookingDate.startDate = startDate;
      temp[SelectedDataIndex].data.bookingDate.endDate = endDate;
      temp[SelectedDataIndex].data.bookingDate.repeatType =
        formData?.repeatedType;
      temp[SelectedDataIndex].data.bookingDate.repeatWeekWise = dayList.find(
        (item: any) => item.active
      )?.value
        ? dayList.find((item: any) => item.active)?.value
        : "";
      temp[SelectedDataIndex].data.bookingDate.repeatMonthWise.monthWeek =
        formData?.repeatedMonthWeekWise ? formData?.repeatedMonthWeekWise : "";
      temp[SelectedDataIndex].data.bookingDate.repeatMonthWise.monthDay =
        formData?.repeatedMonthDayWise ? formData?.repeatedMonthDayWise : "";

      dispatch(setBookingDetails(temp));
    }
  };
  const handleNext = (formData: any) => {
    if (
      formData.selectedDate == undefined ||
      formData.selectedDate == "Invalid Date"
    ) {
      setError("selectedDate", {
        type: "validate",
        message: "Please Select Date",
      });
    } else {
      clearErrors("selectedDate");
      let temp = [...bookingSteps];
      const SelectedDataIndex = temp.findIndex(
        (bookingStepItem: any) => bookingStepItem.name === bookingType
      );
      temp[SelectedDataIndex].stepCount = 3;
      var date = formatDate(formData.selectedDate);
      temp[SelectedDataIndex].data.bookingDate.selectedDate = date;
      dispatch(setBookingDetails(temp));
    }
  };
  const handlePrev = (e: any) => {
    e.preventDefault();
    let temp = [...bookingSteps];
    const SelectedDataIndex = temp.findIndex(
      (bookingStepItem: any) => bookingStepItem.name === bookingType
    );
    temp[SelectedDataIndex].stepCount = 1;
    var date = formatDate(getValues("selectedDate"));
    temp[SelectedDataIndex].data.bookingDate.selectedDate = date;
    dispatch(setBookingDetails(temp));
  };
  const handlePrev2 = (e: any) => {
    e.preventDefault();
    let temp = [...bookingSteps];
    const SelectedDataIndex = temp.findIndex(
      (bookingStepItem: any) => bookingStepItem.name === bookingType
    );
    temp[SelectedDataIndex].stepCount = 1;
    var startDate = formatDate(getValues2("selectedStartDate"));
    var endDate = formatDate(getValues2("selectedEndDate"));
    temp[SelectedDataIndex].data.bookingDate.startDate = startDate;
    temp[SelectedDataIndex].data.bookingDate.endDate = endDate;
    temp[SelectedDataIndex].data.bookingDate.repeatType =
      getValues2("repeatedType");
    temp[SelectedDataIndex].data.bookingDate.repeatWeekWise = dayList.find(
      (item: any) => item.active
    )?.value
      ? dayList.find((item: any) => item.active)?.value
      : "";
    temp[SelectedDataIndex].data.bookingDate.repeatMonthWise.monthWeek =
      getValues2("repeatedMonthWeekWise");
    temp[SelectedDataIndex].data.bookingDate.repeatMonthWise.monthDay =
      getValues2("repeatedMonthDayWise");
    dispatch(setBookingDetails(temp));
  };

  function formatDate(date: any) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }
  const startTimeChanged = (time: any) => {
    setValue2("selectedStartDate", time);
    setStartDate(time);
    clearErrors2("selectedStartDate");
  };
  const endTimeChanged = (time: any) => {
    setValue2("selectedEndDate", time);
    clearErrors2("selectedEndDate");
  };
  const selectTimeChanged = (time: any) => {
    setValue("selectedDate", time);
    clearErrors("selectedDate");
  };

  useEffect(() => {
    setValue(
      "selectedDate",
      new Date(bookingDate?.selectedDate)
        ? new Date(bookingDate?.selectedDate)
        : ""
    );
    console.log(
      "new Date(bookingDate?.startDate)?new Date(bookingDate?.startDate):''",
      new Date(bookingDate?.startDate) ? new Date(bookingDate?.startDate) : ""
    );

    setValue2(
      "selectedStartDate",
      new Date(bookingDate?.startDate) ? new Date(bookingDate?.startDate) : ""
    );
    setValue2(
      "selectedEndDate",
      new Date(bookingDate?.endDate) ? new Date(bookingDate?.endDate) : ""
    );
    setValue2(
      "repeatedType",
      bookingDate?.repeatType ? bookingDate?.repeatType : ""
    );
    const tempDayListData: any = [...dayList];
    tempDayListData.map((item: any) => {
      if (item.value == bookingDate?.repeatWeekWise) {
        item.active = true;
      } else {
        item.active = false;
      }
    });
    handleChange(bookingDate?.repeatType ? bookingDate?.repeatType : "");

    setDayList(tempDayListData);
    // setValue("setDayList", bookingDate?.repeatWeekWise?bookingDate?.repeatWeekWise:'');
    setValue2(
      "repeatedMonthWeekWise",
      bookingDate?.repeatMonthWise?.monthWeek
        ? bookingDate?.repeatMonthWise?.monthWeek
        : ""
    );
    setValue2(
      "repeatedMonthDayWise",
      bookingDate?.repeatMonthWise?.monthDay
        ? bookingDate?.repeatMonthWise?.monthDay
        : ""
    );
  }, [bookingDate]);
  let DateData: any[]=[];
const [dummydata,setDummyData]=useState([])
dummydata?.map((item:any)=>{
    DateData.push(new Date(item));
  })
  console.log('DateData :>> ', DateData);

  // Flatpickr('.flatpickr', {
  //   onDayCreate: function(dayElem:any) {
  //       // Checking to see if the current day object is in our array
  //      // The `+` is just a shortcut for parsing the date
  //       if (DataData.indexOf(+dayElem.dateObj) !== -1) {
  //         dayElem.className += "color-date";
  //       }
  //   }
  // });
  const handleGetSlots = async() => {
    setIsLoading(true);
      let temp = [...bookingSteps]
      const SelectedDataIndex = temp.findIndex((bookingStepItem: any) => bookingStepItem.name === bookingType)
      const params = temp[SelectedDataIndex].data
      let paramsdata:Array<any>=[]
      if (bookingType === "Delivery" || bookingType === "Multi-Vehicle") {
        paramsdata = [
          
            {booking_type: bookingType.toLowerCase()},
            {access_point: params?.schedulingInformation?.accesspoint},
            // {date:params?.bookingDate?.selectedDate},
            {project: project},
            {resource:params?.schedulingInformation?.resource},
            {site_id: params.schedulingInformation.site},
            
          
        ]
      }
      else if (bookingType === "Resource-Only")
      {
  
        paramsdata = [
          
          {booking_type: bookingType.toLowerCase()},
          // {date:params?.bookingDate?.selectedDate},
          {project: project},
          {resource:params?.schedulingInformation?.resource},
          {site_id: params.schedulingInformation.site},
          
        
      ]
        
      }
      else if (bookingType === "Recurring")
      {
        paramsdata = [
          
          {booking_type: bookingType.toLowerCase()},
          {access_point: params?.schedulingInformation?.accesspoint},
          // {start_date: params?.bookingDate?.startDate},
          // {end_date: params?.bookingDate?.endDate},
          {project: project},
          {resource:params?.schedulingInformation?.resource},
          {site_id: params?.schedulingInformation.site},
          {repeat_option: params?.bookingDate?.repeatType},
        
      ]
        if (params?.bookingDate?.repeatType === "WEEKLY") {
          paramsdata = [
            { repeat_weekday: params?.bookingDate?.repeatWeekWise },
          ...paramsdata
          ]
        }
        else{
          paramsdata = [
            { repeat_monthly_option: params?.bookingDate?.repeatMonthWise?.monthWeek },
            { repeat_weekday: params?.bookingDate?.repeatMonthWise?.monthDay },
          ...paramsdata
          ]
        }
      }
  
      let paramsString:string =""
      paramsdata.map((item, index) => {
        for (const [key, value] of Object.entries(item)) {
          if (value !== undefined) {
            if (index === paramsdata.length - 1) {
              paramsString += key + "=" + value
            }
            else {
              paramsString += key + "=" + value + "&"
            }
          }
        }
      })
      try {
        const res = await getSlots(project, paramsString, true);
        // toast.loading("checking pass info");
        const { status, data, statusText } = res;
        switch (status) {
            case 200:
            setIsLoading(false);
            // let dates=data.map((item:any) =>item.isAvailable && item.slotDate).filter((item:any)=>item)
            setDummyData(data);
  
                break;
            case 400:
                setIsLoading(false);
                toast.error(data.error)
                let temp = [...bookingSteps];
                const SelectedDataIndex = temp.findIndex(
                  (bookingStepItem: any) => bookingStepItem.name === bookingType
                );
                temp[SelectedDataIndex].stepCount = 1;
                var date = formatDate(getValues("selectedDate"));
                temp[SelectedDataIndex].data.bookingDate.selectedDate = date;
                dispatch(setBookingDetails(temp));
                // setApiResponseErr(data);
                break;
            case 403:
                if (data.detail === "ERR_login_again_token_expired") {
                    //   toast.error(t("userManagment.error_login_again"));
                    localStorage.clear()
                    navigate('/login')
                }
                setIsLoading(false);
                break
            default:
                setIsLoading(false);
                // setApiResponseErr(statusText);
                break;
        }
    } catch (err) {
        toast.error("Somthing went wrong");
        setIsLoading(false);
    }
    }
    
  useEffect(() => {
    handleGetSlots()
  },[])
  console.log('getValue("selectedDate")', getValues("selectedDate"))
  return (
    <>
     {isLoading ? <MainLoader /> : (
    <div>
      {bookingType !== "Recurring" && (
        <form className="form-root" onSubmit={handleSubmit(handleNext)}>
          <div className="row">
            <div className="col-md-12">
              <div className="select-date-sec">
                <div className="choose-date">
                  <h3>Choose date</h3>
                  <Controller
                    control={control}
                    name="selectedDate"
                    // rules={{
                    //   required: {
                    //     value: true,
                    //     message: t('account.error_language_required'),
                    //   },
                    // }}
                    render={({ field: { onChange, value } }: any) => (
                      <Flatpickr
                        name="selectedDate"
                        className={
                          errors["selectedDate"]
                            ? "c-date-picker error"
                            : "c-date-picker"
                        }
                        
                        onChange={(time: any) => selectTimeChanged(time)}
                        options={{
                          defaultDate: bookingDate?.selectedDate
                            ? new Date(bookingDate?.selectedDate)
                            : null,
                          minDate: "today",
                          enable:DateData,
                          dateFormat: "l,M j, Y",
                        }}
                        onDayCreate= {((dObj:any, dStr:any, fp:any,dayElem:any) =>{
                          // Checking to see if the current day object is in our array
                         // The `+` is just a shortcut for parsing the date
                         DateData.map((item:any)=>{
                          if (new Date(new Date(item).setHours(0,0,0)).toString() == dayElem.dateObj) {  
                            dayElem.className += dayElem.dateObj==new Date()?" today color-date":" color-date";
                          }
                         })
                        
                      })}
                      />
                    )}
                  />
                  <FeildErrorMessage
                    errors={errors}
                    name="selectedDate"
                    containerClass="w-100"
                  />
                </div>
                {/* <div className="choose-date">
                 <h3>Choose end date</h3>
                 <input type="date" name="" />
                 
    
             </div> */}
              </div>
            </div>
            {/* <div className="col-md-12">
         <div className="repeat-every-sec">
             <h3>Repeat every</h3>
               <select className="form-control">
                 <option value="option1">
                   Week</option>
                 <option value="option1">
                   Month</option>
                 <option value="option1">
                   Year</option>
               </select>
    
    
         </div>
        </div>
        <div className="col-md-12">
         <div className="repeat-on-sec">
             <h3>Repeat on</h3>
             <ul className="week-list">
                 <li><span>M</span></li>
                 <li><span>T</span></li>
                 <li><span>W</span></li>
                 <li><span>T</span></li>
                 <li><span>F</span></li>
                 <li><span>S</span></li>
                 <li><span>S</span></li> 
             </ul>
    
         </div>
    
        </div>
        <div className="col-md-12">
         <div className="repeat-every-sec">
             <h3>Repeat every</h3>
               <select className="form-control">
                 <option value="option1">
                   Month</option>
                 <option value="option1">
                   Month</option>
                 <option value="option1">
                   Year</option>
               </select>
    
    
         </div>
        </div>
        <div className="col-md-12">
         <div className="repeat-every-sec">
             <h3>Repeat on</h3>
               <select className="form-control">
                 <option value="option1">
                   First</option>
                 <option value="option1">
                   Second</option>
                 <option value="option1">
                   Third</option>
               </select>
    
              <select className="form-control" style={{ width: "auto"}}>
                 <option value="option1">
                   Tuesday</option>
                 <option value="option1">
                   Friday</option>
                 <option value="option1">
                   Monday</option>
               </select>
    
    
         </div>
          </div> */}

            <div className="btn-section form-btn">
              <button
                className="btn white-btn back-btn"
                onClick={(e) => handlePrev(e)}>
                <img src={images.backarrow} /> Back
              </button>
              <button
                className="btn theme-btn"
                onClick={handleSubmit(handleNext)}>
                Next <img src={images.ForwardArrow} />
              </button>
            </div>
          </div>
        </form>
      )}
      {bookingType === "Recurring" && (
        <form className="form-root" onSubmit={handleSubmit2(handleNext2)}>
          <div className="row">
            <div className="col-md-12">
              <div className="select-date-sec">
                <div className="choose-date">
                  <h3>Choose Start date</h3>
                  <Controller
                    control={control2}
                    name="selectedStartDate"
                    rules={{
                      required: {
                        value: true,
                        message: "Please Select Start Date",
                      },
                    }}
                    render={({ field: { onChange, value } }: any) => (
                      <Flatpickr
                        name="selectedStartDate"
                        className={
                          errors2["selectedStartDate"]
                            ? "c-date-picker error"
                            : "c-date-picker"
                        }
                        onChange={(time: any) => startTimeChanged(time)}
                        options={{
                          defaultDate: new Date(bookingDate?.startDate)
                            ? new Date(bookingDate?.startDate)
                            : "",
                          minDate: "today",
                          enable:DateData,
                          dateFormat: "l,M j, Y",
                        }}
                        onDayCreate= {((dObj:any, dStr:any, fp:any,dayElem:any) =>{
                          // Checking to see if the current day object is in our array
                         // The `+` is just a shortcut for parsing the date
                         DateData.map((item:any)=>{
                          if (new Date(new Date(item).setHours(0,0,0)).toString() == dayElem.dateObj) {  
                            dayElem.className += dayElem.dateObj==new Date()?" today color-date":" color-date";
                          }
                         })
                        
                      })}
                      />
                    )}
                  />
                  <FeildErrorMessage
                    errors={errors2}
                    name="selectedStartDate"
                    containerClass="w-100"
                  />
                </div>
                <div className="choose-date">
                  <h3>Choose end date</h3>
                  <Controller
                    control={control2}
                    name="selectedEndDate"
                    rules={{
                      required: {
                        value: true,
                        message: "Please Select End Date",
                      },
                    }}
                    render={({ field: { onChange, value } }: any) => (
                      <Flatpickr
                        name="selectedEndDate"
                        className={
                          errors2["selectedEndDate"]
                            ? "c-date-picker error"
                            : "c-date-picker"
                        }
                        onChange={(time: any) => endTimeChanged(time)}
                        options={{
                          defaultDate: new Date(bookingDate?.endDate)
                            ? new Date(bookingDate?.endDate)
                            : "",
                          enable:DateData,
                          minDate: new Date(startDate),
                          dateFormat: "l,M j, Y",
                        }}
                        onDayCreate= {((dObj:any, dStr:any, fp:any,dayElem:any) =>{
                          // Checking to see if the current day object is in our array
                         // The `+` is just a shortcut for parsing the date
                         DateData.map((item:any)=>{
                          if (new Date(new Date(item).setHours(0,0,0)).toString() == dayElem.dateObj) {  
                            dayElem.className += dayElem.dateObj==new Date()?" today color-date":" color-date";
                          }
                         })
                        
                      })}
                      />
                    )}
                  />
                  <FeildErrorMessage
                    errors={errors2}
                    name="selectedEndDate"
                    containerClass="w-100"
                  />
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="repeat-every-sec">
                <h3>Repeat every</h3>
                <div>
                  <Controller
                    control={control2}
                    name="repeatedType"
                    rules={{
                      required: {
                        value: true,
                        message: "Repeat type is required",
                      },
                    }}
                    render={({ field: { onChange, value } }: any) => (
                      <Select
                        classNamePrefix="form-control-language"
                        options={repeatEvery}
                        // id="site"
                        name="repeatedType"
                        value={repeatEvery?.find((c: any) => c.value === value)}
                        onChange={(val: any) => {
                          // onChange(val);
                          handleChange(val.value);
                        }}
                        // onChange={(val: any) => onChange(val.value)}
                        
                      />
                    )}
                  />
                  <FeildErrorMessage
                    errors={errors2}
                    name="repeatedType"
                    containerClass="w-100"
                  />
                  {/* <Select
                    classNamePrefix="form-control-header-select"
                    options={repeatEvery}
                    value={selectedRepeatType}
                    onChange={(val: any) => handleChange(val)}
                    // menuIsOpen={true}
                  /> */}
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="repeat-on-sec">
                {selectedRepeatType == "WEEKLY" ? (
                  <>
                    <h3>Repeat on</h3>
                    <ul className="week-list">
                      {dayList.map((item: any) => (
                        <li className="dayname">
                          <Link
                            className={item.active === true ? "active" : ""}
                            onClick={() => handleadddaylist(item)}
                            to="">
                            <span
                              className={item.active === true ? "active" : ""}>
                              {item.label}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <ErrorMessage
                      errMessage={errorWeekDays}
                      containerClass="w-100"
                    />
                  </>
                ) : (
                  <>
                    {selectedRepeatType == "MONTHLY" && (
                      <div className="col-md-12">
                        <div className="repeat-every-sec">
                          <h3>Repeat on</h3>
                          <Controller
                            control={control2}
                            name="repeatedMonthWeekWise"
                            rules={{
                              required: {
                                value: true,
                                message: "Month week is required",
                              },
                            }}
                            render={({ field: { onChange, value } }: any) => (
                              <Select
                                classNamePrefix="form-control-language"
                                options={repeatedOn}
                                // id="site"
                                name="repeatedMonthWeekWise"
                                value={repeatedOn?.find(
                                  (c: any) => c.value === value
                                )}
                                onChange={(val: any) => {
                                  // onChange(val);
                                  handleMonthWeekChange(val.value);
                                }}
                                // onChange={(val: any) => onChange(val.value)}
                              />
                            )}
                          />
                          <FeildErrorMessage
                            errors={errors2}
                            name="repeatedMonthWeekWise"
                            containerClass="w-100"
                          />
                          {/* <Select
                            classNamePrefix="form-control-header-select"
                            options={repeatedOn}
                            
                            value={selectedMonthWiseData}
                            onChange={(val: any) => handleMonthWeekChange(val)}
                            // menuIsOpen={true}
                          /> */}
                          <Controller
                            control={control2}
                            name="repeatedMonthDayWise"
                            rules={{
                              required: {
                                value: true,
                                message: "Month days is required",
                              },
                            }}
                            render={({ field: { onChange, value } }: any) => (
                              <Select
                                classNamePrefix="form-control-language"
                                options={monthDayList}
                                // id="site"
                                name="repeatedMonthDayWise"
                                value={monthDayList?.find(
                                  (c: any) => c.value === value
                                )}
                                onChange={(val: any) => {
                                  // onChange(val);
                                  handleMonthDayChange(val.value);
                                }}
                                // onChange={(val: any) => onChange(val.value)}
                              />
                            )}
                          />
                          <FeildErrorMessage
                            errors={errors2}
                            name="repeatedMonthDayWise"
                            containerClass="w-100"
                          />
                          {/* <Select
                            classNamePrefix="form-control-header-select"
                            options={monthDayList}
                            value={selectedMonthDayWiseData}
                            onChange={(val: any) => handleMonthDayChange(val)}
                            // menuIsOpen={true}
                          /> */}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            <div className="btn-section form-btn">
              <button
                className="btn white-btn back-btn"
                onClick={(e) => handlePrev2(e)}>
                <img src={images.backarrow} /> Back
              </button>
              <button className="btn theme-btn" type="submit">
                Next <img src={images.ForwardArrow} />
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
     )}
    </>
  );
};

export default BookingDate;

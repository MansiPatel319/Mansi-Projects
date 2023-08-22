import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuid } from 'uuid';

import Label from '../../UI/Label'
import ErrorMessage from '../../UI/ErrorMessage'
import images from '../../../Assets/images'
import { constants } from '../../../Library/Constants'
import { getLocalStorage } from '../../../Network/ApiService'
import { getTimeList } from '../../../Network/Core/SiteManagement/availability'
import { setBookingDetails } from '../../../Store/Actions/BookingModule/bookingActionCreator'
import bookingSlotsData from '../../../StaticData/BookingForm/slots'
import { Link } from 'react-router-dom'
import { getSlots, reserveBookingSlot } from '../../../Network/Core/Booking/booking'

const BookingTime = () => {
  const dispatch = useDispatch()
  const user = getLocalStorage(constants.USER);
  const { project } = useParams()
  const { t } = useTranslation()
  const navigate = useNavigate()
  const bookingSteps = useSelector((state: any) => state.booking.bookingSteps)
  const bookingType = useSelector((state: any) => state.booking.bookingType)
  const bookingFileds = getLocalStorage(constants.PROJECT_BOOKING_FILED)
  const [bookingSlots, setBookingSlots] = useState<any>([])
  const [time, setTime] = useState('')
  const [maxDuration, setMaxDuration] = useState<any>()
  const [minDuration, setMinDuration] = useState<any>()
  const [timeListing, setTimeListing] = useState<any>([])
  const [startSlot, setStartSlot] = useState(4)
  const [activatedTimeSlot, setActivatedTimeSlot] = useState<any>({})
  const [getSlotDetails, setGetSlotDetails] = useState<any>()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  console.log('bookingSlots :>> ', bookingSlots);


  const callReserveSlotAPI = async (details: any) => {
    const unique_id = uuid();
    let slot_data_recurringbooking: any = {};
    let slot_data_otherebooking: any = {};
    if (bookingType === "Recurring") {
      slot_data_recurringbooking = {
        access_point: details?.schedulingInformation?.accesspoint,
        vehicle_type: details?.schedulingInformation?.vehicleType,
        resource: details?.schedulingInformation?.resource,
        start_date: details?.bookingDate?.startDate,
        end_date: details?.bookingDate?.endDate,
        start_time: details?.bookingTime?.slots?.slotStart?.id,
        end_time: details?.bookingTime?.slots?.slotEnd?.id,
        booking_type: bookingType.toLowerCase(),
        recurring_code: unique_id,
        repeat_option: details?.bookingDate?.repeatType,

      }
    }
    if (slot_data_recurringbooking.repeat_option === "WEEKLY") {
      slot_data_recurringbooking["repeat_weekday"] = details?.bookingDate?.repeatWeekWise;
    }
    else {
      slot_data_recurringbooking["repeat_weekday"] = details?.bookingDate?.repeatMonthWise?.monthDay;
      slot_data_recurringbooking["repeat_monthly_option"] = details?.bookingDate?.repeatMonthWise?.monthWeek;
    }

    if (bookingType === "Delivery" || bookingType === "Resource-Only" || bookingType === "Multi-Vehicle") {
      slot_data_otherebooking = {
        access_point: details?.schedulingInformation?.accesspoint ? details?.schedulingInformation?.accesspoint : '',
        vehicle_type: details?.schedulingInformation?.vehicleType,
        resource: details?.schedulingInformation?.resource,
        date: details?.bookingDate?.selectedDate,
        start_time: details?.bookingTime?.slots?.slotStart?.id,
        end_time: details?.bookingTime?.slots?.slotEnd?.id,
        booking_type: bookingType.toLowerCase(),
      }
    }
    let object = {
      uuid: unique_id,
      site: details?.schedulingInformation?.site,
      user: user?.id,
      slot_data: bookingType === "Recurring" ? slot_data_recurringbooking : slot_data_otherebooking
    }
    setIsLoading(true);
    try {
      const res = await reserveBookingSlot(project, details?.schedulingInformation?.site, object
      );
      const { status, data, statusText } = res;
      switch (status) {
        case 201:
          let temp = [...bookingSteps]
          const SelectedDataIndex = temp.findIndex((bookingStepItem: any) => bookingStepItem.name === bookingType)
          temp[SelectedDataIndex].data.bookingSlotDetail = data;
          temp[SelectedDataIndex].stepCount = 4
          dispatch(setBookingDetails(temp))
          setGetSlotDetails(data);
          setIsLoading(false);
          break;
        case 400:
          setIsLoading(false);
          toast.error(t(data.error[0]))
          // setApiResponseErr(data);
          break;
        case 401:
          localStorage.clear();
          navigate('/login')
          setIsLoading(false);
          break;
        case 403:
          setIsLoading(false);
          if (data.detail === "ERR_login_again_token_expired") {
            toast.error(t("userManagment.error_login_again"));
            localStorage.clear()
            navigate('/login')
          }

          break
        case 500:
          toast.error(t('Somthing went wrong '))
          break;
        default:
          setIsLoading(false);
          // setApiResponseErr(statusText);
          break;
      }
    } catch (err) {
      setIsLoading(false);
      toast.error("Somthing went wrong");
    }
  }
  console.log('activatedTimeSlot :>> ', activatedTimeSlot);
  const handleNext = (e: any) => {
    e.preventDefault()
    if (activatedTimeSlot) {

      let temp = [...bookingSteps]
      const SelectedDataIndex = temp.findIndex((bookingStepItem: any) => bookingStepItem.name === bookingType)
      temp[SelectedDataIndex].stepCount = 4
      temp[SelectedDataIndex].data.bookingTime = {
        time: time,
        slots: activatedTimeSlot
      }
      callReserveSlotAPI(temp[SelectedDataIndex]?.data);
      // temp[SelectedDataIndex].data.bookingTime = time
      dispatch(setBookingDetails(temp))
    }
    else {
      setError("Please Select Time slot")
    }

  }
  const handlePrev = (e: any) => {

    e.preventDefault();
    let temp = [...bookingSteps]
    const SelectedDataIndex = temp.findIndex((bookingStepItem: any) => bookingStepItem.name === bookingType)
    temp[SelectedDataIndex].stepCount = 2
    temp[SelectedDataIndex].data.bookingTime = {
      time: time,
      slots: activatedTimeSlot
    }
    dispatch(setBookingDetails(temp))

  }
  const getTimeListing = async () => {
    try {
      const res: any = await getTimeList(project);
      const { status, data } = res;
      switch (status) {
        case 200:
          const timeListing = data.results.map((item: any) => {
            if (item.time.split(":")[0] === "00") {
              item.timeString = parseInt(item.time.split(":")[1]) + " Minute ",
                item.value = item.id
              return item
            }
            else if (item.time.split(":")[1] === "00") {
              item.timeString = parseInt(item.time.split(":")[0]) + " Hour ",
                item.value = item.id
              return item
            }
            else {
              item.timeString = parseInt(item.time.split(":")[0]) + " Hour " + parseInt(item.time.split(":")[1]) + " Minute ",
                item.value = item.id
              return item
            }
          })
          setMinDuration(timeListing.find((item: any) => item.id === bookingFileds.durations[0].minDuration))
          setMaxDuration(timeListing.find((item: any) => item.id === bookingFileds.durations[0].maxDuration))
          let temp = [...bookingSteps]
          const SelectedDataIndex = temp && temp?.findIndex((bookingStepItem: any) => bookingStepItem.name === bookingType)
          let bookingTimeData = temp[SelectedDataIndex]?.data?.bookingTime
          if (!bookingTimeData) {

            setTime(timeListing.find((item: any) => item.id === bookingFileds.durations[0].minDuration).time)
            setActivatedTimeSlot('')
          }
          else {
            if (bookingTimeData?.slots) {

              setActivatedTimeSlot(bookingTimeData.slots)
            }
          }
          setTimeListing(timeListing)
          break;
        case 400:
          break;
        case 403:
          if (data.detail === "ERR_login_again_token_expired") {
            toast.error(t("userManagment.error_login_again"));
            localStorage.clear()
            navigate('/login')
          }

          break;
        default:
          break;
      }

    } catch (err) {
      console.log('here getting errors');

      // toast.error(t("userManagment.error_something_went_wrong"));
    }
  }

  const handleChangeTime = (e: any, op: string) => {
    e.preventDefault()
    const timeIndex = op === 'add' ? timeListing.findIndex((item: any) => item.time === time) + 1 : timeListing.findIndex((item: any) => item.time === time) - 1
    const minTimeIndex = timeListing.findIndex((item: any) => item.time === minDuration.time)
    const maxTimeIndex = timeListing.findIndex((item: any) => item.time === maxDuration.time)
    if (timeIndex >= minTimeIndex && timeIndex <= maxTimeIndex) {
      setTime(timeListing[timeIndex].time)
    }
  }
  const onClickSlot = (selectedSlot: any) => {
    console.log('selectedSlot', selectedSlot);
    setError('')
    setActivatedTimeSlot(selectedSlot)
  }

  console.log('activatedTimeSlot', activatedTimeSlot);
  useEffect(() => {


    if (activatedTimeSlot.slotStart) {
      let activatedData: any = []
      if (Object.keys(activatedTimeSlot).length > 0) {
        const slot = getGreetingTime(activatedTimeSlot?.slotStart.time, activatedTimeSlot?.slotEnd.time)
        console.log('slot', slot);
        activatedData = [{ [slot]: [activatedTimeSlot] }]
      }
      const tempBookingSlots = [...bookingSlots]
      const updatedBookingSlots = tempBookingSlots && tempBookingSlots.map((bookingSlotsItem: any) => {
        Object.entries(bookingSlotsItem).map((values: any) => {
          values && values.length > 1 && values[1]?.map((slots: any) => {
            if (activatedTimeSlot !== '') {
              if (activatedTimeSlot?.slotStart?.id === slots.slotStart?.id) {
                slots.isActive = true
              }
              else {
                slots.isActive = false
              }
            }
            else {
              slots.isActive = false
            }

            return slots
          })
          return values[1]
        }
        )
        return bookingSlotsItem
      })
      updatedBookingSlots.concat(activatedData)
      setBookingSlots(updatedBookingSlots)
    }


  }, [JSON.stringify(activatedTimeSlot), JSON.stringify(bookingSlots)])
  useEffect(() => {
    if (bookingFileds.durations.length > 0) {
      getTimeListing()
    }

  }, [JSON.stringify(bookingFileds)]);


  useEffect(() => {
    let temp = [...bookingSteps]
    const SelectedDataIndex = temp && temp?.findIndex((bookingStepItem: any) => bookingStepItem.name === bookingType)
    let bookingTimeData = temp[SelectedDataIndex]?.data?.bookingTime?.time
    setTime(bookingTimeData)

  }, [JSON.stringify(bookingSteps)]);
  const getGreetingTime = (startTime: any, endTime: any) => {

    let s = startTime?.split(":")
    let e = endTime?.split(":")

    const start1: any = new Date();
    const end1: any = new Date();

    start1.setHours(parseInt(s[0]), parseInt(s[1]), 0); //8 AM
    end1.setHours(parseInt(e[0]), parseInt(e[1]), 0); //8 AM
    // if (!currentTime || !currentTime.isValid()) { return 'Hello'; }

    const splitAfternoon = 12; // 24hr time to split the afternoon
    const splitEvening = 17; // 24hr time to split the evening
    const startHour = start1.getHours();
    const endHour = end1.getHours();
    // console.log('currentTime :>> ', startHour);
    // console.log('endHour :>> ', endHour);
    // console.log('splitEvening :>> ', splitEvening);
    if (startHour >= splitAfternoon && startHour <= splitEvening) {
      return 'Afternoon';
    } else if (startHour >= splitEvening && endHour <= 24) {
      return 'Evening';
    }
    else {
      return 'Morning';
    }
  }
  const addMoreSlot = () => {
    setStartSlot(startSlot + 4)
  }
  const handleGetSlots = async () => {

    let temp = [...bookingSteps]
    const SelectedDataIndex = temp.findIndex((bookingStepItem: any) => bookingStepItem.name === bookingType)
    const params = temp[SelectedDataIndex].data
    let paramsdata: Array<any> = []
    if (bookingType === "Delivery" || bookingType === "Multi-Vehicle") {
      paramsdata = [

        { booking_type: bookingType.toLowerCase() },
        { access_point: params?.schedulingInformation?.accesspoint },
        { date: params?.bookingDate?.selectedDate },
        { duration: time?.substring(0, 5) },
        { project: project },
        { resource: params?.schedulingInformation?.resource },
        { site_id: params.schedulingInformation.site },


      ]
    }
    else if (bookingType === "Resource-Only") {

      paramsdata = [

        { booking_type: bookingType.toLowerCase() },
        { date: params?.bookingDate?.selectedDate },
        { duration: time?.substring(0, 5) },
        { project: project },
        { resource: params?.schedulingInformation?.resource },
        { site_id: params.schedulingInformation.site },


      ]

    }
    else if (bookingType === "Recurring") {
      paramsdata = [

        { booking_type: bookingType.toLowerCase() },
        { access_point: params?.schedulingInformation?.accesspoint },
        { start_date: params?.bookingDate?.startDate },
        { end_date: params?.bookingDate?.endDate },
        { duration: time?.substring(0, 5) },
        { project: project },
        { resource: params?.schedulingInformation?.resource },
        { site_id: params?.schedulingInformation.site },
        { repeat_option: params?.bookingDate?.repeatType },

      ]
      if (params?.bookingDate?.repeatType === "WEEKLY") {
        paramsdata = [
          { repeat_weekday: params?.bookingDate?.repeatWeekWise },
          ...paramsdata
        ]
      }
      else {
        paramsdata = [
          { repeat_monthly_option: params?.bookingDate?.repeatMonthWise?.monthWeek },
          { repeat_weekday: params?.bookingDate?.repeatMonthWise?.monthDay },
          ...paramsdata
        ]
      }
    }

    let paramsString: string = ""
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
          setToSlotWiseTime(data)

          break;
        case 400:
          toast.error(data.error)
          setIsLoading(false);
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
    }
  }
  const setToSlotWiseTime = (bookingSlotsData: any) => {
    console.log('bookingSlotsData :>> ', bookingSlotsData);
    const slotWiseTiming: any = [
      { 'Morning': [] },
      { 'Afternoon': [] },
      { 'Evening': [] }
    ]
    console.log('bookingSlotsData :>> ', bookingSlotsData);
    bookingSlotsData && bookingSlotsData?.map((bookingSlotItem: any) => {
      const slot = getGreetingTime(bookingSlotItem.slotStart.time, bookingSlotItem.slotEnd.time)
      slotWiseTiming.forEach((item: any) => { if (bookingSlotItem.isAvailable) { item[slot]?.push(bookingSlotItem) } })

    })
    console.log('slotWiseTiming :>> ', slotWiseTiming);
    setBookingSlots(slotWiseTiming)
  }

  useEffect(() => {
    handleGetSlots()
  }, [activatedTimeSlot]);

  console.log('bookingSlots :>> ', bookingSlots);
  return (
    <div className="row">
      <div className="col-lg-12 col-xl-8 col-md-12">
        <div className="step-from">

          <div className="form-group duration">
            <Label label="Duration (hrs)" />
            <div className="row">
              <div className="col-lg-3 col-xl-3 col-md-3">
                <div className="duration-time-block">
                  <h2>{time?.substring(0, 5)}</h2>
                  <span className="hours-minute">
                    <span>Hours</span>
                    <span>Minutes</span>
                  </span>

                </div>

              </div>
              <div className="col-lg-6 col-xl-6 col-md-6 d-flex align-items-center pl-mn-block">
                <div className="plus-minus">
                  <button className="cntrl-btn minus-img" type="button" onClick={(e) => handleChangeTime(e, 'sub')}>
                    <img src={images.minusIcon} />
                  </button>
                  <button className="cntrl-btn plus-img" type="button" onClick={(e) => handleChangeTime(e, 'add')}>
                    <img src={images.plusIconGrey} />
                  </button>
                </div>
                <div className="booking-time d-flex flex-column">
                  <span>Minimum {minDuration?.timeString} booking</span>
                  <span>Maximum {maxDuration?.timeString} booking</span>
                </div>

              </div>
              <div className="col-lg-3 col-xl-3 col-md-12 more-slot">
                <button className="btn theme-btn" onClick={(e) => handleGetSlots()}>
                  Get Slots
                </button>
              </div>

            </div>
          </div>
          <div className="time-slots">
            <h4>Book which time on {bookingSteps && bookingSteps.length > 0 && new Date(bookingSteps?.find((bookingStepItem: any) => bookingStepItem.name === bookingType)?.data?.bookingDate).toDateString()}</h4>
            <div className="row">

              {
                bookingSlots && bookingSlots.length > 0 && bookingSlots?.map((bookingSlotItem: any, index: number) =>

                  <div className="col-md-4">
                    {Object.values(bookingSlotItem).length > 0 &&
                      <span className="slot-title">
                        {Object.keys(bookingSlotItem)}
                      </span>
                    }
                  </div>
                )}
            </div>
            <div className="row">
              {


                bookingSlots && bookingSlots.length > 0 && bookingSlots?.map((bookingSlotItem: any, index: number) =>
                  Object.entries(bookingSlotItem).map(([key, value]: any, i) =>

                    <div className="row col-md-4 flex-column" >
                      {value && value.length > 0 && value.slice(0, startSlot)?.map((item: any) =>

                        <span className={item?.isActive ? "slot slot-active" : "slot"} onClick={() => onClickSlot(item)}>
                          {item?.slotStart?.time}-{item?.slotEnd?.time}
                        </span>
                      )}
                    </div>

                  )

                )


              }

            </div>
            {bookingSlots && bookingSlots.length && startSlot * 3 < bookingSlotsData.length &&
              <div className="more-slot">
                <Link to="#" onClick={() => addMoreSlot()}>Show more time slots</Link>
              </div>
            }
          </div>
          <ErrorMessage
            errMessage={error}
            containerClass="w-100"
          />
          <div className="btn-section form-btn">
            <button className="btn white-btn back-btn" onClick={(e) => handlePrev(e)}>
              <img src={images.backarrow} /> Back
            </button>
            <button className="btn theme-btn" disabled={!bookingSlots || bookingSlots.length === 0} onClick={(e) => handleNext(e)}>
              Next <img src={images.ForwardArrow} />
            </button>
          </div>


        </div>
      </div>

    </div>
  )
}

export default BookingTime
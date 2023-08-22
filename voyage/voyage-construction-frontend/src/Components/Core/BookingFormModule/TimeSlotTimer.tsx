import React,{useEffect,useState} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { setBookingDetails } from '../../../Store/Actions/BookingModule/bookingActionCreator'
import "./style.css";
import "../../../Assets/css/customize.css"
const TimeSlotTimer = () => {
    const bookingSteps = useSelector((state: any) => state.booking.bookingSteps)
    const bookingType = useSelector((state: any) => state.booking.bookingType)

    let temp = [...bookingSteps]
    const SelectedDataIndex = temp.findIndex(
        (bookingDataItem:any) => bookingDataItem.name === bookingType
    )
    const time = temp[SelectedDataIndex].data.timer
    const [timer, setTimer] = useState(0)
    const [showTimer, setShowTimer] = useState(true)
    const [startTimer, setStartTimer] = useState(false)
    const [timeFormat, setTimeFormat] = useState('')
    const dispatch = useDispatch()
    const tick = () => {

        if (timer === 1){
            setShowTimer(false)
            setTimer(prevTimer => showTimer?prevTimer-1:prevTimer)
            
            return true
        }
        setTimer(prevTimer => showTimer?prevTimer-1:prevTimer)
        let temp = [...bookingSteps]
        const SelectedDataIndex = temp.findIndex(
            (BookingStepItem:any) => BookingStepItem.name === bookingType
        )
        temp[SelectedDataIndex].data.timer = timer
        dispatch(setBookingDetails(temp))
    }
    useEffect(() => {
        let temp = [...bookingSteps]
        const SelectedDataIndex = temp.findIndex(
            (BookingStepItem:any) => BookingStepItem.name === bookingType
            )
        setTimer(temp[SelectedDataIndex].data.timer)
    },[])
    useEffect(
        () => {
            const interval = setInterval(tick,1000)
            convetTime(timer)
            return () => {
                clearInterval(interval)
            }
        },[timer]
    )

    const convetTime = (sec:number) => {
        let time = new Date(sec * 1000).toISOString().substr(14, 5)
        setTimeFormat(time)
    }

    const RedirectToTimeSlot = () => {
        let temp = [...bookingSteps]
        const SelectedDataIndex = temp.findIndex(
            (BookingStepItem:any) => BookingStepItem.name === bookingType
        )
        setShowTimer(false)
        
        temp[SelectedDataIndex].data.timer = 600
        temp[SelectedDataIndex].stepCount = 3
        temp[SelectedDataIndex].data.bookingTime = ""
        dispatch(setBookingDetails(temp))
    }

  return (
        <div  className='col-md-12'>
            <div className={`time-out-bar ${!showTimer&&'error'}`}>
                <p className='time-left-element'>Time left to complete booking:<span className='time-format'>{timeFormat}</span></p>
                {!showTimer&&<p><b className='error-text' onClick={()=>RedirectToTimeSlot()} >Reselect Timeslot</b></p>}
            </div>
        </div>
  )
}

export default TimeSlotTimer
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import images from '../../../Assets/images'
import { setBookingDetails } from '../../../Store/Actions/BookingModule/bookingActionCreator';

const BookingCreated = () => {
    const bookingSteps = useSelector((state: any) => state.booking.bookingSteps)
    const bookingType = useSelector((state: any) => state.booking.bookingType)
    const SelectedDataIndex = bookingSteps.findIndex((bookingStepItem: any) => bookingStepItem.name === bookingType)
    const bookingCreationData = bookingSteps[SelectedDataIndex].data.bookingCreationData

    const dispatch = useDispatch()
    const handlePrev = (e: any) => {

        e.preventDefault();
        let temp = [...bookingSteps]
        const SelectedDataIndex = temp.findIndex((bookingStepItem: any) => bookingStepItem.name === bookingType)
        temp[SelectedDataIndex].stepCount = 4
    
        dispatch(setBookingDetails(temp))
    
      }
      const RedirectToTimeSlot = () => {
        let temp = [...bookingSteps]
        const SelectedDataIndex = temp.findIndex(
            (BookingStepItem:any) => BookingStepItem.name === bookingType
        )
        temp[SelectedDataIndex].stepCount = 1
        dispatch(setBookingDetails(temp))
    }

  return (
   <>

        <div className="submit-booking-sec">
            <div className="b_head">
          <img src={images.completedStep} />
                <h3>Booking Complete</h3>
            </div>
              <p className="middle-text">Thank you for booking your delivery into <strong>{ bookingCreationData.contact.companyName}</strong>. Please note your delivery is yet to be confirmed and is subject to approval by the Site Supervisor. You will shortly be notified of your delivery confirmation by email, however, if you do not receive a confirmation or have not been notified by the time your delivery is scheduled, it will be deemed approved and delivery is confirmed for your requested time.</p>
            <div className="sub-text">
                <strong>Please take note of the following site rules:</strong><br/>
                - PPE is to be worn at all times while on site<br/>
                - Vehicles will not be allowed into the the site if contractors do not have a high visibility vests<br/>
                - Priority will be given to vehicles arriving on time for their allotted slot
            </div>
            <div className="id_box">
                <h4 className="">Booking ID:</h4>
                  <p>{ bookingCreationData.ref}</p>
            </div>
        </div>
    <div className="btn-section form-btn">
            <button className="btn white-btn back-btn"  >
                See Booking Details 
            </button>
            <button className="btn theme-btn" >
                Return To Booking List
            </button>
        </div>
 
  </>
  )
}

export default BookingCreated
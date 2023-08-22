import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ErrorMessage from "../../UI/ErrorMessage"
import images from '../../../Assets/images';
import { setBookingDetails, setBookingType } from '../../../Store/Actions/BookingModule/bookingActionCreator';
import { getLocalStorage } from '../../../Network/ApiService';
import { constants } from '../../../Library/Constants';

export interface bookingTypeProps {

}

const BookingTypeSelect = () => {
  const dispatch = useDispatch()
  const bookingSteps = useSelector((state: any) => state.booking.bookingSteps)
  const bookingType = useSelector((state: any) => state.booking.bookingType)
  const projectSetting = getLocalStorage(constants.PROJECT_SETTING)

  const [numberOfVehicle, setNumberOfVehicle] = useState(1)
  const [error, setError] = useState('')
  const handleSelectType = (bookingType: string) => {
    setError("")
    dispatch(setBookingType(bookingType))
  }
  const handleNext = () => {
    if (bookingType) {

      let temp = [...bookingSteps]
      const SelectedDataIndex = temp.findIndex((bookingStepItem: any) => bookingStepItem.name === bookingType)
      temp[SelectedDataIndex].stepCount = 1
      temp[SelectedDataIndex].data.numberOfVehicle = numberOfVehicle
      dispatch(setBookingDetails(temp))
    }
    else {
      setError("Please Select Type of Booking")
    }
  }
  const updateNumberOfVehicle = (key: string) => {
    if (key === 'sub') {
      if (numberOfVehicle > 1) {

        setNumberOfVehicle(numberOfVehicle - 1)
      }
    }
    else {
      setNumberOfVehicle(numberOfVehicle + 1)
    }

  }
  useEffect(() => {
    let temp = [...bookingSteps]
    if (temp.length > 0 && projectSetting.length > 0) {
      const SelectedDataIndex = temp.map((bookingStepItem: any) => {
        if (bookingStepItem.name === 'Multi-Vehicle') {
          if (projectSetting?.find((item: any) => item.key === 'ENABLE_MULTIPLE_CHECKINS_ON_BOOKING').value) {
            bookingStepItem.isActive = true
          }
          else {
            bookingStepItem.isActive = false
          }
        }
        else if (bookingStepItem.name === 'Resource-Only') {
          if (projectSetting?.find((item: any) => item.key === 'ENABLE_RESOURCE_ONLY_BOOKING').value) {
            bookingStepItem.isActive = true
          }
          else {
            bookingStepItem.isActive = false
          }
        }
        else if (bookingStepItem.name === 'Recurring') {
          if (projectSetting?.find((item: any) => item.key === 'ENABLE_RECURRING_BOOKING').value) {
            bookingStepItem.isActive = true
          }
          else {
            bookingStepItem.isActive = false
          }
        }
        return bookingStepItem
      }
      )
      dispatch(setBookingDetails(SelectedDataIndex))
    }

    // setIsResourceActive(projectSetting?.find((item:any)=>item.key==="ENABLE_RESOURCE_ONLY_BOOKING").value)
  }, [JSON.stringify(projectSetting)]);
  return (
    <div className="boking-type-sec">
      <h2>What kind of booking do you want to make?</h2>
      <div className="row align-items-center step1row">
        {bookingSteps.map((bookingStepItem: any) =>
          (bookingStepItem.name === 'Delivery' || bookingStepItem.isActive) && <div className="col-xl-3 col-lg-4 col-md-6">
            <div className="book-type-block">
              <div className={` book-type-img ${bookingType === bookingStepItem.name && 'active'}`} onClick={() => handleSelectType(bookingStepItem.name)}>
                <img src={bookingStepItem.image} />
              </div>
              <div className="book-type-text">
                <h4>
                  {bookingStepItem.name}{" "}
                  <span
                  ><img
                      src={images.alertInfo}
                      alt=""
                    /></span>
                </h4>
                <div className="showbox-on-hover">
                  <p>

                    {bookingStepItem.detail}
                  </p>
                </div>


              </div>

            </div>
          </div>
        )}

      </div>
      {bookingType === "Multi-Vehicle"
        && <div className="minus-plus-block">
          <h2>Expected number of vehicles</h2>
          <div className="row align-items-center step1row">
            <div className="col-xl-12 col-lg-12 col-md-12">
              <div className="minus-plus-content-block">
                <span onClick={() => updateNumberOfVehicle("sub")}
                ><img
                    src={images.minusGreen}
                    alt=""
                  /></span>
                <h4>{numberOfVehicle}</h4>
                <span onClick={() => updateNumberOfVehicle("add")}
                ><img
                    src={images.plusGreen}
                    alt=""
                  /></span>

              </div>
            </div>

          </div>

        </div>
      }


      <ErrorMessage
        errMessage={error}
        containerClass="w-100"
      />
      <div className="btn-section next-btn">
        <button className="btn theme-btn" onClick={() => handleNext()} >
          Next <img src={images.ForwardArrow} />
        </button>
      </div>
    </div>

  );
}

export default BookingTypeSelect;

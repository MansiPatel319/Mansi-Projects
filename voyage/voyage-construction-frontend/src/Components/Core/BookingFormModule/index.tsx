import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import "../../../Assets/css/new-updated.css"
import images from '../../../Assets/images';
import BookingDate from './BookingDate';
import BookingTime from './BookingTime';
import BookingDetails from "./BookingDetails";
import BookingTypeSelect from './BookingTypeSelect';
import SchedulingInformation from './SchedulingInformation';
import AdditionalDetails from './AdditionalDetails';
import BookingCreated from './BookingCreated';
import { getProjectSettingList } from '../../../Network/Core/Booking/booking';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router';
import { constants } from '../../../Library/Constants';
import { setLocalStorage } from '../../../Network/ApiService';

const index = () => {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const bookingSteps = useSelector((state: any) => state.booking.bookingSteps)
  const bookingType = useSelector((state: any) => state.booking.bookingType)
  const [selectedTabs, setSelectedTabs] = useState([])
  const [SelectedDataIndex, setSelectedDataIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true);
  const { project } = useParams()

  useEffect(() => {
    if (bookingType && bookingSteps && bookingSteps.length) {
      const SelectedDataIndex = bookingSteps?.findIndex((bookingStepItem: any) => bookingStepItem.name === bookingType)
      setSelectedTabs(bookingSteps[SelectedDataIndex]?.information)
      setStep(bookingSteps[SelectedDataIndex]?.stepCount)
      setSelectedDataIndex(SelectedDataIndex)
    }
  }, [bookingSteps]);
  const getProjectSetting = async () => {
    try {
      setIsLoading(true);
      const res = await getProjectSettingList(project);
      const { status, data } = res;
      switch (status) {
        case 200:
          setIsLoading(false);
          setLocalStorage(constants.PROJECT_SETTING, JSON.stringify(data.results));

          break;
        case 400:
          setIsLoading(false);
          break;
        case 403:
          if (data.detail === "ERR_login_again_token_expired") {
            toast.error("Token expire login again");
            localStorage.clear();
            navigate("/login");
          }
          setIsLoading(false);
          break;
        default:
          break;
      }
    } catch (err) {
      setIsLoading(false);
      // toast.error(t("userManagment.error_something_went_wrong"));
    }
  };
  useEffect(() => {
    getProjectSetting()
  }, []);
  console.log('SelectedDataIndex :>> ', SelectedDataIndex);
  return (
    <div className="page-wrapper">
      <div className="page-header">
        <h3 className="page-title">New Booking</h3>

      </div>
      {/* <!-- page header title section end--> */}

      <div className="page-content">
        {step !== 0 && step !== 6 && (
          <div className="steps-list">
            {selectedTabs?.map((item, index) => {
              const isItemActive = item === bookingSteps[SelectedDataIndex]?.information[step - 1]
              const isItemCompleted = index < selectedTabs.findIndex((tab) => tab === bookingSteps[SelectedDataIndex]?.information[step - 1])

              return <div className={isItemActive ? "steps active" : isItemCompleted ? "steps completed" : "steps"}>

                <div className="line"></div>
                <div className="step-title">
                  {isItemCompleted ? (
                    <img src={images.completedStep}></img>
                  ) : (

                    <span className="circle"></span>
                  )}
                  <span className="s-title">{item}</span>
                </div>
              </div>
            }
            )}


          </div>
        )}

        {/* <!-- booking-type section  --> */}
        {step === 0 &&
          <BookingTypeSelect />


        }
        {step === 1 &&
          <SchedulingInformation />

        }
        {step === 2 &&
          <BookingDate />

        }
        {step === 3 &&
          <BookingTime />

        }
        {step === 4 &&
          <BookingDetails />

        }
        {step === 5 &&
          <AdditionalDetails />

        }
        {step === 6 &&
          <BookingCreated />

        }
      </div>
    </div>
  );
}

export default index;

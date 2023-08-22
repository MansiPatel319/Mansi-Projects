import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { useNavigate, useParams } from 'react-router'
import toast from 'react-hot-toast'
import { v4 as uuid } from 'uuid';

import FeildErrorMessage from "../../UI/FeildErrorMessage"
import Input from "../../UI/Input"
import Button from "../../UI/Button"
import { Link } from 'react-router-dom';
import images from '../../../Assets/images';
import { getLocalStorage } from '../../../Network/ApiService'
import { constants } from '../../../Library/Constants';
import TimeSlotTimer from './TimeSlotTimer';
import { setBookingDetails } from '../../../Store/Actions/BookingModule/bookingActionCreator';
import { useDispatch, useSelector } from 'react-redux';
import { createBooking, reserveBookingSlot } from '../../../Network/Core/Booking/booking';


const AdditionalDetails = () => {

  const FILED_TYPE: any = [
    {
      label: "Free Text",
      value: 1,
    },
    {
      label: "Selection",
      value: 2,
    },
    {
      label: "File Upload",
      value: 3,
    },
    {
      label: "Checkbox",
      value: 4,
    },
  ];
  const [flexibleFields, setFlexibleFields] = useState<any>([]);
  const { project } = useParams()
  const userdata = getLocalStorage(constants.USER);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const bookingSteps = useSelector((state: any) => state.booking.bookingSteps)
  const bookingType = useSelector((state: any) => state.booking.bookingType)
  const bookingFileds = getLocalStorage(constants.PROJECT_BOOKING_FILED)
  const {
    register, // this use for evnets and value
    handleSubmit, // this is form submit handle
    setError,
    getValues,
    clearErrors,
    control,
    setValue,

    formState: { errors },
  } = useForm();


  const callCreateBooking = async(details:any) => {
    let object:any={
      uuid:details?.bookingSlotDetail?.uuid,
      booking_type:bookingType?.toLowerCase(),
          site:details?.schedulingInformation?.site,
          slot:details?.bookingSlotDetail?.slot?.id,
          contact: {
            site:details?.schedulingInformation?.site,
            company_name: details?.bookingDetail?.company_name,
            email: details?.bookingDetail?.email,
            name: details?.bookingDetail?.name,
            position: '',
            phone: details?.bookingDetail?.phone,
          },
          comment: details?.additionalDetail?.comments,
          // number_of_vehicles:details.numberOfVehicle ,
          // creator: userdata?.id,
          flexible_answers: details?.additionalDetail?.flexibleFieldData
    }
  if(bookingType==='Multi-Vehicle'){
    object["number_of_vehicles"]= details?.numberOfVehicle?details?.numberOfVehicle:'';
  }
    
    try {
      const res = await createBooking(project,details?.schedulingInformation?.site,object
          );
      const { status, data, statusText } = res;
      switch (status) {
        case 201:
          let temp = [...bookingSteps]
          const SelectedDataIndex = temp.findIndex((bookingStepItem: any) => bookingStepItem.name === bookingType)
          temp[SelectedDataIndex].stepCount = 6
          temp[SelectedDataIndex].data.bookingCreationData = data
          dispatch(setBookingDetails(temp))
          break;
        case 400:
          toast.error(data[Object.keys(data)[0]][0])
          // setApiResponseErr(data);
          break;
        case 401:                
          localStorage.clear();
          navigate('/login') 
          // setIsLoading(false);
          break;  
        case 403:
            if (data.detail === "ERR_login_again_token_expired") {
              toast.error("error_login_again");
              localStorage.clear()
              navigate('/login')
            }

            break
        default:
          // setApiResponseErr(statusText);
          break;
      }
    } catch (err) {
      console.warn(err);
      alert(23)
      toast.error("Somthing went wrong");
    }
  }


  const handleNext = (data: any) => {
    console.log('data :>> ', data);
    let temp = [...bookingSteps]
    const SelectedDataIndex = temp.findIndex((bookingStepItem: any) => bookingStepItem.name === bookingType)
    // temp[SelectedDataIndex].stepCount = 6
    const flexibleFieldData: any = []
    Object.entries(data).map(([key, value]) => {
      if (key !== 'comments') {
        let objKey = key.split(" ")[key.split(" ").length - 1] // "text 1" =>"1"
        let objValue = value
        flexibleFieldData.push({ [objKey]: objValue })

      }
    }
    )
    const additionalFieldData = {
      flexibleFieldData: flexibleFieldData,
      comments: data.comments
    }
    
    temp[SelectedDataIndex].data.additionalDetail = additionalFieldData
    callCreateBooking(temp[SelectedDataIndex]?.data);
    // temp[SelectedDataIndex].data.bookingTime = time
    dispatch(setBookingDetails(temp))

  }
  const handlePrev = (e: any) => {

    e.preventDefault();
    let temp = [...bookingSteps]
    const SelectedDataIndex = temp.findIndex((bookingStepItem: any) => bookingStepItem.name === bookingType)
    temp[SelectedDataIndex].stepCount = 4

    dispatch(setBookingDetails(temp))

  }
  const handleChangeCheckbox = (e: any, name: string, index: number) => {
    const temp: any = [...flexibleFields]
    temp[index].checkbox = e.target.checked
    // setFlexibleFields(temp)
    setValue(name, e.target.checked)
    clearErrors(name)
  }
  useEffect(() => {

    // bookingFileds?.flexibleFields?.map((item: any) => item.isActive)
    let tempFieldType: any = []
    bookingFileds?.flexibleFields?.map((item: any) => {
      // let obj:any ={}
      if (item.isActive) {
      
        item.flexibleTypeValue = FILED_TYPE.find((filedTypeItem: any) => filedTypeItem.value === item.fieldType).label
        if (item.flexibleTypeValue === 'Selection') {
          item.options = item.answers.map((item: any) => {
            item.label = item.value,
              item.value = item.id
            return item
          })
        }
        tempFieldType.push(item)
      }

      // return obj


    }
    )
    setFlexibleFields(tempFieldType.slice(1, tempFieldType.length))
  }, [JSON.stringify(bookingFileds)]);
  useEffect(() => {
    let temp = [...bookingSteps]
    const SelectedDataIndex = temp.findIndex((bookingStepItem: any) => bookingStepItem.name === bookingType)
    setButtonDisabled(temp[SelectedDataIndex].data.timer === 0)
    const additionalDetail = temp[SelectedDataIndex].data.additionalDetail
    additionalDetail?.flexibleFieldData?.map((flexibleItem: any) => {

      flexibleFields?.map((item: any) => {
        if (item.id == Object.keys(flexibleItem)[0]) {
          if (item.fieldType === 3) {
            const dom: any = document.getElementsByName(item.title + " " + item.id)
            dom.files = Object.values(flexibleItem)[0];
          }
          else {

            setValue(item.title + " " + item.id, Object.values(flexibleItem)[0])
          }
        }
      })

    })
    setValue("comments", additionalDetail.comments)
  }, [JSON.stringify(flexibleFields)]);

  return (
    <div className="row">
      <TimeSlotTimer></TimeSlotTimer>
      <div className="col-md-6">

        <div className="additional-detl-from">
          <form>
            <div className="add-detl-sec">
              {flexibleFields?.map((item: any, index: number) =>
                <div className="vehicle-form">
                  <h3>{item.title}</h3>
                  {item.flexibleTypeValue === 'Selection' && (
                    <div className="form-group">
                      <label>{item.question} - Selector*</label>

                      <Controller
                        control={control}
                        name={item.title + " " + item.id}
                        rules={{
                          required: {
                            value: item.mandatory,
                            message: "Select Options",
                          },
                        }}
                        render={({
                          field: { onChange, value, name, ref },
                        }: any) => (
                          <Select
                            // inputRef={ref}
                            classNamePrefix="form-control-language"
                            // defaultValue={selectedcalenderDaysList[0].value}
                            options={item.options}
                            name={item.title + " " + item.id}
                            value={item.options?.find(
                              (c: any) => c?.value === value
                            )}
                            onChange={(val: any) => onChange(val.value)}
                          // menuIsOpen
                          />
                        )}
                      />
                      <FeildErrorMessage
                        errors={errors}
                        name={item.title + " " + item.id}
                        containerClass="w-100"
                      />

                    </div>
                  )}
                  {item.flexibleTypeValue === 'Free Text' && (
                    <div className="form-group">
                      <label>{item.question}- Input*</label>
                      <Input
                        inputName={item.title + " " + item.id}
                        className={
                          errors[item.title + " " + item.id]
                            ? "form-control error"
                            : "form-control"
                        }
                        register={register}
                        rules={{
                          required: {
                            value: item.mandatory,
                            message: "Text Field is Required",
                          },
                          // onChange: (e: any) => onChange(e),
                        }}
                        id={`text` + index}
                        inputType="text"
                      />
                      <FeildErrorMessage
                        errors={errors}
                        name={item.title + " " + item.id}
                        containerClass="w-100"
                      />
                    </div>
                  )}
                  {item.flexibleTypeValue === 'Checkbox' && (
                    <div className="form-group">
                      <label>{item.question}- Checkbox*</label>
                      <input type="checkbox" id={`checkbox` + index} {...register(item.title + " " + item.id, {
                        required: {
                          value: item.mandatory,
                          message: "Checkbox is Required",
                        },
                        onChange: (e: any) => handleChangeCheckbox(e, item.title + " " + item.id, index)
                      })}


                      />{item.title}

                      <FeildErrorMessage
                        errors={errors}
                        name={item.title + " " + item.id}
                        containerClass="w-100"
                      />
                    </div>
                  )}
                  {item.flexibleTypeValue === 'File Upload' && (
                    <div className="form-group">
                      <label>{item.question}- File*</label>
                      <input type="file" id={`file` + index} {...register(item.title + " " + item.id, {
                        required: {
                          value: item.mandatory,
                          message: "File Upload is Required",
                        },
                      })}

                      />

                      <FeildErrorMessage
                        errors={errors}
                        name={item.title + " " + item.id}
                        containerClass="w-100"
                      />
                    </div>
                  )}


                </div>

              )}
            </div>


          </form>
        </div>
      </div>

      <div className="col-md-6">
        <div className="additional-detl-from">
          <form>
            <div className="add-detl-sec">
              <div className="vehicle-form">
                <h3>Additional Comment</h3>
                <div className="form-group">
                  <label>Comment<span>0/100</span></label>
                  <textarea  {...register(`comments`, {
                    required: {
                      value: true,
                      message: "Comments is Required",
                    },
                  })} name="comments" rows={4} cols={50}>
                  </textarea>
                  <FeildErrorMessage
                    errors={errors}
                    name="comments"
                    containerClass="w-100"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="btn-section form-btn">
        <button className="btn white-btn back-btn" onClick={(e) => handlePrev(e)}>
          <img src={images.backarrow} /> Back
        </button>
        <button className="btn theme-btn" disabled={buttonDisabled} onClick={handleSubmit(handleNext)}>
          Submit Booking
        </button>
      </div>
    </div>
  );
}

export default AdditionalDetails;
function project(project: any, site: any, object: any) {
  throw new Error('Function not implemented.');
}


import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import TimeSlotTimer from "./TimeSlotTimer";
import Flatpickr from "react-flatpickr";
import ErrorMessage from "../../UI/ErrorMessage";
import images from "../../../Assets/images";
import { setBookingDetails } from "../../../Store/Actions/BookingModule/bookingActionCreator";
import "./style.css";
import "flatpickr/dist/themes/material_green.css";
import FeildErrorMessage from "../../UI/FeildErrorMessage";
import { validateEmail, validatePhoneNumber } from "../../../Library/Utils";
import Input from "../../UI/Input";
import { getLocalStorage } from "../../../Network/ApiService";
import { constants } from "../../../Library/Constants";
const BookingDetails = () => {
  const dispatch = useDispatch();
  const bookingSteps = useSelector((state: any) => state.booking.bookingSteps);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false)
  const bookingType = useSelector((state: any) => state.booking.bookingType);
  const bookingdetail = useSelector((state: any) => state.booking.bookingSteps.find((bookingStepItem: any) => bookingStepItem.name === bookingType)?.data?.bookingDetail);
  const user = getLocalStorage(constants.USER);
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

  const handleClockUnlimited = (e: any) => {
    let ischeck = getValues("useMyDetails");
    if (ischeck == false) {
      setValue("companyName", user?.organization?.name);
      setValue("fullName", user?.firstName !== null ? user?.firstName : '' + " " + user?.lastName !== null ? user?.lastName : '');
      setValue("email", user?.email);
      setValue("phonenumber", user?.mobile);
    }
    if (ischeck == true) {
      setValue("companyName", '');
      setValue("fullName", '');
      setValue("email", '');
      setValue("phonenumber", '');
    }
  }

  const onChange = (e: any) => {
    const { name, value } = e.target;
    switch (name) {
      case "companyName":
        if (value === "") {
          setError(name, {
            type: "required",
            message: "company Name is required",
          });
        } else {
          clearErrors(name);
        }
        break;

      case "fullName":
        if (value === "") {
          setError(name, {
            type: "required",
            message: "Full name is required",
          });
        } else {
          clearErrors(name);
        }
        break;
      case "email":
        if (value === "") {
          setError(name, {
            type: "required",
            message: "email is required",
          });
        } else if (!validateEmail(value)) {
          setError(name, {
            type: "validate",
            message: "email is not valid",
          });
        } else {
          clearErrors(name);
        }
        break;
      case "phonenumber":
        if (value === "") {
          setError(name, {
            type: "required",
            message: "Mobile number is required",
          });
        } else if (!validatePhoneNumber(value)) {
          setError(name, {
            type: "validate",
            message: "Mobile number is valid",
          });
        } else {
          clearErrors(name);
        }
        break;
      default:
        break;
    }
  };
  const handleNext = (formData: any) => {
    let temp = [...bookingSteps];
    const SelectedDataIndex = temp.findIndex(
      (bookingStepItem: any) => bookingStepItem.name === bookingType
    );
    temp[SelectedDataIndex].data.bookingDetail = {
      company_name: formData?.companyName,
      name: formData?.fullName,
      email: formData?.email,
      phone: formData?.phonenumber
    };
    temp[SelectedDataIndex].stepCount = 5;
    dispatch(setBookingDetails(temp));
  };
  const handlePrev = (e: any) => {
    e.preventDefault();
    let temp = [...bookingSteps];
    const SelectedDataIndex = temp.findIndex(
      (bookingStepItem: any) => bookingStepItem.name === bookingType
    );
    temp[SelectedDataIndex].data.bookingDetail = {
      company_name: getValues('companyName'),
      name: getValues('fullName'),
      email: getValues('email'),
      phone: getValues('phonenumber'),
    };
    temp[SelectedDataIndex].stepCount = 3;
    dispatch(setBookingDetails(temp));
  };
  useEffect(() => {
    setValue("companyName", bookingdetail?.company_name);
    setValue("fullName", bookingdetail?.name);
    setValue("email", bookingdetail?.email);
    setValue("phonenumber", bookingdetail?.phone);
  }, [bookingdetail])
  useEffect(() => {
    let temp = [...bookingSteps]
    const SelectedDataIndex = temp.findIndex((bookingStepItem: any) => bookingStepItem.name === bookingType)
    setButtonDisabled(temp[SelectedDataIndex].data.timer === 0)
  }, [JSON.stringify(bookingSteps)])
  return (
    <form className="form-root" onSubmit={handleSubmit(handleNext)}>
      <div className="row">
        <div className="col-lg-8 col-md-12">
          <div><TimeSlotTimer /></div>
          <div className="step-from">
            <form>
              <div className="vehicle-form step4form">
                <h3>Site Content</h3>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Company name</label>
                      <div className="form-group" style={{ float: "right" }}>
                        <div className="form-check">
                          <label className="form-check-label" htmlFor="check1">
                            <Input
                              inputName="useMyDetails"
                              register={register}
                              id="active"
                              inputType="checkbox"
                              className="form-check-input"
                              handleClick={(e: any) => handleClockUnlimited(e)}
                            />
                            Use my details
                          </label>
                        </div>
                      </div>
                      <Input
                        inputName="companyName"
                        register={register}
                        rules={{
                          required: {
                            value: true,
                            message: `Company name is required`,
                          },
                          onChange: (e: any) => onChange(e),
                        }}
                        id="companyName"
                        inputType="text"
                      />
                      <FeildErrorMessage
                        errors={errors}
                        name="companyName"
                        containerClass="w-100"
                      />
                    </div>
                    <div className="form-group">
                      <label>Full Name</label>
                      <Input
                        inputName="fullName"
                        register={register}
                        rules={{
                          required: {
                            value: true,
                            message: `Full Name is Required`,
                          },
                          onChange: (e: any) => onChange(e),
                        }}
                        id="fullName"
                        inputType="text"
                      />
                      <FeildErrorMessage
                        errors={errors}
                        name="fullName"
                        containerClass="w-100"
                      />
                    </div>
                    <div className="form-group mb-0">
                      <label>Email address</label>
                      <Input
                        className={
                          errors[`email`]
                            ? "form-control error"
                            : "form-control"
                        }
                        inputName="email"
                        register={register}
                        rules={{
                          required: {
                            value: true,
                            message: `Email is required`,
                          },
                          validate: (value: string) => {
                            return (
                              validateEmail(value) ||
                              `Email is Required`
                            );
                          },
                          onChange: (e: any) => onChange(e),
                        }}
                        id="login_email"
                        inputType="email"
                      />
                      <FeildErrorMessage
                        errors={errors}
                        name="email"
                        containerClass="w-100"
                      />
                    </div>
                    <div className="form-group mb-0">
                      <label>Mobile number</label>
                      <Input
                        inputType="text"
                        inputName="phonenumber"
                        register={register}
                        rules={{
                          required: {
                            value: true,
                            message: `Mobile no is required`,
                          },
                          validate: (value: string) => {
                            return (
                              validatePhoneNumber(value) ||
                              `Mobile Number is required`
                            );
                          },
                          onChange: (e: any) => onChange(e),
                        }}
                        id="profileSetup_phonenumber"
                      />
                      <FeildErrorMessage
                        errors={errors}
                        name="phonenumber"
                        containerClass="w-100"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="btn-section form-btn">
                <button
                  className="btn white-btn back-btn"
                  onClick={(e) => handlePrev(e)}>
                  <img src={images.backarrow} /> Back
                </button>
                <button
                  className="btn theme-btn"
                  onClick={handleSubmit(handleNext)} disabled={buttonDisabled}>
                  Next <img src={images.ForwardArrow} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </form>
  );
};

export default BookingDetails;

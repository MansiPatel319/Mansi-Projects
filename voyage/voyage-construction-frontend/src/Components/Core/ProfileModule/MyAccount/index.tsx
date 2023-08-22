import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Select from "react-select";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
// component
import Button from "../../../UI/Button";
import Input from "../../../UI/Input";
import FeildErrorMessage from "../../../UI/FeildErrorMessage";
import Label from "../../../UI/Label";

// API

import {
  doUserDetailAdd,
  doUserPreferenceAdd,
  getAccountPreferenceDetail,
  getAccountUserDetail,
  getCalenderDaysList,
  getDateFormatList,
  getLanguageList,
  getTimeFormatList,
} from "../../../../Network/Core/Dashboard/dashboard";

// helper
import { validateEmail, validatePhoneNumber } from "../../../../Library/Utils";
import { getLocalStorage } from "../../../../Network/ApiService";
import { constants } from "../../../../Library/Constants";

// css
import "../../../../Assets/css/site-management.css";
import "../../../../Assets/css/booking-form.css";


export interface IMyAccountComponentProps {
  handleClickModal: () => void;
}

export default function MyAccountComponent({
  handleClickModal,
}: IMyAccountComponentProps) {
  const [laguageList, setlaguageList] = useState<any>();
  const [dateFormatList, setdateFormatList] = useState<any>();
  const [timeFormatList, settimeFormatList] = useState<any>();
  const [calenderDaysList, setcalenderDaysList] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  const project = getLocalStorage(constants.PROJECT);
  const { t } = useTranslation();
  const navigate = useNavigate()

  const {
    register, // this use for evnets and value
    handleSubmit, // this is form submit handle
    setValue,
    setError,
    control,
    clearErrors,
    formState: { errors }, // error like required,validate, etc..
  } = useForm();
  const getAccountdetails = async (ref: any) => {
    try {
      setIsLoading(true);
      const res = await getAccountUserDetail(ref);
      const { status, data } = res;
      switch (status) {
        case 200:
          setIsLoading(false);
          setValue("firstname", data.firstName);
          setValue("lastname", data.lastName);
          setValue("phonenumber", data.mobile);
          setValue("email", data.email);
          setValue("company", data.organization?.name);
          setValue("orgRole", data.organizationRole?.name);
          setValue("projectRole", data.projectRole);
          break;
        case 400:
          setIsLoading(false);
          break;
        case 403:
          if (data.detail === "ERR_login_again_token_expired") {
            toast.error(t("userManagment.error_login_again"));
            localStorage.clear()
            navigate('/login')
          }
          setIsLoading(false);
          break
        default:
          break;
      }
    } catch (err) {
      setIsLoading(false);
      // toast.error(t("userManagment.error_something_went_wrong"));
    }
  };
  const getAccountPreference = async () => {
    try {
      setIsLoading(true);
      const res = await getAccountPreferenceDetail(project.ref);
      const { status, data } = res;
      switch (status) {
        case 200:
          setIsLoading(false);
          // const tempLang = {
          //   value: data.language.id,
          //   label: data.language.name,
          // };
          // const tempdateformat = {
          //   value: data.dateFormat.id,
          //   label: data.dateFormat.format,
          // };
          // const temptimeformat = {
          //   value: data.timeFormat.id,
          //   label: data.timeFormat.format,
          // };
          // const tempcaldays = {
          //   value: data.startDay.id,
          //   label: data.startDay.day,
          // };
          setValue("language", data.language.id);
          setValue("DateFormate", data.dateFormat.id);
          setValue("timeFormat", data.timeFormat.id);
          setValue("calenderDay", data.startDay.id);

          break;
        case 400:
          setIsLoading(false);
          break;
        case 403:
            if (data.detail === "ERR_login_again_token_expired") {
              toast.error(t("userManagment.error_login_again"));
              localStorage.clear()
              navigate('/login')
            }
            setIsLoading(false);
            break
        default:
          break;
      }
    } catch (err) {
      setIsLoading(false);
      // toast.error(t("userManagment.error_something_went_wrong"));
    }
  };
  const onSubmit = async (userData: any) => {
    setIsLoading(true);
    try {
      const res = await doUserDetailAdd(
        {
          email: userData.email,
          data: {
            first_name: userData.firstname,
            last_name: userData.lastname,
            mobile: userData.phonenumber,
          },
        },
        project.ref
      );

      const { status, data } = res;
      switch (status) {
        case 200:
          setIsLoading(false);
          getAccountdetails(project.ref);
          toast.success("Save Detail Successfully");

          break;
        case 400:
          setIsLoading(false);

          break;
        case 403:
          if (data.detail === "ERR_login_again_token_expired") {
            toast.error(t("userManagment.error_login_again"));
            localStorage.clear()
            navigate('/login')
          }
          setIsLoading(false);
          break
        default:
          setIsLoading(false);
          break;
      }
    } catch (err) {
      toast.error(t("userManagment.error_something_went_wrong"));
      setIsLoading(false);
    
    }
    try {
      const res = await doUserPreferenceAdd({
        language: userData.language,
        date_format: userData.DateFormate,
        time_format: userData.timeFormat,
        start_day: userData.calenderDay,
      },
      project.ref
      );

      const { status, data } = res;
      switch (status) {
        case 200:
          setIsLoading(false);
          toast.success("Save Prefernce Successfully");
          getAccountPreference();
          break;
        case 400:
          setIsLoading(false);

          break;
        case 403:
            if (data.detail === "ERR_login_again_token_expired") {
              toast.error(t("userManagment.error_login_again"));
              localStorage.clear()
              navigate('/login')
            }
            setIsLoading(false);
            break
        default:
          setIsLoading(false);
          break;
      }
    } catch (err) {
      toast.error(t("userManagment.error_something_went_wrong"));
      setIsLoading(false);

    }
  };
  const onChange = (e: any) => {
    const { name, value } = e.target;
    switch (name) {
      case "firstname":
        if (value === "") {
          setError(name, {
            type: "required",
            message: t("account.error_firstname_required"),
          });
        } else {
          clearErrors(name);
        }
        break;
      case "lastname":
        if (value === "") {
          setError(name, {
            type: "required",
            message: t("account.error_lastname_required"),
          });
        } else {
          clearErrors(name);
        }
        break;
      case "phonenumber":
        if (value === "") {
          setError(name, {
            type: "required",
            message: t("account.error_Phone_required"),
          });
        } else if (!validatePhoneNumber(value)) {
          setError(name, {
            type: "validate",
            message: t("account.error_Phone_invalid"),
          });
        } else {
          clearErrors(name);
        }
        break;

      default:
        break;
    }
  };

 
 

  const getLanguages = async () => {
    try {
      setIsLoading(true);
      const res = await getLanguageList(project.ref);
      const { status, data } = res;
      switch (status) {
        case 200:
          setIsLoading(false);
          const tempLang = data.results.map((lang: any) => {
            return {
              value: lang.id,
              label: lang.name,
            };
          });
          setlaguageList(tempLang);
          break;
        case 400:
          setIsLoading(false);
          break;
        case 403:
            if (data.detail === "ERR_login_again_token_expired") {
              toast.error(t("userManagment.error_login_again"));
              localStorage.clear()
              navigate('/login')
            }
            setIsLoading(false);
            break
        default:
          break;
      }
    } catch (err) {
      setIsLoading(false);
      // toast.error(t("userManagment.error_something_went_wrong"));
    }
  };
  const getDateFomates = async () => {
    try {
      setIsLoading(true);
      const res = await getDateFormatList(project.ref);
      const { status, data } = res;
      switch (status) {
        case 200:
          setIsLoading(false);
          const tempdateformat = data.results.map((dayformat: any) => {
            return {
              value: dayformat.id,
              label: dayformat.format,
            };
          });
          setdateFormatList(tempdateformat);
          break;
        case 400:
          setIsLoading(false);
          break;
        case 403:
            if (data.detail === "ERR_login_again_token_expired") {
              toast.error(t("userManagment.error_login_again"));
              localStorage.clear()
              navigate('/login')
            }
            setIsLoading(false);
            break
        default:
          break;
      }
    } catch (err) {
      setIsLoading(false);
      // toast.error(t("userManagment.error_something_went_wrong"));
    }
  };
  const getTimeFormats = async () => {
    try {
      setIsLoading(true);
      const res = await getTimeFormatList(project.ref);
      const { status, data } = res;
      switch (status) {
        case 200:
          setIsLoading(false);
          const temptimeformat = data.results.map((format: any) => {
            return {
              value: format.id,
              label: format.format,
            };
          });
          settimeFormatList(temptimeformat);
          break;
        case 400:
          setIsLoading(false);
          break;
        case 403:
            if (data.detail === "ERR_login_again_token_expired") {
              toast.error(t("userManagment.error_login_again"));
              localStorage.clear()
              navigate('/login')
            }
            setIsLoading(false);
            break
        default:
          break;
      }
    } catch (err) {
      setIsLoading(false);
      // toast.error(t("userManagment.error_something_went_wrong"));
    }
  };
  const getCalenderDays = async () => {
    try {
      setIsLoading(true);
      const res = await getCalenderDaysList(project.ref);
      const { status, data } = res;
      switch (status) {
        case 200:
          setIsLoading(false);
          const tempcaldays = data.results.map((day: any) => {
            return {
              value: day.id,
              label: day.day,
            };
          });
          setcalenderDaysList(tempcaldays);
          break;
        case 400:
          setIsLoading(false);
          break;
        case 403:
            if (data.detail === "ERR_login_again_token_expired") {
              toast.error(t("userManagment.error_login_again"));
              localStorage.clear()
              navigate('/login')
            }
            setIsLoading(false);
            break
        default:
          break;
      }
    } catch (err) {
      setIsLoading(false);
      // toast.error(t("userManagment.error_something_went_wrong"));
    }
  };
  useEffect(() => {
    getAccountdetails(project.ref);
    getAccountPreference();
    getLanguages();
    getDateFomates();
    getTimeFormats();
    getCalenderDays();
  }, []);
  return (
    <div className="page-wrapper">
        <div className="page-header">
          <h3 className="page-title">My Account</h3>
          <div className="extra" />
        </div>
        <form className="form-root" onSubmit={handleSubmit(onSubmit)}>
          <div className="page-content common-page-content">
            <div className="row">
              <div className="col-lg-6 col-md-12 d-flex">
                <div className="vehicle-form w-100">
                  <h3>My Details</h3>
                  <div className="form-group">
                    <Label label="First Name" />
                    <Input
                      inputName="firstname"
                      className={errors['firstname'] ? "form-control error" :"form-control"}                    
                      register={register}
                      rules={{
                        required: {
                          value: true,
                          message: t('account.error_firstname_required'),
                        },
                        onChange: (e: any) => onChange(e),
                      }}
                      id="myaccount_firstname"
                      inputType="text"
                    />
                    <FeildErrorMessage
                      errors={errors}
                      name="firstname"
                      containerClass="w-100"
                    />
                  </div>
                <div className="form-group">
                    <Label label="Last Name" />
                    <Input
                      inputName="lastname"
                      className={errors['lastname'] ? "form-control error" :"form-control"}                   
                      register={register}
                      rules={{
                        required: {
                          value: true,
                          message:  t('account.error_lastname_required'),
                        },
                        onChange: (e: any) => onChange(e),
                      }}
                      id="myaccount_lastname"
                      inputType="text"
                    />
                    <FeildErrorMessage
                      errors={errors}
                      name="lastname"
                      containerClass="w-100"
                    />
                  </div>
                  <div className="form-group">
                    <Label label="Phone Number" />
                    <Input
                      inputType="text"
                      className={errors['phonenumber'] ? "form-control error" :"form-control"}                  
                      inputName="phonenumber"
                      register={register}
                      rules={{
                        required: {
                          value: true,
                          message:t('account.error_Phone_required'),
                        },
                        validate: (value: string) => {
                          return (
                            validatePhoneNumber(value) || t('account.error_Phone_invalid')
                          );
                        },
                        onChange: (e: any) => onChange(e),
                      }}
                      id="myaccount_phonenumber"
                    />
                    <FeildErrorMessage
                      errors={errors}
                      name="phonenumber"
                      containerClass="w-100"
                    />
                  </div>
                  <div className="form-group">
                    <Label label="Email" />
                    <Input
                      inputName="email"
                      className={errors['email'] ? "form-control error" :"form-control"}
                      register={register}
                      rules={{
                        required: {
                          value: true,
                          message: t('account.error_email_required'),
                        },
                        validate: (value: string) => {
                          return validateEmail(value) || t('account.error_email_invalid');
                        },
                        onChange: (e: any) => onChange(e),
                      }}
                      id="myaccount_email"
                      inputType="email"
                    />
                    <FeildErrorMessage
                      errors={errors}
                      name="email"
                      containerClass="w-100"
                    />
                  </div>
                <div className="form-group disable">
                    <Label label="Company" />
                    <Input
                      disabled
                      inputName="company"
                      register={register}
                      id="myaccount_company"
                      inputType="text"
                    />
                  </div>
                  <div className="contctform-btns btntopmargin">
                    <div className="cb-left">
                      <Button
                        buttonLabel="Update Password"
                        handleClick={handleClickModal}
                        varient=""
                        size=""
                        className="btn white-btn"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-12">
                <div className="vehicle-form">
                  <h3>My Preferences</h3>
                <div className="form-group">
                    <Label label="Language" />                      
                    <Controller
                      control={control}
                      name="language"
                      rules={{
                        required: {
                          value: true,
                          message: t('account.error_language_required'),
                        },
                      }}
                      render={({
                        field: { onChange, value},
                      }: any) => (
                        <Select
                          // classNamePrefix="form-control-language"
                          classNamePrefix={errors['language'] ? "error form-control-language" :"form-control-language"}
                          options={laguageList}
                          id="language"
                          name="language"
                          value={laguageList?.find(
                            (c: any) => c.value === value
                          )}
                          onChange={(val: any) => onChange(val.value)}
                        />
                      )}
                    />
                    <FeildErrorMessage
                      errors={errors}
                      name="language"
                      containerClass="w-100"
                    />
                  </div>

                <div className="form-group ">
                    <Label label="Date Format" />                      
                    <Controller
                      control={control}
                      name="DateFormate"
                      rules={{
                        required: {
                          value: true,
                          message: t('account.error_dateformat_required'),
                        },
                      }}
                      render={({
                        field: { onChange, value},
                      }: any) => (
                        <Select
                          // inputRef={ref}
                          classNamePrefix={errors['DateFormate'] ? "error form-control-language" :"form-control-language"}
                          options={dateFormatList}
                          id="DateFormate"
                          name="DateFormate"
                          value={dateFormatList?.find(
                            (c: any) => c.value === value
                          )}
                          onChange={(val: any) => onChange(val.value)}
                        />
                      )}
                    />
                    <FeildErrorMessage
                      errors={errors}
                      name="DateFormate"
                      containerClass="w-100"
                    />
                  </div>
                  <div className="form-group ">
                    <Label label="Time Format" />
                    <Controller
                      control={control}
                      name="timeFormat"
                      rules={{
                        required: {
                          value: true,
                          message: t('account.error_timeformat_invalid'),
                        },
                      }}
                      render={({
                        field: { onChange, value },
                      }: any) => (
                        <Select
                          // inputRef={ref}
                          classNamePrefix={errors['timeFormat'] ? "error form-control-language" :"form-control-language"}
                          options={timeFormatList}
                          id="timeFormat"
                          name="timeFormat"
                          value={timeFormatList?.find(
                            (c: any) => c.value === value
                          )}
                          onChange={(val: any) => onChange(val.value)}
                        />
                      )}
                    />
                    <FeildErrorMessage
                      errors={errors}
                      name="timeFormat"
                      containerClass="w-100"
                    />
                  </div>
                  <div className="form-group mb-0">
                    <Label label="Calendar Start Day" />
                    <Controller
                      control={control}
                      name="calenderDay"
                      rules={{
                        required: {
                          value: true,
                          message: t('account.error_startday_required'),
                        },
                      }}
                      render={({
                        field: { onChange, value },
                      }: any) => (
                        <Select
                          // inputRef={ref}
                          classNamePrefix={errors['calenderDay'] ? "error form-control-language" :"form-control-language"}
                          // defaultValue={selectedcalenderDaysList[0].value}
                          options={calenderDaysList}
                          id="calenderDay"
                          name="calenderDay"
                          value={calenderDaysList?.find(
                            (c: any) => c.value === value
                          )}
                          onChange={(val: any) => onChange(val.value)}
                        />
                      )}
                    />
                    <FeildErrorMessage
                      errors={errors}
                      name="calenderDay"
                      containerClass="w-100"
                    />
                  </div>
                </div>
                <div className="vehicle-form">
                  <h3>My Roles</h3>
                  <div className="form-group">
                    <Label label="Organisation Role" />
                    <Input
                      disabled
                      inputName="orgRole"
                      register={register}
                      id="myaccount_orgRole"
                      inputType="text"
                    />
                  </div>
                  <div className="form-group mb-0">
                    <Label label="Project Role" />
                    <Input
                      disabled
                      inputName="projectRole"
                      register={register}
                      id="myaccount_projectRole"
                      inputType="text"
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-save-btn common-savebtn">
                  <Button
                    buttonLabel="Save"
                    handleClick={handleSubmit(onSubmit)}
                    varient="primary"
                    size="small"
                    disabled={isLoading}
                    className="theme-btn save-accountdetail"
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
  );
}

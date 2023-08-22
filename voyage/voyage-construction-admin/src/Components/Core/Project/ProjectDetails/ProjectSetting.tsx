import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import FeildErrorMessage from "../../../UI/FeildErrorMessage";
import Label from "../../../UI/Label";

import Checkbox from "../../../UI/Checkbox";
import {
  getCalenderDaysList,
  getDateFormatList,
  getLanguageList,
  getTimeFormatList,
  getProjectSettingList,
  updateProjectSettingList,
  updateProjectStatusData,
} from "../../../../Network/Core/Project/projectSetting";
import {
  getLocalStorage,
  setLocalStorage,
} from "../../../../Network/ApiService";
import { constants } from "../../../../Library/Constants";
import { getProjectDetail } from "../../../../Network/Core/Project/ProjectInformation";

const ProjectSetting = () => {
  const { t } = useTranslation();
  const { ref } = useParams();
  const [laguageList, setlaguageList] = useState<any>();
  const [dateFormatList, setdateFormatList] = useState<any>();
  const [timeFormatList, settimeFormatList] = useState<any>();
  const [calenderDaysList, setcalenderDaysList] = useState<any>();
  const [projectSetting, setProjectSetting] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const project = getLocalStorage(constants.PROJECT);
  const [statusList, setStatusList] = useState([
    { value: "pre-live", label: "Pre-Live" },
    { value: "active", label: "Active" },
    { value: "paused", label: "Paused" },
    { value: "finished", label: "Finished" },
  ]);
  const getLanguages = async (ref:any) => {
    try {
      setIsLoading(true);
      const res = await getLanguageList(ref);
      const { status, data } = res;
      switch (status) {
        case 200:
          setIsLoading(false);
          const tempLang = data.results.map((lang: any) => {
            return {
              value: lang.code,
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
  const getDateFomates = async (ref:any) => {
    try {
      setIsLoading(true);
      const res = await getDateFormatList(ref);
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
  const getTimeFormats = async (ref:any) => {
    try {
      setIsLoading(true);
      const res = await getTimeFormatList(ref);
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
  const getCalenderDays = async (ref:any) => {
    try {
      setIsLoading(true);
      const res = await getCalenderDaysList(ref);
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
    getLanguages(ref);
    getDateFomates(ref);
    getTimeFormats(ref);
    getCalenderDays(ref);
  }, [ref]);
  const {
    register, // this use for evnets and value
    handleSubmit, // this is form submit handle
    setError,
    setValue,
    control,
    formState: { errors },
  } = useForm();
  const bookingType = [
    {
      lable: "Multi Vehicle",
      value: "multiple-checkin",
      key: "ENABLE_MULTIPLE_CHECKINS_ON_BOOKING",
    },
    {
      lable: "Recurring",
      value: "recurring",
      key: "ENABLE_RECURRING_BOOKING",
    },
    {
      lable: "Resource Only",
      value: "resource-only",
      key: "ENABLE_RESOURCE_ONLY_BOOKING",
    },
  ];
  const getProjectDetails = async (projectRef: any) => {
    try {
      setIsLoading(true);
      const res = await getProjectDetail(projectRef);
      const { status, data, statusText } = res;
      switch (status) {
        case 200:
          setIsLoading(false);

          setLocalStorage(constants.PROJECT, JSON.stringify(data));
          break;
        case 400:
          setIsLoading(false);
          break;
        case 403:
          if (data.detail === "ERR_login_again_token_expired") {
            navigate("/login");
            toast.error("login again");
            localStorage.clear();
          }
          setIsLoading(false);
          break;
        default:
          setIsLoading(false);
          break;
      }
    } catch (err) {
      setIsLoading(false);
      console.log("err :>> ", err);
      toast.error("error something went wrong");
    }
  };
  const updateProjectSetting = async (ref: any, settingData: any) => {
    try {
      setIsLoading(true);
      const res = await updateProjectSettingList(ref, settingData);
      const { status, data } = res;
      switch (status) {
        case 200:
          setIsLoading(false);
          getProjectDetails(ref);
          toast.success(t("Project Setting Updated"));

          break;
        case 201:
          setIsLoading(false);
          getProjectDetails(ref);
          toast.success(t("Project Setting Updated"));

          break;
        case 400:
          setIsLoading(false);
          break;
        case 403:
          if (data.detail === "ERR_login_again_token_expired") {
            toast.error(t("userManagment.error_login_again"));
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
  const updateProjectStatus = async (ref: any, statusData: any,settingData:any) => {
    try {
      setIsLoading(true);
      const res: any = await updateProjectStatusData(ref, statusData);
      console.log("res :>> ", res);
      const { status, data } = res;
      switch (status) {
        case 200:
          setIsLoading(false);

          // getProjectSetting(ref);
          updateProjectSetting(ref, settingData);
          break;
        case 201:
          setIsLoading(false);

          // getProjectSetting(ref);
          updateProjectSetting(ref, settingData);
          break;
        case 400:
          setIsLoading(false);
          break;
        case 403:
          if (data.detail === "ERR_login_again_token_expired") {
            toast.error(t("userManagment.error_login_again"));
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

  const handleUpdateSetting = async (data: any) => {
    console.log("data :>> ", data);
    const settingData = [
      {
        value: data["multiple-checkin"],
        setting: 1,
      },
      {
        value: data.recurring,
        setting: 2,
      },
      {
        value: data["resource-only"],
        setting: 3,
      },
      {
        value: data.automaticApproval,
        setting: 4,
      },
      {
        value: data.language.value,
        setting: 5,
      },
      {
        value: data.DateFormate.label,
        setting: 6,
      },
      {
        value: data.timeFormat.label,
        setting: 7,
      },
      {
        value: data.calenderDay.label,
        setting: 8,
      },
    ];

   
    const statusData = new FormData();
    statusData.append("status", data.status.value);

    updateProjectStatus(ref, statusData,settingData);
  };
  const getProjectSettingvalue = (settingItem: any) => {
    if (settingItem.isBoolean) {
      bookingType?.map((item: any) => {
        if (item.key === settingItem.key) {
         
          setValue(item.value, settingItem.value);
        }
      });
    } else if (settingItem.key === "LANGUAGE_CODE") {

      laguageList.map((item: any) => {
        if (item.value === settingItem.value) {
          // console.log('item :>> ', item);
          // console.log('settingItem', settingItem);

          setValue("language", item);
        }
      });
    } else if (settingItem.key === "DATE_FORMAT") {
      // setValue("DateFormate", {
      //   label: settingItem.value,
      //   value: settingItem.value,
      // });
      dateFormatList.map((item: any) => {
        if (
          item.label.toLowerCase() === settingItem.value ||
          item.label === settingItem.value
        ) {
          setValue("DateFormate", item);
        }
      });
    } else if (settingItem.key === "TIME_FORMAT") {
      // setValue("timeFormat", {
      //   label: settingItem.value,
      //   value: settingItem.value,
      // });
      timeFormatList.map((item: any) => {
        if (item.label.includes(settingItem.value)) {
          setValue("timeFormat", item);
        }
      });
    } else if (settingItem.key === "CALENDAR_START_DAY") {
      // setValue("calenderDay", {
      //   label: settingItem.value,
      //   value: settingItem.value,
      // });
      calenderDaysList.map((item: any) => {
        if (item.label === settingItem.value) {
          setValue("calenderDay", item);
        }
      });
    }
    if (settingItem.key === "ENABLE_AUTO_APPROVAL") {
      // setValue("calenderDay", {
      //   label: settingItem.value,
      //   value: settingItem.value,
      // });
      setValue("automaticApproval", settingItem.value);
    }
  };
  const getProjectSetting = async (projectRef: any) => {
    try {
      setIsLoading(true);
      const res = await getProjectSettingList(projectRef);
      const { status, data } = res;
      switch (status) {
        case 200:
          setIsLoading(false);
          setProjectSetting(data.results);
          data.results.map((item: any) => {
            getProjectSettingvalue(item);
          });
          const multiplecheckindata = data.defaults.find(
            (item: any) => item.key === "ENABLE_MULTIPLE_CHECKINS_ON_BOOKING"
          );

          break;
        case 400:
          setIsLoading(false);
          break;
        case 403:
          if (data.detail === "ERR_login_again_token_expired") {
            toast.error(t("userManagment.error_login_again"));
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
  const checkProjectSettingEnable = (key: any) => {
    if (projectSetting && projectSetting.length>0 && projectSetting?.find((item: any) => item.key === key)) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    getProjectSetting(ref);
  }, [ref, laguageList, dateFormatList, timeFormatList, calenderDaysList]);
  useEffect(() => {
    statusList.map((item: any) => {
      if (item.value === project.status) {
        setValue("status", item);
      }
    });
  }, [project?.status]);
  return (
    <div
      className="tab-pane fade show active"
      id="nav-projsettings"
      role="tabpanel"
      aria-labelledby="nav-projsettings-tab"
    >
      <div className="bookig-type-box">
        <h4>Booking Type</h4>
        <div className="row">
          { bookingType && bookingType.length>0 && bookingType?.map(
            (bookingTypeItem: any) =>
              (
                <div className="col-lg-4 col-md-6">
                  <div className="booking-option-box vehicle-form">
                    <div className="left-book-option">
                      <h5>{bookingTypeItem.lable}</h5>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisc ing
                        elit.{" "}
                      </p>
                    </div>
                    <div className="switch-box">
                      <label className="switch" htmlFor={bookingTypeItem.value}>
                        <Checkbox
                          id={bookingTypeItem.value}
                          name={bookingTypeItem.value}
                          // checkboxValue={}
                          register={register}
                          // checkboxValue={getProjectSettingvalue(bookingTypeItem.key)}
                        />

                        {/* <input type="checkbox" id="step1check" /> */}
                        <span className="slider round" />
                      </label>
                    </div>
                  </div>
                </div>
              )
          )}
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6 col-md-12">
          <div className="cust-projset-box">
            <h4>Site Defaults</h4>
            <div className="vehicle-form">
              <div className="form-group">
                <Label label="Language" />
                <Controller
                  control={control}
                  name="language"
                  rules={{
                    required: {
                      value: true,
                      message: t("setting.error_language_required"),
                    },
                  }}
                  render={({ field: { onChange, value } }: any) => (
                    <Select
                      // classNamePrefix="form-control-language"
                      classNamePrefix={
                        errors?.language
                          ? "error form-control-language"
                          : "form-control-language"
                      }
                      options={laguageList}
                      id="language"
                      name="language"
                      value={laguageList?.find(
                        (c: any) => c.value === value?.value
                      )}
                      onChange={(val: any) => onChange(val)}
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
                      message: t("setting.error_dateformat_required"),
                    },
                  }}
                  render={({ field: { onChange, value } }: any) => (
                    <Select
                      // inputRef={ref}
                      classNamePrefix={
                        errors.DateFormate
                          ? "error form-control-language"
                          : "form-control-language"
                      }
                      options={dateFormatList}
                      id="DateFormate"
                      name="DateFormate"
                      value={dateFormatList?.find(
                        (c: any) => c.value === value?.value
                      )}
                      onChange={(val: any) => onChange(val)}
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
                      message: t("setting.error_timeformat_invalid"),
                    },
                  }}
                  render={({ field: { onChange, value } }: any) => (
                    <Select
                      // inputRef={ref}
                      classNamePrefix={
                        errors.timeFormat
                          ? "error form-control-language"
                          : "form-control-language"
                      }
                      options={timeFormatList}
                      id="timeFormat"
                      name="timeFormat"
                      value={timeFormatList?.find(
                        (c: any) => c.value === value?.value
                      )}
                      onChange={(val: any) => onChange(val)}
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
                      message: t("setting.error_startday_required"),
                    },
                  }}
                  render={({ field: { onChange, value } }: any) => (
                    <Select
                      // inputRef={ref}
                      classNamePrefix={
                        errors.calenderDay
                          ? "error form-control-language"
                          : "form-control-language"
                      }
                      // defaultValue={selectedcalenderDaysList[0].value}
                      options={calenderDaysList}
                      id="calenderDay"
                      name="calenderDay"
                      value={calenderDaysList?.find(
                        (c: any) => c.value === value?.value
                      )}
                      onChange={(val: any) => onChange(val)}
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
          </div>
        </div>
        <div className="col-lg-6 col-md-12">
          <div className="cust-projset-box">
            <h4>Project Status</h4>
            <div className="vehicle-form">
              <div className="form-group">
                <Label label="Status" />
                <Controller
                  control={control}
                  name="status"
                  rules={{
                    required: {
                      value: true,
                      message: t("setting.error_status_required"),
                    },
                  }}
                  render={({ field: { onChange, value } }: any) => (
                    <Select
                      // classNamePrefix="form-control-language"
                      classNamePrefix={
                        errors.language
                          ? "error form-control-language"
                          : "form-control-language"
                      }
                      options={statusList}
                      id="status"
                      name="status"
                      value={statusList?.find(
                        (c: any) => c.value === value?.value
                      )}
                      onChange={(val: any) => onChange(val)}
                    />
                  )}
                />
                <FeildErrorMessage
                  errors={errors}
                  name="language"
                  containerClass="w-100"
                />
              </div>
            </div>
          </div>
          <div className="cust-projset-box">
            <h4>Site Settings</h4>
            <div className="booking-option-box vehicle-form">
              <div className="left-book-option">
                <h5>Automatic Approval</h5>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisc ing elit.{" "}
                </p>
              </div>
              <div className="switch-box">
                <label className="switch" htmlFor="automaticApproval">
                  <Checkbox
                    name="automaticApproval"
                    // checkboxValue
                    id="automaticApproval"
                    register={register}
                  />

                  <span className="slider round" />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="form-cust-btn">
        <button
          className="theme-btn"
          type="submit"
          onClick={handleSubmit(handleUpdateSetting)}
          data-toggle="modal"
          data-target="#addfield"
        >
          Save details
        </button>
      </div>
    </div>
  );
};
export default ProjectSetting;

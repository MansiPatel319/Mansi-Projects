import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

import { useParams } from "react-router-dom";
import Select from "react-select";
import {
  handleEditDurationModal,
  handleOpenEditProjectModal,
} from "../../../store/Actions/ProjectModule/projectActionCreators";

// component

import Input from "../../UI/Input";
import Label from "../../UI/Label";
import Button from "../../UI/Button";
import CommonErrorMessage from "../../UI/CommonErrorMessage";
import FeildErrorMessage from "../../UI/FeildErrorMessage";
import {
  EditProjectDetail,
  getAccountManager,
  getOrganization,
  getOwnerListData,
  getProjectDetail,
} from "../../../Network/Core/Project/ProjectInformation";
import { getTimeList, updateBookingField } from "../../../Network/Core/Project/projectSetting";
import { getLocalStorage } from "../../../Network/ApiService";
import useOutsideClick from "./ManageOutsideClickClose";

export interface ProjectListFilterProps { }

const DurationModal = () => {
  const { t } = useTranslation();
  const bookingField = useSelector((state: any) => state.project.bookingField)
  const project = getLocalStorage('project')
  const dispatch = useDispatch();

  const {
    register, // this use for evnets and value
    handleSubmit, // this is form submit handle
    setError,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();
  const { ref } = useParams();
  const show = useSelector(
    (state: any) => state.project.showDurationModal
  );
  const refOutsideModel = useRef(null);

  const [minHour, setMinHour] = useState([
    { label: "30 Minute", value: "30 Minute", time: "00:30:00" },
    { label: "1 Hour", value: "1 Hour", time: "01:00:00" },
    { label: "1 Hour 30 Minute", value: "1 Hour 30 Minute", time: "01:30:00" },
    { label: "2 Hour", value: "2 Hour", time: "02:00:00" },
    { label: "2 Hour 30 Minute", value: "2 Hour 30 Minute", time: "02:30:00" },
    { label: "3 Hour", value: "3 Hour", time: "03:00:00" },
    { label: "3 Hour 30 Minute", value: "3 Hour 30 Minute", time: "03:30:00" },
    { label: "4 Hour", value: "4 Hour", time: "04:00:00" },
  ]);
  const [maxHour, setMaxHour] = useState([
    { label: "30 Minute", value: "30 Minute", time: "00:30:00" },
    { label: "1 Hour", value: "1 Hour", time: "01:00:00" },
    { label: "1 Hour 30 Minute", value: "1 Hour 30 Minute", time: "01:30:00" },
    { label: "2 Hour", value: "2 Hour", time: "02:00:00" },
    { label: "2 Hour 30 Minute", value: "2 Hour 30 Minute", time: "02:30:00" },
    { label: "3 Hour", value: "3 Hour", time: "03:00:00" },
    { label: "3 Hour 30 Minute", value: "3 Hour 30 Minute", time: "03:30:00" },
    { label: "4 Hour", value: "4 Hour", time: "04:00:00" },
  ]);
  let maxHourIntial: any = []
  const [Increment, setIncrement] = useState([
    { label: "30 Minute", value: "30 Minute", time: "00:30:00" },
    { label: "1 Hour", value: "1 Hour", time: "01:00:00" },
    { label: "1 Hour 30 Minute", value: "1 Hour 30 Minute", time: "01:30:00" },
    { label: "2 Hour", value: "2 Hour", time: "02:00:00" },
    { label: "2 Hour 30 Minute", value: "2 Hour 30 Minute", time: "02:30:00" },
    { label: "3 Hour", value: "3 Hour", time: "03:00:00" },
    { label: "3 Hour 30 Minute", value: "3 Hour 30 Minute", time: "03:30:00" },
    { label: "4 Hour", value: "4 Hour", time: "04:00:00" },
  ]);
  const handleClose = () => {
    dispatch(handleEditDurationModal(false));
  };
  useOutsideClick(refOutsideModel, () => {
    handleClose()
  })
  const handleSubmitProjectDetail = async (projectData: any) => {
    const durationData = {
      duration: {
        "id": bookingField.durations[0].id,
        "min_duration": projectData.minHour,
        "max_duration": projectData.maxHour,
        "project": project.id,
        "is_active": true
      }
    }
    try {
      const res: any = await updateBookingField(ref, durationData);
      const { status } = res;
      switch (status) {
        case 200:
          handleClose();

          toast.success("Update Duration");
          break;
        case 400:
          break;
        case 403:
          // if (data.detail === "ERR_login_again_token_expired") {
          //   toast.error(t("userManagment.error_login_again"));
          //   localStorage.clear()
          //   navigate('/login')
          // }

          break;
        default:
          break;
      }
    } catch (err) {
      toast.error(t("userManagment.error_something_went_wrong"));
    }
  };
  const getTimeListing = async (inc: any, time: any, val: any,title:string) => {
    function checkMinHour(item: any) {
      return item.id === val.id;
    }
    try {
      const res: any = await getTimeList(ref);
      const { status, data } = res;
      switch (status) {
        case 200:

          const tempMinLength =
            data.results.map((item: any) => {
              if (item.time.split(":")[0] === "00") {
                item.label = parseInt(item.time.split(":")[1]) + " Minute ",
                  item.value = item.id
                return item
              }
              else if (item.time.split(":")[1] === "00") {
                item.label = parseInt(item.time.split(":")[0]) + " Hour ",
                  item.value = item.id
                return item
              }
              else {
                item.label = parseInt(item.time.split(":")[0]) + " Hour " + parseInt(item.time.split(":")[1]) + " Minute ",
                  item.value = item.id
                return item
              }
            })
          setMinHour(tempMinLength.slice(1))
          setMaxHour(tempMinLength.slice(1))
          setIncrement(tempMinLength.slice(1, 9))
          maxHourIntial = tempMinLength.slice(1)
     



          if (inc !== null && time !== null && val !== null) {


            let tempMaxHour: any = []
            let tempMinHour: any = []
            tempMaxHour = [...maxHourIntial]
            tempMinHour = [...maxHourIntial]
            let indexMin = tempMinHour.findIndex(checkMinHour);
            tempMinHour = tempMinHour.slice(indexMin, tempMinHour.length)

            let index = tempMaxHour.findIndex(checkMinHour);
            tempMaxHour = tempMaxHour.slice(index, tempMaxHour.length)



            let milliseconds: any =
              (Number(inc[0]) * 3600000) +
              (Number(inc[1]) * 60000) +
              (Number(inc[2]) * 1000);
            let newArray = createMaxArray(tempMaxHour[0]?.time, tempMaxHour[tempMaxHour.length - 1]?.time, milliseconds)
            let dummy = tempMaxHour.filter((item: any) => newArray.find(mItem => mItem == item.label))


            let newArrayMin = createMaxArray(tempMinHour[0]?.time, tempMinHour[tempMinHour.length - 1]?.time, milliseconds)
            let dummyMin = tempMinHour.filter((item: any) => newArrayMin.find(mItem => mItem == item.label))
           
            if (title === "inc") {
              
              setMinHour(dummyMin)
              setMaxHour(dummy)
            }
            else {
              setMaxHour(dummy)
            }
            // setValue("maxHour", dummy[0].value)
            setValue("maxHour", "")

          }

          else {
            setValue("minHour", tempMinLength.find((item: any) => item.id === bookingField?.durations[0]?.minDuration).value)
            setValue("maxHour", tempMinLength.find((item: any) => item.id === bookingField?.durations[0]?.maxDuration).value)
          }

          break;
        case 400:
          break;
        case 403:
          // if (data.detail === "ERR_login_again_token_expired") {
          //   toast.error(t("userManagment.error_login_again"));
          //   localStorage.clear()
          //   navigate('/login')
          // }

          break;
        default:
          break;
      }

    } catch (err) {
      console.log('here getting errors');
      
      // toast.error(t("userManagment.error_something_went_wrong"));
    }
  }
 
  const createMaxArray = (start: String, end: String, increment: Number) => {

    let s = start?.split(":")
    let e = end?.split(":")

    const start1: any = new Date();
    const end1: any = new Date();

    start1.setHours(parseInt(s[0]), parseInt(s[1]), 0); //8 AM
    end1.setHours(parseInt(e[0]), parseInt(e[1]), 0); //8 AM
   
    let newArray = []
    while (start1 <= end1) {

      const hours = start1.getHours().toString();
      const minutes = start1.getMinutes().toString();;
      const seconds = start1.getSeconds().toString();;
    

      if (parseInt(hours) > 0 && parseInt(hours) < 9 && parseInt(minutes) > 0 && parseInt(minutes) < 9) {
      

        newArray.push("0" + hours + " Hour " + "0" + minutes + " Minute ")

      }
      else if (parseInt(hours) > 9 && parseInt(hours) < 9 && minutes !== "0") {
        
        newArray.push("0" + hours + " Hour " + minutes + " Minute ")

      }
      else if (parseInt(minutes) > 9 && parseInt(minutes) < 9 && hours !== "0") {
     

        newArray.push(hours + " Hour " + "0" + minutes + " Minute ")

      }
      else if (hours === "0") {
      

        newArray.push(minutes + " Minute ")
      }
      else if (minutes === "0") {
      

        newArray.push(hours + " Hour ")

      }
      else {
       
        newArray.push(hours + " Hour " + minutes + " Minute ")
      }

    
      start1.setMilliseconds(start1.getMilliseconds() + increment);
    }

    return newArray
 
  }
  const onChangeSelect = (val: any, title: any) => {
    console.log('val', val);
    console.log('title :>> ', title);
    
    let time: any = title === "minHour" ? (val.time.split(":")) : (minHour?.find((item: any) => item.value === getValues("minHour"))?.time?.split(":"))
    const inc: any = title === "minHour" ? Increment.find((item: any) => item.value === getValues("increment"))?.time?.split(":") : val.time.split(":")
   
    const start: any = new Date();
    start.setHours(Number(time[0]), Number(time[1]), 0); //8 AM
    const end: any = new Date();
    end.setHours(24, 0, 0); //5 PM
    if (title === "minHour") {
      setValue("minHour", val.value)
    }
    else {
      setValue("increment", val.value)
      setValue("minHour", "")
    
    }
    
    getTimeListing(inc, time, val,title) 

  }
  useEffect(() => {
    if (bookingField && Object.keys(bookingField).length > 0) {

      getTimeListing(null, null, null,"")
    }
  }, [bookingField])
  return (
    <>
      <div
        className={show ? "custom-modal modal fade show" : "custom-modal modal"}
        id="addfield"
        style={show ? { display: "block" } : { display: 'none' }}

      >
        <div className="modal-dialog modal-sm modal-dialog-centered cust-new-modal">
          <div className="modal-content cust-new-proj-modal" ref={refOutsideModel}>
            <div className="modal-header">
              <h4 className="modal-title">Custom Duration</h4>
              <Button
                buttonLabel="Close   &times;"
                className="close"
                handleClick={() => handleClose()}
              />
            </div>

            <div className="modal-body">
              <div className="custmodal-formbox">
              <div className="form-group">
                  <Label label="Increment*" />
                  <Controller
                    control={control}
                    name="increment"
                    rules={
                      {
                        // required: {
                        //   value: true,
                        //   message: `${t("userManagment.error_accesspoint_required")}`,
                        // },
                      }
                    }
                    render={({ field: { onChange, value, name, ref } }: any) => (
                      <Select
                        classNamePrefix="form-control-language"
                        options={Increment}
                        name="increment*"
                        value={Increment?.filter(
                          (c: any) => c.value === value
                        )}
                        onChange={(val: any) => onChangeSelect(val, "inc")}
                        isSearchable
                      />
                    )}
                  />
                  <FeildErrorMessage
                    errors={errors}
                    name="accountManager"
                    containerClass="w-100"
                  />
                </div>

                <div className="form-group">
                  <Label label="Min. Length*" />
                  <Controller
                    control={control}
                    name="minHour"
                    rules={
                      {
                        required: {
                          value: true,
                          message: `${t("Min Duation is required")}`,
                        },
                      }
                    }
                    render={({ field: { onChange, value, name, ref } }: any) => (
                      <Select
                        classNamePrefix="form-control-language"
                        options={minHour}
                        name="minHour"
                        value={minHour?.filter((c: any) => c.value === value)}
                        onChange={(val: any) => onChangeSelect(val, "minHour")}
                        isSearchable
                      />
                    )}
                  />
                  <FeildErrorMessage
                    errors={errors}
                    name="Owner"
                    containerClass="w-100"
                  />
                </div>

                <div className="form-group">
                  <Label label="Max. Length*" />

                  <Controller
                    control={control}
                    name="maxHour"
                    rules={
                      {
                        required: {
                          value: true,
                          message: `${t("Max Duation is required")}`,
                        },
                      }
                    }
                    render={({ field: { onChange, value, name, ref } }: any) => (
                      <Select
                        classNamePrefix="form-control-language"
                        options={maxHour}
                        name="maxHour"
                        value={maxHour?.filter(
                          (c: any) => c.value === value
                        )}
                        onChange={(val: any) => onChange(val.value)}
                        isSearchable
                      />
                    )}
                  />
                  <FeildErrorMessage
                    errors={errors}
                    name="organization"
                    containerClass="w-100"
                  />
                </div>

               
                <CommonErrorMessage
                  // errMessage={apiResponseErr}
                  containerClass="w-100 login_error"
                />
              </div>
              <div className="modal-cs-btnbox">
                <Button
                  buttonLabel="Save"
                  handleClick={handleSubmit(handleSubmitProjectDetail)}
                  className="btn theme-btn invite-model-btn"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {show && <div className="modal-backdrop fade show" />}
    </>
  );
};

export default DurationModal;

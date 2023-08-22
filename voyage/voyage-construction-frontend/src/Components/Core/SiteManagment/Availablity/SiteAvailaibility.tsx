import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Select from "react-select";

// component
import Switch from "../../../UI/Switch/index";
import FeildErrorMessage from "../../../UI/FeildErrorMessage";
import CustomSelect from "../../../UI/Select";
import Input from "../../../UI/Input";
import Image from "../../../UI/Image";
import Button from "../../../UI/Button";

// image
import images from "../../../../Assets/images";
import {
  getSiteAvailablityList,
  getSiteDetail,
  getTimeList,
  updateSiteAvailablityList,
  updateSiteDetail,
} from "../../../../Network/Core/SiteManagement/availability";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { constants } from "../../../../Library/Constants";
import { getLocalStorage } from "../../../../Network/ApiService";
import { isTemplateExpression } from "typescript";
import { getdataAccespointList, getdataASiteList } from "../../../../Network/Core/SiteManagement/siteDetails";
import { getAccountPreferenceDetail } from "../../../../Network/Core/Dashboard/dashboard";
import { formatTime24to12Hour, getLastDayOfYear, lastdayOfMonth } from "../../../../Library/Utils";

// api

// helper

const Site = () => {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const project = getLocalStorage(constants.PROJECT);
  const {
    register, // this use for evnets and value
    handleSubmit, // this is form submit handle
    setError,
    control,
    setValue,
    getValues,
    formState: { errors },
    clearErrors,
  } = useForm();
  const { t } = useTranslation();
  const navigate = useNavigate();
  let dummydata = {
    id: 1,
    isDayActive: false,
    startTimeList: [],
    endTimeList: [],
    isAllDayChecked: false,
    title: "",
  };
  const [timeData, setTimeData] = useState<any>([]);
  const [plan, setPlan] =  useState<any>();
  const [siteId,setSiteId] = useState()
  const [startTime, setStartTime] = useState([
    { label: "30 Minute", value: "30 Minute", time: "00:30:00" },
    { label: "1 Hour", value: "1 Hour", time: "01:00:00" },
    { label: "1 Hour 30 Minute", value: "1 Hour 30 Minute", time: "01:30:00" },
    { label: "2 Hour", value: "2 Hour", time: "02:00:00" },
    { label: "2 Hour 30 Minute", value: "2 Hour 30 Minute", time: "02:30:00" },
    { label: "3 Hour", value: "3 Hour", time: "03:00:00" },
    { label: "3 Hour 30 Minute", value: "3 Hour 30 Minute", time: "03:30:00" },
    { label: "4 Hour", value: "4 Hour", time: "04:00:00" },
  ]);
  const [endTime, setEndTime] = useState([
    { label: "30 Minute", value: "30 Minute", time: "00:30:00" },
    { label: "1 Hour", value: "1 Hour", time: "01:00:00" },
    { label: "1 Hour 30 Minute", value: "1 Hour 30 Minute", time: "01:30:00" },
    { label: "2 Hour", value: "2 Hour", time: "02:00:00" },
    { label: "2 Hour 30 Minute", value: "2 Hour 30 Minute", time: "02:30:00" },
    { label: "3 Hour", value: "3 Hour", time: "03:00:00" },
    { label: "3 Hour 30 Minute", value: "3 Hour 30 Minute", time: "03:30:00" },
    { label: "4 Hour", value: "4 Hour", time: "04:00:00" },
  ]);
  const [endDateDisbaled,setEndDateDisbaled]= useState('')

  let initialTime = [];
  //break Functionality
  const [isAddBreakModelShow, setIsAddBreakModelShow] = useState<any>();
  const [siteListing,setSiteListing] = useState<any>([]);
  const [isShowSiteId,setisShowSiteId] = useState(false);

  const [dayList, setDayList] = useState<any>([
    {
      label: "Sun",
      value: "SUNDAY",
      active: false,
    },
    {
      label: "Mon",
      value: "MONDAY",
      active: false,
    },
    {
      label: "Tue",
      value: "TUESDAY",
      active: false,
    },
    {
      label: "Wed",
      value: "WEDNESDAY",
      active: false,
    },
    {
      label: "Thu",
      value: "THURSDAY",
      active: false,
    },
    {
      label: "Fri",
      value: "FRIDAY",
      active: false,
    },
    {
      label: "Sat",
      value: "SATURDAY",
      active: false,
    },
  ]);
  const [breakList, setBreakList] = useState<any>();
  const [closureList, setClosure] = useState<any>();
  const [startTimeBreak, setStartTimeBreak] = useState<any>();
  const [endTimeBreak, setEndTimeBreak] = useState<any>();
  const [accessPointItems, setAccessPointItems] = useState<any>([]);

  // closure functionality
  const [isAddcloueserModelShow, setIsAddcloueserModelShow] = useState<any>();
  const [dummysiteClosureList, setDummySiteAccespointList] = useState<any>(
    []
  );
  const [timeFormat,setTimeFormat] = useState("24 hour")

  const handleGoClickevent =()=>{

    if(!siteId){
    setError('site',{
    type: "required",
    message: "Please Select site"
    }
    )
    }
    else{
      setisShowSiteId(true)
      getSiteAvailablity(timeData);
      getSiteData()
    }
  }
  
  const handleAddBreak = (status: any) => {
    setIsAddBreakModelShow(status);
  };

  const onChangeImage = (e: any) => {
    const { files, name } = e.target;
    if (files === "") {
      clearErrors(files);
    } else if (!files[0].type.match("image.*")) {
      setError("siteLogo", {
        type: "required",
        message: t("siteDetail.error_image_invalid"),
      });
      // setValue("siteLogo", "");
      return;
    } else {
      // setLogo(file.name)
      // setLogoImage(undefined);
      // setPlan(files[0])
      // setValue("sitePlan",files)
      clearErrors(name);
    }
  };
  const getSiteList = async () => {
    try {
      const res = await getdataASiteList(project.ref, true);
      const { status, data, statusText } = res;
      switch (status) {
        case 200:
          
          var temp :{ label: any; value: any; }[]=[];
          data.results.map((item:any)=>{
            let tempdata={
              label:item.name,
              value:item.id
            }
            temp.push(tempdata);
          })
          setSiteListing(temp);
         
          break;
        case 400:
   
          break;
        case 403:
            if (data.detail === "ERR_login_again_token_expired") {
              toast.error(t("userManagment.error_login_again"));
              localStorage.clear()
              navigate('/login')
            }
  
            break
        default:
      
        
          break;
      }
    } catch (err) {
      toast.error("Somthing went wrong");
    }
  };
  const getTimeListing = async () => {

   
    try {
      const res: any = await getTimeList(project.ref);
      const { status, data } = res;
      switch (status) {
        case 200:
      
          const tempMinLength = data.results.map((item: any) => {
            item.time =  item.time>7 ? item.time.substring(0,item.time.length-3) : item.time
            item.label = timeFormat=== "12 hour" ? formatTime24to12Hour(item.time) : item.time.length>7 ? item.time.substring(0,item.time.length-3) : item.time,
            item.value=item.id
            return item
          });

          let tempTimeData = [...days];
          tempTimeData = tempTimeData.map((obj: any, index) => {
            let item: any = {};
            item.id = index + 1;
            item.isDayActive = false;
            item.startTimeList = [...tempMinLength];
            item.endTimeList = [...tempMinLength];
            item.isAllDayChecked = false;
            item.title = obj;
            item.isDisabledDay = true;
            item.isDisabledCheck = true;
            return item;
          });
          setTimeData(tempTimeData);
          setStartTime(tempMinLength);
          setEndTime(tempMinLength);
          setStartTimeBreak(tempMinLength);
          setEndTimeBreak(tempMinLength);
          getSiteAvailablity(tempTimeData)
          initialTime = tempMinLength;
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
  const onChangeSelect = (val: any, title: string, index: any) => {
    setValue(title, val.value);
    function checkMinHour(item: any) {
      return item.id === val.id;
    }
    if (title.includes("startTime")) {
      let tempEndTime: any = [];
      const tempTimeData = [...timeData];
      tempTimeData.map((item, i) => {
        if (index === i) {
          tempEndTime = item.startTimeList;
          let index = tempEndTime.findIndex(checkMinHour);
          item.start = tempEndTime[index].time;
          tempEndTime = tempEndTime.slice(index + 1, tempEndTime.length);
          item.endTimeList = tempEndTime;
        }
        return item;
      });
      setTimeData(tempTimeData);
    } else {
      // let tempEndTime: any = []
      const tempTimeData = [...timeData];
      tempTimeData.map((item, i) => {
        if (index === i) {
          let index = item.endTimeList.findIndex(checkMinHour);
          item.end = item.endTimeList[index].time;
        }
        return item;
      });
      setTimeData(tempTimeData);
    }
  };
  const replaceImgText=(html:any)=> {
    let imgTemp: Array<any> = []
    if (html !== undefined)
    {
      
       var ret = html.replace(/<img[^>]*src="(http(s?):)|([/|.|\w|\s])"/gi,function (img:any) {
        imgTemp.push(img)
        return '';
      });
  
      let startIndex = html.indexOf(imgTemp[0])
      let endIndex = html.indexOf(imgTemp[1])
      ret = ret.substring(0,startIndex)+ret.substring(endIndex,ret.length)
   
      return ret;
    }
     return ""
    }
  const handleChangeCheckbox = (e: any, index: Number) => {
    const { checked, name } = e.target;

    if (name.includes("days")) {
      const tempTimeData = [...timeData];
      tempTimeData.map((item, i) => {
        if (index === i) {
          // setValue("days:" + item.id, checked)

          if (checked) {
            item.isOpen= true
            item.isDisabledDay = false;
            item.isDisabledCheck = false;
          } else {
            setValue("startTime:" + item.id, {});
            setValue("endTime:" + item.id, {});
            item.isDisabledDay = true;
            item.isDisabledCheck = true;
            item.isOpen= false
          }
        }
        return item;
      });
      setTimeData(tempTimeData);
    } else {
      const tempTimeData = [...timeData];
      tempTimeData.map((item, i) => {
        if (index === i) {
          // setValue("allday:" + item.id, checked)
          item.isAllDayChecked = checked;

          if (checked) {
            setValue("startTime:" + item.id, {});
            setValue("endTime:" + item.id, {});
            item.isDisabledDay = true;
          } else {
            item.isDisabledDay = false;
          }
        }
        return item;
      });
      setTimeData(tempTimeData);
    }
  };
//   const getSiteAvailablity = async () => {
//     try {
//       const res: any = await getSiteAvailablityList(project.ref);
//       const { status, data } = res;
//       switch (status) {
//         case 200:
//           if (data.length > 0) {
//             setValue("id", data[0]?.id);
//             setValue("name", data[0]?.name);
//             setValue("bookingProcessMessage", data[0]?.bookingMessage);
//             setValue(
//               "daysAllowedInAdvance",
//               data[0]?.advancedBooking?.daysAllowedInAdvance
//             );
//             setValue(
//               "hoursAllowedBeforeDelivery",
//               data[0]?.advancedBooking?.hoursAllowedBeforeDelivery
//             );
//             const tempTimeData = [...timeData];
//             tempTimeData &&
//               tempTimeData.length > 0 &&
//               tempTimeData?.map((timeItem: any) => {
//                 data[0]?.operationHours?.map((item: any) => {
//                   let dummmyStartTimeData = {
//                     label: "",
//                     value: "",
//                   };
//                   let dummmyEndTimeData = {
//                     label: "",
//                     value: "",
//                   };
//                   dummmyStartTimeData = {
//                     label:
//                       item?.start.split(":")[0] +
//                       " Hour " +
//                       item?.start.split(":")[1] +
//                       " Minute ",
//                     value: timeItem?.startTimeList?.find(
//                       (startListItem: any) =>
//                         startListItem?.time?.trim() === item?.start?.trim()
//                     ).id,
//                   };
//                   dummmyEndTimeData = {
//                     label:
//                       item?.start.split(":")[0] +
//                       " Hour " +
//                       item?.start.split(":")[1] +
//                       " Minute ",
//                     value: timeItem?.endTimeList?.find(
//                       (startListItem: any) =>
//                         startListItem?.time?.trim() === item?.end?.trim()
//                     ).id,
//                   };
// 
//                   if (timeItem.title.toLowerCase() === item.day.toLowerCase()) {
//                     if (!timeItem.isAllDayChecked) {
//                       setValue(
//                         "startTime:" + timeItem.id,
//                         dummmyStartTimeData?.value
//                       );
//                       setValue(
//                         "endTime:" + timeItem.id,
//                         dummmyEndTimeData?.value
//                       );
//                       setValue("allday:" + timeItem.id, item.allDay);
//                       setValue(
//                         "days:" + timeItem.id,
//                         dummmyStartTimeData ? true : false
//                       );
//                       timeItem.isDisabledCheck = false;
//                       timeItem.isDisabledDay = false;
//                     }
//                     timeItem.start = item?.start;
//                     timeItem.end = item?.end;
//                   }
//                   return item;
//                 });
// 
//                 return timeItem;
//               });
// 
//             let tempDayList = [...dayList];
//             data[0]?.breaks.map((breakItem: any) => {
//               breakItem.tempDayList = [];
//               tempDayList.map((item: any) => {
//                 if (breakItem.days.includes(item.value)) {
//                   breakItem.tempDayList.push({
//                     value: item.value,
//                     active: true,
//                     label: item.label,
//                   });
//                 } else {
//                   breakItem.tempDayList.push({
//                     value: item.value,
//                     active: false,
//                     label: item.label,
//                   });
//                 }
//               });
//               return breakItem;
//             });
// 
//             setBreakList(data[0]?.breaks);
//             setBreakList(data[0]?.closures);
//             setPlan(data[0].plan);
//           }
//           break;
//         case 400:
//           break;
//         case 403:
//           if (data.detail === "ERR_login_again_token_expired") {
//             toast.error(t("userManagment.error_login_again"));
//             localStorage.clear();
//             navigate("/login");
//           }
// 
//           break;
//         default:
//           break;
//       }
//     } catch (err) {
//       toast.error(t("error1"));
//     }
//   };
  const handleUpdateAvailablity = async (availablityData: any) => {
    const openHourData: any = [];
  
    timeData.map((item: any) => {
      if (item.isAllDayChecked)
      {
        openHourData.push({
          day: item.title,
          start: "00:00:00",
          end: "23:30:00",
          all_day: item.isAllDayChecked,
          isOpen:item.isOpen
        });
        }
      else {
        
        openHourData.push({
          day: item.title,
          start: item.start,
          end: item.end,
          all_day: item.isAllDayChecked,
          isOpen:item.isOpen
        });
        }
    });
   
      const siteData = new FormData()
      // updatedData.append("advanced_booking.days_allowed_in_advance",availablityData.daysAllowedInAdvance)
      // updatedData.append("advanced_booking.hours_allowed_before_delivery",availablityData.hoursAllowedBeforeDelivery)
      if (availablityData.sitePlan[0])
      {
        
        siteData.append("plan",availablityData.sitePlan[0])
        }
        siteData.append("booking_message",availablityData.bookingProcessMessage)
      
      handleUpdateSiteAPI(siteData);

     
      
      const updatedData = {
        operation_hours: openHourData,     
        advanced_booking: {
          site: availablityData.id,
          days_allowed_in_advance: availablityData.daysAllowedInAdvance,
          hours_allowed_before_delivery:
            availablityData.hoursAllowedBeforeDelivery,
        },
       
      };
      handleUpdateAvailablityAPI(updatedData, availablityData.id);
      
  };

 

  const handleUpdateAvailablityAPI = async (updatedData: any, id: any) => {
    try {
      const url = updateSiteAvailablityList(project.ref, updatedData, siteId)     
      const res: any = await url;
      const { status, data } = res;
      switch (status) {
        case 200:
          getSiteAvailablity(timeData);
          toast.success(" Site Availability Create/Update Successfully");
          handleAddBreak(false);
          handleAddclousureClick(false);
          if(Object.keys(updatedData)[0]==='breaks'){
          const tempItem: Array<any> = [...breakList];
          tempItem.map((item:any) => {
            if (item.id === id)
            {
              item.isOpen= false
              }
              return item
          })
         
          setBreakList(tempItem);
          }
          else if (Object.keys(updatedData)[0] == 'closures') {
            
            const tempclosureItem: Array<any> = [...closureList];          
            tempclosureItem.map((item) => {
              if (item.id === id)
              {
                item.isOpen= false
                }
                return item
            })
           
            setClosure(tempclosureItem);
          }
          break;
        case 201:
          getSiteAvailablity(timeData);
          break;
        case 400:
          break;
        case 403:
          if (data.detail === "ERR_login_again_token_expired") {
            toast.error(t("userManagment.error_login_again"));
            localStorage.clear();
            navigate("/login");
          }

          break;
        default:
          break;
      }
    } catch (err) {
      toast.error(t("userManagment.error_something_went_wrong"));
    }
  };
  const handleUpdateSiteAPI = async (updatedData: any) => {
    try {
      const url = updateSiteDetail(project.ref, updatedData, siteId)     
      const res: any = await url;
      const { status, data } = res;
      switch (status) {
        case 200:
          getSiteData();
          toast.success(" Site Detail Update Successfully");
         
          break;
        case 201:
          getSiteAvailablity(timeData);
          break;
        case 400:
          break;
        case 403:
          if (data.detail === "ERR_login_again_token_expired") {
            toast.error(t("userManagment.error_login_again"));
            localStorage.clear();
            navigate("/login");
          }

          break;
        default:
          break;
      }
    } catch (err) {
      toast.error(t("userManagment.error_something_went_wrong"));
    }
  };
  const getSiteData = async() => {
    try {
      const url = getSiteDetail(project.ref, siteId)     
      const res: any = await url;
      const { status, data } = res;
      console.log('data :>> ', data);
      switch (status) {
        case 200:         
        setValue("id", data.id)
        setValue("name", data.name)
        setValue("bookingProcessMessage", data?.bookingMessage?data?.bookingMessage:'')
        setPlan(data.plan)
          break;
       
        case 400:
          break;
        case 403:
          if (data.detail === "ERR_login_again_token_expired") {
            toast.error(t("userManagment.error_login_again"));
            localStorage.clear();
            navigate("/login");
          }

          break;
        default:
          break;
      }
    } catch (err) {
      toast.error(t("userManagment.error_something_went_wrong"));
    }
  }
  const onChangeText = (e: any) => {
    if (e === "") {
      setError("bookingProcessMessage", {
        type: "required",
        message: t("siteDetail.error_homemessage_required"),
      });
    } else {
      setValue("bookingProcessMessage", e);
      clearErrors("bookingProcessMessage");
    }
  };
  // Break Functionality
  const handleAddClick = (status: any) => {
    setIsAddBreakModelShow(status);
    setValue(`name`, "");
    setValue("startTime", "");
    setValue("endTime", "");
    setDayList([
      {
        label: "Sun",
        value: "SUNDAY",
        active: false,
      },
      {
        label: "Mon",
        value: "MONDAY",
        active: false,
      },
      {
        label: "Tue",
        value: "TUESDAY",
        active: false,
      },
      {
        label: "Wed",
        value: "WEDNESDAY",
        active: false,
      },
      {
        label: "Thu",
        value: "THURSDAY",
        active: false,
      },
      {
        label: "Fri",
        value: "FRIDAY",
        active: false,
      },
      {
        label: "Sat",
        value: "SATURDAY",
        active: false,
      },
    ]);
  };
  const onChange = (e: any) => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        if (value === "") {
          setError(name, {
            type: "required",
            message: "Name is required",
          });
        } else {
          clearErrors(name);
        }
        break;
      case "startTime":
        if (value === "") {
          setError(name, {
            type: "required",
            message: "startTime is required",
          });
        } else {
          clearErrors(name);
        }
        break;
      case "endTime":
        if (value === "") {
          setError(name, {
            type: "required",
            message: "endTime is required",
          });
        } else {
          clearErrors(name);
        }
        break;
      default:
        break;
    }
  };
    const getSiteAvailablity = async (timeData:any) => {
        try {
            const res: any = await getSiteAvailablityList(project.ref,siteId);
            const { status, data } = res;
            switch (status) {
              case 200:
               
                    if (data) {
                        
                        setValue("daysAllowedInAdvance", data.advancedBooking?.daysAllowedInAdvance)
                        setValue("hoursAllowedBeforeDelivery", data.advancedBooking?.hoursAllowedBeforeDelivery)
                        const tempTimeData = [...timeData]
                        data.operationHours &&  data.operationHours?.map((item: any) => {
                                tempTimeData && tempTimeData.length>0 && tempTimeData?.map((timeItem: any) => {
                                let dummmyStartTimeData = {
                                    label: '',
                                    value: ''
                                }
                                let dummmyEndTimeData = {
                                    label: '',
                                    value: ''
                                }
                                dummmyStartTimeData = {
                            
                                  // label: item?.start.split(":")[0] + " Hour " + item?.start.split(":")[1] + " Minute ",
                                  label: item?.start,
                                  value: timeItem?.startTimeList?.find((startListItem: any) => startListItem?.time?.trim() === item?.start || startListItem?.time?.trim() === item?.start.trim().substring(0,item.start.length-3))?.id
                                }
                                dummmyEndTimeData = {
                            
                                    // label: item?.start.split(":")[0] + " Hour " + item?.start.split(":")[1] + " Minute ",
                                  label: item?.start,                                  
                                  value: timeItem?.endTimeList?.find((startListItem: any) => startListItem?.time?.trim() ===item?.end || startListItem?.time?.trim() === item?.end.substring(0,item.end.length-3).trim())?.id
                                }
                                  
                                if (timeItem.title.toLowerCase() === item.day.toLowerCase()) {
                                    // if (!timeItem.isAllDayChecked) {
                                      timeItem.isDisabledCheck=false
                                      timeItem.isDisabledDay=false
                                      
                                      if (item.allDay)
                                      {
                                    setValue("allday:" + timeItem.id, item.allDay)
                                  }
                                  else {
                                    if(item.isOpen)
                                    {
                                   
                                      setValue("startTime:" + timeItem.id, dummmyStartTimeData?.value)
                                      setValue("endTime:" + timeItem.id, dummmyEndTimeData?.value)
                                    }
                                    else{
                                      timeItem.isDisabledCheck=true
                                      timeItem.isDisabledDay=true
                                    }
                                  }
                           
                                        setValue("days:" + timeItem.id,item.isOpen)
                                       
                                        timeItem.isOpen = item.isOpen
                                    // }
                                  
                                    setValue("allday:" + timeItem.id, item.allDay)
                                    timeItem.start = item?.start
                                    timeItem.end = item?.end
                                }
                                // setValue("allday:" + timeItem.id, item.allDay)
                               
                        
                                return timeItem
                            })
                            return item
                        
                        })
                        setTimeData(tempTimeData)
                        

                      
                        let tempDayList = [...dayList];
                        data?.breaks && data.breaks.length>0 && data.breaks?.map((breakItem: any) => {
                                      breakItem.tempDayList = [];
                                      tempDayList.map((item: any) => {
                                        if (breakItem.days.includes(item.value)) {
                                          breakItem.tempDayList.push({
                                            value: item.value,
                                            active: true,
                                            label: item.label,
                                          });
                                        } else {
                                          breakItem.tempDayList.push({
                                            value: item.value,
                                            active: false,
                                            label: item.label,
                                          });
                                        }
                                      });
                                      return breakItem;
                                    });
                                    let temp1DayList = [...dayList];
                                    const tempMinLength = [...startTime];
                      
                                    data.breaks?.map((breakItem: any,i:number) => {

                                      setValue(`name:${i}`, breakItem.name);
                                      setValue(
                                        `breakEditStartTime:${i}`,
                                        tempMinLength.filter((item: any) => item.time ===breakItem.start)[0]?.value
                                      );
                                      setValue(
                                        `breakEditEndTime:${i}`,
                                        tempMinLength.filter((item: any) => item.time ===breakItem.end)[0]?.value
                                      );


                                      breakItem.startTimeList = tempMinLength
                                      breakItem.endTimeList =  tempMinLength
                                      breakItem.DayDisplayList = [];
                                      temp1DayList.map((item: any) => {
                                        if (breakItem.days.length==7) {
                                          breakItem.DayDisplayList = [];
                                          breakItem.DayDisplayList.push('All Days');
                                        } else {
                                      
                                       breakItem.days.map((i:any)=>{
                                        if(i==item.value){
                                          breakItem.DayDisplayList.push(
                                            item.label
                                           );
                                        }
                                     
                                        }) 
                                        }
                                      });
                                      return breakItem;
                                    });
                                    let trmpresorceList = [...dummysiteClosureList];
                                    data.closures?.map((closure: any) => {
                                      closure.tempDisplayNameaccesspoint = [];
                                      trmpresorceList.map((item: any) => {
                                        
                                        if (closure.accessPoints.length === trmpresorceList.length) {
                                          closure.tempDisplayNameaccesspoint = [];
                                          closure.tempDisplayNameaccesspoint.push("All Accesspoint");
                                        } else {
                                        
                                          if (closure.accessPoints.length){
                                            closure.accessPoints.map((accesspoint:any)=>{

                                    
                                             if(accesspoint==item.id){
                                              closure.tempDisplayNameaccesspoint.push(item.name);
                                             }
                                          
                                            })
                                          
                                          
                                            
                                          }
                                          
                                          
                                        }
                                      });
                                      return closureList;
                                    });

                                    data.closures?.map((item:any,i:number) => {          
            
                                      item.disbaleEndDate=disableEndDateEdit(item.startDate)            
                                      return item            
                                    })
                      
                                    setBreakList(data.breaks);
                                    setClosure(data.closures);

                    }
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
} catch(err){
  console.log(err);
  
}
    };
  const handleadddaylist = (data: any) => {
    const tempDayListData: any = [...dayList];
    tempDayListData.map((item: any) => {
      if (item.label == data.label) {
        item.active = !data.active;
      }
    });
    setDayList(tempDayListData);
    if (tempDayListData.find((item: any) => item.active))
    {
      clearErrors("daysActiveBreak")
    }
  };
  const handlechangedaylist = (data: any, index: any) => {
    const tempData = [...breakList];
    tempData.map((item: any) => {
      item.tempDayList[index].active = !item.tempDayList[index].active;
    });
    setBreakList(tempData);
    if (tempData.find((item: any) => item.tempDayList[index].active))
    {
      clearErrors(`daysActiveBreak:${index}`)
    }
  };
  const handleGetEndPoint = async (val: any) => {
    try {
      const res: any = await getTimeList(project.ref);
      const { status, data } = res;
      switch (status) {
        case 200:
          const tempMinLength = data.results.map((item: any) => {
            item.label = timeFormat=== "12 hour" ? formatTime24to12Hour(item.time) : item.time.length>7 ? item.time.substring(0,item.time.length-3) : item.time,
          
              // item.label = item.time,
              item.value = item.id
              return item;
          });
          let tempTimeData = [...days];
          tempTimeData = tempTimeData.map((obj: any, index) => {
            let item: any = {};
            item.id = index + 1;
            item.isDayActive = false;
            item.startTimeList = [...tempMinLength];
            item.endTimeList = [...tempMinLength];
            item.isAllDayChecked = false;
            item.title = obj;
            item.isDisabledDay = true;
            item.isDisabledCheck = true;
            return item;
          }); 
          
          const tempEndData = [...tempMinLength];
          let array: any[] = [];
          tempEndData.map((item: any) => {
            if (val <item.time) {
              array.push(item);
            }
          });
          setEndTimeBreak(array);
          initialTime = tempMinLength;
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
  const onChangeStartTime = (val: any) => {
    setEndTimeBreak([]);
    handleGetEndPoint(val);
    setValue("breakStartTime", val);
  };
 
  const onChangeStartTimeEdit = (val: any, title: string, index: any) => {
 
    function checkMinHour(item: any) {
      return item.id === val.id;
    }
    if (title.includes("startTime")) {
      setValue("breakEditStartTime:"+index, val);
      setValue("breakEditEndTime:"+index, '');
      let tempEndTime: any = [];
      const tempTimeData = [...breakList];
      tempTimeData.map((item, i) => {
        if (index === i) {
          tempEndTime = item.startTimeList;
          let index = tempEndTime.findIndex(checkMinHour);
          item.start = tempEndTime[index].time;
          tempEndTime = tempEndTime.slice(index + 1, tempEndTime.length);
          item.endTimeList = tempEndTime;
        }
        return item;
      });
      setBreakList(tempTimeData);
    } else {
      setValue("breakEditEndTime:"+index, val);
      const tempTimeData = [...breakList];
      tempTimeData.map((item, i) => {
        if (index === i) {
          let index = item.endTimeList.findIndex(checkMinHour);
          item.end = item.endTimeList[index].time;
        }
        return item;
      });
      setBreakList(tempTimeData);
    }
  };

  const onSubmitAddbreak = async (breakData: any) => {
    
    let days: any[] = [];
    if (!dayList.find((item: any) => item.active)) {
      setError("daysActiveBreak", {
        type: 'required',
        message: "Please Select Days"
      })
    }
    else {
      dayList.map((item: any) => {
        if (item.active === true) {
          days.push(item.value);
        }
      });
    
      const data = {
        breaks: [
          ...breakList,
          {
            name: breakData.name,
            start: breakData.breakStartTime,
            end: breakData.breakEndTime,
            days: days,
          },
        ],
      };
      handleUpdateAvailablityAPI(data, breakData.id);
    }
  };
  const handleEdit = (status: any, i: number) => {
    const tempItem: Array<any> = [...breakList];
    tempItem[i].isOpen = status;
    // setValue(`name:${i}`, breakList[i].name);
    // setValue(
    //   `breakEditStartTime:${i}`,
    //   startTimeBreak.find((item: any) => item.time === breakList[i].start)
    // );
    // setValue(
    //   `breakEditEndTime:${i}`,
    //   endTimeBreak.find((item: any) => item.time === breakList[i].end)
    // );

    setBreakList([...tempItem]);
  };
  
  const handleRemovebreakListItem = async (data: any, i: number, id: any) => {
    const list = [...breakList];
    list.splice(i, 1);
    let deletedobj={
      id:id,
      remove:true
    }
    list.push(deletedobj);
    var data1={
      breaks:list
    }
    handleUpdateAvailablityAPI(data1, data.site);


  };
  const onSubmitEditbreak = async (
    userData: any,
    i: number,
    data: any,
    id: any
  ) => {

    let days: any[] = [];
    if (!data.tempDayList.find((item: any) => item.active)) {
      setError("daysActiveBreak:" + i, {
        type: 'required',
        message: "Please Select Days"
      })
    }
    else {
      data.tempDayList.map((item: any) => {
        if (item.active === true) {
          days.push(item.value);
        }
      });
      const list = [...breakList];
      list.splice(i, 1);
      const data1 = {
        breaks: [
          ...list,
          {
            id: id,
            site: data.site,
            name: userData[`name:${i}`],
            start: userData[`breakEditStartTime:${i}`].time,
            end: userData[`breakEditEndTime:${i}`].time,
            days: days,
          },
        ],
      };
      handleUpdateAvailablityAPI(data1, data.site);
    }
  };
  const getAccountPreference = async () => {
    try {
     
      const res = await getAccountPreferenceDetail(project.ref);
      const { status, data } = res;
      switch (status) {
        case 200:
          setTimeFormat(data?.timeFormat?.format)
          break;
        case 400:
          break;
        case 403:
            if (data.detail === "ERR_login_again_token_expired") {
              toast.error(t("userManagment.error_login_again"));
              localStorage.clear()
              navigate('/login')
            }
            break
        default:
          break;
      }
    } catch (err) {
      // setIsLoading(false);
      toast.error(t("userManagment.error_something_went_wrong"));
    }
  };
  //Closure
  const getAccespointList = async () => {
    try {
      const res = await getdataAccespointList(project.ref,siteId, true);
      const { status, data, statusText } = res;
      switch (status) {
        case 200:
          // setAccessPointItems(data.results);
          // let Array: any[] = [];
          // res.data.results.map((item: any) => {
          //   Array.push(item.id);
          // });
          // setResourceList(Array);
          let tempAllId: any = [];
          let temdataaccessPointss: { label: any; value: any }[] = [];
          
            res.data.results.map((item: any) => {
              let obj = {
                label: item.name,
                value: item.id,
              };
              tempAllId.push(item.id);
              temdataaccessPointss.push(obj);
            });
            let all: any = [
              {
                label: "All",
                value: 'All',
              },
            ];
            if(res.data.results.length>0)
          {
  
            setAccessPointItems([...all, ...temdataaccessPointss]);
          }
          else{
            setAccessPointItems([ ...temdataaccessPointss]);
          }
          setDummySiteAccespointList(res.data.results);
          break;
        case 400:
          break;
        case 403:
          if (data.detail === "ERR_login_again_token_expired") {
            toast.error(t("userManagment.error_login_again"));
            localStorage.clear();
            navigate("/login");
          }

          break;
        default:
          break;
      }
    } catch (err) {
      toast.error("Somthing went wrong");
    }
  };
  const onchangeAccespoint = (data:any)=>{
    
    if(data.find((item: any) => item.label == 'All')){
     
      setValue('accessPoints', {
        label: "All",
        value: 'All',
      })
    }
    else{
      setValue('accessPoints', data);
    
    }
  }
  const onchangeAccespointEdit = (data:any,i:any)=>{
    
    if(data.find((item: any) => item.label == 'All')){
     
      setValue(`accessPoints:${i}`, {
        label: "All",
        value: 'All',
      })
    }
    else{
    
      setValue(`accessPoints:${i}`, data);
    }
  }
  const handleAddclousureClick = (status: any) => {
    setIsAddcloueserModelShow(status);
    setValue(`startDate`, "");
    setValue("endDate", "");
    setValue("accessPoints", "");
  };

  const onSubmitAddcloueser = async (cloueserData: any) => {
    
    let accessPointsdata: any[] = [];
    if(cloueserData.accessPoints.label=='All'){
      dummysiteClosureList.map((item:any)=>{
        
        accessPointsdata.push(item.id);

      })
    }
    else{
      cloueserData.accessPoints.map((item: any) => {
        accessPointsdata.push(item.value);
      });
    }
    
    const data = {
      closures: [
        ...closureList,
        {
          start: cloueserData.startDate,
          end: cloueserData.endDate,
          access_points: accessPointsdata,
        },
      ],
    };
    handleUpdateAvailablityAPI(data, cloueserData.id);
  };

  const handleClosureEdit = (status: any, i: number) => {
    const tempItem: Array<any> = [...closureList];
    tempItem[i].isOpen = status;
        
    let array: { label: any; value: any }[] = [];
    closureList[i]?.accessPoints.map((i:any)=>{
      let selectedAccessPoint=dummysiteClosureList.find((item: any) => item.id === i);
      let tempresources = {
        label: selectedAccessPoint?.name,
        value: selectedAccessPoint?.id,
      };
      array.push(tempresources);
    })


    

    setValue(`startDate:${i}`, closureList[i].start);
    setValue(`endDate:${i}`, closureList[i].end);
    setValue(`accessPoints:${i}`, array);
    setClosure([...tempItem]);
  };

  const handleRemoveclosureListItem = async (data: any, i: number, id: any) => {
    const list = [...closureList];
    list.splice(i, 1);
    let deletedobj={
      id:id,
      remove:true
    }
    list.push(deletedobj);
    let updateData={closures:list}
    handleUpdateAvailablityAPI(updateData, data.site);
  };

  const onSubmitEditclosure = async (
    userData: any,
    i: number,
    data: any,
    id: any
  ) => {
  
    let accessPoints: any[] = [];
    // userData[`accessPoints:${i}`].map((item: any) => {
    //   accessPoints.push(item.value);
    // });
    if( userData[`accessPoints:${i}`].label=='All'){
      dummysiteClosureList.map((item:any)=>{
        
        accessPoints.push(item.id);

      })
    }
    else{
       userData[`accessPoints:${i}`].map((item: any) => {
        accessPoints.push(item.value);
      });
    }
    const list = [...closureList];
    list.splice(i, 1);
    const data1 = {
      closures: [
        ...list,
        {
          id: id,
          site: data.site,
          start: userData[`startDate:${i}`],
          end: userData[`endDate:${i}`],
          access_points: accessPoints,
        },
      ],
    };
    handleUpdateAvailablityAPI(data1, data.site);
  };
  
//for disabled past data
const onChangeStartDate = (e:any) => {
  setValue("startDate",e.target.value)
  setValue("endDate",'')
  disableEndDate(e.target.value)
  }
  const onChangeStartDateInEdit = (e:any,index:number) => {
    setValue(`startDate:${index}`, e.target.value)
    setValue(`endDate:${index}`, '')
    const temp=[...closureList]
    temp.map((item,i) => {
      if (i === index)
      {
        
      item.disbaleEndDate=disableEndDateEdit(e.target.value)
      }
      return item
    })
    setClosure(temp)
    
  }
const disablePastDate = () => {
  const today = new Date();
  let dd = String(today.getDate() ).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = today.getFullYear();
  const lstdayofMonth = lastdayOfMonth(yyyy,today.getMonth() + 1) 
  if (lstdayofMonth === Number(today.getDate()))
  {
    mm =String(today.getMonth() + 2).padStart(2, "0") 
    dd="01"
  }
  const lstdayofyear = getLastDayOfYear(yyyy)
  if (JSON.stringify(today) === JSON.stringify(lstdayofyear))
  {
    yyyy = today.getFullYear()+1;
    mm = "01"
    dd="01"
  } 
  return yyyy + "-" + mm + "-" + dd;
};
 
  
const disableEndDate = (startDate:any) => {
  const today =startDate ? new Date(startDate) : new Date()
  let dd = String(today.getDate() ).padStart(2, "0");
  let yyyy = today.getFullYear();
  let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0! 
  const lstdayofMonth = lastdayOfMonth(yyyy,today.getMonth() + 1) 
  if (lstdayofMonth === Number(today.getDate()))
  {
    mm =String(today.getMonth() + 2).padStart(2, "0") 
    dd="01"
  }
  const lstdayofyear = getLastDayOfYear(yyyy)
  if (JSON.stringify(today) === JSON.stringify(lstdayofyear))
  {
    yyyy = today.getFullYear()+1;
    mm = "01"
    dd="01"
  } 
  setEndDateDisbaled(yyyy + "-" + mm + "-" + dd);
};
const disableEndDateEdit = (startDate:any) => {
  const today =startDate ? new Date(startDate) : new Date()
  let dd = String(today.getDate() ).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = today.getFullYear();
  const lstdayofMonth = lastdayOfMonth(yyyy,today.getMonth() + 1) 
  if (lstdayofMonth === Number(today.getDate()))
  {
    mm =String(today.getMonth() + 2).padStart(2, "0") 
    dd="01"
  }
  const lstdayofyear = getLastDayOfYear(yyyy)
  if (JSON.stringify(today) === JSON.stringify(lstdayofyear))
  {
    yyyy = today.getFullYear()+1;
    mm = "01"
    dd="01"
  } 
  return yyyy + "-" + mm + "-" + dd;
};
const onChangeSite =(val:any)=>{
  clearErrors('site');
  setSiteId(val);
  }

  

  useEffect(() => {
    getAccountPreference()
    getSiteList()

  }, []);
  useEffect(() => {
    if (siteId)
    {
      
      getTimeListing();
      getAccespointList();
      }
  },[timeFormat,siteId])

 

  return (
    <div
      className="tab-pane fade show active"
      id="nav-site"
      role="tabpanel"
      aria-labelledby="nav-site-tab">
        <div className="row">
          <div className="col-sm-8">
            <div className="form-group">
              <label>Select Site</label>
              <Controller
                control={control}
                name="site"
                
                render={({ field: { onChange, value } }: any) => (
                  <Select
                    // inputRef={ref}
                    classNamePrefix={
                      errors["calenderDay"]
                        ? "error form-control-language"
                        : "form-control-language"
                    }
                    // defaultValue={selectedcalenderDaysList[0].value}
                    options={siteListing}
                    id="site"
                    name="site"
                    value={siteListing?.find(
                      (c: any) => c.value === value?.value
                    )}
                    onChange={(val: any) => onChangeSite(val.value)}
                  />
                )}
              />
              <FeildErrorMessage
                errors={errors}
                name="site"
                containerClass="w-100"
              />
            </div>
          </div>
          <div className="col-sm-4">
            <div className="form-group">
            
            <Button
            buttonLabel="GO"
            handleClick={() => handleGoClickevent()}
            className="btn theme-btn custom_go"
          />
            </div>
          </div>
                </div>
       
      {isShowSiteId &&
        <>
          <div className="vehicle-form contact-list">
            <div className="vh-form-header">
              <h3>Hours of Operation</h3>
            </div>
            <div className="table-responsive hoursof-op resources-table">
              <table className="table">
                <tbody>
                  {timeData.map((timeDataItem: any, index: Number) => (
                    <tr>
                      <td className="day-switch">
                        <Switch
                          index={index}
                          name={"days:" + timeDataItem.id}
                          holiday={false}
                          title={timeDataItem.title}
                          register={register}
                          handleChangeCheckbox={handleChangeCheckbox}
                        />
                      </td>
                      <td>
                        <div className="from-to-datebox">
                          <div className="form-group mb-0 to-input mr-2">
                            <CustomSelect
                              control={control}
                              name={"startTime:" + timeDataItem.id}
                              options={timeDataItem.startTimeList}
                              errors={errors}
                              onChangeSelect={onChangeSelect}
                              rules={""}
                              index={index}
                              disbaled={timeDataItem.isDisabledDay}
                            />
                          </div>
                          <div className="form-group mb-0 to-input">
                            <CustomSelect
                              control={control}
                              name={"endTime:" + timeDataItem.id}
                              options={timeDataItem.endTimeList}
                              errors={errors}
                              onChangeSelect={onChangeSelect}
                              rules={""}
                              index={index}
                              disbaled={timeDataItem.isDisabledDay}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="selall-day">
                        <div className="max-quantity-box">
                          <div className="form-check">
                            <label
                              className="form-check-label"
                              htmlFor={"allday:" + timeDataItem.id}>
                              <input
                                type="checkbox"
                                className={`form-check-input ${timeDataItem.isDisabledCheck && "disbaled"
                                  }`}
                                disabled={timeDataItem.isDisabledCheck}
                                {...register(`allday:${timeDataItem.id}`)}
                                onChange={(e) => handleChangeCheckbox(e, index)}
                                id={"allday:" + timeDataItem.id}
                              />
                              <span
                                className={
                                  timeDataItem.isDisabledCheck && "disbaled"
                                }>
                                All Day
                              </span>
                            </label>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="row availability-margin">
            <div className="col-xl-6 col-lg-6 col-md-12">
              <div className="vehicle-form contact-list">
                <div className="vh-form-header">
                  <h3>Breaks</h3>
                  <Link to="" id="btn-add-break-site" onClick={() => handleAddClick(true)}>
                    <img src={images.plusThemeSvg} />
                  </Link>
                </div>

                {isAddBreakModelShow && (
                  <div className="vehicle-form edit-contact-form">
                    <h3>Add Break</h3>
                    <form>
                      <div className="form-group">
                        <label>Name</label>
                        <Input
                          inputName="name"
                          className={
                            errors["name"] ? "form-control error" : "form-control"
                          }
                          register={register}
                          rules={{
                            required: {
                              value: true,
                              message: "Name is required",
                            },
                            onChange: (e: any) => onChange(e),
                          }}
                          id="resourceBreak_name"
                          inputType="text"
                        />
                        <FeildErrorMessage
                          errors={errors}
                          name="name"
                          containerClass="w-100"
                        />
                      </div>
                      <div className="form-group">
                        <label>Days Active</label>
                        <div className="daylist-box">
                          <ul className="daylist">
                            {dayList.map((item: any) => (
                              <li className="dayname">
                                <Link
                                  className={item.active === true ? "active" : ""}
                                  onClick={() => handleadddaylist(item)}
                                  to="">
                                  {item.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <FeildErrorMessage
                              errors={errors}
                              name={`daysActiveBreak`}
                              containerClass="w-100"
                            />
                      </div>
                      <div className="row">
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label>Start Time</label>
                            <Controller
                              control={control}
                              name="breakStartTime"
                              rules={{
                                required: {
                                  value: true,
                                  message: 'Start Time add is required',
                                },
                              }}
                              render={({ field: { onChange, value } }: any) => (
                                <Select
                                  // inputRef={ref}
                                  classNamePrefix={
                                    errors["calenderDay"]
                                      ? "error form-control-language"
                                      : "form-control-language"
                                  }
                                  // defaultValue={selectedcalenderDaysList[0].value}
                                  options={startTimeBreak}
                                  id="breakStartTime"
                                  name="breakStartTime"
                                  value={startTimeBreak?.find(
                                    (c: any) => c.value === value?.value
                                  )}
                                  onChange={(val: any) =>
                                    onChangeStartTime(val.time)
                                  }
                                />
                              )}
                            />
                            <FeildErrorMessage
                              errors={errors}
                              name="breakStartTime"
                              containerClass="w-100"
                            />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label>End Time</label>
                            <Controller
                              control={control}
                              name="breakEndTime"
                              rules={{
                                required: {
                                  value: true,
                                  message: 'End Time add is required',
                                },
                              }}
                              render={({ field: { onChange, value } }: any) => (
                                <Select
                                  // inputRef={ref}
                                  classNamePrefix={
                                    errors["calenderDay"]
                                      ? "error form-control-language"
                                      : "form-control-language"
                                  }
                                  // defaultValue={selectedcalenderDaysList[0].value}
                                  options={endTimeBreak}
                                  id="breakEndTime"
                                  name="breakEndTime"
                                  value={endTimeBreak?.find(
                                    (c: any) => c.value === value?.value
                                  )}
                                  onChange={(val: any) => onChange(val.time)}
                                />
                              )}
                            />
                            <FeildErrorMessage
                              errors={errors}
                              name="breakEndTime"
                              containerClass="w-100"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="contctform-btns">
                        <div className="cb-right">
                          <Button
                            className="btn btn-link cancel-link edit-contact-cancel"
                            buttonLabel="Cancel"
                            handleClick={() => handleAddBreak(false)}
                          />
                          <Button
                            className="btn theme-btn btn-add-break-site-submit"
                            buttonLabel="Save"
                            handleClick={handleSubmit(onSubmitAddbreak)}
                        
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                )}
                {breakList?.map((sitebreakitem: any, index: number) => (
                  <div className="contacts-list">
                    <div className="contact-item" key={sitebreakitem}>
                      <div className="contact-item-header">
                        <div className="left-title">
                          <h5>{sitebreakitem.name}</h5>
                          <p>
                            {String(sitebreakitem.DayDisplayList)} – {sitebreakitem.start.substring(0,sitebreakitem.start.length-3)} - {sitebreakitem.end.substring(0,sitebreakitem.end.length-3)}
                          </p>
                        </div>
                        <Link
                          className="edit-icon"
                          onClick={() => handleEdit(true, index)}
                          to="#">
                          <img src={images.edit} alt="edit" />
                        </Link>
                      </div>
                    </div>
                    {sitebreakitem.isOpen && (
                      <div className="vehicle-form edit-contact-form">
                        <h3>Edit Break</h3>
                        <form>
                          <div className="form-group">
                            <label>Name</label>
                            <Input
                              inputName={`name:${index}`}
                              className={
                                errors[`name:${index}`]
                                  ? "form-control error"
                                  : "form-control"
                              }
                              register={register}
                              rules={{
                                required: {
                                  value: true,
                                  message: "Name is required",
                                },

                                onChange: (e: any) => onChange(e),
                              }}
                              id="resourcebreak_edit_name"
                              inputType="text"
                            />
                            <FeildErrorMessage
                              errors={errors}
                              name={`name:${index}`}
                              containerClass="w-100"
                            />
                          </div>
                          <div className="form-group">
                            <label>Days Active</label>
                            <div className="daylist-box">
                              <ul className="daylist">
                                {sitebreakitem?.tempDayList?.map(
                                  (item: any, indexDay: Number) => (
                                    <li className="dayname">
                                      <Link
                                        className={
                                          item.active === true ? "active" : ""
                                        }
                                        onClick={() =>
                                          handlechangedaylist(item, indexDay)
                                        }
                                        to="">
                                        {item.label}
                                      </Link>
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>

                            <FeildErrorMessage
                                  errors={errors}
                                  name={`daysActiveBreak:${index}`}
                                  containerClass="w-100"
                                />
                          </div>
                          <div className="row">
                            <div className="col-sm-6">
                              <div className="form-group">
                                <label>Start Time</label>
                                <Controller
                                  control={control}
                                  name={`breakEditStartTime:${index}`}
                                  rules={{
                                    required: {
                                      value: true,
                                      message: "Start Time add is required",
                                    },
                                  }}
                                  render={({ field: { onChange, value } }: any) => (
                                    <Select
                                      // inputRef={ref}
                                      classNamePrefix={
                                        errors["calenderDay"]
                                          ? "error form-control-language"
                                          : "form-control-language"
                                      }
                                      // defaultValue={selectedcalenderDaysList[0].value}
                                      options={sitebreakitem.startTimeList}
                                      id="startTime"
                                      name={`breakEditStartTime:${index}`}
                                      value={sitebreakitem.startTimeList?.find(
                                        (c: any) => c.value === value
                                      )}
                                      onChange={(val: any) =>
                                        onChangeStartTimeEdit(val,"startTime",index)
                                      }
                                    />
                                  )}
                                />
                                <FeildErrorMessage
                                  errors={errors}
                                  name={`breakEditStartTime:${index}`}
                                  containerClass="w-100"
                                />
                              </div>
                            </div>
                            <div className="col-sm-6">
                              <div className="form-group">
                                <label>End Time</label>
                                <Controller
                                  control={control}
                                  name={`breakEditEndTime:${index}`}
                                  rules={{
                                    required: {
                                      value: true,
                                      message: "End Time add is required",
                                    },
                                  }}
                                  render={({ field: { onChange, value } }: any) => (
                                    <Select
                                      // inputRef={ref}
                                      classNamePrefix={
                                        errors["calenderDay"]
                                          ? "error form-control-language"
                                          : "form-control-language"
                                      }
                                      // defaultValue={selectedcalenderDaysList[0].value}
                                      options={sitebreakitem.endTimeList}
                                      id="endTime"
                                      name={`breakEditEndTime:${index}`}
                                      value={sitebreakitem.endTimeList?.find(
                                        (c: any) => c.value === value
                                      )}
                                      onChange={(val: any) => onChangeStartTimeEdit(val,"endTime",index)
                                    }
                                    />
                                  )}
                                />
                                <FeildErrorMessage
                                  errors={errors}
                                  name={`breakEditEndTime:${index}`}
                                  containerClass="w-100"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="contctform-btns">
                            <div className="cb-left">
                              <Button
                                buttonLabel="Remove"
                                className="btn btn-link remove-link"
                                handleClick={() =>
                                  handleRemovebreakListItem(
                                    sitebreakitem,
                                    index,
                                    sitebreakitem.id
                                  )
                                }
                              />
                            </div>
                            <div className="cb-right">
                              <Button
                                buttonLabel="Cancel"
                                handleClick={() => handleEdit(false, index)}
                                className="btn btn-link cancel-link edit-contact-cancel"
                              />
                              <Button
                                className="btn theme-btn"
                                buttonLabel="Save"
                                handleClick={handleSubmit((data) =>
                                  onSubmitEditbreak(
                                    data,
                                    index,
                                    sitebreakitem,
                                    sitebreakitem.id
                                  )
                                )}
                              />
                            </div>
                          </div>
                        </form>
                      </div>
                    )}
                  </div>
                ))}
              </div>
          </div>
          {accessPointItems && accessPointItems.length>0 && (
            <div className="col-xl-6 col-lg-6 col-md-12">
              <div className="vehicle-form contact-list">
                <div className="vh-form-header">
                  <h3>Site Closures</h3>
                  <Link id="btn-add-closure-site" to="" onClick={() => handleAddclousureClick(true)}>
                    <img src={images.plusThemeSvg} />
                  </Link>
                </div>

                {isAddcloueserModelShow && (
                  <div className="vehicle-form edit-contact-form">
                    <h3>Add Site Closures</h3>
                    <div className="form-group">
                      <label>Dates</label>
                      <div className="row align-items-center">
                        <div className="col-sm-5 datestart">
                          <Input
                            inputName="startDate"
                            className={
                              errors["startDate"]
                                ? "form-control error"
                                : "form-control"
                            }
                            register={register}
                            rules={{
                              required: {
                                value: true,
                                message: "Start Date is required",
                              },
                              onChange: (e: any) => onChangeStartDate(e),
                            }}
                            id="resourceBreak_startDate"
                            inputType="date"
                            minDate={disablePastDate()}
                          />
                          <FeildErrorMessage
                            errors={errors}
                            name="startDate"
                            containerClass="w-100"
                          />
                        </div>
                        <div className="col-sm-2 date-to">
                          <label
                            className={errors.startDate || errors.endDate ? "mb-5 d-block" : "mb-0 d-block"}
                            style={{ textAlign: "center" }}>
                            TO
                          </label>
                        </div>
                        <div className="col-sm-5 dateend">
                          <Input
                            inputName="endDate"
                            className={
                              errors["endDate"]
                                ? "form-control error"
                                : "form-control"
                            }
                            register={register}
                            rules={{
                              required: {
                                value: true,
                                message: "End Date is required",
                              },
                              onChange: (e: any) => onChange(e),
                            }}
                            id="resourceBreak_endDate"
                            inputType="date"
                            minDate={endDateDisbaled}
                          />
                          <FeildErrorMessage
                            errors={errors}
                            name="endDate"
                            containerClass="w-100"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-12">
                        <div className="form-group">
                          <label>Access Point</label>
                          <Controller
                            control={control}
                            name="accessPoints"
                            rules={{
                              required: {
                                value: true,
                                message: 'Access point is required',
                              },
                            }}
                            render={({ field: { onChange, value } }: any) => (
                              <Select
                                // inputRef={ref}
                                classNamePrefix={
                                  errors["calenderDay"]
                                    ? "error form-control-language"
                                    : "form-control-language"
                                }
                                // defaultValue={selectedcalenderDaysList[0].value}
                                options={accessPointItems}
                                id="accessPoints"
                                name="accessPoints"
                                value={accessPointItems?.find(
                                  (c: any) => c.value === value?.value
                                )}
                                onChange={(val: any) => onchangeAccespoint(val)}
                                isMulti
                              />
                            )}
                          />
                          <FeildErrorMessage
                            errors={errors}
                            name="accessPoints"
                            containerClass="w-100"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="contctform-btns">
                      <div className="cb-right">
                        <Button
                          className="btn btn-link cancel-link edit-contact-cancel"
                          buttonLabel="Cancel"
                          handleClick={() => handleAddclousureClick(false)}
                        />
                        <Button
                          className="btn theme-btn btn-add-closure-site-submit"
                          buttonLabel="Save"
                          handleClick={handleSubmit(onSubmitAddcloueser)}
                        />
                      </div>
                    </div>
                  </div>
                )}
                {closureList?.map((resourceclosureitem: any, index: number) => (
                  <div className="contacts-list">
                    <div className="contact-item" key={resourceclosureitem}>
                      <div className="contact-item-header">
                        <div className="left-title">
                          <p>
                            {new Date(resourceclosureitem.start).toDateString()}{" "}
                            - {new Date(resourceclosureitem.end).toDateString()}
                          </p>
                          <h5>{String(resourceclosureitem.tempDisplayNameaccesspoint)}</h5>
                        </div>
                        <Link
                          className="edit-icon"
                          onClick={() => handleClosureEdit(true, index)}
                          to="#">
                          <img src={images.edit} alt="edit" />
                        </Link>
                      </div>
                    </div>
                    {resourceclosureitem.isOpen && (
                      <div className="vehicle-form edit-contact-form">
                        <h3>Edit Site Closures</h3>
                        <div className="form-group">
                          <label>Dates</label>
                          <div className="row align-items-center">
                            <div className="col-sm-5 datestart">
                              <Input
                                inputName={`startDate:${index}`}
                                className={
                                  errors[`startDate:${index}`]
                                    ? "form-control error"
                                    : "form-control"
                                }
                                register={register}
                                rules={{
                                  required: {
                                    value: true,
                                    message: "Start Date is required",
                                  },
                                  onChange: (e: any) => onChangeStartDateInEdit(e, index),

                                }}
                                id="resourceBreak_startDate"
                                inputType="date"
                                minDate={disablePastDate()}
                              />
                              <FeildErrorMessage
                                errors={errors}
                                name={`startDate:${index}`}
                                containerClass="w-100"
                              />
                            </div>
                            <div className="col-sm-2 date-to">
                              <label
                                className={errors[`startDate:${index}`] || errors.endDate ? "mb-5 d-block" : "mb-0 d-block"}
                                style={{ textAlign: "center" }}>
                                TO
                              </label>
                            </div>
                            <div className="col-sm-5 dateend">
                              <Input
                                inputName={`endDate:${index}`}
                                className={
                                  errors[`endDate:${index}`]
                                    ? "form-control error"
                                    : "form-control"
                                }
                                register={register}
                                rules={{
                                  required: {
                                    value: true,
                                    message: "End Date is required",
                                  },
                                  onChange: (e: any) => onChange(e),
                                }}
                                id="resourceBreak_endDate"
                                inputType="date"
                                minDate={resourceclosureitem.disbaleEndDate}

                              />
                              <FeildErrorMessage
                                errors={errors}
                                name={`endDate:${index}`}
                                containerClass="w-100"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-sm-12">
                            <div className="form-group">
                              <label>Access Point</label>
                              <Controller
                                control={control}
                                name={`accessPoints:${index}`}
                                rules={{
                                  required: {
                                    value: true,
                                    message: 'Access Point is required',
                                  },
                                }}
                                render={({ field: { onChange, value } }: any) => (
                                  <Select
                                    // inputRef={ref}
                                    classNamePrefix={
                                      errors["calenderDay"]
                                        ? "error form-control-language"
                                        : "form-control-language"
                                    }
                                    // defaultValue={selectedcalenderDaysList[0].value}
                                    options={accessPointItems}
                                    id="accessPoints"
                                    name={`accessPoints:${index}`}
                                    // value={resoureClosureList?.find(
                                    //   (c: any) => c.value === value?.value
                                    // )}
                                    value={
                                      value ||
                                      accessPointItems?.filter((c: any) =>
                                        resourceclosureitem.accessPoints?.find(
                                          (r: any) => r.value === c.value
                                        )
                                      )
                                    }
                                    onChange={(val: any) => onchangeAccespointEdit(val, index)}
                                    isMulti
                                  />
                                )}
                              />
                              <FeildErrorMessage
                                errors={errors}
                                name={`accessPoints:${index}`}
                                containerClass="w-100"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="contctform-btns">
                          <div className="cb-left">
                            <Button
                              buttonLabel="Remove"
                              className="btn btn-link remove-link"
                              handleClick={() =>
                                handleRemoveclosureListItem(
                                  resourceclosureitem,
                                  index,
                                  resourceclosureitem.id
                                )
                              }
                            />
                          </div>
                          <div className="cb-right">
                            <Button
                              buttonLabel="Cancel"
                              handleClick={() => handleClosureEdit(false, index)}
                              className="btn btn-link cancel-link edit-contact-cancel"
                            />
                            <Button
                              className="btn theme-btn"
                              buttonLabel="Save"
                              handleClick={handleSubmit((data) =>
                                onSubmitEditclosure(
                                  data,
                                  index,
                                  resourceclosureitem,
                                  resourceclosureitem.id
                                )
                              )}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          </div>
          <div className="home-screen-message avail-home-cust">
            <div className="cust-s-head">
              <h3 className="hcm-title">Make a Booking Information</h3>
              <div className="switch-box holiday">
                <label className="switch">
                  <input type="checkbox" id="resonlybooking" />
                </label>
              </div>
            </div>
            <Controller
              control={control}
              name="bookingProcessMessage"
              rules={
                {
                  // required: {
                  //   value: true,
                  //   message: `${t("siteDetail.error_homemessage_required")}`,
                  // },
                }
              }
              render={(filed) => {
              
                return (
                  <CKEditor
                    {...filed}
                    editor={ClassicEditor}
                    config={ {
                      toolbar: [ 'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote','|', 'undo', 'redo','|','outdent', 'indent', ],
                    }}
                    onChange={(event: any, editor: any) => {let data = editor.getData();
                      data = replaceImgText(data)
                      onChangeText(data);
                    }}
                    inputName="bookingProcessMessage"
                    data={filed?.field?.value === null ? "" : filed?.field?.value}
                  />
                );
              }}
            />
          </div>
          <div className="row availability-margin">
            <div className="col-xl-6 col-lg-6 col-md-12">
              <div className="vehicle-form">
                <h3>Advanced Bookings</h3>
                <div className="form-group">
                  <label>Number of days bookings allowed in advance</label>

                  <Input
                    inputName="daysAllowedInAdvance"
                    className={
                      errors["daysAllowedInAdvance"]
                        ? "form-control error"
                        : "form-control"
                    }
                    register={register}
                  
                    id="accessPoints_add_name"
                    inputType="number"
                    minDate={0}
                  />
                  <FeildErrorMessage
                    errors={errors}
                    name="daysAllowedInAdvance"
                    containerClass="w-100"
                  />
                </div>
                <div className="form-group mb-0">
                  <label>Number of hours bookings allowed before delivery</label>
                  <Input
                    inputName="hoursAllowedBeforeDelivery"
                    className={
                      errors["hoursAllowedBeforeDelivery"]
                        ? "form-control error"
                        : "form-control"
                    }
                    register={register}
                    
                    id="accessPoints_add_name"
                    inputType="number"
                    minDate={0}
                  />
                  <FeildErrorMessage
                    errors={errors}
                    name="hoursAllowedBeforeDelivery"
                    containerClass="w-100"
                  />
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-12">
              <div className="vehicle-form">
                <h3>Site Plan</h3>
                <Image
                  // value=""
                  value={
                    getValues("sitePlan") &&
                    getValues("sitePlan").length > 0 &&
                    window.URL?.createObjectURL(getValues("sitePlan")[0])
                  }
                  logoImage={plan}
                  register={register}
                  inputName="sitePlan"
                  id="sitePlan"
                  error={errors["sitePlan"]}
                  rules={{
                    // required: {
                    //   value: true,
                    //   message: `${t("siteDetail.error_siteadd_required")}`,
                    // },
                    onChange: (e: any) => onChangeImage(e),
                  }}
                  disabled={false}
                />
                <FeildErrorMessage
                  errors={errors}
                  name="sitePlan"
                  containerClass="w-100"
                />
            
              </div>
            </div>
          </div>
          <div className="form-save-btn">
            <Button
              buttonLabel="Save"
              handleClick={handleSubmit((data) => handleUpdateAvailablity(data))}
              className="theme-btn"
            />
          </div>
        </>
      }
    </div>
  );
};

export default Site;

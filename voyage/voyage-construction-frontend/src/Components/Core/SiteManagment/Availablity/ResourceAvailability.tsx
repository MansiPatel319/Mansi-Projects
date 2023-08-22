import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";

// component

import { constants } from "../../../../Library/Constants";
import { getLocalStorage } from "../../../../Network/ApiService";
import Button from "../../../UI/Button";
import FeildErrorMessage from "../../../UI/FeildErrorMessage";
import ErrorMessage from "../../../UI/ErrorMessage";
import Input from "../../../UI/Input";
import Switch from "../../../UI/Switch/index"
import SelectComponent from '../../../UI/Select';

// image
import images from "../../../../Assets/images";

// api
import toast from "react-hot-toast";
import {  getResourcesDetails,

  getTimeList,
  updateResourceAvailablity,
} from "../../../../Network/Core/SiteManagement/availability";
import { useTranslation } from "react-i18next";
import { getdataASiteList } from "../../../../Network/Core/SiteManagement/siteDetails";
import { formatTime24to12Hour, getLastDayOfYear, lastdayOfMonth } from "../../../../Library/Utils";
import { getAccountPreferenceDetail } from "../../../../Network/Core/Dashboard/dashboard";
import { getALLResourceList } from "../../../../Network/Core/SiteManagement/resourse";

// helper

const Resources = () => {
  const navigate = useNavigate();
  const {t} = useTranslation()
  const [isAddBreakModelShow, setIsAddBreakModelShow] = useState<any>();
  const [isAddcloueserModelShow, setIsAddcloueserModelShow] = useState<any>();
  const [apiResponseErr, setApiResponseErr] = useState<string>("");
  const [endDateDisbaled,setEndDateDisbaled]= useState('')
  const [siteListing,setSiteListing] = useState<any>([]);
  const [siteId,setSiteId] = useState();
  const [isShowSiteId,setisShowSiteId] = useState(false);
  const [timeFormat,setTimeFormat] = useState("24 hour")

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
  
  const project = getLocalStorage(constants.PROJECT);
  const [resourceList, setResourceList] = useState<any>([]);
  const [resourceTimeList, setResourceTimeList] = useState<any>([]);
  const [resoureClosureList, setResoureClosureList] = useState<any>();
  const [dummyresoureClosureList, setDummyResoureClosureList] = useState<any>(
    []
  );
  const [breakList, setBreakList] = useState<any>();
  const [closureList, setClosure] = useState<any>();
  const [startTime, setStartTime] = useState<any>();
  const [endTime, setEndTime] = useState<any>();
  const [accessPointItems, setAccessPointItems] = useState<any>([]);
  const {
    register, // this use for evnets and value
    handleSubmit, // this is form submit handle
    setError,
    setValue,
    getValues,
    control,
    clearErrors,
    formState: { errors }, // error like required,validate, etc..
  } = useForm();

  const handleAddClick = (status: any) => {
    setIsAddBreakModelShow(status);
    setValue(`name`, "");
    setValue("startTime", "");
    setValue("endTime", "");
    setValue("resourcebreak", "");
    
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

  const handleAddclousureClick = (status: any) => {
    setIsAddcloueserModelShow(status);
    setValue(`startDate`, "");
    setValue("endDate", "");
    setValue("resource", "");
  };

  const onSubmitEditbreak = async (
    userData: any,
    i: number,
    data: any,
    id: any
  ) => {
    let days: any[] = [];

    if (! data.tempDayList.find((item: any) => item.active))
    {
      setError("daysActiveBreak:"+i, {
        type: 'required',
        message:"Please Select Days"
      })
    }
    else {
    data.tempDayList.map((item: any) => {
      if (item.active === true) {
        days.push(item.value);
      }
    });
    
    let resources: any[] = [];
    if( userData[`resourcebreak:${i}`].label=='All'){
      dummyresoureClosureList.map((item:any)=>{
        
        resources.push(item.id);

      })
    }
    else{
       userData[`resourcebreak:${i}`].map((item: any) => {
        resources.push(item.value);
      });
    }
    
      let dataEdit = {
        resource_breaks: [
          {
            id: id,
            name: userData[`name:${i}`],
            start_time: userData[`startTime:${i}`],
            end_time: userData[`endTime:${i}`],
            resource: resources,
            active_days: days,
          },
        ],
      }

      handleUpdateResourceAvailablityAPIBreakClosure(dataEdit,i)
};

  };
  const onSubmitEditclosure = async (
    userData: any,
    i: number,
    data: any,
    id: any
  ) => {
    let resources: any[] = [];
    if( userData[`resource:${i}`].label=='All'){
      dummyresoureClosureList.map((item:any)=>{
        
        resources.push(item.id);

      })
    }
    else{
       userData[`resource:${i}`].map((item: any) => {
        resources.push(item.value);
      });
    }
    let dataEdit= {
      resource_closures: [
        {
          id: id,
          resource: resources,
          start_date: userData[`startDate:${i}`],
          end_date: userData[`endDate:${i}`],
        },
      ],
    };
    handleUpdateResourceAvailablityAPIBreakClosure(dataEdit,i)

  };
  const handleRemovebreakListItem = async (data: any, i: number, id: any) => {
    const list = [...breakList];
    let days: any[] = [];
    data.tempDayList.map((item: any) => {
      if (item.active === true) {
        days.push(item.value);
      }
    });
    let data1 ={
     resource_breaks: [
    {
      id: id,
      name: list[i][`name`],
      start_time: list[i][`startTime`].id,
      end_time: list[i][`endTime`].id,
      resource: resourceList,
      active_days: days,
      is_active: false,
    },
  ],
};

    handleUpdateResourceAvailablityAPIBreakClosure(data1,i);

  };

  const handleRemoveclosureListItem = async (data: any, i: number, id: any) => {
    const list = [...closureList];
    let resources: any[] = [];
    list[i][`resource`].map((item: any) => {
      resources.push(item.id);
    });
    let deletedData= {
      resource_closures: [
        {
          id: id,
          resource: resources,
          start_date: list[i][`startDate`],
          end_date: list[i][`endDate`],
          is_active: false,
        },
      ],
    };
    handleUpdateResourceAvailablityAPIBreakClosure(deletedData,i)

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

  const handleAddBreak = (status: any) => {
    setIsAddBreakModelShow(status);
  };
  const handleClosureEdit = (status: any, i: number) => {
    const tempItem: Array<any> = [...closureList];
    tempItem[i].isOpen = status;
    let array: { label: any; value: any }[] = [];
    closureList[i].resource.map((i:any)=>{
      let selectedAccessPoint=dummyresoureClosureList.find((item: any) => item.id === i.id);
      let tempresources = {
        label: selectedAccessPoint.name,
        value: selectedAccessPoint.id,
      };
      array.push(tempresources);
    })
  

    setValue(`startDate:${i}`, closureList[i].startDate);
    setValue(`endDate:${i}`, closureList[i].endDate);
    setValue(`resource:${i}`, array);
    setClosure([...tempItem]);
  };

  const handleEdit = (status: any, i: number) => {
    
    const tempItem: Array<any> = [...breakList];
    tempItem[i].isOpen = status;
    // setValue(`name:${i}`, breakList[i].name);
    // setValue(
    //   `startTime:${i}`,
    //   startTime.find((item: any) => item.id === breakList[i].startTime.id)
    // );
    // setValue(
    //   `endTime:${i}`,
    //   endTime.find((item: any) => item.id === breakList[i].endTime.id)
    // );
    let array: { label: any; value: any }[] = [];
    breakList[i].resource.map((i:any)=>{
      let selectedAccessPoint=dummyresoureClosureList.find((item: any) => item.id === i.id);
      let tempresources = {
        label: selectedAccessPoint.name,
        value: selectedAccessPoint.id,
      };
      array.push(tempresources);
    })
    setValue(
      `resourcebreak:${i}`,
      array)


    setBreakList([...tempItem]);
  };
  const handleGetEndPoint = async (val: any) => {
    try {
      const res: any = await getTimeList(project.ref);
      const { status, data } = res;
      switch (status) {
        case 200:

          const tempMinLength = data.results.map((item: any) => {
            // if (item.time.split(":")[0] === "00") {
            //   (item.label = item.time.split(":")[1] + " Minute"),
            //     (item.value = item.id);
            //   return item;
            // } else if (item.time.split(":")[1] === "00") {
            //   (item.label = item.time.split(":")[0] + " Hour "),
            //     (item.value = item.id);
            //   return item;
            // } else {
            //   (item.label =
            //     item.time.split(":")[0] +
            //     " Hour " +
            //     item.time.split(":")[1] +
            //     " Minute "),
            //     (item.value = item.id);
            //   return item;
            // }
            item.label = timeFormat=== "12 hour" ? formatTime24to12Hour(item.time) : item.time.length>7 ? item.time.substring(0,item.time.length-3) : item.time,
            item.value = item.id
            return item
          });
          const tempEndData = [...tempMinLength];
          let array: any[] = [];
          tempEndData.map((item: any) => {
            if (val < item.id) {
              array.push(item);
            }
          });
          setEndTime(array);

          break;
        case 400:
          break;
        case 403:
          if (data.detail === "ERR_login_again_token_expired") {
            toast.error("userManagment.error_login_again");
            localStorage.clear();
            navigate("/login");
          }

          break;
        default:
          break;
      }
    } catch (err) {}
  };
  const onChangeStartTime = (val: any) => {
    setEndTime([]);
    handleGetEndPoint(val);
    setValue("startTime", val);
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
  const onSubmitAddbreak = async (breakData: any) => {
    let days: any[] = [];
    if (!dayList.find((item: any) => item.active))
    {
      setError("daysActiveBreak", {
        type: 'required',
        message:"Please Select Days"
      })
    }
    else {
      clearErrors("daysActiveBreak")
      dayList.map((item: any) => {
        if (item.active === true) {
          days.push(item.value);
        }
      });
      let resources: any[] = [];
      if(breakData.resourcebreak.label=='All'){
        dummyresoureClosureList.map((item:any)=>{
          
          resources.push(item.id);
  
        })
      }
      else{
        breakData.resourcebreak.map((item: any) => {
          resources.push(item.value);
        });
      }
      
      let data1= {
        resource_breaks: [
          {
            name: breakData.name,
            start_time: breakData.startTime,
            end_time: breakData.endTime,
            resource: resources,
            active_days: days,
          },
        ],
      };
      handleUpdateResourceAvailablityAPIBreakClosure(data1,breakData.id);
    }

  };
  const getResourceOfProject = async (ref: any,timeDummy:any) => {
    try {
      const res = await getALLResourceList(ref,siteId,'true');

      const { status, data } = res;
      switch (status) {
        case 200:
          let Array: any[] = [];
          res.data.results.map((item: any) => {
            Array.push(item.id);
          });
          setResourceList(Array);
          let tempAllId: any = [];
          let temdataresource: { label: any; value: any }[] = [];
          res.data.results.map((item: any) => {
            let obj = {
              label: item.name,
              value: item.id,
            };
            if(item.isActive)
            {

              tempAllId.push(item.id);
              temdataresource.push(obj);
            }
          });
          let all: any = [
            {
              label: "All",
              value: 'All',
            },
          ];
          let tempTimeData:any = [...res.data.results]
          tempTimeData =tempTimeData.map((obj: any, index:number) => {
            if(obj.isActive)
            {

              let item: any = {}
              item.id = obj.id;
              item.isResActive = true;
              item.startTimeList = [...timeDummy];
              item.endTimeList = [...timeDummy];
              item.isAllDayChecked = false;
              item.title = obj.name;
              item.label = obj.name;
              item.value = obj.id;
              item.isDisabledDay = true;
              item.isDisabledCheck = true;
              return item
            }


          })
          var filtered = tempTimeData.filter(function(value:any){ 
            return value !==undefined;
        }); 
          if(filtered.length>0)
          {
              setResourceTimeList(filtered) 

              setResoureClosureList([...all, ...filtered]);
              setDummyResoureClosureList(filtered);
            }
            
          break;
        case 400:
          break;
        case 403:
          if (data.detail === "ERR_login_again_token_expired") {
            toast.error("userManagment.error_login_again");
            localStorage.clear();
            navigate("/login");
          }

          break;
        default:
          break;
      }
    } catch (err) {}
  };
    const setTimeData = (data:any) => {
        if (data.length > 0) {
          
          const tempTimeData = [...resourceTimeList]
            data?.map((item: any) => {
                    tempTimeData && tempTimeData.length>0 && tempTimeData?.map((timeItem: any, index:any) => {
                     
                    let dummmyStartTimeData = {
                        label: '',
                        value: 0
                    }
                    let dummmyEndTimeData = {
                        label: '',
                        value: 0
                    }
                    dummmyStartTimeData = {
                
                      // label: item?.startingTime.time.split(":")[0] + " Hour " + item?.startingTime.time.split(":")[1] + " Minute ",
                      label: item?.startingTime.time,
                      value: timeItem?.startTimeList?.find((startListItem: any) => startListItem?.time?.trim() === item?.startingTime?.time || startListItem?.time?.trim() === item?.startingTime?.time.substring(0,item.startingTime.length-3))?.id

                    }
                    dummmyEndTimeData = {
                      label: item?.endingTime.time,
                        // label: item?.endingTime.time.split(":")[0] + " Hour " + item?.endingTime.time.split(":")[1] + " Minute ",
                      value: timeItem?.endTimeList?.find((startListItem: any) => startListItem?.time?.trim() === item?.endingTime?.time || startListItem?.time?.trim() === item?.endingTime?.time.substring(0,item.endingTime.length-3))?.id
                       
                    }
                    if (timeItem.title.toLowerCase() === item.resource.name.toLowerCase()) {
                        // if (!timeItem.isAllDayChecked) {

                      if (dummmyStartTimeData?.value === 1 && dummmyEndTimeData?.value === 48)
                      {
                                
                        setValue("allday:" + timeItem.id, true)
                        timeItem.isAllDayChecked=true
                        timeItem.isDisabledDay=true
                        // timeItem.isDisabledCheck=true
                          }
                      else {
                        
                        setValue("startTimeRes:" + timeItem.id, dummmyStartTimeData?.value)
                        setValue("endTimeRes:" + timeItem.id, dummmyEndTimeData?.value)
                        timeItem.isDisabledCheck=false
                        timeItem.isDisabledDay=false
                          }
                            // setValue("allday:" + timeItem.id, item.allDay)
                      setValue("days:" + timeItem.id, item.isActive)
                      if(!item.isActive)
                      {
                        timeItem.isDisabledCheck = true
                      }
                      else {
                        timeItem.isDisabledCheck= false
                        item.isDisabledDay = false
                      }
                           
                    
                        // }                  
                        
                        timeItem.start = item?.startingTime?.id
                        timeItem.end = item?.endingTime?.id
                    }
                    // setValue("allday:" + timeItem.id, item.allDay)
                   
                        timeItem.siteId= data[index].id
                      
                    return timeItem
                    })
                return item
            
            })
            setResourceTimeList(tempTimeData)

        }
  }
  const getReosourceDetail = async (ref: any) => {
    try {
      const res = await getResourcesDetails(ref,siteId);

      const { status, data } = res;
      switch (status) {
        case 200:

          let tempDayList = [...dayList];
          data?.resourceBreaks.map((breakItem: any) => {
            breakItem.tempDayList = [];
            tempDayList.map((item: any) => {
              if (breakItem.activeDays.includes(item.value)) {
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
          let trmpresorce1List = [...dummyresoureClosureList];
          const tempMinLength = [...startTime];
          data?.resourceBreaks.map((resourceclosure: any,i:number) => {
            setValue(`name:${i}`, resourceclosure.name);
            setValue(
              `startTime:${i}`,
              tempMinLength.filter((item: any) => item.time ===resourceclosure.startTime.time)[0].value
            );
            setValue(
              `endTime:${i}`,
              tempMinLength.filter((item: any) => item.time ===resourceclosure.endTime.time)[0].value
            );

            resourceclosure.startTimeList = tempMinLength
            resourceclosure.endTimeList =  tempMinLength
            resourceclosure.tempDisplayNameResource = [];
            trmpresorce1List.map((item: any) => {
              if (resourceclosure.resource.length === trmpresorce1List.length) {
                resourceclosure.tempDisplayNameResource = [];
                resourceclosure.tempDisplayNameResource.push("All Resource");
              } else {
                
                resourceclosure.resource.map((i:any)=>{
                  if (i.name == item.name){
                    resourceclosure.tempDisplayNameResource.push(item.name);
                  }
                
                })
               
              }
            });
            return closureList;
          });
          let trmpresorceList = [...dummyresoureClosureList];
          data?.resourceClosures.map((resourceclosure: any) => {
            resourceclosure.tempDisplayNameResource = [];
            trmpresorceList.map((item: any) => {
              if (resourceclosure.resource.length === trmpresorceList.length) {
                resourceclosure.tempDisplayNameResource = [];
                resourceclosure.tempDisplayNameResource.push("All Resource");
              } else {
                
                resourceclosure.resource.map((i:any)=>{
                  if (i.name == item.name){
                    resourceclosure.tempDisplayNameResource.push(item.name);
                  }
                
                })
               
              }
            });
            return closureList;
          });

          data?.resourceClosures.map((item:any,i:number) => {          
            
            item.disbaleEndDate=disableEndDateEdit(item.startDate)            
            return item            
          })
          setTimeData(data.resourceTimings)
          setClosure(data?.resourceClosures);
          setBreakList(data?.resourceBreaks);
          break;
        case 400:
          break;
        case 403:
          if (data.detail === "ERR_login_again_token_expired") {
            toast.error("userManagment.error_login_again");
            localStorage.clear();
            navigate("/login");
          }

          break;
        default:
          break;
      }
    } catch (err) {}
  };
  const getTimeListing = async () => {
    try {
      const res: any = await getTimeList(project.ref);
      const { status, data } = res;
      switch (status) {
        case 200:
          let array: any[] = [];
          // data.map((item: any, index: any) => {
          //   if (data[index].id > 47) {
          //   } else {
          //     array.push(item);
          //   }
          // });
          const tempMinLength = data.results.map((item: any) => {
           
            item.time =  item.time>7 ? item.time.substring(0,item.time.length-3) : item.time
            item.label = timeFormat=== "12 hour" ? formatTime24to12Hour(item.time) : item.time.length>7 ? item.time.substring(0,item.time.length-3) : item.time,
            item.value = item.id
            return  item
          });
          setStartTime(tempMinLength);
          setEndTime(tempMinLength);
          setValue(
            "startTime",
            tempMinLength.find(
              (item: any) => item.id === breakList.startTime[0].startTime
            ).value
          );
          setValue(
            "endTime",
            tempMinLength.find(
              (item: any) => item.id === breakList.endTime[0].endTime
            ).value
          );
          break;
        case 400:
          break;
        case 403:
          if (data.detail === "ERR_login_again_token_expired") {
            toast.error("userManagment.error_login_again");
            localStorage.clear();
            navigate("/login");
          }

          break;
        default:
          break;
      }
    } catch (err) {}
  };
  const onChangeStartTimeEdit = (val: any, title: string, index: any) => {
 
    function checkMinHour(item: any) {
      return item.id === val.id;
    }
    if (title.includes("startTime")) {
      setValue("startTime:"+index, val.value);
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
      setValue("endTime:"+index, val.value);
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
  
  const onSubmitAddcloueser = async (cloueserData: any) => {
    let resources: any[] = [];
    if(cloueserData.resource.label=='All'){
      dummyresoureClosureList.map((item:any)=>{
        
        resources.push(item.id);

      })
    }
    else{
      cloueserData.resource.map((item: any) => {
        resources.push(item.value);
      });
    }
    let data= {
      resource_closures: [
        {
          resource: resources,
          start_date: cloueserData.startDate,
          end_date: cloueserData.endDate,
        },
      ],
    };
    handleUpdateResourceAvailablityAPIBreakClosure(data,cloueserData.id);
  };
    
  const onchangeResource = (data:any)=>{
    
    if(data.find((item: any) => item.label == 'All')){
     
      setValue('resource', {
        label: "All",
        value: 'All',
      })
    }
    else{
      setValue('resource', data);
    
    }
  }
  const onchangeResourceEdit = (data:any,i:any)=>{
    
    if(data.find((item: any) => item.label == 'All')){
     
      setValue(`resource:${i}`, {
        label: "All",
        value: 'All',
      })
    }
    else{
      setValue(`resource:${i}`, data);
    
    }
  }
  const onchangeResourceBreak= (data:any)=>{
    
    if(data.find((item: any) => item.label == 'All')){
     
      setValue('resourcebreak', {
        label: "All",
        value: 'All',
      })
    }
    else{
      setValue('resourcebreak', data);
    
    }
  }

const onchangeResourcebreakEdit= (data:any,i:any)=>{
    
  if(data.find((item: any) => item.label == 'All')){
   
    setValue(`resourcebreak:${i}`, {
      label: "All",
      value: 'All',
    })
  }
  else{
    setValue(`resourcebreak:${i}`, data);
  
  }
}

  const onChangeSelect = (val: any, title: string, index: any) => {

    setValue(title, val.value)
    function checkMinHour(item: any) {
        return item.id === val.id;
    }
    if (title.includes("startTime")) {

        let tempEndTime: any = []
        const tempTimeData = [...resourceTimeList]
        tempTimeData.map((item, i) => {
            if (index === i) {
                tempEndTime = item.startTimeList
                let index = tempEndTime.findIndex(checkMinHour);                 
                item.start =tempEndTime[index].id
                tempEndTime = tempEndTime.slice(index + 1, tempEndTime.length)
                item.endTimeList = tempEndTime
            }
            return item
        })
        setResourceTimeList(tempTimeData)

    }
    else {
        // let tempEndTime: any = []
        const tempTimeData = [...resourceTimeList]
        tempTimeData.map((item, i) => {
            if (index === i) {
                let index = item.endTimeList.findIndex(checkMinHour);
                item.end= item.endTimeList[index].id
            
            }
            return item
        })
        setResourceTimeList(tempTimeData)
    }


  }
  const handleChangeCheckbox = (e: any, index: Number) => {
    const { checked,name } = e.target 
    if (name.includes("days"))
    {
        const tempTimeData = [...resourceTimeList]
        tempTimeData.map((item, i) => {
            if (index === i) {
                // setValue("days:" + item.id, checked)
                item.isResActive = checked
                if (checked) {
                   
                    item.isDisabledDay = false
                    item.isDisabledCheck=false
                }
                else {
                    setValue("startTimeRes:" + item.id, {})
                    setValue("endTimeRes:" + item.id, {})
                    setValue("allday:"+ item.id,false)
                    item.isAllDayChecked = false;
                    item.isDisabledDay=true
                  item.isDisabledCheck = true
                
                }
            }
            return item
        })
        setResourceTimeList(tempTimeData)
    }
    else {
        
        const tempTimeData = [...resourceTimeList]
        tempTimeData.map((item, i) => {
            if (index === i) {
                // setValue("allday:" + item.id, checked)
                item.isAllDayChecked = checked
                
                if (checked) {
                    setValue("startTimeRes:" + item.id, {})
                    setValue("endTimeRes:" + item.id, {})
                    item.isDisabledDay=true
                }
                else {
                    item.isDisabledDay=false
                }

            }
            return item
        })
        setResourceTimeList(tempTimeData)
    }

}
const handleUpdateResourceAvailablity = async (availablityData: any) => {
    const openHourData:any =[]
  console.log('resourceTimeList', resourceTimeList);
  let flag=0
  resourceTimeList?.map((item: any) => {
      
    if (item.isResActive) {
       
     
    
      
      if (item.isAllDayChecked) {
        openHourData.push({
          id: item.siteId,
          resource: item.id,
          startingTime: item.startTimeList[0].id,
          endingTime: item.startTimeList[item.startTimeList.length - 1].id,
          isActive: item.isResActive
        })
      }
      else if (item.start && item.end) {
        console.log('item', item);
       
        openHourData.push({
          id: item.siteId,
          resource: item.id,
          startingTime: item.start,
          endingTime: item.end,
          isActive: item.isResActive
        })
       
      }
      else {
        flag=1
        setApiResponseErr("please select time in resource "+item.label)
      }
    }
    })
   if(flag===0)
   {
    const updatedData =
    {
        "resource_timings":openHourData,
    }
      handleUpdateResourceAvailablityAPI(updatedData)
   }
  
}
const handleUpdateResourceAvailablityAPIBreakClosure = async(updatedData: any,i:any) => {      
     
  try {
      const url = updateResourceAvailablity(updatedData,project.ref,siteId)
      const res: any = await url;
      const { status, data } = res;
      switch (status) {
          case 200:
            
          toast.success(data);
          getReosourceDetail(project.ref);
          handleAddBreak(false);
          setIsAddcloueserModelShow(false);
          if(i != undefined){
            if(Object.keys(updatedData)[0]=='resource_breaks'){
              const tempItembreak: Array<any> = [...breakList];
            tempItembreak[i].isOpen = false;
            setBreakList(tempItembreak);
            }
            else{
              const tempItemclosure: Array<any> = [...closureList];
              tempItemclosure[i].isOpen = false;
              setClosure(tempItemclosure);
            }
          }
              break;
          case 201:
              getReosourceDetail(project.ref);
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
  } catch (err) {
      toast.error(t("userManagment.error_something_went_wrong"));
  }

}
const handleUpdateResourceAvailablityAPI = async(updatedData: any) => {      
     
    try {
        const url = updateResourceAvailablity(updatedData,project.ref,siteId)
        const res: any = await url;
        const { status, data } = res;
        switch (status) {
            case 200:
                getReosourceDetail(project.ref);
                break;
            case 201:
                getReosourceDetail(project.ref);
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
    } catch (err) {
        toast.error(t("userManagment.error_something_went_wrong"));
    }

}
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
    let dd = String(today.getDate()).padStart(2, "0");
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

const getSiteList = async () => {
  try {
    const res = await getdataASiteList(project.ref, true);
    const { status, data, statusText } = res;
    switch (status) {
      case 200:
        
        var Array: { label: any; value: any; }[]=[];
        data.results.map((item:any)=>{
          let tempdata={
            label:item.name,
            value:item.id
          }
          Array.push(tempdata);
        })
        setSiteListing(Array);
       
        break;
      case 400:
        setApiResponseErr(data);
        break;
      case 403:
          if (data.detail === "ERR_login_again_token_expired") {
            toast.error(t("userManagment.error_login_again"));
            localStorage.clear()
            navigate('/login')
          }

          break
      default:
        setApiResponseErr(statusText);
        break;
    }
  } catch (err) {
    toast.error("Somthing went wrong");
  }
};
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
  getResourceOfProject(project.ref, startTime);
}
}
const onChangeSite =(val:any)=>{
clearErrors('site');
setSiteId(val);
}
useEffect(() => {
  getSiteList();
}, []);
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
  useEffect(() => {
    getAccountPreference()
},[])
  useEffect(() => {
    // getResourceOfProject(project.ref);
    if (timeFormat)
    {
      
      getTimeListing();
      }
  }, [timeFormat]);
  useEffect(() => {
    if (siteId && startTime)     
    {  
      getResourceOfProject(project.ref, startTime);
    }
  }, [startTime,siteId]);
  useEffect(() => {
    if (siteId && startTime)     
    {  
      getReosourceDetail(project.ref);
    }
  }, [dummyresoureClosureList,siteId]);
  console.log('resourceTimeList', resourceTimeList)
  return (
    <div
      className="tab-pane fade show active"
      id="nav-resources"
      role="tabpanel"
      aria-labelledby="nav-resources-tab">
           <div className="vehicle-form contact-list">
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
       {(isShowSiteId && resourceTimeList?.length>0 )?
       <>
             <div className="vehicle-form contact-list">
             <div className="vh-form-header">
               <h3>Resource Operating Times</h3>
             </div>
             <div className="table-responsive hoursof-op resources-table">
               <table className="table">
                 <tbody>
                 {resourceTimeList?.map((timeDataItem: any, index: Number) => (
                                     <tr>
     
                                         <td className="day-switch">
                                             <Switch index={index} name={"days:" + timeDataItem?.id} holiday={false} title={timeDataItem.title} register={register} handleChangeCheckbox={handleChangeCheckbox} />
     
                                         </td>
                                         <td>
                                             <div className="from-to-datebox">
                                                 <div className="form-group mb-0 to-input mr-2">
                                                     <SelectComponent
                                                         control={control}
                                                         name={"startTimeRes:" + timeDataItem.id}
                                                         options={timeDataItem.startTimeList}
                                                         errors={errors}
                                                         onChangeSelect={onChangeSelect}
                                                         rules={""}
                                                         index={index}
                                                         disbaled={timeDataItem.isDisabledDay}
                                                     />
                                                 </div>
                                                 <div className="form-group mb-0 to-input">
                                                     <SelectComponent
                                                         control={control}
                                                         name={"endTimeRes:" + timeDataItem.id}
                                                         options={timeDataItem.endTimeList}
                                                         errors={errors}
                                                         onChangeSelect={onChangeSelect}
                                                         rules={
                                                             ""
                                                         }
                                                         index={index}
                                                         disbaled={timeDataItem.isDisabledDay}
                                                     />
                                                 </div>
                                             </div>
                                         </td>
                                         <td className="selall-day">
                                             <div className="max-quantity-box">
                                                 <div className="form-check">
                                                     <label className="form-check-label" htmlFor={"allday:" + index}>
                                                         <input type="checkbox" className={`form-check-input`} disabled={timeDataItem.isDisabledCheck}
                                                             {...register(`allday:${timeDataItem.id}`)} onChange={(e) => handleChangeCheckbox(e, index)} id={"allday:" + timeDataItem.id}   name={"allday:" + timeDataItem.id}/>
                                                         <span >All Day</span>
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
                   <Link to="" id="btn-add-break-res" onClick={() => handleAddClick(true)}>
                     <img src={images.plusThemeSvg} />
                   </Link>
                 </div>
     
                 {isAddBreakModelShow && (
                   <div className="vehicle-form edit-contact-form">
                     <h3>Add Break</h3>
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
                     </div>
                     <div className="row">
                       <div className="col-sm-6">
                         <div className="form-group">
                           <label>Start Time</label>
                           <Controller
                             control={control}
                             name="startTime"
                             rules={{
                               required: {
                                 value: true,
                                 message: 'Start Time is required',
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
                                 options={startTime}
                                 id="startTime"
                                 name="startTime"
                                 value={startTime?.find(
                                   (c: any) => c.value === value?.value
                                 )}
                                 onChange={(val: any) =>
                                   onChangeStartTime(val.value)
                                 }
                               />
                             )}
                           />
                           <FeildErrorMessage
                             errors={errors}
                             name="startTime"
                             containerClass="w-100"
                           />
                         </div>
                       </div>
                       <div className="col-sm-6">
                         <div className="form-group">
                           <label>End Time</label>
                           <Controller
                             control={control}
                             name="endTime"
                             rules={{
                               required: {
                                 value: true,
                                 message: 'End Time is required',
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
                                 options={endTime}
                                 id="endTime"
                                 name="endTime"
                                 value={endTime?.find(
                                   (c: any) => c.value === value?.value
                                 )}
                                 onChange={(val: any) => onChange(val.value)}
                               />
                             )}
                           />
                           <FeildErrorMessage
                             errors={errors}
                             name="endTime"
                             containerClass="w-100"
                           />
                         </div>
                       </div>
                     </div>
                     <div className="row">
                       <div className="col-sm-12">
                         <div className="form-group">
                           <label>Resources</label>
                           <Controller
                             control={control}
                             name="resourcebreak"
                             rules={{
                               required: {
                                 value: true,
                                 message: 'Resource is required',
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
                                 options={resoureClosureList}
                                 id="resourcebreak"
                                 name="resourcebreak"
                                 value={resoureClosureList?.find(
                                   (c: any) => c.value === value?.value
                                 )}
                                 onChange={(val: any) => onchangeResourceBreak(val)}
                                 isMulti
                               />
                             )}
                           />
                           <FeildErrorMessage
                             errors={errors}
                             name="resourcebreak"
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
                           className="btn theme-btn btn-add-break-res-submit"
                           buttonLabel="Save"
                           handleClick={handleSubmit(onSubmitAddbreak)}
                         />
                       </div>
                     </div>
                   </div>
                 )}
                 {breakList?.map((resourcebreakitem: any, index: number) => (
                   <div className="contacts-list">
                     <div className="contact-item" key={resourcebreakitem}>
                       <div className="contact-item-header">
                         <div className="left-title">
                           <h5>{resourcebreakitem.name}</h5>
                           <p>
                            {String(resourcebreakitem.tempDisplayNameResource)} – {resourcebreakitem.startTime.time} -{" "}
                             {resourcebreakitem.endTime.time}
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
                     {resourcebreakitem.isOpen && (
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
                                 {resourcebreakitem.tempDayList.map(
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
                           </div>
                           <div className="row">
                             <div className="col-sm-6">
                               <div className="form-group">
                                 <label>Start Time</label>
                                 <Controller
                                   control={control}
                                   name={`startTime:${index}`}
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
                                       options={resourcebreakitem.startTimeList}
                                       id="startTime"
                                       name={`startTime:${index}`}
                                       value={resourcebreakitem.startTimeList?.find(
                                         (c: any) => c.value === value
                                       )}
                                       onChange={(val: any) => onChangeStartTimeEdit(val, "startTime", index)}
                                     />
                                   )}
                                 />
                                 <FeildErrorMessage
                                   errors={errors}
                                   name={`startTime:${index}`}
                                   containerClass="w-100"
                                 />
                               </div>
                             </div>
                             <div className="col-sm-6">
                               <div className="form-group">
                                 <label>End Time</label>
                                 <Controller
                                   control={control}
                                   name={`endTime:${index}`}
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
                                       options={resourcebreakitem.endTimeList}
                                       id="endTime"
                                       name={`endTime:${index}`}
                                       value={resourcebreakitem.endTimeList?.find(
                                         (c: any) => c.value === value
                                       )}
                                       onChange={(val: any) => onChangeStartTimeEdit(val, "endTime", index)}

                                     />
                                   )}
                                 />
                                 <FeildErrorMessage
                                   errors={errors}
                                   name={`endTime:${index}`}
                                   containerClass="w-100"
                                 />
                               </div>
                             </div>
                           </div>
                           <div className="row">
                           <div className="col-sm-12">
                             <div className="form-group">
                               <label>Resources</label>
                               <Controller
                                 control={control}
                                 name={`resourcebreak:${index}`}
                                 // rules={{
                                 //   required: {
                                 //     value: true,
                                 //     message: 'resource is required',
                                 //   },
                                 // }}
                                 render={({ field: { onChange, value } }: any) => (
                                   <Select
                                     // inputRef={ref}
                                     classNamePrefix={
                                       errors["calenderDay"]
                                         ? "error form-control-language"
                                         : "form-control-language"
                                     }
                                     // defaultValue={selectedcalenderDaysList[0].value}
                                     options={resoureClosureList}
                                     id="resourcebreak"
                                     name={`resourcebreak:${index}`}
                                     // value={resoureClosureList?.find(
                                     //   (c: any) => c.value === value?.value
                                     // )}
                                     value={
                                       value ||
                                       resoureClosureList?.filter((c: any) =>
                                       resourcebreakitem.resources?.find(
                                           (r: any) => r.value === c.value
                                         )
                                       )
                                     }
                                     onChange={(val: any) => onchangeResourcebreakEdit(val,index)}
                                     isMulti
                                   />
                                 )}
                               />
                               <FeildErrorMessage
                                 errors={errors}
                                 name={`resourcebreak:${index}`}
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
                                     resourcebreakitem,
                                     index,
                                     resourcebreakitem.id
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
                                     resourcebreakitem,
                                     resourcebreakitem.id
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
             <div className="col-xl-6 col-lg-6 col-md-12">
               <div className="vehicle-form contact-list">
                 <div className="vh-form-header">
                   <h3>Resource Closures</h3>
                   <Link to="" id="btn-add-closure-res" onClick={() => handleAddclousureClick(true)}>
                     <img src={images.plusThemeSvg} />
                   </Link>
                 </div>
     
                 {isAddcloueserModelShow && (
                   <div className="vehicle-form edit-contact-form">
                     <h3>Add Resource Closures</h3>
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
                           <label>Resources</label>
                           <Controller
                             control={control}
                             name="resource"
                             rules={{
                               required: {
                                 value: true,
                                 message: 'Resource is required',
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
                                 options={resoureClosureList}
                                 id="resource"
                                 name="resource"
                                 value={resoureClosureList?.find(
                                   (c: any) => c.value === value?.value
                                 )}
                                 onChange={(val: any) => onchangeResource(val)}
                                 isMulti
                               />
                             )}
                           />
                           <FeildErrorMessage
                             errors={errors}
                             name="resource"
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
                           className="btn theme-btn btn-add-closure-res-submit"
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
                             {new Date(resourceclosureitem.startDate).toDateString()} -{" "}
                             {new Date(resourceclosureitem.endDate).toDateString()}
                           </p>
                           <h5>{String(resourceclosureitem.tempDisplayNameResource)}</h5>
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
                         <h3>Edit Resource Closures</h3>
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
                                   onChange: (e: any) => onChangeStartDateInEdit(e,index),
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
                            className={errors.startDate || errors.endDate ? "mb-5 d-block" : "mb-0 d-block"}
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
                               <label>Resources</label>
                               <Controller
                                 control={control}
                                 name={`resource:${index}`}
                                 // rules={{
                                 //   required: {
                                 //     value: true,
                                 //     message: 'resource is required',
                                 //   },
                                 // }}
                                 render={({ field: { onChange, value } }: any) => (
                                   <Select
                                     // inputRef={ref}
                                     classNamePrefix={
                                       errors["calenderDay"]
                                         ? "error form-control-language"
                                         : "form-control-language"
                                     }
                                     // defaultValue={selectedcalenderDaysList[0].value}
                                     options={resoureClosureList}
                                     id="resource"
                                     name={`resource:${index}`}
                                     // value={resoureClosureList?.find(
                                     //   (c: any) => c.value === value?.value
                                     // )}
                                     value={
                                       value ||
                                       resoureClosureList?.filter((c: any) =>
                                         resourceclosureitem.resources?.find(
                                           (r: any) => r.value === c.value
                                         )
                                       )
                                     }
                                     onChange={(val: any) => onchangeResourceEdit(val,index)}
                                     isMulti
                                   />
                                 )}
                               />
                               <FeildErrorMessage
                                 errors={errors}
                                 name={`resource:${index}`}
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
           </div>
           <ErrorMessage
                      errMessage={apiResponseErr}
                      containerClass="w-100"
                    />
           <div className="form-save-btn">
           <Button
              buttonLabel="Save"
              handleClick={handleSubmit((data) =>
                  handleUpdateResourceAvailablity(
                  data
                  )
              )}
              className="theme-btn"
          />
           </div>
      </> 
      :
      <div className="not-found">

        <h2>No Resource Found</h2>
      </div>
                  }
       

    </div>
    </div>
  );
};

export default Resources;



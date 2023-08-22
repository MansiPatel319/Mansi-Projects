import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Select from 'react-select';

import FeildErrorMessage from "../../UI/FeildErrorMessage"

import images from '../../../Assets/images';

import { getAceesspointOfResourceList, getALLResourceList } from '../../../Network/Core/SiteManagement/resourse';
import { getdataAccespointList, getdataASiteList } from '../../../Network/Core/SiteManagement/siteDetails';
import { setBookingDetails, setShowSitePlan } from '../../../Store/Actions/BookingModule/bookingActionCreator';
import { getVehicleTypeList } from '../../../Network/Core/Booking/booking';
import { getLocalStorage } from '../../../Network/ApiService';
import { constants } from '../../../Library/Constants';

export interface schedulingInformationProps {
}

const SchedulingInformation = () => {

    const dispatch = useDispatch()
    const { project } = useParams()
    const { t } = useTranslation()
    const navigate = useNavigate()
    const bookingSteps = useSelector((state: any) => state.booking.bookingSteps)
    const bookingType = useSelector((state: any) => state.booking.bookingType)
    const [isLoading, setIsLoading] = useState(false)
    const [apiResponseErr, setApiResponseErr] = useState<string>("");
    const [siteListing, setSiteListing] = useState<any>([]);

    const [siteId, setSiteId] = useState('')
    const [accesspointId, setAccesspointId] = useState('')
    const [accesspoint, setAccessPoint] = useState([])
    const [resource, setResource] = useState([])
    const [vehicleType, setVehicleType] = useState<any>([])
    const bookingFileds = getLocalStorage(constants.PROJECT_BOOKING_FILED)
    const [isResourceActive,setIsResourceActive] = useState(false)
    const [isVehicleTypeActive, setIsVehicleTypeActive] = useState(false)
    const [isResourceMandatory,setIsResourceMandatory] = useState(false)
    const [isVehicleTypeMandatory, setIsVehicleTypeMandatory] = useState(false)
    const {
        register, // this use for evnets and value
        setValue, // this use for value set their feild
        handleSubmit, // this is form submit handle
        getValues,
        setError,
        clearErrors,
        
        control,
        formState: { errors,isValid }, // error like required,validate, etc..
    } = useForm();

    const handleNext = (data: any) => {
        console.log('e :>> ', data);
        // e.preventDefault()
        let temp = [...bookingSteps]
        const SelectedDataIndex = temp &&  temp?.findIndex((bookingStepItem: any) => bookingStepItem.name === bookingType)

        // const SelectedDataIndex = temp.findIndex((bookingStepItem: any) => bookingStepItem.name === bookingType)
       
        temp[SelectedDataIndex].stepCount = 2;
        temp[SelectedDataIndex].data.schedulingInformation=data
        dispatch(setBookingDetails(temp))

    }
    const handlePrev = (e: any) => {
        e.preventDefault()
        let temp = [...bookingSteps]
        const SelectedDataIndex = temp &&  temp?.findIndex((bookingStepItem: any) => bookingStepItem.name === bookingType)

        // const SelectedDataIndex = temp.findIndex((bookingStepItem: any) => bookingStepItem.name === bookingType)
        temp[SelectedDataIndex].stepCount = 0
        temp[SelectedDataIndex].data.schedulingInformation = {
           
                site: siteId,
                accesspoint: getValues("accesspoint"),
                vehicleType: getValues("vehicleType"),
                resource: getValues("resource")
           
        }
        dispatch(setBookingDetails(temp))

    }
    const handleViewSitePlan = () => {
        const sitePlan = siteListing.find((item:any)=>item.value=siteId).plan
        dispatch(setShowSitePlan(sitePlan))
    }
    const onChangeSite = (val: any) => {
        setResource([]);
        setAccessPoint([]);
        clearErrors('site');
        setValue("site", val)
        setSiteId(val);
    }
    const validate = (value:any) => {
        if (getValues("name")) { // read the checkbox value
          return !!value;
        }
    
        return true;
      };
    const handleChangeData = (name: string, value: any) => {
        // setResource([]);
        // setAccessPoint([]);
        if (name === 'site')
        {
            
            setSiteId(value)
        }
        else {
            setAccesspointId(value)
            // getResourceList();
        }
        setValue(name,value)
        clearErrors(name);

        
    }

    const getResourceList = async () => {
        setIsLoading(true);
        try {
            const res = await getAceesspointOfResourceList(project, siteId,accesspointId, true);
            // toast.loading("checking pass info");
            const { status, data, statusText } = res;
            switch (status) {
                case 200:
                    setIsLoading(false);
                    data.results.forEach((item: any) => {
                        item.value = item.id;
                        item.label = item.name;
                    })
                    setResource(data.results)

                    break;
                case 400:
                    setIsLoading(false);
                    setApiResponseErr(data);
                    break;
                case 403:
                    if (data.detail === "ERR_login_again_token_expired") {
                        //   toast.error(t("userManagment.error_login_again"));
                        localStorage.clear()
                        navigate('/login')
                    }
                    setIsLoading(false);
                    break
                default:
                    setIsLoading(false);
                    setApiResponseErr(statusText);
                    break;
            }
        } catch (err) {
            // toast.error("Somthing went wrong");
        }
    };
    const getAccespointList = async () => {
        setIsLoading(true);
        try {
            const res = await getdataAccespointList(project, siteId, true);
            // toast.loading("checking pass info");
            const { status, data, statusText } = res;
            switch (status) {
                case 200:
                    setIsLoading(false);
                    data.results.forEach((item: any) => {
                        item.value = item.id;
                        item.label = item.name;
                    })
                    setAccessPoint(data.results);
                    break;
                case 400:
                    setIsLoading(false);
                    setApiResponseErr(data);
                    
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
                    setApiResponseErr(statusText);
                    break;
            }
        } catch (err) {
            // toast.error("resource.error_something_went_wrong");
        }
    };
    const getSiteList = async () => {
        setIsLoading(true);
        try {
            const res = await getdataASiteList(project, true);
            const { status, data, statusText } = res;
            switch (status) {
                case 200:
                    setIsLoading(false);

                    var Array: { label: any; value: any; }[] = [];
                    data.results.map((item: any) => {
                        let tempdata = {
                            label: item.name,
                            value: item.id,
                            plan: item.plan
                        }
                        Array.push(tempdata);
                    })
                    setSiteListing(Array);

                    break;
                case 400:
                    setIsLoading(false);
                    setApiResponseErr(data);
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
                    setApiResponseErr(statusText);
                    break;
            }
        } catch (err) {
            toast.error("Somthing went wrong");
        }
    };
    const getVehicleType = async() => {
        try {
          const res = await getVehicleTypeList(project);
          const { status, data, statusText } = res;
          switch (status) {
            case 200:
                  var Array: { label: any; value: any; }[] = [];
              data.map((item: any) => {
                let tempdata = {
                    label: item.id.name,
                    value: item.id.id
                }
                Array.push(tempdata);
              })
                  console.log('Array', Array);
              setVehicleType(Array);
             
              break;
            case 400:
              // setApiResponseErr(data);
              break;
            case 401:                
              localStorage.clear();
              navigate('/login') 
              // setIsLoading(false);
              break;  
            case 403:
                if (data.detail === "ERR_login_again_token_expired") {
                  toast.error(t("userManagment.error_login_again"));
                  localStorage.clear()
                  navigate('/login')
                }
    
                break
            default:
              // setApiResponseErr(statusText);
              break;
          }
        } catch (err) {
          toast.error("Somthing went wrong");
        }
      }
    useEffect(() => {
        getSiteList()
        getVehicleType()
    }, []);
    useEffect(() => {
        if (siteId){
            if(bookingType==='Resource-Only'){
                getResourceList();
            }
            else{
                getAccespointList()
            }
        }
    }, [siteId]);
    useEffect(() => {
        if (accesspointId){
            clearErrors("accesspoint");
            setValue("accesspoint",accesspointId)
            getResourceList();
           
        }
    }, [accesspointId]);
    useEffect(() => {
        let temp = [...bookingSteps]
        const SelectedDataIndex = temp && temp?.findIndex((bookingStepItem: any) => bookingStepItem.name === bookingType)
        let schedulingData = temp[SelectedDataIndex]?.data?.schedulingInformation
       console.log('schedulingData :>> ', schedulingData);
        if (schedulingData.site !=='' && schedulingData.site !==undefined)
        {
            setSiteId(schedulingData.site)
            setValue("site", schedulingData.site )
        }
        if (schedulingData.accesspoint !=='' && schedulingData.accesspoint !==undefined)
        {
            setAccesspointId(schedulingData.accesspoint)
            setValue("accesspoint", schedulingData.accesspoint )
        }
        // setValue("accesspoint",schedulingData.accesspoint)
        setValue("vehicleType",schedulingData.vehicleType)
        setValue("resource",schedulingData.resource)
    }, [bookingSteps,siteListing, accesspoint,vehicleType,resource,vehicleType])
    useEffect(() => {
    setIsResourceActive(bookingFileds?.coreFields?.find((item:any)=>item.field.fieldCode==="resource").isActive)
    setIsVehicleTypeActive(bookingFileds?.coreFields?.find((item: any) => item.field.fieldCode === "vehicle_type").isActive)
    setIsResourceMandatory(bookingFileds?.coreFields?.find((item:any)=>item.field.fieldCode==="resource").mandatory)
    setIsVehicleTypeMandatory(bookingFileds?.coreFields?.find((item:any)=>item.field.fieldCode==="vehicle_type").mandatory)
    }, [JSON.stringify(bookingFileds?.coreFields)]);
    useEffect(() => {
        if (siteId)
            {            
            clearErrors("site");
            setValue("site",siteId)
            }
    },[siteId])
  console.log('siteId :>> ', siteId);
    return (
        <div className="row">
            <div className="col-md-6">
                <div className="step-from">
                    <form>
                        <div className="sec-top">
                            <div className="vehicle-form" id="vehicle-form">
                                <h3>Vehicle</h3>
                                <div className="form-group">
                                    <label>Select Site</label>
                                    <Controller
                                        control={control}
                                        name="site"
                                        rules={{
                                            required: {
                                              value: true,
                                              message:"Site is required",
                                            },
                                          }}

                                        render={({ field: { onChange, value } }: any) => (
                                            <Select
                                                classNamePrefix="form-control-language"
                                                options={siteListing}
                                                // id="site"
                                                name="site"
                                                value={siteListing?.find(
                                                    (c: any) => c.value === value

                                                    
                                                )}
                                                onChange={(val: any) => {
                                                    // onChange(val);
                                                    handleChangeData("site", val.value)
                                                }}
                                                // onChange={(val: any) => onChange(val.value)}
                                            />
                                        )}
                                    />
                                    <FeildErrorMessage
                                        errors={errors}
                                        name="site"
                                        containerClass="w-100"
                                    />
                                </div>
                                {siteId && bookingType!=="Resource-Only" && (

                                    <div className="form-group">
                                        <label>Access Point</label>
                                        <Controller
                                            control={control}
                                            name="accesspoint"
                                            rules={{
                                                required: {
                                                  value: true,
                                                  message:"Accesspoint is required",
                                                },
                                              }}
                                            render={({ field: { onChange, value } }: any) => (
                                                <Select
                                                    classNamePrefix="form-control-language"
                                                    options={accesspoint}
                                                    name="accesspoint"
                                                    value={accesspoint?.find(
                                                        (c: any) => c.value === value
                                                    )}
                                                    // onChange={(val: any) => onChange(val.value)}
                                                    onChange={(val: any) => handleChangeData("accesspoint",val.value)}
                                                />
                                            )}
                                        />
                                        <FeildErrorMessage
                                            errors={errors}
                                            name="accesspoint"
                                            containerClass="w-100"
                                        />
                                    </div>
                                )}
                                {isVehicleTypeActive && bookingType!=="Resource-Only" && (
                                    <div className="form-group mb-0">
                                    <label>Vehicle type</label>
                                    <Controller
                                        control={control}
                                        name="vehicleType"
                                            rules={{
                                                required: {
                                                    value: isVehicleTypeMandatory,
                                                    message: "Vehicle type is required",
                                                },
                                            }}
                                           
                                        render={({ field: { onChange, value } }: any) => (
                                            <Select
                                                classNamePrefix="form-control-language"
                                                options={vehicleType}
                                                id="vehicleType"
                                                name="vehicleType"
                                                value={vehicleType?.find(
                                                    (c: any) => c.value=== value
                                                )}
                                                onChange={(val: any) => onChange(val.value)}
                                                // onChange={(val: any) => handleChangeData("vehicleType",val.value)}
                                            />
                                        )}
                                    />
                                    <FeildErrorMessage
                                        errors={errors}
                                        name="vehicleType"
                                        containerClass="w-100"
                                    />
                                    </div>

                                )}
                                 {isResourceActive && 
                               siteId && (

                                    <div className="form-group res">
                                        <label>Resource</label>
                                        <Controller
                                            control={control}
                                            name="resource"
                                            rules={{
                                                required: {
                                                    value: isResourceMandatory,
                                                  message:"Resource is required",
                                                },
                                              }}
                                            render={({ field: { onChange, value } }: any) => (
                                                <Select
                                                    classNamePrefix="form-control-language"
                                                    options={resource}
                                                    name="resource"
                                                    value={resource?.find(
                                                        (c: any) => c.value === value
                                                    )}
                                                    onChange={(val: any) => onChange(val.value)}
                                                    // onChange={(val: any) => handleChangeData("resource",val.value)}
                                                />
                                            )}
                                        />
                                        <FeildErrorMessage
                                            errors={errors}
                                            name="resource"
                                            containerClass="w-100"
                                        />
                                    </div>
                                )
                                }
                            </div>
                         
                        </div>
                       
                        <div className="btn-section form-btn">
                            <button className="btn white-btn back-btn" onClick={(e)=>handlePrev(e)}>
                                <img src={images.backarrow} /> Back
                            </button>
                            <button onClick={handleSubmit(handleNext)} className="btn theme-btn">
                                Next <img src={images.ForwardArrow} />
                            </button>
                        </div>

                    </form>
                </div>
            </div>
            <div className="col-md-6">
                <div className="form2-right">
                    <p>Contact Site Super Steven with questions at steve@sitesuper.com.
                        Download the mobile apps here to schedule and view your deliveries </p>
                </div>
                {siteId && (
                    <div className="form2-right site-plan">
                        <span className="site-plan-text">Site Plan</span>
                        <Link to="#" onClick={() => handleViewSitePlan()}>Click here to view a full size site plan</Link>
                    </div>
                )}
            </div>   
          
        </div>

    );
}

export default SchedulingInformation;

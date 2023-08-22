import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

// component
import Input from '../../../UI/Input';
import Button from '../../../UI/Button';
import FeildErrorMessage from "../../../UI/FeildErrorMessage";
import CommonErrorMessage from "../../../UI/CommonErrorMessage";

// image
import images from '../../../../Assets/images';

// api
import { getdataAccespointList, getdataASiteList } from '../../../../Network/Core/SiteManagement/siteDetails';
import { addResource, editResource, getALLResourceList, removeResource } from '../../../../Network/Core/SiteManagement/resourse';

// helper
import { getLocalStorage } from '../../../../Network/ApiService';
import { constants } from '../../../../Library/Constants';

//css
import "../../../../Assets/css/customize.css";


const Resources = () => {

  const [resourceItems, setResourceItems] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiResponseErr, setApiResponseErr] = useState<string>("");
  const project = getLocalStorage(constants.PROJECT);
  const [accesspoint, setAccessPoint] = useState([])
  const projectRole = getLocalStorage(constants.USER)?.projectRole;
  const [siteListing,setSiteListing] = useState<any>([]);
  const [isShowSiteId,setisShowSiteId] = useState(false);
  const [siteId,setSiteId] = useState();
  const { t } = useTranslation()
  const navigate = useNavigate()
  const {
    register, // this use for evnets and value
    setValue, // this use for value set their feild
    handleSubmit, // this is form submit handle
    getValues,
    setError,
    clearErrors,
    control,
    formState: { errors }, // error like required,validate, etc..
  } = useForm();
  const handleAddClick = () => {

    const tempAccessItem = {
      id: Math.random(),
      name: '',
      accesspoint: '',
      maxQuantity: '',
      active: false,
      switch: false,
      edit: true,
      add: true,
    };
    setResourceItems([...resourceItems, tempAccessItem]);
    setValue(`id:${resourceItems.length}`, Math.random());
    setValue(`name:${resourceItems.length}`, tempAccessItem.name);
    setValue(`accesspoint:${resourceItems.length}`, tempAccessItem.accesspoint);
    setValue(`maxQuantity:${resourceItems.length}`, tempAccessItem.maxQuantity);
    setValue(`active:${resourceItems.length}`, tempAccessItem.active);
    setValue(`switch:${resourceItems.length}`, tempAccessItem.switch);
    setValue(`edit:${resourceItems.length}`, tempAccessItem.edit);

    // setisOpenAddModel(false);
  }
  const setData = (data: any) => {
    data && data?.map((item: any, index: number) => {
      const accessPoint = item?.accessPoint
      accessPoint.forEach((acItem: any) => {
        acItem.label = acItem?.name;
        acItem.value = acItem?.id;
        delete acItem.id
        delete acItem.isActive
        delete acItem.name
        delete acItem.ord
        delete acItem.project
        delete acItem.units
      }
      )
      setValue(`name:${index}`, item.name);
      setValue(`accesspoint:${index}`, accessPoint);
      setValue(`maxQuantity:${index}`, item.maxQuantity === -1 ? '' : item.maxQuantity);
      setValue(`active:${index}`, item.maxQuantity === -1);
      setValue(`switch:${index}`, item.isActive);
      setValue(`edit:${index}`, false);
      setValue(`add:${index}`, false);
      return item
    })
  }
  const onChange = (e: any,index:any) => {
    const { name, value } = e.target;
    switch (name) {
      case `maxQuantity:${index}`:
        
        if (value === "") {
          setError(name, {
            type: "required",
            message: t("accessPoint.error_maxunit_required"),
          });
        } 
        else if(value) {
          if (Math.sign(value) === -1) {
            setValue(`maxQuantity:${index}`,'');
            setError(name, {
              type: "required",
              message: "maxunit not pass in negative number",
            });
          }
          else{
            setValue(`maxQuantity:${index}`,value);
            clearErrors(name);
          }
        }
        else {
        
        }
        break;
      default:
        break
    }
  };
  const handleClockUnlimited = (e: any,index:any)=>{
    const { value } = e.target;
    if(value=="on"){
      clearErrors(`maxQuantity:${index}`);
    }
  }
  const getResourceList = async () => {
    setIsLoading(true);
    try {
      const res = await getALLResourceList(project.ref,siteId, true);
      // toast.loading("checking pass info");
      const { status, data, statusText } = res;
      switch (status) {
        case 200:
          setIsLoading(false);
          setData(data?.results)
          setResourceItems(data?.results)
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
      // toast.error("Somthing went wrong");
    }
  };
  const handleSubmitResource = async (data: any, i: number) => {
    if(!getValues(`maxQuantity:${i}`)&&!getValues(`active:${i}`)){
      setError(`maxQuantity:${i}`, {
        type: "required",
        message: "Please enter max quantity",
      });
    }
    else{
      setIsLoading(true);
      try {
        let accessPoint = []
        accessPoint = getValues(`accesspoint:${i}`)?.map((item: any) => item.value)
        const resData: any = {
          "name": getValues(`name:${i}`),
          "access_point": accessPoint,
          "max_quantity": getValues(`active:${i}`) ? -1 : getValues(`maxQuantity:${i}`),
          // "project": 0,
          "is_active": getValues(`switch:${i}`)
        }
        const res: any = await addResource(resData, project.ref,siteId, true);
        toast.loading("checking pass info");
        const { status, data, statusText } = res;
        switch (status) {
          case 201:
            getResourceList()
            setIsLoading(false);
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
    }


  
  }


  const handleRemoveResourceItem = async (id: number) => {

    try {

      const res: any = await removeResource(id, project.ref,siteId, true);
      toast.loading("checking pass info");
      const { status, data, statusText } = res;
      switch (status) {
        case 204:
          getResourceList()
          setIsLoading(false);
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
  const handleEditResourceItem = (i: number) => {
    const tempItem: Array<any> = [...resourceItems];
    tempItem[i].edit = true
    setResourceItems(tempItem);
  }
  const handleEditResource = async (i: number, id: any) => {
    if(!getValues(`maxQuantity:${i}`)&&!getValues(`active:${i}`)){
      setError(`maxQuantity:${i}`, {
        type: "required",
        message: "Please enter max quantity",
      });
    }
    else{
      try {
        let accessPoint = []
        accessPoint = getValues(`accesspoint:${i}`).map((item: any) => item.value)
        const resData: any = {
          "name": getValues(`name:${i}`),
          "access_point": accessPoint,
          "max_quantity": getValues(`active:${i}`) ? -1 : getValues(`maxQuantity:${i}`),
          // "project": 0,
          "is_active": getValues(`switch:${i}`)
        }
        const res: any = await editResource(resData, id, project.ref,siteId, true);
        toast.loading("checking pass info");
        const { status, data, statusText } = res;
        switch (status) {
          case 200:
            getResourceList()
            setIsLoading(false);
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
        toast.error("resource.error_something_went_wrong");
      }
    }

  };
  const getAccespointList = async () => {
    setIsLoading(true);
    try {
      const res = await getdataAccespointList(project.ref,siteId, true);
      // toast.loading("checking pass info");
      const { status, data, statusText } = res;
      switch (status) {
        case 200:
          setIsLoading(false);
          data.results.forEach((item: any) => {
            item.value = item.id;
            item.label = item.name;
          })
          setAccessPoint(data.results)
          // setResourceItems(data);
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
      const res = await getdataASiteList(project.ref, true);
      const { status, data, statusText } = res;
      switch (status) {
        case 200:
          setIsLoading(false);
          
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
const handleGoClickevent =()=>{
  
if(!siteId){
setError('site',{
type: "required",
message: "Please Select site"
}
)
}
else{
  getAccespointList()
    getResourceList()
    setisShowSiteId(true);
}
}
const onChangeSite =(val:any)=>{
  setResourceItems([]);
  clearErrors('site');
  setSiteId(val);
}

  useEffect(() => {
   
    getSiteList();
  }, []);
  return (
    <div className="tab-pane fade show active" id="nav-resources" role="tabpanel" aria-labelledby="nav-resources-tab">
     
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
        </div>

        {isShowSiteId &&
      <div className="vehicle-form contact-list">
        <div className="vh-form-header">
          <h3>{t('resource.details_heading_text')}</h3>
          {
            projectRole === constants.PROJECT_ADMIN || projectRole === constants.PROJECT_OWNER && (

          <Link to="#" onClick={() => { handleAddClick() }} >
            <img src={images.plusTheme} alt="add-icon" />
          </Link>
            )
          }
        </div>
           
        <div className="table-responsive resources-table">
          <form>
            {resourceItems && resourceItems.length > 0 ?
            <table className="table">
              <thead>
                <tr>
                  <th>{t('resource.resource_text')}</th>
                  <th>{t('resource.accesspoint_text')}</th>
                  <th>{t('resource.maxqty_text')}</th>
                  <th>{t('resource.active_text')}</th>
                  <th>&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                {
                  resourceItems?.map((resourceItem: any, index: number) => (
                    <tr>

                      <td>
                        <div className="form-group mb-0 resource-input">
                          <Input
                            inputName={`name:${index}`}
                            className={errors[`name:${index}`] ? "form-control error" :"form-control"}          
                            register={register}
                            rules={{
                              required: {
                                value: true,
                                message: t("resource.error_name_required"),
                              },

                              // onChange: (e: any) => onChange(e),
                            }}
                            disabled={!resourceItem.edit}
                            id="contact_edit_name"
                            inputType="text"
                          />
                          <FeildErrorMessage
                            errors={errors}
                            name={`name:${index}`}
                            containerClass="w-100"
                          />
                        </div>
                      </td>
                      <td>
                        <div className="form-group mb-0 select-accesspoint">

                          <Controller
                            control={control}
                            name={`accesspoint:${index}`}
                            rules={{
                              required: {
                                value: true,
                                message: `${t("userManagment.error_accesspoint_required")}`,
                              },
                            }}
                            render={({ field: { onChange, value } }: any) => (
                              <Select
                                classNamePrefix={errors[`accesspoint:${index}`] ? "error form-control-language" :"form-control-language"}
                                options={accesspoint}
                                id="accesspoint"
                                name={`accesspoint:${index}`}
                                value={value || accesspoint?.filter((c: any) => resourceItem.accessPoint?.find((r: any) => r.value === c.value))}
                                onChange={(val: any) => onChange(val)}
                                isMulti
                                isDisabled={!resourceItem.edit}

                              />
                            )}
                          />
                          <FeildErrorMessage
                            errors={errors}
                            name={`accesspoint:${index}`}
                            containerClass="w-100"
                          />

                        </div>
                      </td>
                      <td>
                        <div className="max-quantity-box">
                          <div className="form-group mb-0">
                            <Input
                              inputName={`maxQuantity:${index}`}
                              register={register}
                              rules={{
                                // required: {
                                //   value: true,
                                //   message: t("resource.error_maxqty_required"),
                                // },

                                onChange: (e: any) => onChange(e,index),
                              }}
                              id="maxQuantity"
                              inputType="number"
                              disabled={!resourceItem.edit}
                              minDate={0}
                            />
                            <FeildErrorMessage
                              errors={errors}
                              name={`maxQuantity:${index}`}
                              containerClass="w-100"
                            />
                            {/* <input type="text" name="" value="2" className="form-control" /> */}
                          </div>
                          <div className="form-check">
                            <label className="form-check-label" htmlFor="active">
                              <Input
                                inputName={`active:${index}`}
                                register={register}
                                id="active"
                                inputType="checkbox"
                                className="form-check-input"
                                handleClick={(e:any)=>handleClockUnlimited(e,index)}
                                disabled={!resourceItem.edit}
                              />
                              <span className='resource_Quantity'>Unlimited</span>
                              {/* <input type="checkbox" className="form-check-input" id="check2" name="option2" value="something" /><span>Unlimited</span> */}
                            </label>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="switch-box">
                          <label className="switch">

                            <input type="checkbox" disabled={!resourceItem.edit}
                              {...register(`switch:${index}`)} id="resonlybooking" />
                            <span className="slider round" />
                          </label>
                          <span className="switch-label" />
                        </div>
                      </td>
                      <td>
                        <div className="table-action">
                          {
                            resourceItem.edit || resourceItem.add ? (
                              <>
                                {/* <button type="button"  onClick={()=>handleRemoveResourceItem(index)} className="btn btn-link cancel-link edit-contact-cancel accesspoint-cancle">cancel</button>
                                <button className="theme-btn" onClick={handleSubmit((data) =>
                                  handleSubmitResource(data)
                                )}>Save</button> */}
                                <Button
                                  buttonLabel={t("resource.btn_remove")}
                                  className="btn btn-link cancel-link edit-contact-cancel accesspoint-cancle"
                                  handleClick={() =>
                                    handleRemoveResourceItem(resourceItem.id)
                                  }
                                />

                                <Button
                                  disabled={isLoading}
                                  buttonLabel={t("resource.btn_add")}
                                  className="theme-btn"
                                  handleClick={handleSubmit((data) =>
                                    resourceItem.add ? handleSubmitResource(data, index) : handleEditResource(index, resourceItem.id)
                                  )}
                                />
                              </>
                            ) : (
                              projectRole === constants.PROJECT_ADMIN || projectRole === constants.PROJECT_OWNER && (

                                <Link className="edit-icon" onClick={() =>
                                  handleEditResourceItem(index)
                                } to="#">
                                  <img src={images.edit} alt="edit"   />
                                </Link>
                              )

                            )
                          }
                          {/* {projectRole === constants.PROJECT_ADMIN || projectRole === constants.PROJECT_OWNER && (

                            <a className="action-icon" href="#">
                              <img src={images.action} alt="action"   />
                            </a>
                          )} */}
                        </div>
                      </td>
                    </tr>

                  ))
                }
              </tbody>
            </table>
               :(
                <h2>No Resource found</h2>
              )}
            <CommonErrorMessage
              errMessage={apiResponseErr}
              containerClass="w-100 profileSetup_error"
            />
          </form>
        </div>
      </div>
}
    </div>

  );
}

export default Resources;

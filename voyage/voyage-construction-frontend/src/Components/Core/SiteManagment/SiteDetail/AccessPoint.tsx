import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useForm,Controller } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Select from "react-select";
// component
import Button from "../../../UI/Button";
import FeildErrorMessage from "../../../UI/FeildErrorMessage";
import Input from "../../../UI/Input";
import CommonErrorMessage from "../../../UI/CommonErrorMessage";

// images
import images from "../../../../Assets/images";

// API
import {
  addaccesspoint,
  editaccesspoint,
  getdataAccespointList,
  getdataASiteList,
  removeaccesspoint,
} from "../../../../Network/Core/SiteManagement/siteDetails";
import { getLocalStorage } from "../../../../Network/ApiService";
// helper
import { constants } from "../../../../Library/Constants";
import { type } from "@testing-library/user-event/dist/type";

const AccessPoint = () => {
  const [isOpenAddModel, setisOpenAddModel] = useState(false);
  // const [isOpenEditModel, setisOpenEditModel] = useState({ id: 0, isOpen: false });
  const [apiResponseErr, setApiResponseErr] = useState<string>("");
  const [accessPointItems, setAccessPointItems] = useState<any>([]);
  const [siteListing,setSiteListing] = useState<any>([]);
  const [siteId,setSiteId] = useState();
  const [isShowSiteId,setisShowSiteId] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const project = getLocalStorage(constants.PROJECT);
  const { t } = useTranslation();
  const {
    register, // this use for evnets and value
    handleSubmit, // this is form submit handle
    setError,
    setValue,
    getValues,
    control,
    clearErrors,
    formState: { errors },
  } = useForm();
  const projectRole = getLocalStorage(constants.USER)?.projectRole;
  const navigate = useNavigate()


  const handleAddClick = (status: any) => {
    setisOpenAddModel(status);
    setValue(`name`, "");
    setValue(`maxUnit`, "");
  };

  const handleEditClick = (status: boolean, i: number) => {
    const tempItem: Array<any> = [...accessPointItems];
    tempItem[i].isOpen = status;
    setAccessPointItems([...tempItem]);
    setValue(`name:${i}`, accessPointItems[i].name);
    setValue(`maxUnit:${i}`, accessPointItems[i].units);
  };

  const onChange = (e: any) => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        if (value === "") {
          setError(name, {
            type: "required",
            message: t("accessPoint.error_name_required"),
          });
        } else {
          clearErrors(name);
        }
        break;
      case "maxUnit":
        if (value === "") {
          setError(name, {
            type: "required",
            message: t("accessPoint.error_maxunit_required"),
          });
        } 
        else if(value) {
          if (Math.sign(value) === -1) {
            setValue('maxunit','');
            setError(name, {
              type: "required",
              message: "maxunit not pass in negative number",
            });
          }
          else{
            setValue('maxunit',value);
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
  const onChangeEdit = (e: any,index:any) => {
    const { name, value } = e.target;
    switch (name) {
      case `name:${index}`:
        if (value === "") {
          setError(name, {
            type: "required",
            message: t("accessPoint.error_name_required"),
          });
        } else {
          clearErrors(name);
        }
        break;
      case `maxUnit:${index}`:
        if (value === "") {
          setError(name, {
            type: "required",
            message: t("accessPoint.error_maxunit_required"),
          });
        } 
        else if(value) {
          if (Math.sign(value) === -1) {
            setValue('maxunit','');
            setError(name, {
              type: "required",
              message: "maxunit not pass in negative number",
            });
          }
          else{
            setValue('maxunit',value);
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
  const getAccespointList = async () => {
    setIsLoading(true);
    try {
      const res = await getdataAccespointList(project.ref,siteId, true);
      const { status, data, statusText } = res;
      switch (status) {
        case 200:
          setIsLoading(false);
          setAccessPointItems(data.results);
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

  const onSubmitAddAccessPoint = async (userData: any) => {
    setIsLoading(true);
    try {
      const res = await addaccesspoint(
        {
          name: userData.name,
          units: userData.maxUnit,
        },
        project.ref,
        siteId
      );
      const { status, data, statusText } = res;
      switch (status) {
        case 201:
          setIsLoading(false);
          toast.success("Successfully Add Accesspoint");
          handleAddClick(false);
          getAccespointList();
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
  const handleEditAccessPointItem = async (
    userData: any,
    i: number,
    id: any
  ) => {
    setIsLoading(true);
    try {
      const res = await editaccesspoint(
        {
          name: userData[`name:${i}`],
          units: userData[`maxUnit:${i}`],
        },
        project.ref,
        siteId,
        id
      );
      const { status, data, statusText } = res;
      switch (status) {
        case 200:
          setIsLoading(false);
          toast.success("Successfully Edit Accesspoint");
          const tempItem: Array<any> = [...accessPointItems];
          tempItem[i].isOpen = false;
          getAccespointList();
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
  const handleRemoveAccessPointItem = async (i: number, id: any) => {
    setIsLoading(true);
    try {
      const res = await removeaccesspoint(project.ref,siteId, id);
      const { status, data, statusText } = res;
      switch (status) {
        case 204:
          setIsLoading(false);
          toast.success("Successfully Delete Accesspoint");
          const tempItem: Array<any> = [...accessPointItems];
          tempItem[i].isOpen = false;
          getAccespointList();
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
  setisShowSiteId(true);
  getAccespointList();
}
}
const onChangeSite =(val:any)=>{
  setAccessPointItems([]);
  clearErrors('site');
  setSiteId(val);
}
  useEffect(() => {
    getSiteList();
  }, []);

  return (
    <div
      className="tab-pane fade show active"
      id="nav-access-points"
      role="tabpanel"
      aria-labelledby="nav-access-points-tab">
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
        {isShowSiteId  && 
          <div className="vehicle-form contact-list">
          <div className="vh-form-header">
            <h3>{t("accessPoint.details_heading_text")}</h3>
          {projectRole === constants.PROJECT_ADMIN || projectRole === constants.PROJECT_OWNER && (          
            <Link
              to="#"
              id="add-contact-btn"
              onClick={() => handleAddClick(true)}>
              <img src={images.plusTheme} alt="add-icon" />
            </Link>
          )}
          </div>
          {isOpenAddModel && (
            <div
              className="vehicle-form"
              id="add-contact-form"
              style={{ display: "block" }}>
              <h3>{t("accessPoint.add_access_point")}</h3>
              <form>
                <div className="form-group">
                  <label>{t("accessPoint.label_name")}</label>
                  <Input
                    inputName="name"
                    className={errors['name'] ? "form-control error" :"form-control"}          
                    register={register}
                    rules={{
                      required: {
                        value: true,
                        message: t("accessPoint.error_name_required"),
                      },
  
                      onChange: (e: any) => onChange(e),
                    }}
                    id="accesspoint_add_name"
                    inputType="text"
                  />
                  <FeildErrorMessage
                    errors={errors}
                    name="name"
                    containerClass="w-100"
                  />
                </div>
                <div className="form-group">
                  <label>{t("accessPoint.label_maxUnit")}</label>
                  <Input
                    inputName="maxUnit"
                    className={errors['maxUnit'] ? "form-control error" :"form-control"}          
                    register={register}
                    rules={{
                      required: {
                        value: true,
                        message: t("accessPoint.error_maxunit_required"),
                      },
  
                      onChange: (e: any) => onChange(e),
                    }}
                    id="accesspoint_add_maxunit"
                    inputType="number"
                  />
                  <FeildErrorMessage
                    errors={errors}
                    name="maxUnit"
                    containerClass="w-100"
                  />
                </div>
  
                <div className="contctform-btns">
                  <div className="cb-right">
                    <Button
                      buttonLabel="Cancel"
                      handleClick={() => handleAddClick(false)}
                      className="btn btn-link cancel-link edit-contact-cancel accesspoint-cancle"
                    />
                    <Button
                      buttonLabel={t("accessPoint.btn_add")}
                      handleClick={handleSubmit(onSubmitAddAccessPoint)}
                      className="btn theme-btn submit"
                    />
                  </div>
                  <CommonErrorMessage
                    errMessage={apiResponseErr}
                    containerClass="w-100 profileSetup_error"
                  />
                </div>
              </form>
            </div>
          )}
          {accessPointItems && accessPointItems.length > 0 ?
            accessPointItems.map((accessPointItem: any, index: number) => (
              <div className="contacts-list" key={accessPointItem}>
                <div className="contact-item">
                  <div className="contact-item-header">
                    <p>{accessPointItem.name}</p>
                    {projectRole === constants.PROJECT_ADMIN || projectRole === constants.PROJECT_OWNER && (
  
                    <Link
                      className="edit-icon"
                      // href="#"
                      to="#"
                      onClick={() => handleEditClick(true, index)}>
                      <img src={images.edit} alt="edit" />
                    </Link>
                    )} 
                  </div>
                  {accessPointItem.isOpen && (
                    <div
                      className="vehicle-form edit-contact-form"
                      style={
                        accessPointItem.isOpen
                          ? { display: "block" }
                          : { display: "none" }
                      }>
                      <h3>{t("accessPoint.edit_access_point")}</h3>
                      <form
                        onSubmit={handleSubmit((data) =>
                          handleEditAccessPointItem(data, index, accessPointItem.id)
                        )}>
                        <div className="form-group">
                          <label>{t("accessPoint.label_name")}</label>
                          <Input
                            inputName={`name:${index}`}
                            className={errors[`name:${index}`] ? "form-control error" :"form-control"}          
                            register={register}
                            rules={{
                              required: {
                                value: true,
                                message: t("accessPoint.error_name_required"),
                              },
  
                              onChange: (e: any) => onChangeEdit(e,index),
                            }}
                            id="accesspoint_edit_name"
                            inputType="text"
                          />
                          <FeildErrorMessage
                            errors={errors}
                            name={`name:${index}`}
                            containerClass="w-100"
                          />
                        </div>
                        <div className="form-group">
                          <label>{t("accessPoint.label_maxUnit")}</label>
                          <Input
                            inputName={`maxUnit:${index}`}
                            className={errors[`maxUnit:${index}`] ? "form-control error" :"form-control"}          
                            register={register}
                            rules={{
                              required: {
                                value: true,
                                message: t("accessPoint.error_maxunit_required"),
                              },
  
                              onChange: (e: any) => onChangeEdit(e,index),
                            }}
                            id="accesspoint_edit_maxunit"
                            inputType="number"
                          />
                          <FeildErrorMessage
                            errors={errors}
                            name={`maxUnit:${index}`}
                            containerClass="w-100"
                          />
                        </div>
  
                        <div className="contctform-btns">
                          <div className="cb-left">
                            <Button
                              buttonLabel={t("accessPoint.btn_remove")}
                              className="btn btn-link remove-link"
                              handleClick={() =>
                                handleRemoveAccessPointItem(
                                  index,
                                  accessPointItem.id
                                )
                              }
                            />
                          </div>
                          <div className="cb-right">
                            <Button
                              buttonLabel="Cancel"
                              handleClick={() => handleEditClick(false, index)}
                              className="btn btn-link cancel-link edit-contact-cancel accesspoint-cancle"
                            />
                            <Button
                              buttonLabel={t("accessPoint.btn_edit")}
                              handleClick={handleSubmit((data) =>
                                handleEditAccessPointItem(
                                  data,
                                  index,
                                  accessPointItem.id
                                )
                              )}
                              className="btn theme-btn"
                            />
                          </div>
                        </div>
                      </form>
                    </div>
                )}
                </div>
              </div>
              ))
            : 
             !isOpenAddModel && <h2>No Access point found</h2>
            }
        </div>
        }
    
    </div>
  );
};
export default AccessPoint;

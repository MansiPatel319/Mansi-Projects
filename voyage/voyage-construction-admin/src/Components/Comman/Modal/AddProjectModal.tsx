import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

import { useParams } from "react-router-dom";
import Select from "react-select";
import { handleOpenCreateProjectModal, handleOpenEditProjectModal } from "../../../store/Actions/ProjectModule/projectActionCreators";
import RestrictedEmailDomainList from "../../../StaticData/email_domains.js"

// component

import Input from "../../UI/Input";
import Label from "../../UI/Label";
import Button from "../../UI/Button";
import CommonErrorMessage from "../../UI/CommonErrorMessage";
import FeildErrorMessage from "../../UI/FeildErrorMessage";
import {
  AddProjectDetail,
} from "../../../Network/Core/Project/ProjectInformation";
import useOutsideClick from "./ManageOutsideClickClose";
import { validateEmail } from "../../../Library/Utils";
import { getRegionsList } from "../../../Network/Core/AuthModule/auth";
import { isValidUrl } from "../../../Library/Utils";
// css
import "../../../Assets/css/style.css";
import "../../../Assets/css/common.css";
import "../../../Assets/css/booking-list.css";
import "../../../Assets/css/booking-form.css";
import "../../../Assets/css/site-management.css";
import "../../../Assets/css/global-admin.css";
import "../../../Assets/css/cutstmize.css";



export interface AddProjectModalProps { }

const AddProjectModal = () => {
  const { t } = useTranslation();
  const refOutsideModel = useRef(null);
  const dispatch = useDispatch();
  const [region, setRegion] = useState(1)
  const [regions, setRegions] = useState<any>();
  const [owner, setOwner] = useState<any>();
  const [organization, setOrganization] = useState<any>();
  const [isDisable, setIsDisable] = useState<any>(false);
  const showAddProjectModal=  useSelector(
    (state: any) => state.project.showAddProjectModal
  );
  const [show,setShow] = useState(false)
  const {
    register, // this use for evnets and value
    handleSubmit, // this is form submit handle
    setError,
    control,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();
  const { ref } = useParams();

  const handleClose = () => {
    dispatch(handleOpenCreateProjectModal(false));
  };
  const handleCloseClick = () => {
    dispatch(handleOpenCreateProjectModal(false));
    setShow(false)
  };


  useOutsideClick(refOutsideModel, () => { 
    
    handleClose()
    if (!showAddProjectModal)
    {
      setShow(false)
    }
    
   
  })
  const getRegionList = async () => {
    try {
      const res = await getRegionsList();
      const { status, data } = res;
      switch (status) {
        case 200:
          // eslint-disable-next-line no-case-declarations
          const tempRegion = data.map((item: any) => {
            return {
              value: item.id,
              label: item.name,
            };
          });
          setRegions(tempRegion);

          // setValue("siteOwner", data.message);
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
  const handleSubmitProjectDetail = async (projectData: any) => {
    
    setIsDisable(true);
    const data1 = {
      name: projectData.siteName,
      address: projectData.siteAddress,     
      hubspot_url: projectData.hubspot,
      owner_email: projectData.email,
      region:projectData.region,
    };
    try {
      const res: any = await AddProjectDetail(data1,projectData.region);
      const { status ,data} = res;
      switch (status) {
        case 201:
          handleCloseClick();

          toast.success("Add Project Successfully");
          setIsDisable(false);
          break;
        case 400:
          setIsDisable(false);
  
          break;
          case 500:
            setIsDisable(false);
    
            break;
        case 403:
          // if (data.detail === "ERR_login_again_token_expired") {
          //   toast.error(t("userManagment.error_login_again"));
          //   localStorage.clear()
          //   navigate('/login')
          // }
          setIsDisable(false);
          break;
        default:
          break;
      }
    } catch (err) {
      toast.error(t("userManagment.error_something_went_wrong"));
      setIsDisable(false);
    }
  };
  const onChangeInput = (e: any) => {
    const { name, value } = e.target;
    if (value === "") {
      switch (name) {
        case "siteName":
          setError(name, {
            type: "required",
            message: t("siteDetail.error_sitename_required"),
          });
          break;
        case "email":
          setError(name, {
            type: "required",
            message: t("siteDetail.error_email_required"),
          });
          break;
        
        default:
          break;
      }
    }
    else{
      switch(name){
        case "hubspot":
        if (!isValidUrl(value)) {
         
          setError(name, {
            type: "validate",
            message: "Please enter valid URL",
          });
        } else {
          clearErrors(name);
        }
        break; 
        default:
          break;
      }
    }
  };
  const onBlurEmail = (e:any) => {
    const { name, value } = e.target;

    if (RestrictedEmailDomainList.find((item)=>value.substring(value.indexOf("@")+1,value.length)===item)) {
      setError(name, {
        type: "validate",
        message: t("siteDetail.error_valid_email"),
      });
    } else {
      clearErrors(name);
    }
  }
 
  useEffect(() => {
    getRegionList()
 },[])
 useEffect(() => {
  if (showAddProjectModal)
  {
    setShow(showAddProjectModal)
  }
 }, [showAddProjectModal])
  useEffect(() => {
    setValue("siteName", "");
    setValue("siteAddress", "");

    setValue("hubspot", "");
    setValue("email", "");
    setValue("region", "");
  },[show])
  return (
    <>
    <div
    className={show ? "custom-modal modal fade show" : "custom-modal modal"}
    id="addfield"
    style={show ? { display: "block" } : {display:'none'}}
    >
      <div className="modal-dialog modal-sm modal-dialog-centered cust-new-modal">
        <div className="modal-content cust-new-proj-modal">
          <div ref={refOutsideModel}>
            <div className="modal-header">
              <h4 className="modal-title">Create New Project</h4>
              <Button
                buttonLabel="Close   &times;"
                className="close"
                handleClick={() => handleCloseClick()}
              />
            </div>

            <div className="modal-body">
              <div className="custmodal-formbox">
                <div className="form-group">
                  <Label label={t("siteDetail.label_sitename")+"*"} />

                  <Input
                    inputType="text"
                    className={
                      errors.siteName ? "form-control error" : "form-control"
                    }
                    inputName="siteName"
                    register={register}
                    rules={{
                      required: {
                        value: true,
                        message: `${t("siteDetail.error_sitename_required")}`,
                      },
                      onChange: (e: any) => onChangeInput(e),
                    }}
                    id="siteName"
                  // disabled={projectRole === constants.PROJECT_USER || projectRole === constants.PROJECT_MANAGER}
                  />
                  <FeildErrorMessage
                    errors={errors}
                    name="siteName"
                    containerClass="w-100"
                  />
                </div>

                <div className="form-group">
                  <Label label={t("siteDetail.label_hubspot")} />

                  <Input
                    inputType="url"
                    className={
                      errors.siteName ? "form-control error" : "form-control"
                    }
                    inputName="hubspot"
                    register={register}
                    rules={{
                      // required: {
                      //   value: true,
                      //   message: `${t("siteDetail.error_hubspot_url")}`,
                      // },
                      onChange: (e: any) => onChangeInput(e),
                    }}
                    id="hubspot"
                  // disabled={projectRole === constants.PROJECT_USER || projectRole === constants.PROJECT_MANAGER}
                  />
                  <FeildErrorMessage
                    errors={errors}
                    name="hubspot"
                    containerClass="w-100"
                  />
                </div>
                <div className="form-group">
                  <Label label={t("siteDetail.label_siteadd")} />

                  <Input
                    inputType="text"
                    className={
                      errors.siteAddress ? "form-control error" : "form-control"
                    }
                    inputName="siteAddress"
                    register={register}
                    rules={{
                      // required: {
                      //   value: true,
                      //   message: `${t("siteDetail.error_siteadd_required")}`,
                      // },
                      onChange: (e: any) => onChangeInput(e),
                    }}
                    id="siteAddress"
                  // disabled={projectRole === constants.PROJECT_USER || projectRole === constants.PROJECT_MANAGER}
                  />
                  <FeildErrorMessage
                    errors={errors}
                    name="siteAddress"
                    containerClass="w-100"
                  />
                </div>


                <div className="form-group">
                  <Label label={t("Project Owner Email Address*")} />

                  <Input
                    inputType="text"
                    className={
                      errors.siteName ? "form-control error" : "form-control"
                    }
                    inputName="email"
                    register={register}
                    rules={{
                      required: {
                        value: true,
                        message: `${t("siteDetail.error_email_required")}`,
                      },
                      validate: (value: string) => {
                        return (
                          validateEmail(value) || `${t("siteDetail.error_valid_email")}`
                        );
                      },
                      onChange: (e: any) => onChangeInput(e),
                      onBlur: (e: any) => onBlurEmail(e),
                    }}
                    id="email"
                  />
                  <FeildErrorMessage
                    errors={errors}
                    name="email"
                    containerClass="w-100"
                  />
                </div>
                <div className="form-group">
                <Label label={t("siteDetail.label_region")+"*"} />
                <Controller
                  control={control}
                  name="region"
                  rules={
                    {
                      required: {
                        value: true,
                        message: `${t("siteDetail.error_region_required")}`,
                      },
                    }
                  }
                  render={({ field: { onChange, value, name, ref } }: any) => (
                    <Select
                    classNamePrefix="form-control-language"
                      options={regions}
                      name="region"
                      value={regions?.filter(
                        (c: any) => c.value === value
                      )}
                      onChange={(val: any) => onChange(val.value)}
                      isSearchable
                    />
                  )}
                />
                <FeildErrorMessage
                  errors={errors}
                  name="region"
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
                  buttonLabel="Create Project"
                  handleClick={handleSubmit(handleSubmitProjectDetail)}
                  className="theme-btn w-100"
                  disabled={isDisable}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      {show && <div className="modal-backdrop fade show" />}
      </>
  );
};

export default AddProjectModal;

import React, { useEffect,useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

import { useParams } from "react-router-dom";
import Select from "react-select";
import { handleOpenEditProjectModal } from "../../../store/Actions/ProjectModule/projectActionCreators";
import RestrictedEmailDomainList from "../../../StaticData/email_domains.js"

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
import useOutsideClick from "./ManageOutsideClickClose";

// css
import "../../../Assets/css/style.css";
import "../../../Assets/css/common.css";
import "../../../Assets/css/booking-list.css";
import "../../../Assets/css/booking-form.css";
import "../../../Assets/css/site-management.css";
import "../../../Assets/css/global-admin.css";
import "../../../Assets/css/cutstmize.css";
import { isValidUrl } from "../../../Library/Utils";

export interface ProjectListFilterProps {
}

const EditProjectModal = () => {
  const { t } = useTranslation();
  const refOutsideModel = useRef(null);
  const dispatch = useDispatch();
  const [region,setRegion] = useState(1);
  const [projectDetail, setProjectDetail] = useState<any>();
  const [acconutManager, setAccountManager] = useState<any>();
  const [owner, setOwner] = useState<any>();
  const [organization, setOrganization] = useState<any>();
  const showFilterModal=  useSelector(
    (state: any) => state.project.showFilterModal
  );
  const [show,setShow] = useState(showFilterModal)
  const {
    register, // this use for evnets and value
    handleSubmit, // this is form submit handle
    setError,
    control,
    setValue,
    formState: { errors },
    clearErrors,
  } = useForm();
  const { ref } = useParams();

  const handleClose = () => {
    dispatch(handleOpenEditProjectModal(false));
  };
  const handleCloseClick = () => {
    dispatch(handleOpenEditProjectModal(false));
    setShow(false)
  };

  
  useOutsideClick(refOutsideModel, () => { 
    
    handleClose()
    if (!showFilterModal)
    {
      setShow(false)
     
    }
    
   
  })
  const onBlurEmail = (value:string) => {
  
    if (RestrictedEmailDomainList.find((item)=>value.includes(item))) {
      setError("Owner", {
        type: "validate",
        message: t("siteDetail.error_valid_email"),
      });
    } else {
      clearErrors("Owner");
    }
  }
  const handleSubmitProjectDetail = async (projectData: any) => {
 const orgemail= owner?.find((item: any) => item.value === projectData.Owner);
    const data1 = {
      name: projectData.siteName,
      address: projectData.siteAddress,
      ownerEmail:orgemail.label,
      organization: projectData.organization,
      manager: projectData.accountManager,
      hubspot_url: projectData.hubspot,
      region: region,
      status:projectData.status
    };
    try {
      const res: any = await EditProjectDetail(ref, data1);
      const { status } = res;
      switch (status) {
        case 200:
          handleCloseClick();

          toast.success("Edit Successfully Project Detail");
          toast.success("Please Contact selected Owner To Accept the Invitation");
          getSiteDetails(ref);
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
      //   case "siteAddress":
      //     setError(name, {
      //       type: "required",
      //       message: t("siteDetail.error_siteadd_required"),
      //     });
      //     break;
      //   case "siteOwner":
      //     setError(name, {
      //       type: "required",
      //       message: t("siteDetail.error_siteowner_required"),
      //     });
      //     break;
      //   case "siteOrganization":
      //     setError(name, {
      //       type: "required",
      //       message: t("siteDetail.error_siteorg_required"),
      //     });
      //     break;
      //   case "accountManager":
      //     setError(name, {
      //       type: "required",
      //       message: t("siteDetail.error_acc_manager_required"),
      //     });
      //     break;
      //   case "hubspot":
      //     setError(name, {
      //       type: "required",
      //       message: t("siteDetail.error_hubspot_url"),
      //     });
      //     break;
      

      //   default:
      //     break;
      }
    }
    else {
      switch (name) {
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
      }
    }
  };
  const getSiteDetails = async (ref: any) => {
    try {
      const res = await getProjectDetail(ref);
      const { status, data } = res;
      switch (status) {
        case 200:
          // const tempOwnerList = {
          //   value: data.owner.id,
          //   label: data.owner.email,
          // };

          // const tempOrganizationList = {
          //   value: data.organization.id,
          //   label: data.organization.name,
          // };

          // const tempAccountManagerList = {
          //   value: data.manager?.id,
          //   label: data.manager?.email,
          // };


          const tempOwnerList = data?.owner?.id;

          const tempOrganizationList =data?.owner?.organization?.id;

          const tempAccountManagerList = data?.manager?.ref;
          // setOwner(tempOwnerList);
          // setOrganization(tempOrganizationList);
          // setAccountManager(tempAccountManagerList);
          console.log('tempAccountManagerList', tempAccountManagerList)
          
          setValue("siteName", data.name);
          setValue("siteAddress", data.address);
          setValue("Owner", tempOwnerList);

          setValue("organization", tempOrganizationList);
          setValue("accountManager", tempAccountManagerList);
          setValue("hubspot", data.hubspotUrl);
          setValue("status", data.status);
          setRegion(data.region)
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
  console.log('acconutManager', acconutManager)
  const getOwnerList = async (ref:any) => {
    try {
      const res = await getOwnerListData(ref);
      const { status, data } = res;
      switch (status) {
        case 200:
          // eslint-disable-next-line no-case-declarations
          const tempOwnerList = data.results.map((item: any) => {
            return {
              value: item.id,
              label: item.email,
              org:item?.organization?.id
            };
          }); 
          setOwner(tempOwnerList);

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
  const getProjectOrganization = async (ref:any) => {
    try {
      const res = await getOrganization(ref);
      const { status, data } = res;
      switch (status) {
        case 200:
          // eslint-disable-next-line no-case-declarations
          const tempOrganizationList = data.results.map((item: any) => {
            return {
              value: item.id,
              label: item.name,
            };
          });
          setOrganization(tempOrganizationList);

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
  const getAccountManagerList = async (ref:any) => {
    try {
      const res = await getAccountManager(ref);
      const { status, data } = res;
      switch (status) {
        case 200:
          // eslint-disable-next-line no-case-declarations
          const tempAccountManagerList = data.results.map((item: any) => {
            return {
              value: item.ref,
              label: item.email,
            };
          });
          setAccountManager(tempAccountManagerList);

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
  const onChangeOwner = (val: any) => {
    setValue("organization",val.org)
    clearErrors("Owner");
    setValue("Owner",val.value)
  }
  useEffect(() => {
    getSiteDetails(ref);
    getOwnerList(ref);
    getProjectOrganization(ref);
    getAccountManagerList(ref);
  }, [ref]);

  useEffect(() => {   
    setShow(showFilterModal)
  },[showFilterModal])
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
            <h4 className="modal-title">Edit Project Detail</h4>
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
                      message: `${t("siteDetail.error_sitename_required")+"*"}`,
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
                <Label label={t("siteDetail.label_siteOwner")+"*"} />
                <Controller
                  control={control}
                  name="Owner"
                  rules={
                    {
                      required: {
                        value: true,
                        message: `Plese select Owner`,
                      },
                    }
                  }
                  render={({ field: { onChange, value, name, ref } }: any) => (
                    <Select
                      classNamePrefix="form-control-language"
                      options={owner}
                      name="Owner"
                      value={owner?.filter(
                        (c: any) => c.value === value
                      )}
                      // onChange={(val: any) => {onChange(val.value)}}
                      onChange={(val: any) => {onChangeOwner(val)}}
                      // onBlur={(val: any) => onBlurEmail(val.label)}
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
                <Label label={t("siteDetail.label_siteOrg")+"*"} />

                <Controller
                  control={control}
                  name="organization"
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
                      options={organization}
                      name="organization"
                      value={organization?.filter(
                        (c: any) => c.value === value
                      )}
                      onChange={(val: any) => onChange(val.value)}
                      isSearchable
                      isDisabled
                    />
                  )}
                />
                <FeildErrorMessage
                  errors={errors}
                  name="organization"
                  containerClass="w-100"
                />
              </div>

              <div className="form-group">
                <Label label={t("siteDetail.label_accManager")+"*"} />
                <Controller
                  control={control}
                  name="accountManager"
                  // rules={
                  //   {
                  //     required: {
                  //       value: true,
                  //       message: `Account Manger field is required`,
                  //     },
                  //   }
                  // }
                  render={({ field: { onChange, value, name, ref } }: any) => (
                    <Select
                      classNamePrefix="form-control-language"
                      options={acconutManager}
                      name="accountManager"
                      value={acconutManager?.filter(
                        (c: any) => c.value === value
                      )}
                      onChange={(val: any) => onChange(val.value)}
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
                <Label label={t("siteDetail.label_hubspot")} />

                <Input
                  inputType="text"
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

              <CommonErrorMessage
                // errMessage={apiResponseErr}
                containerClass="w-100 login_error"
              />
            </div>
            <div className="modal-cs-btnbox">
              <Button
                buttonLabel="Save Details"
                handleClick={handleSubmit(handleSubmitProjectDetail)}
                className="theme-btn w-100"
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

export default EditProjectModal;

import React, { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useParams } from "react-router";
import toast from "react-hot-toast";
import images from "../../../../Assets/images";
import Select from 'react-select'
//css
import "./style.css";
import "../../../../Assets/css/style.css";
import "../../../../Assets/css/site-management.css";
import "../../../../Assets/css/booking-form.css";
import "../../../../Assets/css/booking-list.css";
import "../../../../Assets/css/customize.css";
import "../../../../Assets/css/new-updated.css";
import {
  AddUserDetail,
  getUserDetailById,
  getUserList,
  getUserRoles,
} from "../../../../Network/Core/UserOnBoarding/userInvite";

import { validateEmail, validatePhoneNumber } from "../../../../Library/Utils";

// component
import Button from "../../../UI/Button";
import Input from "../../../UI/Input";
import FeildErrorMessage from "../../../UI/FeildErrorMessage";
import { useTranslation } from "react-i18next";
import { removeUserFromProject } from "../../../../Network/Core/UserOnBoarding/userManagment";
import { Link } from "react-router-dom";
import useOutsideClick from "../../Header/ManageOutsideClickClose";
import { getLocalStorage } from "../../../../Network/ApiService";
import { constants } from "../../../../Library/Constants";
import { updateUser } from "../../../../Store/Actions/UserManagment/userActionCreatore";
import { useDispatch } from "react-redux";
import { doGetOrganizationRoleList } from "../../../../Network/Core/ProfileModule/organization";
export interface InviteModalProps {
  handleClose?: any;
  userId?: any;
}

const index = ({ handleClose, userId }: InviteModalProps) => {
  const [userDetail, setUserDetail] = useState<any>();
  const { project } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const {t} = useTranslation()
  const navigate = useNavigate()
  const refOutsideModel = useRef(null);
  const projectRole = getLocalStorage(constants.USER)?.projectRole;
  const dispatch = useDispatch()
  const [projectRoleList, setProjectRoleList] = useState<any>([])
  const [organizationRoleList, setOrganizationRoleList] = useState<any>([])
  const [organizationRoleListIndex, setOrganizationRoleListIndex] = useState(0)
  const [projectRoleListIndex, setProjectRoleListIndex] = useState(0)
  const getUserRole = async(selected_role:any) => {
      try{
        const res = await getUserRoles({project:project});
        const { status,data } = res
        switch (status){
          case 200:
            const temp = data.results.map((role:any) => {
              return ({
                value : role.id,
                label : role.name
              })
            })
            setProjectRoleList(temp)
            setValue("projectRole",selected_role)
            break;
          case 400:
            toast.error(data)
            break;
          case 403:
            if (data.detail === "ERR_login_again_token_expired") {
              toast.error(t("userManagment.error_login_again"));
              localStorage.clear()
              navigate('/login')
            }
        }
      }
      catch{
        toast.error('something went wrong')
      }
  }

  const getOrganizationRole = async(selected_role:any) => {
    try {
      const res = await doGetOrganizationRoleList(project)
      const { status,data } = res
      switch (status){
        case 200:
          const temp = data.results.map((role:any) => {
            return ({
              value:role.id,
              label:role.name
            })
          })    
          setOrganizationRoleList(temp) 
          console.warn(selected_role);
          setValue("orgRole",selected_role)
          break
        case 400:
          console.warn(data);
          break
        case 403:
          if (data.detail === "ERR_login_again_token_expired") {
            toast.error(t("userManagment.error_login_again"));
            localStorage.clear()
            navigate('/login')
          }
      }
    }
    catch{
      toast.error('something went wrong')
    }
  }

  const handleProjectRoleChange = (value:any) => {
    setValue("projectRole",value)
  }
  const handleOrganizationRoleChange = (value:any) => {
    setValue("orgRole",value)
  }
  useOutsideClick(refOutsideModel, () => { 
  handleClose()
    
  
   
  })
  const {
    register, // this use for evnets and value
    handleSubmit, // this is form submit handle
    setValue,
    getValues,
    setError,
    control,
    clearErrors,
    formState: { errors }, // error like required,validate, etc..
  } = useForm();
console.log('userDetail :>> ', userDetail);
  const onSubmit = async (userData: any) => {
    console.warn(userData);
    setIsLoading(true);
    const formData = new FormData()
    formData.append("user_status", userDetail?.userStatus)
    formData.append("email", userData.email)
    formData.append("first_name", userData.firstname)
    formData.append("last_name", userData.lastname)
    formData.append("mobile", userData.phonenumber)
    formData.append("organization_role", userDetail?.organizationRole?.id)
    formData.append("profile_image", "")
    formData.append("organization", userDetail?.organization?.id)
    formData.append("is_global_admin_user", 'true' )
    try {
      const res = await AddUserDetail(
        // {
        //   
        //   user_status:userDetail?.userStatus,
        //   email: userData.email,
        //   first_name: userData.firstname,
        //   last_name: userData.lastname,
        //   mobile: userData.phonenumber,
        //   organization_role: userDetail?.organizationRole?.id,
        //   profile_image:"",
        //   organization:userDetail?.organization?.id,
        //   is_global_admin_user: true
        // },
        formData,
        project,userId
      )
      const { status, data } = res;
      switch (status) {
        case 200:
          setIsLoading(false);
          handleClose();
          dispatch(updateUser(true))
          toast.success("Save Detail Successfully");

          break;
        case 400:
          setIsLoading(false);

          break;
        case 403:
          setIsLoading(false);
          if (data.detail === "ERR_login_again_token_expired") {
            toast.error("oginagain");
            localStorage.clear()
            navigate('/login')
          }
  
          break
        default:
  
          break;
      }
    } catch (err) {
      setIsLoading(false);
      toast.error("something went wrong");
    
    }
  };

  const onChange = (e: any) => {
    const { name, value } = e.target;
    switch (name) {
      case "firstname":
        if (value === "") {
          setError(name, {
            type: "required",
            message: "firstname required",
          });
        } else {
          clearErrors(name);
        }
        break;
      case "lastname":
        if (value === "") {
          setError(name, {
            type: "required",
            message: "lastname required",
          });
        } else {
          clearErrors(name);
        }
        break;
      case "phonenumber":
        if (value === "") {
          setError(name, {
            type: "required",
            message: "Phone required",
          });
        } else if (!validatePhoneNumber(value)) {
          setError(name, {
            type: "validate",
            message: "Phone invalid",
          });
        } else {
          clearErrors(name);
        }
        break;

      default:
        break;
    }
  };

  const getUserDetails = async () => {
    // dispatch(setLoader(true))
    try {
      const res = await getUserDetailById(project, userId);
      const { status, data } = res;
      switch (status) {
        case 200:
          getUserRole(data?.projects[0]?.role);
          getOrganizationRole(data?.organizationRole?.id);
          setUserDetail(data);
          setValue("firstname", data?.firstName);
          setValue("lastname", data?.lastName);
          setValue("phonenumber", data?.mobile);
          setValue("email", data?.email);
          setValue("company", data?.organization?.name);
          setValue("orgRole", data?.organizationRole?.name);
          setValue("projectRole", data?.projects[0]?.roleName);
          break;
        case 400:
          toast.error(data.detail);

          break;
        case 401:
          toast.error(data.detail);
          localStorage.clear();

          break;
        default:
          toast.error(data.detail);

          break;
      }
    } catch (err) {}
  };
  const handleRoleChange = async () => {
    try {
      
     
      const res = await removeUserFromProject(project,userDetail.ref);
      const { status, data } = res;
      console.log('data :>> ', data);
      switch (status) {
        case 200:
          dispatch(updateUser(true))
          toast.success(data);
        
          handleClose()
         
          break;
        case 400:
         
          break;
        case 403:
          if (data.detail === "ERR_login_again_token_expired") {
            navigate('/login')
            toast.error(t("chooseProject.error_login_again"));
            localStorage.clear()
          }
         
          break;
        default:
         
          break;
      }
    } catch (err) {
     
      toast.error(t("chooseProject.error_something_went_wrong"));
    }
  }
  useEffect(() => {
    getUserDetails();
  }, []);
  return (
    <div className="right-sidebar-modal">
      <button
        className="btn side-bar-modal-btn"
        data-toggle="modal"
        data-target="#myModal2">
        <img src={images.backIcon} />
      </button>

      <div
        className="modal right fade show"
        style={{ display: "block" }}
        id="myModal2"
        role="dialog"
        aria-labelledby="myModalLabel2">
        <div className="modal-dialog" role="document">
          <div className="modal-content" ref={refOutsideModel}>
            <div className="modal-header">
              <button
                className="btn side-bar-modal-btn"
                data-toggle="modal"
                data-target="#myModal2"
                onClick={handleClose}>
                <img src={images.backIcon} />
              </button>
            </div>

            <div className="modal-body">
              <div className="user-profilepic text-center">
            {/* <span className="profile-circle user-profile"> */}
            {userDetail?.firstName || userDetail?.lastName ? (

<span className="profile-circle">{ userDetail?.firstName?.charAt(0)+userDetail?.lastName?.charAt(0)}</span>
):(
  <span className="profile-circle p-0"><img className="profile-icon" src={images.profile}></img></span>
)}
            {/* </span> */}
              </div>
              <form className="form-root" onSubmit={handleSubmit(onSubmit)}>
                <div className="sidebar-detail-form">
                  <h3>Details</h3>
                  <div className="form-group">
                    <label>First Name</label>
                    <Input
                      inputName="firstname"
                      disabled
                      className={
                        errors["firstname"]
                          ? "form-control error"
                          : "form-control"
                      }
                      register={register}
                      rules={{
                        required: {
                          value: true,
                          message: "First Name is Required",
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
                    <label>Last Name</label>
                    <Input
                      disabled
                      inputName="lastname"
                      className={
                        errors["lastname"]
                          ? "form-control error"
                          : "form-control"
                      }
                      register={register}
                      rules={{
                        required: {
                          value: true,
                          message: "lastname required",
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
                    <label>Phone Number</label>
                    <Input
                      disabled
                      inputType="text"
                      className={
                        errors["phonenumber"]
                          ? "form-control error"
                          : "form-control"
                      }
                      inputName="phonenumber"
                      register={register}
                      rules={{
                        required: {
                          value: true,
                          message: "Phone required",
                        },
                        validate: (value: string) => {
                          return validatePhoneNumber(value) || "Phone invalid";
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
                    <label>Email</label>
                    <Input
                      disabled
                      inputName="email"
                      className={
                        errors["email"] ? "form-control error" : "form-control"
                      }
                      register={register}
                      rules={{
                        required: {
                          value: true,
                          message: "email required",
                        },
                        validate: (value: string) => {
                          return validateEmail(value) || "email invalid";
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
                  <div className="form-group">
                    <label>Company</label>
                    <Input
                      disabled
                      inputName="company"
                      register={register}
                      id="myaccount_company"
                      inputType="text"
                    />
                  </div>
                </div>
      
          
                <div className="sidebar-detail-form">
                  <h3>Roles</h3>
                  <div className="form-group">
                    <label>Project Role</label>
                    <Controller
                      control={control}
                      name="projectRole"
                      rules={{
                        required: {
                          value: true,
                          message: t('account.error_language_required'),
                        },
                      }}
                      render={({
                        field: { onChange, value},
                      }: any) => (
                        <>
                      <Select
                   
                          classNamePrefix={errors['language'] ? "error form-control-language" :"form-control-language"}
                          options={projectRoleList}
                          id="projectRole"
                          name="projectRole"
                          value={projectRoleList?.find(
                            (c: any) => c.value === value
                          )}
                          onChange={(val: any) => handleProjectRoleChange(val.value)}
                        />
                        </>
                        // <Select
                        //   // classNamePrefix="form-control-language"
                        //   classNamePrefix={errors['language'] ? "error form-control-language" :"form-control-language"}
                        //   options={projectRoleList}
                        //   id="orgRole"
                        //   name="orgRole"
                        //   value={projectRoleList?.find(
                        //     (c: any) => c.value === value
                        //   )}
                        //   onChange={(val: any) => handleProjectRoleChange(val.value)}
                        // />
                      )}
                    />
                    <FeildErrorMessage
                      errors={errors}
                      name="projectRole"
                      containerClass="w-100"
                    />
                    {/* <Select
                    classNamePrefix="form-control-language"
                    options={projectRoleList}
                    id="orgRole"
                    placeholder="Select Role"
                    name="orgRole"
                    onChange={(e) => handleProjectRoleChange(e)}
                    value={{label:getValues("projectRole"),value:projectRoleListIndex}}
                    isDisabled={projectRole !== constants.PROJECT_ADMIN &&
                      projectRole !== constants.PROJECT_OWNER}
                    /> */}
                  </div>
                  <div className="form-group">
                    <label>Organisation Role</label>
                    <Controller
                      control={control}
                      name="orgRole"
                      rules={{
                        required: {
                          value: true,
                          message: t('account.error_language_required'),
                        },
                      }}
                      render={({
                        field: { onChange, value},
                      }: any) => (
                        <>
                        {console.warn("valueOrole",value)}
                      <Select
                   
                          classNamePrefix={errors['language'] ? "error form-control-language" :"form-control-language"}
                          options={organizationRoleList}
                          id="orgRole"
                          name="orgRole"
                          value={organizationRoleList?.find(
                            (c: any) => c.value === value
                          )}
                          onChange={(val: any) => handleOrganizationRoleChange(val.value)}
                        />
                        </>
                      )}
                    />
                    <FeildErrorMessage
                      errors={errors}
                      name="orgRole"
                      containerClass="w-100"
                    />
                  </div>
                </div>
                {(projectRole === constants.PROJECT_ADMIN ||
                  projectRole === constants.PROJECT_OWNER) &&
                  <div className="sidebar-form personal-detail">
           
                    <Button
                      buttonLabel="Save"
                      handleClick={handleSubmit(onSubmit)}
                      varient="primary"
                      size="small"
                      // disabled={isLoading}
                
                      className="theme-btn save-accountdetail"
                    />
                    <Link to="#" className="remove-link" onClick={() => handleRoleChange()}>
                      Remove from project
                    </Link>
                  </div>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;

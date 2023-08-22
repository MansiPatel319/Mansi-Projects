import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch , useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

// component
import Label from "../../UI/Label";
import Input from "../../UI/Input";
import Button from "../../UI/Button";
import CommonErrorMessage from "../../UI/CommonErrorMessage";
import FeildErrorMessage from "../../UI/FeildErrorMessage";

// redux
import { setInviteUserDeatils } from "../../../Store/Actions/InviteUserModule/InviteUserActionCreatore";

// API

import { doUserSignup, postOrganizationData } from "../../../Network/Core/UserOnBoarding/userInvite";

// helper
import { validatePhoneNumber } from "../../../Library/Utils";

//
export interface IprofileSetupComponentProps {}

export default function profileSetupComponent() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [apiResponseErr, setApiResponseErr] = useState<string>("");
  const userdetails = useSelector((state:any) => state.inviteuser.userdetail);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register, // this use for evnets and value
    handleSubmit, // this is form submit handle
    setError,
    clearErrors,
    formState: { errors }, // error like required,validate, etc..
  } = useForm();
  // const postOrganizedData =async (details:any) => {
  //   const orgData:any={
   
  //     user_id: details.id,
  //     new: true
  //   }
  //   if(userdetails.companyname===''){
  //     orgData.organization_id=userdetails.organization_id;
  //   }
  //   else{
  //     orgData.organization={
  //       "name":userdetails.companyname,
  //       "address1":userdetails.address
  //     }
  //   }
  //   const res = await postOrganizationData({orgData});
  //   const { status, data, statusText } = res;
  //   setIsLoading(false);
  //   switch (status) {
  //     case 200:
  //       toast.success(t('profileSetup.success_message'))  
  //       navigate("/login");
  //       break;
  //     case 400:
  //       setApiResponseErr(data);
  //       break;
  //     default:
  //       setApiResponseErr(statusText);
  //       break;
  //   }
    
  //   }
  const onSubmitprofileSetup = async (userData: any) => {
    setIsLoading(true);
    try {
      const profiledata={
        firstname: userData.firstname,
        lastname: userData.lastname,
        phonenumber: userData.phonenumber,
      }
      dispatch(
        setInviteUserDeatils({...profiledata,...userdetails})
      );
      if(userdetails.companyname===''||userdetails.companyname==='none'){
        navigate("/setcompany");
      }
      else{
        const passUserDetails:any={
          email:userdetails.email,
          password:userdetails.password,
          data:{
            first_name:userData.firstname,
            last_name:userData.lastname,
            mobile:userData.phonenumber
          }

        }
        if(userdetails.project_role!==''||userdetails.project_role!==undefined||userdetails.project_role!==null){
          passUserDetails.project_role=userdetails.project_role;
        }
        if(userdetails.project_ref!==''||userdetails.project_ref!==undefined||userdetails.project_ref!==null){
          passUserDetails.project_ref=userdetails.project_ref;
        }
        
       
          const res = await doUserSignup({passUserDetails},userdetails.project_ref);
          const { status, data, statusText } = res;
          setIsLoading(false);
          switch (status) {
            case 200:
              navigate("/company/choose");
              dispatch(
                setInviteUserDeatils({
                  ...profiledata, ...userdetails,
                  id: data.id,
                  ref:data.ref
                })
              );
              break;
            case 400:
              setApiResponseErr(data);
              break;
            default:
              setApiResponseErr(statusText);
              break;
          }
      
        }
    
    } catch (err) {
      toast.error(t("profileSetup.error_something_went_wrong"));
    }
  };
  const onChange = (e: any) => {
    const { name, value } = e.target;
    switch (name) {
      case "firstname":
        if (value === "") {
          setError(name, {
            type: "required",
            message: t("profileSetup.error_firstname_required"),
          });
        } else {
          clearErrors(name);
        }
        break;
      case "lastname":
        if (value === "") {
          setError(name, {
            type: "required",
            message: t("profileSetup.error_lastname_required"),
          });
        } else {
          clearErrors(name);
        }
        break;
      case "phonenumber":
        if (value === "") {
          setError(name, {
            type: "required",
            message: t("profileSetup.error_phonenumber_required"),
          });
        } else if (!validatePhoneNumber(value)) {
          setError(name, {
            type: "validate",
            message: t("profileSetup.error_valid_phonenumber"),
          });
        } else {
          clearErrors(name);
        }
        break;
      default:
        break;
    }
  };
  return (
    <div className="custom-form">
      <h2>{`${t("profileSetup.welcometext")}`}</h2>
      <p>Project Name</p>
      <form className="form-root" onSubmit={handleSubmit(onSubmitprofileSetup)}>
        <div className="form-group">
          <Label label={`${t("profileSetup.firstname")}`} />
          <Input
            inputPlaceholder={`${t("profileSetup.firstname")}`}
            inputName="firstname"
            register={register}
            rules={{
              required: {
                value: true,
                message: `${t("profileSetup.error_firstname_required")}`,
              },

              onChange: (e: any) => onChange(e),
            }}
            id="profileSetup_firstname"
            inputType="text"
          />
          <FeildErrorMessage
            errors={errors}
            name="firstname"
            containerClass="w-100"
          />
        </div>
        <div className="form-group">
          <Label label={`${t("profileSetup.lastname")}`} />
          <Input
            inputPlaceholder={`${t("profileSetup.lastname")}`}
            inputName="lastname"
            register={register}
            rules={{
              required: {
                value: true,
                message: `${t("profileSetup.error_lastname_required")}`,
              },
              onChange: (e: any) => onChange(e),
            }}
            id="profileSetup_lastname"
            inputType="text"
          />
          <FeildErrorMessage
            errors={errors}
            name="lastname"
            containerClass="w-100"
          />
        </div>
        <div className="form-group">
          <Label label={`${t("profileSetup.phoneNumber")}`} />
          <Input
            inputType="text"
            inputPlaceholder={`${t("profileSetup.phoneNumber")}`}
            inputName="phonenumber"
            register={register}
            rules={{
              required: {
                value: true,
                message: `${t("profileSetup.error_phonenumber_required")}`,
              },
              validate: (value: string) => {
                return (
                  validatePhoneNumber(value) ||
                  `${t("profileSetup.error_valid_phonenumber")}`
                );
              },
              onChange: (e: any) => onChange(e),
            }}
            id="profileSetup_phonenumber"
          />
          <FeildErrorMessage
            errors={errors}
            name="phonenumber"
            containerClass="w-100"
          />
        </div>

        <div className="btn-sec">
          <Link className="forgot-link" to="#" />
          <Button
            buttonLabel={ userdetails.companyname===''||userdetails.companyname==='none'?`${t("profileSetup.next")}`:'Submit'}
            handleClick={handleSubmit(onSubmitprofileSetup)}
            varient="primary"
            size="small"
            disabled={isLoading}
            className="btn theme-btn btn-profileSetup"
          />
        </div>
        <CommonErrorMessage
          errMessage={apiResponseErr}
          containerClass="w-100 profileSetup_error"
        />
      </form>
    </div>
  );
}

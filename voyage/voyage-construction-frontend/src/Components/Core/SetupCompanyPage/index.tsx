import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch , useSelector} from "react-redux";
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
import { doUserSignup, postOrganizationData } from "../../../Network/Core/UserOnBoarding/userInvite";

// API
import { setInviteUserDeatils } from "../../../Store/Actions/InviteUserModule/InviteUserActionCreatore";

//
// helper

//
export interface IcompanySetupPageComponentProps {}

export default function companySetupPageComponent() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [apiResponseErr, setApiResponseErr] = useState<string>("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userdetails = useSelector((state:any) => state.inviteuser.userdetail);

  const {
    register, // this use for evnets and value
    handleSubmit, // this is form submit handle
    setError,
    clearErrors,
    formState: { errors }, // error like required,validate, etc..
  } = useForm();
  const postOrganizedData =async (details:any,formdata:any) => {
  const orgData:any={
 
  }
  if(userdetails.companyname===''){
    orgData.organization_id=userdetails.organization_id;
  }
  else{
    orgData.organization={
      "name":formdata.companyname,
      "address1":formdata.address
    }
  }
  const res = await postOrganizationData(orgData,userdetails.ref,userdetails.project_ref);
  const { status, data, statusText } = res;
  setIsLoading(false);
  switch (status) {
    case 200:
      toast.success(t('companySetupPage.success_message'))
      dispatch(
        setInviteUserDeatils({
         ...userdetails,
          organization_id:data.id
        })
      );
      localStorage.clear()
      navigate("/login");
      break;
    case 400:
      setApiResponseErr(data);
      break;
    default:
      setApiResponseErr(statusText);
      break;
  }
  
  }
  const onSubmitcompanySetupPage = async (userData: any) => {
    setIsLoading(true);
    try {
      const companydetail={
        companyname: userData.companyname,
          address: userData.address,
      }
      dispatch(
        setInviteUserDeatils({...companydetail,...userdetails})
      );
      // const passUserDetails:any={
      //   email:userdetails.email,
      //   password:userdetails.password,
      //   data:{
      //     first_name:userdetails.firstname,
      //     last_name:userdetails.lastname,
      //     mobile:userdetails.phonenumber
      //   }

      // }
      // if(userdetails.project_role!==''||userdetails.project_role!==undefined||userdetails.project_role!==null){
      //   passUserDetails.project_role=userdetails.project_role;
      // }
      // if(userdetails.project_ref!==''||userdetails.project_ref!==undefined||userdetails.project_ref!==null){
      //   passUserDetails.project_ref=userdetails.project_ref;
      // }     
      postOrganizedData({},userData);
        // const res = await doUserSignup({passUserDetails},userdetails.project_ref);
        // const { status, data, statusText } = res;
        // setIsLoading(false);
        // switch (status) {
        //   case 201:    
        //     postOrganizedData(data,userData);
            
        //     break;
        //   case 400:
        //     setApiResponseErr(data);
        //     break;
        //   default:
        //     setApiResponseErr(statusText);
        //     break;
        // }
    
      
    } catch (err) {
      toast.error(t("companySetupPage.error_something_went_wrong"));
    }
  };
  const onChange = (e: any) => {
    const { name, value } = e.target;
    switch (name) {
      case "companyname":
        if (value === "") {
          setError(name, {
            type: "required",
            message: t("companySetupPage.error_companyname_required"),
          });
        } else {
          clearErrors(name);
        }
        break;
      case "address":
        if (value === "") {
          setError(name, {
            type: "required",
            message: t("companySetupPage.error_address_required"),
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
      <h2>{`${t("companySetupPage.welcometext")}`}</h2>
      <p>You are the admin</p>
      <form
        className="form-root"
        onSubmit={handleSubmit(onSubmitcompanySetupPage)}
      >
        <div className="form-group">
          <Label label={`${t("companySetupPage.companyname")}`} />
          <Input
            inputPlaceholder={`${t("companySetupPage.companyname")}`}
            inputName="companyname"
            register={register}
            rules={{
              required: {
                value: true,
                message: `${t("companySetupPage.error_companyname_required")}`,
              },

              onChange: (e: any) => onChange(e),
            }}
            id="companySetupPage_companyname"
            inputType="text"
          />
          <FeildErrorMessage
            errors={errors}
            name="companyname"
            containerClass="w-100"
          />
        </div>
        <div className="form-group">
          <Label label={`${t("companySetupPage.address")}`} />
          <Input
            inputPlaceholder={`${t("companySetupPage.address")}`}
            inputName="address"
            register={register}
            rules={{
              required: {
                value: true,
                message: `${t("companySetupPage.error_address_required")}`,
              },
              onChange: (e: any) => onChange(e),
            }}
            id="companySetupPage_address"
            inputType="text"
          />
          <FeildErrorMessage
            errors={errors}
            name="address"
            containerClass="w-100"
          />
        </div>
        <div className="btn-sec">
          <Link className="forgot-link" to="#" />
          <Button
            buttonLabel={`${t("companySetupPage.submit")}`}
            handleClick={handleSubmit(onSubmitcompanySetupPage)}
            varient="primary"
            size="small"
            disabled={isLoading}
            className="btn theme-btn btn-companySetupPage"
          />
        </div>
        <CommonErrorMessage
          errMessage={apiResponseErr}
          containerClass="w-100 companySetupPage_error"
        />
      </form>
    </div>
  );
}

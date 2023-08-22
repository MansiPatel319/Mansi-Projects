import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import CryptoJS from "crypto-js";

// component
import Label from "../../UI/Label";
import Input from "../../UI/Input";
import Button from "../../UI/Button";
import FeildErrorMessage from "../../UI/FeildErrorMessage";

// redux
import { setInviteUserDeatils } from "../../../Store/Actions/InviteUserModule/InviteUserActionCreatore";

// helper
import {
  isCheckLowercase,
  isCheckMaxLength,
  isCheckMinLength,
  isCheckNumber,
  isCheckSpecialChar,
  isCheckUppercase,
  isPassword,
  validateEmail
} from "../../../Library/Utils";

//
export interface ISignupComponentProps {}

export default function SignupComponent() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [projectDetail, setprojectDetail] = useState<any>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const {
    register, // this use for evnets and value
    setValue, // this use for value set their feild
    handleSubmit, // this is form submit handle
    setError,
    clearErrors,
    formState: { errors }, // error like required,validate, etc..
  } = useForm();

  useEffect(() => {
    if (location.search !== "") {
      const myspliturl: any = location.search.split("signature=");
      const signature: any = myspliturl[1];
      let key: any = process.env.REACT_APP_SIGNATURE_KEY; // key used in Python
      key = CryptoJS.enc.Utf8.parse(key);
      let decryptedSecret: any = CryptoJS.AES.decrypt(signature, key, {
        mode: CryptoJS.mode.ECB,
      });
      decryptedSecret = decryptedSecret.toString(CryptoJS.enc.Utf8);
      if (decryptedSecret !== "") {
        setprojectDetail(JSON.parse(decryptedSecret));
        const maildata = JSON.parse(decryptedSecret);
        setValue("email", maildata.invite_email);
      }
    }
    // const query = new URLSearchParams(location.search);
   
  }, []);
 

  const onSubmitSignup = async (userData: any) => {
    setIsLoading(true);
    try {
      dispatch(
        setInviteUserDeatils({
          email: userData.email,
          password: userData.password,
          project_role: projectDetail.role_id,
          project_ref: projectDetail.project_ref,
        })
      );
      navigate(`/setprofile`)
      // navigate("/company/choose");
    } catch (err) {
      toast.error(t("Signup.error_something_went_wrong"));
    }
  };
  const onChange = (e: any) => {
    const { name, value } = e.target;
    switch (name) {
      case "email":
        if (value === "") {
          setError(name, {
            type: "required",
            message: t("Signup.error_email_required"),
          });
        } else if (!validateEmail(value)) {
          setError(name, {
            type: "validate",
            message: t("Signup.error_valid_email"),
          });
        } else {
          clearErrors(name);
        }
        break;
      case "password":
        if (value === "") {
          setError(name, {
            type: "required",
            message: t("Signup.error_password_required"),
          });
        } else if (!isPassword(value)) {
          const message = [];
          if (!isCheckUppercase(value)) {
            message.push(t("Signup.error_password_upper"));
          }
          if (!isCheckLowercase(value)) {
            message.push(t("Signup.error_password_lower"));
          }
          if (!isCheckSpecialChar(value)) {
            message.push(t("Signup.error_password_special"));
          }
          if (!isCheckNumber(value)) {
            message.push(t("Signup.error_password_number"));
          }
          if (!isCheckMinLength(value)) {
            message.push(t("Signup.error_password_min"));
          }
          if (!isCheckMaxLength(value)) {
            message.push(t("Signup.error_password_max"));
          }
          setError(name, {
            type: "validate",
            message: message.toString(),
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
      <h2>{`${t("Signup.welcometext")}`}</h2>
      <p>{`${t("Signup.pls_Signup")}`}</p>
      <form className="form-root" onSubmit={handleSubmit(onSubmitSignup)}>
        <div className="form-group">
          <Label label={`${t("Signup.email")}`} />
          <Input
            inputPlaceholder={`${t("Signup.email")}`}
            inputName="email"
            disabled
            register={register}
            rules={{
              required: {
                value: true,
                message: `${t("Signup.error_email_required")}`,
              },
              validate: (value: string) => {
                return (
                  validateEmail(value) || `${t("Signup.error_valid_email")}`
                );
              },
              onChange: (e: any) => onChange(e),
            }}
            id="Signup_email"
            inputType="email"
          />
          <FeildErrorMessage
            errors={errors}
            name="email"
            containerClass="w-100"
          />
        </div>

        <div className="form-group">
          <Label label={`${t("Signup.password")}`} />
          <Input
            inputType="password"
            inputPlaceholder={`${t("Signup.password")}`}
            inputName="password"
            register={register}
            rules={{
              required: {
                value: true,
                message: `${t("Signup.error_password_required")}`,
              },
              validate: (value: string) => {
                return (
                  isPassword(value) || `${t("Signup.error_valid_password")}`
                );
              },
              onChange: (e: any) => onChange(e),
            }}
            id="Signup_password"
          />
          <FeildErrorMessage
            errors={errors}
            name="password"
            containerClass="w-100"
          />
        </div>

        <div className="btn-sec">
          {/* <a className="forgot-link"></a> */}
          <Button
            buttonLabel={`${t("Signup.createaccount")}`}
            handleClick={handleSubmit(onSubmitSignup)}
            disabled={isLoading}
            className="btn theme-btn btn-Signup"
          />
        </div>
      
      </form>
    </div>
  );
}

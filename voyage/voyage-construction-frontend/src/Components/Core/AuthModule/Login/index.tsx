
import React, { useState,useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

// component
import Label from "../../../UI/Label";
import Input from "../../../UI/Input";
import Button from "../../../UI/Button";
import CommonErrorMessage from "../../../UI/CommonErrorMessage";
import FeildErrorMessage from "../../../UI/FeildErrorMessage";

// redux
import { setUserDeatils } from "../../../../Store/Actions/AuthModule/authActionCreator";

// API
import { doUserLogin } from "../../../../Network/Core/AuthModule/auth";
import { setLocalStorage } from "../../../../Network/ApiService";
//
// helper
import { validateEmail } from "../../../../Library/Utils";
import { constants } from "../../../../Library/Constants";
import images from "../../../../Assets/images";

//
export interface ILoginComponentProps {}

export default function LoginComponent() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [apiResponseErr, setApiResponseErr] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false)
  const [emailEmpty, setEmailEmpty] = useState(true)
  const [passwordEmpty, setPasswordEmpty] = useState(true)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register, // this use for evnets and value
    handleSubmit, // this is form submit handle
    setError,
    clearErrors,
  
    formState: { errors }, // error like required,validate, etc..
  } = useForm();

  const handlePassword = () => {
    setShowPassword(!showPassword)
  }

  const onSubmitLogin = async (userData: any) => {
    setIsLoading(true);
    try {
      const res = await doUserLogin({
        email: userData.email,
        password: userData.password,
      });
      toast.loading(t("login.check_info"));
      const { status, data, statusText } = res;
      console.log('res :>> ', res);
      switch (status) {
        case 200:
          setIsLoading(false);
          dispatch(setUserDeatils(data));
          // setLocalStorage(constants.LOGIN_TOKEN, data.token);
          setLocalStorage(constants.LOGIN_TOKEN, data.access);
          toast.success(t("login.success_message"));
          navigate("/project/choose");
          break;
        case 400:
          setIsLoading(false);
          setApiResponseErr(t('login.comman_error_message'));
          break;
        case 401:
          if (data.detail === "Wrong Username or password")
          {
            setError('password',
            {
              type: "validate",
              message: t("login.error_valid_password"),
            })
          }
          else {
            
            setApiResponseErr(data.detail);
          }
          setIsLoading(false);
          break;
        default:
           setIsLoading(false);
          setApiResponseErr(t('login.comman_error_message'));
          break;
      }
    } catch (err) {
      console.log('err :>> ', err);
      setIsLoading(false);
      toast.error(t("login.error_something_went_wrong"));
    }
  };
  const onChange = (e: any) => {
    const { name, value } = e.target;
    switch (name) {
      case "email":
        if (value === "") {
          setEmailEmpty(true)
          setError(name, {
            type: "required",
            message: t("login.error_email_required"),
          });
        } else if (!validateEmail(value)) {
          setError(name, {
            type: "validate",
            message: t("login.error_valid_email"),
          });
        } else {
          setEmailEmpty(false)
          clearErrors(name);
        }
        break;
      case "password":
        if (value === "") {
          setPasswordEmpty(true)
          setError(name, {
            type: "required",
            message: t("login.error_password_required"),
          });
        } else {
          setPasswordEmpty(false)
          // clearErrors(name);
        }
        break;
      default:
        break;
    }
  };
  return (
    <div className="custom-form">
      <h2>{`${t("login.welcometext")}`}</h2>
      <p>{`${t("login.pls_login")}`}</p>
      <form className="form-root" onSubmit={handleSubmit(onSubmitLogin)}>
      <CommonErrorMessage
          errMessage={apiResponseErr}
          containerClass="w-100 login_error"
        />
        <div className="form-group">
          <Label label={`${t("login.email")}`} />
          <Input
            inputPlaceholder={`${t("login.email")}`}
            className={errors[`email`] ? "form-control error" :"form-control"}
            inputName="email"
            register={register}
            rules={{
              required: {
                value: true,
                message: `${t("login.error_email_required")}`,
              },
              validate: (value: string) => {
                return (
                  validateEmail(value) || `${t("login.error_valid_email")}`
                );
              },
              onChange: (e: any) => onChange(e),
            }}
            id="login_email"
            inputType="email"
          />
          <FeildErrorMessage
            errors={errors}
            name="email"
            containerClass="w-100"
          />
        </div>

        <div className="form-group pwd-field">
          <Label label={`${t("login.password")}`} />
          <Input
            inputType={!showPassword ? "password" : "text"}
            className={errors[`password`] ? "form-control error" :"form-control"}
            inputPlaceholder={`${t("login.password")}`}
            inputName="password"
            register={register}
            rules={{
              required: {
                value: true,
                message: `${t("login.error_password_required")}`,
              },
              onChange: (e: any) => onChange(e),
            }}
            id="login_password"
            iconName={showPassword ? images.showPassword : images.hidePassword}
            handleIconClick={handlePassword}
          />	

          <FeildErrorMessage
            errors={errors}
            name="password"
            containerClass="w-100"
          />
        </div>
        
        <div className="btn-sec">
          <a href="/password/forgot" className="forgot-link">{`${t(
            "login.forgot_password"
          )}`}</a>
          <Button
            buttonLabel={`${t("login.login")}`}
            handleClick={handleSubmit(onSubmitLogin)}
            varient="primary"
            size="small"
            disabled={(emailEmpty || passwordEmpty) || isLoading }
            className="btn theme-btn btn-login"
          />
        </div>
       
      </form>
    </div>
  );
}

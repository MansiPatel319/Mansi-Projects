import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

// component
import Label from "../../../UI/Label";
import Input from "../../../UI/Input";
import Button from "../../../UI/Button";
import CommonErrorMessage from "../../../UI/CommonErrorMessage";
import FeildErrorMessage from "../../../UI/FeildErrorMessage";

// redux
// API
import { doResetPassword } from "../../../../Network/Core/AuthModule/auth";

//
// helper
import {
  isCheckLowercase,
  isCheckMaxLength,
  isCheckMinLength,
  isCheckNumber,
  isCheckSpecialChar,
  isCheckUppercase,
  isPassword,
} from "../../../../Library/Utils";
//
export interface ILoginComponentProps {}

export default function LoginComponent() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [apiResponseErr, setApiResponseErr] = useState<string>("");
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const token = query.get("token");
  const uid = query.get("uid");

  const {
    register, // this use for evnets and value
    handleSubmit,
    watch, // this is form submit handle
    formState: { errors }, // error like required,validate, etc..
    setError,
    clearErrors,
  } = useForm();

  const onSubmitResetPassword = async (userData: any) => {
    setIsLoading(true);
    try {
      const res = await doResetPassword({
        token,
        uid,
        password: userData.password,
      });
      toast.loading(t("resetPassword.check_info"));
      const { status, data, statusText } = res;
      switch (status) {
        case 200:
          setIsLoading(false);
          toast.success(`${t("resetPassword.success_message")}`);
          navigate("/login");
          break;
        case 400:
          setIsLoading(false);
          setApiResponseErr(data);
          break;
        default:
          setIsLoading(false);
          setApiResponseErr(statusText);
          break;
      }
    } catch (err) {
      toast.error(t("forgotPassword.error_something_went_wrong"));
    }
  };
  const onChange = (e: any) => {
    const { name, value } = e.target;
    switch (name) {
      case "password":
        if (value === "") {
          setError(name, {
            type: "required",
            message: t("resetPassword.error_password_required"),
          });
        } else if (!isPassword(value)) {
          const message = [];
          if (!isCheckUppercase(value)) {
            message.push(t("resetPassword.error_password_upper"));
          }
          if (!isCheckLowercase(value)) {
            message.push(t("resetPassword.error_password_lower"));
          }
          if (!isCheckSpecialChar(value)) {
            message.push(t("resetPassword.error_password_special"));
          }
          if (!isCheckNumber(value)) {
            message.push(t("resetPassword.error_password_number"));
          }
          if (!isCheckMinLength(value)) {
            message.push(t("resetPassword.error_password_min"));
          }
          if (!isCheckMaxLength(value)) {
            message.push(t("resetPassword.error_password_max"));
          }
          setError(name, {
            type: "validate",
            message: message.toString(),
          });
        } else {
          clearErrors(name);
        }
        break;
      case "confirmpassword":
        if (value !== watch("password")) {
          setError(name, {
            type: "required",
            message: t("resetPassword.error_password_not_match"),
          });
        } else {
          clearErrors(e.target.name);
        }
        break;
      default:
        break;
    }
  };
  return (
    <div className="custom-form">
      <h2>{`${t("resetPassword.reset_password")}`}</h2>
      <p>{`${t("resetPassword.welcometext_reset")}`}</p>
      <form>
        <div className="form-group">
          <Label label={`${t("resetPassword.password")}`} />
          <Input
            inputType="password"
            inputPlaceholder={`${t("resetPassword.password")}`}
            inputName="password"
            register={register}
            rules={{
              required: {
                value: true,
                message: `${t("resetPassword.error_password_required")}`,
              },
              validate: (value: string) => {
                return (
                  isPassword(value) ||
                  `${t("resetPassword.error_valid_password")}`
                );
              },
              onChange: (e: any) => onChange(e),
            }}
            id="reset_password"
          />

          <FeildErrorMessage
            errors={errors}
            name="password"
            containerClass="w-100"
          />
        </div>
        <div className="form-group">
          <Label label={`${t("resetPassword.confirmpassword")}`} />
          <Input
            inputType="password"
            inputPlaceholder={`${t("resetPassword.confirmpassword")}`}
            inputName="confirmpassword"
            register={register}
            rules={{
              required: {
                value: true,
                message: `${t(
                  "resetPassword.error_confirm_password_required"
                )}`,
              },
              validate: (value: string) => {
                return (
                  value === watch("password") ||
                  `${t("resetPassword.error_password_not_match")}`
                );
              },
              onChange: (e: any) => onChange(e),
            }}
            id="reset_confirm_password"
          />
          <FeildErrorMessage
            errors={errors}
            name="confirmpassword"
            containerClass="w-100"
          />
        </div>
        <div className="btn-sec">
          <a id="forgot-link" href="/login">{`${t(
            "resetPassword.backtologin"
          )}`}</a>
          <Button
            buttonLabel="Submit"
            handleClick={handleSubmit(onSubmitResetPassword)}
            varient="primary"
            size="small"
            disabled={isLoading}
            className="btn theme-btn btn-reset-password"
          />
        </div>
        <CommonErrorMessage
          errMessage={apiResponseErr}
          containerClass="w-100 login_error"
        />
      </form>
    </div>
  );
}

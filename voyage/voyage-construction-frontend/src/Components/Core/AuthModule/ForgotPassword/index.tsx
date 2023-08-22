import React, { useState } from "react";
import { useForm } from "react-hook-form";
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
import { doForgotPassword } from "../../../../Network/Core/AuthModule/auth";
//
// helper
import { validateEmail } from "../../../../Library/Utils";

export interface ILoginComponentProps {}

export default function LoginComponent() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [apiResponseErr, setApiResponseErr] = useState<string>("");

  const {
    register, // this use for evnets and value
    handleSubmit, // this is form submit handle
    formState: { errors }, // error like required,validate, etc..
    setError,
    clearErrors,
  } = useForm();
  const onSubmitForgotPassword = async (userData: any) => {
    setIsLoading(true);
    try {
      const res = await doForgotPassword({
        email: userData.email,
      });
      toast.loading(t("forgotPassword.check_info"));
      const { status, data, statusText } = res;    
      switch (status) {
        case 200:
          setIsLoading(false);
          toast.success(
            `please check your email  ${userData.email}  for reset password`
          );
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
      setIsLoading(false);
      toast.error(t("forgotPassword.error_something_went_wrong"));
    }
  };
  const onChange = (e: any) => {
    const { name, value } = e.target;
    switch (name) {
      case "email":
        if (value === "") {
          setError(name, {
            type: "required",
            message: t("forgotPassword.error_email_required"),
          });
        } else if (!validateEmail(value)) {
          setError(name, {
            type: "validate",
            message: t("forgotPassword.error_valid_email"),
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
      <h2>{`${t("forgotPassword.forgot_password")}`}</h2>
      <p>{`${t("forgotPassword.welcometext_forgot")}`}</p>
      <form
        className="form-root"
        onSubmit={handleSubmit(onSubmitForgotPassword)}
      >
        <div className="form-group">
          <Label label={`${t("forgotPassword.email")}`} />
          <Input
            inputPlaceholder={`${t("forgotPassword.email")}`}
            inputName="email"
            register={register}
            rules={{
              required: {
                value: true,
                message: `${t("forgotPassword.error_email_required")}`,
              },
              validate: (value: string) => {
                return (
                  validateEmail(value) ||
                  `${t("forgotPassword.error_valid_email")}`
                );
              },
              onChange: (e: any) => onChange(e),
            }}
            id="forgot_email"
          />
          <FeildErrorMessage
            errors={errors}
            name="email"
            containerClass="w-100"
          />
        </div>

        <div className="btn-sec">
          <a href="/login" id="back-to-login-link">{`${t(
            "forgotPassword.backtologin"
          )}`}</a>
          <Button
            buttonLabel={`${t("forgotPassword.submit")}`}
            handleClick={handleSubmit(onSubmitForgotPassword)}
            varient="primary"
            size="small"
            disabled={isLoading}
            className="btn theme-btn btn-forgot-password"
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

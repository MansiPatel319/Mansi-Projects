import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

// component
import Label from "../../UI/Label";
import Input from "../../UI/Input";
import Button from "../../UI/Button";
import FeildErrorMessage from "../../UI/FeildErrorMessage";

// redux

// API

// helper
import { validateEmail } from "../../../Library/Utils";

//
export interface IaccountcompletePageComponentProps {}

export default function accountcompletePageComponent() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register, // this use for evnets and value
    handleSubmit, // this is form submit handle
    setError,
    clearErrors,
    formState: { errors }, // error like required,validate, etc..
  } = useForm();

  const onSubmitaccountcompletePage = async (userData: any) => {
    setIsLoading(true);
    try {
      // do api call here
    } catch (err) {
      toast.error(t("accountcompletePage.error_something_went_wrong"));
    }
  };
  const onChange = (e: any) => {
    const { name, value } = e.target;
    switch (name) {
      case "email":
        if (value === "") {
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
          clearErrors(name);
        }
        break;
      case "password":
        if (value === "") {
          setError(name, {
            type: "required",
            message: t("login.error_password_required"),
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
      <h2>{`${t("accountcompletePage.welcometext")}`}</h2>
      <p>{`${t("accountcompletePage.pls_login")}`}</p>
      <form
        className="form-root"
        onSubmit={handleSubmit(onSubmitaccountcompletePage)}
      >
        <div className="form-group">
          <Label label={`${t("accountcompletePage.email")}`} />
          <Input
            inputPlaceholder={`${t("accountcompletePage.email")}`}
            inputName="email"
            register={register}
            rules={{
              required: {
                value: true,
                message: `${t("accountcompletePage.error_email_required")}`,
              },
              validate: (value: string) => {
                return (
                  validateEmail(value) ||
                  `${t("accountcompletePage.error_valid_email")}`
                );
              },
              onChange: (e: any) => onChange(e),
            }}
            id="accountcompletePage_email"
            inputType="email"
          />
          <FeildErrorMessage
            errors={errors}
            name="email"
            containerClass="w-100"
          />
        </div>
        <div className="form-group">
          <Label label={`${t("accountcompletePage.password")}`} />
          <Input
            inputType="password"
            inputPlaceholder={`${t("accountcompletePage.password")}`}
            inputName="password"
            register={register}
            rules={{
              required: {
                value: true,
                message: `${t("accountcompletePage.error_password_required")}`,
              },
              onChange: (e: any) => onChange(e),
            }}
            id="accountcompletePage_password"
          />
          <FeildErrorMessage
            errors={errors}
            name="password"
            containerClass="w-100"
          />
        </div>

        <div className="btn-sec">
          <a href="/password/forgot" className="forgot-link">{`${t(
            "accountcompletePage.forgot_password"
          )}`}</a>
          <Button
            buttonLabel={`${t("accountcompletePage.login")}`}
            handleClick={handleSubmit(onSubmitaccountcompletePage)}
            varient="primary"
            size="small"
            disabled={isLoading}
            className="btn theme-btn btn-accountcompletePage"
          />
        </div>        
      </form>
    </div>
  );
}

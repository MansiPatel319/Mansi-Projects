import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// component

import {
  doUpdatePassword,
  getAccountUserDetail,
} from "../../../Network/Core/Dashboard/dashboard";
// API

// helper
import {
  isCheckLowercase,
  isCheckMaxLength,
  isCheckMinLength,
  isCheckNumber,
  isCheckSpecialChar,
  isCheckUppercase,
  isPassword,
} from "../../../Library/Utils";
import CommonErrorMessage from "../../UI/CommonErrorMessage";
import Button from "../../UI/Button";
import Input from "../../UI/Input";
import FeildErrorMessage from "../../UI/FeildErrorMessage";
// css
import "./style.css";
import "../../../Assets/css/booking-form.css";
import "../../../Assets/css/site-management.css";
import { getLocalStorage } from "../../../Network/ApiService";
import { constants } from "../../../Library/Constants";

export interface UpdatePasswordModalProps {
  handleClose?: () => void;
}

const UpdatePasswordModal = ({ handleClose }: UpdatePasswordModalProps) => {
  const [AccUserDetail, setAccUserDetail] = useState();
  const [apiResponseErr, setApiResponseErr] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const project = getLocalStorage(constants.PROJECT);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    register, // this use for evnets and value
    handleSubmit, // this is form submit handle
    setError,
    clearErrors,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmitUpdatePassword = async (userData: any) => {
    setIsLoading(true);
    try {
      const res = await doUpdatePassword({
        old_password: userData.currentpassword,
        password: userData.newpassword,
        session: false,
      });
      toast.loading(t("updatePassword.check_info"));
      const { status, data, statusText } = res;
      switch (status) {
        case 200:
          setIsLoading(false);
          toast.success(`${t("updatePassword.success_message")}`);
          localStorage.clear();
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
      toast.error(t("updatePassword.error_something_went_wrong"));
    }
  };

  const onChange = (e: any) => {
    const { name, value } = e.target;
    switch (name) {
      case "currentpassword":
        if (value === "") {
          setError(name, {
            type: "required",
            message: t("updatePassword.error_password_required"),
          });
        } else {
          clearErrors(name);
        }
        break;
      case "newpassword":
        if (value === "") {
          setError(name, {
            type: "required",
            message: t("updatePassword.error_password_required"),
          });
        } else if (!isPassword(value)) {
          const message = [];
          if (!isCheckUppercase(value)) {
            message.push(t("updatePassword.error_password_upper"));
          }
          if (!isCheckLowercase(value)) {
            message.push(t("updatePassword.error_password_lower"));
          }
          if (!isCheckSpecialChar(value)) {
            message.push(t("updatePassword.error_password_special"));
          }
          if (!isCheckNumber(value)) {
            message.push(t("updatePassword.error_password_number"));
          }
          if (!isCheckMinLength(value)) {
            message.push(t("updatePassword.error_password_min"));
          }
          if (!isCheckMaxLength(value)) {
            message.push(t("updatePassword.error_password_max"));
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
        if (value !== watch("newpassword")) {
          setError(name, {
            type: "required",
            message: t("updatePassword.error_password_not_match"),
          });
        } else {
          clearErrors(e.target.name);
        }
        break;

      default:
        break;
    }
  };

  const getAccountdetails = async (slug: any) => {
    try {
      setIsLoading(true);
      const res = await getAccountUserDetail(slug);
      const { status, data } = res;
      switch (status) {
        case 200:
          setIsLoading(false);
          setAccUserDetail(data);
          break;
        case 400:
          setIsLoading(false);
          break;
        case 403:
          if (data.detail === "ERR_login_again_token_expired") {
            navigate("/login");
            toast.error(t("chooseProject.error_login_again"));
            localStorage.clear();
          }
          setIsLoading(false);
          break;
        default:
          setIsLoading(false);
          break;
      }
    } catch (err) {
      setIsLoading(false);
      // toast.error(t("chooseProject.error_something_went_wrong"));
    }
  };
  useEffect(() => {
    getAccountdetails(project.slug);
  }, []);
  // other codes of the component

  return (
    <div
      className="modal fade show"
      id="update_password_Modal"
      style={{ display: "block" }}>
      <div className="modal-dialog modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h3>Update Password</h3>
          </div>
          <form>
            <div className="modal-body">
              <div>
                <div className="form-group">
                  <label>Current Password</label>
                  <Input
                    inputName="currentpassword"
                    register={register}
                    rules={{
                      required: {
                        value: true,
                        message: `currentpassword is required`,
                      },
                      onChange: (e: any) => onChange(e),
                    }}
                    id="myaccount_currentpassword"
                    inputType="password"
                  />
                  <FeildErrorMessage
                    errors={errors}
                    name="currentpassword"
                    containerClass="w-100"
                  />
                </div>
                <div className="form-group">
                  <label>New Password</label>
                  <Input
                    inputType="password"
                    inputName="newpassword"
                    register={register}
                    rules={{
                      required: {
                        value: true,
                        message: `${t(
                          "updatePassword.error_password_required"
                        )}`,
                      },
                      validate: (value: string) => {
                        return (
                          isPassword(value) ||
                          `${t("updatePassword.error_valid_password")}`
                        );
                      },
                      onChange: (e: any) => onChange(e),
                    }}
                    id="myaccount__newpassword"
                  />

                  <FeildErrorMessage
                    errors={errors}
                    name="newpassword"
                    containerClass="w-100"
                  />
                </div>
                <div className="form-group">
                  <label>New Password Again</label>
                  <Input
                    inputType="password"
                    inputName="confirmpassword"
                    register={register}
                    rules={{
                      required: {
                        value: true,
                        message: `${t(
                          "updatePassword.error_confirm_password_required"
                        )}`,
                      },
                      validate: (value: string) => {
                        return (
                          value === watch("newpassword") ||
                          `${t("updatePassword.error_password_not_match")}`
                        );
                      },
                      onChange: (e: any) => onChange(e),
                    }}
                    id="myaccount__confirm_password"
                  />
                  <FeildErrorMessage
                    errors={errors}
                    name="confirmpassword"
                    containerClass="w-100"
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer d-block">
              <div className="contctform-btns">
                <div className="cb-left">
                  <Button
                    buttonLabel="Cancel"
                    className="btn btn-link cancel-updatepassword"
                    handleClick={handleClose}
                  />
                </div>
                <div className="cb-right">
                  <Button
                    buttonLabel="Update Password"
                    handleClick={handleSubmit(onSubmitUpdatePassword)}
                    disabled={isLoading}
                    className="btn btn-link cancel-link edit-contact-cancel"
                  />
                </div>
              </div>
              <CommonErrorMessage
                errMessage={apiResponseErr}
                containerClass="w-100 login_error mb-0 mt-3"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdatePasswordModal;

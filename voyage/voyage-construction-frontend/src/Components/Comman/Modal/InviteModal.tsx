import React, { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import Select from 'react-select'
import toast from "react-hot-toast";

// component
import InputComponent from "../../UI/Input";
import FeildErrorMessage from "../../UI/FeildErrorMessage";
import CommonErrorMessage from "../../UI/CommonErrorMessage";

// API
import { doUserInvite, getUserRoles } from "../../../Network/Core/UserOnBoarding/userInvite";

// helper
import { validateEmail } from "../../../Library/Utils";
import RestrictedEmailDomainList from "../../../StaticData/email_domains"

// css
import "./style.css"
import { getLocalStorage } from "../../../Network/ApiService";
import { constants } from "../../../Library/Constants";
import { useDispatch } from "react-redux";
import useOutsideClick from "../Header/ManageOutsideClickClose";

export interface InviteModalProps {
  handleClose?: any;
}
const employee = {
  id: Math.random(),
  email: "",
  role: "",
};
// const roles = [
//   { value: "Super Admin", label: "Super Admin" },
//   { value: "Admin", label: "Admin" },
//   { value: "Venue Manager", label: "Venue Manager" },
// ];
const InviteModal = ({ handleClose }: InviteModalProps) => {
  const [inviteUserItems, setInviteUserItems] = useState([employee]);
  const [isLoading, setIsLoading] = useState(false);
  const [roles, setRoles] = useState([]);
  const [apiResponseErr, setApiResponseErr] = useState<string>("");
  const project =  getLocalStorage(constants.PROJECT)
  const navigate = useNavigate()

  const { t } = useTranslation();
  const refOutsideModel = useRef(null);


  useOutsideClick(refOutsideModel, () => { 
    handleClose()
   
  })
  const {
    register, // this use for evnets and value
    handleSubmit, // this is form submit handle
    setError,
    clearErrors,
    control,
    formState: { errors },
  } = useForm();
console.log('errors :>> ',  errors[`email:0`]);
  const handleAddUser = () => {
    // const isValid = checkAttendeeValidation();
    // if (isValid) {
    const person = {
      id: Math.random(),
      email: "",
      role: "",
    };
    setInviteUserItems([...inviteUserItems, person]);
    // }
  };
  const onChangeInput = (e: any,index:number) => {
    const { name, value } = e.target;
    switch (name) {
      case "email":
        if (value === "") {
          console.log('if');
          
          setError(`email:${index}`, {
            type: "required",
            message: t("userManagment.error_email_required"),
          });
        } else if (!validateEmail(value)) {
          setError(`email:${index}`, {
            type: "validate",
            message: t("userManagment.error_valid_email"),
          });
        } else if (RestrictedEmailDomainList.find((item) => value.substring(value.indexOf("@") + 1, value.length) === item)) {
          setError(`email:${index}`, {
            type: "validate",
            message: t("userManagment.error_valid_email"),
          });
        }
        else {
          clearErrors(`email:${index}`);
        }
        break;
      default:
        break;
    }
  };
  const submitUserInvite = async (InvitationUserData: any) => {
    try {
      const res = await doUserInvite( project.ref, InvitationUserData);
      const { status, data, statusText } = res;
      setIsLoading(true);
      switch (status) {
        case 200:
          toast.success(t("userManagment.invite_success"));
          handleClose()
          break;
        case 400:
          setApiResponseErr(data);
          break;
        case 403:
          if (data.detail === "ERR_login_again_token_expired") {
            toast.error(t("userManagment.error_login_again"));
            localStorage.clear()
            navigate('/login')
          }
            setIsLoading(false)  
          break;
        default:
          setApiResponseErr(statusText);
          break;
      }
    } catch (err) {
      toast.error(t("userManagment.error_something_went_wrong"));
    }
  }
  const onSubmitInvite = async (Data: any) => {
    
   
   
    //  convert this  -----------------------------------
    //   {
    //     "email:0": "jaimina@gmail.com",
    //     "roles:0": {
    //         "value": 1,
    //         "label": "Project Owner"
    //     },
    //     "email:1": "abc@gmail.com",
    //     "roles:1": {
    //         "value": 2,
    //         "label": "Project Admin"
    //     }
    // }

    // to this-------------------------------

    //   [
    //     {
    //         "email": "jaimina@gmail.com",
    //         "roles": {
    //             "value": 2,
    //             "label": "Project Owner"
    //         }
    //     },
    //     {
    //         "email": "abc@gmail.com",
    //         "roles": {
    //             "value": 2,
    //             "label": "Project Admin"
    //         }
    //     }
    // ]
    let flag= 1
    let invitedUser: any = Object.entries(Data).map(entry => {
      return { [entry[0].substring(0, entry[0].length - 2)]: entry[1] };
    });

    // merge array i element with i+1 element in array

    invitedUser.map((item: any, i: any) => {
      if (Object.keys(item).includes('email')) {
        invitedUser[i] = {
          ...invitedUser[i], ...invitedUser[i + 1]
        }
        invitedUser[i].role = invitedUser[i].roles.value
        delete invitedUser[i].roles
        delete invitedUser[i + 1]
      }
      return item
    })

    // delete empty element in  array

    invitedUser = invitedUser.filter((el: any) => {
      return el != null;
    });
      invitedUser.map((invitedUserItem: any, index:number) => {
        let value = invitedUserItem.email
        if (RestrictedEmailDomainList.find((item) => value.substring(value.indexOf("@") + 1, value.length) === item)){
          setError(`email:${index}`, {
            type: "validate",
            message: t("userManagment.error_valid_email"),
          });
          flag= 0
        }
      })
     
      if (flag===1)
      {
      submitUserInvite(invitedUser)
      }

  };

  const getUserRole = async () => {
    try {
      const res = await getUserRoles({
        project: project.ref
      });
      const { status, data } = res;
      // setIsLoading(false);
      switch (status) {
        case 200:
          const tempRole = res.data.results.map((role: any) => {
            return ({
              value: role.id,
              label: role.name
            })
          })
          setRoles(tempRole)
          break;
        case 400:
          break;
        case 403:
          if (data.detail === "ERR_login_again_token_expired") {
            toast.error(t("userManagment.error_login_again"));
            localStorage.clear()
            navigate('/login')
          }
          setIsLoading(false)
          break
        default:

          break;
      }
    } catch (err) {
      console.log('err :>> ', err);
      // toast.error(t("forgotPassword.error_something_went_wrong"));
    }
  }
  const onBlurEmail = (e:any,index:number) => {
    const { name, value } = e.target;  
    
    if (RestrictedEmailDomainList.find((item) => value.substring(value.indexOf("@") + 1, value.length) === item)) {
      
      setError(`email:${index}`, {
        type: "validate",
        message: t("userManagment.error_valid_email"),
      });
    } else {
      clearErrors(name);
    }
  }

  useEffect(() => {
    if (project.ref)
    {     
      getUserRole()
    }
  }, []);
  // other codes of the component 

  return (
    <div
      className="modal fade  show"
      id="invite_user_Modal"
      style={{ display: "block" }}
    >
      <div className="modal-dialog modal-dialog-scrollable">
        <div className="modal-content" ref={refOutsideModel}>
          <div className="modal-body">
            <div className="custom-form">
              <h2>{t("userManagment.invite_users")}</h2>
              <p>{project.name}</p>
              <form
                className="form-root"
                onSubmit={handleSubmit(onSubmitInvite)}
              >
                <div className="add-user-wrapper">
                  {inviteUserItems.map((user, index) => (
                    <div className="row">
                      <div className="col-md-7">
                        <div className="form-group">
                          <InputComponent
                            inputType="text"
                            inputPlaceholder={`${t("userManagment.email")}`}
                            inputName={`email:${index}`}
                            register={register}
                            rules={{
                              required: {
                                value: true,
                                message: `${t("userManagment.error_email_required")}`,
                              },
                              validate: (value: string) => {
                                return (
                                  validateEmail(value) || `${t("userManagment.error_valid_email")}`
                                );
                              },
                              onChange: (e: any) => onChangeInput(e,index),
                              onBlur: (e: any) => onBlurEmail(e,index),
                            }}
                            id="email"
                          />
                          <FeildErrorMessage
                            errors={errors}
                            name={`email:${index}`}
                            containerClass="w-100"
                          />
                          {/* <InputComponent id={user.email} inputType="Email" inputName={`Email:${index}`} /> */}
                        </div>
                      </div>
                      <div className="col-md-5">
                        <div className="form-group">
                          <Controller
                            control={control}
                            name={`roles:${index}`}
                            rules={{
                              required: {
                                value: true,
                                message: `${t("userManagment.error_role_required")}`,
                              },
                            }}
                            render={({ field: { onChange, value } }: any) => (
                              <Select
                                // inputRef={ref}
                                classNamePrefix="form-control-language"
                                options={roles}
                                id="userRole"
                                name="userRole"
                                value={roles?.find((c: any) => c.value === value)}
                                onChange={(val: any) => onChange(val)}
                              />
                            )}
                          />
                          <FeildErrorMessage
                            errors={errors}
                            name={`roles:${index}`}
                            containerClass="w-100"
                          />
                        </div>
                      </div>
                      <CommonErrorMessage
                        errMessage={apiResponseErr}
                        containerClass="w-100 login_error"
                      />
                    </div>
                  ))}
                </div>
                <div className="add-another-link">
                  <Link onClick={handleAddUser} to="#">
                    Add Another
                  </Link>
                </div>
                <div className="btn-sec">
                  <Link onClick={handleClose} to="#">
                    Invite Later
                  </Link>
                  <button type="submit" className="btn theme-btn invite-model-btn">
                    {t("userManagment.send_invite")}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InviteModal;

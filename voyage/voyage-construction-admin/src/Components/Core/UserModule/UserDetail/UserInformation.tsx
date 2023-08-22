import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import Select from 'react-select';
import { validateEmail, validatePhoneNumber } from '../../../../Library/Utils';
import { getUserOrganizationRoles, updateUserDetailData } from '../../../../Network/Core/Users/UserInformation';
import Input from "../../../UI/Input";
import Label from "../../../UI/Label";
import FeildErrorMessage from "../../../UI/FeildErrorMessage";
import { getLocalStorage } from '../../../../Network/ApiService';
import { constants } from '../../../../Library/Constants';

interface userDetailProps {
  userDetail: any;
  getUserDetail: () => void

}
const UserInformation = ({ userDetail, getUserDetail }: userDetailProps) => {
  const { t } = useTranslation()
  const { region } = useParams()
  const { ref } = useParams()
  const baseUrlForFrontend: any = process.env.REACT_APP_BASE_URL
  const [loading, setIsLoading] = useState(false)
  const [orgRoleList, setOrgRoleList] = useState([])
  const user = getLocalStorage(constants.USER)
  const [profileImage, setProfileImage] = useState<any>('')
  const [logoImage,setLogoImage] = useState<any>('')
  const [userStatusList, setUserStatusList] = useState([
    {
      label: 'Blocked', value: "-2"
    },
    {
      label: 'Restricted', value: "-1"
    },
    {
      label: 'Invited', value: "0"
    },
    {
      label: 'Active', value: "1"
    },
  ])
  const [globalAdminStatusList, setGlobalAdminStatusListList] = useState([
    {
      label: 'Global Admin', value: "1"
    },
    {
      label: 'User', value: "0"
    }

  ])
  const onChangeImage = (e: any) => {
    const file = e.target.files[0];

    setLogoImage(file);
   
  };
  const getOrganizationRolesList = async () => {
    try {
      setIsLoading(true);
      const res = await getUserOrganizationRoles(userDetail?.organization?.id, region);
      const { status, data, statusText } = res;
      switch (status) {
        case 200:
          setIsLoading(false);
          console.log('data :>> ', data);
          data.results.map((item: any) => {
            item.value = item.id,
              item.label = item.name
          })
          setOrgRoleList(data.results);
          break;
        case 400:
          setIsLoading(false);
          break;
        case 401:
          window.open(`${baseUrlForFrontend}`, "_blank");
          localStorage.clear();
          setIsLoading(false);
          break;
        case 404:
          setIsLoading(false);
          break;
        default:
          setIsLoading(false);
          break;
      }
    } catch (err) {

      console.log("err :>> ", err);

    }
  }
  const onSubmitUserDetail = async (data: any) => {
    console.log('data :>> ', data);
    const userData = new FormData()
    userData.append("user_status", data.userStatus)
    userData.append("email", data.email)
    userData.append("firstName", data.firstName)
    userData.append("lastName", data.lastName)
    userData.append("mobile", data.phone)
    userData.append("organization_role", data.orgRole)
    userData.append("profile_image",logoImage)
    userData.append("organization", userDetail.organization.id)
    userData.append("is_global_admin_user", data.globalAdminStatus === '1' ? "true" : "false")

    console.log('userData :>> ', userData);

    try {
      setIsLoading(true);
      const res = await updateUserDetailData(userData, ref, region);
      const { status, data, statusText } = res;
      switch (status) {
        case 200:
          setIsLoading(false);
          console.log('data :>> ', res);
          getUserDetail()
          break;
        case 400:
          setIsLoading(false);
          break;
        case 401:
          window.open(`${baseUrlForFrontend}`, "_blank");
          localStorage.clear();
          setIsLoading(false);
          break;
        case 404:
          setIsLoading(false);
          break;
        default:
          setIsLoading(false);
          break;
      }
    } catch (err) {

      console.log("err :>> ", err);

    }
  }
  const {
    register,
    setValue,
    setError,
    control,
    clearErrors,
    formState: { errors },
    handleSubmit,
    getValues
  } = useForm();


  const onChangeInput = (e: any) => {
    const { name, value } = e.target
    switch (name) {
      case 'email':
        if (value !== '' && !validateEmail(value)) {

          setError(name, {
            type: "validate",
            message: t("siteDetail.error_valid_email"),
          });
        } else {
          clearErrors(name);
        }

        break;
      case "phone":
        if (value !== '' && !validatePhoneNumber(value)) {

          setError(name, {
            type: "validate",
            message: t("siteDetail.error_valid_phonenumber"),
          });
        } else {
          clearErrors(name);
        }
        break;
      default:
        break
    }

  }

  useEffect(() => {
    if (user.isGlobalAdminUser) {
      setValue("globalAdminStatus", "1")
    }
  }, [user])

  useEffect(() => {
    getOrganizationRolesList()
  }, [userDetail]);
  useEffect(() => {
    const { firstName, lastName, email, mobile, organizationRole, userStatus, profileImage } = userDetail
    console.log('organizationRole :>> ', organizationRole);
    console.log('orgRoleList :>> ', orgRoleList);
    setValue("firstName", firstName)
    setValue("lastName", lastName)
    setValue("email", email)
    setValue("phone", mobile)
    setValue("orgRole", organizationRole?.id)
    setValue("userStatus", userStatus?.toString())  
    if (profileImage)
    {
      
      setProfileImage(profileImage);
      }
    
  }, [userDetail, orgRoleList])

  return (
    <div className="tab-content site-detailtab-cont" id="nav-tabContent">
      <div className="tab-pane fade show active" id="nav-user-info" role="tabpanel" aria-labelledby="nav-user-info-tab">
        <div className="row">
          <div className="col-xl-6 col-lg-6 col-md-12">
            <div className="vehicle-form glob-form pd-form">
              <h3>Personal Details</h3>
              <div className="cust-projset-box">
                <div className="profile-pic-edit">

                  {profileImage || logoImage
                    ? (
                    <img src={logoImage && window.URL?.createObjectURL(logoImage).toString() || profileImage } />
                  ) : (
                    <span className="profile-user-circle">CS</span>
                  )}




                  <div className="file-input">

                    <div className="file-input-text">
                      Tap to edit profile picture
                    </div> <br />
                    <input type="file" onChange={(e)=>onChangeImage(e)} className="form-control" id="image" />

                  </div>



                </div>

                <div className="personal-detail-form">
                  <div className="form-group">
                    <Label label="First Name" />

                    <Input
                      inputName="firstName"
                      className={
                        errors.firstName ? "form-control error" : "form-control"
                      }
                      register={register}
                      rules={{
                        required: {
                          value: true,
                          message: "First Name is required",
                        }
                      }}
                      id="user_first_name"
                      inputType="text"
                    />

                  </div>
                  <div className="form-group">
                    <Label label="Last Name" />

                    <Input
                      inputName="lastName"
                      className={
                        errors.lastName ? "form-control error" : "form-control"
                      }
                      register={register}
                      rules={{
                        required: {
                          value: true,
                          message: "Last Name is required",
                        }
                      }}
                      id="user_last_name"
                      inputType="text"
                    />
                  </div>
                  <div className="form-group">
                    <Label label="Email" />

                    <Input
                      inputName="email"
                      className={
                        errors.email ? "form-control error" : "form-control"
                      }
                      register={register}
                      rules={{
                        required: {
                          value: true,
                          message: "Email is required",
                        },
                        onChange: (e: any) => onChangeInput(e),
                      }}
                      id="user_email"
                      inputType="text"
                    />
                    <FeildErrorMessage
                      errors={errors}
                      name="email"
                      containerClass="w-100"
                    />
                  </div>
                  <div className="form-group mb-0">
                    <Label label="Phone" />

                    <Input
                      inputName="phone"
                      className={
                        errors.email ? "form-control error" : "form-control"
                      }
                      register={register}
                      rules={{
                        required: {
                          value: true,
                          message: "Phone is required",
                        },
                        onChange: (e: any) => onChangeInput(e),
                      }}
                      id="user_phone"
                      inputType="text"
                    />
                    <FeildErrorMessage
                      errors={errors}
                      name="phone"
                      containerClass="w-100"
                    />
                  </div>
                </div>
              </div>
              <div className="form-cust-btn personal-detail">
                <button type="submit" onClick={handleSubmit(onSubmitUserDetail)} className="theme-btn" data-toggle="modal" data-target="#deletecontact">Save details</button>
              </div>
            </div>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-12">

            <div className="vehicle-form user-side-form">
              <h3>Organization Role</h3>
              <Controller
                control={control}
                name="orgRole"
                render={({ field: { onChange, value, name, ref } }: any) => (
                  <Select
                    classNamePrefix="form-control-language"
                    options={orgRoleList}
                    name="orgRole"
                    value={orgRoleList?.filter(
                      (c: any) => c.value === value
                    )}

                    onChange={(val: any) => { onChange(val.value) }}
                    isSearchable

                  />
                )}
              />

            </div>
            <div className="vehicle-form user-side-form">
              <h3>User Status</h3>
              <div className="form-group mb-0">
                <Controller
                  control={control}
                  name="userStatus"
                  render={({ field: { onChange, value, name, ref } }: any) => (
                    <Select
                      classNamePrefix="form-control-language"
                      options={userStatusList}
                      name="userStatus"
                      value={userStatusList?.filter(
                        (c: any) => c.value === value
                      )}

                      onChange={(val: any) => { onChange(val.value) }}
                      isSearchable

                    />
                  )}
                />
              </div>
            </div>

            <div className="vehicle-form user-side-form">
              <h3>Global Admin Status</h3>
              <div className="form-group mb-0">
                <Controller
                  control={control}
                  name="globalAdminStatus"
                  render={({ field: { onChange, value, name, ref } }: any) => (
                    <Select
                      classNamePrefix="form-control-language"
                      options={globalAdminStatusList}
                      name="globalAdminStatus"
                      value={globalAdminStatusList?.filter(
                        (c: any) => c.value === value
                      )}

                      onChange={(val: any) => { onChange(val.value) }}
                      isSearchable

                    />
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

  );
}

export default UserInformation;

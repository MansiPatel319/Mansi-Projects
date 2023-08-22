import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import Select from 'react-select'
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';


// component
import Label from "../../../UI/Label"
import InputComponent from '../../../UI/Input'
import FeildErrorMessage from '../../../UI/FeildErrorMessage'
import Image from '../../../UI/Image'

// helper
import { doGetOrganizationDetails, doPostOrganizationDetails } from '../../../../Network/Core/ProfileModule/organization';
import { getLocalStorage } from '../../../../Network/ApiService';
import { constants } from '../../../../Library/Constants';
import citiesData from "../../../../StaticData/ProfileModule/countries.json"

const Details = () => {
  const cities:any = citiesData
  const project =  getLocalStorage(constants.PROJECT)

  const [logo, setLogo] = useState('')
  const [logoImage, setLogoImage] = useState<any>()
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate()
  const { t } = useTranslation()
  const orgRole = getLocalStorage(constants.USER)?.organizationRole?.name;

  const {
    register, // this use for evnets and value
    handleSubmit, // this is form submit handle
    setError,
    setValue,
    getValues,
    clearErrors,
    control,
    formState: { errors },
  } = useForm();
  
  const onChangeInput = (e: any) => {
    const { name, value } = e.target;
    if (value === "") {
      switch (name) {
        case "organizatonName":
          setError(name, {
            type: "required",
            message: t("organization.error_organizaton_name_required"),
          });
          break;
        case "organizationAddress1":
          setError(name, {
            type: "required",
            message: t("organization.error_organization_address1_required"),
          });
          break;
        case "organizationTown":
          setError(name, {
            type: "required",
            message: t("organization.error_organizationTown_required"),
          });
          break;
        case "organizationZip":
          setError(name, {
            type: "required",
            message: t("organization.error_organizationZip_required"),
          });
          break;
        default:
          break;
      }
    } else {
      switch (name) {
        case "organizationLogo":
          const file = e.target.files;
          if (file === "") {
            clearErrors(name);
          }
          else if (!file[0].type.match('image.*')) {

            setError("organizationLogo", {
              type: "required",
              message: t("organization.error_organizationLogo_invalid"),
            });
            return;
          }
          else {
            setLogo(file.name)
            setLogoImage('')
          }
          // setValue("organizationLogo",getValues("organizationLogo")[0])
          // console.log('getValues :>> ', getValues);
          break;
        default:
          break;
      }

      clearErrors(name);
    }
  };
  const setOrganizationDetail = (data: any) => {
    setValue("organizatonName", data.name)
    setValue("organizationAddress1", data.address1)
    setValue("organizationAddress2", data.address2)
    setValue("organizationTown", data.city)
    cities.map((item: any) => {
      if (item.label === data.country) {
        setValue("country", item)

      }
      return item
    })
    setValue("organizationZip", data.postcode)
    setValue("organizationId", data.id)
    // setValue("organizationLogo",data.logoOrganization)
    setLogoImage(data.logoOrganization)

  }
  const getOrganizationDetails = async () => {
    try {
      setIsLoading(true)
      const res = await doGetOrganizationDetails(project.ref);
      const { status, data } = res;
      switch (status) {
        case 200:
          setOrganizationDetail(data)
          setIsLoading(false)
          break;
        case 400:
          setIsLoading(false)
          break;
        case 403:
          if (data.detail === "ERR_login_again_token_expired") {
            navigate('/login')
            toast.error(t("chooseProject.error_login_again"));
            localStorage.clear()
          }
          setIsLoading(false)
          break;
        default:
          setIsLoading(false)
          break;
      }
    } catch (err) {
      setIsLoading(false)
      toast.error(t("chooseProject.error_something_went_wrong"));
    }
  }
  const updateOrganizationDetails = async (data: any) => {
    const formData = new FormData()
    formData.append("name", data.organizatonName)
    formData.append("address1", data.organizationAddress1)
    formData.append("address2", data.organizationAddress2)
    formData.append("postcode", data.organizationZip)
    formData.append("city", data.organizationTown)
    formData.append("country", data.country.label)
    if (data.organizationLogo[0] !== undefined) {
      formData.append("logo_organization", data.organizationLogo[0])
    }
    try {
      setIsLoading(true)
      const res = await doPostOrganizationDetails(project.ref, formData,data.organizationId);
      const { status } = res;
      switch (status) {
        case 200:
          toast.success(t("oranization detail submited"));
          getOrganizationDetails()
          setIsLoading(false)
          break;
        case 400:
          setIsLoading(false)
          break;
        case 403:
          if (res.data.detail === "ERR_login_again_token_expired") {
            navigate('/login')
            toast.error(t("chooseProject.error_login_again"));
            localStorage.clear()
          }
          setIsLoading(false)
          break;
        default:
          setIsLoading(false)
          break;
      }
    } catch (err) {
      setIsLoading(false)
      toast.error(t("chooseProject.error_something_went_wrong"));
    }
  }
  useEffect(() => {
    getOrganizationDetails();
   
  }, []);
  return (
    <div className="tab-pane fade show active" id="nav-details" role="tabpanel" aria-labelledby="nav-details-tab">
    <form className="form-root"
      onSubmit={handleSubmit(updateOrganizationDetails)}>
      <div className="row">
        <div className="col-xl-6 col-lg-6 col-md-12">
          <div className="vehicle-form">
            <h3>Organisation Details</h3>
            <div className="form-group">
              <Label label="Organisation Name" />
              <InputComponent
                inputType="text"
                inputName="organizatonName"
                className={errors['organizatonName'] ? "form-control error" :"form-control"}                  
                register={register}
                rules={{
                  required: {
                    value: true,
                    message: `${t("organization.error_organizaton_name_required")}`,
                  },
                  onChange: (e: any) => onChangeInput(e),
                }}
                  id="organizatonName"
                  disabled={orgRole!=='admin'}
              />
              <FeildErrorMessage
                errors={errors}
                name="organizatonName"
                containerClass="w-100"
              />
            </div>
            <div className="form-group">
              <Label label="Address Line 1" />
              <InputComponent
                inputType="text"
                inputName="organizationAddress1"
                className={errors['organizationAddress1'] ? "form-control error" :"form-control"}          
                register={register}
                rules={{
                  required: {
                    value: true,
                    message: `${t("organization.error_organization_address1_required")}`,
                  },
                  onChange: (e: any) => onChangeInput(e),
                }}
                  id="organizationAddress1"
                  disabled={orgRole!=='admin'}
                  
              />
              <FeildErrorMessage
                errors={errors}
                name="organizationAddress1"
                containerClass="w-100"
              />
            </div>
            <div className="form-group">
              <Label label="Address Line 2" />
              <InputComponent
                inputType="text"
                className={errors['organizationAddress2'] ? "form-control error" :"form-control"}          
                inputName="organizationAddress2"
                register={register}
                rules={{
                  // required: {
                  //   value: true,
                  //   message: `${t("organization.error_organization_address2_required")}`,
                  // },
                  onChange: (e: any) => onChangeInput(e),
                }}
                  id="organizationAddress2"
                  disabled={orgRole!=='admin'}
                  
              />
              <FeildErrorMessage
                errors={errors}
                name="organizationAddress2"
                containerClass="w-100"
              />
            </div>
            <div className="form-group">
              <Label label="Town/City" />
              <InputComponent
                inputType="text"
                className={errors['organizationTown'] ? "form-control error" :"form-control"}          
                inputName="organizationTown"
                register={register}
                rules={{
                  required: {
                    value: true,
                    message: `${t("organization.error_organizationTown_required")}`,
                  },
                  onChange: (e: any) => onChangeInput(e),
                }}
                  id="organizationTown"
                  disabled={orgRole!=='admin'}
                  
              />
              <FeildErrorMessage
                errors={errors}
                name="organizationTown"
                containerClass="w-100"
              />
            </div>
            <div className="form-group">
              <Label label="Zipcode" />
              <InputComponent
                inputType="text"
                className={errors['organizationZip'] ? "form-control error" :"form-control"}          
                inputName="organizationZip"
                register={register}
                rules={{
                  required: {
                    value: true,
                    message: `${t("organization.error_organizationZip_required")}`,
                  },
                  onChange: (e: any) => onChangeInput(e),
                }}
                  id="organizationZip"
                  disabled={orgRole!=='admin'}
                  
              />
              <FeildErrorMessage
                errors={errors}
                name="organizationZip"
                containerClass="w-100"
              />

            </div>
            <div className="form-group">
              <label>Country</label>
              <Controller
                control={control}
                name="country"
                rules={{
                  required: {
                    value: true,
                    message: `${t("organization.error_country_required")}`,
                  },
                }}
                render={({ field: { onChange, value } }: any) => (
                  <Select
                    // inputRef={ref}
                    classNamePrefix={errors['country'] ? "error form-control-language" :"form-control-language"}
                    options={cities}
                    id="country"
                    placeholder="Select Country"
                    name="country"
                    value={cities.find((c: any) => c.value === value?.value)}
                    onChange={(val: any) => onChange(val)}
                    isDisabled={orgRole!=='admin'}

                  />
                )}
              />
              <FeildErrorMessage
                errors={errors}
                name="country"
                containerClass="w-100"
              />
            </div>
          </div>
        </div>
        <div className="col-xl-6 col-lg-6 col-md-12">
          <div className="vehicle-form">
            <h3>Organisation Logo</h3>
            <div className="form-group">
              <Label label="Upload Logo" />
                <label>{logo}</label>
                <Image
                  value={getValues("organizationLogo") && getValues("organizationLogo").length &&  window.URL?.createObjectURL(getValues("organizationLogo")[0])}
                  logoImage={logoImage}
                  register={register}
                  inputName="organizationLogo"
                  id="organizationLogo"
                  error={errors['organizationLogo']}
                  rules={{
                    // required: {
                    //   value: true,
                    //   message: `${t("siteDetail.error_siteadd_required")}`,
                    // },
                    onChange: (e: any) => onChangeInput(e),
                  }}
                  disabled={orgRole!=='admin'}
                  
                />
                <FeildErrorMessage
                    errors={errors}
                    name="organizationLogo"
                    containerClass="w-100"
                />
            </div>
          </div>
        </div>
        </div>
        {orgRole === 'admin' &&
        
          <div className="form-save-btn">
            <button type="submit" id="btn-submit" className="theme-btn btn-update-org" >Save</button>
          </div>}
    </form>
  </div>

  );
}

export default Details;

import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Select from "react-select";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
// component
import Button from "../../../UI/Button";
import Input from "../../../UI/Input";
import Image from "../../../UI/Image";
import FeildErrorMessage from "../../../UI/FeildErrorMessage";
import Label from "../../../UI/Label";
import citiesData from "../../../../StaticData/OrganizationDetail/countries.json";
import { AddOrganizationInformation, getOrganizationdetail } from "../../../../Network/Core/Organization/OrganizationInfo";

function OrganizationInfo() {
  const [orgDetail, setOrgDetail] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  const [logoImage, setLogoImage] = useState<any>();
  const [imageFileLogo, setImageFileLogo] = useState<any>();
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { region } = useParams();
  const cities: any = citiesData;
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

  const onChange = (e: any) => {
    const { name, value } = e.target;
    switch (name) {
      case "organizationName":
        if (value === "") {
          setError(name, {
            type: "required",
            message: "Organization Name is required",
          });
        } else {
          clearErrors(name);
        }
        break;
      case "AddressLine1":
        if (value === "") {
          setError(name, {
            type: "required",
            message: "Address is required",
          });
        } else {
          clearErrors(name);
        }
        break;
      case "towncity":
        if (value === "") {
          setError(name, {
            type: "required",
            message: "Town/City is requires",
          });
        } else {
          clearErrors(name);
        }
        break;

      default:
        break;
    }
  };
  const onChangeImage = (e: any) => {
    const file = e.target.files[0];

    setLogoImage(file);
   
  };
 const onDeleteImage = (name: any) => {

    setLogoImage("");
  };
  const onSubmit = async (userData: any) => {

    setIsLoading(true);
    try {
        const formData = new FormData()
        formData.append("name", userData.organizationName)
        formData.append("address1", userData.AddressLine1)
        formData.append("address2", userData.AddressLine2)
        formData.append("city", userData.towncity)
      formData.append("country", userData.country.label)
        if (logoImage !== undefined && logoImage !== null && typeof logoImage === "object") {
        
          formData.append("logo_organization", logoImage)
        }
      const res = await AddOrganizationInformation(
        formData,
        region,
        id
      );

      const { status, data } = res;
      switch (status) {
        case 200:
          setIsLoading(false);
          getOrganizationDetail(data.id);
          toast.success("Save Detail Successfully");

          break;
        case 400:
          setIsLoading(false);

          break;
        case 403:
          if (data.detail === "ERR_login_again_token_expired") {
            toast.error("Login Again");
            localStorage.clear()
            navigate('/login')
          }
          setIsLoading(false);
          break
        default:
          setIsLoading(false);
          break;
      }
    } catch (err) {

      setIsLoading(false);
    
    }
  
  };
  
  const getOrganizationDetail = async (id: any) => {
    try {
      setIsLoading(true);
      const res = await getOrganizationdetail(id, region);
      const { status, data, statusText } = res;
      switch (status) {
        case 200:
        ;
          setIsLoading(false);
          setOrgDetail(data);
        
        setValue("organizationName",data.name);
        setValue("AddressLine1",data.address1);
        setValue("AddressLine2",data.address2);
        setValue("towncity",data.city);
        cities.map((item: any) => {
            if (item.label === data.country) {
              setValue("country", item)
      
            }
            return item
          })
          setLogoImage(data.logoOrganization);
        // setValue("organizationLogo",data.logoOrganization);
          break;
        case 400:
          setIsLoading(false);

          break;
        case 403:
          if (data.detail === "ERR_login_again_token_expired") {
            navigate("/login");
            toast.error("login again");
            localStorage.clear();
          }

          setIsLoading(false);
          break;
        case 404:
          navigate("/login");
          setIsLoading(false);

          break;
        default:
          setIsLoading(false);

          break;
      }
    } catch (err) {
      // setIsLoading(false);
      // dispatch(setLoader(false))
      console.log("err :>> ", err);
      // toast.error("error something went wrong");
    }
  };
  //
  useEffect(() => {
    getOrganizationDetail(id);
  }, []);

  return (
    <div
      className="tab-pane fade show active"
      id="nav-user-info"
      role="tabpanel"
      aria-labelledby="nav-user-info-tab">
      <div className="row">
        <div className="col-xl-6 col-lg-6 col-md-12">
          <div className="vehicle-form glob-form pd-form">
            <h3 className="org_detail">Organization Details</h3>
            <div className="cust-projset-box">
              <div className="personal-detail-form">
                <div className="form-group">
                  <label>Organization Name</label>
                  <Input
                    inputName="organizationName"
                    className={
                      errors["organizationName"]
                        ? "form-control error"
                        : "form-control"
                    }
                    register={register}
                    rules={{
                      required: {
                        value: true,
                        message: "Organization Name is required",
                      },
                      onChange: (e: any) => onChange(e),
                    }}
                    id="organizationName"
                    inputType="text"
                  />
                  <FeildErrorMessage
                    errors={errors}
                    name="organizationName"
                    containerClass="w-100"
                  />
                </div>
                <div className="form-group">
                  <label>Address Line1</label>
                  <Input
                    inputName="AddressLine1"
                    className={
                      errors["AddressLine1"]
                        ? "form-control error"
                        : "form-control"
                    }
                    register={register}
                    rules={{
                      required: {
                        value: true,
                        message: "Address is required",
                      },
                      onChange: (e: any) => onChange(e),
                    }}
                    id="AddressLine1"
                    inputType="text"
                  />
                  <FeildErrorMessage
                    errors={errors}
                    name="AddressLine1"
                    containerClass="w-100"
                  />
                </div>
                <div className="form-group">
                  <label>Address Line2</label>
                  <Input
                    inputName="AddressLine2"
                    className={
                      errors["AddressLine2"]
                        ? "form-control error"
                        : "form-control"
                    }
                    register={register}
                    id="AddressLine2"
                    inputType="text"
                  />
                  <FeildErrorMessage
                    errors={errors}
                    name="AddressLine2"
                    containerClass="w-100"
                  />
                </div>
                <div className="form-group">
                  <label>Town/City</label>
                  <Input
                    inputName="towncity"
                    className={
                      errors["town/city"]
                        ? "form-control error"
                        : "form-control"
                    }
                    register={register}
                    rules={{
                      required: {
                        value: true,
                        message: "City/Town is required",
                      },
                      onChange: (e: any) => onChange(e),
                    }}
                    id="towncity"
                    inputType="text"
                  />
                  <FeildErrorMessage
                    errors={errors}
                    name="towncity"
                    containerClass="w-100"
                  />
                </div>
                <div className="form-group mb-0">
                  <label>Country</label>
                  <Controller
                    control={control}
                    name="country"
                    rules={{
                      required: {
                        value: true,
                        message: `Country is required`,
                      },
                    }}
                    render={({ field: { onChange, value } }: any) => (
                      <Select
                        // inputRef={ref}
                        classNamePrefix={
                          errors["country"]
                            ? "error form-control-language"
                            : "form-control-language"
                        }
                        options={cities}
                        id="country"
                        placeholder="Select Country"
                        name="country"
                        value={cities.find(
                          (c: any) => c.value === value?.value
                        )}
                        onChange={(val: any) => onChange(val)}
                        // isDisabled={orgRole!=='admin'}
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
          </div>
          <div className="col-md-12">
                <div className="form-save-btn common-savebtn">
                  <Button
                    buttonLabel="Save Details"
                    handleClick={handleSubmit(onSubmit)}
                    disabled={isLoading}
                    className="theme-btn save-accountdetail"
                  />
                </div>
          </div>
        </div>
        <div className="col-xl-6 col-lg-6 col-md-12">
          <div className="vehicle-form ">
            <h3>Organization Logo</h3>
            <Image
                  logoImage={logoImage}
                  inputName="organizationLogo"
                  id="organizationLogo"
                  rules={{}}
                  disabled={false}
                  // value={projectDetail?.logoImage}
                  handleUploadImage={onChangeImage}
                  handleDeleteImage={onDeleteImage}
                  
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
  );
}

export default OrganizationInfo;

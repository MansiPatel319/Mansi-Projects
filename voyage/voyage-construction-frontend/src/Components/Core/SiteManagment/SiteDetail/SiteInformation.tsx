import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Select from 'react-select';

// component
import FeildErrorMessage from "../../../UI/FeildErrorMessage";
// import CommonErrorMessage from "../../../UI/CommonErrorMessage";
import Label from "../../../UI/Label";
import Image from "../../../UI/Image";
import Button from "../../../UI/Button";
import Input from "../../../UI/Input";
import MyMapComponent from "./MapComponent";

// images
import images from "../../../../Assets/images";

// redux

// API
import {
  addContact,
  addPrijectDetail,
  editContact,
  getAddContactList,
  getdataASiteList,
  getSiteDetailData,
  removeContact,
} from "../../../../Network/Core/SiteManagement/siteDetails";

// helper
import { validatePhoneNumber } from "../../../../Library/Utils";
import { getLocalStorage } from "../../../../Network/ApiService";
import { constants } from "../../../../Library/Constants";
import siteDetail from "../../../../Language/en/siteManagment/siteDetail";

// css

const SiteInformation = () => {
  const [logoImage, setLogoImage] = useState<any>();
  const [bannerImage, setBannerImage] = useState<any>();
  const [apiResponseErr, setApiResponseErr] = useState<string>("");
  const [contactItems, setContactItems] = useState<any>([]);
  const [homescreenMessage, sethomescreenMessage] = useState<any>("");
  const [isOpenAddModel, setisOpenAddModel] = useState(false);
  const [siteListing,setSiteListing] = useState<any>([]);
  const [siteId,setSiteId] = useState();
  const [latitude, setLatitude] = useState([]);
  const [longitude, setLongitude] = useState([]);
  const project = getLocalStorage(constants.PROJECT);
  const [data, setData] = useState<any>({
    lat: 23.022505,
    lng: 72.5713621,
  });
  const navigate = useNavigate()
  const projectRole = getLocalStorage(constants.USER)?.projectRole;

  // const []
  const { t } = useTranslation();
  const {
    register, // this use for evnets and value
    setValue, // this use for value set their feild
    handleSubmit, // this is form submit handle
    setError,
    clearErrors,
    getValues,
    control,
    formState: { errors }, // error like required,validate, etc..
  } = useForm();

  const {
    register: register2,
    setValue: setValue2,
    setError: setError2,
    clearErrors: clearErrors2,
    formState: { errors: errors2 },
    handleSubmit: handleSubmit2,
  } = useForm();
  const onChangeInput = (e: any) => {
    const { name, value } = e.target;
    if (value === "") {
      switch (name) {
        case "siteName":
          setError(name, {
            type: "required",
            message: t("siteDetail.error_sitename_required"),
          });
          break;
        case "siteAddress":
          setError(name, {
            type: "required",
            message: t("siteDetail.error_siteadd_required"),
          });
          break;

        default:
          break;
      }
    } else {
      switch (name) {
        case "siteLogo":
          const file = e.target.files;
          if (file === "") {
            clearErrors(name);
          } else if (!file[0].type.match("image.*")) {
            setError("siteLogo", {
              type: "required",
              message: t("siteDetail.error_image_invalid"),
            });
            setValue("siteLogo", "");
            return;
          } else {
            // setLogo(file.name)
            setLogoImage(undefined);
            clearErrors(name);
          }
          break;
        case "homeBannerImage":
          const fileBanne = e.target.files;
          if (fileBanne === "") {
            clearErrors(name);
          } else if (!fileBanne[0].type.match("image.*")) {
            setError("siteLogo", {
              type: "required",
              message: t("siteDetail.error_image_invalid"),
            });
            setValue("homeBannerImage", "");
            return;
          } else {
            setBannerImage(undefined);
            clearErrors(name);
          }
          break;
        default:
          break;
      }

      clearErrors(name);
    }
  };
  const onChangeText = (e: any) => {
    if (e === "") {
      // setError("homeScreenMessage", {
      //   type: "required",
      //   message: t("siteDetail.error_homemessage_required"),
      // });
    } else {
      setValue("homeScreenMessage",e)
      sethomescreenMessage(e);
      clearErrors("homeScreenMessage");
    }
  };
  const onChange = (e: any) => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        if (value === "") {
          setError2(name, {
            type: "required",
            message: t("siteDetail.error_name_required"),
          });
        } else {
          clearErrors2(name);
        }
        break;
      case "position":
        if (value === "") {
          setError2(name, {
            type: "required",
            message: t("siteDetail.error_position_required"),
          });
        } else {
          clearErrors2(name);
        }
        break;
      case "phone":
      if (!validatePhoneNumber(value)) {
          setError2(name, {
            type: "validate",
            message: t("siteDetail.error_valid_phonenumber"),
          });
        } else {
          clearErrors2(name);
        }
        break;
      default:
        break;
    }
  };
  // const updateSiteDetails = async (data: any) => {
  //   console.log("data :>> ", data);
  // };
  const getAddcontact = async (ref: any) => {
    try {
      const res = await getAddContactList(ref,siteId, true);
      const { status, data } = res;
      switch (status) {
        case 200:
          setContactItems(data.results);

          break;
        case 400:
          break;
        case 403:
            if (data.detail === "ERR_login_again_token_expired") {
              toast.error(t("userManagment.error_login_again"));
              localStorage.clear()
              navigate('/login')
            }
           
            break
        default:
          break;
      }
    } catch (err) {
      toast.error(t("userManagment.error_something_went_wrong"));
    }
  };
  const handleEditContactItem = async (userData: any, i: number, id: any) => {
    try {
      const res = await editContact(
        {
          name: userData[`name:${i}`],
          position: userData[`position:${i}`],
          phone: userData[`phone:${i}`],
        },
        project.ref,
        id,
        siteId
      );
      const { status, data, statusText } = res;
      switch (status) {
        case 200:
          toast.success("Successfully Edit Contact");
          const tempItem: Array<any> = [...contactItems];
          tempItem[i].isOpen = false;
          getAddcontact(project.ref);
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
           
            break
        default:
          setApiResponseErr(statusText);
          break;
      }
    } catch (err) {
      toast.error(t("userManagment.error_something_went_wrong"));

    }
  };
  const handleAddClick = (status: any) => {
    setValue2("name", "");
    setValue2("position", "");
    setValue2("phone", "");
    setisOpenAddModel(status);
  };
  const handleAddContactItem = async (userData: any) => {
    try {
      const res = await addContact(
        {
          name: userData.name,
          position: userData.position,
          phone: userData.phone,
        },
        project.ref,
        siteId,
        true
      );
      const { status, data, statusText } = res;
      switch (status) {
        case 201:
          toast.success("Successfully Add Contact");
          setisOpenAddModel(false);
          getAddcontact(project.ref);
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
           
            break
        default:
          setApiResponseErr(statusText);
          break;
      }
    } catch (err) {
      toast.error(t("userManagment.error_something_went_wrong"));
    }
  };
  const handleEditClick = (status: boolean, i: number) => {
    const tempItem: Array<any> = [...contactItems];
    tempItem[i].isOpen = status;
    setContactItems([...tempItem]);
    setValue2(`name:${i}`, contactItems[i].name);
    setValue2(`position:${i}`, contactItems[i].position);
    setValue2(`phone:${i}`, contactItems[i].phone);
  };

  const handleRemoveContactItem = async (i: number, id: any) => {
    try {
      const res = await removeContact(project.ref,siteId, id);
      const { status, data, statusText } = res;
      switch (status) {
        case 204:
          toast.success("Successfully Delete Contact");
          const tempItem: Array<any> = [...contactItems];
          tempItem[i].isOpen = false;
          getAddcontact(project.ref);
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
           
            break
        default:
          setApiResponseErr(statusText);
          break;
      }
    } catch (err) {
      toast.error(t("userManagment.error_something_went_wrong"));

    }
  };
  const getMap = async () => {
    const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
    const address = getValues("siteAddress");
    if (address)
    {
      
      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&libraries=places&key=${apiKey}`;
      await axios
        .get(`${url}`)
        .then((data: any) => {
          const latitude = data?.data?.results[0]?.geometry?.location?.lat;
          const longitude = data?.data?.results[0]?.geometry?.location?.lng;
          setLatitude(latitude);
          setLongitude(longitude);
        })
        .catch((error) => {
          console.log(error);
        });
      }
  };
  const onBlurAddress = () => {
    getMap();
  };
  useEffect(() => {
    setData({
      lat: latitude,
      lng: longitude,
    });
    
    onBlurAddress()
  }, [latitude, longitude]);
  
  const getSiteDetails = async (ref: any) => {
    try {
      const res = await getSiteDetailData(ref);
      const { status, data } = res;
      switch (status) {
        case 200:
          setValue("siteName", data.name);
          setValue("siteAddress", data.address);
          onBlurAddress()
          setLogoImage(data.logoImage);
          // setValue("siteLogo", data.logoImage);
          setBannerImage(data.bannerImage);
          // setValue("homeBannerImage", data.bannerImage);
          setValue("homeScreenMessage", data.message);
          break;
        case 400:
          break;
        case 403:
            if (data.detail === "ERR_login_again_token_expired") {
              toast.error(t("userManagment.error_login_again"));
              localStorage.clear()
              navigate('/login')
            }
           
            break
        default:
          break;
      }
    } catch (err) {
      toast.error(t("userManagment.error_something_went_wrong"));
    }
  };
  const onSubmit = async (userData: any) => {
    const formdata = new FormData();
    formdata.append("name", userData.siteName);
    formdata.append("address", userData.siteAddress);
    if (userData.siteLogo[0]) {

      formdata.append("logo_image", userData.siteLogo[0]);
    }
    if (userData.homeBannerImage[0]) {

      formdata.append("banner_image", userData.homeBannerImage[0]);
    }
    formdata.append("message", homescreenMessage);
    try {
      const res = await addPrijectDetail(formdata, project.ref);

      const { status } = res;
      switch (status) {
        case 200:
          getSiteDetails(project.ref);
          toast.success("Save Detail Successfully");
          break;
        case 400:
          break;
        case 403:
            if (data.detail === "ERR_login_again_token_expired") {
              toast.error(t("userManagment.error_login_again"));
              localStorage.clear()
              navigate('/login')
            }
           
            break
        default:
          break;
      }
    } catch (err) {
      toast.error(t("userManagment.error_something_went_wrong"));
    }
  };

  const getSiteList = async () => {
    try {
      const res = await getdataASiteList(project.ref, true);
      const { status, data, statusText } = res;
      switch (status) {
        case 200:
          var Array: { label: any; value: any; }[]=[];
          data.results.map((item:any)=>{
            let tempdata={
              label:item.name,
              value:item.id
            }
            Array.push(tempdata);
          })
          setSiteListing(Array);
         
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

            break
        default:
          setApiResponseErr(statusText);
          break;
      }
    } catch (err) {
      toast.error("Somthing went wrong");
    }
  };
  
const replaceImgText=(html:any)=> {
  let imgTemp: Array<any> = []
  if (html !== undefined)
  {
    
     var ret = html.replace(/<img[^>]*src="(http(s?):)|([/|.|\w|\s])"/gi,function (img:any) {
      imgTemp.push(img)
      return '';
    });

    let startIndex = html.indexOf(imgTemp[0])
    let endIndex = html.indexOf(imgTemp[1])
    ret = ret.substring(0,startIndex)+ret.substring(endIndex,ret.length)
 
    return ret;
  }
   return ""
  }
  const handleGoClickevent =()=>{
  
    if(!siteId){
    setError('site',{
    type: "required",
    message: "Please Select site"
    }
    )
    }
    else{
      getAddcontact(project.ref);
    }
    }
    const onChangeSite =(val:any)=>{
      setContactItems([]);
      clearErrors('site');
      setSiteId(val);
    }

  useEffect(() => {
    getSiteDetails(project.ref);
    getSiteList();
  }, []);
  return (
    <div
      className="tab-pane fade show active"
      id="nav-site-information"
      role="tabpanel"
      aria-labelledby="nav-site-information-tab">
      <form className="form-root">
        <div className="row">
          <div className="col-xl-4 col-lg-6 col-md-12">
            <div className="vehicle-form">
              <h3>{t("siteDetail.details_heading_text")}</h3>
              <div className="form-group">
                <Label label={t("siteDetail.label_sitename")} />

                <Input
                  inputType="text"
                  className={errors['siteName'] ? "form-control error" :"form-control"}          
                  inputName="siteName"
                  register={register}
                  rules={{
                    required: {
                      value: true,
                      message: `${t("siteDetail.error_sitename_required")}`,
                    },
                    onChange: (e: any) => onChangeInput(e),
                  }}
                  id="siteName"
                  disabled={projectRole === constants.PROJECT_USER || projectRole === constants.PROJECT_MANAGER}
                />
                <FeildErrorMessage
                  errors={errors}
                  name="siteName"
                  containerClass="w-100"
                />
              </div>
              <div className="form-group">
                <Label label={t("siteDetail.label_siteadd")} />

                <Input
                  inputType="text"
                  className={errors['siteAddress'] ? "form-control error" :"form-control"}          
                  inputName="siteAddress"
                  register={register}
                  rules={{
                    required: {
                      value: true,
                      message: `${t("siteDetail.error_siteadd_required")}`,
                    },
                    onChange: (e: any) => onChangeInput(e),
                    onBlur: () => onBlurAddress(),
                  }}
                  id="siteAddress"
                  disabled={projectRole === constants.PROJECT_USER || projectRole === constants.PROJECT_MANAGER}
                />
                <FeildErrorMessage
                  errors={errors}
                  name="siteAddress"
                  containerClass="w-100"
                />
              </div>

              <div className="map-box">
              {getValues("siteAddress") && (
                <MyMapComponent latitude={latitude} longitude={longitude} />
                )}
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-6 col-md-12">
            <div className="vehicle-form">
              <h3>{t("siteDetail.details_image_text")}</h3>

              <div className="form-group">
                <Label label={t("siteDetail.label_logo")} />
                <Image
                  value={getValues("siteLogo") && Object.keys(getValues("siteLogo")).length > 0 && window.URL?.createObjectURL(getValues("siteLogo")[0])}
                  logoImage={logoImage}
                  register={register}
                  inputName="siteLogo"
                  error={errors['siteLogo']}
                  id="siteLogo"
                  rules={{
                    // required: {
                    //   value: true,
                    //   message: `${t("siteDetail.error_siteLogo_required")}`,
                    // },
                    onChange: (e: any) => onChangeInput(e),
                  }}
                  disabled={projectRole === constants.PROJECT_USER || projectRole === constants.PROJECT_MANAGER}
                />

                <FeildErrorMessage
                  errors={errors}
                  name="siteLogo"
                  containerClass="w-100"
                />
              </div>
              <div className="form-group">
                <Label label={t("siteDetail.label_home_banner")} />
                <Image
                  value={getValues("homeBannerImage") && Object.keys(getValues("homeBannerImage")).length > 0 && window.URL?.createObjectURL(getValues("homeBannerImage")[0])}
                  logoImage={bannerImage}
                  register={register}
                  inputName="homeBannerImage"
                  id="homeBannerImage"
                  error={errors['homeBannerImage']}
                  rules={{
                    // required: {
                    //   value: true,
                    //   message: `${t("siteDetail.error_homebanner_required")}`,
                    // },
                    onChange: (e: any) => onChangeInput(e),
                  }}
                  disabled={projectRole === constants.PROJECT_USER || projectRole === constants.PROJECT_MANAGER}

                />

                <FeildErrorMessage
                  errors={errors}
                  name="homeBannerImage"
                  containerClass="w-100"
                />
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-12 col-md-12">
          <div className="vehicle-form contact-list">
        <div className="row">
                  <div className="col-sm-8">
                    <div className="form-group">
                      <label>Select Site</label>
                      <Controller
                        control={control}
                        name="site"
                        
                        render={({ field: { onChange, value } }: any) => (
                          <Select
                            // inputRef={ref}
                            classNamePrefix={
                              errors["calenderDay"]
                                ? "error form-control-language"
                                : "form-control-language"
                            }
                            // defaultValue={selectedcalenderDaysList[0].value}
                            options={siteListing}
                            id="site"
                            name="site"
                            value={siteListing?.find(
                              (c: any) => c.value === value?.value
                            )}
                            onChange={(val: any) => onChangeSite(val.value)}
                          />
                        )}
                      />
                      <FeildErrorMessage
                        errors={errors}
                        name="site"
                        containerClass="w-100"
                      />
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="form-group">
                    
                    <Button
                    buttonLabel="GO"
                    handleClick={() => handleGoClickevent()}
                    className="btn theme-btn custom_go"
                  />
                    </div>
                  </div>
                </div>
       
                <div className="vehicle-form contact-list">
              <div className="vh-form-header">
                <h3>{t("siteDetail.contact_heading_text")}</h3>
                {(projectRole === constants.PROJECT_OWNER || projectRole === constants.PROJECT_ADMIN) && (

                  <Link
                    to="#"
                    id="add-contact-btn"
                    onClick={() => handleAddClick(true)}>
                    <img src={images.plusTheme} alt="add-icon" />
                  </Link>
                )}
              </div>
              {isOpenAddModel && (
                <div
                  className="vehicle-form"
                  id="add-contact-form"
                  style={{ display: "block" }}>
                  <h3>{t("siteDetail.add_contact")}</h3>

                  <div className="form-group">
                    <label>{t("siteDetail.label_name")}</label>
                    <Input
                      inputName="name"
                      className={errors2['name'] ? "form-control error" :"form-control"}          
                      register={register2}
                      rules={{
                        required: {
                          value: true,
                          message: t("siteDetail.error_name_required"),
                        },

                        onChange: (e: any) => onChange(e),
                      }}
                      id="contact_add_name"
                      inputType="text"
                      disabled={projectRole === constants.PROJECT_USER || projectRole === constants.PROJECT_MANAGER}
                    />
                    <FeildErrorMessage
                      errors={errors2}
                      name="name"
                      containerClass="w-100"
                    />
                  </div>
                  <div className="form-group">
                    <label>{t("siteDetail.label_position")}</label>
                    <Input
                      inputName="position"
                      className={errors2['position'] ? "form-control error" :"form-control"}          
                      register={register2}
                      rules={{
                        required: {
                          value: true,
                          message: t("siteDetail.error_position_required"),
                        },

                        onChange: (e: any) => onChange(e),
                      }}
                      id="contact_add_position"
                      inputType="text"
                      disabled={projectRole === constants.PROJECT_USER || projectRole === constants.PROJECT_MANAGER}
                    />
                    <FeildErrorMessage
                      errors={errors2}
                      name="position"
                      containerClass="w-100"
                    />
                  </div>
                  <div className="form-group">
                    <label>{t("siteDetail.label_phone")}</label>
                    <Input
                      inputName="phone"
                      className={errors2['phone'] ? "form-control error" :"form-control"}          
                      register={register2}
                      rules={{
                        // required: {
                        //   value: true,
                        //   message: t('siteDetail.error_position_required'),
                        // },
                        validate: (value: string) => {
                          if(value != ''){
                            return (
                              validatePhoneNumber(value) 
                            );
                          }
                         
                        },

                        onChange: (e: any) => onChange(e),
                      }}
                      id="contact_add_phone"
                      inputType="text"
                      disabled={projectRole === constants.PROJECT_USER || projectRole === constants.PROJECT_MANAGER}
                    />
                    <FeildErrorMessage
                      errors={errors2}
                      name="phone"
                      containerClass="w-100"
                    />
                  </div>

                  <div className="contctform-btns">
                    <div className="cb-right">
                      <Button
                        buttonLabel="Cancel"
                        handleClick={() => handleAddClick(false)}
                        disabled={projectRole === constants.PROJECT_USER || projectRole === constants.PROJECT_MANAGER}
                        className="btn btn-link cancel-link edit-contact-cancel accesspoint-cancle"
                      />
                      <Button
                        buttonLabel={t("siteDetail.btn_add")}
                        disabled={projectRole === constants.PROJECT_USER || projectRole === constants.PROJECT_MANAGER}
                        handleClick={handleSubmit2(handleAddContactItem)}
                        className="btn theme-btn submit"
                      />
                    </div>
                    {/* <CommonErrorMessage
                      errMessage={apiResponseErr}
                      containerClass="w-100 profileSetup_error"
                    /> */}
                  </div>
                </div>
              )}
              {contactItems && contactItems.length>0 && contactItems.map((contactItem: any, index: number) => (
                <div className="contacts-list" key={contactItem}>
                  <div className="contact-item">
                    <div className="contact-item-header">
                      <p>{contactItem.name}</p>
                      <Link
                        className="edit-icon"
                        // href="#"
                        to="#"
                        onClick={() => handleEditClick(true, index)}>
                        <img src={images.edit} alt="edit" />
                      </Link>
                    </div>
                    {contactItem.isOpen && (
                      <div
                        className="vehicle-form edit-contact-form"
                        style={
                          contactItem.isOpen
                            ? { display: "block" }
                            : { display: "none" }
                        }>
                        <h3>{t("siteDetail.edit_contact")}</h3>

                        <div className="form-group">
                          <label>{t("siteDetail.label_name")}</label>
                          <Input
                            inputName={`name:${index}`}
                            className={errors2[`name:${index}`] ? "form-control error" :"form-control"}          
                            register={register2}
                            rules={{
                              required: {
                                value: true,
                                message: t("siteDetail.error_name_required"),
                              },

                              onChange: (e: any) => onChange(e),
                            }}
                            id="contact_edit_name"
                            inputType="text"
                            disabled={projectRole === constants.PROJECT_USER || projectRole === constants.PROJECT_MANAGER}
                          />
                          <FeildErrorMessage
                            errors={errors2}
                            name={`name:${index}`}
                            containerClass="w-100"
                          />
                        </div>
                        <div className="form-group">
                          <label>{t("siteDetail.label_position")}</label>
                          <Input
                            inputName={`position:${index}`}
                            className={errors2[`position:${index}`] ? "form-control error" :"form-control"}          
                            register={register2}
                            rules={{
                              required: {
                                value: true,
                                message: t(
                                  "siteDetail.error_position_required"
                                ),
                              },

                              onChange: (e: any) => onChange(e),
                            }}
                            id="contact_edit_position"
                            inputType="text"
                            disabled={projectRole === constants.PROJECT_USER || projectRole === constants.PROJECT_MANAGER}
                          />
                          <FeildErrorMessage
                            errors={errors2}
                            name={`position:${index}`}
                            containerClass="w-100"
                          />
                        </div>
                        <div className="form-group">
                          <label>{t("siteDetail.label_phone")}</label>
                          <Input
                            inputName={`phone:${index}`}
                            className={errors2[`phone:${index}`] ? "form-control error" :"form-control"}          
                            register={register2}
                            rules={{
                           
                              validate: (value: string) => {
                                if(value != ''){
                                  return (
                                    validatePhoneNumber(value) 
                                  );
                                }
                               
                              },

                              onChange: (e: any) => onChange(e),
                            }}
                            id="contact_edit_phone"
                            inputType="text"
                            disabled={projectRole === constants.PROJECT_USER || projectRole === constants.PROJECT_MANAGER}
                          />
                          <FeildErrorMessage
                            errors={errors2}
                            name={`phone:${index}`}
                            containerClass="w-100"
                          />
                        </div>

                        <div className="contctform-btns">
                          <div className="cb-left">
                            <Button
                              buttonLabel={t("siteDetail.btn_remove")}
                              className="btn btn-link remove-link"
                              handleClick={() =>
                                handleRemoveContactItem(index, contactItem.id)
                              }
                              disabled={projectRole === constants.PROJECT_USER || projectRole === constants.PROJECT_MANAGER}
                            />
                          </div>
                          <div className="cb-right">
                            <Button
                              disabled={projectRole === constants.PROJECT_USER || projectRole === constants.PROJECT_MANAGER}
                              buttonLabel="Cancel"
                              handleClick={() => handleEditClick(false, index)}
                              className="btn btn-link cancel-link edit-contact-cancel accesspoint-cancle"
                            />
                            <Button
                              disabled={projectRole === constants.PROJECT_USER || projectRole === constants.PROJECT_MANAGER}
                              buttonLabel={t("siteDetail.btn_edit")}
                              handleClick={handleSubmit2((data) =>
                                handleEditContactItem(
                                  data,
                                  index,
                                  contactItem.id
                                )
                              )}
                              className="btn theme-btn"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
       
        </div>

        
          </div>
        </div>
        <div className="home-screen-message">
          <h3 className="hcm-title">
            {t("siteDetail.label_home_screen_message")}
          </h3>
          <Controller
            control={control}
            name="homeScreenMessage"
            rules={
              {
                // required: {
                //   value: true,
                //   message: `${t("siteDetail.error_homemessage_required")}`,
                // },
              }
            }
            render={(filed) => {
              console.log('filed', filed);
              return (
                <CKEditor
                  {...filed}
                  editor={ClassicEditor}
                  config={ {
                    toolbar: [ 'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote','|', 'undo', 'redo','|','outdent', 'indent', ],
                  }}
                  onChange={(event: any, editor: any) => {
                    let data = editor.getData();
                    data = replaceImgText(data)
                    onChangeText(data);
                  }} 
                  inputName="homeScreenMessage"
                  data={filed?.field?.value===null ? "" : filed?.field?.value}
                  disabled={projectRole === constants.PROJECT_USER || projectRole === constants.PROJECT_MANAGER}
                />
              );
            }}
          />
          <FeildErrorMessage
            errors={errors}
            name="homeScreenMessage"
            containerClass="w-100"
          />
        </div>
        <div className="form-save-btn">

          {projectRole !== constants.PROJECT_USER && projectRole !== constants.PROJECT_MANAGER && (
            <Button
              buttonLabel="Save"
              handleClick={handleSubmit(onSubmit)}
              className="btn theme-btn btn-site-information-submit"
            // disabled={projectRole===constants.PROJECT_USER || projectRole===constants.PROJECT_MANAGER }
            />
          )}

        </div>
      </form>
    </div>
  );
};

export default SiteInformation;

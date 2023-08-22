
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import axios from "axios";
import { Controller,useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Select from "react-select";
// component
import MyMapComponent from "./MapComponent";
import Image from "../../../UI/Image";
import Input from "../../../UI/Input";
import Button from "../../../UI/Button";
import CommonErrorMessage from "../../../UI/CommonErrorMessage";
import FeildErrorMessage from "../../../UI/FeildErrorMessage";
import {
  getProjectDetail,
  removeContact,
  addContact,
  editContact,
  getAddContactList,
  updateProjectDetail,
  getdataASiteList,
} from "../../../../Network/Core/Project/ProjectInformation";

// images
import images from "../../../../Assets/images";
import { validatePhoneNumber } from "../../../../Library/Utils";
import { handleOpenEditProjectModal, setShortCodeAddress, setTimeZone } from "../../../../store/Actions/ProjectModule/projectActionCreators";

// css
import "../../../../Assets/css/style.css";
import "../../../../Assets/css/common.css";
import "../../../../Assets/css/booking-list.css";
import "../../../../Assets/css/booking-form.css";
import "../../../../Assets/css/site-management.css";
import "../../../../Assets/css/global-admin.css";
import "../../../../Assets/css/cutstmize.css";


const ProjectInformation = () => {
  const [projectDetail, setProjectDetail] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  const [latitude, setLatitude] = useState([]);
  const [longitude, setLongitude] = useState([]);
  const [siteId,setSiteId] = useState();
  const [selectSiteId,setSelectSiteId] = useState(false);
  const [siteListing,setSiteListing] = useState<any>([]);
  const [data, setData] = useState<any>({
    lat: 23.022505,
    lng: 72.5713621,
  });
  const isModelShow = useSelector(
    (state: any) => state.project.showFilterModal
  );
  const dispatch = useDispatch();
  const [apiResponseErr, setApiResponseErr] = useState<string>("");

  const [isOpenAddModel, setisOpenAddModel] = useState(false);
  const { t } = useTranslation();
  const [contactItems, setContactItems] = useState<any>([]);
  const [imageFileLogo, setImageFileLogo] = useState<any>();
  const [imageFileBanner, setImageFileBanner] = useState<any>();

  const navigate = useNavigate();
  const { ref } = useParams();
  const baseUrlForFrontend:any = process.env.REACT_APP_BASE_URL

  const {
    register: register2,
    setValue: setValue2,
    setError: setError2,
    control,
    clearErrors: clearErrors2,
    formState: { errors: errors2 },
    handleSubmit: handleSubmit2,
  } = useForm();
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
            localStorage.clear();
            navigate("/login");
          }

          break;
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
        ref,
        siteId,
        id
      );
      const { status, data } = res;
      switch (status) {
        case 200:
          toast.success("Successfully Edit Contact");
          const tempItem: Array<any> = [...contactItems];
          tempItem[i].isOpen = false;
          getAddcontact(ref);
          break;
        case 400:
          // setApiResponseErr(data);
          break;
        case 403:
          if (data.detail === "ERR_login_again_token_expired") {
            toast.error(t("userManagment.error_login_again"));
            localStorage.clear();
            navigate("/login");
          }

          break;
        default:
          // setApiResponseErr(statusText);
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
        siteId,
        ref,
        true
      );
      const { status, data, statusText } = res;
      switch (status) {
        case 201:
          toast.success("Successfully Add Contact");
          setisOpenAddModel(false);
          getAddcontact(ref);
          break;
        case 400:
          setApiResponseErr(data);
          break;
        case 403:
          if (data.detail === "ERR_login_again_token_expired") {
            toast.error(t("userManagment.error_login_again"));
            localStorage.clear();
            navigate("/login");
          }

          break;
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
  const handleSubmitImageDetail = async (imageData: any) => {

    try {
      const res: any = await updateProjectDetail(ref, imageData);
      const { status, statusText } = res;
      switch (status) {
        case 200:
          getProjectDetails(ref);
          toast.success("Successfully uploaded Image");
          break;
        case 400:
          setApiResponseErr(data);
          break;
        case 403:
          if (data.detail === "ERR_login_again_token_expired") {
            toast.error(t("userManagment.error_login_again"));
            localStorage.clear();
            navigate("/login");
          }

          break;
        default:
          setApiResponseErr(statusText);
          break;
      }
    } catch (err) {
      toast.error(t("userManagment.error_something_went_wrong"));
    }
  };
  const onChangeImage = (e: any) => {
    const file = e.target.files[0];
    const formdata = new FormData();
    if (e.target.name === "projectLogo") {
      setImageFileLogo(file);
      formdata.append("logo_image", file);
      formdata.append("owner_email", projectDetail.owner.email);

      handleSubmitImageDetail(formdata);
    } else if (e.target.name === "bannerImage") {
      setImageFileBanner(file);

      formdata.append("banner_image", file);
      formdata.append("owner_email", projectDetail.owner.email);

      handleSubmitImageDetail(formdata);
    }
  };
  const onDeleteImage = (name: any) => {
    let formdata = {};
    if (name === "projectLogo") {
      setImageFileLogo([]);
      formdata = {
        logo_image: null,
        owner_email: projectDetail.owner.email
      };
      handleSubmitImageDetail(formdata);
    } else if (name === "bannerImage") {
      setImageFileBanner([]);
      formdata = {
        banner_image: null,
        owner_email: projectDetail.owner.email
      };

      handleSubmitImageDetail(formdata);
    }
  };
  const handleRemoveContactItem = async (i: number, id: any) => {
    try {
      const res = await removeContact(ref, siteId,id);
      const { status, data, statusText } = res;
      switch (status) {
        case 204:
          toast.success("Successfully deleted Contact");
          const tempItem: Array<any> = [...contactItems];
          tempItem[i].isOpen = false;
          getAddcontact(ref);
          break;
        case 400:
          setApiResponseErr(data);
          break;
        case 403:
          if (data.detail === "ERR_login_again_token_expired") {
            toast.error(t("userManagment.error_login_again"));
            localStorage.clear();
            navigate("/login");
          }

          break;
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
    // projectDetail?.address;
    const address = projectDetail?.address;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&libraries=places&key=${apiKey}`;
    await axios
      .get(`${url}`)
      .then(async (data: any) => {
        dispatch(setShortCodeAddress(data?.data?.results[0]?.address_components[0]?.short_name));
        const latitude = data?.data?.results[0]?.geometry?.location?.lat;
        const longitude = data?.data?.results[0]?.geometry?.location?.lng;
        if(latitude && longitude)
        {
          const url=`https://maps.googleapis.com/maps/api/timezone/json?location=${latitude}%2C${longitude}&timestamp=1331161200&key=${apiKey}`
           await axios
           .get(`${url}`)
           .then((data: any) => {
             dispatch(setTimeZone(data?.data?.timeZoneId));
           })
           .catch((error) => {
             console.log(error);
           });
        }


        setLatitude(latitude);
        setLongitude(longitude);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    setData({
      lat: latitude,
      lng: longitude,
    });
  }, [latitude, longitude]);

  const getProjectDetails = async (projectRef: any) => {
    try {
      setIsLoading(true);
      const res = await getProjectDetail(projectRef);
      const { status, data } = res;
      switch (status) {
        case 200:
          setIsLoading(false);
          setProjectDetail(data);
          setImageFileLogo(data.logoImage);
          setImageFileBanner(data.bannerImage);

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
        default:
          setIsLoading(false);
          break;
      }
    } catch (err) {
      setIsLoading(false);
      toast.error("error something went wrong");
    }
  };

  const getSiteList = async () => {
    try {
      const res = await getdataASiteList(ref, true);
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
          // setApiResponseErr(data);
          break;
        case 401:                
          localStorage.clear();
          window.open(`${baseUrlForFrontend}`, "_blank");              
          setIsLoading(false);
          break;  
        case 403:
            if (data.detail === "ERR_login_again_token_expired") {
              toast.error(t("userManagment.error_login_again"));
              localStorage.clear()
              navigate('/login')
            }

            break
        default:
          // setApiResponseErr(statusText);
          break;
      }
    } catch (err) {
      toast.error("Somthing went wrong");
    }
  };
  useEffect(() => {
    getMap();
  }, [projectDetail]);
  useEffect(() => {
    getProjectDetails(ref);
   
    getSiteList();
  }, []);
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
          if (value!=='' && !validatePhoneNumber(value)) {
           
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
  const onChangeEdit = (e: any,index:any) => {
    const { name, value } = e.target;
    switch (name) {
  
        case `phone:${index}`:
          if (value!=='' && !validatePhoneNumber(value)) {
           
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
  const handleEditProjectDetail = () => {
    dispatch(handleOpenEditProjectModal(true));
  };

  const onChangeSite =(val:any)=>{
    setContactItems([]);
    clearErrors2('site');
    setSiteId(val);
  }
  const handleGoClickevent =()=>{
  
    if(!siteId){
      setError2('site',{
    type: "required",
    message: "Please Select site"
    }
    )
    }
    else{
      getAddcontact(ref);
      setSelectSiteId(true)
    }
    }
  useEffect(() => {
    getProjectDetails(ref);
  }, [isModelShow]);
  return (
    <div
      className="tab-pane fade show active"
      id="nav-projinfo"
      role="tabpanel"
      aria-labelledby="nav-details-tab"
    >
      <div className="row">
        <div className="col-xs-12 col-xl-6 col-lg-6 col-md-6">
          <div className="vehicle-form glob-form">
            <h3>{t("siteDetail.details_heading_text")}</h3>
            <div className="prodetail-datawrapper">
              <div className="prd-row">
                <div className="prd-item">
                  <p className="prd-title">{t("siteDetail.project_name")}</p>
                  <p className="prd-val">{projectDetail?.name}</p>
                </div>
                <div className="prd-item">
                  <p className="prd-title">{t("siteDetail.account_manager")}</p>
                  <p className="prd-val">{projectDetail?.managerName}</p>
                </div>
              </div>
              <div className="prd-row">
                <div className="prd-item">
                  <p className="prd-title">{t("siteDetail.project_lead")}</p>
                  <p className="prd-val">
                    {projectDetail?.owner?.firstName}{" "}
                    {projectDetail?.owner?.lastName}
                  </p>
                </div>
                <div className="prd-item">
                  <p className="prd-title">{"Project Organization"}</p>
                  <p className="prd-val">{projectDetail?.owner?.organization?.name}</p>
                </div>
              </div>
              <div className="prd-row">
                <div className="prd-item">
                  <p className="prd-title">{t("siteDetail.project_add")}</p>
                  <p className="prd-val">{projectDetail?.address}</p>
                </div>
              </div>
            </div>
            <div className="map-box">
              <MyMapComponent latitude={latitude} longitude={longitude} />
            </div>
            <div className="form-save-btn">              
              <button  onClick={() => handleEditProjectDetail()} className="theme-btn">{t("siteDetail.edit_project_detail")}</button>
            </div>
          </div>
        </div>
        <div className="col-xl-6 col-lg-6 col-md-12">
          <div className="vehicle-form glob-form contact ">
            <div className="">

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
                              errors2["calenderDay"]
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
                        errors={errors2}
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
              {selectSiteId && (

              <div className="vh-form-header">
                <h3>{t("siteDetail.heading_contact")}</h3>
                <Link
                  to="#"
                  id="add-contact-btn"
                  onClick={() => handleAddClick(true)}
                >
                  <img src={images.plusTheme} alt="add-icon" />
                </Link>
              </div>
              )}
            </div>
            {isOpenAddModel && (
              <div
                className="vehicle-form"
                id="add-contact-form"
                style={{ display: "block" }}
              >
                <h3>{t("siteDetail.add_contact")}</h3>

                <div className="form-group">
                  <label>{t("siteDetail.label_name")}</label>
                  <Input
                    inputName="name"
                    className={
                      errors2.name ? "form-control error" : "form-control"
                    }
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
                    // disabled={projectRole === constants.PROJECT_USER || projectRole === constants.PROJECT_MANAGER}
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
                    className={
                      errors2.position ? "form-control error" : "form-control"
                    }
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
                    // disabled={projectRole === constants.PROJECT_USER || projectRole === constants.PROJECT_MANAGER}
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
                    className={
                      errors2.phone ? "form-control error" : "form-control"
                    }
                    register={register2}
                    rules={{
                           
                  //     validate: (value: string) => {
                  //       if(value != ''){
                  //         return (
                  //           validatePhoneNumber(value) 
                  //         );
                  //       }
                  //  return false;
                  //      
                  //     },

                      onChange: (e: any) => onChange(e),
                    }}
                    id="contact_add_phone"
                    inputType="text"
                    // disabled={projectRole === constants.PROJECT_USER || projectRole === constants.PROJECT_MANAGER}
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
                      // disabled={projectRole === constants.PROJECT_USER || projectRole === constants.PROJECT_MANAGER}
                      className="btn btn-link cancel-link edit-contact-cancel accesspoint-cancle"
                    />
                    <Button
                      buttonLabel={t("siteDetail.btn_add")}
                      // disabled={projectRole === constants.PROJECT_USER || projectRole === constants.PROJECT_MANAGER}
                      handleClick={handleSubmit2(handleAddContactItem)}
                      className="btn theme-btn submit"
                    />
                  </div>
                  <CommonErrorMessage
                    errMessage={apiResponseErr}
                    containerClass="w-100 profileSetup_error"
                  />
                </div>
              </div>
            )}
            <div className="table-responsive">
              <table className="table prd-data-table">
                {selectSiteId && contactItems.map((contactItem: any, index: number) => (
                  <>
                    <tr>
                      <td>
                        <div className="prd-item">
                          <p className="prd-title">
                            {t("siteDetail.label_name")}
                          </p>
                          <p className="prd-val">{contactItem.name}</p>
                        </div>
                      </td>
                      <td>
                        <div className="prd-item">
                          <p className="prd-title">
                            {t("siteDetail.label_phone")}
                          </p>
                          <p className="prd-val">{contactItem.phone}</p>
                        </div>
                      </td>
                      <td className="action">
                        <div className="prd-item">
                          <p className="prd-title">Actions</p>
                          <div className="cd-action">
                            <Link
                              className="ad-edit"
                              to="#"
                              onClick={() => handleEditClick(true, index)}
                            >
                              <img src={images.editadmin} alt="edit" />
                            </Link>
                            <Link
                              to="#"
                              onClick={() =>
                                handleRemoveContactItem(index, contactItem.id)
                              }
                            >
                              <img src={images.deletadmin} alt="delete" />
                            </Link>
                          </div>
                        </div>
                      </td>
                    </tr>

                    {contactItem.isOpen && (
                      <tr>
                        <td colSpan={3}>
                          <div
                            className="vehicle-form edit-contact-form"
                            style={
                              contactItem.isOpen
                                ? { display: "block" }
                                : { display: "none" }
                            }
                          >
                            <h3>{t("siteDetail.edit_contact")}</h3>

                            <div className="form-group">
                              <label>{t("siteDetail.label_name")}</label>
                              <Input
                                inputName={`name:${index}`}
                                className={
                                  errors2[`name:${index}`]
                                    ? "form-control error"
                                    : "form-control"
                                }
                                register={register2}
                                rules={{
                                  required: {
                                    value: true,
                                    message: t(
                                      "siteDetail.error_name_required"
                                    ),
                                  },

                                  onChange: (e: any) => onChange(e),
                                }}
                                id="contact_edit_name"
                                inputType="text"
                                // disabled={projectRole === constants.PROJECT_USER || projectRole === constants.PROJECT_MANAGER}
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
                                className={
                                  errors2[`position:${index}`]
                                    ? "form-control error"
                                    : "form-control"
                                }
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
                                // disabled={projectRole === constants.PROJECT_USER || projectRole === constants.PROJECT_MANAGER}
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
                                className={
                                  errors2[`phone:${index}`]
                                    ? "form-control error"
                                    : "form-control"
                                }
                                register={register2}
                                rules={{
                          //  
                          //         validate: (value: string) => {
                          //           if(value != ''){
                          //             return (
                          //               validatePhoneNumber(value) 
                          //             );
                          //           }
                          //          
                          //         },

                                  onChange: (e: any) => onChangeEdit(e,index),
                                }}
                                id="contact_edit_phone"
                                inputType="text"
                                // disabled={projectRole === constants.PROJECT_USER || projectRole === constants.PROJECT_MANAGER}
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
                                    handleRemoveContactItem(
                                      index,
                                      contactItem.id
                                    )
                                  }
                                  // disabled={projectRole === constants.PROJECT_USER || projectRole === constants.PROJECT_MANAGER}
                                />
                              </div>
                              <div className="cb-right">
                                <Button
                                  // disabled={projectRole === constants.PROJECT_USER || projectRole === constants.PROJECT_MANAGER}
                                  buttonLabel="Cancel"
                                  handleClick={() =>
                                    handleEditClick(false, index)
                                  }
                                  className="btn btn-link cancel-link edit-contact-cancel accesspoint-cancle"
                                />
                                <Button
                                  // disabled={projectRole === constants.PROJECT_USER || projectRole === constants.PROJECT_MANAGER}
                                  buttonLabel={t("siteDetail.btn_edit")}
                                  handleClick={handleSubmit2((data) =>
                                    handleEditContactItem(
                                      data,
                                      index,
                                      contactItem.id
                                    )
                                  )}
                                  className="btn theme-btn edit-btn"
                                />
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </table>
            </div>
          </div>
          <div className="vehicle-form ">
            <h3>{t("siteDetail.logo")}</h3>
            <Image
              //   value={getValues("projectLogo") && Object.keys(getValues("projectLogo")).length > 0 && window.URL?.createObjectURL(getValues("projectLogo")[0])}
              logoImage={imageFileLogo}
              inputName="projectLogo"
              id="projectLogo"
              rules={{}}
              disabled={false}
              // value={projectDetail?.logoImage}
              handleUploadImage={onChangeImage}
              handleDeleteImage={onDeleteImage}
            />
          </div>
          <div className="vehicle-form ">
            <h3>{t("siteDetail.home_page_banner")}</h3>
            <Image
              //   value={getValues("projectLogo") && Object.keys(getValues("projectLogo")).length > 0 && window.URL?.createObjectURL(getValues("projectLogo")[0])}
              logoImage={imageFileBanner}
              inputName="bannerImage"
              id="projectLogo"
              rules={{}}
              disabled={false}
              // value={projectDetail?.bannerImage}

              handleUploadImage={onChangeImage}
              handleDeleteImage={onDeleteImage}
            />
            {/* <div className="form-group mb-0">
                <div className="file-input upload-databox added-data-box">
                  <div className="file-input-text">
                    <img src={images.Imageicon} alt="default" />

                    <a href="" className="delete-file">
                      <Image
                        //   value={getValues("projectLogo") && Object.keys(getValues("projectLogo")).length > 0 && window.URL?.createObjectURL(getValues("projectLogo")[0])}
                        logoImage={bannerImage}
                        inputName="projectLogo"
                        id="projectLogo"
                        rules={{}}
                        disabled={false}
                        value={undefined}
                      />
                    </a>
                  </div>
                </div>
              </div>
             */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectInformation;

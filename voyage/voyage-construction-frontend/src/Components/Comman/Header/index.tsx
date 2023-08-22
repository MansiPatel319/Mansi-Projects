/* eslint-disable no-param-reassign */
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
// component
import Notification from "./NotificationComponent";
import ProfileComponent from "./ProfileComponent";

// images
import images from "../../../Assets/images";

// redux
import { setProjectDeatils } from "../../../Store/Actions/AuthModule/authActionCreator";

// api
import { authApiUser, getUserProjectList } from "../../../Network/Core/AuthModule/auth";

// helper
import notification from "../../../StaticData/Dashboard/notification";
import profileMenu from "../../../StaticData/Dashboard/profile";

// css
import "./style.css";
import "../../../Assets/css/topbar.css";
import { getLocalStorage, setLocalStorage } from "../../../Network/ApiService";
import { constants } from "../../../Library/Constants";
import useOutsideClick from "./ManageOutsideClickClose";
import { getProjectFieldsDetails } from "../../../Network/Core/Dashboard/dashboard";

const index = () => {
  const [selectedVneue, setSelectedVenue] = useState("");
  const [showNotification, setNotification] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [ChooseProjectData, setChooseProjectData] = useState<any>([])
  const [optionProjectList, setOptionProjectList] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const refOutsideProfile = useRef(null);
  const refOutsideNotification = useRef(null);
  const project = getLocalStorage(constants.PROJECT);
  const user = getLocalStorage(constants.USER)
  const { t } = useTranslation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // const options:any = [
  //   {
  //     label: "Main Street Tower - USA1",
  //     value: "Main Street Tower - USA1",
  //   },
  //   {
  //     label: "Main Street Tower - USA2",
  //     value: "Main Street Tower - USA2",
  //   },
  //   {
  //     label: "Main Street Tower - USA3",
  //     value: "Main Street Tower - USA3",
  //   },
  // ];
  const handleChange = (e: any) => {
    setSelectedVenue(e)
    navigate(`/home/${e.ref}`)
    setLocalStorage(constants.PROJECT, JSON.stringify(e))

    dispatch(setProjectDeatils(e))
  };
  const handleClickNotification = () => {
    setNotification(!showNotification);
  };
  const handleClickProfileIcon = () => {
    setShowProfile(!showProfile);
  };


  useOutsideClick(refOutsideProfile, () => {
    if (showProfile) {
      setShowProfile(false);
    }
  });
  useOutsideClick(refOutsideNotification, () => {
    if (showNotification) {
      setNotification(false);
    }
  });
  // document.addEventListener("keydown", useOutsideClick);
  // document.removeEventListener("keydown", useOutsideClick);

  const getProjectList = async () => {
    try {
      const res = await authApiUser();
      const { status, data } = res;
      switch (status) {
        case 200:
          console.log('data :>> ', data);
          setChooseProjectData(data.projectList)
          data.projectList.forEach((item: any) => {
            item.value = item.ref;
            item.label = (<div className="custm-header-select"><img className="profile-icon" src={images.profile}></img>{item.name}</div>);
          }
          )
          setOptionProjectList(data.projectList)

          const selectedValue = data.projectList.find((item: any) => item.value === project.ref)
          setSelectedVenue(selectedValue)
          break;
        case 400:
          break;
        case 403:
          if (data.detail === "ERR_login_again_token_expired") {
            toast.error(t("userManagment.error_login_again"));
            localStorage.clear()
            navigate('/login')
          }
          break;
        default:
          break;
      }
    } catch (err) {
      toast.error(t("forgotPassword.error_something_went_wrong"));
    }
  }

  useEffect(() => {
    getProjectList()
  }, []);
  // useEffect(() => {
  //   const selectedValue=ChooseProjectData && ChooseProjectData.length>0 &&  ChooseProjectData?.find((item: any) => item.value === project.ref)
  //   setSelectedVenue(selectedValue)
  // },[ChooseProjectData,project])
  const getProjectFields = async (ref: any) => {
    try {
      setIsLoading(true);
      const res = await getProjectFieldsDetails(ref);
      const { status, data } = res;
      switch (status) {
        case 200:
          setIsLoading(false);

          setLocalStorage(constants.PROJECT_BOOKING_FILED, JSON.stringify(data));
          break;
        case 400:
          setIsLoading(false);
          break;
        default:
          break;
      }
    } catch (err) {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getProjectFields(project.ref)
  }, [])
  return (
    <div className="top-header">
      <div className="header-logo">
        <Link className="sidebar-brand d-flex mb-0" to={`/home/${project}`}>
          <img src={images.logoMini} alt="logo" className="logo-mini" />
          <img src={images.logogreenSvg} alt="logo" className="logo" />
        </Link>
      </div>
      <div className="header-navbar">
        <nav className="navbar navbar-expand navbar-light topbar static-top shadow pl-0">
          <form>
            <div className="form-group mb-0">
              <Select
                classNamePrefix="form-control-header-select"
                options={optionProjectList}
                value={selectedVneue}
                onChange={(val: any) => handleChange(val)}
                isSearchable={false}
              // menuIsOpen={true}
              />
            </div>
          </form>
          <ul className="navbar-nav ml-auto">
            {/* Alert */}
            <li className={showNotification ? "nav-item show" : "nav-item"}>
              <a className="nav-link" target="_blank" rel="noreferrer" href="https://voyagecontrol.com/support" role="button">
                <img src={images.alert} alt="alert" />
              </a>
            </li>
            {/* Notification */}
            <li className="nav-item dropdown no-arrow" ref={refOutsideNotification}>
              <Link
                className="nav-link dropdown-toggle"
                to="#"
                id="alertsDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                onClick={() => handleClickNotification()}
              >
                <img src={images.notification} alt="notification" />
                <span className="badge badge-counter">3</span>
              </Link>
              {showNotification && <Notification notification={notification} />}
            </li>

            <div className="topbar-divider d-none d-sm-block" />
            {/* profile Menu */}
            <li
              className={
                showProfile
                  ? "nav-item dropdown no-arrow show"
                  : "nav-item dropdown no-arrow"
              }
            >
              <Link
                className="nav-link dropdown-toggle"
                to="#"
                id="userDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                onClick={() => handleClickProfileIcon()}
                ref={refOutsideProfile}
              >
                {user?.firstName || user?.lastName ? (

                  <span className="profile-circle">{user?.firstName?.charAt(0) + user?.lastName?.charAt(0)}</span>
                ) : (
                  <span className="profile-circle p-0"><img className="profile-icon" src={images.profile}></img></span>
                )}
              </Link>
              {showProfile && <ProfileComponent profileMenu={profileMenu} />}
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default index;

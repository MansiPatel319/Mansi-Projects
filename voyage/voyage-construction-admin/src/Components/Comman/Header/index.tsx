import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Select from "../../UI/SelectBasic";
import notification from "../../../StaticData/Dashboard/notification";
import profileMenu from "../../../StaticData/Dashboard/profile";
import Notification from "./NotificationComponent";
import ProfileComponent from "./ProfileComponent";


//images
import images from "../../../Assets/images";


//css
import "../../../Assets/css/style.css";
import "./style.css";
import "../../../Assets/css/common.css";
import "../../../Assets/css/booking-list.css";
import "../../../Assets/css/booking-form.css";
import "../../../Assets/css/site-management.css";
import "../../../Assets/css/global-admin.css";
import "../../../Assets/css/cutstmize.css";

const index = () => {
  const [showNotification, setNotification] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const wrapperNotificationRef = useRef(null);
  const wrapperProfileRef = useRef(null);
  
  
  const handleClickNotification = () => {
    setNotification(!showNotification);
  };
  const handleClickProfileIcon = () => {
    setShowProfile(!showProfile);
  };
  function useOutsideAlerter(ref: any) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event: Event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setNotification(false);
          setShowProfile(false);
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
  useOutsideAlerter(wrapperNotificationRef);
  useOutsideAlerter(wrapperProfileRef);

  return (
    <nav className="navbar navbar-expand navbar-light topbar static-top shadow">
      <ul className="navbar-nav ml-auto">

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
            // onClick={() => handleClickProfileIcon()}
            ref={wrapperProfileRef}
          >
            <span className="profile-circle">CS</span>
          </Link>
          {showProfile && <ProfileComponent profileMenu={profileMenu} />}
        </li>
      </ul>
    </nav>
  );
};

export default index;

import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// component
import UserDetails from "../../Components/Core/UserModule/UserDetail";
import Leftbar from "../../Components/Comman/Leftbar";
import Header from "../../Components/Comman/Header";

import { constants } from "../../Library/Constants";
import { setLocalStorage } from "../../Network/ApiService";


// css
import "../../Assets/css/style.css";
import "../../Assets/css/common.css";
import "../../Assets/css/booking-list.css";
import "../../Assets/css/booking-form.css";
import "../../Assets/css/site-management.css";
import "../../Assets/css/global-admin.css";
import "../../Assets/css/new-user-page.css"
import "../../Assets/css/cutstmize.css";
import { useSelector } from "react-redux";
import AddProjectModal from "../../Components/Comman/Modal/AddProjectModal";
import toast from "react-hot-toast";
import { authApiUser } from "../../Network/Core/AuthModule/auth";



const UserDetail = () => {
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const token = query.get("token");
  const showAddProjectModal = useSelector((state: any) => state.project.showAddProjectModal)


  useEffect(() => {
    if (token !== null) {
      setLocalStorage(constants.LOGIN_TOKEN, token);
    }
    
  }, [token]);

  const getUserDetails = async () => {

    try {
      const res = await authApiUser();
      const { status, data } = res;
      switch (status) {
        case 200:

          setLocalStorage(constants.USER, JSON.stringify(data));

          break;
        case 400:

          break;
        case 401:

          break;
        default:

          break;
      }
    } catch (err) {

      toast.error("Something Went Wrong");
    }
  };
  useEffect(() => {
    getUserDetails()
  }, [])
  return (
  
    
<>
    
    <div id="wrapper">

      {/* <!-- Sidebar section start --> */}
      <Leftbar />
      {/* <!-- Sidebar section End --> */}

        <div id="content-wrapper" className="d-flex flex-column">
        
        {/* <!-- Main Content --> */}
        <div id="content">
          {/* <!-- Topbar section start --> */}
          <Header />

          {/* <!-- page header title section start --> */}

          <UserDetails />
        
          {showAddProjectModal && (
            <>
              <AddProjectModal />
              <div className="modal-backdrop fade show" />
            </>
          )}
        </div>
      </div >
    </div>
  
    </>
  );
};

export default UserDetail;

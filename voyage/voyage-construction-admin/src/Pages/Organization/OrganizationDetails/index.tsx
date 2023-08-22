import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

// component
import OrganizationDetails from "../../../Components/Core/Organization/OrganizationDetails";
import Leftbar from "../../../Components/Comman/Leftbar";
import Header from "../../../Components/Comman/Header";

// css
import "../../../Assets/css/style.css";
import "../../../Assets/css/common.css";
import "../../../Assets/css/booking-list.css";
import "../../../Assets/css/booking-form.css";
import "../../../Assets/css/site-management.css";
import "../../../Assets/css/global-admin.css";
import "../../../Assets/css/cutstmize.css";





const index = () => {
 

 
  return (
    <div id="wrapper" >
      {/* <!-- Sidebar section start --> */}
      <Leftbar />
      {/* <!-- Sidebar section End --> */}

      <div id="content-wrapper" className="d-flex flex-column">
        {/* <!-- Main Content --> */}
        <div id="content">
          {/* <!-- Topbar section start --> */}
          <Header />

          {/* <!-- page header title section start --> */}

          <OrganizationDetails />
            
           
        </div>
      </div>
    </div>
  );
};

export default index;

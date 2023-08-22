import React from "react";

// component
import Availablity from "../../../Components/Core/SiteManagment/Availablity";
import Leftbar from "../../../Components/Comman/Leftbar";
import Header from "../../../Components/Comman/Header";


// css
import "../../../Assets/css/style.css";
import "../../../Assets/css/site-management.css";
import "../../../Assets/css/booking-form.css";

const index = () => {
 
  return (
    <>
    <Header />
    <div id="wrapper">
      {/* <!-- Sidebar section start --> */}
      <Leftbar />
      {/* <!-- Sidebar section End --> */}
      <div id="content-wrapper" className="d-flex flex-column">
        {/* <!-- Main Content --> */}
        <div id="content">
          {/* <!-- Topbar section start --> */}
         
          {/* <!-- page header title section start --> */}
          <Availablity />
        </div>
      </div>
     
      </div>
      </>
  );
};

export default index;

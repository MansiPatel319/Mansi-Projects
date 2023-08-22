import React, { useState } from "react";

// component

import Leftbar from "../../Components/Comman/Leftbar";
import Header from "../../Components/Comman/Header";


// css
import "../../Assets/css/style.css";
import "../../Assets/css/booking-form.css";
import "../../Assets/css/booking-list.css";
import BookingFormModule from "../../Components/Core/BookingFormModule";
import SitePlanModal from "../../Components/Comman/Modal/SItePlanModal";
import { useSelector } from "react-redux";

const index = () => {
  const showSitePlan = useSelector((state:any)=>state.booking.showSitePlan)
 
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
          <BookingFormModule   />
         
        </div>
      </div>
      {showSitePlan && (
        <>
          <SitePlanModal />
          <div className="modal-backdrop fade show" />
        </>
      )}
      </div>
      </>
  );
};

export default index;

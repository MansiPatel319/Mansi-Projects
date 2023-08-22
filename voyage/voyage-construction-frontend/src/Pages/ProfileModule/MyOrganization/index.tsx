import React from "react";

// component
import Leftbar from "../../../Components/Comman/Leftbar";
import Header from "../../../Components/Comman/Header";
import MyOrganization from "../../../Components/Core/ProfileModule/MyOrganization"
// css
import "../../../Assets/css/style.css";
import "../../../Assets/css/site-management.css";
import "../../../Assets/css/availability.css";
import "../../../Assets/css/booking-form.css";
import "../../../Assets/css/booking-list.css";



export interface MyOrganizationProps {}
const index = () => {
  return (
    <>
    <Header />
    <div id="wrapper">
      <Leftbar />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <MyOrganization />
        </div>
      </div>
      </div>
      </>
  )
}

export default index
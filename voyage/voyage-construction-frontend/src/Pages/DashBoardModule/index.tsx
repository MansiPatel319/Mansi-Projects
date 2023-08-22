import React from "react";

// component
import Dashboard from "../../Components/Core/DashboardModule";
import Leftbar from "../../Components/Comman/Leftbar";
import Header from "../../Components/Comman/Header";

// css
import "../../Assets/css/style.css";
import "../../Assets/css/booking-form.css";
import "../../Assets/css/booking-list.css";

const index = () => {
  return (
    <>
    <Header />
    <div id="wrapper">
      <Leftbar />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
        
          <Dashboard />
        </div>
      </div>
      </div>
      </>
  );
};

export default index;

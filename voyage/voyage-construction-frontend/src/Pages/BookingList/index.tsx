import React from 'react'
import Leftbar from "../../Components/Comman/Leftbar";
import Header from "../../Components/Comman/Header";
import BookingListModule from '../../Components/Core/BookingListModule';

// css
import "../../Assets/css/style.css";
import "../../Assets/css/booking-form.css";
import "../../Assets/css/booking-list.css";

function BookingList() {
  return (
    
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
        <BookingListModule />
   
      </div>
    </div>
  </div>
    
  )
}

export default BookingList
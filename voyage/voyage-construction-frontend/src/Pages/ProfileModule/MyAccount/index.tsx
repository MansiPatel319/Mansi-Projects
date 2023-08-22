import React, { useState } from "react";
// Components
import MyAccountComponent from "../../../Components/Core/ProfileModule/MyAccount";
import Leftbar from "../../../Components/Comman/Leftbar";
import Header from "../../../Components/Comman/Header";
import UpdatePasswordModal from "../../../Components/Comman/Modal/UpdatePassword";
// images
// css

import "../../../Assets/css/style.css";
import "../../../Assets/css/auth.css";
import '../../../Assets/css/booking-form.css';

export interface MyAccountProps {}

export default function MyAccount() {
  const [showModal, setShowModal] = useState(false);
  const handleClickUpdateModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (

    <div id="wrapper">
    <Leftbar />
    <div id="content-wrapper" className="d-flex flex-column">
      <div id="content">
        <Header />
        <MyAccountComponent  handleClickModal={handleClickUpdateModal}/>
      </div>
      {showModal && (
        <>
          <UpdatePasswordModal handleClose={handleCloseModal} />
          <div className="modal-backdrop fade show" />
        </>
      )}
    </div>
  </div>
  );
}
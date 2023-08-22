import React, { useState } from "react";

// component
import UserManagment from "../../Components/Core/UserManagment";
import Leftbar from "../../Components/Comman/Leftbar";
import Header from "../../Components/Comman/Header";
import InviteModal from "../../Components/Comman/Modal/InviteModal";
import UserFIlterModal from "../../Components/Comman/Modal/UserFIlterModal";
import Loader from "../../Components/UI/Loader"

// css
import "../../Assets/css/style.css";
import "../../Assets/css/booking-form.css";
import "../../Assets/css/booking-list.css";
import UserProfileModal from "../../Components/Comman/Modal/UserProfileModal";
import { useSelector } from "react-redux";

const index = () => {
  const isLoading = useSelector((state: any) => state.loader.loading);

  const [isShowUserProfileModel, setIsShowProfileModel] = useState(false)
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setselectedId] = useState();
  const [showUserFilterModal, setShowUserFilterModal] = useState(false);
  const handleClickInviteModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleClickUserDetailModal = (id: any) => {
    setselectedId(id);
    setIsShowProfileModel(true);
  };
  const handleUserCloseModal = () => {
    setIsShowProfileModel(false);
  };
  const handleCloseFilterModal = () => {
    setShowUserFilterModal(false);

  }
  const handleClickFilterModal = (e: any) => {
    e.preventDefault()
    setShowUserFilterModal(true);

  }
  return (

    <>
      {/* <!-- Sidebar section start --> */}
      <Header />
      <div id="wrapper">
        <Leftbar />
        {/* <!-- Sidebar section End --> */}
        <div id="content-wrapper" className="d-flex flex-column">
          {/* <!-- Main Content --> */}
          <div id="content">
            {/* <!-- Topbar section start --> */}

            {/* <!-- page header title section start --> */}
            <UserManagment isShowUserProfileModel={isShowUserProfileModel} handleClickModal={handleClickInviteModal} handleClickFilterModal={handleClickFilterModal} handleClickUserDetailModal={handleClickUserDetailModal} />

          </div>
        </div>
        {showUserFilterModal && (
          <>

            <UserFIlterModal handleClose={handleCloseFilterModal} />
            {/* <div className="modal-backdrop fade show" /> */}

          </>
        )}
        {showModal && (
          <>
            <InviteModal handleClose={handleCloseModal} />
            <div className="modal-backdrop fade show" />
          </>
        )}
        {
          isShowUserProfileModel &&
          <>

            <UserProfileModal handleClose={handleUserCloseModal} userId={selectedId} />
            <div className="modal-backdrop fade show" />
          </>
        }
      </div>
    </>

  );
};

export default index;

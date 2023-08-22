import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
// redux
import { setUserDeatils } from "../../../Store/Actions/AuthModule/authActionCreator";

// helper
import { constants } from "../../../Library/Constants";

// images
import images from "../../../Assets/images";


export interface ProfileComponentProps {
  profileMenu: object[];
}

function ProfileComponent(props: ProfileComponentProps) {
  const { profileMenu } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div
    className="profile-dropmenu dropdown-menu dropdown-menu-right shadow animated--grow-in show"
    aria-labelledby="userDropdown"
    >
       <span className="cs-up"></span>
      {profileMenu.map((item: any) => (
          <Link className="dropdown-item" to={item.redirectLink} key={item.name}>
          <img alt="icon" src={item.icon} className="fa-sm fa-fw mr-2 text-gray-400" />
          <span>{item.name}</span>
        </Link>
      ))}
      <Link
        className="dropdown-item"
        to="/login"
        key="logout"
        onClick={() => {
          navigate("/login");
          localStorage.removeItem(constants.LOGIN_TOKEN);
          localStorage.removeItem(constants.PROJECT);
          localStorage.removeItem(constants.USER);
          dispatch(setUserDeatils([]));
        }}
      >
        <img src={images.ProfileLogout} alt="logout" className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" />
        <span>Logout</span>
      </Link>
    </div>
  );
}

export default ProfileComponent;

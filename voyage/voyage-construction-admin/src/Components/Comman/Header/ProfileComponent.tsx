import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { constants } from "../../../Library/Constants";

export interface ProfileComponentProps {
  profileMenu: object[];
}

function ProfileComponent(props: ProfileComponentProps) {
  const { profileMenu } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div
      className="dropdown-menu dropdown-menu-right shadow animated--grow-in show"
      aria-labelledby="userDropdown"
    >
      {profileMenu.map((item: any) => (
        <Link className="dropdown-item" to="#" key={item.id}>
          <i className={`fas ${item.icon} fa-sm fa-fw mr-2 text-gray-400`} />
          {item.name}
        </Link>
      ))}
      <div className="dropdown-divider" />
      <Link
        className="dropdown-item"
        to="#"
        onClick={() => {
          localStorage.removeItem(constants.LOGIN_TOKEN);

          navigate("/login");
        }}
      >
        <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" />
        Logout
      </Link>
    </div>
  );
}

export default ProfileComponent;

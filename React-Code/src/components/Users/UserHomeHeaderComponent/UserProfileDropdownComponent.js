import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileImg from '../../../assets/images/profile.png';
import { toast } from 'react-toastify';
import { useHistory } from "react-router-dom";
import { logout } from "../../../services/auth";
import { setSignupData } from '../../../actions/usersAction';
import { setPreviousPath } from "../../../actions/HandlePreviousRoutes";
import { useDispatch } from 'react-redux';

import useOutsideClick from '../../OutSideClick/ManageOutsideClickClose';
toast.configure();
function UserProfileDropdownComponent({ profileLink, userData }) {
  const history = useHistory();
  const refProfile = useRef(null);
  const dispatch = useDispatch();
  useOutsideClick(refProfile, () => {
    if (isDropdownOpen) {
      setDropdown(false);
    }
  });
  const [isDropdownOpen, setDropdown] = useState(false);
  const handleDropdown = () => {
    setDropdown(!isDropdownOpen);
  };

  const handleLogoutClick = () => {
    dispatch(setSignupData(null));
    dispatch(setPreviousPath(""));
    logout();
    // localStorage.clear();
    history.push("/");
  };
  return (
    <React.Fragment>
      <div className="user-drop-down" ref={refProfile}>
        <div className={`dropdown drop-left dropdown-custom-top ${isDropdownOpen ? 'show' : ''}`}>
          <Link
            className="btn btn-default dropdown-toggle"
            to="#"
            role="button"
            id="dropdownMenuLink"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded={isDropdownOpen ? 'true' : 'false'}
            onClick={handleDropdown}
          >
            <div className="user-profile">
              <div className="user-img">
                {userData !== null ? <img
                  src={
                    userData.profile_image === '' ||
                      userData.profile_image === undefined ||
                      userData.profile_image === null ||
                      userData.profile_image === "https://myapp-user-uploads154822-dev.s3.amazonaws.com/sample.jpg"
                      ? profileImg
                      : userData.profile_image
                  }
                  className="user-top-image"
                  alt="userImage"
                /> : ''}
              </div>
            </div>
          </Link>
          {isDropdownOpen ? (
            <div
              className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`}
              aria-labelledby="dropdownMenuLink"
              // x-placement="bottom-start"
              style={{
                position: 'absolute',
                willChange: 'transform',
                // top: ' 0px',
                // left: '0px',
                // transform: 'translate3d(105px, 549px, 0px)',
              }}
            >
              <ul>
                <li>
                  <Link className="dropdown-item" to={profileLink}>
                    <span className="bg-custom-icon user-icon"></span> Profile Settings
                  </Link>
                </li>
                <li className="logout-li">
                  <Link className="dropdown-item" to="/" onClick={handleLogoutClick}>
                    <span className="bg-custom-icon logout-icon"></span>
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    </React.Fragment>
  );
}

export default UserProfileDropdownComponent;

UserProfileDropdownComponent.propTypes = {
  profileLink: PropTypes.string,
  userData: PropTypes.any,
  ref: PropTypes.any,
};

import React from "react";
import { useDispatch } from "react-redux";
import { setIsNotificationBanner } from "../../../store/actions/authActions";

const NotificationBannerComponent = ({ date }) => {
  const dispatch = useDispatch();
  return (
    <div className="message-text-dark-div" id="message-text-dark01">
      <div className="message-text-dark-row">
        <div className="text-div">
          <p>
            You can continue using YouHue in your class until {date} after which
            your account will become inactive unless you are verified.
          </p>
        </div>
        <div className="cancel-div">
          <div className="cancel-icon-div">
            <button
              className="btn-cancel-icon"
              id="cancel-message-row"
              onClick={(e) => {
                e.preventDefault();
                localStorage.setItem("isShowNotificationBanner", false);
                dispatch(setIsNotificationBanner(false));
              }}
            >
              <span className="custom-icon cancel-new-icon"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationBannerComponent;

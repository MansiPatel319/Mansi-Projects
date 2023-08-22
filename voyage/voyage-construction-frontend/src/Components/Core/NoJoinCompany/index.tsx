import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

// component
import { setUserDeatils } from "../../../Store/Actions/AuthModule/authActionCreator";
import { constants } from "../../../Library/Constants";

export interface INoCompanyJoinComponentProps { }

export default function NoJoinCompany() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="custom-form">
      <h2>Please Contact Us</h2>
      <form>
        <div className="btn-sec in-acc">
          <button className="btn theme-btn" type="button">Start Chat</button>
        </div>
      </form>
      <div className="emailus-link">
        <a href="">Email Us</a>
      </div>
      <div className="emailus-link">
        <Link to="/login" onClick={() => {
            localStorage.removeItem(constants.LOGIN_TOKEN);
            localStorage.removeItem(constants.PROJECT);
            localStorage.removeItem(constants.USER);
            dispatch(setUserDeatils([]));
            navigate("/login");
        }}>Logout</Link>
      </div>
      
    </div>
  );
}

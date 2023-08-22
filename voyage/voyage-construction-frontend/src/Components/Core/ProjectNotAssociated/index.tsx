import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

// component
import { setUserDeatils } from "../../../Store/Actions/AuthModule/authActionCreator";
import { constants } from "../../../Library/Constants";
import { authApiUser } from "../../../Network/Core/AuthModule/auth";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

export interface ProjectNotAssociatedProps { }

export default function ProjectNotAssociated() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false)
  const {t} = useTranslation()
  
  const getUserDetails = async () => {
    try {
      setIsLoading(true);
      const res = await authApiUser();
      const { status, data } = res;
      switch (status) {
        case 200:
          setIsLoading(false);
          console.log('data.projectList :>> ', data);
          if (data.projectList.length > 0 ) {
            navigate("/company/choose");
          }
          break;
        case 400:
          setIsLoading(false);
          break;
        case 401:
          if (data.code === "token_not_valid") {
            toast.error(t("chooseProject.error_login_again"));
            localStorage.clear();
            navigate("/login");
          }
          setIsLoading(false);
          break;
        default:
          setIsLoading(false);
          break;
      }
    } catch (err) {
      setIsLoading(false);
      toast.error(t("chooseProject.error_something_went_wrong"));
    }
  };
  
  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div className="custom-form">
      <h2>Choose Project</h2>
      <br/>
      <form>
      <div className="site-content-right">
          <p>
          You are not associated with any projects. Please contact the project team to request an invite. Once you accept an invite, the project will appear here.
          </p>
        </div>
      </form>
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

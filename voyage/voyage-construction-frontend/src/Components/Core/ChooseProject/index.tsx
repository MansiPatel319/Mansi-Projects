/* eslint-disable react/jsx-no-useless-fragment */
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

// component
import Button from "../../UI/Button";
import Loader from "../../UI/Loader";

// images
import images from "../../../Assets/images/index";

// API
import { authApiUser } from "../../../Network/Core/AuthModule/auth";

// redux
import { setUserDeatils, setProjectDeatils } from "../../../Store/Actions/AuthModule/authActionCreator";

// helper
import { constants } from "../../../Library/Constants";
import { setLocalStorage } from "../../../Network/ApiService";
import { getAccountUserDetail, getProjectFieldsDetails } from "../../../Network/Core/Dashboard/dashboard";

export interface IChooseProjectComponentProps { }

export default function ChooseProjectComponent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [ChooseProjectData, setChooseProjectData] = useState<any>([]);
  const [isAdmin,setIsAdmin]=useState<any>(false);
  const [isLoading, setIsLoading] = useState(true);
  const getAccountdetails = async (ref: any) => {
    try {
      setIsLoading(true);
      const res = await getAccountUserDetail(ref);
      const { status, data } = res;
      switch (status) {
        case 200:
          setIsLoading(false);
          
          setLocalStorage(constants.USER, JSON.stringify(data));
          break;
        case 400:
          setIsLoading(false);
          break;
        default:
          break;
      }
    } catch (err) {
      setIsLoading(false);
    }
  };
  const getProjectFields = async (ref: any) => {
    try {
      setIsLoading(true);
      const res = await getProjectFieldsDetails(ref);
      const { status, data } = res;
      switch (status) {
        case 200:
          setIsLoading(false);
          
          setLocalStorage(constants.PROJECT_BOOKING_FILED, JSON.stringify(data));
          break;
        case 400:
          setIsLoading(false);
          break;
        default:
          break;
      }
    } catch (err) {
      setIsLoading(false);
    }
  };
  const handleChooseProject = (project: any) => {
    setLocalStorage(constants.PROJECT, JSON.stringify(project));
    dispatch(setProjectDeatils(project));
    getAccountdetails(project.ref);
    getProjectFields(project.ref);
    navigate(`/home/${project.ref}`);
  };
  const handleChooseAdmin = () => {
    const baseurl = process.env.REACT_APP_ADMIN_BASE_URL
    const token = localStorage.getItem(constants.LOGIN_TOKEN)
    window.open(`${baseurl}/?token=${token}`, "_blank");
    // navigate(`/home`)
  };

  
  const getUserDetails = async () => {
    try {
      setIsLoading(true);
      const res = await authApiUser();
      const { status, data } = res;
      switch (status) {
        case 200:
          setIsLoading(false);
          console.log('data.projectList :>> ', data);
          setChooseProjectData(data.projectList);
          setIsAdmin(data.isGlobalAdminUser);
          setChooseProjectData(data.projectList);
          // setLocalStorage(constants.USER, JSON.stringify(data));
          if (data.projectList.length === 0 && !data.isGlobalAdminUser) {
            navigate("/projectNotAssociated");
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
  <>
    {
      isLoading?(
        <Loader />
      ): (
        <div className="custom-form">
        <h2>{t("chooseProject.choose_project")}</h2>
        <div className="Project-list">
          {isAdmin && 
          <div className="project-item" id="project-item-" onClick={handleChooseAdmin}>
          <img className="pl-img" src={images.project1} alt="logo" />
          <div className="pl-title">
            <p className="pl-tag">{t("chooseProject.log_into")}</p>
            <h4>Admin Portal</h4>
          </div>
          <Link
            to="#"
            rel="noopener noreferrer"
          >
            <img className="pl-img" src={images.rightarrow} alt="logo" />
          </Link>
        </div>
          }
          
          {ChooseProjectData.map((project: any, index: number) => (
            <div
              className="project-item"
              id={`project-item-${index}`}
              onClick={() => handleChooseProject(project)}>
              <img className="pl-img" src={images.project1} alt="logo" />
              <div className="pl-title">
                <p className="pl-tag">{t("chooseProject.log_into")}</p>
                <h4>{project.name}</h4>
              </div>
              <a>
                <img className="pl-img" src={images.rightarrow} alt="logo" />
              </a>
            </div>
          ))}
        </div>
        <div className="logout-link">
          <Button
            buttonLabel="Log Out"
            handleClick={() => {
              localStorage.removeItem(constants.LOGIN_TOKEN);
              localStorage.removeItem(constants.PROJECT);
              localStorage.removeItem(constants.USER);
              dispatch(setUserDeatils([]));
              navigate("/login");
            }}
            varient=""
            size=""
            className="btn theme-btn btn-login"
          />
        </div>
      </div>
     
  )}
</>
   
  );
}

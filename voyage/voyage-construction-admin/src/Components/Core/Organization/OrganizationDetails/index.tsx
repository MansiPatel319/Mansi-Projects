import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import toast from "react-hot-toast";
// component
import Tabbar from "../../../UI/Tabbar";
import OrganizationInfo from "./OrganizationInfo";
import OrganizatioUsers from "./OrganizatioUsers";
import OrganizationActivity from "./OrganizationActivity";


// helper
import { tabs } from "../../../../StaticData/OrganizationDetail";
import Button from "../../../UI/Button";
import { constants } from "../../../../Library/Constants";
import { getProjectDetail } from "../../../../Network/Core/Project/ProjectInformation";
import { setLoader } from "../../../../store/Actions/ProjectModule/projectActionCreators";

// images
import images from "../../../../Assets/images";
import { setLocalStorage } from "../../../../Network/ApiService";

// css
import "../../../../Assets/css/style.css";
import "../../../../Assets/css/common.css";
import "../../../../Assets/css/booking-list.css";
import "../../../../Assets/css/booking-form.css";
import "../../../../Assets/css/site-management.css";
import "../../../../Assets/css/global-admin.css";
import "../../../../Assets/css/cutstmize.css";
import "../../../../Assets/css/new-user-page.css";
import { getOrganizationdetail } from "../../../../Network/Core/Organization/OrganizationInfo";

const index = () => {
  const [activeTab, setActiveTab] = useState("OrganizationInfo");
  const [orgDetail, setOrgDetail] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const dispatch = useDispatch();
  const [time, setTime] = useState<any>();
  const loading = useSelector((state: any) => state.project.loading);
  const navigate = useNavigate();
  const SortCode = useSelector((state: any) => state.project.shorCodeAddress)
  const timezone = useSelector((state: any) => state.project.timezone)

  //   const query = new URLSearchParams(location.pathname);
  const { id } = useParams();
  const { region } = useParams();
  const handleClickTab = (tabName: any) => {
    setActiveTab(tabName);
  };

  const handlebackclick = () => {
    navigate("/organization");
  };

  // const handleChooseProject = () => {
  //   const baseurl = process.env.REACT_APP_BASE_URL
  //   const token = localStorage.getItem(constants.LOGIN_TOKEN)
  //   window.open(`${baseurl}/adminredirect/?project=${setOrgDetail.ref}&token=${token}`, "_blank");
  //   // navigate(`/home`)
  // };


  function makeTimeDisplayFunction(date: any) {
    return ((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", { timeZone: timezone }));
  }

  const getOrganizationDetail = async (id: any) => {
    try {
      setIsLoading(true);
      const res = await getOrganizationdetail(id,region);
      const { status, data, statusText } = res;
      switch (status) {
        case 200:
          setIsLoading(false);
          setOrgDetail(data);
          if (timezone !== '' && timezone !== undefined && timezone !== null) {

            let convertedTime = makeTimeDisplayFunction(data.createdAt);
            setTime(convertedTime)
          }
          setLocalStorage(constants.PROJECT, JSON.stringify(data));

          break;
        case 400:
          setIsLoading(false);

          break;
        case 403:
          if (data.detail === "ERR_login_again_token_expired") {
            navigate("/login");
            toast.error("login again");
            localStorage.clear();
          }

          setIsLoading(false);
          break;
        case 404:
          navigate("/login");
          setIsLoading(false);

          break;
        default:
          setIsLoading(false);

          break;
      }
    } catch (err) {
      // setIsLoading(false);
      // dispatch(setLoader(false))
      console.log("err :>> ", err);
      // toast.error("error something went wrong");
    }
  };
// 
  useEffect(() => {
    getOrganizationDetail(id);
  }, []);
  useEffect(() => {
    getOrganizationDetail(id)
  }, [SortCode, timezone]);

  return (

    <div className="page-wrapper">
      <div className="page-content common-page-content projects-page-cont pro-det-cont">
        <div className="row">
          <div className="col-md-12">
            <div
              className="tab-content site-detailtab-cont mt-0"
              id="nav-tabContent"
            >
              <div className="booking-list-form">
                <form>
                  <div className="filter-wrapper projects-filter-wrappers">

                    <div className="col-lg-8 col-xs-12">
                      <div className="pro-title-with-detail">
                        <a
                          href=""
                          className="col-lg-1 prodet-back-link"
                          onClick={() => handlebackclick()}
                        >
                          <img src={images.back} alt="back" />
                          <span>Back</span>
                        </a>
                        <h4>
                          {orgDetail?.name}
                          {/* <span className={`tag tag-${projectDetail?.status}`}>
                            {projectDetail?.status}
                          </span> */}
                        </h4>
                        <div className="date-tag-cust">
                          <span className="date-ctitle">Organization Created:</span>
                          <span className="date-cval">
                            {new Date(orgDetail?.createdAt).toDateString()}
                          </span> 
                          <span className="date-ctitle">,</span>
                          <span className="date-cval">
                            {new Date(time).toLocaleTimeString() === 'Invalid Date' ? new Date(orgDetail?.createdAt).toLocaleTimeString() : new Date(time).toLocaleTimeString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* <div className="col-lg-4 col-xs-12">
                      <div className="text-right">
                        <div className="logout-link redirect">
                          <Button
                            buttonLabel="Go to project site"
                            handleClick={() => handleChooseProject()}
                            varient=""
                            size=""
                            className="btn mb-0 ml-auto theme-btn"
                          />
                        </div>
                      </div>
                    </div> */}



                  </div>
                </form>
              </div>

              <div className="projectdetails-tabbing">
                <Tabbar
                  availablity={false}
                  tabs={tabs}
                  activeTab={activeTab}
                  handleClickTab={handleClickTab}
                />
                <div
                  className="tab-content site-detailtab-cont"
                  id="nav-tabContent"
                >
                  {activeTab === "OrganizationInfo" && (
                    <OrganizationInfo />
                  )}
                  {activeTab === "OrganizatioUsers" && <OrganizatioUsers />}
                  {activeTab === "OrganizationActivity" && <OrganizationActivity />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default index;

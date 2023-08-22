import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
// component
// import Projectdetails from "../../../StaticData/Dashboard/homepageDetails";
import images from "../../../Assets/images";

// css
import "../../../Assets/css/style.css";
import "./style.css";

import { getLocalStorage } from "../../../Network/ApiService";
import { constants } from "../../../Library/Constants";
import { getAddContactList, getSiteDetailData } from "../../../Network/Core/SiteManagement/siteDetails";
import MainLoader from "../../UI/Loader";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../../../Store/Actions/Loader/LoaderActionCreator";

const index = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const[projectDetail,setprojectDetail]=useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  const [contact,setContactItems] = useState([])
  const project = getLocalStorage(constants.PROJECT)
  const dispatch = useDispatch()
  const loading = useSelector((state:any)=>state.loader.loading)
  const getProjectDetails= async (ref:any) =>{
    try {
      
      setIsLoading(true)
      const res = await getSiteDetailData(ref);
      const { status, data } = res;
      switch (status) {
        case 200:
          setIsLoading(false)
          setprojectDetail(data)
          break;
        case 400:
          setIsLoading(false)
          break;
        case 403:
          if (data.detail === "ERR_login_again_token_expired")
          {
            navigate('/login')
            toast.error(t("chooseProject.error_login_again"));
            localStorage.clear()
          }
          setIsLoading(false)  
          break;
        default:
          setIsLoading(false)  
          break;
      }
    } catch (err) {
      setIsLoading(false)  
      toast.error(t("chooseProject.error_something_went_wrong"));
    }
  }
  const getContacts = async (ref: any) => {
    try {
      setIsLoading(true)  
      const res = await getAddContactList(ref,1, true);
      const { status, data } = res;
      switch (status) {
        case 200:
          setIsLoading(false)  
          setContactItems(data.results);

          break;
        case 400:
          setIsLoading(false)  
          break;
        case 403:
          setIsLoading(false)  
            if (data.detail === "ERR_login_again_token_expired") {
              toast.error(t("userManagment.error_login_again"));
              localStorage.clear()
              navigate('/login')
            }
           
            break
        default:
          setIsLoading(false)  
          break;
      }
    } catch (err) {
      setIsLoading(false)  
      toast.error(t("userManagment.error_something_went_wrong"));
    }
  };
  useEffect(() => {
  getProjectDetails(project.ref);
  getContacts(project.ref);
  }, [JSON.stringify(project)]);

  return (
    <>
      {isLoading ? <MainLoader /> : (
        <div className="page-wrapper dash-wrapper">
          {/* {projectDetail?.map((data:any) => ( */}
          <div className="page-content dashboard-cont">
            {/* <!-- dashboard banner section --> */}

            <div className="dashboard-banner">
              <img src={projectDetail?.bannerImage} className="d-banner-img" alt="" />
              <div className="dashbanner-content">
                <img src={projectDetail?.logoImage} alt="" />
                <div className="dashb-detail">
                  <p>Welcome To</p>
                  <h3>{projectDetail?.name}</h3>
                </div>
              </div>
            </div>
            {/* <!-- dashboard banner section --> */}
            <div className="d-detail">
              <div className="dtlist-sec">
                <img src={images.locationicon} alt="" />
                <p>{projectDetail?.address}</p>
              </div>
              {/* <div className="dtlist-sec">
              <img src={images.clockicon} alt="" />
              <p>{projectDetail?.time}</p>
            </div>
            <div className="dtlist-sec">
              <img src={images.calendericon} alt="" />
              <p>{projectDetail?.days}</p>
            </div> */}
            </div>

            <div className="site-contacts-wrapper">
              <div className="row">
                <div className="col-lg-7">
                  <div className="site-contact">
                    <h3>Site Contacts</h3>

                    <div className="stc-box-wrapper">
                      {contact && contact.length > 0 && contact?.map((sitedata: any) => (
                        <div className="single-stc-box">
                          <p className="c_position">{sitedata.position}</p>
                          <h4 className="c_name">{sitedata.name}</h4>
                          <p className="c_contactno">{sitedata.phone}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="col-lg-5">
                  <div className="site-content-right" >
                    <div dangerouslySetInnerHTML={{ __html: projectDetail?.message }}>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}  
      </>
  );
};

export default index;

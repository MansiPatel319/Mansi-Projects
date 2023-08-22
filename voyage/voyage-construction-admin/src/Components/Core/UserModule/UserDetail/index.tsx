import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import images from '../../../../Assets/images'
import { getUserDetailData, getUserDetailDataFromAuth } from '../../../../Network/Core/Users/UserInformation';
import Tabbar from "../../../UI/Tabbar";

import { tabs } from "../../../../StaticData/UserDetails"
import UserInformation from './UserInformation';
import AssociatedOrganization from './AssociatedOrganization';
import AssociatedProjects from './AssociatedProjects';
import UserActivity from './UserActivity';
import { Link } from 'react-router-dom';

const UserDetail = () => {
    const { ref } = useParams();
    const { region } = useParams();
    const [loading, setIsLoading] = useState(false)
    const [activeTab, setActiveTab] = useState("user-Information");
    const [userDetail, setUserDetail] = useState<any>({})
    const [createdDate,setCreatedDate] = useState('')
    const [updatedDate,setUpdatedDate] = useState('')
    const baseUrlForFrontend: any = process.env.REACT_APP_BASE_URL
    const handleClickTab = (tabName: any) => {
        setActiveTab(tabName);
    };
    const getUserDetail = async () => {
        try {
            setIsLoading(true);
            const res = await getUserDetailData(ref, region);
            const { status, data, statusText } = res;
            switch (status) {
                case 200:
                    setIsLoading(false);
                    setUserDetail(data)
                    // setProjectDetail(data);
                    break;
                case 400:
                    setIsLoading(false);
                    break;
                case 401:
                    window.open(`${baseUrlForFrontend}`, "_blank");
                    localStorage.clear();
                    setIsLoading(false);
                    break;
                case 404:
                    setIsLoading(false);
                    break;
                default:
                    setIsLoading(false);
                    break;
            }
        } catch (err) {
            setIsLoading(false);
            console.log("err :>> ", err);

        }
    };
    const getUserDetailFromAuth = async () => {
        try {
            setIsLoading(true);
            const res = await getUserDetailDataFromAuth(ref, region);
            const { status, data, statusText } = res;
            switch (status) {
                case 200:
                    setIsLoading(false);
                    console.log('data :>> ', data);
                    setCreatedDate(data.createdAt)
                    setUpdatedDate(data.modifiedAt)
                    // setProjectDetail(data);
                    break;
                case 400:
                    setIsLoading(false);
                    break;
                case 401:
                    window.open(`${baseUrlForFrontend}`, "_blank");
                    localStorage.clear();
                    setIsLoading(false);
                    break;
                case 404:
                    setIsLoading(false);
                    break;
                default:
                    setIsLoading(false);
                    break;
            }
        } catch (err) {
            setIsLoading(false);
            console.log("err :>> ", err);

        }
    };
    useEffect(() => {
        getUserDetail()
        getUserDetailFromAuth()
    }, [ref, region]);
    return (
        <div className="page-wrapper">


            <div className="page-content common-page-content projects-page-cont pro-det-cont">
                <div className="row">
                    <div className="col-md-12">
                        <div className="tab-content site-detailtab-cont mt-0" id="nav-tabContent">
                            <div className="booking-list-form">
                                <form action="javascript:void(0)">
                                    <div className="filter-wrapper projects-filter-wrappers">
                                        <div className="pro-title-with-detail">
                                            <Link to="/users" className="prodet-back-link">
                                                <img src={images.back} /><span>Back</span>
                                            </Link>
                                            <h4>{userDetail.firstName} {userDetail.lastName} <span className={`tag tag-${userDetail?.userStatusText?.toLowerCase()}`}>
                                                {userDetail?.userStatusText}
                                            </span></h4>
                                            <div className="date-tag-cust">
                                                <span className="date-ctitle">Last Login:</span>
                                                <span className="date-cval">  {new Date(createdDate).toDateString()+" "+new Date(createdDate).toLocaleTimeString ()}</span>
                                                <span className="dot"></span>
                                                <span className="date-ctitle">Account Created:</span>
                                                <span className="date-cval">{new Date(updatedDate).toDateString()+" "+new Date(updatedDate).toLocaleTimeString()}</span>
                                            </div>
                                        </div>

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
                                    {activeTab === "user-Information" && (
                                        <UserInformation userDetail={userDetail} getUserDetail={getUserDetail} />
                                    )}
                                    {activeTab === "associated-organization" && <AssociatedOrganization  userDetail={userDetail} />}
                                    {activeTab === "associated-projects" && <AssociatedProjects  userDetail={userDetail}/>}
                                    {activeTab === "user-activity" && <UserActivity />}
                                </div>
                            </div>



                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserDetail
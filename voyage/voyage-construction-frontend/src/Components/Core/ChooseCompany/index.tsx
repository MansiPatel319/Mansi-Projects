

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// component

// images
import images from "../../../Assets/images/index";

// API
import { getJoinCompanyList, postOrganizationData } from "../../../Network/Core/UserOnBoarding/userInvite";

// redux
import { setInviteUserDeatils } from "../../../Store/Actions/InviteUserModule/InviteUserActionCreatore";

// css
import "../../../Assets/css/style.css";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

export interface IChooseCompanytComponentProps {}

export default function ChooseCompanytComponent() {
  const [ChooseCompanyData, setChooseCompanyData] = useState<any>();
  const [isLoading, setIsLoading] = useState(false)
  
  const navigate = useNavigate();
  const {t} = useTranslation()
  
  
  const signupDetail = useSelector((state:any) => state.inviteuser.userdetail);
  const dispatch = useDispatch();

  const handleChooseProject = async(id: any,name:any) => {
    const orgdata ={
      organization_id: id,
      // organization: {
      //   name: name
      // },
     
    }
    try {
    const res = await postOrganizationData(orgdata,signupDetail.ref,signupDetail.project_ref);
    const { status, data, statusText } = res;
    setIsLoading(false);
    switch (status) {
      case 200:
        toast.success(t('companySetupPage.success_message'))
        dispatch(setInviteUserDeatils({ ...signupDetail, ...orgdata }))
        localStorage.clear()
        navigate("/login");
        break;
      case 400:
        toast.error('error')
        break;
      default:
        toast.error('error')
        break;
    }
   
  } catch (err) {
    console.log('err :>> ', err);
  }
   
  }

  const getCompanyList = async(email:any) => {
    try {
      const res = await getJoinCompanyList(email,signupDetail.project_ref);      
      const { status, data } = res;
      switch (status) {
        case 200:
         if(data.organization==='none' || data.organization===null){
          const orgdata={
            organization_id:data.id,
            companyname:data.organization
          }
          dispatch(setInviteUserDeatils({...signupDetail,...orgdata}))
          navigate("/setcompany");
         }
         const result:any = [];
         result.push(data);
         setChooseCompanyData(result) 
        break;
        case 400:

          break;
        default:

          break;
      }
    } catch (err) {
      console.log('err :>> ', err);
    }
  }
  useEffect(() => {
    getCompanyList(signupDetail.email);
   
  }, [signupDetail]);
  
  return (
    <div className="custom-form">
      <h2>Join Company</h2>
      <div className="Project-list">
        {ChooseCompanyData?.map((company: any) => (
          
          <div className="project-item" onClick={()=>handleChooseProject(company.id,company.organization)}>
            <img className="pl-img" src={images.project1} alt="logo" />
            <div className="pl-title">
              <p className="pl-tag">Log Into</p>
              <h4>{company.organization}</h4>
            </div>
            {/* <a>
              <img className="pl-img" src={images.rightarrow} alt="logo" />
            </a> */}
          </div>
         ))} 
        <a href="/contactus" id="nojoincom" className="custom-nojoincompanylink" style={{color: "#0B907B",textAlign:"center"}}>
          <p >I don&apos;t recognize this company</p>
        </a>
      </div>
    </div>
  );
}

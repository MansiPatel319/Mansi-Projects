import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { constants } from '../../Library/Constants';
import { getLocalStorage, setLocalStorage } from '../../Network/ApiService';
import { getAccountUserDetail } from '../../Network/Core/Dashboard/dashboard';
import { getSiteDetailData } from '../../Network/Core/SiteManagement/siteDetails';

const index = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const query = new URLSearchParams(location.search);
  const token = query.get("token");
  const tokenLocalStoarge = getLocalStorage(constants.LOGIN_TOKEN);
  
  const project = query.get("project");
  const getAccountdetails = async (ref: any) => {
    try {
     
      const res = await getAccountUserDetail(ref);
      const { status, data } = res;
      switch (status) {
        case 200:  
          setLocalStorage(constants.USER, JSON.stringify(data));
          break;
        case 400:
         
          break;
        default:
          break;
      }
    } catch (err) {
     
    }
  };
  const getProjectDetails= async (ref:any) =>{
    try {
      const res = await getSiteDetailData(ref);
      const { status, data } = res;
      switch (status) {
        case 200:
          console.log('data', data);
          setLocalStorage(constants.PROJECT, JSON.stringify(data))
          setTimeout(() => {
            
            navigate(`/home/${data.ref}`);
          }, 1000);
          break;
        case 400:
          break;
        case 403:
          if (data.detail === "ERR_login_again_token_expired")
          {
            navigate('/login')
            localStorage.clear()
          }
          break;
        default:
          break;
      }
    } catch (err) {
      toast.error(t("chooseProject.error_something_went_wrong"));
    }
  }
  useEffect(() => {

    setLocalStorage(constants.LOGIN_TOKEN,token)
  }, [token]);
  useEffect(() => {
    if (tokenLocalStoarge)
    {
      
      getProjectDetails(project)
      getAccountdetails(project)
      }
  },[tokenLocalStoarge])
  return (
    <div>
      hello
    </div>
  );
}

export default index;

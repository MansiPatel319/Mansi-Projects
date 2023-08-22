import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getUserRoles } from '../../../../Network/Core/UserOnBoarding/userInvite';
import { getOrganization } from '../../../../Network/Core/UserOnBoarding/userManagment';
import { setUserFilter } from '../../../../Store/Actions/UserManagment/userActionCreatore';
import FilterTabbar from '../../../UI/Tabbar/FilterTabbar';
import CheckboxList from './CheckboxList';
export interface UserFilterProps {
  handleClose?: any;
}
const index = ({ handleClose }: UserFilterProps) => {
  const tabs = [
        {
          tabName: 'Status',
          slug: 'status',
          id: 1
        },
        {
          tabName: 'Project role',
          slug: 'project-role',
          id: 2
        },
        {
          tabName: 'Organization',
          slug: 'organization',
          id: 3
        }]
        const [status, setStatus] = useState([
            { id: "-2", name: "Blocked", isChecked: false },
            { id: "-1", name: "Restricted", isChecked: false },
            { id: "0", name: "Invited", isChecked: false },
            { id: "1", name: "Active", isChecked: false },
          ]);
    const [activeTab, setActiveTab] = useState('status')
    const [projectRoles, setprojectRoles] = useState([]);
    const [organization, setOrganization] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
  const { project } = useParams()
  const dispatch = useDispatch()
  const filterData = useSelector((state:any)=>state.user.filterData)
    
    const handleClickTab = (tabName: any) => {
        setActiveTab(tabName)
    }
  const handleChangecheckbox = (name: any, id: any) => {
    console.log('name :>> ', name);
    console.log('id :>> ', id);
        if (name === "status") {
          const tempData = [...status];
          tempData.forEach((item: any) => {
            if (item.id === id) {
              item.isChecked = !item.isChecked;
            }
          });
    
          setStatus(tempData);
        } else if (name === "project-role") {
          const tempData = [...projectRoles];
          tempData.forEach((item: any) => {
            if (item.id === id) {
              item.isChecked = !item.isChecked;
            }
          });
          setprojectRoles(tempData);
        } else {
          const tempData = [...organization];
          tempData.forEach((item: any) => {
            if (item.id === id) {
              item.isChecked = !item.isChecked;
            }
          });
          setOrganization(tempData);
        }
    };
    const getProjectList = async () => {
        try {
          setIsLoading(true);
          const res =  await getUserRoles({
            project: project
          });
          const { status, data } = res;
          switch (status) {
            case 200:
              setIsLoading(false);
              let tempProjects:any =[...data.results]
              tempProjects = tempProjects.map((item: any) => {
                item.isChecked = false;
                return item;
              });
              if (
                filterData &&
                Object.keys(filterData)?.length > 0 &&
                filterData?.projectRoles?.length > 0
              ) {
                tempProjects = tempProjects.map((item: any) => {
                  filterData.projectRoles.filter((data: any) => {
                    if (item.id === data.id) {
                      item.isChecked = true;
                    }
                    return data;
                  });
                  return item;
                });
              }
    
              setprojectRoles(tempProjects);
    
              break;
            case 400:
              setIsLoading(false);
              break;
            case 403:
              if (data.detail === "ERR_login_again_token_expired") {
                localStorage.clear();
                // navigate("/login");
              }
              setIsLoading(false);
              break;
            default:
              setIsLoading(false);
              break;
          }
        } catch (err) {
          setIsLoading(false);
        }
      };
      const getOrganizatioList = async () => {
        try {
          setIsLoading(true);
          const res = await getOrganization(project);
          const { status, data } = res;
          switch (status) {
            case 200:
              setIsLoading(false);
              let tempOrganization:any = [...data.results]
              tempOrganization = tempOrganization.map((item: any) => {
                item.isChecked = false;
                return item;
              });
              if (
                filterData &&
                Object.keys(filterData)?.length > 0 &&
                filterData?.organization?.length > 0
              ) {
                tempOrganization =  tempOrganization.map((item: any) => {
                  filterData.organization.filter((data: any) => {
                    if (item.id === data.id) {
                      item.isChecked = true;
                    }
                    return data;
                  });
                  return item;
                });
              }
              setOrganization(tempOrganization);
    
              break;
            case 400:
              setIsLoading(false);
              break;
            case 403:
              if (data.detail === "ERR_login_again_token_expired") {
                localStorage.clear();
              }
              setIsLoading(false);
              break;
            default:
              setIsLoading(false);
              break;
          }
        } catch (err) {
          setIsLoading(false);
        }
  };
  const onApplyFilter = async () => {
    setIsLoading(true);

    const statusArray = status.filter((item: any) => item.isChecked);
    const projectRolesArray = projectRoles.filter(
      (item: any) => item.isChecked
    );
    const organizationrArray = organization.filter(
      (item: any) => item.isChecked
    );

    handleClose();
    const filterData = {
      status: statusArray,
      projectRoles: projectRolesArray,
      organization: organizationrArray,
    };
    dispatch(setUserFilter(filterData));
  };
  useEffect(() => {
    getProjectList()
    getOrganizatioList()
  }, []);
  useEffect(() => {
    if (
      filterData &&
      Object.keys(filterData).length > 0 &&
      filterData?.status
    ) {
      status.map((item: any) => {
        filterData.status.filter((data: any) => {
          if (item.id === data.id) {
            item.isChecked = true;
          }         
          return data;
        });
        return item;
      });
    }
  }, [filterData]);
    console.log('activeTab :>> ', activeTab);
  return (
    <div className="modal fade show" id="filterModal" style={{display:'block'}}>
    <div className="modal-dialog modal-lg modal-dialog-scrollable">
      <div className="modal-content">
      
       
        <div className="modal-header">
          <h4 className="modal-title">Filters</h4>
          {/* <!-- <button type="button" className="close" data-dismiss="modal">&times;</button> --> */}
        </div>
        
      
        <div className="modal-body">
            <div className="filtermodalbody-wrapper">
                <FilterTabbar  tabs={tabs} activeTab={activeTab} handleClickTab={handleClickTab} />
               

                          <div className="tab-content filtermodal-tabcontent">
                              {activeTab === 'status' && (
                                  <CheckboxList checkboxList={status} name={activeTab} handleChangeCheckbox={handleChangecheckbox} />
                              )}
                              {activeTab === 'project-role' && (
                                  <CheckboxList checkboxList={projectRoles} name={activeTab} handleChangeCheckbox={handleChangecheckbox} />
                              )}
                              {activeTab === 'organization' && (
                                  <CheckboxList checkboxList={organization} name={activeTab} handleChangeCheckbox={handleChangecheckbox} />
                              )}
                    </div>
            </div>
        </div>
        
      
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={handleClose} >Cancel</button>
          <button className="btn theme-btn " id="apply-filter" onClick={onApplyFilter}>Apply Filters</button>
        </div>
        
      </div>
    </div>
  </div>
  );
}

export default index;

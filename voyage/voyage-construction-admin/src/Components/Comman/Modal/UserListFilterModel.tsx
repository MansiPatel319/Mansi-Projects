import React, { useEffect, useState ,useRef} from "react";
import { useDispatch, useSelector } from "react-redux";

// component
import Button from "../../UI/Button";
import useOutsideClick from "./ManageOutsideClickClose";
// images
import images from "../../../Assets/images";

// API
import {
  getOrganization,
} from "../../../Network/Core/DashboardModule/dashboard";

// redux
import { setSearch } from "../../../store/Actions/ProjectModule/projectActionCreators";
import { setUserFilter } from "../../../store/Actions/UserModule/userActionCreator";

// css
import "./style.css";
import { getUserProjectList } from "../../../Network/Core/AuthModule/auth";

export interface UserListFilterProps {
  handleClose?: any;
}

const UserListFilterModel = ({ handleClose }: UserListFilterProps) => {
  const [isShowStatus, setisShowStatus] = useState(true);
  const [isShowProjectList, setIsShowProjectsList] =
    useState(false);
  const filterData = useSelector((state: any) => state.user.filterData);
  const refOutsideModel = useRef(null);
  useOutsideClick(refOutsideModel, () => {
    handleClose();
  })
  const [status, setStatus] = useState([
    { id: "-2", name: "Blocked", isChecked: false },
    { id: "-1", name: "Restricted", isChecked: false },
    { id: "0", name: "Invited", isChecked: false },
    { id: "1", name: "Active", isChecked: false },
  ]);
  const [isShowOrganizationList, setisShowOrganizationList] = useState(false);
  const [projects, setprojects] = useState([]);
  const [organization, setOrganization] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleStatusShow = () => {
    setisShowStatus(true);
    setIsShowProjectsList(false);
    setisShowOrganizationList(false);
  };
  const handleProjectsListShow = () => {
    setIsShowProjectsList(true);
    setisShowStatus(false);
    setisShowOrganizationList(false);
  };
  const handleOrganizationListShow = () => {
    setisShowOrganizationList(true);
    setIsShowProjectsList(false);
    setisShowStatus(false);
  };
  const handleChangecheckbox = (name: any, id: any) => {
    if (name === "status") {
      const tempData = [...status];
      tempData.forEach((item: any) => {
        if (item.id === id) {
          item.isChecked = !item.isChecked;
        }
      });

      setStatus(tempData);
    } else if (name === "projects") {
      const tempData = [...projects];
      tempData.forEach((item: any) => {
        if (item.id === id) {
          item.isChecked = !item.isChecked;
        }
      });
      setprojects(tempData);
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
  const onApplyFilter = async () => {
    setIsLoading(true);

    const statusArray = status.filter((item: any) => item.isChecked);
    const projectsArray = projects.filter(
      (item: any) => item.isChecked
    );
    const organizationrArray = organization.filter(
      (item: any) => item.isChecked
    );

    handleClose();
    const filterData = {
      status: statusArray,
      projects: projectsArray,
      organization: organizationrArray,
    };
    dispatch(setUserFilter(filterData));
  };
  const onClearFilter = () => {
    const tempStatus =[...status]
    tempStatus.map((item: any) => {
      item.isChecked = false;
      return item;
    });
    const filterData = {
      status: [],
      projects: [],
      organization: [],
    };
    dispatch(setUserFilter(filterData));
    dispatch(setSearch(''))
   
  }
  const getProjectList = async (filterData: any) => {
    try {
      setIsLoading(true);
      const res = await getUserProjectList(1);
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
            filterData?.projects?.length > 0
          ) {
            tempProjects = tempProjects.map((item: any) => {
              filterData.projects.filter((data: any) => {
                if (item.id === data.id) {
                  item.isChecked = true;
                }
                return data;
              });
              return item;
            });
          }

          setprojects(tempProjects);

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
  const getOrganizatioList = async (filterData: any) => {
    try {
      setIsLoading(true);
      const res = await getOrganization(1);
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
  useEffect(() => {
    getProjectList(filterData);
    getOrganizatioList(filterData);
  }, [filterData]);
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
  return (
    <div
      className="modal fade  show"
      id="filterModal"
      style={{ display: "block" }}
     
    >
      <div className="modal-dialog modal-lg modal-dialog-scrollable">
        <form style={{ width: "750px" }}  ref={refOutsideModel}>
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Filters</h4>

              <Button
                buttonLabel="Close   &times;"
                className="close_filter"
                handleClick={handleClose}
              />
            </div>

            <div className="modal-body">
              <div className="filtermodalbody-wrapper">
                <ul
                  className="nav nav-tabs filter-tabs"
                  id="myTab"
                  role="tablist"
                >
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      data-toggle="tab"                    
                      role="tab"
                      aria-controls="area"
                      onClick={() => handleStatusShow()}
                    >
                      <span>Status</span>
                      <span>
                        <img src={images.forword} alt="forword" />
                      </span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      data-toggle="tab"                      
                      role="tab"
                      aria-controls="recipient-company"
                      onClick={() => handleProjectsListShow()}
                    >
                      <span>Projects</span>{" "}
                      <img src={images.forword} alt="forword" />
                    </a>
                  </li>
                  <li className="nav-item">
                    
                    <a
                      className="nav-link"
                      data-toggle="tab"                      
                      role="tab"
                      aria-controls="event"
                      onClick={() => handleOrganizationListShow()}
                    >
                      <span>Organization</span>
                      <img src={images.forword} alt="forword" />
                    </a>
                  </li>
                </ul>

                <div className="tab-content filtermodal-tabcontent">
                  {isShowStatus && (
                    <div
                      className="tab-pane"
                      id="area"
                      style={{ display: "block" }}
                      role="tabpanel"
                    >
                      <div className="filtercheck-list">
                        {status.map((statusItem:any) => (
                          <div className="filtercheck-item">
                            <input
                              type="checkbox"
                              name={`projects:${statusItem.id}`}
                              checked={statusItem.isChecked}
                              onChange={() =>
                                handleChangecheckbox("status", statusItem.id)
                              }
                            />
                            <span className="fci-title">{statusItem.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {isShowProjectList && (
                    <div
                      className="tab-pane"
                      id="projects"
                      style={{ display: "block" }}
                      role="tabpanel"
                    >
                      <div className="filtercheck-list">
                        {projects?.map((item: any) => (
                          <div className="filtercheck-item">
                            <input
                              type="checkbox"
                              name={`projects:${item.id}`}
                              checked={item.isChecked}
                              onChange={() =>
                                handleChangecheckbox("projects", item.id)
                              }
                            />
                            <span className="fci-title">{item.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {isShowOrganizationList && (
                    <div
                      className="tab-pane"
                      id="organization"
                      style={{ display: "block" }}
                      role="tabpanel"
                    >
                      <div className="filtercheck-list">
                        {organization?.map((item: any) => (
                          <div className="filtercheck-item">
                            <input
                              type="checkbox"
                              name={`orgnaization:${item.id}`}
                              checked={item.isChecked}
                              onChange={() =>
                                handleChangecheckbox("orgnaization", item.id)
                              }
                            />
                            <span className="fci-title">{item.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button onClick={()=>onClearFilter()} type="reset" className="reset" data-dismiss="modal">
                Reset Filter
              </button>
              <Button
                buttonLabel="Apply Filters"
                handleClick={() => onApplyFilter()}
                className="btn theme-btn"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserListFilterModel;

import React, { useEffect, useState ,useRef} from "react";
import { useDispatch, useSelector } from "react-redux";

// component
import Button from "../../UI/Button";
import useOutsideClick from "./ManageOutsideClickClose";
// images
import images from "../../../Assets/images";

// API
import {
  getAccoutManager,
  getOrganization,
} from "../../../Network/Core/DashboardModule/dashboard";

// redux
import { setProjectFilter, setSearch } from "../../../store/Actions/ProjectModule/projectActionCreators";

// css
import "./style.css";

export interface ProjectListFilterProps {
  handleClose?: any;
}

const ProjectListFilter = ({ handleClose }: ProjectListFilterProps) => {
  const [isShowStatus, setisShowStatus] = useState(true);
  const [isShowAccountManagerList, setisSHowAccountManagerList] =
    useState(false);
  const filterData = useSelector((state: any) => state.project.filterData);
  const refOutsideModel = useRef(null);
  useOutsideClick(refOutsideModel, () => {
    handleClose();
  })
  const [status, setStatus] = useState([
    { id: "pre-live", name: "Pre-Live", isChecked: false },
    { id: "active", name: "Active", isChecked: false },
    { id: "paused", name: "Paused", isChecked: false },
    { id: "finished", name: "Finished", isChecked: false },
  ]);
  const [isShowOrganizationList, setisShowOrganizationList] = useState(false);
  const [accountManager, setAccountManager] = useState([]);
  const [organization, setOrganization] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleStatusShow = () => {
    setisShowStatus(true);
    setisSHowAccountManagerList(false);
    setisShowOrganizationList(false);
  };
  const handleAccountMangerListShow = () => {
    setisSHowAccountManagerList(true);
    setisShowStatus(false);
    setisShowOrganizationList(false);
  };
  const handleOrganizationListShow = () => {
    setisShowOrganizationList(true);
    setisSHowAccountManagerList(false);
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
    } else if (name === "account-manager") {
      const tempData = [...accountManager];
      tempData.forEach((item: any) => {
        if (item.id === id) {
          item.isChecked = !item.isChecked;
        }
      });
      setAccountManager(tempData);
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
    const accountManagerArray = accountManager.filter(
      (item: any) => item.isChecked
    );
    const organizationrArray = organization.filter(
      (item: any) => item.isChecked
    );

    handleClose();
    const filterData = {
      status: statusArray,
      accountManager: accountManagerArray,
      organization: organizationrArray,
    };
    dispatch(setProjectFilter(filterData));
  };
  const onClearFilter = () => {
    const tempStatus =[...status]
    tempStatus.map((item: any) => {
      item.isChecked = false;
      return item;
    });
    const filterData = {
      status: [],
      accountManager: [],
      organization: [],
    };
    dispatch(setProjectFilter(filterData));
    dispatch(setSearch(''))
   
  }
  const getAccountManagerList = async (filterData: any) => {
    try {
      setIsLoading(true);
      const res = await getAccoutManager(1);
      const { status, data } = res;
      switch (status) {
        case 200:
          setIsLoading(false);
          console.log('data :>> ', data);
          let tempAccountManager:any = [...data.results]
          tempAccountManager = tempAccountManager.map((item: any) => {
            item.isChecked = false;
            return item;
          });
          if (
            filterData &&
            Object.keys(filterData)?.length > 0 &&
            filterData?.accountManager?.length > 0
          ) {
            tempAccountManager= tempAccountManager.map((item: any) => {
              filterData.accountManager.filter((data: any) => {
                if (item.id === data.id) {
                  item.isChecked = true;
                }
                return data;
              });
              return item;
            });
          }

          setAccountManager(tempAccountManager);

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
    getAccountManagerList(filterData);
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
                      href="#status"
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
                      href="#accountManager"
                      role="tab"
                      aria-controls="recipient-company"
                      onClick={() => handleAccountMangerListShow()}
                    >
                      <span>Account Manager</span>{" "}
                      <img src={images.forword} alt="forword" />
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      data-toggle="tab"
                      href="#organization"
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
                              name={`accountManager:${statusItem.id}`}
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
                  {isShowAccountManagerList && (
                    <div
                      className="tab-pane"
                      id="accountManager"
                      style={{ display: "block" }}
                      role="tabpanel"
                    >
                      <div className="filtercheck-list">
                        {accountManager?.map((item: any) => (
                          <div className="filtercheck-item">
                            <input
                              type="checkbox"
                              name={`accountManager:${item.id}`}
                              checked={item.isChecked}
                              onChange={() =>
                                handleChangecheckbox("account-manager", item.id)
                              }
                            />
                            <span className="fci-title">{item.email}</span>
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

export default ProjectListFilter;

import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useNavigate, useParams } from 'react-router';
import toast from "react-hot-toast";
import Select from 'react-select'
import ReactPaginate from 'react-paginate';

// component
import UserProfileModal from "../../Comman/Modal/UserProfileModal"
import Loader from '../../UI/Loader'

import images from "../../../Assets/images";
// css
import "./style.css";
import { getLocalStorage } from "../../../Network/ApiService";
import { constants } from "../../../Library/Constants";

// css
import "../../../Assets/css/style.css";

import Button from "../../UI/Button";
import { getUserList, getUserRoles } from '../../../Network/Core/UserOnBoarding/userInvite';
import { useDispatch, useSelector } from 'react-redux';
import { setSearch, setUserFilter, updateUser } from '../../../Store/Actions/UserManagment/userActionCreatore';
import { useTranslation } from 'react-i18next';
import { updateProjectRole } from '../../../Network/Core/UserOnBoarding/userManagment';

export interface UserManageProps {
  handleClickModal?: () => void;
  handleClickUserDetailModal: (id: any) => void;
  handleClickFilterModal?: (e: any) => void;
  isShowUserProfileModel: boolean
}

const index = ({ isShowUserProfileModel, handleClickModal, handleClickUserDetailModal, handleClickFilterModal }: UserManageProps) => {
  const projectRole = getLocalStorage(constants.USER)?.projectRole;
  const { project } = useParams();
  const [userData, setUserData] = useState<any>([]);
  const [projectRoleList, setProjectRoleList] = useState<any>([]);
  const [filterCount, setFilterCount] = useState<any>([]);
  const filterData = useSelector((state: any) => state.user.filterData);
  const updateUserData = useSelector((state: any) => state.user.updateUser);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [filterStatus, setFilterStatus] = useState("");
  const [projectRoles, setprojectRoles] = useState("");
  const [organization, setOrganization] = useState("");
  const search = useSelector((state: any) => state.user.search)
  const [searchvalue, setsearchvalue] = useState("");
  const [pageCount, setPageCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const [page, setPage] = useState(1);
  const perPage: number = 10;
  const { t } = useTranslation()

  console.log('projectRoleList :>> ', projectRoleList);
  // const handleRoleChange = async (value: any, userid: number) => {


  // }
  const handlePageClick = (data: any) => {
    const { selected } = data;

    setPage(selected + 1)
  };

  const clearFilter = (filter: any) => {
    const tempFilterData = {
      status: filterData.status,
      organization: filterData.organization,
      projectRoles: filterData.projectRoles,
    };
    switch (filter) {
      case "status":
        tempFilterData.status = [];
        setFilterStatus("");
        break;
      case "organization":
        tempFilterData.organization = [];
        setOrganization("");
        break;
      case "projectRoles":
        tempFilterData.projectRoles = [];
        setprojectRoles("");
        break;
      case "all":
        tempFilterData.status = [];
        tempFilterData.organization = [];
        tempFilterData.projectRoles = [];
        break;
      default:
        break;
    }
    console.log('tempFilterData :>> ', tempFilterData);

    dispatch(setUserFilter(tempFilterData));
    dispatch(setSearch(''))
  };

  const getUserRole = async () => {
    try {
      const res = await getUserRoles({
        project: project
      });
      const { status, data } = res;
      // setIsLoading(false);
      switch (status) {
        case 200:
          const tempRole = res.data.results.map((role: any) => {
            return ({
              value: role.id,
              label: role.name
            })
          })
          setProjectRoleList(tempRole)
          setTimeout(() => {

            getUserDetails(filterData, search, tempRole)
          }, 1000
          )
          break;
        case 400:
          break;
        case 403:
          // if (data.detail === "ERR_login_again_token_expired") {
          //   toast.error(t("userManagment.error_login_again"));
          //   localStorage.clear()
          //   navigate('/login')
          // }
          // setIsLoading(false)
          break
        default:

          break;
      }
    } catch (err) {
      console.log('err :>> ', err);
      // toast.error(t("forgotPassword.error_something_went_wrong"));
    }
  }
  const getUserDetails = async (Data: any, search: string, projectRoleList: any) => {
    let newArray: any = []
    // dispatch(setLoader(true))
    // alert(getLocalStorage('user').projectRole === constants.PROJECT_USER)
    if (getLocalStorage('user').projectRole === constants.PROJECT_USER) {
      navigate(`/home/${project}`)
      return true
    }
    setIsLoading(true)
    let statusIds: string = "";
    let statusValues: string = "";
    let organizationIds: string = "";
    let organizationValues: string = "";
    let projectRoleIds: string = "";
    let projectRoleValues: string = "";
    console.log('Data :>> ', Data);
    if (Data && Object.keys(Data).length > 0) {
      statusIds = Data?.status
        ?.map((statusItem: any) => statusItem.id).join(",");
      projectRoleIds = Data?.projectRoles
        ?.map((statusItem: any) => statusItem?.name.split(" ")[1].toLowerCase())
        .join(",");
      organizationIds = Data?.organization
        ?.map((statusItem: any) => statusItem.id)
        .join(",");


      for (let index = 0; index < Data?.status?.length; index++) {
        if (index !== Data.status.length - 1) {

          statusValues += Data.status[index].name + ', ';
        }
        else {
          statusValues += Data.status[index].name
        }
      }
      for (let index = 0; index < Data?.organization?.length; index++) {
        if (index !== Data.organization.length - 1) {

          organizationValues += Data?.organization[index]?.name + ', ';
        }
        else {
          organizationValues += Data?.organization[index]?.name
        }
      }
      for (let index = 0; index < Data?.projectRoles?.length; index++) {
        if (index !== Data.projectRoles.length - 1) {

          projectRoleValues += Data?.projectRoles[index]?.name + ', ';
        }
        else {
          projectRoleValues += Data?.projectRoles[index]?.name
        }
      }


      setFilterStatus(statusValues);
      setOrganization(organizationValues);
      setprojectRoles(projectRoleValues);
    }


    try {

      const res = await getUserList(statusIds || "",
        projectRoleIds || "",
        organizationIds || "",
        search,
        project);
      const { status, data } = res;
      switch (status) {
        case 200:
          setIsLoading(false)
          data.results.forEach((item: any) => {


            item.projectRoleId = item?.projects?.find((prj: any) => prj?.projectRef === project).role
            item.projectRoleName = projectRoleList?.find((prj: any) => prj.value === item.projectRoleId).label

          })

          setUserData(data?.results)
          setPageCount(Math.ceil(data.count / perPage));
          break;
        case 400:
          setIsLoading(false)
          toast.error(data.detail);

          break;
        case 401:
          setIsLoading(false)
          toast.error(data.detail);
          localStorage.clear();

          break;
        default:
          setIsLoading(false)
          toast.error(data.detail);

          break;
      }
    } catch (err) {

      setIsLoading(false)

    }
  };
  const onChange = (e: any) => {
    const { value } = e.target;
    setsearchvalue(value);
  };
  const onkeydown = (e: any) => {
    if (e.keyCode === 13 && !e.shiftKey) {
      getUserDetails(filterData, e.target.value, projectRoleList)
      dispatch(setSearch(e.target.value))
    }
  }
  const onBlur = (e: any) => {
    getUserDetails(filterData, e.target.value, projectRoleList)
    dispatch(setSearch(e.target.value))
  }

  useEffect(() => {
    dispatch(setSearch(""))
  })
  useEffect(() => {
    setsearchvalue(search)
    getUserRole();
    setFilterCount([]);

    let countArray: any[] = [];
    for (let i in filterData) {
      if (filterData[i]?.length > 0) {
        countArray.push(filterData[i]);
        setFilterCount(countArray);
      }
    }

  }, [filterData]);
  const handleRoleChange = async (value: any, userid: number) => {
    try {
      const projectRoleData = {
        "user_id": userid,
        "project_role": value.value
      }

      const res = await updateProjectRole(project, projectRoleData);
      const { status, data } = res;
      switch (status) {
        case 200:
          toast.success(t("oranization Role updated"));
          getUserDetails(filterData, search, projectRoleList)

          break;
        case 400:

          break;
        case 403:
          if (data.detail === "ERR_login_again_token_expired") {
            navigate('/login')
            toast.error(t("chooseProject.error_login_again"));
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
    if (updateUserData) {

      getUserDetails(filterData, searchvalue, projectRoleList);
      dispatch(updateUser(false))
    }
  }, [updateUserData])
  console.log('projectRole', projectRole);
  return (
    <>
      {isLoading ? <Loader /> :
        <div className="page-wrapper">
          <div className="page-header">
            <h3 className="page-title">User Management</h3>
            {/* <div className="extra">
              <Link to="#">
                <img src={images.search} alt="" />
              </Link>
            </div> */}
          </div>
          <div className="page-content user-management-cont">

            <div className="user-head-sec">
              <div className="booking-list-form">

                <div className="filter-wrapper">
                  <div className="f-left">
                    <div className="form-group form-inline filter-search ml-0">
                      <img src={images.search} />
                      <input type="text" className="form-control" name="" value={searchvalue} onChange={(e: any) => onChange(e)}
                        onKeyDown={(e: any) => onkeydown(e)}
                        onBlur={(e: any) => onBlur(e)} />
                    </div>
                    <button
                      className="btn white-btn filter-btn"
                      onClick={handleClickFilterModal}
                    >
                      Filter <img src={images.plusTheme} />
                    </button>
                  </div>
                  {/* <button className="btn white-btn dl-btn">
                        <img src="images/download.png" />
                    </button> */}
                </div>

                {filterCount?.length > 0 &&
                  <div className="filter-data-box glob-sec-filter">
                    <div className="f_header">
                      <p className="f-text">
                        Filters: {filterCount.length}
                      </p>
                      <div className="divide"> </div>
                      <Link
                        to="#"
                        onClick={() => {
                          clearFilter("all");
                        }}
                      >
                        Clear All
                      </Link>
                    </div>
                    <div className="selected-filter ">
                      {filterStatus && (
                        <div className="sf">
                          <div className="sf-title">Status:&nbsp;</div>
                          <span className="sf-text">&nbsp;{filterStatus}</span>
                          <Link
                            to="#"
                            onClick={() => {
                              clearFilter("status");
                            }}
                          >
                            <img
                              src={images.cross}
                              alt="close"
                              className="cross-img"
                            />
                          </Link>
                        </div>
                      )}
                      {projectRoles && (
                        <div className="sf">
                          <span className="sf-title">
                            Project Roles:&nbsp;
                          </span>
                          <span className="sf-text">
                            &nbsp;
                            {projectRoles}
                          </span>
                          <Link
                            to="#"
                            onClick={() => {
                              clearFilter("projectRoles");
                            }}
                          >
                            <img
                              src={images.cross}
                              alt="close"
                              className="cross-img"
                            />
                          </Link>
                        </div>
                      )}
                      {organization && (
                        <div className="sf">
                          <span className="sf-title">Organization:&nbsp;</span>
                          <span className="sf-text"> &nbsp;{organization}</span>
                          <Link
                            to="#"
                            onClick={() => {
                              clearFilter("organization");
                            }}
                          >
                            <img
                              src={images.cross}
                              alt="close"
                              className="cross-img"
                            />
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                }

              </div>

              <div className="user-head-sec-btn">
                {(projectRole === constants.PROJECT_ADMIN ||
                  projectRole === constants.PROJECT_OWNER) && (
                    <Button
                      buttonLabel="Invite Users"
                      handleClick={handleClickModal}
                      varient=""
                      size=""
                      className="btn theme-btn invite-btn"
                    />
                  )}
              </div>
            </div>
            {/* <div className="page-wrapper"> */}


            <div className="booking-list-wrapper">
              <div className="shows-entries text-right">
                <p> Showing 8 entries of 126 entries</p>
              </div>

              <div className="booking-list-data">
                <div className="tab-content" id="pills-tabContent">
                  <div
                    className="tab-pane fade show active"
                    id="pills-all"
                    role="tabpanel"
                    aria-labelledby="pills-all-tab">
                    <div className="table-responsive">
                      <table
                        id="example"
                        className="display nowrap dataTable"
                        style={{ width: "100%" }}>
                        <thead>
                          <tr>
                            <th>Status</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email Address</th>
                            <th>Associated Organization</th>
                            <th>Project Role</th>
                          </tr>
                        </thead>
                        <tbody>
                          {userData.length > 0 ? (userData?.map((rowItem: any, index: number) =>
                            <tr className="odd" key={index} >

                              <td className="sorting_1" onClick={() => handleClickUserDetailModal(rowItem.ref)}><span className={`tag tag-${rowItem?.userStatusText?.toLowerCase()}`}>{rowItem?.userStatusText}</span></td>
                              <td onClick={() => handleClickUserDetailModal(rowItem.ref)}>{rowItem.firstName}</td>
                              <td onClick={() => handleClickUserDetailModal(rowItem.ref)}>{rowItem.lastName}</td>
                              <td onClick={() => handleClickUserDetailModal(rowItem.ref)}>{rowItem.email}</td>
                              <td onClick={() => handleClickUserDetailModal(rowItem.ref)}>{`${rowItem?.organization !== null ? `${rowItem?.organization?.name} ` : ""} `}</td>
                              <td>
                                <div className="form-group mb-0">
                                  <Select
                                    // inputRef={ref}
                                    classNamePrefix="form-control-language"
                                    options={projectRoleList}
                                    id="orgRole"
                                    placeholder="Select Role"
                                    name="orgRole"
                                    onChange={(e) => handleRoleChange(e, rowItem?.id)}
                                    value={{ label: rowItem?.projectRoleName, value: rowItem?.projectRoleId }}
                                    isDisabled={projectRole !== constants.PROJECT_ADMIN &&
                                      projectRole !== constants.PROJECT_OWNER}
                                  />
                                </div>
                              </td>
                            </tr>
                          )) :
                            <tr className="odd" >
                              <td className="td-no-found" colSpan={6}>No Data found</td>
                            </tr>


                          }

                        </tbody>
                      </table>
                    </div>
                    {userData.length > 0 ? (
                      <div className="pagination-div">
                        <ReactPaginate


                          breakLabel={
                            <Link
                              to="#"
                              role="button"
                              className="page-link page-item"
                              tabIndex={0}
                              aria-current="page"
                            >
                              ...
                            </Link>
                          }
                          breakClassName="page-item"
                          pageCount={pageCount}
                          marginPagesDisplayed={2}
                          pageRangeDisplayed={5}
                          // perPage={perPage}
                          onPageChange={handlePageClick}
                          containerClassName="pagination"
                          pageClassName="page-item"
                          pageLinkClassName="page-link"
                          previousClassName="page-item"
                          nextClassName="page-item"
                          previousLinkClassName="page-link"
                          nextLinkClassName="page-link"
                          activeClassName="active"
                          disabledClassName="page-item disabled"
                          activeLinkClassName="page-item"
                          previousLabel={<div><i className="fa fa-caret-left" aria-hidden="true" /></div>}
                          nextLabel={<div><i className="fa fa-caret-right" aria-hidden="true" /></div>}
                        />
                      </div>
                    ) :
                      ''
                    }
                  </div>

                </div>
              </div>

            </div>
          </div>

        </div>
      } </>
  );
};

export default index;

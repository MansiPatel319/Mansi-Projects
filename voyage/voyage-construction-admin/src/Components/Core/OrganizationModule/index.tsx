
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

// component

import Button from "../../UI/Button";

// images

import images from "../../../Assets/images";

// redux

import { setLoader, setProjectFilter, setSearch } from "../../../store/Actions/ProjectModule/projectActionCreators";

// API
import {
  getOrganizationwithFilter,
  getRegionsList,
} from "../../../Network/Core/AuthModule/auth";

// css
import "../../../Assets/css/style.css";
import "./style.css";
import "../../../Assets/css/common.css";
import "../../../Assets/css/booking-list.css";
import "../../../Assets/css/booking-form.css";
import "../../../Assets/css/site-management.css";
import "../../../Assets/css/global-admin.css";
import "../../../Assets/css/cutstmize.css";

// css

import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { setOrganizationFilter } from "../../../store/Actions/OrganizationModule/organizationActionCreator";
import ReactPaginate from "react-paginate";

export interface IIndexProps {
  handleClickModal: () => void;
}
export default function index({ handleClickModal }: IIndexProps) {
  const perPage=10
  const { t } = useTranslation()
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [filterCount, setFilterCount] = useState<any>([]);
  const filterData = useSelector((state: any) => state.organization.filterData);
  const showAddProjectModal = useSelector((state: any) => state.project.showAddProjectModal)
  const [totalCount, setTotalCount] = useState(0)
  const [activeCount, setActiveCount] = useState(0)
  const search = useSelector((state: any) => state.project.search)
  const [searchvalue, setsearchvalue] = useState("");

  const [organizationList, setorganizationList] = useState<any>([]);
  const loading = useSelector((state: any) => state.project.loading);
  const [isLoading, setIsLoading] = useState<any>(false);
  const baseUrlForFrontend: any = process.env.REACT_APP_BASE_URL
  const [projects, setprojects] = useState("");

  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(1); 
  const onChange = (e: any) => {
    const { value } = e.target;
    setsearchvalue(value);
  };
  const handlePageClick = (data:any) => {
    const { selected } = data;   
    setPage(selected+1)
  };
  const onkeydown = (e: any) => {
    if (e.keyCode === 13 && !e.shiftKey) {
      // dispatch(setLoader(true))
      getUserDetails(filterData, e.target.value)
      dispatch(setSearch(e.target.value))
    }
  }
  const onBlur = (e: any) => {
    // dispatch(setLoader(true))
    getUserDetails(filterData, e.target.value)
    dispatch(setSearch(e.target.value))
  }

  const handleRowClick = (id: number, region: any) => {
    navigate(`/information/organization/${id}/${region}`);
  };
  const handleChangeRow = (url: any) => {
    if (url == null) {
      navigate(`/`);
    }
    else {
      window.open(
        url,
        '_blank'
      );

    }
  }


  const clearFilter = (filter: any) => {
    const tempFilterData = {
      projects: filterData.projects,
    };
    switch (filter) {
      case "projects":
        tempFilterData.projects = [];
        setprojects("");
        break;
      case "all":
        tempFilterData.projects = [];
        break;
      default:
        break;
    }
    dispatch(setOrganizationFilter(tempFilterData));
  };

  const getAllRegionData = async (Data: any, search: any, projectRefIds: Array<string>) => {
    let newArray: any = []
    // dispatch(setLoader(true))
    let projectIds: string = "";
    let projectValues: string = "";
    if (Data && Object.keys(Data).length > 0) {
      projectIds = Data?.projects
        ?.map((statusItem: any) => statusItem.ref)
        .join(",");

      for (let index = 0; index < Data?.projects?.length; index++) {
        if (index !== Data.projects.length - 1) {

          projectValues += Data?.projects[index]?.name + ', ';
        }
        else {
          projectValues += Data?.projects[index]?.name
        }
      }

      setprojects(projectValues);;
    }


    await Promise.all(
      projectRefIds.map(async (item: any) => {

        await getOrganizationwithFilter(
          projectIds || "",
          search,
          item,
          page,
          perPage
        )
          .then((responseData) => {

            setIsLoading(false);
            dispatch(setLoader(false))
            const { data, status } = responseData
            switch (status) {
              case 200:
                responseData.data.results.forEach((userItem: any) => {
                  userItem.region = item
                })
                newArray.push(responseData.data.results);
                setPageCount(Math.ceil(responseData.data.count / perPage));
                setTotalCount(responseData.data.count)
                setActiveCount(responseData.data.totalLive)
                break
              case 401:

                localStorage.clear();
                // window.open(`${baseUrlForFrontend}`, "_blank");

                break;
              default:
                break;

            }


          })
          .catch((err) => {
            console.log('err :>> ', err);
            dispatch(setLoader(false))

          });
        return item;
      })
    )
    setorganizationList(newArray[0])


  }


  const getUserDetails = async (Data: any, search: any) => {
    // dispatch(setLoader(true))
    try {

      const res = await getRegionsList();
      const { status, data } = res;
      switch (status) {
        case 200:
          const combineProjectRef = data.map((item: any) => item?.id)
          getAllRegionData(Data, search, combineProjectRef)

          break;
        case 400:
          toast.error(data.detail);
          dispatch(setLoader(false))
          break;
        case 401:
          toast.error(data.detail);
          localStorage.clear();
          window.open(`${baseUrlForFrontend}`, "_blank");
          dispatch(setLoader(false))
          break;
        default:
          toast.error(data.detail);
          dispatch(setLoader(false))
          break;
      }
    } catch (err) {
      dispatch(setLoader(false))
      toast.error(t("siteDetail.error_something_went_wrong"));
    }
  };
    useEffect(() => {
  
      getUserDetails(filterData,searchvalue)
      setFilterCount([]);
      
      let countArray: any[] = [];
      for (let i in filterData) {
        if (filterData[i]?.length > 0) {
          countArray.push(filterData[i]);
          setFilterCount(countArray);
        }
      }
    
      
    
    }, [filterData]);


  useEffect(() => {
    if (!showAddProjectModal) {

      getUserDetails(filterData, searchvalue)

    }

  }, [showAddProjectModal])
  useEffect(() => {
    getUserDetails(filterData, searchvalue)
  }, [page]);
  useEffect(() => {
    getUserDetails(filterData, searchvalue)
  }, []);
  
 

  useEffect(() => {
    if (search === "") {
      clearFilter('')
      setsearchvalue('')
      getUserDetails(filterData, '')
    }

  }, [search])

  return (
    <>
      {loading ? '' :
        <div id="wrapper">
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <div className="page-wrapper">
                <div className="page-content common-page-content projects-page-cont">
                  <div className="">
                    <div className="col-md-12">
                      <div
                        className="tab-content site-detailtab-cont mt-0"
                        id="nav-tabContent"
                      >
                        <div className="booking-list-form">

                          <div className="filter-wrapper projects-filter-wrappers">
                            <div className="pro-title-with-detail">
                              <h4>Organizations</h4>
                              <div className="pro-detail-tag">
                                <span className="text">{totalCount} Total Organizations</span>
                              </div>
                            </div>
                            <div className="f-left">
                              <div className="ml-0 mb-0 form-group form-inline filter-search">
                                <img src={images.search} alt="" />
                                <input
                                  placeholder="Search by Organization Name"
                                  name="search"
                                  value={searchvalue}
                                  id="organizationList_search"
                                  onChange={(e: any) => onChange(e)}
                                  onKeyDown={(e: any) => onkeydown(e)}
                                  onBlur={(e: any) => onBlur(e)}
                                  type="text"
                                  className="form-control"
                                />
                              </div>
                              <Button
                                // eslint-disable-next-line prefer-template
                                buttonLabel="Filter"
                                buttonIcon={<img src={images.plusTheme} alt="" />}
                                handleClick={handleClickModal}
                                varient=""
                                size=""
                                className="btn mb-0 white-btn filter-btn"
                              />

                            </div>
                          </div>
                          {filterCount.length &&
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

                                {projects && (
                                  <div className="sf">
                                    <span className="sf-title">
                                      Projects:&nbsp;
                                    </span>
                                    <span className="sf-text">
                                      &nbsp;
                                      {projects}
                                    </span>
                                    <Link
                                      to="#"
                                      onClick={() => {
                                        clearFilter("projects");
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
                        <div className="filter-data-box glob-sec-filter">
                          <div className="sh-result text-right">
                            <p className="f-text entiries">Showing {organizationList.length} entries of {totalCount} entries</p>

                          </div>

                        </div>

                        <div className="table-responsive main-street-table">
                          <div className="org-table">
                            <div className="table-responsive">
                             

                                  <table id="example" className="display nowrap dataTable " style={{ width: "100%" }}>
                                    <thead>
                                      <tr>
                                        <th>Organization Name</th>
                                        <th>Organization Admin</th>
                                        <th>Address</th>
                                        <th>Associated Projects</th>
                                      </tr>
                                    </thead>
                                <tbody>
                                  {!organizationList || organizationList?.length === 0 && (
                                        <tr className="odd" >
                                          <td className="td-no-found" colSpan={4}>No Data found</td>
                                            </tr>
                                      )}
                                      {organizationList?.map((user: any, index: any) => (
                                        <tr className="odd" key={index} onClick={() => handleRowClick(user.id, user.region)}>
                                          <td >{user.name}</td>
                                          <td >{user?.organizationAdmin[0]?.firstName?user?.organizationAdmin[0]?.firstName:'' + " " + user?.organizationAdmin[0]?.lastName?user?.organizationAdmin[0]?.lastName:''}<br />
                                            {user.organizationAdmin.length - 1 > 0 &&
                                              <>
                                                <img src={images.OrgListusericon} className="stroke-img" /> <span></span>
                                                <span>+ {user.organizationAdmin.length - 1 > 0 ? user.organizationAdmin.length - 1 : ''}  others</span>
                                              </>
                                            }
                                          </td>
                                          <td>{user?.address1 == null ? '' : user?.address1 + "," + user?.address2 == null ? '' : user?.address2 + ", " + user?.city == null ? '' : user?.city + ", " + user?.country == null ? '' : user?.country}</td>
                                          <td>{user.projects[0]?.name}<br />
                                            {user.projects.length - 1 > 0 &&
                                              <>
                                                <img src={images.strockGreen} className="stroke-img" /> <span></span>
                                                <span>+ {user.projects.length - 1 > 0 ? user.projects.length - 1 : ''}  others</span>
                                              </>
                                            }

                                          </td>


                                        </tr>
                                      ))}

                                    </tbody>
                                  </table>

                             
                            </div>
                          </div>
                        </div>
                        {organizationList?.length > 0 && (
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
                        )}
                        
                      
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      }

    </>
  );
}


import React, { useEffect, useState,useRef } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MDBDataTableV5 } from "mdbreact";

// component

import Input from "../../UI/Input";
import Button from "../../UI/Button";

// images

import images from "../../../Assets/images";

// redux

import { setLoader, setProjectFilter, setSearch } from "../../../store/Actions/ProjectModule/projectActionCreators";

// API
import {
  getRegionsList,
  getUserProjectListwithFilter,
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
import Loader from "../../../Components/UI/Loader"

// css

import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import ReactPaginate from "react-paginate";

export interface IIndexProps {
  handleClickModal: () => void;
}
export default function index({ handleClickModal }: IIndexProps) {
  const perPage:number  = 10;
  const { t } = useTranslation()
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [filterCount,setFilterCount]=useState<any>([]);
  const filterData = useSelector((state: any) => state.project.filterData);
  const showAddProjectModal = useSelector((state:any)=>state.project.showAddProjectModal)
  const search = useSelector((state:any)=>state.project.search)
  const [totalCount,setTotalCount] = useState(0)
  const [activeCount,setActiveCount] = useState(0)
  const [searchvalue, setsearchvalue] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [accountManager, setAccountManager] = useState("");
  const [organization, setOrganization] = useState("");
  const isCalledRef = useRef(false);
  const loading = useSelector((state: any) => state.project.loading);
  const [isLoading, setIsLoading] = useState<any>(false);
  const baseUrlForFrontend:any = process.env.REACT_APP_BASE_URL 
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(1);
  const [datatable, setDatatable] = React.useState({
    columns: [

      {
        label: "Status",
        field: "Status",
        width: 250,
        sort: 'disabled',
      },
      {
        label: "Project Name",
        field: "ProjectName",
        width: 100,
        sort: 'asc',
      },
      {
        label: "Project Organization",
        field: "ProjectOrganization",
        width: 150,
        sort: 'asc',
      },
      {
        label: "Address",
        field: "Address",
        width: 100,
        sort: 'asc',
      },
      {
        label: "Account Manager",
        field: "AccountManager",
        width: 100,
        sort: 'asc',
      },
      {
        label: "Hubspot",
        field: "Hubspot",
        width: 100,
        sort: 'disabled',
      },
    ],
    rows: [
      {
      
      },
    ],
  });
  const handlePageClick = (data:any) => {
    const { selected } = data;
    setPage(selected+1)
  };
  const onChange = (e: any) => {
    const { value } = e.target;
    setsearchvalue(value);
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
  
  const handleRowClick = (ref: number) => {
    navigate(`/information/project/${ref}`);
  };
  const handleClickhubspot = (e:any, url:any) => {
    e.stopPropagation()
    if(url==null){
      navigate(`/`);
    }
    else {
      console.log('url.startsWith', url.startsWith('https') || url.startsWith('http'));
      window.open((url.startsWith('https') || url.startsWith('http'))===true?`${url}`:`//${url}`, "_blank");

   
    }
  }
  


  const clearFilter = (filter: any) => {
    const tempFilterData = {
      status: filterData.status,
      organization: filterData.organization,
      accountManager: filterData.accountManager,
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
      case "accountmanager":
        tempFilterData.accountManager = [];
        setAccountManager("");
        break;
      case "all":
        tempFilterData.status = [];
        tempFilterData.organization = [];
        tempFilterData.accountManager = [];
        break;
      default:
        break;
    }
    dispatch(setProjectFilter(tempFilterData));
    dispatch(setSearch(''))
  };
 
  const getAllRegionData = async (Data: any, search: any, projectRefIds: Array<string>) => {
    let newArray:any =[]
    // dispatch(setLoader(true))

    let statusIds: string = "";
    let statusValues: string = "";
    let organizationIds: string = "";
    let organizationValues: string = "";
    let accountmanagerIds: string = "";
    let accountmanagerValues: string = "";

    if (Data && Object.keys(Data).length>0) {
      statusIds = Data?.status
        ?.map((statusItem: any) => statusItem.id).join(",");
      accountmanagerIds = Data?.accountManager
      ?.map((statusItem: any) => statusItem.id)
        .join(",");
      organizationIds = Data?.organization
      ?.map((statusItem: any) => statusItem.id)
      .join(",");


      for (let index = 0; index < Data?.status?.length;index++ ) {
        if (index !== Data.status.length - 1)
        {
          
          statusValues += Data.status[index].name + ', ';
        }
        else {
          statusValues += Data.status[index].name
        }
      }    
      for (let index = 0; index < Data?.organization?.length;index++ ) {
        if (index !== Data.organization.length - 1)
        {
          
          organizationValues += Data?.organization[index]?.name + ', ';
        }
        else {
          organizationValues += Data?.organization[index]?.name
        }
      }    
      for (let index = 0; index < Data?.accountManager?.length;index++ ) {
        if (index !== Data.accountManager.length - 1)
        {
          
          accountmanagerValues += Data?.accountManager[index]?.email + ', ';
        }
        else {
          accountmanagerValues += Data?.accountManager[index]?.email
        }
      }
      
        
      setFilterStatus(statusValues);
      setOrganization(organizationValues);
      setAccountManager(accountmanagerValues);
    }


   console.log('accountmanagerIds :>> ', accountmanagerIds);
    await Promise.all(
      projectRefIds.map(async (item: any) => {
        
        await getUserProjectListwithFilter(
            statusIds || "",
            accountmanagerIds || "",
            organizationIds || "",
          search,
          item,
          page,
          perPage
          )              
          .then((responseData) => {

            setIsLoading(false);
            console.log('responseData :>> ', responseData);
            dispatch(setLoader(false))
            const { data, status } = responseData
            switch (status) {
              case 200:
                newArray.push(responseData.data.results);
                setPageCount(Math.ceil(responseData.data.totalCount / perPage));
               
                setTotalCount(responseData.data.totalCount)
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
    setDatatable({
      columns: datatable.columns,
      rows: newArray[0],
    });
  

    
  }


  const getUserDetails = async (Data: any, search: any) => {
    // dispatch(setLoader(true))
    try {
      
      const res = await getRegionsList();
      const { status, data } = res;   
      switch (status) {
        case 200:
          const combineProjectRef= data.map((item:any)=>item?.id)
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
    let countArray: any[]=[];
    for(let i in filterData){
      if (filterData[i]?.length>0){
        countArray.push(filterData[i]);
        setFilterCount(countArray);
      }
    }
  
  }, [filterData]);
  useEffect(() => {
    if (!showAddProjectModal)
    {
      
      getUserDetails(filterData, searchvalue)
      
    }
    
  }, [showAddProjectModal])
  useEffect(() => {
    // dispatch(setLoader(true))
  }, []);
  useEffect(() => {
    if (search==="")
    {
      clearFilter('')
      setsearchvalue('')
      getUserDetails(filterData,'')
    }
    
  }, [search])
  useEffect(() => {
    getUserDetails(filterData, searchvalue)
  }, [page]);
  return (
<>
  {loading ? <Loader />:
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
                          <h4>Projects</h4>
                          <div className="pro-detail-tag">
                            <span className="text">{totalCount} Total Projects</span>
                            <span className="dot"> </span>
                            <span className="text">{activeCount} Active Projects</span>                              
                          </div>
                        </div>
                        <div className="f-left">
                          <div className="ml-0 mb-0 form-group form-inline filter-search">
                            <img src={images.search} alt="" />
                            <input
                              placeholder="Search by Project Name"
                              name="search"
                              value={searchvalue}
                              id="projectlist_search"
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
                          {accountManager && (
                            <div className="sf">
                              <span className="sf-title">
                                Account Manager:&nbsp;
                              </span>
                              <span className="sf-text">
                                &nbsp;
                                {accountManager}
                              </span>
                              <Link
                                to="#"
                                onClick={() => {
                                  clearFilter("accountmanager");
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
                  <div className="table-responsive main-street-table">                         

                          <table id="example" className="display nowrap dataTable" style={{ width: "100%" }}>
                            <thead>
                              <tr>
                                {datatable.columns.map((colItem,index:number) =>


                                  <th key={index}>{colItem.label}</th>
                                )}


                              </tr>
                            </thead>
                            <tbody>
                              {datatable?.rows?.map((rowItem: any,index:number) =>
                                <tr onClick={()=>handleRowClick(rowItem.ref)} className="odd" key={index} >

                                  <td  className="sorting_1"><span className={`tag tag-${rowItem?.status?.toLowerCase()}`}>{rowItem?.status}</span></td>
                                  <td >{rowItem.name}</td>
                                  <td >{rowItem?.organization?.name}</td>
                                  <td >{rowItem.address}</td>
                                  <td >{`${rowItem?.manager !== null ? `${rowItem?.manager?.email} ` : "" } `}</td>
                                  <td >
                                    {rowItem.hubspotUrl ? (
                                            <a
                                            onClick={(e)=>handleClickhubspot(e,rowItem.hubspotUrl)}
                                            className="custom-projectlistlink"
                                            >
                                              Link
                                            </a> 
                                    ) : (
                                        <span className="custom-projectlistlink blank-link">
                                          -
                                          </span>
                                    )}
                                  
                                  </td>
                                </tr>
                              )}

                            </tbody>
                          </table>
                        </div>
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

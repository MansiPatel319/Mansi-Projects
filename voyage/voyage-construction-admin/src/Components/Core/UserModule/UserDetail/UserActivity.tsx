import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Select from "react-select";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import images from "../../../../Assets/images";
import { getUserActivityDetail } from "../../../../Network/Core/Users/UserInformation";
import ReactPaginate from "react-paginate";
import { setSearch } from "../../../../store/Actions/ProjectModule/projectActionCreators";

function OrganizationActivity() {
  const perPage:number  = 2;
  const [orgActivityDetail, setorgActivityDetail] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  const[firstDate,setFirstDate] = useState<any>('');
  const [lastDate, setlastDate] = useState<any>('');
  const [search,setSearch] = useState('')
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(1);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { ref } = useParams();
  const { region } = useParams();

  const handlePageClick = (data:any) => {
    const { selected } = data;
    setPage(selected+1)
  };
const onChangeFirstDate =async (e:any) => {
  let Date= e.target.value;
  setFirstDate(Date);
}

const onChangeLastDate =async (e:any) => {
  let Date= e.target.value;
  setlastDate(Date);
}
  const onEnter = (e: any) => {
    if (e.keyCode === 13 && !e.shiftKey) {
      // dispatch(setLoader(true))
      getUserActivity(ref);
      setSearch(e.target.value)
    }
  }
  const getUserActivity = async (ref: any) => {
    try {
      setIsLoading(true);
      const res = await getUserActivityDetail(ref,region,firstDate,lastDate,search,page,perPage);
      const { status, data, statusText } = res;
      switch (status) {
        case 200:
          setIsLoading(false);
          setorgActivityDetail(data.results);
          setPageCount(Math.ceil(data.count / perPage))
//           let groups:any = {};
// 
//           data.results.forEach(function(val:any) {
//               var date = val.createdAt.split('T')[0];
//               if (groups[date]) {
//                 groups[date].push(val);
//               } else {
//                 groups[date] = [val];
//               }
//           });
//           
          setorgActivityDetail(data.results);
          console.log(data.results);
          break;
        case 400:
          setIsLoading(false);

          break;
        case 403:
          if (data.detail === "ERR_login_again_token_expired") {
            navigate("/login");
            toast.error("login again");
            localStorage.clear();
          }

          setIsLoading(false);
          break;
        case 404:
          navigate("/login");
          setIsLoading(false);

          break;
        default:
          setIsLoading(false);

          break;
      }
    } catch (err) {
 
      console.log("err :>> ", err);

    }
  };
  //
  useEffect(() => {
    getUserActivity(ref);
  }, [firstDate]);
  useEffect(() => {
    getUserActivity(ref);
  }, [lastDate]);
  
  useEffect(() => {
    getUserActivity(ref);
  }, []);
  useEffect(() => {
    getUserActivity(ref);
  }, [page]);
  return (

    <div className="tab-pane fade show active" id="nav-user-activity" role="tabpanel" aria-labelledby="nav-user-activity-tab">
    <div className="row">
        <div className="col-xl-6 col-lg-6 col-md-12">
            <div className="filter-wrapper projects-filter-wrappers">
                <div className="ml-0 mb-0 form-group form-inline filter-search">
                <img src={images.search} alt="" />
                    <input type="text" onChange={(e)=>setSearch(e.target.value)} onKeyDown={(e)=>onEnter(e)} onBlur={(e)=>onEnter(e)} value={search} className="form-control" name="" placeholder="Search.." />
                </div>

            </div>
             
             </div>
            <div className="col-xl-6 col-lg-6 col-md-12">
                <form className="active-date-picker">
                    <label htmlFor="birthday">From:</label>
                    <input type="date" id="firstdate" onChange={(e:any)=>onChangeFirstDate(e)} name=""/>
                    <label htmlFor="birthday">To:</label>
                    <input type="date" id="lastdate" onChange={(e:any)=>onChangeLastDate(e)} name=""/>
                   
                  </form>
            </div>
            </div>
            <div className="row">
                <div className="col-xl-12 col-lg-12 col-md-12">
                    <div className="today-activity-info">
                      
                      {orgActivityDetail?.map((field: any) => (
                        <>
                        {field?.logs.length>0 && 
                        
                        
                       <>
                         <h2>{new Date(field?.createdAt).toDateString() === new Date().toDateString() ? 'TODAY' : (new Date(field?.createdAt).getDate()=== (new Date().getDate() - 1) ?'YESTERDAY':new Date(field?.createdAt).toDateString())}</h2>
                         {field?.logs?.map((field: any) => (
                        <div className="td-activity-info">
                            <span className="td-active-date">  {new Date(field?.createdAt).toLocaleTimeString()}</span>
                            <span className="td-active-img"><img src={field?.user?.profileImage} /></span>
                            <span className="td-active-ct">{field.description}</span>

                        </div>
                         ))
                        }
                        </>
                      }
                        </>
                      ))
                      }
              

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


  )
}

export default OrganizationActivity
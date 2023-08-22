import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Select from "react-select";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getOrganizationUser } from "../../../../Network/Core/Organization/OrganizationInfo";

// images

import images from "../../../../Assets/images";
import ReactPaginate from "react-paginate";

function OrganizatioUsers() {
  const perPage =10
  const [orgUserDetail, setOrgUserDetail] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0)
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(1); 
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { region } = useParams();
  const { id }:any = useParams();

  const handlePageClick = (data:any) => {
    const { selected } = data;    
    setPage(selected+1)
  };
  const handleClickOnUserItem = (ref: string) => {
    navigate(`/information/users/${ref}/${region}`);
  };
  const getOrganizationUsers = async () => {
    try {
      setIsLoading(true);
      const res = await getOrganizationUser(id,page,perPage,region);
      const { status, data, statusText } = res;
      switch (status) {
        case 200:
          setIsLoading(false);
          setOrgUserDetail(data.results);
          setTotalCount(data.count)
          setPageCount(Math.ceil(data.count / perPage));
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
    getOrganizationUsers();
  }, []);
  useEffect(() => {
    getOrganizationUsers();
  }, [page]);
  return (
    <>
    <div className="filter-data-box glob-sec-filter">
      <div className="sh-result text-right">
        <p className="f-text entiries">Showing {orgUserDetail?.length} entries of {totalCount} entries</p>

      </div>

    </div>
    <div className="table-responsive main-street-table">
      <div className="org-table">
        <div className="table-responsive">
          

              <table id="example" className="display nowrap dataTable " style={{ width: "100%" }}>
                <thead>
                  <tr>
                    <th>Status</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email Address</th>
                    <th>Associated Organization</th>
                    <th>Associated Projects</th>
                  </tr>
                </thead>
                  <tbody>
                    {!orgUserDetail || orgUserDetail?.length === 0 && (
                      <tr className="odd" >
                         <td className="td-no-found" colSpan={7}>No Data found</td>
                          </tr>
                    )}
                  {orgUserDetail?.map((user: any) => (
                    <tr className="odd"  onClick={()=>handleClickOnUserItem(user.ref)}>
                      <td className="sorting_1"><span className={`tag tag-${user?.userStatusText?.toLowerCase()}`}>{user?.userStatusText}</span></td>
                      <td>{user.firstName}</td>
                      <td>{user.lastName}</td>
                      <td>{user.email}</td>
                      <td>{`${user?.organization !== null ? `${user?.organization?.name} ` : ""} `}</td>
                      <td>{user?.projects && user?.projects?.length && user?.projects[0]?.projectName}<br />
                        {user?.projects?.length - 1 > 0 &&
                          <>
                            <img src={images.strockGreen} className="stroke-img" />
                            <span>+ {user?.projects?.length - 1 > 0 ? user?.projects?.length - 1 : ''} others</span>
                          </>
                          //  <span>+ {user?.projects?.length - 1} others</span>
                        }
                      </td>
                    </tr>
                  ))
                  }

                </tbody>
              </table>

           
          </div>
          {orgUserDetail?.length > 0 && (
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
      </>
  )
}

export default OrganizatioUsers
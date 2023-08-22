import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import "../../../../Assets/css/global-admin.css";
import "../../../../Assets/css/cutstmize.css";
import { getUserAsssociatedProjectsData } from "../../../../Network/Core/Users/AssociatedProjects";
import ReactPaginate from "react-paginate";

interface associatedProjectsProps {
  userDetail: any;

}
const AssociatedProjects = ({ userDetail }: associatedProjectsProps) => {
  const perPage=10
  const { region } = useParams();
  const { ref } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [totalCount, setTotalCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true);
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(1); 
  const [datatable, setDatatable] = React.useState<any>({
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
     
    ],
  });

  const handlePageClick = (data:any) => {
    const { selected } = data;    
    setPage(selected+1)
  };
  const getAssociatedOrganizationList = async () => {

    try {
      setIsLoading(true);
      const res = await getUserAsssociatedProjectsData(
        page,perPage, ref, region);
      const { status, data } = res;
      switch (status) {
        case 200:
          setDatatable({
            columns: datatable.columns,
            rows: data.results,
          });
          setTotalCount(data.count)
          setPageCount(Math.ceil(data.count / perPage));
          setIsLoading(false);
          break;
        case 400:
          setIsLoading(false);
          break;
        case 403:
          if (data.detail === "ERR_login_again_token_expired") {
            navigate("/login");
            toast.error(t("chooseProject.error_login_again"));
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
      toast.error(t("chooseProject.error_something_went_wrong"));
    }
  };
  const handleClickhubspot = (e:any, url:any) => {
    e.stopPropagation()
    window.open(url.startsWith('https') || url.startsWith('http')==true?`${url}`:`https://${url}`, "_blank");

  }
  const handleRowClick = (ref: number) => {
    navigate(`/information/project/${ref}`);
  };
  useEffect(() => {
    if (userDetail && Object.keys(userDetail).length > 0) {

      getAssociatedOrganizationList()
    }
  }, [userDetail, region])
  useEffect(() => {
    getAssociatedOrganizationList()
  }, [page]);
  return (
    <>
    <div className="filter-data-box glob-sec-filter">
      <div className="sh-result text-right">
        <p className="f-text entiries">Showing {datatable?.rows?.length} entries of {totalCount} entries</p>

      </div>

    </div>
    <div
      className="tab-pane fade show active"
      id="nav-users"
      role="tabpanel"
      aria-labelledby="nav-users-tab"
    >
      <div className="org-table">
        <div className="table-responsive projectuser">
          <div className="table-responsive main-street-table">

            <table id="example" className="display nowrap dataTable" style={{ width: "100%" }}>
              <thead>
                <tr>
                  {datatable?.columns?.map((colItem: any, index: number) =>


                    <th key={index}>{colItem.label}</th>
                  )}


                </tr>
              </thead>
                <tbody>
                {!datatable?.rows || datatable?.rows?.length === 0 && (
                  <tr className="odd" >
                    <td className="td-no-found" colSpan={6}>No Data found</td>
                  </tr>
                  )}
                {datatable?.rows?.map((rowItem: any, index: number) =>
                 <tr onClick={()=>handleRowClick(rowItem.ref)} className="odd" key={index} >

                  <td className="sorting_1"><span className={`tag tag-${rowItem?.status?.toLowerCase()}`}>{rowItem?.status}</span></td>
                  <td>{rowItem.name}</td>
                  <td>{rowItem?.organization?.name}</td>
                  <td>{rowItem.address}</td>
                  <td>{`${rowItem?.manager !== null ? `${rowItem?.manager?.email} ` : "" } `}</td>
                  <td>
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

          </div>
          {datatable?.rows?.length > 0 &&
            (
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
  );
};
export default AssociatedProjects;

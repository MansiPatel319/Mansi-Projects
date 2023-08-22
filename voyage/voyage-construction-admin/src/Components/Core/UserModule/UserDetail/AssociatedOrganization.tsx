import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Select from "react-select";
import { useNavigate, useParams } from "react-router-dom";
import { MDBDataTableV5 } from "mdbreact";
import toast from "react-hot-toast";



import "../../../../Assets/css/global-admin.css";
import "../../../../Assets/css/cutstmize.css";
import { getUserAsssociatedOrganiztionData } from "../../../../Network/Core/Users/AccociatedOrganization";
import images from "../../../../Assets/images";

interface associatedOrganizationProps {
  userDetail: any;

}
const AssociatedOrganization = ({ userDetail }: associatedOrganizationProps) => {
  const { region } = useParams();
  const [isLoading, setIsLoading] = useState(true);
 
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [datatable, setDatatable] = React.useState<any>({
    columns: [
      {
        label: "Organization Name",
        field: "OrganizationName",
        sort:'disabled',
        width: 250,
      },
      {
        label: "Organization Admin",
        field: "OrganizationAdmin",
        sort:'disabled',
        width: 250,
      },
      {
        label: "Address",
        field: "Address",
        sort: 'disabled',
        width: 100,
        
      },
      {
        label: "Associated Projects",
        field: "AssociatedProjects",
        sort: 'disabled',
        width: 100,
  
      },
      
      
    ],
    rows: [
     
    ],
  });
  const handleRowClick = (id: number) => {
    navigate(`/information/organization/${id}/${region}`);
  };
  const getAssociatedOrganizationList = async (serachUser: String) => {

    try {
      setIsLoading(true);
      const res = await getUserAsssociatedOrganiztionData(userDetail?.organization?.id,
        region);
      const { status, data } = res;
      switch (status) {
        case 200:
          setDatatable({
            columns: datatable.columns,
            rows: new Array(data),
          });
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

  useEffect(() => {
    if (userDetail && Object.keys(userDetail).length > 0) {

      getAssociatedOrganizationList('')
    }
  }, [userDetail, region])
  return (
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
                  {datatable?.columns?.map((colItem:any, index: number) =>


                    <th key={index}>{colItem.label}</th>
                  )}


                </tr>
              </thead>
              <tbody>
              {(!datatable.rows || datatable?.rows?.length === 0 )&& (
                  <tr className="odd" >
                    <td className="td-no-found" colSpan={6}>No Data found</td>
                  </tr>
              )}
                {datatable?.rows?.map((rowItem: any, index: number) =>
                  <tr className="odd" key={index} onClick={() => handleRowClick(rowItem.id)}>

                    <td>{rowItem.name}</td>
                    <td>{rowItem?.organizationAdmin && rowItem?.organizationAdmin?.length > 0 && rowItem?.organizationAdmin[0]?.firstName + " "+ rowItem?.organizationAdmin[0]?.lastName}<br />
                      {rowItem?.organizationAdmin?.length > 1 &&
                        <>
                          <img src={images.strockGreen} className="stroke-img" />
                          <span>+ {rowItem?.organizationAdmin?.length - 1} others</span>
                        </>}
                    </td>
                    <td>{rowItem.address1}</td>
                    <td>{rowItem?.projects && rowItem?.projects?.length > 0 && rowItem?.projects[0]?.name}<br />
                      {rowItem?.projects?.length > 1 &&
                        <>
                          <img src={images.strockGreen} className="stroke-img" />
                          <span>+ {rowItem?.projects?.length - 1} others</span>
                        </>}
                    </td>
                  </tr>
                )}

              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
};
export default AssociatedOrganization;

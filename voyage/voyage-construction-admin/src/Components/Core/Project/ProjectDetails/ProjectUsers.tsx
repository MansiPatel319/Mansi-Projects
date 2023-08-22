import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Select from "react-select";
import { useNavigate, useParams } from "react-router-dom";
import { MDBDataTableV5 } from "mdbreact";
import toast from "react-hot-toast";

// helper
import {
  doGetOrganizationRoleList,
  doGetUserList,
  doPostRemoveUserFromOrg,
  doPostUpdateOrgRole,
} from "../../../../Network/Core/Project/ProjectUser";
import { getLocalStorage } from "../../../../Network/ApiService";
import { constants } from "../../../../Library/Constants";

import "../../../../Assets/css/global-admin.css";
import "../../../../Assets/css/cutstmize.css";

const ProjectUsers = () => {
  const project = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [userList, setUserList] = useState([]);
  const [organizationRoleList, setOrganizationRoleList] = useState([]);
  const [projectChecked, setProjectChecked] = useState(false);
  const [serachUser, setSearchUser] = useState("");
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [datatable, setDatatable] = React.useState({
    columns: [
      {
        label: "Status",
        field: "Status",
        sort:'disabled',
        width: 250,
      },
      {
        label: "First Name",
        field: "FirstName",
        sort:'disabled',
        width: 250,
      },
      {
        label: "Last Name",
        field: "LastName",
        sort: 'disabled',
        width: 100,
        
      },
      {
        label: "Email Address",
        field: "Email",
        sort: 'disabled',
        width: 100,
  
      },
      {
        label: "Phone Number",
        field: "Phone",
        sort: 'disabled',
        width: 150,
   
      },
      {
        label: "Organization",
        field: "Organization",
        sort: 'disabled',
        width: 100,
      },
      {
        label: "Project Role",
        field: "Role",
        sort: 'disabled',
        width: 100,
      },
      
    ],
    rows: [
      {
        
      },
    ],
  });
  const orgRole = "admin";
  //   const orgRole = getLocalStorage(constants.USER)?.organizationRole?.name;
  const renderRoleDropDown = (user: any, organizationRoleList: any) => {
    return (
      <Select
        // inputRef={ref}
        classNamePrefix="form-control-language"
        options={organizationRoleList}
        id="orgRole"
        placeholder="Select Role"
        name="orgRole"
        onChange={(e) => handleRoleChange(e, user.user.id)}
        value={organizationRoleList.find(
          (item: any) => item.value === user?.role?.id
        )}
        // value={{ label: user?.organizationRole?.name, value: user?.organizationRole?.id }}
        // isDisabled={orgRole !== 'admin'}
      />
    );
  };
  const setTableData = (data: any) => {
    const rowData: any[] = [];
    data.forEach((userItem: any) => {
      const obj: object = {
        Status: <span className={`tag tag-${userItem.user.userStatusText.toLowerCase()}`}>{userItem.user.userStatusText}</span>,
        FirstName: userItem.user.firstName,
        LastName: userItem.user.lastName,
        Email: userItem.user.email,
        Phone: userItem.user.mobile,
        Organization: userItem.user?.organization?.name,
        Role: renderRoleDropDown(userItem, organizationRoleList)
      };
      // eslint-disable-next-line no-unused-expressions, no-sequences
      rowData.push(obj);
    });
    setDatatable({
      columns: datatable.columns,
      rows: rowData,
    });
  };
  const getUserList = async (projectChecked: boolean, serachUser: String) => {
    try {
      setIsLoading(true);
      const res = await doGetUserList(project.ref);
      const { status, data } = res;
      switch (status) {
        case 200:
          setTableData(data.results);
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
  const getOrganizationRole = async () => {
    try {
      setIsLoading(true);
      const res = await doGetOrganizationRoleList(project.ref);
      const { status, data } = res;
      switch (status) {
        case 200:
          // setOrganizationRoleList(data)
          const tempRole = res.data.results.map((role: any) => {
            return {
              value: role.id,
              label: role.name,
            };
          });
          // tempRole.push({
          //   value: "remove-user",
          //   label: "Remove From Org",
          // });
          setOrganizationRoleList(tempRole);
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
  const handleRoleChange = async (value: any, userid: number) => {
    if (value.value === "remove-user") {
      try {
        const orgRoleData = {
          user_id: userid,
        };
        setIsLoading(true);
        const res = await doPostRemoveUserFromOrg(project.ref, orgRoleData);
        const { status, data } = res;
        switch (status) {
          case 200:
            toast.success(t("User is removed From Organization"));
            getUserList(projectChecked, serachUser);
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
    } else {
      try {
        const orgRoleData = {
          user_id: userid,
          project_role: value.value,
        };
        setIsLoading(true);
        const res = await doPostUpdateOrgRole(project.ref, orgRoleData);
        const { status, data } = res;
        switch (status) {
          case 200:
            toast.success(t("oranization Role updated"));
            getUserList(projectChecked, serachUser);
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
    }
  };
  const handleDoProject = (e: any) => {
    setProjectChecked(e.target.checked);
  };
  const onChangeUserSearch = (e: any) => {
    const { value } = e.target;
    setSearchUser(value);
    getUserList(projectChecked, value);
  };
  useEffect(() => {
    // getUserList()
    // getUserList(projectChecked)
    getOrganizationRole();
    getUserList(false, "");
  }, []);
  useEffect(() => {
    // getUserList()
    // getUserList(projectChecked)
    getUserList(projectChecked, serachUser);
  }, [organizationRoleList]);
  useEffect(() => {
    getUserList(projectChecked, serachUser);
  }, [projectChecked]);
  return (
    <div
      className="tab-pane fade show active"
      id="nav-users"
      role="tabpanel"
      aria-labelledby="nav-users-tab"
    >
      <div className="org-table">
        <div className="table-responsive projectuser">
          {datatable && datatable.columns.length > 0 ? (
            <MDBDataTableV5
              searchBottom={false}
              data={datatable}
              selectableRows
            />
          ) : (
            //     <table id="example" className="display nowrap" style={{ width: "100%" }}>
            //         <thead>
            //             <tr>
            //                 <th>First Name</th>
            //                 <th>Last Name</th>
            //                 <th>Email Address</th>
            //                 <th>Phone Number</th>
            //                 {orgRole && <th>Organisation Role</th>}
            //             </tr>
            //         </thead>
            //         <tbody>
            //             {userList?.map((user: any) => (
            //                 <tr>
            //                     <td>{user.firstName}</td>
            //                     <td>{user.lastName}</td>
            //                     <td>{user.email}</td>
            //                     <td>{user.mobile}</td>
            //                     {orgRole && (
            //                         <td>
            //                             <div className="form-group mb-0">
            //                                 <Select
            //                                     // inputRef={ref}
            //                                     classNamePrefix="form-control-language"
            //                                     options={organizationRoleList}
            //                                     id="orgRole"
            //                                     placeholder="Select Role"
            //                                     name="orgRole"
            //                                     onChange={(e) => handleRoleChange(e, user.id)}
            //                                     value={{ label: user?.organizationRole?.name, value: user?.organizationRole?.id }}
            //                                     isDisabled={orgRole !== 'admin'}
            //                                 />
            //                             </div>
            //                         </td>
            //                     )}
            //                 </tr>
            //             ))}

            //         </tbody>
            //     </table>

            <h1>No User found </h1>
          )}
        </div>
      </div>
    </div>
  );
};
export default ProjectUsers;

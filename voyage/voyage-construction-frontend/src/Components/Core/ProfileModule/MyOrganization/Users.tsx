import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Select from 'react-select'
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

// helper
import { doGetOrganizationRoleList, doGetUserList, doPostRemoveUserFromOrg, doPostUpdateOrgRole } from '../../../../Network/Core/ProfileModule/organization';
import { getLocalStorage } from '../../../../Network/ApiService';
import { constants } from '../../../../Library/Constants';

const Users = () => {
  const project = getLocalStorage(constants.PROJECT)
  const [isLoading, setIsLoading] = useState(true);
  const [userList, setUserList] = useState([])
  const [organizationRoleList, setOrganizationRoleList] = useState([])
  const [projectChecked, setProjectChecked] = useState(false)
  const [serachUser, setSearchUser] = useState('')
  const { t } = useTranslation()
  const navigate = useNavigate()
  const orgRole = getLocalStorage(constants.USER)?.organizationRole?.name;

  const getUserList = async (projectChecked: boolean, serachUser: String) => {
    try {
      setIsLoading(true)
      const res = await doGetUserList(project.ref, projectChecked, serachUser);
      const { status, data } = res;
      switch (status) {
        case 200:
          setUserList(data.results)
          setIsLoading(false)
          break;
        case 400:
          setIsLoading(false)
          break;
        case 403:
          if (data.detail === "ERR_login_again_token_expired") {
            navigate('/login')
            toast.error(t("chooseProject.error_login_again"));
            localStorage.clear()
          }
          setIsLoading(false)
          break;
        default:
          setIsLoading(false)
          break;
      }
    } catch (err) {
      setIsLoading(false)
      toast.error(t("chooseProject.error_something_went_wrong"));
    }
  }
  const getOrganizationRole = async () => {
    try {
      setIsLoading(true)
      const res = await doGetOrganizationRoleList(project.ref);
      const { status, data } = res;
      switch (status) {
        case 200:
          // setOrganizationRoleList(data)
          const tempRole = res.data.results.map((role: any) => {
            return ({
              value: role.id,
              label: role.name
            })
          })
          tempRole.push({
            value: 'remove-user',
            label: 'Remove From Org'
          })
          setOrganizationRoleList(tempRole)
          setIsLoading(false)
          break;
        case 400:
          setIsLoading(false)
          break;
        case 403:
          if (data.detail === "ERR_login_again_token_expired") {
            navigate('/login')
            toast.error(t("chooseProject.error_login_again"));
            localStorage.clear()
          }
          setIsLoading(false)
          break;
        default:
          setIsLoading(false)
          break;
      }
    } catch (err) {
      setIsLoading(false)
      toast.error(t("chooseProject.error_something_went_wrong"));
    }
  }
  const handleRoleChange = async (value: any, userid: number) => {
    if (value.value === 'remove-user') {
      try {
        const orgRoleData = {
          "user_id": userid,
        }
        setIsLoading(true)
        const res = await doPostRemoveUserFromOrg(project.ref, orgRoleData);
        const { status, data } = res;
        switch (status) {
          case 200:
            toast.success(t("User is removed From Organization"));
            getUserList(projectChecked, serachUser)
            setIsLoading(false)
            break;
          case 400:
            setIsLoading(false)
            break;
          case 403:
            if (data.detail === "ERR_login_again_token_expired") {
              navigate('/login')
              toast.error(t("chooseProject.error_login_again"));
              localStorage.clear()
            }
            setIsLoading(false)
            break;
          default:
            setIsLoading(false)
            break;
        }
      } catch (err) {
        setIsLoading(false)
        toast.error(t("chooseProject.error_something_went_wrong"));
      }
    }
    else {

      try {
        const orgRoleData = {
          "user_id": userid,
          "role_id": value.value
        }
        setIsLoading(true)
        const res = await doPostUpdateOrgRole(project.ref, orgRoleData);
        const { status, data } = res;
        switch (status) {
          case 200:
            toast.success(t("oranization Role updated"));
            getUserList(projectChecked, serachUser)
            setIsLoading(false)
            break;
          case 400:
            setIsLoading(false)
            break;
          case 403:
            if (data.detail === "ERR_login_again_token_expired") {
              navigate('/login')
              toast.error(t("chooseProject.error_login_again"));
              localStorage.clear()
            }
            setIsLoading(false)
            break;
          default:
            setIsLoading(false)
            break;
        }
      } catch (err) {
        setIsLoading(false)
        toast.error(t("chooseProject.error_something_went_wrong"));
      }
    }


  }
  const handleDoProject = (e: any) => {
    setProjectChecked(e.target.checked)

  }
  const onChangeUserSearch = (e: any) => {
    const { value } = e.target
    setSearchUser(value)
    getUserList(projectChecked, value)
  }
  useEffect(() => {
    // getUserList()
    // getUserList(projectChecked) 
    getOrganizationRole();
    getUserList(false, '')
  }, []);
  useEffect(() => {
    getUserList(projectChecked, serachUser)
  }, [projectChecked]);
  return (
    <div className="tab-pane fade  show active" id="nav-users" role="tabpanel" aria-labelledby="nav-users-tab">
      {((userList && userList.length > 0) || serachUser!=='') && (
        <div className="org-user-tab">
          <div className="max-quantity-box">
            <div className="form-group mb-0 search-org">
              <input type="text" name="" className="form-control" value={serachUser} onChange={onChangeUserSearch} />
            </div>
            <div className="form-check">
              <label className="form-check-label" htmlFor="check1">
                <input type="checkbox" checked={projectChecked} className="form-check-input" onChange={handleDoProject} id="check2" name="option2" value="something" /><span>This project only</span>
              </label>
            </div>
          </div>
        </div>
      )}
      <div className="org-table">
        <div className="table-responsive">
          {userList && userList.length > 0 ? (
            <table id="example" className="display nowrap dataTable " style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email Address</th>
                  <th>Phone Number</th>
                  <th>Organisation Role</th>
                </tr>
              </thead>
              <tbody>
                {userList?.map((user: any) => (
                  <tr>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.email}</td>
                    <td>{user.mobile}</td>                    
                    <td>
                      <div className="form-group mb-0">
                        <Select
                          // inputRef={ref}
                          classNamePrefix="form-control-language"
                          options={organizationRoleList}
                          id="orgRole"
                          placeholder="Select Role"
                          name="orgRole"
                          onChange={(e) => handleRoleChange(e, user.id)}
                          value={{ label: user?.organizationRole?.name, value: user?.organizationRole?.id }}
                          isDisabled={orgRole!=='admin'}
                        />
                      </div>
                    </td>
                    
                  </tr>
                ))}

              </tbody>
            </table>

          ) : (
            <h1>No User found </h1>
          )}
        </div>
      </div>

    </div>

  );
}

export default Users;

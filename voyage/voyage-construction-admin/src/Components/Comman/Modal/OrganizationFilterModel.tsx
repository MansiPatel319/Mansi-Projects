import React, { useEffect, useState ,useRef} from "react";
import { useDispatch, useSelector } from "react-redux";

// component
import Button from "../../UI/Button";
import useOutsideClick from "./ManageOutsideClickClose";
// images
import images from "../../../Assets/images";


// redux
import { setSearch } from "../../../store/Actions/ProjectModule/projectActionCreators";

// css
import "./style.css";
import { getUserProjectList } from "../../../Network/Core/AuthModule/auth";
import { setOrganizationFilter } from "../../../store/Actions/OrganizationModule/organizationActionCreator";

export interface OrganizationListFilterProps {
  handleClose?: any;
}

const OrganizationFilterModel = ({ handleClose }: OrganizationListFilterProps) => {

  const [isShowProjectList, setIsShowProjectsList] =
    useState(true);
  const filterData = useSelector((state: any) => state.organization.filterData);
  const refOutsideModel = useRef(null);
  useOutsideClick(refOutsideModel, () => {
    handleClose();
  })
  const [projects, setprojects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

 
  const handleProjectListShow = () => {
    setIsShowProjectsList(true);
  
  };
 
  const handleChangecheckbox = (name: any, id: any) => {
   if (name === "project") {
      const tempData = [...projects];
      tempData.forEach((item: any) => {
        if (item.id === id) {
          item.isChecked = !item.isChecked;
        }
      });
      setprojects(tempData);
    }
  };
  const onApplyFilter = async () => {
    setIsLoading(true);

    const projectsArray = projects.filter(
      (item: any) => item.isChecked
    );
    

    handleClose();
    const filterData = {
 
      projects: projectsArray,
 
    };
    dispatch(setOrganizationFilter(filterData));
  };
  const onClearFilter = () => {
    
    const filterData = {
    
      projects: [],
     
    };
    dispatch(setOrganizationFilter(filterData));
    dispatch(setSearch(''))
   
  }
  const getProjectList = async (filterData: any) => {
    try {
      setIsLoading(true);
      const res = await getUserProjectList(1);
      const { status, data } = res;
      switch (status) {
        case 200:
          setIsLoading(false);
          let tempProjects:any =[...data.results]
          tempProjects = tempProjects.map((item: any) => {
            item.isChecked = false;
            return item;
          });
          if (
            filterData &&
            Object.keys(filterData)?.length > 0 &&
            filterData?.projects?.length > 0
          ) {
            tempProjects = tempProjects.map((item: any) => {
              filterData.projects.filter((data: any) => {
                if (item.id === data.id) {
                  item.isChecked = true;
                }
                return data;
              });
              return item;
            });
          }

          setprojects(tempProjects);

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

  useEffect(() => {
    getProjectList(filterData);
  
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
                      href="#projects"
                      role="tab"
                      aria-controls="recipient-company"
                      onClick={() => handleProjectListShow()}
                    >
                      <span>Projects</span>{" "}
                      <img src={images.forword} alt="forword" />
                    </a>
                  </li>
                  
                </ul>

                <div className="tab-content filtermodal-tabcontent">
                
                  {isShowProjectList && (
                    <div
                      className="tab-pane"
                      id="projects"
                      style={{ display: "block" }}
                      role="tabpanel"
                    >
                      <div className="filtercheck-list">
                        {projects?.map((item: any) => (
                          <div className="filtercheck-item">
                            <input
                              type="checkbox"
                              name={`projects:${item.id}`}
                              checked={item.isChecked}
                              onChange={() =>
                                handleChangecheckbox("project", item.id)
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

export default OrganizationFilterModel;

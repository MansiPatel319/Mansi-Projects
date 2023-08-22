import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

// component
import ProjectDetails from "../../../Components/Core/Project/ProjectDetails";
import Leftbar from "../../../Components/Comman/Leftbar";
import Header from "../../../Components/Comman/Header";
import EditProjectModal from "../../../Components/Comman/Modal/EditProjectModal";
import DurationModal from "../../../Components/Comman/Modal/DurationModal";
import AddFlexibleFeildModel from "../../../Components/Comman/Modal/AddFlexibleFeildModel";
// css
import "../../../Assets/css/style.css";
import "../../../Assets/css/common.css";
import "../../../Assets/css/booking-list.css";
import "../../../Assets/css/booking-form.css";
import "../../../Assets/css/site-management.css";
import "../../../Assets/css/global-admin.css";
import "../../../Assets/css/cutstmize.css";
import AddProjectModal from "../../../Components/Comman/Modal/AddProjectModal";
import VehicleTypeModal from "../../../Components/Comman/Modal/VehicleTypeModal";




const index = () => {
  const dispatch = useDispatch()
  const showEditProjectModal = useSelector(
    (state: any) => state.project.showFilterModal
  );
  const showDurationModal = useSelector(
    (state: any) => state.project.showDurationModal
  );
  const showAddFlexibleField = useSelector(
    (state: any) => state.project.showAddFlexibleField
  );
  const showAddProjectModal = useSelector((state:any)=>state.project.showAddProjectModal)
  const showVehicleTypeModal = useSelector((state:any)=>state.project.showVehicleTypeModal)
 
  return (
    <div id="wrapper" >
      {/* <!-- Sidebar section start --> */}
      <Leftbar />
      {/* <!-- Sidebar section End --> */}

      <div id="content-wrapper" className="d-flex flex-column">
        {/* <!-- Main Content --> */}
        <div id="content">
          {/* <!-- Topbar section start --> */}
          <Header />

          {/* <!-- page header title section start --> */}

          <ProjectDetails />
            
            <EditProjectModal />        
            <DurationModal />        
            <AddFlexibleFeildModel />
            {/* {showAddProjectModal && (
              <>
             */}
                <AddProjectModal  />
                {/* <div className="modal-backdrop fade show" />
      
              </>
            )} */}
          {showVehicleTypeModal &&
            <VehicleTypeModal />
          }
        </div>
      </div>
    </div>
  );
};

export default index;

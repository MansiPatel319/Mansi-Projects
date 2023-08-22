import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import { useNavigate, useParams } from "react-router-dom";
import {

  handleShowVehicleTypeModal,
} from "../../../store/Actions/ProjectModule/projectActionCreators";

// component


import Button from "../../UI/Button";

import { getVehicleTypeList, saveCorefieldDetail } from "../../../Network/Core/Project/BookingField";
import { useTranslation } from "react-i18next";


export interface ProjectListFilterProps { }
const VehicleTypeModal =()=>{
const show=  useSelector(
  (state: any) => state.project.showAddFlexibleField
);
const bookingCoreFileds=  useSelector(
  (state: any) => state.project.bookingCoreFileds
);
  const { t } = useTranslation()
  const navigate = useNavigate()
// const [show, setShow] = useState(showAddFlexibleField)
  const refOutsideModel = useRef(null);
  const [vehicleType,setVehicleType] = useState<any>([])
const dispatch =  useDispatch()
  const { ref } = useParams()
  const baseUrlForFrontend:any = process.env.REACT_APP_BASE_URL 

  const handleCloseClick = () => {
 
  
  dispatch(handleShowVehicleTypeModal(false));

};
// const VehicleTypeModal = () => {
//   useEffect(() => {
//     if (showAddFlexibleField)
//     {
//       setShow(true)
//     }    
//   }, [showAddFlexibleField])
  const handleChangeCheckbox = (item:any,id:any) => {
    let tempArr = [...vehicleType]
    tempArr.map((item) => {
      if (item.id === id) {
        item.checked= !item.checked
      }
    })
    setVehicleType(tempArr)
  }
  
  const getVehicleType = async() => {
    try {
      const res = await getVehicleTypeList(ref);
      const { status, data, statusText } = res;
      switch (status) {
        case 200:
          let tempArr: { title: any; id: any; checked:boolean }[]=[];
          data.results.map((item:any)=>{
            let tempdata={
              title:item.name,
              id: item.id,
              checked:false
            }
            tempArr.push(tempdata);
          })
          tempArr.map((item) => {
            bookingCoreFileds.map((bookingField: any) => {
              if (bookingField.options !== null) {
                
                if (bookingField.options.find((optionsItem:any)=>optionsItem.id === item.id))
                {
                  item.checked = true
                }
               
              }
            })
            return item
          })
          setVehicleType(tempArr);
         
          break;
        case 400:
          // setApiResponseErr(data);
          break;
        case 401:                
          localStorage.clear();
          window.open(`${baseUrlForFrontend}`, "_blank");              
          // setIsLoading(false);
          break;  
        case 403:
            if (data.detail === "ERR_login_again_token_expired") {
              toast.error(t("userManagment.error_login_again"));
              localStorage.clear()
              window.open(`${baseUrlForFrontend}`, "_blank");
            }

            break
        default:
          // setApiResponseErr(statusText);
          break;
      }
    } catch (err) {
      toast.error("Somthing went wrong");
    }
  }
  const onClickCoreFieldSave = async () => {
    const array: any[] = [];
    let coreFieldDetail = [...bookingCoreFileds]
    let optionsSelected:any = []
     vehicleType.map((item: any) => {
      if (item.checked) {
        
        const obj = {
          id: item.id,
          name:item.name
        }
        optionsSelected.push(obj)
      }
    })
    coreFieldDetail?.map((item: any) => {
      if (item.options !== null)
      {
        const data = {
          id: item.id,
          field: item.field.id,
          project: item.project,
          is_active: item.isActive,
          mandatory: item.mandatory,
          options:optionsSelected,
        };
        array.push(data);
        return item;
        
        }
    });
    const saveData: any = {
      core_fields: array,
    };
    try {
      const res = await saveCorefieldDetail(
        {
          saveData,
        },
        ref
      );
      const { status, data } = res;
      switch (status) {
        case 200:
          toast.success("Save Successfully CoreField Detail");
          handleCloseClick()
          let tempArr = [...vehicleType]
            vehicleType.map((item:any) => {
             
              item.checked = true
                
            })
         
          setVehicleType(tempArr)
          break;
        case 400:
          break;
        case 403:
          if (data.detail === "ERR_login_again_token_expired") {
            toast.error(t("userManagment.error_login_again"));
            localStorage.clear();
            navigate("/login");
          }

          break;
        default:
          break;
      }
    } catch (err) {
      // toast.error(t("userManagment.error_something_went_wrong"));
    }
  };
  useEffect(() => {
   getVehicleType()
  }, []);
  useEffect(() => {
   
  }, [bookingCoreFileds]);
  return (  
    <>
      <div
      className="custom-modal modal fade show"
      id={Math.random()+""}
      style={{ display: "block" }}>
        <div className="modal-dialog modal-sm modal-dialog-centered cust-new-modal">
          <div className="modal-content cust-new-proj-modal" ref={refOutsideModel}>
            <div className="modal-header">
              <h4 className="modal-title">Vehicle Types</h4>
              <Button
                buttonLabel="Close   &times;"
                className="close"
                handleClick={() => handleCloseClick()}
              />
            </div>

            <div className="modal-body">
              <div className="custmodal-formbox">
                <form className="form-root">
                  <div className="filtercheck-item vehicle-item  justify-content-between">
                    <span className="fci-title">Vehicle Type</span>
                    <span className="fci-title">Included</span> 
                  </div>
                  <div className="scrollable-modal-div">
                  {
                    vehicleType.map((item:any) =>
                    <div className="filtercheck-item vehicle-item justify-content-between">
                        <span className="fci-title">{item.title}</span>
                            <input
                              type="checkbox"                           
                              id={item.id}
                              checked={item.checked}
                              onChange={() =>
                                handleChangeCheckbox(item, item.id)
                              }
                              
                             
                            />
                        
                    </div>
                    )
                  }
                 </div>
                  <div className="modal-cs-btnbox custom_flexibleField d-flex justify-content-between">
                  <Button
                      buttonLabel="Cancel"
                      // handleClick={() => handleAddClick(false)}
                      // disabled={projectRole === constants.PROJECT_USER || projectRole === constants.PROJECT_MANAGER}
                      className="btn btn-link cancel-link btn-vehicle-type "
                    />
                     <Button
                      buttonLabel="Save"
                      className="btn theme-btn invite-model-btn w-25"
                      handleClick={onClickCoreFieldSave}
                    />
                  </div>
                 </form>
              
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>          
      </div>        
      {show && <div className="modal-backdrop fade show" />}
      </>
  );
};

export default VehicleTypeModal;


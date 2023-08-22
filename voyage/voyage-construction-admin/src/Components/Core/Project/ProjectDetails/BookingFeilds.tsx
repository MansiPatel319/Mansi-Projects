import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// helper
import {
  getBookingDetail,
  saveCorefieldDetail,
  saveFlexiblefieldDetail,
} from "../../../../Network/Core/Project/BookingField";
import Button from "../../../UI/Button";
import {
  handleEditDurationModal,
  setBookingField,
  handleADDFlexibleModal,
  handleShowVehicleTypeModal,
  handleSetCoreFiledData,
} from "../../../../store/Actions/ProjectModule/projectActionCreators";

// images
import images from "../../../../Assets/images";

// css
import "../../../../Assets/css/style.css";
import "../../../../Assets/css/common.css";
import "../../../../Assets/css/booking-list.css";
import "../../../../Assets/css/booking-form.css";
import "../../../../Assets/css/site-management.css";
import "../../../../Assets/css/global-admin.css";
import "../../../../Assets/css/cutstmize.css";

const BookingFeilds = () => {
  const dispatch = useDispatch();
  const handleDurationModal = () => {
    dispatch(handleEditDurationModal(true));
  };
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { ref } = useParams();
  const [bookingDetail, setBookingDetail] = useState<any>();
  const [coreFieldDetail, setcoreFieldDetail] = useState<any>();
  const [flexibleDetail, setFlexibleDetail] = useState<any>();
  const showAddFlexibleField = useSelector((state:any)=>state.project.showAddFlexibleField)
  const showVehicleTypeModal=  useSelector(
    (state: any) => state.project.showVehicleTypeModal
  );
  const getDetailsofBookingFeild = async (refid: any) => {
    try {
      const res = await getBookingDetail(refid);
      const { status, data } = res;

      switch (status) {
        case 200:
          setBookingDetail(data);
          dispatch(setBookingField(data));
          setcoreFieldDetail(data?.coreFields);
          setFlexibleDetail(data?.flexibleFields);
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
  const handleDragEnd = async(results: any) => {
    if (!results.destination) return;
    const tempFlexibleField = [...flexibleDetail];
    const [selectedRow] = tempFlexibleField.splice(results.source.index, 1);
    tempFlexibleField.splice(results.destination.index, 0, selectedRow);
    setFlexibleDetail(tempFlexibleField);
    const array: any[] = [];
    tempFlexibleField?.map((item: any) => {
      const data = {
        id: item.id,
        question: item.question,
        title: item.title,
        field_type: item.fieldType,
        project: item.project,
        is_active: item.isActive,
        mandatory: item.mandatory,
        order: item.order,
        answers: item.answers,
      };
      array.push(data);
      return item;
    });
    const saveData: any = {
      flexible_fields: array,
      // duration:bookingDetail.durations[0],
      // flexible_fields:flexibleDetail
    };
    try {
      const res = await saveFlexiblefieldDetail(
        {
          saveData,
        },
        ref
      );
      const { status, data } = res;
      switch (status) {
        case 200:
          // toast.success("Add Flexible Field Data");
          getDetailsofBookingFeild(ref);
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
  const handleChangeFlexibleFeildswitch = async (data: any, id: any) => {
    const tempFlexibleField = [...flexibleDetail];
    tempFlexibleField.forEach((data: any) => {
      if (data.id === id) {
        data.isActive = !data.isActive;
        if (!data.isActive)
        {
          data.mandatory = false;
        }
      }
    });
    // setFlexibleDetail(tempFlexibleField);

    const array: any[] = [];
    tempFlexibleField?.map((item: any) => {
      const data = {
        id: item.id,
        question: item.question,
        title: item.title,
        field_type: item.fieldType,
        project: item.project,
        is_active: item.isActive,
        mandatory: item.mandatory,
        order: item.order,
        answers: item.answers,
      };
      array.push(data);
      return item;
    });
    const saveData: any = {
      flexible_fields: array,
      // duration:bookingDetail.durations[0],
      // flexible_fields:flexibleDetail
    };
    try {
      const res = await saveFlexiblefieldDetail(
        {
          saveData,
        },
        ref
      );
      const { status, data } = res;
      switch (status) {
        case 200:
          toast.success("This Field is Active");
          getDetailsofBookingFeild(ref);
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

  const handleChangeFlexibleFeildcheckbox = async (data: any, id: any) => {
    const tempFlexibleField = [...flexibleDetail];
    tempFlexibleField.forEach((data: any) => {
      if (data.id === id) {
        data.mandatory = !data.mandatory;
      }
    });
    // setFlexibleDetail(tempFlexibleField);
    const array: any[] = [];
    tempFlexibleField?.map((item: any) => {
      const data = {
        id: item.id,
        question: item.question,
        title: item.title,
        field_type: item.fieldType,
        project: item.project,
        is_active: item.isActive,
        mandatory: item.mandatory,
        order: item.order,
        answers: item.answers,
      };
      array.push(data);
      return item;
    });
    const saveData: any = {
      flexible_fields: array,
      // duration:bookingDetail.durations[0],
      // flexible_fields:flexibleDetail
    };
    try {
      const res = await saveFlexiblefieldDetail(
        {
          saveData,
        },
        ref
      );
      const { status, data } = res;
      switch (status) {
        case 200:
          toast.success("This Field is Mandatory");
          getDetailsofBookingFeild(ref);
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
  const handleChangeswitch = (data: any, id: any,event:any) => {
    event?.preventDefault();
    const tempcorefield = [...coreFieldDetail];
    console.log('tempcorefield :>> ', tempcorefield);
    console.log('id :>> ', id);
    tempcorefield.forEach((field: any) => {
      if (field.id === id) {
      
        field.isActive = !field.isActive;
        if (!field.isActive)
        {
          field.mandatory = false;
        }
      }
    });
    onClickCoreFieldSave(tempcorefield)
    // setcoreFieldDetail(tempcorefield);

  };
  console.log('coreFieldDetail :>> ', coreFieldDetail);
  const handleChangeCheckbox = (data: any, id: any) => {
    const tempcorefield = [...coreFieldDetail];
    tempcorefield.forEach((field: any) => {
      if (field.id === id) {
        field.mandatory = !field.mandatory;
      }
    });
    onClickCoreFieldSave(tempcorefield);
  };
  const onClickCoreFieldSave = async (coreFieldDetail:any) => {
    const array: any[] = [];
    coreFieldDetail?.map((item: any) => {
      const data = {
        id: item.id,
        field: item.field.id,
        project: item.project,
        is_active: item.isActive,
        mandatory: item.mandatory,
      };
      array.push(data);
      return item;
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
          getDetailsofBookingFeild(ref);
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
  const handleAddFlexibleField = (id: any) => {
    if (id !== 0 && id.id!==0)
    {
      let data = {
        id,
        isshow:true
      }
      dispatch(handleADDFlexibleModal(data));
    }
    else {
      let data = {
       id:null,
        isshow:true
      }
      dispatch(handleADDFlexibleModal(data));
    }
    };
  const handleShowVehicleType = (coreFiledData:any) => {

       dispatch(handleShowVehicleTypeModal(true));
       dispatch(handleSetCoreFiledData(coreFiledData));
    }
  useEffect(() => {
    getDetailsofBookingFeild(ref);
  }, [!showVehicleTypeModal]);
  useEffect(() => {
    getDetailsofBookingFeild(ref);
  }, []);
  useEffect(() => {
    if (!showAddFlexibleField)
    {
      getDetailsofBookingFeild(ref)
     }
  }, [showAddFlexibleField]);

  return (
    <div
      className="tab-pane fade show active"
      id="nav-booking-fields"
      role="tabpanel"
      aria-labelledby="nav-booking-fields-tab">
      <div className="row">
        <div className="col-lg-6 col-md-12">
          <div className="cust-projset-box">
            <h4>Scheduling</h4>
            <div className="vehicle-form">
              <div className="table-responsive">
                <table className="table field-table">
                  <tr>
                    <th>
                      <p className="th-title">Field</p>
                    </th>
                    <th className="action-div">
                      <p className="th-title">Edit</p>
                    </th>
                  </tr>
                  <tr>
                    <td>
                      <p className="cuts-table-val">Duration</p>
                    </td>
                    <td className="action-div">
                      <Link
                        className="ad-edit"
                        to="#"
                        onClick={() => handleDurationModal()}>
                        <img src={images.editadmin} alt="edit" />
                      </Link>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
          <div className="cust-projset-box">
            <h4>Core Fields</h4>
            <div className="vehicle-form">
              <div className="table-responsive">
                {coreFieldDetail && 
                <>
                  <table className="table field-table">
                  <tr>
                    <th>
                      <p className="th-title">Field</p>
                      </th>
                      <th className="action-div acbox">
                      <p className="th-title">&nbsp;</p>
                    </th>
                    <th className="action-div acbox">
                      <p className="th-title">Active</p>
                    </th>
                    <th className="action-div">
                      <p className="th-title">Mandatory</p>
                    </th>
                  </tr>
                  {coreFieldDetail?.map((item: any) => (
                    <tr>
                      <td>
                        <p className="cuts-table-val">{item.field.field}</p>
                      </td>
                      <td className="action-div">
                        {
                          item.field?.isEditable!==false ? (
                            
                                   <Link className="ad-edit" to="#" onClick={()=>handleShowVehicleType(coreFieldDetail)}>
                                     <img src={images.editadmin} alt="edit"  />
                                   </Link>
                          ) :
                          (  <>&nbsp;</>)
                        }
                                 </td>
                      <td className="action-div acbox">
                        <div className="switch-box justify-content-center">
                          <label className="switch" htmlFor={item.field.id}>
                            <input
                              type="checkbox"
                              id={item.field.id}
                              checked={item.isActive}
                              onChange={(event:any) =>
                                handleChangeswitch(item, item.id,event)
                              }
                            />
                            <span className="slider round" />
                          </label>
                        </div>
                      </td>
                      <td className="action-div">
                        <div className="filtercheck-item p-0 justify-content-center">
                          <input
                            type="checkbox"                           
                            id={item.field.id}
                            checked={item.mandatory}
                            onChange={() =>
                              handleChangeCheckbox(item, item.id)
                            }
                            disabled={!item.isActive}
                            style={item.isActive?{cursor:'pointer'}:{cursor:'not-allowed'}}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </table>
                  {/* <div className="table-cust-btn">
                  <Button
                    buttonLabel="Save"
                    handleClick={() => onClickCoreFieldSave()}
                    className="btn white-btn"
                  />
                </div> */}
                </>
                }
             
              </div>
             
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-md-12">
          <div className="cust-projset-box">
            <h4>Flexible Fields</h4>
            <div className="vehicle-form">
              <div className="table-responsive">
                <DragDropContext onDragEnd={handleDragEnd}>
                  {flexibleDetail &&


                   <table className="table field-table">
                   <thead>
                     <tr>
                       <th className="action-div">
                         <p className="th-title text-left">Order</p>
                       </th>
                       <th>
                         <p className="th-title ">Field</p>
                       </th>
                       <th className="action-div">
                         <p className="th-title">Edit</p>
                       </th>
                       <th className="action-div">
                         <p className="th-title">Active</p>
                       </th>
                       <th className="action-div">
                         <p className="th-title">Mandatory</p>
                       </th>
                     </tr>
                   </thead>
                   <Droppable droppableId="droppable">
                     {(provided) => (
                       <tbody
                         ref={provided.innerRef}
                         {...provided.droppableProps}>
                         {flexibleDetail?.map((item: any, index: any) => (
                           <Draggable
                             draggableId={`${item.id}`}
                             index={index}
                             key={`${item.id}`}>
                             {(provided) => (
                               <tr
                                 ref={provided.innerRef}
                                 {...provided.draggableProps}>
                                 <td
                                   className="action-div text-left"
                                   {...provided.dragHandleProps}>
                                   <img
                                     src={images.dragIcon}
                                     alt="drag"
                                     className="table-drag-img"
                                   />
                                 </td>
                                 <td>
                                   <p className="cuts-table-val">
                                     {item.title}
                                   </p>
                                 </td>
                                 <td className="action-div">
                                   <Link className="ad-edit" to="#" onClick={()=>handleAddFlexibleField(item)}>
                                     <img src={images.editadmin} alt="edit"  />
                                   </Link>
                                 </td>
                                 <td className="action-div acbox">
                                   <div className="switch-box justify-content-center">
                                     <label className="switch">
                                       <input
                                         type="checkbox"
                                         name={item.title}
                                         checked={item.isActive}
                                         onChange={() =>
                                           handleChangeFlexibleFeildswitch(
                                             item,
                                             item.id
                                           )
                                         }
                                       />
                                       <span className="slider round" />
                                     </label>
                                   </div>
                                 </td>
                                 <td className="action-div">
                                   <div className="filtercheck-item p-0 justify-content-center">
                                     <input
                                       className="mr-0"
                                       type="checkbox"
                                       name={item.title}
                                       checked={item.mandatory}
                                       onChange={() =>
                                         handleChangeFlexibleFeildcheckbox(
                                           item,
                                           item.id
                                         )
                                       }
                                       disabled={!item.isActive}
                                       style={item.isActive?{cursor:'pointer'}:{cursor:'not-allowed'}}
                                     />
                                   </div>
                                 </td>
                               </tr>
                             )}
                           </Draggable>
                         ))}
                         {provided.placeholder}
                       </tbody>
                     )}
                   </Droppable>
                 </table>
                  }
                 
                </DragDropContext>
              </div>
              <div className="table-cust-btn">
                <Button
                  buttonLabel="Add new Field"
                  handleClick={() => handleAddFlexibleField(0)}
                  className="btn white-btn"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BookingFeilds;

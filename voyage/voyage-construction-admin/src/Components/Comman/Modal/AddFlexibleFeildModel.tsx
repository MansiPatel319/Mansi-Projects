import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

import { Link, useParams } from "react-router-dom";
import Select from "react-select";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  handleADDFlexibleModal,
  handleOpenEditProjectModal,
} from "../../../store/Actions/ProjectModule/projectActionCreators";

// component

import Input from "../../UI/Input";
import Label from "../../UI/Label";
import Button from "../../UI/Button";
import CommonErrorMessage from "../../UI/CommonErrorMessage";
import FeildErrorMessage from "../../UI/FeildErrorMessage";
import { AddflexibleField } from "../../../Network/Core/Project/BookingField";

// images
import images from "../../../Assets/images";
import useOutsideClick from "./ManageOutsideClickClose";

export interface ProjectListFilterProps {}

const AddFlexibleFeildModel = () => {
  const { t } = useTranslation();

  const editData = useSelector((state: any) => state.project.flexibleFieldData)
  const bookingField = useSelector((state: any) => state.project.bookingField)
  const dispatch = useDispatch();
  const [isSelection, setIsSelection] = useState<any>(false);
  const [addoption, setAddoption] = useState<any>(false);
  const [optionList, setOptionList] = useState<any>([]);
  const showAddFlexibleField=  useSelector(
    (state: any) => state.project.showAddFlexibleField
  );
  const [show,setShow] = useState(showAddFlexibleField)
  const refOutsideModel = useRef(null);
  const {
    register, // this use for evnets and value
    handleSubmit, // this is form submit handle
    setError,
    getValues,
    clearErrors,
    control,
    setValue,
    formState: { errors },
  } = useForm();
  const { ref } = useParams();

  const fieldType = [
    {
      label: "Free Text",
      value: 1,
    },
    {
      label: "Selection",
      value: 2,
    },
    {
      label: "File Upload",
      value: 3,
    },
    {
      label: "Checkbox",
      value: 4,
    },
  ];
  const onChangefeildtype = (val: any) => {
    if (val.label === "Selection") {
      setIsSelection(true);
    } else {
      setIsSelection(false);
    }
    setValue("FieldType", val);
  };
  const handleSortOptionList = () => {
    const tempsortdata = [...optionList];
    tempsortdata.sort((a: any, b: any) =>
      a.label > b.label ? 1 : b.label > a.label ? -1 : 0
    );
    setOptionList(tempsortdata);
  };
  const handleAddNewOption = () => {
    setValue("optionname", "");
    setAddoption(true);
  };
  const handleAddoptionDetail = () => {
    const tempdata = [...optionList];
    const obj: any = {
      value: Math.random(),
      label: getValues("optionname"),
    };
    tempdata.push(obj);
    setOptionList(tempdata);
    setAddoption(false);
  };
  const handleDeleteOption = (index: number) => {
    const list = [...optionList];
    list.splice(index, 1);
    setOptionList(list);
  };
  // const handleClose = () => {
  //   let data = {
  //    id:editData?.id || 0,
  //     isshow:false
  //   }
  //   dispatch(handleADDFlexibleModal(data));
  // };
  const handleCloseClick = () => {
    setValue("title","")
    setValue("Question", "")
    setValue("FieldType",undefined);
    setOptionList([]);
    setOptionList([]);
    setIsSelection(false);
    let data = {
     id:editData?.id || 0,
      isshow:false
    }
    dispatch(handleADDFlexibleModal(data));
    setShow(false)
  };
  useOutsideClick(refOutsideModel, () => { 
   
    if (showAddFlexibleField)
    {
     
      handleCloseClick()
    }
   
  })
  const handleSubmitNewFlexibleField = async (data: any) => {
    let ansData: any = [];
    const ans: never[] = [];
    if (optionList.length > 0) {
      optionList.map((ans: any, index: any) => {
        const tempdata: any = {
          value: ans.label,
          order: index,
          id:ans.id,
          question: ans.question
        };
        ansData.push(tempdata);
      });
    } else {
      ansData = null;
    }

    const data1 = {
      flexible_fields: [
        {
          title: data.title,
          question: data.Question,
          project:editData?.project,
          field_type: data.FieldType.value,
          is_active: editData?.isActive || false,
          mandatory:  editData?.mandatory || false,
          order:editData ? editData.order : bookingField.flexibleFields.length + 1,
          answers: ansData,
          id:editData?.id
        },
      ],
    };
    try {
      const res: any = await AddflexibleField(ref, data1);
      const { status } = res;
      switch (status) {
        case 200:
          handleCloseClick();

          toast.success("Add Successfully Flexible Field");
          setValue("title","")
          setValue("Question", "")
          setValue("FieldType",  {
            label: "Free Text",
            value: 1,
          });
          setIsSelection(false);
          setOptionList([]);
          break;
        case 400:
          break;
        case 403:
          // if (data.detail === "ERR_login_again_token_expired") {
          //   toast.error(t("userManagment.error_login_again"));
          //   localStorage.clear()
          //   navigate('/login')
          // }

          break;
        default:
          break;
      }
    } catch (err) {
      // toast.error(t("userManagment.error_something_went_wrong"));
    }
  };

  const onChange = (e: any) => {
    const { name, value } = e.target;
    switch (name) {
      case "title":
        if (value === "") {
          setError(name, {
            type: "required",
            message: "Title is required",
          });
        } else {
          clearErrors(name);
        }
        break;
      case "Question":
        if (value === "") {
          setError(name, {
            type: "required",
            message: "Question is required",
          });
        } else {
          clearErrors(name);
        }
        break;
      case "optionname":
        if (value === "") {
          setError(name, {
            type: "required",
            message: "option name is required",
          });
        } else {
          clearErrors(name);
        }
        break;

      default:
        break;
    }
  };

  const handleDragEnd = (results: any) => {
    if (!results.destination) return;
    const tempFlexibleField = [...optionList];
    const [selectedRow] = tempFlexibleField.splice(results.source.index, 1);
    tempFlexibleField.splice(results.destination.index, 0, selectedRow);
    setOptionList(tempFlexibleField);
  };
  useEffect(() => {
    if (editData && Object.keys(editData).length>0)
    {

      setValue("title",editData.title)
      setValue("Question", editData.question)
      setValue("FieldType",fieldType?.find(
        (c: any) => c.value === editData.fieldType
      ))
      onChangefeildtype(fieldType?.find(
        (c: any) => c.value === editData.fieldType
      ))
      if (editData?.answers?.length > 0)
        {
        editData.answers.map((item:any) => {
          item.label = item.value
          return item
          })
        setOptionList(editData.answers)
        }
        
        
      // setOptionList(editData.answers)
    }
    else {
      setValue("FieldType", {
        label: "Free Text",
        value: 1,
      })
    }
  }, [editData]);
  useEffect(() => {
    setValue("title","")
      setValue("Question", "")
      setValue("FieldType",  {
        label: "Free Text",
        value: 1,
      });
      setOptionList([]);
      setIsSelection(false);
  },[])
  useEffect(() => {
    if (showAddFlexibleField)
    {
      setShow(true)
    }    
  }, [showAddFlexibleField])
  return (  
    <>
      <div
      className={show ? "custom-modal modal fade show" : "custom-modal modal"}
      id={Math.random()+""}
      style={show ? { display: "block" } : {display:'none'}}>
        <div className="modal-dialog modal-sm modal-dialog-centered cust-new-modal">
          <div className="modal-content cust-new-proj-modal" ref={refOutsideModel}>
            <div className="modal-header">
              <h4 className="modal-title">{editData ? "Edit Flexible Field" : "Add New Flexible Field"}</h4>
              <Button
                buttonLabel="Close   &times;"
                className="close"
                handleClick={() => handleCloseClick()}
              />
            </div>

            <div className="modal-body">
              <div className="custmodal-formbox">
                <form className="form-root">
                  <div className="form-group">
                    <label>Title*</label>
                    <Input
                      inputName="title"
                      register={register}
                      rules={{
                        required: {
                          value: true,
                          message: "Title is required",
                        },

                        onChange: (e: any) => onChange(e),
                      }}
                      id="contact_edit_position"
                      inputType="text"
                    />
                    <FeildErrorMessage
                      errors={errors}
                      name="title"
                      containerClass="w-100"
                    />
                  </div>
                  <div className="form-group">
                    <label>Question*</label>
                    <Input
                      inputName="Question"
                      register={register}
                      rules={{
                        required: {
                          value: true,
                          message: "Question is required",
                        },

                        onChange: (e: any) => onChange(e),
                      }}
                      id="contact_edit_position"
                      inputType="text"
                    />
                    <FeildErrorMessage
                      errors={errors}
                      name="Question"
                      containerClass="w-100"
                    />
                  </div>
                  <div className="form-group">
                    <label>Field Type*</label>
                    <Controller
                      control={control}
                      name="FieldType"
                      // rules={{
                      //   required: {
                      //     value: true,
                      //     message: "Select Field Type",
                      //   },
                      // }}
                      render={({
                        field: { onChange, value, name, ref },
                      }: any) => (
                        <Select
                          // inputRef={ref}
                          classNamePrefix="form-control-language"
                          // defaultValue={selectedcalenderDaysList[0].value}
                          options={fieldType}
                          name="FieldType"
                          value={fieldType?.find(
                            (c: any) => c.value === value?.value
                          )}
                          onChange={(val: any) => onChangefeildtype(val)}
                          isDisabled={editData}
                        />
                      )}
                    />
                    <FeildErrorMessage
                      errors={errors}
                      name="FieldType"
                      containerClass="w-100"
                    />
                  </div>

                  <div className="option-box-wrapper">
                    {isSelection && (
                      <DragDropContext onDragEnd={handleDragEnd}>
                        <div className="custom-option-box">
                          <div className="option-header">
                            <h6>Options*</h6>
                            <Link to="" onClick={() => handleSortOptionList()}>
                              <img src={images.sorting} alt="sort" />
                            </Link>
                          </div>

                          {optionList?.length > 0 && (
                            <Droppable droppableId="droppable">
                              {(provided) => (
                                <ul
                                  className="cust-option-list"
                                  ref={provided.innerRef}
                                  {...provided.droppableProps}>
                                  {optionList?.map((item: any, index: any) => (
                                    <Draggable
                                      draggableId={`${item.value}`}
                                      index={index}
                                      key={`${item.value}`}>
                                      {(provided) => (
                                        <li
                                          className="co-liitem"
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}>
                                          <img
                                            src={images.dragIcon}
                                            alt="drag"
                                            className="drag-img"
                                          />
                                          <h5>{item.label}</h5>
                                          <Link
                                            onClick={() =>
                                              handleDeleteOption(index)
                                            }
                                            className="option-del"
                                            to="">
                                            <img src={images.cross} alt="" />
                                          </Link>
                                        </li>
                                      )}
                                    </Draggable>
                                  ))}
                                  {provided.placeholder}
                                </ul>
                              )}
                            </Droppable>
                          )}
                          {addoption && (
                            <>
                              <Input
                                inputName="optionname"
                                register={register}
                                rules={{
                                  required: {
                                    value: true,
                                    message: "option name is required",
                                  },

                                  onChange: (e: any) => onChange(e),
                                }}
                                id="contact_edit_position"
                                inputType="text"
                              />
                              <FeildErrorMessage
                                errors={errors}
                                name="optionname"
                                containerClass="w-100"
                              />
                              <Button
                                buttonLabel="Add"
                                className="theme-btn w-100"
                                handleClick={() => handleAddoptionDetail()}
                              />
                            </>
                          )}

                          <div className="add-new-field">
                            <Link onClick={() => handleAddNewOption()} to="">
                              <span>Add New Option</span>
                              <img src={images.plusTheme} alt="" />
                            </Link>
                          </div>
                        </div>
                      </DragDropContext>
                    )}
                  </div>

                  <div className="modal-cs-btnbox custom_flexibleField">
                    <Button
                      buttonLabel={editData ? "Edit Field" : "Add Field"}
                      className="theme-btn w-100"
                      handleClick={handleSubmit(handleSubmitNewFlexibleField)}
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

export default AddFlexibleFeildModel;


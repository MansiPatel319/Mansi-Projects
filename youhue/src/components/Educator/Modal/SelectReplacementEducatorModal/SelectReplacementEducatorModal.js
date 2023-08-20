import React, { Component, useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import Select from "react-select";
import dropdownImage from "../../../../assets/images/icons/dropdown.svg";
import DropDownList from "../../../UI/DropDownList";
import imageIcon from "../../../../assets/images/icons/user-new-icon.svg";
import { Link } from "react-router-dom";

const SelectReplacementEducatorModal = ({
  eduList,
  onClose,
  show,
  replacementClassList,
  eduID,
  handleRelacementEducator,
}) => {
  const [selctedOption, setselctedOption] = useState("")
  
  
  // const educatorOption =
  //   eduList !== "" &&
  //   eduList.map(({ user: { id: value, professor_name: label } }) => ({
  //     value,
  //     label,
  //   }));
  const temArr = [];
  let cloneData = [...eduList];
  cloneData = cloneData.filter(eduList => eduList.user.verified_email===true && eduList.user.id != eduID)
  
  const educatorOption =  cloneData.length != ""  &&  cloneData.map(
    ({ user: { professor_name: label, id: value, email: email } }) => ({
      value: value,
      label: (
        <div className="select-card-dropdown-div">
            <div className="dd-container" >
              <Link to="#" className="dd-option">
                {" "}
                <span className="span-img">
                  <img className="dd-option-image" src={imageIcon} />
                </span>{" "}
                <label className="dd-option-text" style={{textAlign:"left"}}>{label}</label>{" "}
                <small className="dd-option-description dd-desc" style={{textAlign:"left"}}>
                  {email}
                </small>
              </Link>
            </div>
          </div>
        ),
      })
      );

  const [classList, setClassList] = useState(replacementClassList);
  const customStyles = {
    indicatorSeparator: (base, state) => ({
      ...base,
      background: "none",
    }),
    placeholder: (provided, state) => ({
      ...provided,
    }),
    control: (base, { isSelected, isFocused }) => ({
      ...base,
      background: "#fff",
      border: isFocused
        ? "2px solid #652d90 !important"
        : "2px solid #e2d0d0 !important",
      borderRadius: "10px",
      minHeight: "50px",
      marginBottom: "5px",
      padding: "0px 20px 0px 12px",
      fontSize: "18px",
      color: "#3f3f44",
      lineHeight: "24px",
      letterSpacing: "0",
      textSlign: "left",
      fontWeight: 400,
      fontFamily: "Omnes",
      boxShadow: isFocused ? "2px solid #652d90 !important" : "none",
    }),
    menu: (provided, { isSelected }) => ({
      ...provided,
      background: "#fff",
      border: "1px solid #dfeaf1",
      position: "absolute",
      marginTop: "0",
      boxShadow: "none",
      borderRadius: "0",
      fontFamily: "Omnes",
    }),
    option: (provided, { isSelected, isFocused }) => ({
      color: isFocused ? "#fff" : "balck",
      cursor: "default",
      display: "block",
      fontSize: "inherit",
      padding: "8px 12px",
      width: " 100%",
      userSelect: "none",
      fontFamily: "Omnes",
      fontWeight: 500,
      boxSizing: "border-box",
      backgroundColor: isFocused ? "#652d90" : isSelected ? "#ddd" : null,
    }),
    container: (provided) => ({
      ...provided,
      width: "100%",
      position: "relative",
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: "0",
      fontWeight: "400",
      display: "flex",
      alignItems: "center",
      flexWrap: "wrap",
      minHeight: "50px",
    }),
    singleValue: (provided, state) => ({
      ...provided,
      color: "#3f3f44",
      fontWeight: "400",
      fontSize: "18px",
      lineHeight: "1.5",
      width: "calc(100% - 45px)",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    }),
    indicatorsContainer: (provided, state) => ({
      ...provided,
      right: "20px",
      position: "absolute",
      top: "15px",
      height: "22px",
      width: "20px",
    }),
  };

  const DropdownIndicator = (props) => {
    return <img src={dropdownImage} alt=""></img>;
  };

  const handleChange = (selectedOption, classData) => {
    // setselctedOption(selectedOption)
    // this.setState({ selectedOption });
    const updateClassList = [...classList];
    updateClassList.map((item) => {
      if (item.id === classData.id) {
        item.educatorSeletcedOption = selectedOption;
      }
      return item;
    });

    setClassList(updateClassList);
  };
  const handleSubmit = () => {
    const formData = new FormData();
    const groupList = classList.map((data,index)=>{
      return(
        { class_id: data.id ,
          replace_edu_id:data.educatorSeletcedOption.value 
        }
      )
    })
    // const formData = {
    //   remove_educator_id: eduID,
    //   add_educator_id:classList[0].educatorSeletcedOption.value,
    //   grp_lst:groupList
     
    // }
    formData.append("remove_educator_id",eduID)
    formData.append("add_educator_id",classList[0].educatorSeletcedOption.value)
    
    formData.append("grp_lst",JSON.stringify(groupList))
    // formData.append("remove_educator_id", eduID);
    // classList.map((data, index) => {
    //   formData.append(
    //     `add_educator_id`,
    //     1
    //   );
    //   formData.append(`class_id[${index}][${index}]`, data.id);
    // });
    handleRelacementEducator(formData);
  };
  const RenderClassComponentWithDropDown = ({
    educatorDataOption,
    classData,
  }) => {
    return (
      <div className="col-lg-12 col-md-12">
        <div className="form-group form-group-wt-label2 select2-form-group">
          <label className="label" for="">
            Class: <b>{classData.name}</b>
          </label>
          <DropDownList
            value={classData.educatorSeletcedOption}
            handleOptionChange={(selectedOption) =>
              handleChange(selectedOption, classData)
            }
            options={educatorOption}
            placeholder={
              <div className="select-card-dropdown-div">
                <div className="dd-container">
                  <Link to="#" className="dd-option">
                    <span className="span-img">
                      <img
                        className="dd-option-image"
                        src={imageIcon}
                      />
                    </span>
                    <label className="dd-placeholder-text">
                      Select an Educator
                    </label>
                  </Link>
                </div>
              </div>
            }
          />
          {/* <div className="input-div">
            <div className="selectbox-inline">
              <div className="select-box select-common select-box-group select-custom2">
                <Select
                  value={classData.educatorSeletcedOption}
                  onChange={(selectedOption) =>
                    handleChange(selectedOption, classData)
                  }
                  placeholder="Select an educator"
                  styles={customStyles}
                  options={educatorDataOption}
                  components={{ DropdownIndicator }}
                  // menuIsOpen={true}
                />
              </div>
            </div>
          </div> */}
        </div>
      </div>
    );
  };

  return (
    <>
   
      <Modal
        size="lg"
        className="modal modal-custom modal-custom-new fade"
        id="select-replacement-educator-modal"
        show={show}
        onHide={onClose}
        centered
      >
        <div className=" modal-lg modal-dialog-centered">
          <div className="modal-content">
            <Modal.Header className="modal-header">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                onClick={() => {
                  onClose();
                }}
              >
                <span className="custom-icon cancel-new-icon-01"></span>
              </button>
              <div className="heading-title-div">
                <h2 className="modal-title">Select replacement educator</h2>
              </div>
            </Modal.Header>
            <Modal.Body size="lg" className="modal-body">
              <div className="edit-form-school-card-root">
                <div className="form-custom-div form-custom-400-div form-custom-select-div">
                  <div className="row">
                    {classList.map((data) => {
                      return (
                        <RenderClassComponentWithDropDown
                          educatorDataOption={temArr}
                          classData={data}
                        />
                      );
                    })}

                    {/* <RenderClassComponentWithDropDown
                        educatorDataOption={educatorOption}
                      /> */}
                  </div>
                  <div className="row">
                    <div className="col-lg-12 col-md-12">
                      <div className="button-row button-row-add-school">
                        <div className="center-side-button">
                          <button
                            className="btn btn-common-primary btn-primary-width240"
                            // disabled
                            onClick={handleSubmit}
                          >
                            Save changes
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="notes-blm-div">
                  <p>* A class must have one educator at All Times.</p>
                </div>
              </div>
            </Modal.Body>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default SelectReplacementEducatorModal;

import React, { useRef } from "react";
import Select from "react-select";
import dropdownImage from "../../assets/images/icons/dropdown.svg";
const DropdownIndicator = (props) => {
  return <img src={dropdownImage}></img>;
};

const DropDownList = ({
  value,
  handleOptionChange,
  options,
  placeholder,
  placeholderStyle,
  optionStyle,
  controlStyle,
  menuStyle,
}) => {
  const selectRef = useRef();
  const customStyles = {
    indicatorSeparator: (base, state) => ({
      ...base,
      background: "none",
    }),

    placeholder: (provided, state) => ({
      ...provided,

      ...placeholderStyle,
    }),

    control: (base, { isSelected, isFocused }) => ({
      ...base,
      width: "inherit",
      border: "2px solid #e2d0d0",
      minHeight: "50px",
      borderRadius: selectRef?.current?.state?.menuIsOpen
        ? "10px 10px 0 0"
        : "10px",
      background: "#fff",
      position: "relative",
      cursor: "pointer",
      boxShadow: "none",
      outline: "none",
      "&:hover": { borderColor: "#e2d0d0" },
      ...controlStyle,
    }),
    option: (styles, { isFocused, isSelected }) => {
      return {
        ...styles,
      };
    },
    menu: (provided, { isSelected }) => ({
      ...provided,
      position: "absolute",
      zIndex: "2000",
      // margin: isSelected ? "0 0 0 2px" : "0",
      margin: "0",
      padding: "0",
      background: "#fff",
      overflow: "auto",
      boxShadow: "none",
      borderRadius: "0 0 10px 10px",
      marginTop: "-5px",
      width: "100%",
      display: "block",
      border: "2px solid #e2d0d0",
      borderTop: selectRef?.current?.state?.menuIsOpen
        ? "0px solid #e2d0d0"
        : "2px solid #e2d0d0",
      ...menuStyle,
    }),
    option: (provided, { isSelected, isFocused }) => ({
      overflow: "hidden",
      textDecoration: "none",
      // color: "#333",
      cursor: "pointer",

      // display: "flex",

      flexWrap: "wrap",
      position: "relative",
      minHeight: "50px",
      margin: "-5px 0px 0px 0px",
      padding: "0 0 0 2px",
      // padding:'2px 50px 0 60px',
      // padding: "0 0 0 45px",
      backgroundColor: isFocused ? "#f6f6f6" : isSelected ? "#f6f6f6" : null,

      color: "#3f3f44",
      fontWeight: "500",
      fontSize: "15px",
      lineHeight: "1",
      // padding: "10px 0 0 15px",
      width: "100%",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      display: "inline-block",
      height: "28px",
      ...optionStyle,
    }),
    container: (provided) => ({
      ...provided,
      width: "100%",
      position: "relative",
      // border:isSelected ? "2px solid #e2d0d0" : "2px solid #e2d0d0"
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
      // padding: " 2px 50px 0 60px",
      width: "calc(100% - 45px)",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      paddingLeft: placeholderStyle && "8px",
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

  return (
    <Select
      ref={selectRef}
      value={value}
      onChange={handleOptionChange}
      options={options}
      styles={customStyles}
      placeholder={placeholder}
      components={{ DropdownIndicator }}
      isSearchable={false}
      // menuIsOpen={true}
    />
  );
};

export default DropDownList;

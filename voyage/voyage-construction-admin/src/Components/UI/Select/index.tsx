import React, { CSSProperties } from "react";
import Select, { StylesConfig } from "react-select";

type ReactFragment = Iterable<ReactNode>;
type ReactNode = string | number | ReactFragment | boolean | null | undefined;

export interface SelectOption {
  readonly value: string;
  readonly label: string;
  readonly id: string;
  // readonly isFixed?: boolean;
  // readonly isDisabled?: boolean;
}
export interface SelectProps {
  value: object | null;
  onChange: (newValue: any) => void;
  options: readonly SelectOption[];
  placeholder?: ReactNode;
  isSearchable?: boolean;
  indicatorContainerStyle?: any;
  controlStyle?: any;
  dropDownContainerStyle?: any;
  containerStyle?: any;
  menuStyle?: any;
  placeholderStyle?: any;
  optionStyle?: any;
  //   menuItemStyle?: any;
}

export default function index(props: SelectProps) {
  const {
    value,
    onChange,
    options,
    placeholder,
    indicatorContainerStyle,
    controlStyle,
    dropDownContainerStyle,
    containerStyle,
    menuStyle,
    placeholderStyle,
    isSearchable,
    optionStyle,
    // menuItemStyle,
  } = props;
  const customControlStyles: CSSProperties = {
    height: "45px",
    lineHeight: "40px",
    fontSize: "18px",
    color: "#000",
    fontWeight: 500,
    boxShadow: "none",
    paddingLeft: "12px",
    outline: "none",
    borderRadius: "10px !important",
    border: "1px solid #D6E3F5 !important",
    "&:hover": {
      border: "1px solid #D6E3F5",
    },
    ...controlStyle,
  };
  const selectStyle: StylesConfig<object, false, any> | undefined = {
    indicatorSeparator: (base) => ({
      ...base,
      display: "none",
      // ...indicatorSeparatorStyle,
    }),
    container: (base) => ({
      ...base,
      width: "calc(100% - 60px) !important",
      boxShadow: "none",
      outline: "none",
      marginRight: "60px",
      ...containerStyle,
    }),
    indicatorsContainer: (base) => ({
      ...base,
      right: "-60px",
      position: "absolute",
      width: "45px",
      minWidth: "45px",
      height: "45px",
      background:
        " transparent linear-gradient( 132deg, #0072FF 0%, #00C6FF 100%) 0% 0% no-repeat padding-box",
      borderRadius: "10px !important",
      ...indicatorContainerStyle,
    }),
    singleValue: (provided) => ({
      ...provided,
      top: "45%",
      color: "#000",
    }),
    input: (provided) => ({
      ...provided,
      margin: "0px !important",
      paddingTop: "0px !important",
      paddingBottom: "0px !important",
    }),
    placeholder: (provided) => ({
      ...provided,
      top: "45%",
      color: "rgba(0, 0, 0, 0.3) !important",
      ...placeholderStyle,
    }),
    control: (provided) => {
      return {
        ...provided,
        ...customControlStyles,
      };
    },
    dropdownIndicator: (base, state) => ({
      ...base,
      transition: "all .2s ease",
      transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : null,
      color: "#fff !important",
      padding: "12px !important",
      ...dropDownContainerStyle,
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 9999,
      borderRadius: "10px !important",
      border: "0px solid #D6E3F5 !important",
      padding: "12px 21px 20px 21px",
      ...menuStyle,
    }),
    option: (styles, { isFocused, isSelected }) => ({
      ...styles,
      backgroundColor: "transparent !important",
      color: isFocused ? "#F98D29 !important" : isSelected ? "#F98D29" : null,
      fontSize: "18px",
      lineHeight: "15px",
      padding: "10px 0px 10px 0px",
      cursor: "pointer",
      ...optionStyle,
    }),
    // menuItem: (provided) => ({
    //   ...provided,
    //   ...menuItemStyle,
    // }),
  };
  return (
    <Select
      value={value}
      onChange={onChange}
      options={options}
      styles={selectStyle}
      placeholder={placeholder}
      isSearchable={isSearchable}
    />
  );
}

// export default Selects;

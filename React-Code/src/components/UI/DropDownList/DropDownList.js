import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

const DropDownList = ({ value, onChange, options, placeholder,singleValueStyle, controlStyle, menuStyle, containerStyle, valueContainerStyle, placeholderStyle, indicatosContainerStyle, indicatorContainerStyle,optionStyle, menuListStyle, dropdownIndicatorStyle,svgStyle,handleClick ,isSearchable}) => {
  const customStyles = {
    container:(base)=>({
      ...base,
      ...containerStyle,
    }),
    indicatorSeparator: (base) => ({
      ...base,
      display: 'none',
    }),
    indicatorsContainer:(base) =>({
      ...base,
      ...indicatosContainerStyle,
    }),
    indicatorContainer:(base) => ({
      ...base,
      ...indicatorContainerStyle,
    }),
    dropdownIndicator: (base, state) => ({
      ...base,
      transition: dropdownIndicatorStyle && 'all .2s ease',
      transform: dropdownIndicatorStyle  && state.selectProps.menuIsOpen ? 'rotate(180deg)' : null
    }),
    placeholder: (provided) => ({
      ...provided,
      fontSize: 18,
      color: '#fff',
      fontWeight: 600,
      ...placeholderStyle,
    }),
    control: (base) => ({
      ...base,
      borderRadius: '26px',
      minHeight: '50px',
      backgroundColor: 'transparent',
      border: '1px solid rgba(255, 255, 255, 0.24)',
      boxShadow: '0 3px 3px 0 rgba(203, 203, 203, 0)',
      fontSize: 18,
      color: '#fff',
      fontWeight: 400,
      padding: '8px 25px 5px 22px',
      '&:hover': {
        border: '1px solid rgba(255, 255, 255, 0.24)',
      },
      ...controlStyle,
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#fff',
      ...singleValueStyle,
    }),
    option: (styles, { isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor: isFocused && !optionStyle ? '#ef6b18' : isSelected && !optionStyle ? '#ef6b18 ' : optionStyle && optionStyle.background ||'#1e1e27',
        color: optionStyle && isFocused ? '#fff' : optionStyle ? optionStyle.color :'#fff',
        padding: isSelected && !optionStyle ? '10px 30px' : optionStyle?optionStyle.padding:'10px 35px',
        fontWeight:optionStyle ? optionStyle.fontWeight :500,
        lineHeight:optionStyle ? optionStyle.lineHeight :'24px',
        fontSize: optionStyle ? optionStyle.fontWeight :'18px',
        letterSpacing: optionStyle ? optionStyle.letterSpacing: '0.47px',
        borderBottom: isSelected && !optionStyle ? '1px solid #222' : optionStyle && optionStyle.borderBottom || '1px solid rgba(255, 255, 255, 0.08)',
        cursor: optionStyle && isFocused && 'pointer',
        
        
      };
    },
    menuList: (base) => ({
      ...base,
      backgroundColor: '#191919',
      ...menuListStyle,
    }),
    ValueContainer: (base) => ({
      ...base,
      color: '#fff',
      ...valueContainerStyle,
    }),
    input: (base) => ({
      ...base,
      color: '#fff',
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 9999,
      ...menuStyle,
    }),
    svg:(style) => ({
      ...style,
      ...svgStyle,
    }),
  };
  return (
    <Select
      value={value}
      onChange={onChange}
      options={options}
      placeholder={placeholder}
      styles={customStyles}
      onMenuOpen ={handleClick}
      onMenuClose ={handleClick}
      isSearchable={isSearchable}
      
    />
  );
};

export default DropDownList;
DropDownList.propTypes = {
  value: PropTypes.any,
  options: PropTypes.any,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  controlStyle: PropTypes.any,
  menuStyle: PropTypes.any,
  containerStyle: PropTypes.any,
  valueContainerStyle: PropTypes.any,
  placeholderStyle: PropTypes.any,
  indicatosContainerStyle: PropTypes.any,
  indicatorContainerStyle: PropTypes.any,
  optionStyle: PropTypes.any,
  menuListStyle: PropTypes.any,
  dropdownIndicatorStyle: PropTypes.any,
  svgStyle: PropTypes.any,
  handleClick: PropTypes.any,
  singleValueStyle: PropTypes.any,
  isSearchable: PropTypes.any
  
};

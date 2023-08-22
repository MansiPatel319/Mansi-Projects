/* eslint-disable indent */
/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import chroma from 'chroma-js';
import toast from 'react-hot-toast';

// UI components
import Label from '../../UI/Label';
import TextInput from '../../UI/TextInput';
import ErrorLabel from '../../UI/ErrorLabel';
import RadioInput from '../../UI/RadioInput';
import SelectInput from '../../UI/ReactSelect';
import MultiSelect from '../../UI/ReactMultiSelect';
import CollapseView from '../../UI/CollapseView';

// Css
import '../../../Assets/css/styles.css';

// Utils helpers
import ModalComponent from '../../UI/Modal';
import { randomStrForId } from '../../../Utils';

export const colourOptions = [
  { value: 'ocean', label: 'Ocean', color: '#00B8D9', isFixed: true },
  { value: 'blue', label: 'Blue', color: '#0052CC', isDisabled: true },
  { value: 'purple', label: 'Purple', color: '#5243AA' },
  { value: 'red', label: 'Red', color: '#FF5630', isFixed: true },
  { value: 'orange', label: 'Orange', color: '#FF8B00' },
  { value: 'yellow', label: 'Yellow', color: '#FFC400' },
  { value: 'green', label: 'Green', color: '#36B37E' },
  { value: 'forest', label: 'Forest', color: '#00875A' },
  { value: 'slate', label: 'Slate', color: '#253858' },
  { value: 'silver', label: 'Silver', color: '#666666' },
];

const dot = (color = '#ccc') => ({
  alignItems: 'center',
  display: 'flex',

  ':before': {
    backgroundColor: color,
    borderRadius: 10,
    content: '" "',
    display: 'block',
    marginRight: 8,
    height: 10,
    width: 10,
  },
});

const colourStyles = {
  control: (styles) => ({ ...styles, backgroundColor: 'white' }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: isDisabled
        ? undefined
        : isSelected
        ? data.color
        : isFocused
        ? color.alpha(0.1).css()
        : undefined,
      color: isDisabled
        ? '#ccc'
        : isSelected
        ? chroma.contrast(color, 'white') > 2
          ? 'white'
          : 'black'
        : data.color,
      cursor: isDisabled ? 'not-allowed' : 'default',

      ':active': {
        ...styles[':active'],
        backgroundColor: !isDisabled
          ? isSelected
            ? data.color
            : color.alpha(0.3).css()
          : undefined,
      },
    };
  },
  input: (styles) => ({ ...styles, ...dot() }),
  placeholder: (styles) => ({ ...styles, ...dot() }),
  singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
};

const colourStylesMultiple = {
  control: (styles) => ({ ...styles, backgroundColor: 'white' }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: isDisabled
        ? undefined
        : isSelected
        ? data.color
        : isFocused
        ? color.alpha(0.1).css()
        : undefined,
      color: isDisabled
        ? '#ccc'
        : isSelected
        ? chroma.contrast(color, 'white') > 2
          ? 'white'
          : 'black'
        : data.color,
      cursor: isDisabled ? 'not-allowed' : 'default',

      ':active': {
        ...styles[':active'],
        backgroundColor: !isDisabled
          ? isSelected
            ? data.color
            : color.alpha(0.3).css()
          : undefined,
      },
    };
  },
  multiValue: (styles, { data }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: color.alpha(0.1).css(),
    };
  },
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: data.color,
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    color: data.color,
    ':hover': {
      backgroundColor: data.color,
      color: 'white',
    },
  }),
};

const Tooltip = () => {
  const [name, setname] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('Male');
  const [isShowModal, setIsShowModal] = useState(false);

  const handleToast = () => {
    toast.success('Hello your are learning react here');
  };
  const handleToastError = () => {
    toast.error('Hello your are learning react here');
  };
  const handleToastLoading = () => {
    toast.loading('Waiting...');
  };

  const handleToggleModal = () => {
    setIsShowModal(!isShowModal);
  };

  return (
    <div className="m-3">
      <div>
        <h2>React Basic Elements with props</h2>
      </div>
      <div className="col-6 mt-4">
        <Label label="TextBox" classNameStyle="react-std-label-span" />
        <TextInput
          type="text"
          placeholder="Enter your name"
          name={randomStrForId()}
          value={name}
          onChange={(e) => setname(e.target.value)}
          onBlur={() => {}}
          onFocus={() => {}}
          classNameStyle="form-control"
        />
        <ErrorLabel
          error="Enter your name"
          classNameStyle="react-std-error-label-span"
        />
      </div>
      <div className="col-6 mt-4">
        <Label label="Date" classNameStyle="react-std-label-span" />
        <TextInput
          type="date"
          placeholder="Enter your birth date"
          name={randomStrForId()}
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          onBlur={() => {}}
          onFocus={() => {}}
          classNameStyle="form-control"
        />
      </div>
      <div className="col-6 mt-4">
        <Label label="Radio" classNameStyle="react-std-label-span" />
        <RadioInput
          inline
          label="Male"
          name="gender"
          type="radio"
          id={randomStrForId()}
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        />
        <RadioInput
          inline
          label="Female"
          name="gender"
          type="radio"
          id={randomStrForId()}
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        />
      </div>
      <div className="col-6 mt-4">
        <Label label="Select" classNameStyle="react-std-label-span" />
        <SelectInput
          defaultValue={colourOptions[2]}
          options={colourOptions}
          styles={colourStyles}
        />
      </div>
      <div className="col-6 mt-4">
        <Label label="Multiple Select" classNameStyle="react-std-label-span" />
        <MultiSelect
          closeMenuOnSelect={false}
          defaultValue={[colourOptions[0], colourOptions[1]]}
          isMulti
          options={colourOptions}
          styles={colourStylesMultiple}
        />
      </div>
      <div className="col-6 mt-4">
        <button
          className="btn btn-success mr-2"
          type="submit"
          onClick={handleToast}>
          Toast Here Success
        </button>
        <button
          className="btn btn-danger mr-2"
          type="submit"
          onClick={handleToastError}>
          Toast Here Error
        </button>
        <button
          className="btn btn-info"
          type="submit"
          onClick={handleToastLoading}>
          Toast Here Loading
        </button>
      </div>
      <div className="col-6 mt-4">
        <Label label="Collapse View" classNameStyle="react-std-label-span" />
        <CollapseView />
      </div>
      <div className="col-6 mt-4">
        <Label
          label="React bootstrap modal"
          classNameStyle="react-std-label-span"
        />
        <button
          className="btn btn-primary"
          type="submit"
          onClick={handleToggleModal}>
          React Modal
        </button>
      </div>
      <ModalComponent isShow={isShowModal} handleHide={handleToggleModal} />
    </div>
  );
};
export default Tooltip;

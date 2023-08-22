import React, { useState } from 'react';

// UI components
import ErrorLabel from '../../UI/ErrorLabel';
import Label from '../../UI/Label';
import TextInput from '../../UI/TextInput';
import CustomButton from '../../UI/CustomButton';
import DatePicker from '../../UI/DataPicker';
import RadioInput from '../../UI/RadioInput';

// Css
import '../../../Assets/css/styles.css';

// Utils and language helpers
import FormatText, { convertText } from '../../../Resources/Languages';
import {
  calculateAge,
  isCheckLength,
  isCheckOnlyNumber,
  isPassword,
  isRequired,
  randomStrForId,
  validateEmail,
} from '../../../Utils';

const validationCommonForm = () => {
  const [fullName, setFullName] = useState('');
  const [fullNameErr, setFullNameErr] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [emailAddressErr, setEmailAddressErr] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneNumberErr, setPhoneNumberErr] = useState('');
  const [password, setPassword] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [startDate, setStartDate] = useState('');
  const [startDateErr, setStartDateErr] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [birthDateErr, setBirthDateErr] = useState('');
  const [image, setImage] = useState('');
  const [imageErr, setImageErr] = useState('');
  const [checkbox1, setCheckbox1] = useState(false);
  const [checkbox2, setCheckbox2] = useState(false);
  const [checkbox3, setCheckbox3] = useState(false);
  const handleFormOnChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'Name':
        if (isRequired(value)) {
          setFullNameErr(
            <FormatText text="validationFrom.err.fullName.required" />,
          );
          setFullName('');
        } else {
          setFullNameErr('');
          setFullName(value);
        }
        break;
      case 'EmailAddress':
        if (isRequired(value)) {
          setEmailAddressErr(
            <FormatText text="validationFrom.err.emailAddress.required" />,
          );
          setEmailAddress('');
        } else if (!validateEmail(value)) {
          setEmailAddressErr(
            <FormatText text="validationFrom.err.emailAddress.valid" />,
          );
          setEmailAddress(value);
        } else {
          setEmailAddressErr('');
          setEmailAddress(value);
        }
        break;
      case 'phoneNumber':
        if (isRequired(value)) {
          setPhoneNumberErr(
            <FormatText text="validationFrom.err.phone.required" />,
          );
          setPhoneNumber('');
        } else if (!isCheckOnlyNumber(value)) {
          setPhoneNumberErr(
            <FormatText text="validationFrom.err.phone.onlyNumber" />,
          );
          setPhoneNumber(value);
        } else if (isCheckLength(value, 10)) {
          setPhoneNumberErr(
            <FormatText text="validationFrom.err.phone.valid" />,
          );
          setPhoneNumber(value);
        } else {
          setPhoneNumberErr('');
          setPhoneNumber(value);
        }
        break;
      case 'password':
        if (isRequired(value)) {
          setPasswordErr(
            <FormatText text="validationFrom.err.password.required" />,
          );
          setPassword('');
        } else if (!isPassword(value)) {
          setPasswordErr(
            <FormatText text="validationFrom.err.password.valid" />,
          );
          setPassword(value);
        } else {
          setPasswordErr('');
          setPassword(value);
        }
        break;
      default:
        break;
    }
  };
  const handleDateChange = (date, name) => {
    switch (name) {
      case 'startDate':
        setStartDate(date);
        setStartDateErr('');
        break;
      case 'BirthDate':
        if (calculateAge(date) > 18) {
          setBirthDate(date);
          setBirthDateErr('');
        } else {
          setBirthDate('');
          setBirthDateErr(
            <FormatText text="validationFrom.err.birthdate.valid" />,
          );
        }
        break;
      default:
        break;
    }
  };
  const handleImageChange = (e) => {
    const selectImage = e.target.files[0];
    if (selectImage.size / 1024 > 5120) {
      setImageErr(<FormatText text="validationFrom.err.chooseImage.valid" />);
      setImage('');
    } else {
      setImage(selectImage);
      setImageErr('');
    }
  };

  const isValidForm = () => {
    let isValid = true;
    if (isRequired(fullName)) {
      setFullNameErr(
        <FormatText text="validationFrom.err.fullName.required" />,
      );
      isValid = false;
    }
    if (isRequired(emailAddress)) {
      setEmailAddressErr(
        <FormatText text="validationFrom.err.emailAddress.required" />,
      );
      isValid = false;
    } else if (!validateEmail(emailAddress)) {
      setEmailAddressErr(
        <FormatText text="validationFrom.err.emailAddress.valid" />,
      );
      isValid = false;
    }
    if (isRequired(phoneNumber)) {
      setPhoneNumberErr(
        <FormatText text="validationFrom.err.phone.required" />,
      );
      isValid = false;
    } else if (!isCheckOnlyNumber(phoneNumber)) {
      setPhoneNumberErr(
        <FormatText text="validationFrom.err.phone.onlyNumber" />,
      );
      isValid = false;
    } else if (isCheckLength(phoneNumber, 10)) {
      setPhoneNumberErr(<FormatText text="validationFrom.err.phone.valid" />);
      isValid = false;
    }
    if (isRequired(password)) {
      setPasswordErr(
        <FormatText text="validationFrom.err.password.required" />,
      );
      isValid = false;
    } else if (!isPassword(password)) {
      setPasswordErr(<FormatText text="validationFrom.err.password.valid" />);
      isValid = false;
    }
    if (isRequired(startDate)) {
      setStartDateErr(
        <FormatText text="validationFrom.err.startDate.required" />,
      );
      isValid = false;
    }
    if (isRequired(birthDate)) {
      setBirthDateErr(
        <FormatText text="validationFrom.err.birthdate.required" />,
      );
      isValid = false;
    } else if (calculateAge(birthDate) < 18) {
      setBirthDateErr(<FormatText text="validationFrom.err.birthdate.valid" />);
      isValid = false;
    }
    if (isRequired(image)) {
      setImageErr(
        <FormatText text="validationFrom.err.chooseImage.required" />,
      );
      isValid = false;
    } else if (image.size / 1024 > 5120) {
      setImageErr(<FormatText text="validationFrom.err.chooseImage.valid" />);
      isValid = false;
    }
    return isValid;
  };
  const handleOnSubmit = () => {
    const isValid = isValidForm();
    if (isValid) {
      // eslint-disable-next-line no-alert
      alert('All Data is Valid and submmited');
    }
  };
  return (
    <div className="m-3">
      <div>
        <h2>React Basic Elements with props</h2>
      </div>
      <div className="col-6 mt-4">
        <Label
          label={<FormatText text="validationFrom.fullName" />}
          classNameStyle="react-std-label-span"
        />
        <TextInput
          type="text"
          placeholder={convertText('validationFrom.fullName')}
          name="Name"
          value={fullName}
          onChange={handleFormOnChange}
          onBlur={() => {}}
          onFocus={() => {}}
          classNameStyle="form-control"
        />
        {fullNameErr && (
          <ErrorLabel
            error={fullNameErr}
            classNameStyle="react-std-error-label-span"
          />
        )}
      </div>
      <div className="col-6 mt-4">
        <Label
          label={<FormatText text="validationFrom.emailAddress" />}
          classNameStyle="react-std-label-span"
        />
        <TextInput
          type="text"
          placeholder={convertText('validationFrom.emailAddress')}
          name="EmailAddress"
          value={emailAddress}
          onChange={handleFormOnChange}
          onBlur={() => {}}
          onFocus={() => {}}
          classNameStyle="form-control"
        />
        {emailAddressErr && (
          <ErrorLabel
            error={emailAddressErr}
            classNameStyle="react-std-error-label-span"
          />
        )}
      </div>
      {/* <div className="col-6 mt-4">
        <Label label="Enter Your Phone" classNameStyle="react-std-label-span" />
        <TextInput
          type="text"
          placeholder="Enter your phone"
          name="phoneNumber"
          value={phoneNumber}
          onChange={handleFormOnChange}
          onBlur={() => {}}
          onFocus={() => {}}
          classNameStyle="form-control"
        />
        {phoneNumberErr && (
          <ErrorLabel
            error={phoneNumberErr}
            classNameStyle="react-std-error-label-span"
          />
        )}
      </div> */}
      <div className="col-6 mt-4">
        <Label
          label={<FormatText text="validationFrom.password" />}
          classNameStyle="react-std-label-span"
        />
        <TextInput
          type="password"
          placeholder={convertText('validationFrom.password')}
          name="password"
          value={password}
          onChange={handleFormOnChange}
          onBlur={() => {}}
          onFocus={() => {}}
          classNameStyle="form-control"
        />
        {passwordErr && (
          <ErrorLabel
            error={passwordErr}
            classNameStyle="react-std-error-label-span"
          />
        )}
      </div>
      <div className="col-6 mt-4">
        <Label
          label={<FormatText text="validationFrom.phone" />}
          classNameStyle="react-std-label-span"
        />
        <TextInput
          type="text"
          placeholder={convertText('validationFrom.phone')}
          name="phoneNumber"
          value={phoneNumber}
          onChange={handleFormOnChange}
          onBlur={() => {}}
          onFocus={() => {}}
          classNameStyle="form-control"
        />
        {phoneNumberErr && (
          <ErrorLabel
            error={phoneNumberErr}
            classNameStyle="react-std-error-label-span"
          />
        )}
      </div>
      <div className="col-6 mt-4">
        <Label
          label={<FormatText text="validationFrom.startDate" />}
          classNameStyle="react-std-label-span"
        />
        <DatePicker
          notMaxDate
          minmumDate="today"
          value={startDate}
          placeholder={convertText('validationFrom.startDate')}
          handleChangeDate={(date) => handleDateChange(date, 'startDate')}
          enableTime={false}
        />
        {startDateErr && (
          <ErrorLabel
            error={startDateErr}
            classNameStyle="react-std-error-label-span"
          />
        )}
      </div>
      <div className="col-6 mt-4">
        <Label
          label={<FormatText text="validationFrom.birthDate" />}
          classNameStyle="react-std-label-span"
        />
        <DatePicker
          value={birthDate}
          placeholder={convertText('validationFrom.birthDate')}
          handleChangeDate={(date) => handleDateChange(date, 'BirthDate')}
          maxDate="today"
          enableTime={false}
        />
        {birthDateErr && (
          <ErrorLabel
            error={birthDateErr}
            classNameStyle="react-std-error-label-span"
          />
        )}
      </div>
      <div className="col-6 mt-4">
        <Label
          label={<FormatText text="validationFrom.chooseImage" />}
          classNameStyle="react-std-label-span"
        />
        <TextInput
          type="file"
          placeholder={convertText('validationFrom.chooseImage')}
          // name="phoneNumber"
          // value={phoneNumber}
          onChange={handleImageChange}
          onBlur={() => {}}
          onFocus={() => {}}
          classNameStyle="form-control"
          accept="image/png, image/gif, image/jpeg, image/jpg"
        />
        {imageErr && (
          <ErrorLabel
            error={imageErr}
            classNameStyle="react-std-error-label-span"
          />
        )}
      </div>
      {image !== '' && (
        <div>
          <img
            alt=""
            src={URL.createObjectURL(image)}
            width={200}
            height={200}
          />
        </div>
      )}
      <div className="col-6 mt-4">
        <Label
          label={<FormatText text="validationFrom.checkbox" />}
          classNameStyle="react-std-label-span"
        />
        <RadioInput
          inline
          label="Check 1"
          name="check-box"
          type="checkbox"
          id={randomStrForId()}
          value={checkbox1}
          onChange={(e) => {
            setCheckbox1(e.target.checked);
          }}
        />
        <RadioInput
          inline
          label="Check 2"
          name="check-box"
          type="checkbox"
          id={randomStrForId()}
          value={checkbox2}
          onChange={(e) => {
            setCheckbox2(e.target.checked);
          }}
        />
        <RadioInput
          inline
          label="Check 3"
          name="check-box"
          type="checkbox"
          id={randomStrForId()}
          value={checkbox3}
          onChange={(e) => {
            setCheckbox3(e.target.checked);
          }}
        />
      </div>

      <div className="col-6 mt-4">
        <CustomButton
          label={<FormatText text="validationFrom.submitButton" />}
          className="btn btn-primary"
          onClick={handleOnSubmit}
        />
      </div>
    </div>
  );
};

export default validationCommonForm;

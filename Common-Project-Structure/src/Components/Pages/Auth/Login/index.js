/* eslint-disable arrow-body-style */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

// UI component
import ErrorLabel from '../../../UI/ErrorLabel';
import Label from '../../../UI/Label';
import TextInput from '../../../UI/TextInput';
import CustomButton from '../../../UI/CustomButton';
// css
import '../../../../Assets/css/styles.css';

// helper
import { isPassword, isRequired, validateEmail } from '../../../../Utils';

const index = () => {
  const staticEmail = 'demo@yopmail.com';
  const staticPass = 'Demo@1234';
  const history = useHistory();
  const [emailAddress, setEmailAddress] = useState('');
  const [emailAddressErr, setEmailAddressErr] = useState('');
  const [password, setPassword] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [commonErr, setCommonErr] = useState('');
  const handleFormOnChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'EmailAddress':
        if (isRequired(value)) {
          setEmailAddressErr('Email Address is required');
          setEmailAddress('');
        } else if (!validateEmail(value)) {
          setEmailAddressErr('Please enter a valid email address.');
          setEmailAddress(value);
        } else {
          setEmailAddressErr('');
          setEmailAddress(value);
        }
        break;
      case 'password':
        if (isRequired(value)) {
          setPasswordErr('Password is required');
          setPassword('');
        } else if (!isPassword(value)) {
          setPasswordErr(
            'At least 1 uppercase character,At least 1 lowercase character, At least 1 digit, At least 1 special character,Minimum 8 characters.',
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
  const isFormValid = () => {
    let isValid = true;
    if (isRequired(emailAddress)) {
      setEmailAddressErr('Email Address is required');
      isValid = false;
    } else if (!validateEmail(emailAddress)) {
      setEmailAddressErr('Please enter a valid email address.');
      isValid = false;
    }
    if (isRequired(password)) {
      setPasswordErr('Password is required');
      isValid = false;
    } else if (!isPassword(password)) {
      setPasswordErr(
        'At least 1 uppercase character,At least 1 lowercase character,At least 1 digit,At least 1 special character,Minimum 8 characters.',
      );
      isValid = false;
    }

    return isValid;
  };
  const handleLogin = () => {
    setCommonErr('');
    const isValid = isFormValid();
    if (isValid) {
      if (staticEmail !== emailAddress || password !== staticPass) {
        setCommonErr('Email or password are not valid');
      } else {
        history.push('/');
        localStorage.setItem(
          'token',
          window
            .btoa(
              Array.from(window.crypto.getRandomValues(new Uint8Array(16 * 2)))
                .map((b) => String.fromCharCode(b))
                .join(''),
            )
            .replace(/[+/]/g, '')
            .substring(0, 16),
        );
      }
    }
  };
  return (
    <div className="m-3">
      <div>
        <h2>Login</h2>
      </div>
      <div className="col-6 mt-4">
        <Label
          label="Enter Your Email Address"
          classNameStyle="react-std-label-span"
        />
        <TextInput
          type="text"
          placeholder="Enter your email"
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
      <div className="col-6 mt-4">
        <Label
          label="Enter Your Password"
          classNameStyle="react-std-label-span"
        />
        <TextInput
          type="password"
          placeholder="Enter Your Password"
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
        {commonErr && (
          <ErrorLabel
            error={commonErr}
            classNameStyle="react-std-error-label-span"
          />
        )}
      </div>
      <div className="col-6 mt-4">
        <CustomButton
          label="Login"
          className="btn btn-primary"
          onClick={handleLogin}
        />
      </div>
    </div>
  );
};

export default index;

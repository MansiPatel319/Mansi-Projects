/* eslint-disable arrow-body-style */
import React from 'react';
import { useHistory } from 'react-router-dom';
import LoginComponent from '../../../Components/Pages/Auth/Login';

const index = () => {
  const history = useHistory();
  let token = localStorage.getItem('token');
  if (token) {
    history.push('/');
  }
  return (
    <>
      <LoginComponent />
    </>
  );
};

export default index;

import axios from 'axios';
// eslint-disable-next-line no-undef
const timeout = process.env.NODE_ENV === 'development' ? 300000 : 120000;
const api = axios.create({
  Accept: '*/*',
  timeout,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: false,
  responseType: 'json',
  // proxy: {
  //   host: "http://3.139.122.63",
  //   port: 8000,
  // },
  // baseURL: 'https://admin.creatorclasses.co/api/v1/',
  baseURL: 'http://devadmin.creatorclasses.co/api/v1/',  
});

const tokenHeaders = (useToken) => {
  const token = localStorage.getItem('token');
  const headers = useToken && token ? { headers: { Authorization: `${token}` } } : {};
  return headers;
};
export const get = async (url, useToken) => {
  const headers = tokenHeaders(useToken);
  const response = await api.get(url, headers);
  return response;
};

export const post = async (url, data, useToken) => {
  const headers = tokenHeaders(useToken);
  const response = await api.post(url, data, headers);
  return response;
};

export const put = async (url, data, useToken) => {
  const headers = tokenHeaders(useToken);
  const response = await api.put(url, data, headers);
  return response;
};
// Note: delete is a reserved word
export const remove = async (url, useToken) => {
  const headers = tokenHeaders(useToken);
  const response = await api.delete(url, headers);
  return response;
};

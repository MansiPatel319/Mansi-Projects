import axios from "axios";

const timeout = process.env.NODE_ENV === "development" ? 300000 : 120000;
const api = axios.create({
  timeout,
  headers: { "Content-Type": "application/json" },
  withCredentials: false,
  responseType: "json",
});

const tokenHeaders = (useToken?: string) => {
  const token = localStorage.getItem("token");
  const headers =
    useToken && token ? { headers: { Authorization: `JWT ${token}` } } : {};
  return headers;
};

export const setLocalStorage = (tokenName: string, tokenValue: any) => {
  localStorage.setItem(tokenName, tokenValue);
};

export const getLocalStorage = (tokenName: string) => {
  try {
    return JSON.parse(localStorage.getItem(tokenName) || "{}");
  } catch (error) {
    return localStorage.getItem(tokenName);
  }
};

export const get = async (url: string, useToken?: string) => {
  const headers = tokenHeaders(useToken);
  const response = await api.get(url, headers);
  return response;
};

export const post = async (url: string, data: any, useToken?: string) => {
  const headers = tokenHeaders(useToken);
  const response = await api.post(url, data, headers);
  return response;
};

export const put = async (url: string, data: any, useToken?: string) => {
  const headers = tokenHeaders(useToken);
  const response = await api.put(url, data, headers);
  return response;
};
export const patch = async (url: string, data: any, useToken?: string) => {
  const headers = tokenHeaders(useToken);
  const response = await api.patch(url, data, headers);
  return response;
};
// Note: delete is a reserved word
export const remove = async (url: string, useToken?: string) => {
  const headers = tokenHeaders(useToken);
  const response = await api.delete(url, headers);
  return response;
};

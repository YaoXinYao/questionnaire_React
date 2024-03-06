import { message } from "antd";
import axios from "axios";
import { getToken } from "../utils/user-token";

const instance = axios.create({
  timeout: 5 * 1000,
});

//request拦截：每次请求都带上token
instance.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = `Bearer ${getToken()}`;
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

//response拦截器：统一拦截code和msg
instance.interceptors.response.use((res) => {
  const resData = (res.data || {}) as ResType;
  const { code, msg, info } = resData;
  if (code !== 0) {
    if (info) {
      message.error(info as string);
    }

    throw new Error(info as string);
  }
  return resData as any;
});

export default instance;

export type ResType = {
  code: number;
  info?: ResDataType | string;
  msg?: string;
};

export type ResDataType = {
  [key: string]: any;
};

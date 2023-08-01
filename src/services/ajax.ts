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

//response拦截器：统一拦截error和msg
instance.interceptors.response.use((res) => {
  const resData = (res.data || {}) as ResType;
  const { error, data, msg } = resData;
  if (error !== 0) {
    if (msg) {
      message.error(msg);
    }

    throw new Error(msg);
  }
  return resData as any;
});

export default instance;

export type ResType = {
  error: number;
  data?: ResDataType;
  msg?: string;
};

export type ResDataType = {
  [key: string]: any;
};

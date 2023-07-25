import { message } from "antd";
import axios from "axios";

const instance = axios.create({
  timeout: 5 * 1000,
});

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
  return data as any;
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

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

instance.interceptors.response.use(
  (res) => {
    const resData = (res.data || {}) as ResType;
    const { code, info } = resData;
    if (resData.code === 401) {
      localStorage.clear();
      history.replaceState(null, "", "/login"); // 使用 history.replaceState 进行页面跳转
    }

    if (code !== 0) {
      if (info) {
        message.error(info as string);
      }

      throw new Error(info as string);
    }
    return resData as any;
  },
  (error) => {
    // 对响应错误做点什么
    if (error.response) {
      if (error.response.status == 401) {
        localStorage.clear();
        history.replaceState(null, "", "/login"); // 使用 history.replaceState 进行页面跳转
      }
      // 请求已发出，但服务器响应的状态码不在 2xx 范围内
      console.log(
        `[Axios Error] ${error.response.status}: ${error.response.data.message}`
      );
    } else if (error.request) {
      // 请求已发出但未收到响应
      console.log("[Axios Error] Network Error");
    } else {
      // 在设置请求时发生了些问题
      console.log("[Axios Error]", error.message);
    }
    return Promise.reject(error);
  }
);

export default instance;

export type ResType = {
  code: number;
  info?: ResDataType | string;
  msg?: string;
};

export type ResDataType = {
  [key: string]: any;
};

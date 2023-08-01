import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { isLoginOrRegister, isNoNeedUserInfo } from "../router";
import useGetUserInfo from "./useGetUserInfo";

function useNavPage(waiting: boolean) {
  const { username } = useGetUserInfo();
  const { pathname } = useLocation();
  const nav = useNavigate();

  useEffect(() => {
    if (waiting) return;

    //已经登录
    if (username) {
      //判断当前路由是否是登录页或者注册页面
      if (isLoginOrRegister(pathname)) {
        nav("/manage/list");
      }
    }

    //未登录
    if (isNoNeedUserInfo(pathname)) {
      return;
    } else {
      if (!username) nav("/login");
    }
  }, [waiting, username, pathname]);
}

export default useNavPage;

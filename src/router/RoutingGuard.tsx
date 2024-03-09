import React from "react";
import { getToken } from "../utils/user-token";
import { createBrowserHistory } from "history";
import Login from "../pages/Login";
import { redirect, useNavigate } from "react-router-dom";
import { message } from "antd";
const history = createBrowserHistory();
const ALLOWPAGES = ["/", "/login", "/register"];

const withRouteGuard = (WrappedComponent: React.ComponentType<any>) => {
  const WithRouteGuard = (props: any) => {
    let isAuthenticated: boolean; // 假设已验证用户身份
    let token = getToken();
    if (!token || token.trim() == "") {
      isAuthenticated = false;
    } else {
      isAuthenticated = true;
    }
    const { location } = history;
    const { pathname } = location;
    if (!isAuthenticated) {
      if (!ALLOWPAGES.includes(pathname)) {
        window.location.replace("/login");
        return null;
      }
      // 或返回一个占位符组件，如 <div>Loading...</div>
    } else {
      if (ALLOWPAGES.includes(pathname)) {
        window.history.forward();
      }
    }

    return <WrappedComponent {...props} />;
  };

  return WithRouteGuard;
};

export default withRouteGuard;

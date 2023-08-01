import { UserOutlined } from "@ant-design/icons";
import { Button, message } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import useGetUserInfo from "../../hooks/useGetUserInfo";
import { logoutReducer } from "../../store/userReducer";
import { removeToken } from "../../utils/user-token";

const UserInfo = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  // const { data = {} } = useRequest(getUserInfoService);
  // const { data: res = {} } = data;
  // const { username } = res || {};
  const { username } = useGetUserInfo();
  function logout() {
    dispatch(logoutReducer);
    removeToken();
    message.success("退出成功！");
    nav("/login");
  }

  const userInfo = (
    <>
      <span style={{ color: "#e8e8e8" }}>
        <UserOutlined />
        {username}
      </span>
      <Button type="link" onClick={logout}>
        退出
      </Button>
    </>
  );

  const login = <Link to="/login">登录</Link>;

  return <>{username ? userInfo : login}</>;
};

export default UserInfo;

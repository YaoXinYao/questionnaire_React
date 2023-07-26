import { UserOutlined } from "@ant-design/icons";
import { useRequest } from "ahooks";
import { Button, message } from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserInfoService } from "../../services/user";
import { removeToken } from "../../utils/user-token";

const UserInfo = () => {
  const nav = useNavigate();
  const { data = {} } = useRequest(getUserInfoService);
  const { data: res = {} } = data;
  const { username } = res || {};

  function logout() {
    removeToken();
    message.success("退出成功");
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

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Typography } from "antd";
const { Title, Paragraph } = Typography;
import styles from "./index.module.scss";
import "../../_mock/index";
import useGetUserInfo from "../../hooks/useGetUserInfo";

const Home = () => {
  const nav = useNavigate();
  let { token = "" } = useGetUserInfo();
  let [isLogin, setIsLogin] = useState<boolean>(false);
  if (!token || token == "") {
    isLogin = false;
  } else {
    isLogin = true;
  }
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <Title>乐答问卷</Title>
        <Paragraph>我们尊重你的每一次选择！</Paragraph>
        <div>
          {!isLogin && (
            <Button type="primary" onClick={() => nav("/login")}>
              登录
            </Button>
          )}
          {isLogin && (
            <Button type="primary" onClick={() => nav("/manage/list")}>
              进入
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;

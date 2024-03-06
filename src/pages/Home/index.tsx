import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Typography } from "antd";
const { Title, Paragraph } = Typography;
import styles from "./index.module.scss";
import "../../_mock/index";

const Home = () => {
  const nav = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <Title>乐答问卷</Title>
        <Paragraph>
          我们尊重你的每一次选择！
        </Paragraph>
        <div>
          <Button type="primary" onClick={() => nav("/manage/list")}>
            登录
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;

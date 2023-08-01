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
        <Title>问卷调查|在线投票</Title>
        <Paragraph>
          已累计创建问卷10000份，发布问卷9000份，收到答卷1000000份
        </Paragraph>
        <div>
          <Button type="primary" onClick={() => nav("/manage/list")}>
            开始使用
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;

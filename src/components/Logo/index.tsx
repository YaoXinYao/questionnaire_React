import React from "react";
import { Space, Typography } from "antd";
import { CloudServerOutlined } from "@ant-design/icons";
import styles from "./index.module.scss";
import { Link } from "react-router-dom";

const { Title } = Typography;
const Logo = () => {
  return (
    <div className={styles.container}>
      <Link to="/">
        <Space>
          <Title>
            <CloudServerOutlined />
          </Title>
          <Title>乐答问卷</Title>
        </Space>
      </Link>
    </div>
  );
};

export default Logo;

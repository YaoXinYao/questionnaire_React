import React, { useEffect, useState } from "react";
import { Space, Typography } from "antd";
import { CloudServerOutlined } from "@ant-design/icons";
import styles from "./index.module.scss";
import { Link } from "react-router-dom";
import useGetUserInfo from "../../hooks/useGetUserInfo";

const { Title } = Typography;
const Logo = () => {
  const { username } = useGetUserInfo();
  const [pathname, setPathname] = useState("/");
  useEffect(() => {
    if (username) {
      setPathname("/manage/list");
    }
  }, [username]);
  return (
    <div className={styles.container}>
      <Link to={pathname}>
        <Space align="center">
          <Title>
            <img src="/favicon.png" className={styles.logo} />
          </Title>
          <Title>乐答问卷</Title>
        </Space>
      </Link>
    </div>
  );
};

export default Logo;

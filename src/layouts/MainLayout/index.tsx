import React from "react";
import { Outlet } from "react-router-dom";
import styles from "./index.module.scss";

import { Layout, Spin } from "antd";
import Logo from "../../components/Logo";
import UserInfo from "../../components/UserInfo";
import useLoadUserData from "../../hooks/useLoadUserData";
import useNavPage from "../../hooks/useNavPage";
const { Header, Footer, Content } = Layout;

const MainLayout = () => {
  const { waiting } = useLoadUserData();
  useNavPage(waiting);
  return (
    <Layout>
      <Header className={styles.header}>
        <div className={styles.left}>
          <Logo />
        </div>
        <div className={styles.right}>
          <UserInfo />
        </div>
      </Header>
      <Layout className={styles.main}>
        <Content>
          {waiting ? (
            <div style={{ textAlign: "center", marginTop: "60px" }}>
              <Spin />
            </div>
          ) : (
            <Outlet />
          )}
        </Content>
      </Layout>

      <Footer className={styles.footer}>乐答问卷@2023</Footer>
    </Layout>
  );
};

export default MainLayout;

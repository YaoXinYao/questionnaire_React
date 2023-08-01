import { LeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.scss";

const EditHeader = () => {
  const nav = useNavigate();
  return (
    <div className={styles["header-wrapper"]}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
            返回
          </Button>
        </div>
        <div className={styles.main}>中间</div>
        <div className={styles.right}>右边</div>
      </div>
    </div>
  );
};

export default EditHeader;

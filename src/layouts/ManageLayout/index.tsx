import React, { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import styles from "./index.module.scss";
import { Space, Button, Divider, message } from "antd";
import {
  PlusOutlined,
  BarsOutlined,
  StarOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { createQuestionService } from "../../services/question";
import { useRequest } from "ahooks";

const ManageLayout = () => {
  const nav = useNavigate();
  const { pathname } = useLocation();

  // const [loading, setLoading] = useState(false);
  // async function handleCreateClick() {
  //   setLoading(true);
  //   const data = await createQuestionService();
  //   const { id } = data || {};
  //   if (id) {
  //     nav(`/question/edit/${id}`);
  //     message.success("创建成功");
  //   } else {
  //     message.error("创建失败");
  //   }
  //   setLoading(false);
  // }
  const {
    loading,
    error,
    run: handleCreateClick,
  } = useRequest(createQuestionService, {
    manual: true,
    onSuccess(result) {
      nav(`/question/edit/${result.id}`);
      message.success("创建成功");
    },
  });

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Space direction="vertical">
          <Button
            size="large"
            icon={<PlusOutlined />}
            onClick={handleCreateClick}
          >
            创建问卷
          </Button>
          <Divider style={{ borderTop: "transparent" }} />
          <Button
            type={pathname.startsWith("/manage/list") ? "default" : "text"}
            size="large"
            icon={<BarsOutlined />}
            onClick={() => nav("/manage/list")}
            disabled={loading}
          >
            我的问卷
          </Button>
          <Button
            type={pathname.startsWith("/manage/star") ? "default" : "text"}
            size="large"
            icon={<StarOutlined />}
            onClick={() => nav("/manage/star")}
          >
            星标问卷
          </Button>
          <Button
            type={pathname.startsWith("/manage/trash") ? "default" : "text"}
            size="large"
            icon={<DeleteOutlined />}
            onClick={() => nav("/manage/trash")}
          >
            回收站
          </Button>
        </Space>
      </div>
      <div className={styles.right}>
        <Outlet />
      </div>
    </div>
  );
};

export default ManageLayout;

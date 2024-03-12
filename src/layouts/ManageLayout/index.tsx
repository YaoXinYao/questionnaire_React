import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import styles from "./index.module.scss";
import { Space, Button, Divider, message } from "antd";
import {
  PlusOutlined,
  BarsOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { createQuestionService } from "../../services/question";
import { useRequest } from "ahooks";
import useGetUserInfo from "../../hooks/useGetUserInfo";
import { CreateQuestionnaireType } from "../../type/question";

const ManageLayout = () => {
  const nav = useNavigate();
  const { pathname } = useLocation();
  const { id: userId = 0 } = useGetUserInfo();
  const {
    loading,
    run: handleCreateClick,
  } = useRequest(
    async () => {
      let props: CreateQuestionnaireType = {
        title: "未命名",
        description: "",
        isPublished: 0,
        isDeleted: 0,
        creatorId: userId,
      };
      let result = await createQuestionService(props);
      if (result.code == 0) {
        nav(`/question/edit/${result.info.id}`);
        message.success("创建成功");
      }
    },
    {
      manual: true,
    }
  );

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

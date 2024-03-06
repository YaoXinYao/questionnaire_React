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
import useGetUserInfo from "../../hooks/useGetUserInfo";

const ManageLayout = () => {
  const nav = useNavigate();
  const { pathname } = useLocation();
  const { id: userId } = useGetUserInfo();

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
  } = useRequest(
    async () => {
      let props = {
        title: "未命名",
        description: "",
        isPublished: 0,
        isDeleted: 0,
        creatorId: userId,
      };
      let result = await createQuestionService(props);
      console.log(result);

      if (result.code == 0) {
        nav(`/question/edit/${result.info.id}`);
        message.success("创建成功");
      }
    },
    {
      manual: true,
      onSuccess(result) {
        console.log(result);
      },
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

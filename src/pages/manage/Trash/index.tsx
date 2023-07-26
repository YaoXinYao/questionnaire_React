import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useRequest, useTitle } from "ahooks";
import {
  Button,
  Space,
  Table,
  Tag,
  Typography,
  Modal,
  Empty,
  Spin,
  message,
} from "antd";
import React, { useState } from "react";
import ListPage from "../../../components/ListPage";
import ListSearch from "../../../components/ListSearch";
import useLoadQuestionListData from "../../../hooks/useLoadQuestionListData";
import {
  deleteQuestionService,
  updateQuestionService,
} from "../../../services/question";
import styles from "./index.module.scss";
const { Title } = Typography;
const { confirm } = Modal;

const Trash = () => {
  useTitle("乐答问卷-回收站");
  const {
    loading,
    error,
    data = {},
    refresh,
  } = useLoadQuestionListData({ isDeleted: true });
  const {data:res={}}=data
  const { list = {}, total = 0 } = res;
  //选中的id
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  //恢复
  const { loading: recoverLoading, run: recoverQuestion } = useRequest(
    async () => {
      console.log(selectedIds);
      for await (const id of selectedIds) {
        await updateQuestionService(id, { isDeleted: false });
      }
    },
    {
      manual: true,
      debounceWait: 500, //防抖
      onSuccess() {
        message.success("恢复成功");
        refresh(); //刷新列表
        setSelectedIds([]);
      },
    }
  );

  //删除
  const { loading: deleteLoading, run: deleteQuestion } = useRequest(
    async () => {
      await deleteQuestionService(selectedIds);
    },
    {
      manual: true,
      onSuccess() {
        message.success("删除成功");
        refresh();
        setSelectedIds([]);
      },
    }
  );
  function del() {
    confirm({
      title: "确认要删除该问卷吗？",
      icon: <ExclamationCircleOutlined />,
      content: "删除后将不可恢复",
      onOk: () => {
        deleteQuestion();
      },
    });
  }

  const tableColumns = [
    {
      title: "标题",
      dataIndex: "title",
    },
    {
      title: "是否发布",
      dataIndex: "isPublished",
      render: (isPublished: boolean) => {
        return isPublished ? (
          <Tag color="processing">已发布</Tag>
        ) : (
          <Tag>未发布</Tag>
        );
      },
    },
    {
      title: "答卷",
      dataIndex: "answerCount",
    },
    {
      title: "创建时间",
      dataIndex: "createAt",
    },
  ];

  //将jsx片段定义为一个变量
  const TableElem = (
    <>
      <div style={{ marginBottom: "16px" }}>
        <Space>
          <Button
            type="primary"
            disabled={selectedIds.length === 0}
            onClick={recoverQuestion}
          >
            恢复
          </Button>
          <Button danger onClick={del} disabled={selectedIds.length === 0}>
            删除
          </Button>
        </Space>
      </div>
      <Table
        dataSource={list}
        columns={tableColumns}
        pagination={false}
        rowKey={(q) => q._id}
        rowSelection={{
          type: "checkbox",
          onChange: (selectedRowKeys) => {
            setSelectedIds(selectedRowKeys as string[]);
          },
        }}
      ></Table>
    </>
  );

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>星标问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {loading && (
          <div style={{ textAlign: "center" }}>
            <Spin />
          </div>
        )}
        {!loading && list.length === 0 && <Empty description="暂无数据" />}
        {!loading && list.length > 0 && TableElem}
      </div>
      <div className={styles.footer}>
        <ListPage total={total} />
      </div>
    </>
  );
};

export default Trash;

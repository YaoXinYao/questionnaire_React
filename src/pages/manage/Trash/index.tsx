import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useTitle } from "ahooks";
import { Button, Space, Table, Tag, Typography, Modal } from "antd";
import React, { useState } from "react";
import QuestionCard from "../../../components/QuestionCard/QuestionCard";
import styles from "./index.module.scss";
const { Title } = Typography;
const { confirm } = Modal;
let rawQuestionList = [
  {
    _id: "q1",
    title: "问卷1",
    isPublished: false,
    isStar: true,
    answerCount: 5,
    createAt: "3月2日 13：32",
  },
  {
    _id: "q2",
    title: "问卷2",
    isPublished: true,
    isStar: true,
    answerCount: 5,
    createAt: "3月2日 13：32",
  },
  {
    _id: "q3",
    title: "问卷3",
    isPublished: false,
    isStar: true,
    answerCount: 5,
    createAt: "3月2日 13：32",
  },
];

const Trash = () => {
  useTitle("乐答问卷-回收站");
  const [questionList, setQuestionList] = useState(rawQuestionList);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
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

  function del() {
    confirm({
      title: "确认要删除该问卷吗？",
      icon: <ExclamationCircleOutlined />,
      content: "删除后将不可恢复",
      onOk: () => {
        alert(JSON.stringify(selectedIds));
      },
    });
  }

  //将jsx片段定义为一个变量
  const TableElem = (
    <>
      <div style={{ marginBottom: "16px" }}>
        <Space>
          <Button type="primary" disabled={selectedIds.length === 0}>
            恢复
          </Button>
          <Button danger onClick={del}>
            删除
          </Button>
        </Space>
      </div>
      <Table
        dataSource={questionList}
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
        <div className={styles.right}>(搜索)</div>
      </div>
      <div className={styles.content}>
        {questionList.length > 0 && TableElem}
      </div>
      <div className={styles.footer}>分页</div>
    </>
  );
};

export default Trash;

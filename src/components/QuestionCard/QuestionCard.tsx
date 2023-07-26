import {
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  LineChartOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { useRequest } from "ahooks";
import { Button, Divider, Popconfirm, Space, Tag, Modal, message } from "antd";
import React, { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  copyQuestionService,
  updateQuestionService,
} from "../../services/question";
import styles from "./QuestionCard.module.scss";

type PropsType = {
  _id: string;
  title: string;
  isPublished: boolean;
  isStar: boolean;
  answerCount: number;
  createAt: string;
};
const QuestionCard: FC<PropsType> = (props: PropsType) => {
  const nav = useNavigate();
  const { confirm } = Modal;
  const { _id, title, createAt, answerCount, isPublished, isStar } = props;

  const [isStarState, setIsStarState] = useState(isStar);

  //更新
  const { loading: changeStarLoading, run: changeStar } = useRequest(
    async () => {
      const data = await updateQuestionService(_id, { isStar: !isStarState });
      return data;
    },
    {
      manual: true,
      onSuccess(result) {
        setIsStarState(!isStarState);
        message.success("已更新");
      },
    }
  );

  // function duplicate() {
  //   message.success("复制成功");
  // }

  //复制
  const { loading: copyLoading, run: copy } = useRequest(
    async () => {
      const data = await copyQuestionService(_id);
      return data;
    },
    {
      manual: true,
      onSuccess(result) {
        message.success("复制成功");
        nav(`/question/edit/${result.data.id}`);
      },
    }
  );

  //删除
  const [isDeletedState, setIsDeleteState] = useState(false);
  const { loading: deleteLoading, run: deleteQuestion } = useRequest(
    async () => await updateQuestionService(_id, { isDeleted: true }),
    {
      manual: true,
      onSuccess() {
        message.success("删除成功");
        setIsDeleteState(true);
      },
    }
  );

  function delFn() {
    confirm({
      title: "确定删除该问卷吗？",
      icon: <ExclamationCircleOutlined />,
      onOk: deleteQuestion,
    });
  }

  if (isDeletedState) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.left}>
          <Link
            to={isPublished ? `/question/stat/${_id}` : `/question/edit/${_id}`}
          >
            {isStar && <StarOutlined style={{ color: "red" }} />}
            {title}
          </Link>
        </div>
        <div className={styles.right}>
          <Space>
            {isPublished ? (
              <Tag color="processing">已发布</Tag>
            ) : (
              <Tag>未发布</Tag>
            )}
            <span>答卷：{answerCount}</span>
            <span>{createAt}</span>
          </Space>
        </div>
      </div>
      <Divider style={{ margin: "12px 0" }} />
      <div className={styles["button-container"]}>
        <div className={styles.left}>
          <Space>
            <Button
              icon={<EditOutlined />}
              type="text"
              size="small"
              onClick={() => nav(`/question/edit/${_id}`)}
            >
              编辑问卷
            </Button>
            <Button
              icon={<LineChartOutlined />}
              type="text"
              size="small"
              onClick={() => nav(`/question/stat/${_id}`)}
              disabled={isPublished}
            >
              问卷统计
            </Button>
          </Space>
        </div>
        <div className={styles.right}>
          <Space>
            <Button
              type="text"
              icon={<StarOutlined />}
              size="small"
              onClick={changeStar}
              disabled={changeStarLoading}
            >
              {isStarState ? "取消标星" : "标星"}
            </Button>
            <Popconfirm
              title="确定复制该问卷吗？"
              okText="确定"
              cancelText="取消"
              onConfirm={copy}
              disabled={copyLoading}
            >
              <Button type="text" icon={<CopyOutlined />} size="small">
                复制
              </Button>
            </Popconfirm>
            <Button
              type="text"
              icon={<DeleteOutlined />}
              size="small"
              onClick={delFn}
              disabled={deleteLoading}
            >
              删除
            </Button>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;

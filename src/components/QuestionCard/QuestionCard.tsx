import {
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  LineChartOutlined,
  SendOutlined,
} from "@ant-design/icons";
import { useRequest } from "ahooks";
import {
  Button,
  Divider,
  Popconfirm,
  Space,
  Tag,
  Modal,
  message,
  Popover,
  QRCode,
  theme,
  Input,
} from "antd";
import React, { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  addQuestionItemService,
  copyQuestionService,
  createQuestionService,
  getQuestionListService,
  getQuestionService,
  updateQuestionService,
} from "../../services/question";
import styles from "./QuestionCard.module.scss";
import { QuestionnaireResType } from "../../type/question";
import useGetUserInfo from "../../hooks/useGetUserInfo";
const { useToken } = theme;

type PropsType = {
  id: number;
  title: string;
  description: string;
  isPublished: number;
  isDeleted: number;
  creatorId: number;
  create_time: string;
  updateList: (props: QuestionnaireResType) => void;
};
const QuestionCard: FC<PropsType> = (props: PropsType) => {
  const nav = useNavigate();
  const { token } = useToken();
  const { confirm } = Modal;
  const {
    id,
    title,
    description,
    isPublished,
    isDeleted,
    create_time,
    creatorId,
    updateList,
  } = props;
  const { id: userId } = useGetUserInfo();
  // const [isStarState, setIsStarState] = useState(isStar);

  //更新
  // const { loading: changeStarLoading, run: changeStar } = useRequest(
  //   async () => {
  //     const data = await updateQuestionService(id);
  //     return data;
  //   },
  //   {
  //     manual: true,
  //     onSuccess(result) {
  //       setIsStarState(!isStarState);
  //       message.success("已更新");
  //     },
  //   }
  // );

  // function duplicate() {
  //   message.success("复制成功");
  // }

  //复制
  const { loading: copyLoading, run: copy } = useRequest(
    async () => {
      const data = await getQuestionService(id);
      if (data.code == 0) {
        let { id: qId, componentList, ...props } = data.info;
        let createQuestionRes = await createQuestionService({
          ...props,
          isDeleted: 0,
          isPublished: 0,
          creatorId: userId,
        });
        if (createQuestionRes.code == 0) {
          for (let i = 0; i < componentList.length; i++) {
            componentList[i].qId = createQuestionRes.info.id;
            delete componentList[i].id;
          }
        }
        let addQuestionItemRes = await addQuestionItemService(componentList);
        if (addQuestionItemRes.code == 0) {
          updateList(createQuestionRes.info);
          message.success("复制成功");
        } else {
          message.error("复制失败");
        }
      }
    },
    {
      manual: true,
    }
  );

  //删除
  const [isDeletedState, setIsDeleteState] = useState(false);
  const { loading: deleteLoading, run: deleteQuestion } = useRequest(
    async () => await updateQuestionService({ id, isDeleted: 1 }),
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

  let QRcodeContent = (
    <Space direction="vertical" align="center">
      <Input
        value={`http://localhost:5173/question/submitAnswer/${props.id}`}
      />
      <QRCode
        value={`http://localhost:5173/question/submitAnswer/${props.id}`}
        color={token.colorInfoText}
        bgColor={token.colorBgLayout}
      />
    </Space>
  );

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.left}>
          <Link
            to={isPublished ? `/question/stat/${id}` : `/question/edit/${id}`}
          >
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
            {/* <span>答卷：{answerCount}</span> */}
            <span>{create_time}</span>
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
              onClick={() => nav(`/question/edit/${id}`)}
              disabled={isPublished == 1}
            >
              编辑问卷
            </Button>
            <Button
              icon={<LineChartOutlined />}
              type="text"
              size="small"
              onClick={() => nav(`/question/stat/${id}`)}
              disabled={isPublished == 0}
            >
              问卷统计
            </Button>
          </Space>
        </div>
        <div className={styles.right}>
          <Space>
            <Popover content={QRcodeContent}>
              <Button type="text" icon={<SendOutlined />} size="small">
                分享
              </Button>
            </Popover>
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

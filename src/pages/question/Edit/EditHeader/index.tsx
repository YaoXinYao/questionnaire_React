import { EditOutlined, LeftOutlined, LoadingOutlined } from "@ant-design/icons";
import { Button, Input, Space, message } from "antd";
import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./index.module.scss";
import Title from "antd/es/typography/Title";
import EditToolbar from "../EditToolbar";
import useGetPageInfo from "../../../../hooks/useGetPageInfo";
import { useDispatch } from "react-redux";
import { changePageTitle } from "../../../../store/pageInfoReducer";
import useGetComponentInfo from "../../../../hooks/useGetComponentInfo";
import { useDebounceEffect, useKeyPress, useRequest } from "ahooks";
import { updateQuestionService } from "../../../../services/question";

const EditHeader = () => {
  const nav = useNavigate();
  const { title } = useGetPageInfo();
  const dispatch = useDispatch();
  const [editState, setEditState] = useState(false);
  const { componentList = [] } = useGetComponentInfo();
  const pageInfo = useGetPageInfo();
  const { id } = useParams();

  const { loading: saveLoading, run: save } = useRequest(
    async () => {
      if (!id) return;
      await updateQuestionService(id, { ...pageInfo, componentList });
    },
    { manual: true }
  );

  //快捷键保存
  useKeyPress(["ctrl.s", "meta.s"], (event: KeyboardEvent) => {
    event.preventDefault();
    if (!saveLoading) save();
  });

  //自动保存
  useDebounceEffect(
    () => {
      save();
    },
    [componentList, pageInfo],
    {
      wait: 1000,
    }
  );

  const { loading: pubLoading, run: pub } = useRequest(
    async () => {
      if (!id) return;
      await updateQuestionService(id, {
        ...pageInfo,
        componentList,
        isPublished: true,
      });
    },
    {
      manual: true,
      onSuccess() {
        message.success("发布成功");
        nav("/question/stat/" + id);
      },
    }
  );

  function handleTitleChange(event: ChangeEvent<HTMLInputElement>) {
    const newTitle = event.target.value.trim();
    if (!newTitle) return;
    dispatch(changePageTitle(newTitle));
  }
  return (
    <div className={styles["header-wrapper"]}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
              返回
            </Button>
            {editState && (
              <Input
                value={title}
                onChange={handleTitleChange}
                onPressEnter={() => setEditState(false)}
                onBlur={() => setEditState(false)}
              />
            )}
            {!editState && (
              <>
                <Title>{title}</Title>
                <Button
                  icon={<EditOutlined />}
                  type="text"
                  onClick={() => setEditState(true)}
                />
              </>
            )}
          </Space>
        </div>
        <div className={styles.main}>
          <EditToolbar />
        </div>
        <div className={styles.right}>
          <Space>
            <Button
              onClick={save}
              disabled={saveLoading}
              icon={saveLoading ? <LoadingOutlined /> : null}
            >
              保存
            </Button>
            <Button
              type="primary"
              onClick={pub}
              icon={pubLoading ? <LoadingOutlined /> : null}
            >
              发布
            </Button>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default EditHeader;

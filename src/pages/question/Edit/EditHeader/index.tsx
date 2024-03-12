import { EditOutlined, LeftOutlined, LoadingOutlined } from "@ant-design/icons";
import { Button, Input, Space, message } from "antd";
import React, { ChangeEvent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./index.module.scss";
import Title from "antd/es/typography/Title";
import EditToolbar from "../EditToolbar";
import useGetPageInfo from "../../../../hooks/useGetPageInfo";
import { useDispatch } from "react-redux";
import { changePageTitle } from "../../../../store/pageInfoReducer";
import useGetComponentInfo from "../../../../hooks/useGetComponentInfo";
import { useKeyPress, useRequest } from "ahooks";
import {
  addQuestionItemService,
  deleteQuestionItemService,
  updateQuestionItemIndexService,
  updateQuestionItemService,
  updateQuestionService,
} from "../../../../services/question";
import {
  clearAddComponentIds,
  clearDeleteComponentIds,
} from "../../../../store/componentsReducer";
const EditHeader = () => {
  const nav = useNavigate();
  const { title } = useGetPageInfo();
  const dispatch = useDispatch();
  const [editState, setEditState] = useState(false);
  const {
    componentList = [],
    addComponentIdsArr,
    deleteComponentIdsArr,
  } = useGetComponentInfo();
  const pageInfo = useGetPageInfo();
  const { id: paramsId } = useParams();
  let id: number = -1;
  if (paramsId) {
    id = parseInt(paramsId);
  }

  async function saveCompnentInfo() {
    if (componentList.length == 0) {
      message.warning("保存失败，请添加问题");
      return "not question";
    }
    let indexArr = [];
    let addArr = [];
    let updateArr = [];
    for (let i = 0; i < componentList.length; i++) {
      let { id, ...props } = componentList[i];
      if (addComponentIdsArr.indexOf(id) >= 0) {
        addArr.push({
          ...props,
          props: JSON.stringify(props.props),
          indexId: i,
        });
      } else {
        updateArr.push({
          ...componentList[i],
          props: JSON.stringify(props.props),
        });
      }
      indexArr[i] = id;
    }
    let flag: boolean = true;
    if (deleteComponentIdsArr.length) {
      let res = await deleteQuestionItemService(deleteComponentIdsArr);
      if (res.code == 0) {
        dispatch(clearDeleteComponentIds());
      } else {
        flag = false;
      }
    }

    if (updateArr.length) {
      let res = await updateQuestionItemService(updateArr);
      if (res.code == 0) {
        dispatch(clearDeleteComponentIds());
        updateArr = [];
      } else {
        flag = false;
      }
    }

    if (addArr.length) {
      let res = await addQuestionItemService(addArr);
      if (res.code == 0) {
        dispatch(clearAddComponentIds());
        addArr = [];
      } else {
        flag = false;
      }
    }

    if (indexArr.length) {
      let res = await updateQuestionItemIndexService(indexArr);
      if (res.code == 0) {
        indexArr = [];
      } else {
        flag = false;
      }
    }
    return flag;
  }

  const { loading: saveLoading, run: save } = useRequest(
    async () => {
      if (!id) return;
      if (title.trim() == "") {
        message.error("请填写问卷名");
        return;
      }
      let questionnaireRes = await updateQuestionService({
        id,
        ...pageInfo,
        isPublished: 0,
      });
      let questionRes = await saveCompnentInfo();
      if (questionRes == "not question") {
        return;
      }
      if (questionRes && questionnaireRes.code == 0) {
        message.success("保存成功");
      } else if (!questionRes && questionnaireRes.code == -1) {
        message.error("问卷保存失败");
      } else if (!questionRes) {
        message.error("问卷问题保存失败");
      } else if (questionnaireRes.code == -1) {
        message.error("问卷信息保存失败");
      }
    },
    { manual: true }
  );

  //快捷键保存
  useKeyPress(["ctrl.s", "meta.s"], (event: KeyboardEvent) => {
    event.preventDefault();
    if (!saveLoading) save();
  });

  //自动保存
  // useDebounceEffect(
  //   () => {
  //     console.log(componentList);
  //   },
  //   [componentList, pageInfo],
  //   {
  //     wait: 1000,
  //   }
  // );

  const { loading: pubLoading, run: pub } = useRequest(
    async () => {
      if (!id) return;
      if (title.trim() == "") {
        message.error("请填写问卷名");
        return;
      }
      let questionnaireRes = await updateQuestionService({
        id,
        ...pageInfo,
        isPublished: 1,
      });
      let questionRes = await saveCompnentInfo();
      if (questionRes == "not question") {
        return;
      }
      if (questionRes && questionnaireRes.code == 0) {
        message.success("保存成功");
        nav("/manage/list");
      } else if (!questionRes && questionnaireRes.code == -1) {
        message.error("问卷保存失败");
      } else if (!questionRes) {
        message.error("问卷问题保存失败");
      } else if (questionnaireRes.code == -1) {
        message.error("问卷信息保存失败");
      }
    },
    {
      manual: true,
    }
  );

  function handleTitleChange(event: ChangeEvent<HTMLInputElement>) {
    const newTitle = event.target.value.trim();
    // if (!newTitle) return;
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
                showCount
                maxLength={20}
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

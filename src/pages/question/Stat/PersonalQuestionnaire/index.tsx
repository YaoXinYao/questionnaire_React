import { Drawer, message } from "antd";
import React, { useEffect, useState } from "react";
import useGetStatInfo from "../../../../hooks/useGetStat";
import { useRequest } from "ahooks";
import { getUserAnswerService } from "../../../../services/answer";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateSelectedUserId } from "../../../../store/statReducer";
import styles from "./index.module.scss";
import { getComponentConfByType } from "../../../../components/QuestionComponents";
import classNames from "classnames";

interface UserAnswerType {
  id: number;
  indexId: number;
  title: string;
  type: string;
  isHidden: number;
  isLocked: number;
  props: any;
  qId: number;
  create_time: string;
  answer: any;
}

const PersonalQuestionnaire = () => {
  const [open, setOpen] = useState(false);
  let { selectedUser } = useGetStatInfo();
  let { id: selectedUserId, username } = selectedUser;
  const dispatch = useDispatch();
  let { id: paramsId } = useParams();
  let [list, setList] = useState<UserAnswerType[]>([]);
  if (!paramsId) {
    return null;
  }
  let questionnaireId = Number.parseInt(paramsId);
  useEffect(() => {
    if (selectedUserId > 0) {
      run();
      setOpen(true);
    }
  }, [selectedUserId]);

  let { run } = useRequest(async () => {
    let { code, info } = await getUserAnswerService({
      userId: selectedUserId,
      questionnaireId,
    });
    if (code != 0) {
      message.error("查询失败");
    } else {
      let newList = [];
      for (let i = 0; i < info.length; i++) {
        const { question, answer } = info[i];

        let item = {
          ...question,
          answer: answer,
          props: JSON.parse(question.props),
        };
        newList.push(item);
      }
      setList(newList);
    }
  });
  const onClose = () => {
    setOpen(false);
    dispatch(updateSelectedUserId({ id: -1, username: "" }));
  };

  return (
    <>
      <Drawer
        title={<>{username}的答卷</>}
        placement="right"
        width={500}
        onClose={onClose}
        open={open}
      >
        <div className={styles.container}>
          {list
            .filter((c: UserAnswerType) => !c.isHidden)
            .map((c) => {
              const { id, props, type, answer } = c;
              const componentConf = getComponentConfByType(type);
              if (componentConf == null) {
                return null;
              }
              let { Component } = componentConf;
              const wrapperDefaultClassName = styles["componentWrapper"];
              const wrapperClassName = classNames({
                [wrapperDefaultClassName]: true,
              });

              return (
                <div className={wrapperClassName} key={id}>
                  <div className={styles.component}>
                    <Component {...props} answer={answer} />
                  </div>
                </div>
              );
            })}
        </div>
      </Drawer>
    </>
  );
};

export default PersonalQuestionnaire;

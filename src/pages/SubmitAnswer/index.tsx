import styles from "./index.module.scss";
import { useEffect, useState } from "react";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getComponent } from "../../components/AnswerComponents";
import { QuestionType } from "../../type/question";
import { useRequest } from "ahooks";
import { getQuestionService } from "../../services/question";
import { Button, Form, Result, Spin, message } from "antd";
import { useForm } from "antd/es/form/Form";
import { isDoneService, submitService } from "../../services/answer";
import useGetUserInfo from "../../hooks/useGetUserInfo";

type PropsType = {
  code: number;
  info: {
    id: number;
    title: string;
    description: string;
    isPublished: number;
    isDeleted: number;
    componentList: Array<QuestionType>;
  };
  msg: string;
};

export default function SubmitAnswer() {
  const [form] = useForm();
  const navigate = useNavigate();
  const [isDone = 0, setIsDone] = useState<boolean>(true);
  let [componentList, setComponentList] = useState<Array<QuestionType>>([]);
  let params = useParams();
  if (!params.id) {
    return null;
  }
  let id = Number.parseInt(params.id);
  let { id: userId = 0 } = useGetUserInfo();

  const { run, loading: questionLoading } = useRequest(
    async (id: number) => {
      const resData = (await getQuestionService(id)) as PropsType;
      let { code, info } = resData;
      let { isDeleted, isPublished, componentList } = info;
      if (code !== 0 || isDeleted || !isPublished) {
        navigate("/error");
      }
      setComponentList(componentList);
      return resData;
    },
    {
      manual: true,
    }
  );

  const { run: isDoneRun, loading: doneLoading } = useRequest(
    async () => {
      let isDoneRes = await isDoneService({ userId, questionnaireId: id });
      if (isDoneRes.code == 0) {
        setIsDone(isDoneRes.info);
        if (isDoneRes.info) {
          message.warning("您已做过该问卷");
        } else {
          run(id);
        }
        return isDoneRes.info;
      } else {
        navigate(-1);
        return isDoneRes.info;
      }
    },
    {
      manual: true,
    }
  );

  useEffect(() => {
    isDoneRun();
  }, [id]);

  //遍历组件
  const ComponentListElem = (
    <>
      {componentList &&
        componentList.map((c: QuestionType) => {
          const componentElem = getComponent(c);
          return (
            <div key={c.id} className={styles.componentWrapper}>
              {componentElem}
            </div>
          );
        })}
    </>
  );

  const submitFn = async () => {
    let formData = form.getFieldsValue();
    let answerList: Array<AnswerType> = [];
    for (let k in formData) {
      let questionId = parseInt(k);
      if (Array.isArray(formData[k])) {
        let item = { questionId, answer: JSON.stringify(formData[k]) };
        answerList.push(item);
      } else {
        let item = { questionId, answer: formData[k] };
        answerList.push(item);
      }
    }
    let res = await submitService({ userId, qId: id, answerList });
    if (res.code == 0) {
      message.success("提交成功");
      setIsDone(true);
    } else {
      message.error("提交失败");
    }
  };

  return (
    <>
      {(questionLoading || doneLoading) && <Spin />}
      {!questionLoading && !doneLoading && isDone && (
        <Result
          status="warning"
          title="您已经完成该问卷"
          extra={
            <Button type="primary" key="console" onClick={() => navigate(-1)}>
              返回上一页
            </Button>
          }
        />
      )}
      {!questionLoading && !doneLoading && !isDone && (
        <div className={styles.container}>
          <Form form={form}>
            {ComponentListElem}
            <Button
              type="primary"
              className={styles.submitBtn}
              onClick={submitFn}
            >
              提交
            </Button>
          </Form>
        </div>
      )}
    </>
  );
}

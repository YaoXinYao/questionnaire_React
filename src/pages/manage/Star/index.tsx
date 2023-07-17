import { useTitle } from "ahooks";
import { Typography } from "antd";
import React, { useState } from "react";
import ListSearch from "../../../components/ListSearch";
import QuestionCard from "../../../components/QuestionCard/QuestionCard";
import styles from "./index.module.scss";
const { Title } = Typography;
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

const Star = () => {
  useTitle("乐答问卷-星标问卷");
  const [questionList, setQuestionList] = useState(rawQuestionList);
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
        {questionList.length > 0 &&
          questionList.map((q) => {
            const { _id } = q;
            return <QuestionCard key={_id} {...q}></QuestionCard>;
          })}
      </div>
      <div className={styles.footer}>分页</div>
    </>
  );
};

export default Star;

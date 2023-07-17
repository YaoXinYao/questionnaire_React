import { useTitle } from "ahooks";
import React, { useState } from "react";
import QuestionCard from "../../../components/QuestionCard/QuestionCard";
import styles from "./index.module.scss";
import { Empty, Typography } from "antd";
import ListSearch from "../../../components/ListSearch";
const { Title } = Typography;

const List = () => {
  useTitle("我的问卷");
  const [questionList, setQuestionList] = useState([
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
      isStar: false,
      answerCount: 5,
      createAt: "3月2日 13：32",
    },
    {
      _id: "q4",
      title: "问卷4",
      isPublished: true,
      isStar: false,
      answerCount: 5,
      createAt: "3月2日 13：32",
    },
  ]);

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>我的问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {questionList.length === 0 && <Empty description="暂无数据" />}
        {questionList.length > 0 &&
          questionList.map((q) => {
            const { _id } = q;
            return <QuestionCard key={_id} {...q}></QuestionCard>;
          })}
      </div>
      <div className={styles.footer}>上划 加载更多</div>
    </>
  );
};

export default List;

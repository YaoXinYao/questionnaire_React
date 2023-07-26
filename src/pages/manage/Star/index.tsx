import { useTitle } from "ahooks";
import { Empty, Pagination, Spin, Typography } from "antd";
import React, { useState } from "react";
import ListPage from "../../../components/ListPage";
import ListSearch from "../../../components/ListSearch";
import QuestionCard from "../../../components/QuestionCard/QuestionCard";
import useLoadQuestionListData from "../../../hooks/useLoadQuestionListData";
import styles from "./index.module.scss";
const { Title } = Typography;

const Star = () => {
  useTitle("乐答问卷-星标问卷");
  const {
    loading,
    error,
    data = {},
  } = useLoadQuestionListData({ isStar: true });
  const {data:res={}}=data
  const { list = {}, total = 0 } = res;
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
        {!loading &&
          list.length > 0 &&
          list.map((q: any) => {
            const { _id } = q;
            return <QuestionCard key={_id} {...q}></QuestionCard>;
          })}
      </div>
      <div className={styles.footer}>
        <ListPage total={total}/>
      </div>
    </>
  );
};

export default Star;

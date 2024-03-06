import React, { useState } from "react";
import useLoadQuesionData from "../../../hooks/useLoadQuestionData";
import useGetPageInfo from "../../../hooks/useGetPageInfo";
import { Button, Result, Spin } from "antd";
import styles from "./index.module.scss";
import { useTitle } from "ahooks";
import { useNavigate } from "react-router-dom";
import StatHeader from "./StatHeader/index";
import ComponentList from "./ComponentList";
import FormList from "./FormList";
import Echarts from "./Echarts";

const Stat = () => {
  const { loading } = useLoadQuesionData();
  const { title, isPublished } = useGetPageInfo();
  const navigate = useNavigate();
  useTitle(`统计问卷-${title}`);
  let [selectedComponentId, setSelectedComponentId] = useState(-1);
  let [selectedComponentType, setSelectedComponentType] = useState("");
  const loadingElem = (
    <div style={{ textAlign: "center", marginTop: "60px" }}>
      <Spin />
    </div>
  );

  function getContentElem() {
    if (!isPublished) {
      {
        return (
          <div style={{ margin: "0 auto" }}>
            <Result
              status="warning"
              title="该问卷尚未发布"
              extra={
                <Button type="primary" onClick={() => navigate(-1)}>
                  返回上一页
                </Button>
              }
            />
          </div>
        );
      }
    } else {
      return (
        <>
          <div className={styles.left}>
            <ComponentList />
          </div>
          <div className={styles.main}>
            <FormList />
          </div>
          <div className={styles.right}>
            <Echarts />
          </div>
        </>
      );
    }
  }
  return (
    <div className={styles.container}>
      <StatHeader />
      <div className={styles["contentWrapper"]}>
        {loading && loadingElem}
        {!loading && <div className={styles.content}>{getContentElem()}</div>}
      </div>
    </div>
  );
};

export default Stat;

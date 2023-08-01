import { Spin } from "antd";
import React, { FC } from "react";
import QuestionInput from "../../../../components/QuestionComponents/QuestionInput/Component";
import QuestionTitle from "../../../../components/QuestionComponents/QuestionTitle/Component";
import useGetComponentInfo from "../../../../hooks/useGetComponentInfo";
import styles from "./index.module.scss";

type PropsType = {
  loading: boolean;
};

const EditCanvas: FC<PropsType> = ({ loading }) => {
  const res = useGetComponentInfo();
  console.log(loading);

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "24px" }}>
        <Spin />
      </div>
    );
  }
  return (
    <div className={styles.canvas}>
      <div className={styles["component-wrapper"]}>
        <div className={styles.component}>
          <QuestionTitle />
        </div>
      </div>
      <div className={styles["component-wrapper"]}>
        <div className={styles.component}>
          <QuestionInput />
        </div>
      </div>
    </div>
  );
};

export default EditCanvas;

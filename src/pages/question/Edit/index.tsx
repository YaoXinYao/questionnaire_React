import React from "react";
import { useDispatch } from "react-redux";
import useLoadQuestionData from "../../../hooks/useLoadQuestionData";
import { changeSelectedId } from "../../../store/componentsReducer";
import EditCanvas from "./EditCanvas";
import styles from "./index.module.scss";
import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";
import EditHeader from "./EditHeader";

const Edit = () => {
  const { loading } = useLoadQuestionData();
  const dispatch = useDispatch();

  function clearSelected() {
    dispatch(changeSelectedId(""));
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <EditHeader />
      </div>
      <div className={styles["content-wrapper"]}>
        <div className={styles.content}>
          <div className={styles.left}>
            <LeftPanel />
          </div>
          <div className={styles.main} onClick={clearSelected}>
            <div className={styles["canvas-wrapper"]}>
              <EditCanvas loading={loading} />
            </div>
          </div>
          <div className={styles.right}>
            <RightPanel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;

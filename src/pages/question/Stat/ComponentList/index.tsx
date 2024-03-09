import type { FC, ReactNode } from "react";
import React, { useState } from "react";
import useGetComponentInfo from "../../../../hooks/useGetComponentInfo";
import styles from "./index.module.scss";
import { getComponentConfByType } from "../../../../components/QuestionComponents";
import classNames from "classnames";
import { useDispatch } from "react-redux";
import { addQuestionnaire } from "../../../../store/statReducer";
import useGetStatInfo from "../../../../hooks/useGetStat";

const ComponentList = () => {
  const dispatch = useDispatch();
  const { id: selectedComponentId } = useGetStatInfo();
  const { componentList } = useGetComponentInfo();

  return (
    <div className={styles.container}>
      {componentList
        .filter((c) => !c.isHidden)
        .map((c) => {
          const { id, props, type } = c;
          const componentConf = getComponentConfByType(type);
          if (componentConf == null) {
            return null;
          }
          let { Component } = componentConf;
          const wrapperDefaultClassName = styles["componentWrapper"];
          const selectedClassName = styles.selected;
          const wrapperClassName = classNames({
            [wrapperDefaultClassName]: true,
            [selectedClassName]: id == selectedComponentId,
          });

          return (
            <div
              className={wrapperClassName}
              key={id}
              onClick={() => {
                dispatch(addQuestionnaire(c));
              }}
            >
              <div className={styles.component}>
                <Component {...props} />
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default ComponentList;

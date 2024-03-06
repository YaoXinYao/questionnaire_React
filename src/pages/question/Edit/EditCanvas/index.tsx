import { Spin } from "antd";
import classNames from "classnames";
import React, { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getComponentConfByType } from "../../../../components/QuestionComponents";
import useGetComponentInfo from "../../../../hooks/useGetComponentInfo";
import {
  changeSelectedId,
  ComponentInfoType,
  moveComponent,
} from "../../../../store/componentsReducer";
import styles from "./index.module.scss";
import useBindCanvasKeyPress from "../../../../hooks/useBindCanvasKeyPress";
import SortableContainer from "../../../../components/DragSortable/SortableContainer";
import SortableItem from "../../../../components/DragSortable/SortableItem";

type PropsType = {
  loading: boolean;
};

function getComponent(componentInfo: ComponentInfoType) {
  const { type, props } = componentInfo;

  const componentConf = getComponentConfByType(type);
  if (componentConf == null) return null;
  const { Component } = componentConf;
  return <Component {...props} />;
}

const EditCanvas: FC<PropsType> = ({ loading }) => {
  const { componentList, selectedId } = useGetComponentInfo();

  const dispatch = useDispatch();

  //绑定快捷键
  useBindCanvasKeyPress();

  function handleClick(event: React.MouseEvent, id: number) {
    event.stopPropagation();
    dispatch(changeSelectedId(id));
  }

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "24px" }}>
        <Spin />
      </div>
    );
  }

  function handleDragEnd(oldIndex: number, newIndex: number) {
    dispatch(moveComponent({ oldIndex, newIndex }));
  }

  return (
    <SortableContainer items={componentList} onDragEnd={handleDragEnd}>
      <div className={styles.canvas}>
        {componentList
          .filter((c) => !c.isHidden)
          .map((item) => {
            const { id = -1, isLocked } = item;
            const defaultClassName = styles["component-wrapper"];
            const selectedClassName = styles.selected;
            const lockedCladdName = styles.locked;
            const isSelectedClassName = classNames({
              [defaultClassName]: true,
              [selectedClassName]: id === selectedId,
              [lockedCladdName]: isLocked,
            });
            return (
              <SortableItem key={id} id={id}>
                <div
                  className={isSelectedClassName}
                  onClick={(e) => handleClick(e, id)}
                >
                  <div className={styles.component}>{getComponent(item)}</div>
                </div>
              </SortableItem>
            );
          })}
        {/* <div className={styles["component-wrapper"]}>
        <div className={styles.component}>
          <QuestionTitle />
        </div>
      </div>
      <div className={styles["component-wrapper"]}>
        <div className={styles.component}>
          <QuestionInput />
        </div>
      </div> */}
      </div>
    </SortableContainer>
  );
};

export default EditCanvas;

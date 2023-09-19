import React, { ChangeEvent, useState } from "react";
import useGetComponentInfo from "../../../../hooks/useGetComponentInfo";
import { useDispatch } from "react-redux";
import { Button, Input, Space, message } from "antd";
import {
  changeComponentHidden,
  changeComponentTitle,
  changeSelectedId,
  lockComponent,
  moveComponent,
} from "../../../../store/componentsReducer";
import styles from "./index.module.scss";
import classNames from "classnames";
import { EyeInvisibleOutlined, LockOutlined } from "@ant-design/icons";
import SortableContainer from "../../../../components/DragSortable/SortableContainer";
import SortableItem from "../../../../components/DragSortable/SortableItem";

const Layers = () => {
  const { componentList, selectedId } = useGetComponentInfo();

  const dispatch = useDispatch();

  const [changingTitleId, setChangingTitleId] = useState("");

  function handleTitleClick(id: string) {
    const curComp = componentList.find((c) => c.id === id);
    if (curComp && curComp.isHidden) {
      message.info("不能选中隐藏组件");
      return;
    }

    if (id !== selectedId) {
      dispatch(changeSelectedId(id));
      setChangingTitleId("");
      return;
    }

    //点击修改标题
    setChangingTitleId(id);
  }

  function changeTitle(event: ChangeEvent<HTMLInputElement>) {
    const newTitle = event.target.value.trim();
    if (!newTitle) return;
    if (!selectedId) return;
    dispatch(changeComponentTitle({ id: selectedId, title: newTitle }));
  }

  //切换隐藏与显示
  function changeHidden(id: string, isHidden: boolean) {
    dispatch(changeComponentHidden({ id, isHidden }));
  }

  //切换锁定与解锁
  function changeLocked(id: string) {
    dispatch(lockComponent({ id }));
  }
  function handleDragEnd(oldIndex: number, newIndex: number) {
    dispatch(moveComponent({ oldIndex, newIndex }));
  }

  return (
    <SortableContainer items={componentList} onDragEnd={handleDragEnd}>
      {componentList.map((c) => {
        const { id, title, isHidden, isLocked } = c;

        const titleDefaultClassName = styles.title;
        const selectedClassName = styles.selected;
        const titleClassName = classNames({
          [titleDefaultClassName]: true,
          [selectedClassName]: id === selectedId,
        });

        return (
          <SortableItem key={id} id={id}>
            <div className={styles.wrapper}>
              <div
                className={titleClassName}
                onClick={() => handleTitleClick(id)}
              >
                {id === changingTitleId && (
                  <Input
                    value={title}
                    onChange={changeTitle}
                    onPressEnter={() => setChangingTitleId("")}
                    onBlur={() => setChangingTitleId("")}
                  />
                )}
                {id !== changingTitleId && title}
              </div>
              <div className={styles.handler}>
                <Space>
                  <Button
                    size="small"
                    shape="circle"
                    className={!isHidden ? styles.btn : ""}
                    icon={<EyeInvisibleOutlined />}
                    type={isHidden ? "primary" : "text"}
                    onClick={() => changeHidden(id, !isHidden)}
                  />

                  <Button
                    size="small"
                    shape="circle"
                    className={!isLocked ? styles.btn : ""}
                    icon={<LockOutlined />}
                    type={isLocked ? "primary" : "text"}
                    onClick={() => changeLocked(id)}
                  />
                </Space>
              </div>
            </div>
          </SortableItem>
        );
      })}
    </SortableContainer>
  );
};

export default Layers;

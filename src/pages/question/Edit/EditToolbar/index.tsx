import {
  DeleteOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { Button, Space, Tooltip } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import {
  changeComponentHidden,
  lockComponent,
  removeSelectedComponent,
} from "../../../../store/componentsReducer";
import useGetComponentInfo from "../../../../hooks/useGetComponentInfo";

const EditToolbar = () => {
  const dispatch = useDispatch();
  const { selectedId, selectedComponent } = useGetComponentInfo();
  console.log(selectedComponent);

  const { isLocked } = selectedComponent || {};

  //删除组件
  function handleDelete() {
    dispatch(removeSelectedComponent());
  }

  //隐藏组件
  function handleHidden() {
    dispatch(changeComponentHidden({ id: selectedId, isHidden: true }));
  }

  //锁定组件
  function handleLock() {
    dispatch(lockComponent({ id: selectedId }));
  }

  return (
    <Space>
      <Tooltip title="删除">
        <Button
          shape="circle"
          icon={<DeleteOutlined />}
          onClick={handleDelete}
        ></Button>
      </Tooltip>
      <Tooltip title="隐藏">
        <Button
          shape="circle"
          icon={<EyeInvisibleOutlined />}
          onClick={handleHidden}
        ></Button>
      </Tooltip>
      <Tooltip title="锁定">
        <Button
          shape="circle"
          icon={<LockOutlined />}
          onClick={handleLock}
          type={isLocked ? "primary" : "default"}
        ></Button>
      </Tooltip>
    </Space>
  );
};

export default EditToolbar;

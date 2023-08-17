import { AppstoreAddOutlined, BarsOutlined } from "@ant-design/icons";
import { Tabs } from "antd";
import React from "react";
import ComponentPanel from "../ComponentPanel";

const LeftPanel = () => {
  let tabsItems = [
    {
      key: "ComponentPanel",
      label: (
        <span>
          <AppstoreAddOutlined />
          组件库
        </span>
      ),
      children: (
        <div>
          <ComponentPanel />
          {/* 组件库 */}
        </div>
      ),
    },
    {
      key: "layers",
      label: (
        <span>
          <BarsOutlined />
          图层
        </span>
      ),
      children: <div>图层</div>,
    },
  ];
  return <Tabs defaultActiveKey="ComponentPanel" items={tabsItems} />;
};

export default LeftPanel;

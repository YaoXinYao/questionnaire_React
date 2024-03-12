import React, { useState } from "react";
import { FileTextOutlined } from "@ant-design/icons";
import { Tabs } from "antd";
import ComponentProp from "../ComponentProp";
import QuestionnireDescription from "../QuestionnireDescription";

enum TAB_KEY {
  PROP_KEY = "prop",
  DESCRIPTION_KEY = "description",
}

const RightPanel = () => {
  const [activeKey, setActiveKey] = useState(TAB_KEY.PROP_KEY);

  function changeTab(key: string) {
    setActiveKey(key as TAB_KEY); // 将 string 类型转换为 TAB_KEY 类型
  }

  const tabsItems = [
    {
      key: TAB_KEY.PROP_KEY,
      label: (
        <span>
          <FileTextOutlined />
          属性
        </span>
      ),
      children: <ComponentProp />,
    },
    {
      key: TAB_KEY.DESCRIPTION_KEY,
      label: (
        <span>
          <FileTextOutlined />
          问卷描述
        </span>
      ),
      children: <QuestionnireDescription />,
    },
  ];
  return (
    <Tabs
      activeKey={activeKey}
      items={tabsItems}
      onChange={(key: string) => changeTab(key)}
    ></Tabs>
  );
};

export default RightPanel;

import React, { useEffect, useState } from "react";
import { FileTextOutlined, SettingOutlined } from "@ant-design/icons";
import { Tabs } from "antd";
import ComponentProp from "../ComponentProp";
import PageSetting from "../PageSetting/index";
import useGetComponentInfo from "../../../../hooks/useGetComponentInfo";

enum TAB_KEY {
  PROP_KEY = "prop",
  SETTING_KEY = "setting",
}

const RightPanel = () => {
  const [activeKey, setActiveKey] = useState(TAB_KEY.PROP_KEY);
  const { selectedId } = useGetComponentInfo();
  useEffect(() => {
    if (selectedId) setActiveKey(TAB_KEY.PROP_KEY);
    else setActiveKey(TAB_KEY.PROP_KEY);
  }, [selectedId]);
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
      key: TAB_KEY.PROP_KEY,
      label: (
        <span>
          <SettingOutlined />
          页面设置
        </span>
      ),
      children: <PageSetting />,
    },
  ];
  return <Tabs activeKey={activeKey} items={tabsItems}></Tabs>;
};

export default RightPanel;

import React from "react";
import {
  ComponentPropsType,
  getComponentConfByType,
} from "../../../../components/QuestionComponents";
import useGetComponentInfo from "../../../../hooks/useGetComponentInfo";
import { useDispatch } from "react-redux";
import { changeComponentProps } from "../../../../store/componentsReducer";

const ComponentProp = () => {
  let noProps = <div style={{ textAlign: "center" }}>未选中组件</div>;

  const dispatch = useDispatch();
  const { selectedComponent } = useGetComponentInfo();
  if (selectedComponent == null) {
    return noProps;
  }

  const { type, props,isLocked } = selectedComponent;
  const componentConf = getComponentConfByType(type);
  if (componentConf == null) {
    return noProps;
  }

  function changeProps(newProps: ComponentPropsType) {
    if (selectedComponent == null) return;
    const { id } = selectedComponent;
    dispatch(changeComponentProps({ id, newProps }));
  }

  const { PropComponent } = componentConf;
  return <PropComponent {...props} onChange={changeProps} disabled={isLocked}/>;
};

export default ComponentProp;

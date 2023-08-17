import { FC } from "react";
import QuestionInputConf, { QuestionInputPropsType } from "./QuestionInput";
import QuestionTitleConf, { QuestionTitlePropsType } from "./QuestionTitle";

//每个组件的属性
export type ComponentPropsType = QuestionInputPropsType &
  QuestionTitlePropsType;

//组件的配置
export type ComponentConfType = {
  title: string;
  type: string;
  Component: FC<ComponentPropsType>;
  defaultProps: ComponentPropsType;
  PropComponent:FC<ComponentPropsType>
};

//组件配置列表
const componentConfList: ComponentConfType[] = [
  QuestionInputConf,
  QuestionTitleConf,
];

//组件分组
export const componentConfGroup = [
  {
    groupId: "text",
    groupName: "文本显示",
    components: [QuestionTitleConf],
  },
  {
    groupId: "input",
    groupName: "用户输入",
    components: [QuestionInputConf],
  },
];

//根据类型去获取组件属性
export function getComponentConfByType(type: string) {
  return componentConfList.find((c) => c.type === type);
}

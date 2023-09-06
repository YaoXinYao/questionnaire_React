import { FC } from "react";
import QuestionInputConf, { QuestionInputPropsType } from "./QuestionInput";
import QuestionTitleConf, { QuestionTitlePropsType } from "./QuestionTitle";
import QuestionParagraphConf, {
  QuestionParagraphPropsType,
} from "./QuestionParagraph";
import QuestionInfoConf, { QuestionInfoPropsType } from "./QuestionInfo";
import QuestionTextAreaConf, {
  QuestionTextAreaPropsType,
} from "./QuestionTextArea";
import QuestionRadioConf, { QuestionRadioPropsType } from "./QuestionRadio";
import QuestionCheckboxConf, {
  QuestionCheckboxPropsType,
} from "./QuestionCheckbox";

//每个组件的属性
export type ComponentPropsType = QuestionInputPropsType &
  QuestionTitlePropsType &
  QuestionParagraphPropsType &
  QuestionInfoPropsType &
  QuestionTextAreaPropsType &
  QuestionRadioPropsType &
  QuestionCheckboxPropsType;

//组件的配置
export type ComponentConfType = {
  title: string;
  type: string;
  Component: FC<ComponentPropsType>;
  defaultProps: ComponentPropsType;
  PropComponent: FC<ComponentPropsType>;
};

//组件配置列表
const componentConfList: ComponentConfType[] = [
  QuestionInputConf,
  QuestionTitleConf,
  QuestionParagraphConf,
  QuestionInfoConf,
  QuestionTextAreaConf,
  QuestionRadioConf,
  QuestionCheckboxConf,
];

//组件分组
export const componentConfGroup = [
  {
    groupId: "text",
    groupName: "文本显示",
    components: [QuestionTitleConf, QuestionParagraphConf, QuestionInfoConf],
  },
  {
    groupId: "input",
    groupName: "用户输入",
    components: [QuestionInputConf, QuestionTextAreaConf],
  },
  {
    groupId: "chooseGroup",
    groupName: "用户选择",
    components: [QuestionRadioConf, QuestionCheckboxConf],
  },
];

//根据类型去获取组件属性
export function getComponentConfByType(type: string) {
  return componentConfList.find((c) => c.type === type);
}

import Component from "./Component";
import { QuestionTitleDefaultProps } from "./interface";
export * from "./interface";
import PropComponent from "./PropComponent";
export default {
  title: "输入框",
  type: "questionTitle",
  Component, //画布展示的组件
  defaultProps: QuestionTitleDefaultProps, //默认属性
  PropComponent, //组件的属性组件
};

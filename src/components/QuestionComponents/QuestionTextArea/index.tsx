/**
 * 问卷的输入框组件
 */
import Component from "./Component";
import { QuestionTextAreaDefaultProps } from "./interface";
export * from "./interface";
import PropComponent from "./PropComponent";
export default {
  title: "输入框",
  type: "questionTextarea",
  Component, //画布展示的组件
  defaultProps: QuestionTextAreaDefaultProps, //默认属性
  PropComponent, //组件的属性组件
};

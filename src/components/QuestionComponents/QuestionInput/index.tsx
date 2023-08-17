import { ComponentConfType } from "..";
import Component from "./Component";
import { QuestionInputDefaultProps } from "./interface";
export * from "./interface";
import PropComponent from "./PropComponent";
export default {
  title: "输入框",
  type: "questionInput",
  Component,//画布展示的组件
  defaultProps: QuestionInputDefaultProps,//默认属性
  PropComponent,//组件的属性组件
};

/**
 * 问卷的段落组件
 */
import Component from "./Component";
import PropComponent from "./PropComponent";
import { QuestionParagrapDefaulthProps } from "./interface";
export * from "./interface";

//组件的配置
export default {
  title: "段落",
  type: "questionParagraph",
  Component, //画布展示的组件
  defaultProps: QuestionParagrapDefaulthProps, //默认属性
  PropComponent, //组件的属性组件
};

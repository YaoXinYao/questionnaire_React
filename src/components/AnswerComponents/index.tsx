import React from "react";
import QuestionCheckbox from "./QuestionCheckbox";
import QuestionInfo from "./QuestionInfo";
import QuestionInput from "./QuestionInput";
import QuestionParagraph from "./QuestionParagraph";
import QuestionRadio from "./QuestionRadio";
import QuestionTextarea from "./QuestionTextarea";
import QuestionTitle from "./QuestionTitle";

type ComponentInfoType = {
  id: number;
  type: string;
  title: string;
  props: any;
  isHidden: number;
  isLocked: number;
  qId: number;
  create_time: string;
};
export const getComponent = (component: ComponentInfoType) => {
  let { id, type, isHidden, props = {} } = component;
  props = JSON.parse(props);
  if (isHidden) {
    return null;
  }

  if (type === "questionInput") {
    return <QuestionInput id={id} props={props} />;
  }

  if (type === "questionRadio") {
    return <QuestionRadio id={id} props={props} />;
  }

  if (type == "questionTitle") {
    return <QuestionTitle {...props} />;
  }

  if (type == "questionParagraph") {
    return <QuestionParagraph {...props} />;
  }

  if (type == "questionInfo") {
    return <QuestionInfo {...props} />;
  }

  if (type == "questionTextarea") {
    return <QuestionTextarea id={id} props={props} />;
  }

  if (type == "questionCheckbox") {
    return <QuestionCheckbox id={id} props={props} />;
  }
  return null;
};

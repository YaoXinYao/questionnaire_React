import { Typography } from "antd";
import React, { FC } from "react";
import { QuestionTitlePropsType, QuestionTitleDefaultProps } from "./interface";

const { Title } = Typography;

const QuestionTitle: FC<QuestionTitlePropsType> = (
  props: QuestionTitlePropsType
) => {
  const {
    text = "",
    level = 1,
    isCenter = false,
  } = { ...QuestionTitleDefaultProps, ...props };

  const getFonSize = (level: number) => {
    switch (level) {
      case 1:
        return "24px";
      case 2:
        return "20px";
      case 3:
        return "16px";
      default:
        return "16px";
    }
  };
  return (
    <Title
      level={level}
      style={{
        textAlign: isCenter ? "center" : "left",
        fontSize: getFonSize(level),
      }}
    >
      {text}
    </Title>
  );
};

export default QuestionTitle;

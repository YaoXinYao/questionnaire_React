import React, { FC } from "react";
import { Typography } from "antd";
import {
  QuestionParagrapDefaulthProps,
  QuestionParagraphPropsType,
} from "./interface";

const { Paragraph } = Typography;
const Component: FC<QuestionParagraphPropsType> = (
  props: QuestionParagraphPropsType
) => {
  const { text = "", isCenter = false } = {
    ...QuestionParagrapDefaulthProps,
    ...props,
  };
  const replaceText = text.split("\n");
  return (
    <Paragraph
      style={{ textAlign: isCenter ? "center" : "left", marginBottom: 0 }}
    >
      {replaceText.map((t, index) => (
        <span key={index}>
          {index > 0 && <br />}
          {t}
        </span>
      ))}
    </Paragraph>
  );
};

export default Component;

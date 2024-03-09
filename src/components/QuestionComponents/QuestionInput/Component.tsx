import React, { FC } from "react";
import { QuestionInputDefaultProps, QuestionInputPropsType } from "./interface";
import { Input, Typography } from "antd";

const { Paragraph } = Typography;

const QuestionInput: FC<QuestionInputPropsType> = (
  props: QuestionInputPropsType
) => {
  const {
    title,
    placeholder,
    answer = "",
  } = { ...QuestionInputDefaultProps, ...props };
  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <div>
        <Input placeholder={placeholder} value={answer}></Input>
      </div>
    </div>
  );
};

export default QuestionInput;

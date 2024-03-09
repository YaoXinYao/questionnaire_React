import React, { FC } from "react";
import {
  QuestionTextAreaDefaultProps,
  QuestionTextAreaPropsType,
} from "./interface";
import { Input, Typography } from "antd";

const { Paragraph } = Typography;
const { TextArea } = Input;

const QuestionTextArea: FC<QuestionTextAreaPropsType> = (
  props: QuestionTextAreaPropsType
) => {
  const {
    title,
    placeholder,
    answer = "",
  } = { ...QuestionTextAreaDefaultProps, ...props };

  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <div>
        <TextArea placeholder={placeholder} value={answer}></TextArea>
      </div>
    </div>
  );
};

export default QuestionTextArea;

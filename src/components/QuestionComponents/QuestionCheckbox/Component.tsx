import React, { FC } from "react";
import {
  QuestionCheckboxDefaultProps,
  QuestionCheckboxPropsType,
} from "./interface";
import { Checkbox, Space, Typography } from "antd";

const { Paragraph } = Typography;
const Component: FC<QuestionCheckboxPropsType> = (
  props: QuestionCheckboxPropsType
) => {
  const {
    title,
    isVertical,
    list = [],
    answer = "",
  } = { ...QuestionCheckboxDefaultProps, ...props };
  let answerList: Array<string> = [];
  if (answer != "") {
    answerList = JSON.parse(answer);
  }

  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <Space direction={isVertical ? "vertical" : "horizontal"}>
        {list.map((opt) => {
          const { value, text, checked } = opt;
          let isChecked = false;
          if (answerList.length != 0) {
            isChecked = answerList.includes(value);
          } else {
            isChecked = checked;
          }
          return (
            <Checkbox key={value} checked={isChecked}>
              {text}
            </Checkbox>
          );
        })}
      </Space>
    </div>
  );
};

export default Component;

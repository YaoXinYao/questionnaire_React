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
  } = { ...QuestionCheckboxDefaultProps, ...props };
  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <Space direction={isVertical ? "vertical" : "horizontal"}>
        {list.map((opt) => {
          const { value, text, checked } = opt;
          return (
            <Checkbox key={value} checked={checked}>
              {text}
            </Checkbox>
          );
        })}
      </Space>
    </div>
  );
};

export default Component;

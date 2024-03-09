import React, { FC } from "react";
import { QuestionRadioDefaultProps, QuestionRadioPropsType } from "./interface";
import { Radio, Space, Typography } from "antd";

const { Paragraph } = Typography;
const Component: FC<QuestionRadioPropsType> = (
  props: QuestionRadioPropsType
) => {
  const {
    title,
    options = [],
    value,
    isVertical,
    answer = "",
  } = { ...QuestionRadioDefaultProps, ...props };
  let defaultValue = value;
  if (answer != "") {
    defaultValue = answer;
  } else {
    defaultValue = value;
  }

  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <Radio.Group value={defaultValue}>
        <Space direction={isVertical ? "vertical" : "horizontal"}>
          {options.map((opt) => {
            const { value, text } = opt;
            return (
              <Radio value={value} key={value}>
                {text}
              </Radio>
            );
          })}
        </Space>
      </Radio.Group>
    </div>
  );
};

export default Component;

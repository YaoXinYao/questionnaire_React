import React, { FC } from "react";
import { QuestionInfoDefaultProps, QuestionInfoPropsType } from "./interface";
import { Typography } from "antd";
const { Title, Paragraph } = Typography;

const Component: FC<QuestionInfoPropsType> = (props: QuestionInfoPropsType) => {
  const { title, desc = "" } = { ...QuestionInfoDefaultProps, ...props };
  let replaceDesc = desc.split("\n");
  return (
    <div style={{ textAlign: "center" }}>
      <Title style={{ fontSize: "24px" }}>{title}</Title>
      <Paragraph>
        {replaceDesc.map((d, index) => (
          <span key={index}>
            {index > 0 && <br />}
            {d}
          </span>
        ))}
      </Paragraph>
    </div>
  );
};

export default Component;

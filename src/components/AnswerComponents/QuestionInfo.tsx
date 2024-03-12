import type { FC } from "react";
import React from "react";

type IProps = {
  title: string;
  description?: string;
};

const QuestionInfo: FC<IProps> = ({ title, description }) => {
  return (
    <div style={{ textAlign: "center" }}>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
};

export default QuestionInfo;

import type { FC, ReactNode } from "react";
import React from "react";

type IProps = {
  text: string;
  isCenter?: boolean;
};

const QuestionParagraph: FC<IProps> = ({ text, isCenter }) => {
  const style: React.CSSProperties = {};
  if (isCenter) {
    style.textAlign = "center";
  }
  if (!text) {
    return <></>;
  }
  const textArr = text.split("\n");
  return (
    <p>
      {textArr.map((t, index) => (
        <span key={index}>
          {index > 0 && <br />}
          {t}
        </span>
      ))}
    </p>
  );
};

export default QuestionParagraph;

import type { FC } from "react";
import styles from "./QuestionTextarea.module.scss";
import React from "react";
import TextArea from "antd/es/input/TextArea";
import { Form } from "antd";

type IProps = {
  id: number;
  props: {
    title: string;
    placeholder?: string;
  };
};

const QuestionTextarea: FC<IProps> = ({ id, props }) => {
  const { title, placeholder } = props;
  return (
    <>
      <p className={styles.title}>{title}</p>
      <div className={styles.textareaWrapper}>
        <Form.Item name={id}>
          <TextArea placeholder={placeholder} autoSize={{ minRows: 2 }} />
        </Form.Item>
      </div>
    </>
  );
};

export default QuestionTextarea;

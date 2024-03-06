import { FC } from "react";
import styles from "./QuestionInput.module.scss";
import React from "react";
import { Form, Input } from "antd";
type PropsType = {
  id: number;
  props: {
    title: string;
    placeholder?: string;
  };
};

const QuestionInput: FC<PropsType> = ({ id, props }) => {
  const { title, placeholder = "" } = props;
  return (
    <>
      <p>{title}</p>

      <div className={styles.inputWrapper}>
        {/* <input name={id + ""} placeholder={placeholder} /> */}
        <Form.Item name={id}>
          <Input placeholder={placeholder} />
        </Form.Item>
      </div>
    </>
  );
};

export default QuestionInput;

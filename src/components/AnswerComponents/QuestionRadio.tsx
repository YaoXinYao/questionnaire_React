import type { FC, ReactNode } from "react";
import styles from "./QuestionRadio.module.scss";
import React, { useState } from "react";
import { Form, Radio, RadioChangeEvent, Space } from "antd";

type IProps = {
  id: number;
  props: {
    title: string;
    options: Array<{
      value: string;
      text: string;
    }>;
    value: string;
    isVertical: boolean;
  };
};

const QuestionRadio: FC<IProps> = ({ id, props }) => {
  const { title, options = [], value: PropsValue, isVertical } = props;
  let direction: DirectionType;
  if (isVertical) {
    direction = "vertical";
  }

  const [value, setValue] = useState(PropsValue);

  const onChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  return (
    <>
      <p className={styles.title}>{title}</p>
      <Form.Item name={id}>
        <Radio.Group onChange={onChange} value={value}>
          <Space direction={direction}>
            {options.map((opt) => {
              const { value: val, text } = opt;
              return (
                <Radio key={val} value={val}>
                  {text}
                </Radio>
              );
            })}
          </Space>
        </Radio.Group>
      </Form.Item>
    </>
  );
};

export default QuestionRadio;

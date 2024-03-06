import { useState, type FC, type ReactNode, useEffect } from "react";
import styles from "./QuestionCheckbox.module.scss";
import React from "react";
import { Checkbox, Form, Space } from "antd";
import type { GetProp } from "antd";

type IProps = {
  id: number;
  props: {
    title: string;
    isVertical: boolean;
    list: Array<{ value: string; text: string; checked: boolean }>;
  };
};

const QuestionCheckbox: FC<IProps> = ({ id, props }) => {
  const { title, isVertical, list = [] } = props;
  const [value, setValue] = useState("");
  let [selectedValue, setSelectedValue] = useState<string[]>([]);
  let direction: DirectionType;
  if (isVertical) {
    direction = "vertical";
  }

  useEffect(() => {
    list.forEach((item) => {
      const { value, checked } = item;
      if (checked) {
        setSelectedValue((selectedValue) => selectedValue.concat(value));
      }
    });
  }, [list]);

  const onChange: GetProp<typeof Checkbox.Group, "onChange"> = (
    checkedValues: any
  ) => {
    console.log("checked = ", checkedValues);
  };

  function toggleChecked(value: string) {
    if (selectedValue.includes(value)) {
      setSelectedValue((selectedValue) =>
        selectedValue.filter((v) => v != value)
      );
    } else {
      setSelectedValue(selectedValue.concat(value));
    }
  }
  return (
    <>
      <p className={styles.title}>{title}</p>
      {/* <input type="hidden" name={id + ""} value={selectedValue.toString()} /> */}
      <Form.Item name={id}>
        <Checkbox.Group onChange={onChange}>
          <Space direction={direction}>
            {list.map((item) => {
              const { value, text, checked } = item;

              return (
                <Checkbox key={value} value={value} checked={checked}>
                  {text}
                </Checkbox>
              );
            })}
          </Space>
        </Checkbox.Group>
      </Form.Item>
    </>
  );
};

export default QuestionCheckbox;

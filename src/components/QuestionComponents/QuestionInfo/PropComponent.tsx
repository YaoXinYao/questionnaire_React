import React, { FC, useEffect } from "react";
import { QuestionInfoPropsType } from "./interface";
import { Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";

const { TextArea } = Input;
const PropComponent: FC<QuestionInfoPropsType> = (
  props: QuestionInfoPropsType
) => {
  const { title, desc, onChange, disabled } = props;
  const [form] = useForm();
  function handleValuesChange() {
    if (onChange) {
      onChange(form.getFieldsValue());
    }
  }

  useEffect(() => {
    form.setFieldsValue({ title, desc });
  }, [title, desc]);
  return (
    <Form
      layout="vertical"
      initialValues={{ title, desc }}
      onValuesChange={handleValuesChange}
      disabled={disabled}
      form={form}
    >
      <Form.Item
        label="标题"
        name="title"
        rules={[{ required: true, message: "请输入问卷标题" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="描述" name="desc">
        <TextArea />
      </Form.Item>
    </Form>
  );
};

export default PropComponent;

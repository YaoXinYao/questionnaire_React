import React, { useEffect } from "react";
import useGetPageInfo from "../../../../hooks/useGetPageInfo";
import { Form, Input } from "antd";
import { useDispatch } from "react-redux";
import { resetPageInfo } from "../../../../store/pageInfoReducer";
import TextArea from "antd/es/input/TextArea";

const QuestionnireDescription = () => {
  const pageInfo = useGetPageInfo();
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    form.setFieldsValue(pageInfo);
  }, [pageInfo]);

  function handleValuesChange() {
    dispatch(resetPageInfo(form.getFieldsValue()));
  }

  return (
    <Form
      layout="vertical"
      initialValues={pageInfo}
      onValuesChange={handleValuesChange}
      form={form}
    >
      <Form.Item
        label="问卷标题"
        name="title"
        rules={[{ required: true, message: "请输入标题" }]}
      >
        <Input placeholder="请输入问卷标题" showCount maxLength={20} />
      </Form.Item>
      <Form.Item label="问卷描述" name="description">
        <TextArea
          placeholder="请输入问卷描述"
          autoSize={{ minRows: 2, maxRows: 6 }}
          maxLength={100}
          showCount
        />
      </Form.Item>
    </Form>
  );
};

export default QuestionnireDescription;

import React, { useEffect } from "react";
import useGetPageInfo from "../../../../hooks/useGetPageInfo";
import { Form, Input } from "antd";
import { useDispatch } from "react-redux";
import { resetPageInfo } from "../../../../store/pageInfoReducer";

const PageSetting = () => {
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
        <Input placeholder="请输入问卷标题" />
      </Form.Item>
      <Form.Item label="问卷描述" name="desc">
        <Input placeholder="请输入问卷描述" />
      </Form.Item>
      <Form.Item label="样式代码" name="css">
        <Input placeholder="请输入css样式代码" />
      </Form.Item>
      <Form.Item label="脚本代码" name="js">
        <Input placeholder="请输入js脚本代码" />
      </Form.Item>
    </Form>
  );
};

export default PageSetting;

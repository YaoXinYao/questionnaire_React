import React, { useState } from "react";
import { Space, Typography, Input, Form, Button, message } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";

import styles from "./index.module.scss";
import { useRequest } from "ahooks";
import { registerService, sendCodeService } from "../../services/user";
import { useForm } from "antd/es/form/Form";

const { Title } = Typography;

const Register = () => {
  const nav = useNavigate();
  const [form] = useForm();
  const [isDisabled, setIsDisabled] = useState(false);
  const [btnStr, setBtnStr] = useState("发送验证码");
  const { loading: regiserLoading, run: register } = useRequest(
    async (values: { username: string; email: string; code: string }) => {
      let { username, email, code } = values;
      const data = await registerService(username, email, code);
      return data;
    },
    {
      manual: true,
      onSuccess(result) {
        if (result.code == 0) {
          message.success("注册成功");
          nav("/login");
        } else {
          message.error(result.info);
        }
      },
    }
  );

  let onFinish = (value: any) => {

    register(value);
  };

  function sendCode() {
    sendCodeService(form.getFieldsValue().email).then((res) => {
      console.log(res);
    });

    setIsDisabled(true);
    let count = 30;
    let timer = setInterval(() => {
      count--;
      setBtnStr(`${count}秒后可再次发送`);
      if (count <= 0) {
        clearInterval(timer);
        setIsDisabled(false);
        setBtnStr(`发送验证码`);
      }
    }, 1000);
  }

  return (
    <div className={styles.container}>
      <div>
        <Space>
          <Title level={2}>
            <UserAddOutlined />
          </Title>
          <Title level={2}>注册新用户</Title>
        </Space>
      </div>
      <div>
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          form={form}
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[
              {
                required: true,
                message: "请输入用户名",
              },
              {
                type: "string",
                min: 3,
                max: 15,
                message: "用户名长度为5-12位",
              },
              {
                pattern: /^\w+$/,
                message: "只能是字母数字下划线",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="邮箱" name="email">
            <Input />
          </Form.Item>
          <Form.Item label="验证码" name="code">
            <Space.Compact style={{ width: "100%" }}>
              <Input />
              <Button type="primary" disabled={isDisabled} onClick={sendCode}>
                {btnStr}
              </Button>
            </Space.Compact>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                注册
              </Button>
              <Link to="/login">已有账户，请登录</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Register;

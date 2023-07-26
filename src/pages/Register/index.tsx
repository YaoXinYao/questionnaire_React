import React from "react";
import { Space, Typography, Input, Form, Button, message } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";

import styles from "./index.module.scss";
import { useRequest } from "ahooks";
import { registerService } from "../../services/user";

const { Title } = Typography;

const Register = () => {
  const nav = useNavigate();
  const { loading: regiserLoading, run: regiser } = useRequest(
    async (values) => {
      const { username, password } = values;
      const data = await registerService(username, password);
      return data;
    },
    {
      manual: true,
      onSuccess(result) {
        console.log(result);
        message.success("注册成功");
        nav("/login");
      },
    }
  );

  let onFinish = (value: any) => {
    console.log(value);

    regiser(value);
  };

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
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: "请输入密码" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="确认密码"
            name="confirm"
            dependencies={["password"]} //依赖password
            rules={[
              {
                required: true,
                message: "请确认密码",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  } else {
                    return Promise.reject(new Error("两次密码输入不一致"));
                  }
                },
              }),
            ]}
          >
            <Input.Password />
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

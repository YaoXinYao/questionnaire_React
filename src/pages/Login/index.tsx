import { UserAddOutlined } from "@ant-design/icons";
import { useRequest } from "ahooks";
import { Button, Checkbox, Form, Input, message, Space } from "antd";
import { useForm } from "antd/es/form/Form";
import Title from "antd/es/typography/Title";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginService } from "../../services/user";
import { setToken } from "../../utils/user-token";

import styles from "./index.module.scss";

const Login = () => {
  const nav = useNavigate();
  const [form] = useForm();

  useEffect(() => {
    const { username, password } = getUserFromStorage();
    form.setFieldsValue({ username, password });
  });

  const USERNAME_KEY = "USERNAME";
  const PASSWORD_KEY = "PASSWORD";

  function rememberUser(username: string, password: string) {
    localStorage.setItem(USERNAME_KEY, username);
    localStorage.setItem(PASSWORD_KEY, password);
  }

  function deleteUserFromStorage() {
    localStorage.removeItem(USERNAME_KEY);
    localStorage.removeItem(PASSWORD_KEY);
  }

  function getUserFromStorage() {
    return {
      username: localStorage.getItem(USERNAME_KEY),
      password: localStorage.getItem(PASSWORD_KEY),
    };
  }

  const { run: login } = useRequest(
    async (values) => {
      const { username, password } = values;
      const data = await loginService(username, password);
      return data;
    },
    {
      manual: true,
      onSuccess(result) {
        console.log(result);
        setToken(result.data.token);
        message.success("登录成功");
        nav("/manage/list");
      },
    }
  );

  let onFinish = (value: any) => {
    const { password, username, remember } = value;
    if (remember) {
      rememberUser(username, password);
    } else {
      deleteUserFromStorage();
    }
    login(value);
  };

  return (
    <div className={styles.container}>
      <div>
        <Space>
          <Title level={2}>
            <UserAddOutlined />
          </Title>
          <Title level={2}>用户登陆</Title>
        </Space>
      </div>
      <div>
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          initialValues={{ remember: true }}
          form={form}
        >
          <Form.Item label="用户名" name="username">
            <Input />
          </Form.Item>
          <Form.Item label="密码" name="password">
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 6, span: 16 }}
          >
            <Checkbox>记住我</Checkbox>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                登录
              </Button>
              <Link to="/register">注册新用户</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;

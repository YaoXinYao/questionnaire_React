import { UserAddOutlined } from "@ant-design/icons";
import { useRequest } from "ahooks";
import { Button, Checkbox, Form, Input, message, Space } from "antd";
import { useForm } from "antd/es/form/Form";
import Title from "antd/es/typography/Title";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginService, sendCodeService } from "../../services/user";
import { setToken } from "../../utils/user-token";

import styles from "./index.module.scss";

const Login = () => {
  const nav = useNavigate();
  const [form] = useForm();

  // useEffect(() => {
  //   const { username, password } = getUserFromStorage();
  //   form.setFieldsValue({ username, password });
  // });

  const USERNAME_KEY = "USERNAME";
  const PASSWORD_KEY = "PASSWORD";
  const [isDisabled, setIsDisabled] = useState(false);
  const [btnStr, setBtnStr] = useState("发送验证码");

  // function getUserFromStorage() {
  //   return {
  //     username: localStorage.getItem(USERNAME_KEY),
  //     password: localStorage.getItem(PASSWORD_KEY),
  //   };
  // }

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

  const { run: login } = useRequest(
    async (values) => {
      const { email, code } = values;
      const data = await loginService(email, code);
      return data;
    },
    {
      manual: true,
      onSuccess(result) {
        if (result.code == 0) {
          setToken(result.info);
          message.success("登录成功");
          nav("/manage/list");
        } else {
          message.error(result.info);
        }
      },
    }
  );

  let onFinish = (value: any) => {
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

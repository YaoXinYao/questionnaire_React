import React, { useState } from "react";
import { Space, Typography, Input, Form, Button, message } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";

import styles from "./index.module.scss";
import { useRequest } from "ahooks";
import { registerService, sendCodeService } from "../../services/user";
import { useForm } from "antd/es/form/Form";
import { EMAILEXP } from "../../constant";

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
    setIsDisabled(true);
    sendCodeService(form.getFieldsValue().email).then((res) => {
      if (res.code == 0) {
        message.success("发送成功");
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
      } else {
        setIsDisabled(false);
        message.error("发送失败");
      }
    });
  }

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <div className={styles.header}>
          <Space>
            <Title level={3}>注册</Title>
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
              validateTrigger="onBlur"
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
              <Input placeholder="5-12位字母数字或下划线" />
            </Form.Item>
            <Form.Item
              label="邮箱"
              name="email"
              rules={[
                { required: true, message: "请输入邮箱" },
                { pattern: EMAILEXP, message: "请输入正确格式的邮箱" },
              ]}
              validateTrigger="onBlur"
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="验证码"
              name="code"
              rules={[
                {
                  required: true,
                  message: "请输入验证码",
                },
              ]}
              validateTrigger="onBlur"
            >
              <Space.Compact style={{ width: "100%" }}>
                <Input />
                <Button type="primary" disabled={isDisabled} onClick={sendCode}>
                  {btnStr}
                </Button>
              </Space.Compact>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
              <div className={styles.operationArea}>
                <Button type="primary" htmlType="submit">
                  注册
                </Button>
                <Link to="/login">已有账户，请登录</Link>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Register;

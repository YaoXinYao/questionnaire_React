import { useRequest } from "ahooks";
import { Button, Form, Input, message, Space } from "antd";
import { useForm } from "antd/es/form/Form";
import Title from "antd/es/typography/Title";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getLoginUserInfoService,
  loginService,
  sendCodeService,
} from "../../services/user";

import styles from "./index.module.scss";
import { loginReducer } from "../../store/userReducer";
import { useDispatch } from "react-redux";
import { setToken } from "../../utils/user-token";
import { EMAILEXP } from "../../constant";

const Login = () => {
  const nav = useNavigate();
  const [form] = useForm();
  const dispatch = useDispatch();

  const [isDisabled, setIsDisabled] = useState(false);
  const [btnStr, setBtnStr] = useState("发送验证码");

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

  const { run: login } = useRequest(
    async (values) => {
      const { email, code } = values;
      const data = await loginService(email, code);
      return data;
    },
    {
      manual: true,
      async onSuccess(result) {
        const { code, info } = result;
        if (code == 0) {
          setToken(info);
          let { info: userInfo } = await getLoginUserInfoService();
          const { username, id, email } = userInfo;
          dispatch(loginReducer({ token: info, username, id, email }));
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
      <div className={styles.formContainer}>
        <div className={styles.header}>
          <Space>
            <Title level={3}>登录</Title>
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
              rules={[{ required: true, message: "请输入验证码" }]}
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
                  登录
                </Button>
                <Link to="/register">注册新用户</Link>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;

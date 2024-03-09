import { UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Space, message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import useGetUserInfo from "../../hooks/useGetUserInfo";
import { loginReducer, logoutReducer } from "../../store/userReducer";
import { removeToken } from "../../utils/user-token";
import styles from "./index.module.scss";
import { sendCodeService, updateUserInfoService } from "../../services/user";
import { useForm } from "antd/es/form/Form";

const UserInfo = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [form] = useForm();
  const [username, setUsername] = useState<string>("");
  const { username: name = "", id = 0, email, token } = useGetUserInfo();

  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    setUsername(name);
    // form.setFieldsValue({ username });
  }, [isOpen]);

  function logout() {
    dispatch(logoutReducer());
    removeToken();
    localStorage.clear();
    message.success("退出成功！");
    nav("/login");
  }

  function handleOk() {
    form
      .validateFields()
      .then(async (value) => {
        let res = await updateUserInfoService({
          id,
          username: form.getFieldsValue().username,
        });

        if (res.code == 0) {
          message.success("修改成功");
          dispatch(
            loginReducer({
              username: form.getFieldsValue().username,
              id,
              email,
              token,
            })
          );
          setUsername(form.getFieldsValue().username);
          setOpen(false);
        } else {
          message.error("修改失败");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleCancel() {
    setOpen(false);
  }

  function updateUserInfo() {
    setOpen(true);
  }

  const userInfo = (
    <>
      <span onClick={updateUserInfo} className={styles.userInfo}>
        <UserOutlined />
        {username}
      </span>
      <Button type="link" onClick={logout}>
        退出
      </Button>
    </>
  );

  const login = <Link to="/login">登录</Link>;

  return (
    <>
      {username ? userInfo : login}
      <Modal
        title="用户信息"
        open={isOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form>
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
                pattern: /^\S{1,10}$/,
                message: "1-10位非空格",
              },
            ]}
          >
            <Input placeholder="5-12位字母数字或下划线" value={username} />
          </Form.Item>
          <Form.Item label="邮箱">{email}</Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UserInfo;

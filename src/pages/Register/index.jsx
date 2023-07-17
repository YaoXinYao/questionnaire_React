import React from "react";
import { Typography } from "antd";
import { UserAddOutlined } from "@ant-design/icons";

const { Title } = Typography;

const Register = () => {
  return (
    <div>
      <Title level={2}>
        <UserAddOutlined />
      </Title>
    </div>
  );
};

export default Register;

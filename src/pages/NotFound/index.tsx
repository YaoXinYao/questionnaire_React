import React from "react";
import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const nav = useNavigate();

  return (
    <>
      <Result
        status="404"
        title="404"
        subTitle="抱歉！你访问的页面不存在"
        extra={
          <Button type="primary" onClick={() => nav("/manage/list")}>
            返回首页
          </Button>
        }
      />
    </>
  );
};

export default NotFound;

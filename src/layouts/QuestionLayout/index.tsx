import { Spin } from "antd";
import { Content } from "antd/es/layout/layout";
import React from "react";
import { Outlet } from "react-router-dom";
import useLoadUserData from "../../hooks/useLoadUserData";

const QuestionLayout = () => {
  const { waiting } = useLoadUserData();
  return (
    <>
      <p>QuestionLayout</p>
      <div>
        <Content>
          {waiting ? (
            <div style={{ textAlign: "center", marginTop: "60px" }}>
              <Spin />
            </div> 
          ) : (
            <Outlet />
          )}
        </Content>
      </div>
    </>
  );
};

export default QuestionLayout;

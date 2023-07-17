import React from "react";
import { Outlet } from "react-router-dom";

const QuestionLayout = () => {
  return (
    <>
      <p>QuestionLayout</p>
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default QuestionLayout;

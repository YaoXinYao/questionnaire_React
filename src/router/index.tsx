import React from "react";
import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout/index";
import ManageLayout from "../layouts/ManageLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";
import List from "../pages/manage/List";
import Trash from "../pages/manage/Trash";
import Edit from "../pages/question/Edit";
import Stat from "../pages/question/Stat";
import SubmitAnswer from "../pages/SubmitAnswer";
import QuestionLayout from "../layouts/QuestionLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/manage",
        element: <ManageLayout />,
        children: [
          {
            path: "list",
            element: <List />,
          },
          {
            path: "trash",
            element: <Trash />,
          },
        ],
      },
    ],
  },
  {
    path: "/question",
    // element: <QuestionLayout />,
    children: [
      {
        path: "edit/:id",
        element: <Edit />,
      },
      {
        path: "stat/:id",
        element: <Stat />,
      },
      {
        path: "submitAnswer/:id",
        element: <SubmitAnswer />,
      },
    ],
  },
  {
    path: "*", //404
    element: <NotFound />,
  },
]);

export default router;

export function isLoginOrRegister(pathname: string) {
  if (["/login", "/register"].includes(pathname)) return true;
  console.log("需要登录");

  return false;
}

export function isNoNeedUserInfo(pathname: string) {
  if (["/login", "/register", "/"].includes(pathname)) return true;
  console.log("不需要登录");
  return false;
}

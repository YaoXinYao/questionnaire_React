import React from "react";
import { RouterProvider } from "react-router-dom";
import routerConfig from "./router/index";
import "./App.css";
import withRouteGuard from "./router/RoutingGuard";

function App() {
  const GuardedRouterProvider = withRouteGuard(RouterProvider); // 将 RouterProvider 包裹在高阶组件中

  return <GuardedRouterProvider router={routerConfig}></GuardedRouterProvider>;
}

export default App;

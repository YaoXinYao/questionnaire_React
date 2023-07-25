import Mock from "mockjs";

Mock.mock("/api/test1", "get", () => {
  return {
    error: 0,
    data: {
      name: "你好",
    },
  };
});

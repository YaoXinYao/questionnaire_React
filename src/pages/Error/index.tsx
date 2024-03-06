import { Button, Result } from "antd";
import React from "react";

export default function Error() {
  return (
    <>
      <Result
        status="warning"
        title="找不到该问卷"
        extra={
          <Button type="primary" key="console">
            Go Console
          </Button>
        }
      />
    </>
  );
}

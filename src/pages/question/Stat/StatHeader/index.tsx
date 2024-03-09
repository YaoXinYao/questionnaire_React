import React, { useRef, useState } from "react";
import type { FC, ReactNode } from "react";
import styles from "./index.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Input,
  InputRef,
  Popover,
  QRCode,
  Space,
  Tooltip,
  message,
  theme,
} from "antd";
import { CopyOutlined, LeftOutlined, QrcodeOutlined } from "@ant-design/icons";
import useGetPageInfo from "../../../../hooks/useGetPageInfo";
import Title from "antd/es/typography/Title";
const { useToken } = theme;

const StatHeader: FC = () => {
  const navgate = useNavigate();
  const { title, isPublished } = useGetPageInfo();
  const { id } = useParams();
  const { token } = useToken();

  //复制链接
  const inputRef = useRef<InputRef>(null);
  function copy() {
    let elem = inputRef.current;
    if (elem == null) {
      return null;
    }
    elem.select();
    document.execCommand("copy");
    message.success("复制成功");
  }
  const url = `http://localhost:5173/question/submitAnswer/${id}`;
  const QRCodeElem = (
    <QRCode
      value={url}
      color={token.colorInfoText}
      bgColor={token.colorBgLayout}
    />
  );
  function getLinkAndQRCodeElem() {
    if (!isPublished) {
      return null;
    }

    return (
      <Space>
        <Input value={url} style={{ width: "300px" }} ref={inputRef} />
        <Tooltip>
          <Button icon={<CopyOutlined />} onClick={copy}></Button>
        </Tooltip>

        <Popover content={QRCodeElem}>
          <Button icon={<QrcodeOutlined />}></Button>
        </Popover>
      </Space>
    );
  }

  return (
    <div className={styles["headerWrapper"]}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button
              type="link"
              icon={<LeftOutlined />}
              onClick={() => navgate(-1)}
            ></Button>
            <Title>{title}</Title>
          </Space>
        </div>
        <div className={styles.main}>{getLinkAndQRCodeElem()}</div>
        <div className={styles.right}></div>
      </div>
    </div>
  );
};

export default StatHeader;

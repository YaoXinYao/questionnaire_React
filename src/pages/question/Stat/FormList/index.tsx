import { useRequest } from "ahooks";
import {
  Spin,
  Table,
  TableColumnsType,
  TablePaginationConfig,
  TableProps,
  message,
} from "antd";
import type { FC, ReactNode } from "react";
import React, { useEffect, useState } from "react";
import { getSubmitListService } from "../../../../services/answer";
import { useParams } from "react-router-dom";

interface DataType {
  username: string;
  create_time: string;
  key: React.Key;
  email: string;
}

const FormList = () => {
  let { id: paramsId } = useParams();
  if (!paramsId) return null;
  let id = Number.parseInt(paramsId);
  let [listData, setListData] = useState<Array<DataType>>([]);
  // let [totalPages, setTotalPages] = useState(0);
  // let [currentPage, setCurrentPage] = useState(0);
  // let [count, setCount] = useState(0);
  // let [total, setTotal] = useState(0);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  let { loading, run } = useRequest(
    async () => {
      let res = await getSubmitListService({
        qId: id,
        page: tableParams.pagination.current,
        pageSize: tableParams.pagination.pageSize,
      });

      if (res.code == 0) {
        const { data, total, totalPages, currentPage, count } = res.info;
        // setTotal(total);
        // setTotalPages(totalPages);
        // setCurrentPage(currentPage);
        // setCount(count);
        setTableParams({
          pagination: {
            current: currentPage,
            pageSize: tableParams.pagination.pageSize,
          },
        });
        const newArr = [];
        for (let i = 0; i < data.length; i++) {
          const { create_time, user, id } = data[i];
          const { username, email } = user;
          newArr.push({ username, create_time, key: id, email });
        }

        setListData(newArr);

        return res;
      }
    },
    {
      manual: true,
    }
  );

  useEffect(() => {
    run();
  }, [tableParams.pagination.current, tableParams.pagination.pageSize]);

  const columns: TableColumnsType<DataType> = [
    {
      title: "用户名",
      dataIndex: "username",
    },
    {
      title: "邮箱",
      dataIndex: "email",
    },
    {
      title: "提交时间",
      dataIndex: "create_time",
    },
  ];

  return (
    <>
      {loading && (
        <div style={{ textAlign: "center", marginTop: "60px" }}>
          <Spin />
        </div>
      )}
      {!loading && (
        <Table
          columns={columns}
          dataSource={listData}
          size="middle"
          pagination={tableParams.pagination}
          loading={loading}
        />
      )}
    </>
  );
};

export default FormList;

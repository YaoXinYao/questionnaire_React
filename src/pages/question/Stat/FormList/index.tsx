import { useRequest } from "ahooks";
import {
  Button,
  Input,
  Pagination,
  Space,
  Spin,
  Table,
  TableColumnsType,
} from "antd";
import type { ChangeEvent, FC, ReactNode } from "react";
import React, { useEffect, useState } from "react";
import { getSubmitListService } from "../../../../services/answer";
import { useParams } from "react-router-dom";
const { Search } = Input;
import styles from "./index.module.scss";
import { useDispatch } from "react-redux";
import { updateSelectedUserId } from "../../../../store/statReducer";

interface DataType {
  username: string;
  create_time: string;
  key: React.Key;
  email: string;
  userId: number;
}

const FormList = () => {
  let { id: paramsId } = useParams();
  const dispatch = useDispatch();
  if (!paramsId) return null;
  let id = Number.parseInt(paramsId);
  let [listData, setListData] = useState<Array<DataType>>([]);
  const pageSizeOptions = [5, 10, 15, 20];
  const [searchValue, setSearchValue] = useState<string>("");
  const [pagination, setPagination] = useState({
    total: 0, // 总数据条数
    pageSize: 5, // 每页条数
    current: 1, // 当前页数
  });
  let { loading, run } = useRequest(
    async () => {
      let res = await getSubmitListService({
        qId: id,
        page: pagination.current,
        pageSize: pagination.pageSize,
        searchKey: searchValue,
      });

      if (res.code == 0) {
        const { data, total, totalPages, currentPage, count } = res.info;
        const newPagination = { ...pagination, total, current: currentPage };
        setPagination(newPagination);
        const newArr = [];
        for (let i = 0; i < data.length; i++) {
          const { create_time, user, id } = data[i];
          const { username, email, id: userId } = user;
          newArr.push({ username, create_time, key: id, email, userId });
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
  }, [pagination.current, pagination.pageSize]);

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
    {
      title: "操作",
      key: "action",
      render: (_, info) => (
        <Space size="middle">
          <Button
            type="primary"
            size="small"
            onClick={() =>
              dispatch(
                updateSelectedUserId({
                  id: info.userId,
                  username: info.username,
                })
              )
            }
          >
            查看
          </Button>
        </Space>
      ),
    },
  ];

  function handleSearch() {
    run();
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setSearchValue(event.target.value);
  }

  function pageChangeHandle(page: number, pageSize: number) {
    const newPagination = { ...pagination, current: page, pageSize };
    setPagination(newPagination);
  }

  return (
    <>
      {loading && (
        <div style={{ textAlign: "center", marginTop: "60px" }}>
          <Spin />
        </div>
      )}
      {!loading && (
        <div className={styles.listArea}>
          <Search
            className={styles.searchKey}
            placeholder="输入关键字"
            onSearch={handleSearch}
            style={{ width: "200px" }}
            value={searchValue}
            onChange={handleChange}
            allowClear
          ></Search>
          <Table
            columns={columns}
            dataSource={listData}
            size="middle"
            loading={loading}
            pagination={false}
          />
          <div className={styles.page}>
            {pagination.total > 0 && (
              <Pagination
                pageSizeOptions={pageSizeOptions}
                defaultPageSize={1}
                total={pagination.total}
                pageSize={pagination.pageSize}
                defaultCurrent={pagination.current}
                showSizeChanger
                showQuickJumper
                onChange={pageChangeHandle}
                showTotal={() => `共 ${pagination.total} 条数据`}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default FormList;

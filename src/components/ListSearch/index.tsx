import React, { useEffect, useState } from "react";
import type { ChangeEvent } from "react";
import { Input } from "antd";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
const { Search } = Input;
import { LIST_SEARCH_PARAM_KEY } from "../../constant";

const ListSearch = () => {
  const nav = useNavigate();
  const [searchParams] = useSearchParams();
  const { pathname } = useLocation();
  const [value, setValue] = useState("");

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  useEffect(() => {
    const newVal = searchParams.get(LIST_SEARCH_PARAM_KEY) || "";
    setValue(newVal);
  }, [searchParams]);
  function handleSearch() {
    nav({
      pathname,
      search: `${LIST_SEARCH_PARAM_KEY}=${value}`,
    });
  }

  return (
    <Search
      placeholder="输入关键字"
      onSearch={handleSearch}
      style={{ width: "200px" }}
      value={value}
      onChange={handleChange}
      allowClear
    ></Search>
  );
};

export default ListSearch;

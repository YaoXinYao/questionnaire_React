import { useDebounceFn, useRequest, useTitle } from "ahooks";
import React, { useEffect, useRef, useState } from "react";
import QuestionCard from "../../../components/QuestionCard/QuestionCard";
import styles from "./index.module.scss";
import { Empty, Spin, Typography } from "antd";
import ListSearch from "../../../components/ListSearch";
import { useSearchParams } from "react-router-dom";
import { getQuestionListService } from "../../../services/question";
import {
  LIST_PAGE_SIZE,
  LIST_PAGE_SIZE_PARAM_KEY,
  LIST_SEARCH_PARAM_KEY,
} from "../../../constant";
const { Title } = Typography;

const List = () => {
  useTitle("我的问卷");

  //是否已经开始加载
  const [started, setStarted] = useState(false);
  const [page, setPage] = useState(1);
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);
  const haveMoreData = total > list.length;
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || "";

  //搜索时重新加载
  useEffect(() => {
    setStarted(false);
    setList([]);
    setPage(0);
    setTotal(0);
  }, [keyword]);

  //触发加载更多
  const { loading, run: load } = useRequest(
    async () => {
      const data = await getQuestionListService({
        page,
        pageSize: LIST_PAGE_SIZE,
        keyword,
      });
      return data;
    },
    {
      manual: true,
      onSuccess(result) {
        console.log(result);

        const { list: l = [], total = 0 } = result;
        setList(list.concat(l));
        setTotal(total);
        setPage(page + 1);
      },
    }
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const { run: tryLoadMore } = useDebounceFn(
    () => {
      const elem = containerRef.current;
      if (elem == null) return;
      const domRect = elem.getBoundingClientRect();
      if (domRect == null) return;
      const { bottom } = domRect;
      if (bottom <= document.body.clientHeight) {
        load();
        setStarted(true);
      }
    },
    {
      wait: 1000,
    }
  );

  //页面加载或者url参数变化
  useEffect(() => {
    tryLoadMore();
  }, [searchParams]);

  //页面滚动时
  useEffect(() => {
    if (haveMoreData) {
      window.addEventListener("scroll", tryLoadMore);
    }
    return () => {
      window.removeEventListener("scroll", tryLoadMore);
    };
  }, [searchParams, haveMoreData]);

  const loadMoreContentElem = () => {
    if (!started || loading) {
      return <Spin />;
    }
    if (total == 0) {
      return <Empty description="暂无数据" />;
    }
    if (!haveMoreData) {
      return <span>没有更多了</span>;
    }
    return <span>开始加载下一页</span>;
  };

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>我的问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {list.length > 0 &&
          list.map((q: any) => {
            const { _id } = q;
            return <QuestionCard key={_id} {...q}></QuestionCard>;
          })}
      </div>
      <div className={styles.footer}>
        <div ref={containerRef}>{loadMoreContentElem()}</div>
      </div>
    </>
  );
};

export default List;

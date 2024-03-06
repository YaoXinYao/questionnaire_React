import { useDebounceFn, useRequest, useTitle } from "ahooks";
import React, { useEffect, useMemo, useRef, useState } from "react";
import QuestionCard from "../../../components/QuestionCard/QuestionCard";
import styles from "./index.module.scss";
import { Empty, Spin, Typography } from "antd";
import ListSearch from "../../../components/ListSearch";
import { useSearchParams } from "react-router-dom";
import { getQuestionListService } from "../../../services/question";
import { LIST_PAGE_SIZE, LIST_SEARCH_PARAM_KEY } from "../../../constant";
import { QuestionnaireResType } from "../../../type/question";
const { Title } = Typography;

const List = () => {
  useTitle("我的问卷");

  //是否已经开始加载
  const [started, setStarted] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [list, setList] = useState<QuestionnaireResType[]>([]);
  const [total, setTotal] = useState(0);
  const haveMoreData = total > list.length;
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || "";

  //搜索时重新加载
  useEffect(() => {
    setStarted(false);
    setList([]);
    setPage(1);
    setTotal(0);
  }, [keyword]);

  //触发加载更多
  const { loading, run: load } = useRequest(
    async () => {
      const data = await getQuestionListService({
        page,
        pageSize,
        isDeleted: 0,
        title: keyword,
      });
      console.log(data);

      return data;
    },
    {
      manual: true,
      onSuccess(result) {
        const {
          data,
          total = 0,
          totalPages = 0,
          currentPage = 0,
          count = 0,
        } = result.info;
        setList(list.concat(data));
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

  const updateList = (questionnaire: QuestionnaireResType) => {
    //复制问卷后向列表中添加
    setList((prevList) => [questionnaire, ...prevList]);
  };

  const loadMoreContentElem = useMemo(() => {
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
  }, [started, loading, total, haveMoreData]);

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
            const { id } = q;
            return (
              <QuestionCard
                key={id}
                {...q}
                updateList={updateList}
              ></QuestionCard>
            );
          })}
      </div>
      <div className={styles.footer}>
        <div ref={containerRef}>{loadMoreContentElem}</div>
      </div>
    </>
  );
};

export default List;

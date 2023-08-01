import { useRequest } from "ahooks";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getQuestionService } from "../services/question";
import { resetComponents } from "../store/componentsReducer";

function useLoadQuestionData() {
  const { id = "" } = useParams();
  const dispatch = useDispatch();

  const { data, loading, error, run } = useRequest(
    async (id: string) => {
      if (!id) {
        throw new Error("未获取到问卷信息");
      }
      const data = await getQuestionService(id);
      return data.data;
    },
    {
      manual: true,
    }
  );

  // //data更新时，将componentList存入redux store
  useEffect(() => {
    if (!data) return;
    const { title = "", componentList = [] } = data;

    dispatch(resetComponents({ componentList }));
    run(id);
  }, [data, id]);

  //   const [loading, setLoading] = useState(true);
  //   const [questionData, setQuestionData] = useState({});

  //   useEffect(() => {
  //     async function fn() {
  //       const data = await getQuestionService(id);
  //       setQuestionData(data);
  //       setLoading(false);
  //     }
  //     fn();
  //   }, []);

  //   return {loading,questionData}
  return { loading, error };
}
export default useLoadQuestionData;

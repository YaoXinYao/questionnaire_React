import { useRequest } from "ahooks";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getQuestionService } from "../services/question";
import { StateType } from "../store";
import { resetComponents } from "../store/componentsReducer";
import { getQuestionId, idStateType } from "../store/questionIdReducer";
import { resetPageInfo } from "../store/pageInfoReducer";

function useLoadQuestionData() {
  let { id: paramsId = "-1" } = useParams();
  let id = parseInt(paramsId);
  const { id: preId } = useSelector<StateType>(
    (state) => state.questionId
  ) as idStateType;

  const dispatch = useDispatch();
  let isToRun = true;

  const { data, loading, error, run } = useRequest(
    async (id: number) => {
      if (!id) {
        throw new Error("未获取到问卷信息");
      }
      const data = await getQuestionService(id);
      isToRun = false;
      return data.info;
    },
    {
      manual: true,
    }
  );
  localStorage.setItem("questionId", "");

  // //data更新时，将componentList存入redux store
  useEffect(() => {
    if (preId !== id) {
      run(id);
      dispatch(getQuestionId({ id }));
    }

    if (!data) {
      return;
    }

    const {
      title = "",
      description = "",
      isPublished = 0,
      isDeleted = 0,
      componentList = [],
    } = data;

    let selectedId = -1;
    if (componentList.length > 0) {
      for (let i = 0; i < componentList.length; i++) {
        componentList[i].props = JSON.parse(componentList[i].props);
      }
      selectedId = componentList[0].id;
    }

    dispatch(
      resetComponents({
        componentList,
        selectedId,
        copiedComponent: null,
        addComponentIdsArr: [],
        deleteComponentIdsArr: [],
      })
    );
    dispatch(resetPageInfo({ title, description, isPublished, isDeleted }));
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

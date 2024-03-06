import { useRequest } from "ahooks";
import { useSearchParams } from "react-router-dom";
import { getQuestionListService } from "../services/question";
import { OptionType } from "../type/question";

function useLoadQuestionListData(opt: Partial<OptionType> = {}) {
  const [searchParams] = useSearchParams();
  const { loading, error, data, refresh } = useRequest(
    async () => {
      const data = await getQuestionListService({
        ...opt,
      });
      return data;
    },
    { refreshDeps: [searchParams] }
  );
  return { loading, error, data, refresh };
}

export default useLoadQuestionListData;

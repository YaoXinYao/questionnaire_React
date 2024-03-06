import { useSelector } from "react-redux";
import { StateType } from "../store";
import { ComponentsStateType } from "../store/componentsReducer";
import { updateQuestionItemIndexService } from "../services/question";

export async function useUpdateComponentIndex() {
  const components = useSelector<StateType>(
    (state) => state.components.present
  ) as ComponentsStateType;

  const { componentList = [] } = components;
  let params = [];
  if (!componentList.length) {
    return;
  }
  for (let i = 0; i < componentList.length; i++) {
    params[i] = componentList[i].id;
  }

  let res = await updateQuestionItemIndexService(params);
  return res;
}

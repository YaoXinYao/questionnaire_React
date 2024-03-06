import { useSelector } from "react-redux";
import { StateType } from "../store";
import { ComponentsStateType } from "../store/componentsReducer";

function useGetComponentInfo() {
  const components = useSelector<StateType>(
    (state) => state.components.present
  ) as ComponentsStateType;

  const {
    componentList = [],
    selectedId,
    copiedComponent,
    addComponentIdsArr,
    deleteComponentIdsArr,
  } = components;

  const selectedComponent = componentList.find((c) => c.id === selectedId);

  return {
    componentList,
    selectedId,
    selectedComponent,
    copiedComponent,
    addComponentIdsArr,
    deleteComponentIdsArr,
  };
}

export default useGetComponentInfo;

import { useSelector } from "react-redux";
import { StatType } from "../store/statReducer";
import { StateType } from "../store";

function useGetStatInfo() {
  const { componentInfo, key, selectedUser } = useSelector<StateType>(
    (state) => state.stat
  ) as StatType;
  return { ...componentInfo, key, selectedUser };
}

export default useGetStatInfo;

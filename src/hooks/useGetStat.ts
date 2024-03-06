import { useSelector } from "react-redux";
import { StatType } from "../store/statReducer";
import { StateType } from "../store";

function useGetStatInfo() {
  const statInfo = useSelector<StateType>((state) => state.stat) as StatType;
  return statInfo;
}

export default useGetStatInfo;

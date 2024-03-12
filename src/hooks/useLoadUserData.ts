import {  useSelector } from "react-redux";
import { UserStateType } from "../store/userReducer";
import { StateType } from "../store";

function useLoadUserData() {
  const { id } = useSelector<StateType>(
    (state) => state.user
  ) as UserStateType;
  if (id && id != 0) {
    return { waiting: false };
  } else {
    return { waiting: true };
  }
}

export default useLoadUserData;

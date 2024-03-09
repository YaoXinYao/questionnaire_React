import { useSelector } from "react-redux";
import { StateType } from "../store";
import { UserStateType } from "../store/userReducer";

function useGetUserInfo() {
  const { username, id, token, email } = useSelector<StateType>(
    (state) => state.user
  ) as UserStateType;
  return { username, id, token, email };
}

export default useGetUserInfo;

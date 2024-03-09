import { useDispatch, useSelector } from "react-redux";
import { UserStateType, loginReducer } from "../store/userReducer";
import { StateType } from "../store";

function useLoadUserData() {
  const { id, username, token } = useSelector<StateType>(
    (state) => state.user
  ) as UserStateType;
  if (id && id != 0) {
    return { waiting: false };
  } else {
    return { waiting: true };
  }
}

export default useLoadUserData;

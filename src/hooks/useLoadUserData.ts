import { useRequest } from "ahooks";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getUserInfoService } from "../services/user";
import { loginReducer } from "../store/userReducer";
import useGetUserInfo from "./useGetUserInfo";

function useLoadUserData() {
  const [waiting, setWaiting] = useState(true);
  const dispatch = useDispatch();

  //加载用户信息
  const { run } = useRequest(getUserInfoService, {
    manual: true,
    onSuccess(res) {
      const { username = "" } = res.data;

      //存储到store
      dispatch(loginReducer({ username }));
    },
    onFinally() {
      setWaiting(false);
    },
  });

  const { username } = useGetUserInfo();
  useEffect(() => {
    if (username) {
      setWaiting(false);
      return;
    }

    run();
  }, [username]);

  return { waiting };
}

export default useLoadUserData;

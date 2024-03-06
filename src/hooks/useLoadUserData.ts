import { useRequest } from "ahooks";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getLoginUserInfoService } from "../services/user";
import { loginReducer } from "../store/userReducer";
import useGetUserInfo from "./useGetUserInfo";

function useLoadUserData() {
  const [waiting, setWaiting] = useState(true);
  const dispatch = useDispatch();

  //加载用户信息
  const { run } = useRequest(getLoginUserInfoService, {
    manual: true,
    onSuccess(res) {
      if (res.code == 0) {
        const { username = "", id } = res.info;
        //存储到store
        console.log(res);

        dispatch(loginReducer({ username, id }));
      }
    },
    onFinally() {
      setWaiting(false);
    },
  });

  const { username, id } = useGetUserInfo();
  useEffect(() => {
    if (id) {
      setWaiting(false);
      return;
    }

    run();
  }, [id]);

  return { waiting };
}

export default useLoadUserData;

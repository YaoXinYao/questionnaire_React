import axios, { ResDataType } from "./ajax";

//获取用户信息
export async function getUserInfoService(): Promise<ResDataType> {
  const url = "/api/user/getUserInfo";
  const data = (await axios.get(url)) as ResDataType;
  return data;
}

//注册
export async function registerService(
  username: string,
  email: string,
  code: string
): Promise<ResDataType> {
  const url = "/api/user/addUser";
  const body = { username, email, code };
  const data = (await axios.post(url, body)) as ResDataType;

  return data;
}

//登录
export async function loginService(
  email: string,
  code: string
): Promise<ResDataType> {
  const url = "/api/user/login";
  const body = { email, code };
  const data = (await axios.post(url, body)) as ResDataType;
  return data;
}

//发送验证码
export async function sendCodeService(email: string): Promise<ResDataType> {
  const url = "/api/user/sendCode";
  const params = { email };
  let data = axios.get(url, { params }) as ResDataType;
  return data;
}

//获取登录用户信息
export async function getLoginUserInfoService() {
  const url = "/api/user/getLoginUser";
  let data = axios.get(url) as ResDataType;
  return data;
}

//修改信息
export async function updateUserInfoService(props: {
  id: number;
  username: string;
}) {
  const url = "/api/user/updateUserInfo";
  let data = axios.patch(url, props) as ResDataType;
  return data;
}

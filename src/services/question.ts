import axios, { ResDataType } from "./ajax";

type SearchOption = {
  keyword: string;
  isStar: boolean;
  isDeleted: boolean;
  page: number;
  pageSize: number;
};

export async function getQuestionService(id: string): Promise<ResDataType> {
  const url = `/api/question/${id}`;
  const data = (await axios.get(url)) as ResDataType;
  return data;
}

//创建问卷
export async function createQuestionService(): Promise<ResDataType> {
  const url = "/api/question";
  const data = (await axios.post(url)) as ResDataType;
  return data;
}

//获取（查询）问卷列表
export async function getQuestionListService(
  opt: Partial<SearchOption> = {}
): Promise<ResDataType> {
  const url = "/api/getQuestionList";
  const data = (await axios.get(url, { params: opt })) as ResDataType;
  return data;
}

//更新问卷
export async function updateQuestionService(
  id: string,
  opt: { [key: string]: any }
): Promise<ResDataType> {
  const url = `/api/updateQuestion/${id}`;
  const data = (await axios.patch(url, opt)) as ResDataType;
  return data;
}

//复制问卷
export async function copyQuestionService(id: string): Promise<ResDataType> {
  const url = `/api/copyQuestion/${id}`;
  const data = (await axios.post(url)) as ResDataType;
  return data;
}

//回收站删除
export async function deleteQuestionService(
  ids: string[]
): Promise<ResDataType> {
  const url = `/api/deleteQuestions`;
  const data = (await axios.delete(url, {data:{ ids }})) as ResDataType;
  return data;
}

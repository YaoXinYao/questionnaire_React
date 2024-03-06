import {
  AddQuestionItemType,
  CreateQuestionnaireType,
  QuestionItemType,
} from "../type/question";
import axios, { ResDataType } from "./ajax";

type SearchOption = {
  id: number;
  title: string;
  isDeleted: number;
  isPublished: number;
  creatorId: number;
  page: number;
  pageSize: number;
};

export async function getQuestionService(id: number): Promise<ResDataType> {
  const url = `/api/questionnaire/getQuestionnaireInfo`;
  const data = (await axios.get(url, { params: { id } })) as ResDataType;
  return data;
}

//创建问卷
export async function createQuestionService(
  props: CreateQuestionnaireType
): Promise<ResDataType> {
  const url = "/api/questionnaire/createQuestionnaire";
  const data = (await axios.post(url, props)) as ResDataType;
  return data;
}

//获取（查询）问卷列表
export async function getQuestionListService(
  opt: Partial<SearchOption> = {}
): Promise<ResDataType> {
  const url = "/api/questionnaire/find";
  const data = (await axios.get(url, { params: opt })) as ResDataType;
  return data;
}

//更新问卷
export async function updateQuestionService(opt: {
  [key: string]: any;
}): Promise<ResDataType> {
  const url = `/api/questionnaire/updateQuestionnaire`;
  const data = (await axios.patch(url, opt)) as ResDataType;
  console.log("更新问卷：", data);

  return data;
}

//复制问卷
export async function copyQuestionService(id: number): Promise<ResDataType> {
  const url = `/api/copyQuestion/${id}`;
  const data = (await axios.post(url)) as ResDataType;
  return data;
}

//添加问卷项
export async function addQuestionItemService(
  props: Array<AddQuestionItemType>
) {
  const url = "/api/questionnaire/addQuestion";
  const data = (await axios.post(url, props)) as ResDataType;
  return data;
}

//更新问卷项
export async function updateQuestionItemService(
  props: Array<Partial<QuestionItemType>>
) {
  const url = "/api/questionnaire/updateQuestionItem";
  const data = (await axios.patch(url, props)) as ResDataType;
  return data;
}

//更新问卷项的索引
export async function updateQuestionItemIndexService(params: Array<number>) {
  console.log("更新索引参数：", params);

  const url = "/api/questionnaire/updateQuestionItemIndex";
  const data = (await axios.post(url, params)) as ResDataType;
  console.log("更新索引结果：", data);

  return data;
}

//删除问卷项
export async function deleteQuestionItemService(ids: Array<number>) {
  const url = "/api/questionnaire/deleteQuestionItems";
  const data = (await axios.delete(url, { params: { ids } })) as ResDataType;
  console.log("删除问卷项目：", data);
  return data;
}

//回收站删除
export async function deleteQuestionnaireService(
  ids: number[]
): Promise<ResDataType> {
  console.log(ids);

  const url = `/api/questionnaire/deleteQuestionnaire`;
  const data = (await axios.delete(url, { params: { ids } })) as ResDataType;
  return data;
}

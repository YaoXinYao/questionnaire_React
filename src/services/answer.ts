import axios, { ResDataType } from "./ajax";
export async function getQuestionnaireInfoById(id: number) {
  const url = `/api/questionnaire/getQuestionnaireInfo`;
  const data = (await axios.get(url, { params: { id } })) as ResDataType;
  return data;
}

export async function submitService(body: SubmitAnswerType) {
  const url = "/api/answer/submitAnswer";
  const data = (await axios.post(url, body)) as ResDataType;
  return data;
}

export async function isDoneService(props: {
  questionnaireId: number;
  userId: number;
}) {
  const url = "/api/answer/isDone";
  const data = (await axios.get(url, { params: props })) as ResDataType;
  return data;
}

export async function getSubmitListService(props: {
  qId: number;
  page: number;
  pageSize: number;
  searchKey: string;
}) {
  const url = "/api/answer/getSubmitList";
  const data = (await axios.get(url, { params: props })) as ResDataType;
  return data;
}

export async function statByQuestionId(props: {
  questionId: number;
  answerKey?: string;
}) {
  const url = "/api/answer/statByQuestionId";
  const data = (await axios.get(url, { params: props })) as ResDataType;
  return data;
}

//获取某个人的答卷
export async function getUserAnswerService(props: {
  userId: number;
  questionnaireId: number;
}) {
  const url = `/api/answer/getUserAnswer`;
  const data = (await axios.get(url, { params: props })) as ResDataType;
  return data;
}

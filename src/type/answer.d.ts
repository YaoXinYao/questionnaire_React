type DirectionType = "horizontal" | "vertical" | undefined;

type SubmitAnswerType = {
  userId: number;
  qId: number;
  answerList: Array<AnswerType>;
};

type AnswerType = {
  questionId: number;
  answer: string;
};

interface SubmitListType {
  data: SubmitListDataType;
  total: number;
  totalPage: number;
  currentPage: number;
  count: number;
}

interface SubmitListDataType {
  id: number;
  userId: number;
  user: UserInfoType;
  qId: number;
  create_time: string;
}

export type OptionType = {
  id: number;
  title: string;
  isPublished: number;
  isDeleted: number;
  creatorId: number;
  page: number;
  pageSize: number;
};

export type QuestionType = {
  id: number;
  title: string;
  type: string;
  props: string | ComponentPropsType;
  isHidden: number;
  isLocked: number;
  qId: number;
  create_time: string;
};

export type QuestionnaireResType = {
  id: number;
  title: string;
  description: string;
  isPublished: number;
  isDeleted: number;
  create_time: string;
  creatorId: number;
};

export interface CreateQuestionnaireType {
  title: string;
  description: string;
  isPublished: number;
  isDeleted: number;
  creatorId: number;
}

export interface QuestionItemType {
  id: number;
  indexId: number;
  title: string;
  type: string;
  props: string | ComponentPropsType;
  isHidden: number;
  isLocked: number;
  qId: number;
  create_time: string;
}

export interface AddQuestionItemType {
  indexId: number;
  title: string;
  type: string;
  props: string;
  isHidden: number;
  isLocked: number;
  qId: number;
}

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface StatType {
  id: number;
  indexId: number;
  isHidden: number;
  isLocked: number;
  props: any;
  qId: number;
  title: string;
  type: string;
  create_time: string;
  key?: string;
}

const initialState: StatType = {
  id: -1,
  indexId: -1,
  isHidden: 0,
  isLocked: 0,
  props: {},
  qId: -1,
  title: "",
  type: "",
  create_time: "",
  key: "",
};

export const stateSlice = createSlice({
  name: "questionnaire",
  initialState,
  reducers: {
    addQuestionnaire: (state, action: PayloadAction<StatType>) => {
      return action.payload;
    },
    updateQuestionnaire: (state, action: PayloadAction<StatType>) => {
      return { ...state, ...action.payload };
    },
    deleteQuestionnaire: (state) => {
      return initialState;
    },
  },
});

export const { addQuestionnaire, updateQuestionnaire, deleteQuestionnaire } =
  stateSlice.actions;

export const selectQuestionnaire = (state: { questionnaire: AnswerType }) =>
  state.questionnaire;

export default stateSlice.reducer;

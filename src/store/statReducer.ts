import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface StatComponentInfoType {
  id: number;
  indexId: number;
  isHidden: number;
  isLocked: number;
  props: any;
  qId: number;
  title: string;
  type: string;
  create_time?: string;
}
export interface StatType {
  componentInfo: StatComponentInfoType;
  selectedUser: selectedUserType;
  key?: string;
}

interface selectedUserType {
  id: number;
  username: string;
}

const initialState: StatType = {
  componentInfo: {
    id: -1,
    indexId: -1,
    isHidden: 0,
    isLocked: 0,
    props: {},
    qId: -1,
    title: "",
    type: "",
    create_time: "",
  },
  selectedUser: {
    id: -1,
    username: "",
  },
  key: "",
};

export const stateSlice = createSlice({
  name: "questionnaire",
  initialState,
  reducers: {
    addQuestionnaire: (state, action: PayloadAction<StatComponentInfoType>) => {
      state.componentInfo = action.payload;
    },
    deleteQuestionnaire: (state) => {
      state.componentInfo = initialState.componentInfo;
    },
    updateSelectedUserId: (state, action: PayloadAction<selectedUserType>) => {
      state.selectedUser = action.payload;
    },
    updateKey: (state, action: PayloadAction<string>) => {
      state.key = action.payload;
    },
  },
});

export const {
  addQuestionnaire,
  updateSelectedUserId,
  updateKey,
  deleteQuestionnaire,
} = stateSlice.actions;

export const selectQuestionnaire = (state: { questionnaire: AnswerType }) =>
  state.questionnaire;

export default stateSlice.reducer;

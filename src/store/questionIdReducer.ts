import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const INIT_STATE = {
  id: -1,
};

export type idStateType = {
  id: number;
};

export const componentsSlice = createSlice({
  name: "getQuestionId",
  initialState: INIT_STATE,
  reducers: {
    //重置
    getQuestionId: (_state: idStateType, action: PayloadAction<idStateType>) => {
      return action.payload;
    },
  },
});

export const { getQuestionId } = componentsSlice.actions;

export default componentsSlice.reducer;

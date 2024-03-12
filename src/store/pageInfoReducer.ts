import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type PageInfoType = {
  title: string;
  description?: string;
  isPublished: number;
  isDeleted: number;
};

const INIT_STATE: PageInfoType = {
  title: "",
  description: "",
  isPublished: 0,
  isDeleted: 0,
};

const pageInfoSlice = createSlice({
  name: "pageInfo",
  initialState: INIT_STATE,
  reducers: {
    resetPageInfo: (
      _state: PageInfoType,
      action: PayloadAction<PageInfoType>
    ) => {
      return action.payload;
    },

    //修改标题
    changePageTitle: (state: PageInfoType, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
  },
});

export const { resetPageInfo, changePageTitle } = pageInfoSlice.actions;

export default pageInfoSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserStateType = {
  id: number;
  username: string;
  token: string;
  email: string;
};

const INIT_STATE: UserStateType = {
  id: 0,
  username: "",
  token: "",
  email: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState: INIT_STATE,
  reducers: {
    loginReducer: (
      state: UserStateType,
      action: PayloadAction<Partial<UserStateType>>
    ) => {
      return { ...state, ...action.payload };
    },
    logoutReducer: () => {
      return INIT_STATE;
    },
  },
});

export const { loginReducer, logoutReducer } = userSlice.actions;
export default userSlice.reducer;

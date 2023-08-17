import { configureStore } from "@reduxjs/toolkit";
import componentsReducer, { ComponentsStateType } from "./componentsReducer";
import userReducer, { UserStateType } from "./userReducer";
import questionIdReducer, { idStateType } from "./questionIdReducer";

export type StateType = {
  user: UserStateType;
  components: ComponentsStateType;
  questionId: idStateType;
};

export default configureStore({
  reducer: {
    user: userReducer,
    components: componentsReducer,
    questionId: questionIdReducer,
  },
});

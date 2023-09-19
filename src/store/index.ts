import { configureStore } from "@reduxjs/toolkit";
import undoable, { excludeAction, StateWithHistory } from "redux-undo";
import componentsReducer, { ComponentsStateType } from "./componentsReducer";
import userReducer, { UserStateType } from "./userReducer";
import questionIdReducer, { idStateType } from "./questionIdReducer";
import pageInfoReducer, { PageInfoType } from "./pageInfoReducer";

export type StateType = {
  user: UserStateType;
  components: StateWithHistory<ComponentsStateType>;
  pageInfo: PageInfoType;
};

export default configureStore({
  reducer: {
    user: userReducer,
    components: undoable(componentsReducer, {
      limit: 20,
      filter: excludeAction([
        "components/resetComponents",
        "components/changeComponentProps",
        "components/selectNextComponent",
        "components/selectPrevComponent",
      ]),
    }),
    questionId: questionIdReducer,
    pageInfo: pageInfoReducer,
  },
});

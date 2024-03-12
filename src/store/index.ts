import { configureStore, Reducer } from "@reduxjs/toolkit";
import undoable, { excludeAction, StateWithHistory } from "redux-undo";
import componentsReducer, { ComponentsStateType } from "./componentsReducer";
import userReducer, { UserStateType } from "./userReducer";
import questionIdReducer from "./questionIdReducer";
import pageInfoReducer, { PageInfoType } from "./pageInfoReducer";
import statReducer, { StatType } from "./statReducer";
import { persistReducer, persistStore } from "redux-persist";
import { PersistPartial } from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
const persistConfig = { key: "root", storage };
let userReducerPersist: Reducer<UserStateType & PersistPartial> =
  persistReducer(persistConfig, userReducer);

export type StateType = {
  questionId: unknown;
  user: UserStateType;
  components: StateWithHistory<ComponentsStateType>;
  pageInfo: PageInfoType;
  stat: StatType;
};

const store = configureStore({
  reducer: {
    user: userReducerPersist,
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
    stat: statReducer,
  },
});

export const persistor = persistStore(store);

export default store;

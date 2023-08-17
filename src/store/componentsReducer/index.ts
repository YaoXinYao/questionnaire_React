import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ComponentPropsType } from "../../components/QuestionComponents";
import { getNextSelectedId } from "./utils";

export type ComponentInfoType = {
  id: string;
  type: string;
  title: string;
  isHidden?: boolean;
  isLocked?: boolean;
  props: ComponentPropsType;
};

export type ComponentsStateType = {
  selectedId: string;
  componentList: Array<ComponentInfoType>;
};

const INIT_STATE: ComponentsStateType = {
  selectedId: "",
  componentList: new Array<ComponentInfoType>(),
};

export const componentsSlice = createSlice({
  name: "components",
  initialState: INIT_STATE,
  reducers: {
    //重置
    resetComponents: (
      state: ComponentsStateType,
      action: PayloadAction<ComponentsStateType>
    ) => {
      return action.payload;
    },

    //修改selectedId
    changeSelectedId: (
      state: ComponentsStateType,
      action: PayloadAction<string>
    ) => {
      state.selectedId = action.payload;
    },

    //添加新组件
    addComponent: (
      state: ComponentsStateType,
      action: PayloadAction<ComponentInfoType>
    ) => {
      const newComponent = action.payload;
      const { selectedId, componentList } = state;
      const index = componentList.findIndex((c) => c.id === selectedId);

      if (index < 0) {
        state.componentList = [...componentList, newComponent];
      } else {
        state.componentList = [
          ...componentList.slice(0, index + 1),
          newComponent,
          ...componentList.slice(index + 1),
        ];
      }
      state.selectedId = newComponent.id;
    },

    //修改组件属性
    changeComponentProps: (
      state: ComponentsStateType,
      action: PayloadAction<{ id: string; newProps: ComponentPropsType }>
    ) => {
      const { id, newProps } = action.payload;

      const curComponent = state.componentList.find((c) => c.id === id);
      if (curComponent) {
        curComponent.props = { ...curComponent.props, ...newProps };
      }
    },

    //删除选中的组件
    removeSelectedComponent: (state: ComponentsStateType) => {
      const { componentList = [], selectedId: removeId } = state;

      //重新计算selectedId
      const newSelectedId = getNextSelectedId(removeId, componentList);
      state.selectedId = newSelectedId as string;

      const index = componentList.findIndex((c) => c.id === removeId);

      state.componentList = [
        ...componentList.slice(0, index),
        ...componentList.slice(index + 1),
      ];
    },
    //隐藏和显示组件
    changeComponentHidden: (
      state: ComponentsStateType,
      action: PayloadAction<{ id: string; isHidden: boolean }>
    ) => {
      const { componentList } = state;
      const { id, isHidden } = action.payload;

      //重新计算selectedId
      let newSelectedId = "";
      if (isHidden) {
        //隐藏
        newSelectedId = getNextSelectedId(id, componentList) as string;
      } else {
        newSelectedId = id;
      }
      state.selectedId = newSelectedId as string;

      const curComp = componentList.find((c) => c.id === id);
      if (curComp) {
        curComp.isHidden = isHidden;
      }
    },

    //锁定与解锁组件
    lockComponent: (
      state: ComponentsStateType,
      action: PayloadAction<{ id: string }>
    ) => {
      const { id } = action.payload;

      const curComp = state.componentList.find((c) => c.id === id);
      if (curComp) {
        curComp.isLocked = !curComp.isLocked;
      }
    },
  },
});

export const {
  resetComponents,
  changeSelectedId,
  addComponent,
  changeComponentProps,
  removeSelectedComponent,
  changeComponentHidden,
  lockComponent,
} = componentsSlice.actions;

export default componentsSlice.reducer;

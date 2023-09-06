import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { ComponentPropsType } from "../../components/QuestionComponents";
import cloneDeep from "lodash.clonedeep";
import { getNextSelectedId, insertNewComponent } from "./utils";

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
  copiedComponent: ComponentInfoType | null;
};

const INIT_STATE: ComponentsStateType = {
  selectedId: "",
  componentList: new Array<ComponentInfoType>(),
  copiedComponent: null,
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
      insertNewComponent(state, newComponent);
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

    //复制当前选中组件
    copySelectedComponent: (state: ComponentsStateType) => {
      const { selectedId, componentList = [] } = state;
      const selectedComponent = componentList.find((c) => c.id === selectedId);
      if (selectedComponent == null) return;
      state.copiedComponent = cloneDeep(selectedComponent); //深拷贝
    },

    //粘贴组件
    pasteCopiedComponent: (state: ComponentsStateType) => {
      const { copiedComponent } = state;
      if (copiedComponent == null) return;

      copiedComponent.id = nanoid();
      insertNewComponent(state, copiedComponent);
    },

    //选中上一个组件
    selectPrevComponent: (state: ComponentsStateType) => {
      const { selectedId, componentList } = state;
      const selectedIndex = componentList.findIndex((c) => c.id == selectedId);
      if (selectedIndex <= 0) return; //未选中或者选中第一个
      state.selectedId = componentList[selectedIndex - 1].id;
    },

    //选中下一个组件
    selectNextComponent: (state: ComponentsStateType) => {
      const { selectedId, componentList } = state;
      const selectedIndex = componentList.findIndex((c) => c.id == selectedId);
      if (selectedIndex < 0 || selectedIndex == componentList.length - 1)
        return;
      state.selectedId = componentList[selectedIndex + 1].id;
    },

    //修改组件标题
    changeComponentTitle: (
      state: ComponentsStateType,
      action: PayloadAction<{ id: string; title: string }>
    ) => {
      const { selectedId, componentList } = state;
      const { title, id } = action.payload;
      const curComp = state.componentList.find((c) => c.id === id);
      const index = state.componentList.findIndex((c) => c.id === id);
      if (curComp) curComp.title = title;
      state.componentList = [
        ...componentList.slice(0, index),
        curComp as ComponentInfoType,
        ...componentList.slice(index + 1),
      ];
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
  copySelectedComponent,
  pasteCopiedComponent,
  selectPrevComponent,
  selectNextComponent,
  changeComponentTitle,
} = componentsSlice.actions;

export default componentsSlice.reducer;

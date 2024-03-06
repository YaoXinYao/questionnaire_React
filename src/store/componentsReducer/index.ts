import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { ComponentPropsType } from "../../components/QuestionComponents";
import cloneDeep from "lodash.clonedeep";
import { getNextSelectedId, insertNewComponent } from "./utils";
import { arrayMove } from "@dnd-kit/sortable";
import { useUpdateComponentIndex } from "../../hooks/useUpdateComponentIndex";

export type ComponentInfoType = {
  id: number;
  indexId: number;
  type: string;
  title: string;
  isHidden: number;
  isLocked: number;
  props: ComponentPropsType;
  qId: number;
  create_time: string;
};
export type AddComponentInfoType = {
  indexId: number;
  type: string;
  title: string;
  isHidden: number;
  isLocked: number;
  props: ComponentPropsType;
  qId: number;
  create_time: string;
};

export type ComponentsStateType = {
  selectedId: number;
  componentList: Array<ComponentInfoType>;
  copiedComponent: ComponentInfoType | null;
  addComponentIdsArr: Array<number>;
  deleteComponentIdsArr: Array<number>;
};

const INIT_STATE: ComponentsStateType = {
  selectedId: -1,
  componentList: new Array<ComponentInfoType>(),
  copiedComponent: null,
  addComponentIdsArr: [],
  deleteComponentIdsArr: [],
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
      action: PayloadAction<number>
    ) => {
      state.selectedId = action.payload;
    },

    //添加新组件
    addComponent: (
      state: ComponentsStateType,
      action: PayloadAction<AddComponentInfoType>
    ) => {
      const newComponent = action.payload;
      const id = new Date().getTime();
      let { addComponentIdsArr } = state;
      state.addComponentIdsArr = [id, ...addComponentIdsArr];
      insertNewComponent(state, { ...newComponent, id });
    },

    //修改组件属性
    changeComponentProps: (
      state: ComponentsStateType,
      action: PayloadAction<{ id: number; newProps: ComponentPropsType }>
    ) => {
      const { id, newProps } = action.payload;

      const curComponent = state.componentList.find((c) => c.id === id);
      if (curComponent) {
        curComponent.props = { ...curComponent.props, ...newProps };
      }
    },

    //删除选中的组件
    removeSelectedComponent: (state: ComponentsStateType) => {
      let {
        componentList = [],
        selectedId: removeId,
        deleteComponentIdsArr,
        addComponentIdsArr,
      } = state;
      let i = addComponentIdsArr.indexOf(removeId);

      if (i >= 0) {
        state.addComponentIdsArr = [
          ...addComponentIdsArr.slice(0, i),
          ...addComponentIdsArr.slice(i + 1),
        ];
      } else {
        state.deleteComponentIdsArr = [...deleteComponentIdsArr, removeId];
      }
      console.log(addComponentIdsArr);

      //重新计算selectedId
      const newSelectedId = getNextSelectedId(removeId, componentList);
      state.selectedId = newSelectedId;

      const index = componentList.findIndex((c) => c.id === removeId);

      state.componentList = [
        ...componentList.slice(0, index),
        ...componentList.slice(index + 1),
      ];
    },

    //隐藏和显示组件
    changeComponentHidden: (
      state: ComponentsStateType,
      action: PayloadAction<{ id: number; isHidden: number }>
    ) => {
      const { componentList } = state;
      const { id, isHidden } = action.payload;

      //重新计算selectedId
      let newSelectedId = -1;
      if (isHidden) {
        //隐藏
        newSelectedId = getNextSelectedId(id, componentList);
      } else {
        newSelectedId = id;
      }
      state.selectedId = newSelectedId;

      const curComp = componentList.find((c) => c.id === id);
      if (curComp) {
        curComp.isHidden = isHidden;
      }
    },

    //锁定与解锁组件
    lockComponent: (
      state: ComponentsStateType,
      action: PayloadAction<{ id: number }>
    ) => {
      const { id } = action.payload;

      const curComp = state.componentList.find((c) => c.id === id);
      if (curComp) {
        curComp.isLocked = curComp.isLocked == 0 ? 1 : 0;
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
      const { copiedComponent, addComponentIdsArr } = state;
      if (copiedComponent == null) return;
      let id = new Date().getTime();
      copiedComponent.id = id;
      state.addComponentIdsArr = [...addComponentIdsArr, id];
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
      action: PayloadAction<{ id: number; title: string }>
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

    //移动组件位置
    moveComponent: (
      state: ComponentsStateType,
      action: PayloadAction<{ oldIndex: number; newIndex: number }>
    ) => {
      const { componentList: curComponentList } = state;
      const { oldIndex, newIndex } = action.payload;
      state.componentList = arrayMove(curComponentList, oldIndex, newIndex);
    },

    //增加组件id
    addComponentIds: (
      state: ComponentsStateType,
      action: PayloadAction<{ id: number }>
    ) => {
      const { addComponentIdsArr } = state;
      state.addComponentIdsArr = [...addComponentIdsArr, action.payload.id];
      console.log(state.addComponentIdsArr);
    },

    //删除组件id
    deleteComponentIds: (
      state: ComponentsStateType,
      action: PayloadAction<{ id: number }>
    ) => {
      const { id } = action.payload;
      let { deleteComponentIdsArr, addComponentIdsArr } = state;
      let index = addComponentIdsArr.indexOf(id);
      if (index >= 0) {
        state.addComponentIdsArr = [
          ...addComponentIdsArr.slice(0, index),
          ...addComponentIdsArr.slice(index + 1),
        ];
      } else {
        console.log(id);

        state.deleteComponentIdsArr = [...deleteComponentIdsArr, id];
      }
      console.log(state.addComponentIdsArr);
      console.log(state.deleteComponentIdsArr);
    },

    //清空删除组件数组
    clearDeleteComponentIds: (state: ComponentsStateType) => {
      state.deleteComponentIdsArr = [];
    },

    //清空添加组件数组id
    clearAddComponentIds: (state: ComponentsStateType) => {
      state.addComponentIdsArr = [];
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
  moveComponent,
  addComponentIds,
  deleteComponentIds,
  clearDeleteComponentIds,
  clearAddComponentIds,
} = componentsSlice.actions;

export default componentsSlice.reducer;

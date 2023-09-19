import { useKeyPress } from "ahooks";
import { useDispatch } from "react-redux";
import {
  copySelectedComponent,
  pasteCopiedComponent,
  removeSelectedComponent,
  selectNextComponent,
  selectPrevComponent,
} from "../store/componentsReducer";
import { ActionCreators as UndoActionCreators } from "redux-undo";

function isActiveElementValid() {
  const activeElem = document.activeElement;

  //光标没有focus到input
  if (activeElem == document.body) return true;
  if (activeElem?.matches('div[role="button"]')) return true;
  return false;
}

function useBindCanvasKeyPress() {
  const dispatch = useDispatch();
  //删除组件
  useKeyPress(["backspace", "delete"], () => {
    if (!isActiveElementValid()) return;
    dispatch(removeSelectedComponent());
  });

  //复制组件
  useKeyPress(["ctrl.c", "meta.c"], () => {
    if (!isActiveElementValid()) return;
    dispatch(copySelectedComponent());
  });

  //粘贴组件
  useKeyPress(["ctrl.v", "meta.v"], () => {
    if (!isActiveElementValid) return;
    dispatch(pasteCopiedComponent());
  });

  //选中上一个组件
  useKeyPress(["uparrow"], () => {
    if (!isActiveElementValid) return;
    dispatch(selectPrevComponent());
  });

  //选中下一个组件
  useKeyPress(["downarrow"], () => {
    if (!isActiveElementValid()) return;
    dispatch(selectNextComponent());
  });

  //撤销
  useKeyPress(
    ["ctrl.z", "meta.z"],
    () => {
      if (!isActiveElementValid()) return;
      dispatch(UndoActionCreators.undo());
    },
    {
      exactMatch: true, //严格匹配
    }
  );

  //重做
  useKeyPress(["ctrl.shift.z", "meta.shift.z"], () => {
    if (!isActiveElementValid()) return;
    dispatch(UndoActionCreators.redo());
  });
}
export default useBindCanvasKeyPress;

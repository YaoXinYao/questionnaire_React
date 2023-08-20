import { ComponentInfoType, ComponentsStateType } from ".";

export function getNextSelectedId(
  id: string,
  componentList: ComponentInfoType[]
) {
  const visibleComponentList=componentList.filter(c=>!c.isHidden)
  const index = visibleComponentList.findIndex((c) => c.id === id);
  if (index < 0) return "";

  //重新计算selectedId
  let newSelectedId = "";
  const length = visibleComponentList.length;

  if (length <= 1) {
    //组件只有一个，那么删除之后，新的被选中id为空
    newSelectedId = "";
  } else {
    if (index + 1 === length) {
      //删除最后一个,选中上一个
      newSelectedId = visibleComponentList[index - 1].id;
    } else {
      //删除的不是最后一个，选中下一个
      newSelectedId = visibleComponentList[index + 1].id;
    }
    return newSelectedId;
  }
}


//插入新组件
export function insertNewComponent(state:ComponentsStateType,newComponent:ComponentInfoType ){
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
}
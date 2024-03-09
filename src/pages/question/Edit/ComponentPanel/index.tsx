import React, { FC } from "react";
import { Typography } from "antd";
import {
  componentConfGroup,
  ComponentConfType,
} from "../../../../components/QuestionComponents";
import styles from "./index.module.scss";
import { useDispatch } from "react-redux";
import { addComponent } from "../../../../store/componentsReducer";
import { useParams } from "react-router-dom";

const { Title } = Typography;

function genComponent(c: ComponentConfType) {
  const { id: paramsId } = useParams();
  if (!paramsId) {
    return null;
  }
  const id = Number.parseInt(paramsId);
  const { title, type, Component, defaultProps } = c;
  const dispatch = useDispatch();

  async function addToCanvas() {
    let addComponentProps = {
      indexId: 0,
      title,
      type,
      props: defaultProps,
      isHidden: 0,
      isLocked: 0,
      qId: id,
    };

    dispatch(addComponent(addComponentProps));
  }
  return (
    <div key={type} className={styles.wrapper} onClick={addToCanvas}>
      <div className={styles.component}>
        <Component />
      </div>
    </div>
  );
}

const ComponentPanel: FC = () => {
  return (
    <>
      {componentConfGroup.map((group: any, index) => {
        const { groupId, groupName, components } = group;

        return (
          <div key={groupId}>
            <Title
              level={3}
              style={{ fontSize: "16px", marginTop: index > 0 ? "20px" : "0" }}
            >
              {groupName}
            </Title>
            <div>{components.map((c: any) => genComponent(c))}</div>
          </div>
        );
      })}
    </>
  );
};

export default ComponentPanel;

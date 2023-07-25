import React from "react";
import useLoadQuesionData from "../../../hooks/useLoadQuestionData";

const Edit = () => {
  const { loading, data } = useLoadQuesionData();

  return <div>{loading ? <p>loading</p> : <p>{JSON.stringify(data)}</p>}</div>;
};

export default Edit;

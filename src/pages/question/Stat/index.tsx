import React from "react";
import useLoadQuesionData from "../../../hooks/useLoadQuestionData";

const Stat = () => {
  const { loading } = useLoadQuesionData();

  return <div>{loading ? <p>loading</p> : <p></p>}</div>;
};

export default Stat;

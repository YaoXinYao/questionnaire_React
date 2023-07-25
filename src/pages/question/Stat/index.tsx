import React from "react";
import useLoadQuesionData from "../../../hooks/useLoadQuestionData";

const Stat = () => {
  const { loading, data } = useLoadQuesionData();

  return (
    <div>
      {loading ? <p>loading</p> : <p>{JSON.stringify(data)}</p>}
    </div>
  );
};

export default Stat;

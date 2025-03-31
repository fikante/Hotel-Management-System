import React from "react";
import { useParams } from "react-router-dom";

const AssignStaff = () => {
  const { id } = useParams();
  return (
    <div>
      Assign Staff
      {id}
    </div>
  );
};

export default AssignStaff;

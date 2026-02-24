import React, { useState } from "react";
import EditableText from "./EditableText";

const MatchTitle = () => {
  const [name2, setName2] = useState("World Cup Finals");
  return (
    <div className="flex justify-center">
      <EditableText text={name2} setText={setName2} />
    </div>
  );
};

export default MatchTitle;

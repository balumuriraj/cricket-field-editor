import React from "react";
import Plain from "./shirts/Plain";

const Shirt = ({ size }: { size: number }) => {
  return <Plain size={size} />;
};

export default Shirt;

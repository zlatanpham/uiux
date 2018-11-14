import * as React from "react";
import useOpenClose from "../hooks/useOpenClose";

const Toggle = () => {
  const { isOpen, toggle } = useOpenClose();
  return (
    <div>
      {isOpen ? "Open" : "Close"}
      <button onClick={() => toggle()}>Toggle</button>
    </div>
  );
};

export default Toggle;

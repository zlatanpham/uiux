import React, { useRef } from "react";
import useDragNumber from "../hooks/useDragNumber";
import classnames from "classnames";

interface Props {
  min: number;
  max: number;
  speed?: number;
  className?: string;
}

const DragNumberInput = ({ min, max, speed = 200, className }: Props) => {
  const input = useRef(null);
  const { state, setState } = useDragNumber(input, 0, min, max, speed);

  return (
    <input
      type="number"
      value={state}
      onChange={e => setState(parseInt(e.target.value))}
      min={min}
      max={max}
      ref={input}
      className={classnames({ [className + ""]: className })}
    />
  );
};

export default DragNumberInput;

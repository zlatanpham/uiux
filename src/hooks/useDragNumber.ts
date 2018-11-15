import { useState, useEffect, useCallback } from "react";
import { injectGlobal } from "emotion";

injectGlobal`
  .use-drag-overlay{
    position:fixed;
    z-index:99999;
    top:0;
    left:0;
    right:0;
    bottom:0;
    cursor: ns-resize;
  }
`;

const useDragNumber = (
  node: any,
  init: number,
  min: number,
  max: number,
  speed: number = 200
) => {
  const [state, setState] = useState(init);
  const overlay = document.createElement("div");
  overlay.className = "use-drag-overlay";

  const range: number = max - min;
  const delta: number = speed / range;

  let marker: number;
  let saveState: number;

  const handleMouseDown = useCallback((e: MouseEvent) => {
    marker = e.pageY;
    saveState = parseInt(node.current.value);
    node.current.style.cursor = "ns-resize";
    (document.documentElement || document.body).style.cursor = "ns-resize";
    document.body.appendChild(overlay);
    document.addEventListener("mousemove", handleMouseDrag);
    document.addEventListener("mouseup", handleMouseUp);
  }, []);

  const handleMouseUp = useCallback((e: MouseEvent) => {
    node.current.style.cursor = "default";
    (document.documentElement || document.body).style.cursor = "default";
    document.body.removeChild(overlay);
    document.removeEventListener("mousemove", handleMouseDrag);
    document.removeEventListener("mouseup", handleMouseUp);
  }, []);

  const handleMouseDrag = useCallback((e: MouseEvent) => {
    requestAnimationFrame(() => {
      const change = Math.round((e.pageY - marker) * delta);
      let result = saveState - change;
      if (result < min) {
        result = min;
      } else if (result > max) {
        result = max;
      }

      setState(result);
    });
  }, []);

  useEffect(() => {
    node.current.addEventListener("mousedown", handleMouseDown);

    return () => {
      node.current.removeEventListener("mousedown", handleMouseDown);
      (document.documentElement || document.body).style.cursor = "default";
      if (document.body.contains(overlay)) {
        document.body.removeChild(overlay);
      }
      document.removeEventListener("mousemove", handleMouseDrag);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return { state, setState };
};

export default useDragNumber;

import { useState, useCallback } from "react";

const useOpenClose = (
  init: boolean = false
): { isOpen: boolean; toggle: Function; open: Function; close: Function } => {
  const [isOpen, set] = useState(init);

  return {
    isOpen,
    toggle: useCallback(() => {
      set(prev => !prev);
    }, []),
    open: useCallback(() => {
      set(true);
    }, []),
    close: useCallback(() => {
      set(true);
    }, [])
  };
};

export default useOpenClose;

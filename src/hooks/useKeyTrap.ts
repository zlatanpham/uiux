import { useState, useEffect } from 'react';

// TODO: handle cmd key press not remove code from stack
const useKeyTrap = () => {
  const [stack, setStack] = useState([] as string[]);

  const handleKeyDown = (e: KeyboardEvent) => {
    setStack(
      prevState =>
        prevState.indexOf(e.code) === -1 ? [...prevState, e.code] : prevState,
    );
  };

  const handleKeyUp = (e: KeyboardEvent) => {
    setStack(prevState => {
      return prevState.indexOf(e.code) !== -1
        ? prevState.filter(code => code !== e.code)
        : prevState;
    });
  };

  // Empty the stack if page is not visible (like switching tabs)
  const handleVisibilityChange = () => {
    if (document.hidden) {
      setStack([]);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    document.addEventListener(
      'visibilitychange',
      handleVisibilityChange,
      false,
    );

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
      document.removeEventListener(
        'visibilitychange',
        handleVisibilityChange,
        false,
      );
    };
  }, []);

  return stack;
};

export default useKeyTrap;

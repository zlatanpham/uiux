import { useState, useEffect } from 'react';

const useKeyTrap = () => {
  const [stack, setStack] = useState([] as string[]);

  const handleKeyDown = (e: KeyboardEvent) => {
    e.preventDefault();
    setStack(
      prevState =>
        prevState.indexOf(e.code) === -1 ? [...prevState, e.code] : prevState,
    );
  };

  const handleKeyUp = (e: KeyboardEvent) => {
    e.preventDefault();
    setStack(prevState => {
      return prevState.indexOf(e.code) !== -1
        ? prevState.filter(code => code !== e.code)
        : prevState;
    });
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return stack;
};

export default useKeyTrap;

import { useState, useCallback } from 'react';

interface Kin {
  imageSrc: string;
  title: string;
}

export const useSpinAnimation = (kins: Kin[]) => {
  const [animatedKins, setAnimatedKins] = useState<boolean[]>(
    () => new Array(kins.length).fill(false)
  );

  const handleHover = useCallback((index: number) => {
    setAnimatedKins((prev) =>
      prev.map((val, i) => (i === index ? true : val))
    );
  }, []);

  const handleAnimationEnd = useCallback((index: number) => {
    setAnimatedKins((prev) =>
      prev.map((val, i) => (i === index ? false : val))
    );
  }, []);

  return {
    animatedKins,
    handleHover,
    handleAnimationEnd,
  };
};

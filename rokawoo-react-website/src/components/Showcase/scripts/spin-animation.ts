import { useState, useCallback } from 'react';

interface Icon {
  imageSrc: string;
  title: string;
}

export const useSpinAnimation = (icons: Icon[]) => {
  const [animatedIcons, setAnimatedIcons] = useState<boolean[]>(
    () => new Array(icons.length).fill(false)
  );

  const handleHover = useCallback((index: number) => {
    setAnimatedIcons((prev) =>
      prev.map((val, i) => (i === index ? true : val))
    );
  }, []);

  const handleAnimationEnd = useCallback((index: number) => {
    setAnimatedIcons((prev) =>
      prev.map((val, i) => (i === index ? false : val))
    );
  }, []);

  return {
    animatedIcons,
    handleHover,
    handleAnimationEnd,
  };
};
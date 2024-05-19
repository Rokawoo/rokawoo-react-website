import { useState, useCallback, useMemo, useEffect } from 'react';

export const useBounceClickAnimation = (audioSrc: string) => {
  const [isAnimated, setIsAnimated] = useState<boolean>(false);

  const audio = useMemo(() => new Audio(audioSrc), [audioSrc]);

  const handleHover = useCallback(() => {
    setIsAnimated(true);
  }, []);

  const handleAnimationEnd = useCallback(() => {
    setIsAnimated(false);
  }, []);

  const handleClick = useCallback(() => {
    const audio = new Audio(audioSrc);
    audio.play();
  }, [audioSrc]);

  useEffect(() => {
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [audio]);

  return {
    isAnimated,
    handleHover,
    handleAnimationEnd,
    handleClick,
  };
};

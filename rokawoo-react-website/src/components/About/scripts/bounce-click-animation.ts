import { useState, useCallback, useEffect } from 'react';

export const useBounceClickAnimation = (audioSrc: string) => {
  const [isAnimated, setIsAnimated] = useState<boolean>(false);
  const [audio] = useState(new Audio(audioSrc));

  const handleHover = useCallback(() => {
    setIsAnimated(true);
  }, []);

  const handleAnimationEnd = useCallback(() => {
    setIsAnimated(false);
  }, []);

  const handleClick = useCallback(() => {
    audio.play();
  }, [audio]);

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

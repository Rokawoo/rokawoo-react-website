import { useState, useCallback } from 'react';

interface Skill {
  imageSrc: string;
  title: string;
}

export const useSpinAnimation = (skills: Skill[]) => {
  const [animatedSkills, setAnimatedSkills] = useState<boolean[]>(
    () => new Array(skills.length).fill(false)
  );

  const handleHover = useCallback((index: number) => {
    setAnimatedSkills((prev) =>
      prev.map((val, i) => (i === index ? true : val))
    );
  }, []);

  const handleAnimationEnd = useCallback((index: number) => {
    setAnimatedSkills((prev) =>
      prev.map((val, i) => (i === index ? false : val))
    );
  }, []);

  return {
    animatedSkills,
    handleHover,
    handleAnimationEnd,
  };
};

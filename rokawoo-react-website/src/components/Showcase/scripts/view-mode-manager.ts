import { useCallback, useEffect, useMemo } from "react";

export type ViewMode = 'experience' | 'kins';

const ANIMATION_DURATION = 250;

const createAnimationController = () => {
  let timeoutId: number | null = null;
  
  const scheduleStateUpdate = (callback: () => void, delay: number): void => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(callback, delay);
  };
  
  const cleanup = (): void => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };
  
  return { scheduleStateUpdate, cleanup };
};

interface ViewModeManagerProps {
  viewMode: ViewMode;
  isTransitioning: boolean;
  setViewMode: (mode: ViewMode) => void;
  setIsTransitioning: (transitioning: boolean) => void;
}

export const useViewModeManager = ({
  viewMode,
  isTransitioning,
  setViewMode,
  setIsTransitioning
}: ViewModeManagerProps) => {
  const animationController = useMemo(() => createAnimationController(), []);

  useEffect(() => {
    return () => animationController.cleanup();
  }, [animationController]);

  const toggleViewMode = useCallback(() => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    
    const newMode: ViewMode = viewMode === 'experience' ? 'kins' : 'experience';
    
    setViewMode(newMode);
    
    animationController.scheduleStateUpdate(() => {
      setIsTransitioning(false);
    }, ANIMATION_DURATION);
  }, [isTransitioning, viewMode, animationController, setViewMode, setIsTransitioning]);

  return { toggleViewMode };
};
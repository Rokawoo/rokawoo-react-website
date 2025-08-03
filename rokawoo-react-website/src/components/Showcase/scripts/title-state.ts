import { ViewMode } from "./view-mode-manager";

export type TitlePartState = 'active' | 'inactive' | 'separator';

export const createTitleStateManager = (viewMode: ViewMode) => {
  const getTitlePartState = (part: 'experience' | 'kins' | 'separator'): TitlePartState => {
    if (part === 'separator') return 'separator';
    return viewMode === part ? 'active' : 'inactive';
  };

  return { getTitlePartState };
};
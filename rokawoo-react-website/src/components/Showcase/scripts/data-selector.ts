import { ViewMode } from "./view-mode-manager";

export interface Icon {
  imageSrc: string;
  title: string;
}

export interface Block {
  imageSrc: string;
  name: string;
  origin: string;
  attributes: string[];
}

interface DataSources {
  techstack: Icon[];
  kins: Icon[];
  experience: Block[];
  favorite: Block[];
}

export const useDataSelector = (viewMode: ViewMode, dataSources: DataSources) => {
  const icons: Icon[] = viewMode === 'experience' ? dataSources.techstack : dataSources.kins;
  const blocks: Block[] = viewMode === 'experience' ? dataSources.experience : dataSources.favorite;

  return { icons, blocks };
};
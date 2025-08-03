import { useState, useMemo } from "react";
import styles from "./Showcase.module.css";

import kins from "../../data/kins.json";
import techstack from "../../data/techstack.json";
import favorite from "../../data/favorite.json";
import experience from "../../data/experience.json";

import { getAssetUrl } from "../../utils";
import { useSpinAnimation } from "./scripts/spin-animation";
import { ViewMode, useViewModeManager } from "./scripts/view-mode-manager";
import { useDataSelector } from "./scripts/data-selector";
import { createTitleStateManager } from "./scripts/title-state";

export const Showcase = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('experience');
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const { icons, blocks } = useDataSelector(viewMode, {
    techstack,
    kins,
    experience,
    favorite
  });
  
  const { animatedIcons, handleHover, handleAnimationEnd } = useSpinAnimation(icons);
  
  const { toggleViewMode } = useViewModeManager({
    viewMode,
    isTransitioning,
    setViewMode,
    setIsTransitioning
  });

  const { getTitlePartState } = useMemo(() => 
    createTitleStateManager(viewMode), 
    [viewMode]
  );

  return (
    <div className={styles.backgroundColor}>
      <div className={`${styles.wave} ${styles.primary}`}></div>

      <section className={styles.container} id="showcase">
        <h2 className={styles.title} onClick={toggleViewMode}>
          <span 
            className={`${styles.titleContent} ${isTransitioning ? styles.transitioning : ''}`}
          >
            <span 
              className={styles.titlePart}
              data-state={getTitlePartState('experience')}
            >
              Experience
            </span>
            <span 
              className={styles.titlePart}
              data-state={getTitlePartState('separator')}
            >
              {' '}/{' '}
            </span>
            <span 
              className={styles.titlePart}
              data-state={getTitlePartState('kins')}
            >
              Kins
            </span>
          </span>
        </h2>
        
        <div className={styles.content}>
          <div className={`${styles.icons} ${isTransitioning ? styles.transitioning : ''}`}>
            {icons.map((icon, id) => (
              <div
                key={`${viewMode}-icon-${id}`}
                className={styles.icon}
                onMouseEnter={() => handleHover(id)}
                onAnimationEnd={() => handleAnimationEnd(id)}
              >
                <div className={styles.iconImgContainer}>
                  <img
                    src={getAssetUrl(icon.imageSrc)}
                    alt={icon.title}
                    className={animatedIcons[id] ? styles.animated : ""}
                    draggable="false"
                  />
                </div>
                <p>{icon.title}</p>
              </div>
            ))}
          </div>
          
          <ul className={`${styles.blocks} ${isTransitioning ? styles.transitioning : ''}`}>
            {blocks.map((block, id) => (
              <li key={`${viewMode}-block-${id}`} className={styles.block}>
                <img
                  src={getAssetUrl(block.imageSrc)}
                  alt={`${block.name} Logo`}
                  draggable="false"
                />
                <div className={styles.blockContent}>
                  <h3>{block.name}</h3>
                  <p>{block.origin}</p>
                  <ul>
                    {block.attributes.map((attribute, attrId) => (
                      <li key={attrId}>{attribute}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};
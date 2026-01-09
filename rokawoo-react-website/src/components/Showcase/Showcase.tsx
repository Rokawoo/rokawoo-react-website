import { useState, useMemo, useCallback, useEffect, useRef, memo } from "react";
import styles from "./Showcase.module.css";

import kins from "../../data/kins.json";
import techstack from "../../data/techstack.json";
import favorite from "../../data/favorite.json";
import experience from "../../data/experience.json";

import { getAssetUrl } from "../../utils";

type ViewMode = "experience" | "kins";

interface Icon {
  imageSrc: string;
  title: string;
}

interface Block {
  imageSrc: string;
  name: string;
  origin: string;
  attributes: string[];
}

const ANIMATION_DURATION = 250;

const DATA = {
  icons: { experience: techstack as Icon[], kins: kins as Icon[] },
  blocks: { experience: experience as Block[], kins: favorite as Block[] },
} as const;

// Memoized icon component - receives index for stable handler references
const IconItem = memo(function IconItem({
  icon,
  index,
  isAnimated,
  onHover,
  onAnimationEnd,
}: {
  icon: Icon;
  index: number;
  isAnimated: boolean;
  onHover: (i: number) => void;
  onAnimationEnd: (i: number) => void;
}) {
  const handleMouseEnter = useCallback(() => onHover(index), [onHover, index]);
  const handleAnimEnd = useCallback(() => onAnimationEnd(index), [onAnimationEnd, index]);

  return (
    <div
      className={styles.icon}
      onMouseEnter={handleMouseEnter}
      onAnimationEnd={handleAnimEnd}
    >
      <div className={styles.iconImgContainer}>
        <img
          src={getAssetUrl(icon.imageSrc)}
          alt={icon.title}
          className={isAnimated ? styles.animated : undefined}
          draggable={false}
          loading="lazy"
        />
      </div>
      <p>{icon.title}</p>
    </div>
  );
});

// Memoized block component to prevent unnecessary re-renders
const BlockItem = memo(function BlockItem({ block }: { block: Block }) {
  return (
    <li className={styles.block}>
      <img
        src={getAssetUrl(block.imageSrc)}
        alt={`${block.name} Logo`}
        draggable={false}
        loading="lazy"
      />
      <div className={styles.blockContent}>
        <h3>{block.name}</h3>
        <p>{block.origin}</p>
        <ul>
          {block.attributes.map((attr, i) => (
            <li key={i}>{attr}</li>
          ))}
        </ul>
      </div>
    </li>
  );
});

export const Showcase = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("experience");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [animatedIcons, setAnimatedIcons] = useState<Record<number, boolean>>({});
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const icons = DATA.icons[viewMode];
  const blocks = DATA.blocks[viewMode];

  // Cleanup timeout on unmount
  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  // Reset animation state when view mode changes
  useEffect(() => {
    setAnimatedIcons({});
  }, [viewMode]);

  const toggleViewMode = useCallback(() => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setViewMode((m) => (m === "experience" ? "kins" : "experience"));

    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setIsTransitioning(false), ANIMATION_DURATION);
  }, [isTransitioning]);

  const handleHover = useCallback((i: number) => {
    setAnimatedIcons((prev) => (prev[i] ? prev : { ...prev, [i]: true }));
  }, []);

  const handleAnimationEnd = useCallback((i: number) => {
    setAnimatedIcons((prev) => {
      if (!prev[i]) return prev;
      const next = { ...prev };
      delete next[i];
      return next;
    });
  }, []);

  // Memoized title state getter
  const getTitleState = useMemo(
    () => (part: "experience" | "kins" | "separator") =>
      part === "separator" ? "separator" : viewMode === part ? "active" : "inactive",
    [viewMode]
  );

  const transitionClass = isTransitioning ? styles.transitioning : "";

  return (
    <div className={styles.backgroundColor}>
      <div className={`${styles.wave} ${styles.primary}`}></div>

      <section className={styles.container} id="showcase">
        <h2 className={`${styles.title} clickable`} onClick={toggleViewMode}>
          <span className={`${styles.titleContent} ${transitionClass}`}>
            <span className={styles.titlePart} data-state={getTitleState("experience")}>
              Experience
            </span>
            <span className={styles.titlePart} data-state={getTitleState("separator")}>
              {" "}/{" "}
            </span>
            <span className={styles.titlePart} data-state={getTitleState("kins")}>
              Kins
            </span>
          </span>
        </h2>

        <div className={styles.content}>
          <div className={`${styles.icons} ${transitionClass}`}>
            {icons.map((icon, i) => (
              <IconItem
                key={`${viewMode}-${i}`}
                icon={icon}
                index={i}
                isAnimated={!!animatedIcons[i]}
                onHover={handleHover}
                onAnimationEnd={handleAnimationEnd}
              />
            ))}
          </div>

          <ul className={`${styles.blocks} ${transitionClass}`}>
            {blocks.map((block, i) => (
              <BlockItem key={`${viewMode}-${i}`} block={block} />
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};
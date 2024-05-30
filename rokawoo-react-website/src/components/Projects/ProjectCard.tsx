import React from "react";
import { animated } from "@react-spring/web";

import styles from "./ProjectCard.module.css";

import { getAssetUrl } from "../../utils";
import { trans, use3DSpring } from "./scripts/card-3d-effect";

interface Project {
  title: string;
  videoSrc: string;
  description: string;
  skills: string[];
  demo?: string | null;
  source: string;
}

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project: { title, videoSrc, description, skills, demo, source },
}) => {
  const { props, handleMouseMove, handleMouseLeave } = use3DSpring();

  return (
    <animated.div
      className={styles.container}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: props.xys.to(trans) }}
    >
      <video
        src={getAssetUrl(videoSrc)}
        className={styles.vid}
        draggable="false"
        autoPlay
        loop
        muted
        playsInline
      />
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      <ul className={styles.skills}>
        {skills.map((skill, id) => (
          <li key={id} className={styles.skill}>
            {skill}
          </li>
        ))}
      </ul>
      <div className={styles.links}>
        {demo && (
          <a href={demo} className={styles.link}>
            Demo
          </a>
        )}
        <a href={source} className={styles.link}>
          Source
        </a>
      </div>
    </animated.div>
  );
};

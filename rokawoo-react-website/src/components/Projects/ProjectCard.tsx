import React from "react";

import styles from "./ProjectCard.module.css";
import { getImageUrl } from "../../utils";

interface Project {
  title: string;
  imageSrc: string;
  description: string;
  skills: string[];
  demo?: string;
  source: string;
}
 
interface ProjectCardProps {
  project: Project;
}
 
export const ProjectCard: React.FC<ProjectCardProps> = ({
  project: { title, imageSrc, description, skills, demo, source },
}) => {
  return (
    <div className={styles.container}>
      <img
        src={getImageUrl(imageSrc)}
        alt={`Image of ${title}`}
        className={styles.img}
        draggable="false"
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
    </div>
  );
};

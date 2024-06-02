import styles from "./Projects.module.css";

import projects from "../../data/projects.json";

import { ProjectCard } from "./ProjectCard";


export const Projects = () => {
  return (
    <div className={styles.backgroundColor}>
      <div className={`${styles.wave} ${styles.secondary}`}></div>

      <section className={styles.container} id="projects">
        <h2 className={styles.title}>Projects</h2>
        <div className={styles.projects}>
          {projects.map((project, id) => {
            return <ProjectCard key={id} project={project} />;
          })}
        </div>
      </section>
    </div>
  );
};
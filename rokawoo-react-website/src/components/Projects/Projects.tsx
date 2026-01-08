import { useEffect, useRef } from "react";

import styles from "./Projects.module.css";
import projects from "../../data/projects.json";
import { ProjectCard } from "./ProjectCard";

const OBSERVER_OPTIONS: IntersectionObserverInit = {
  threshold: 0,
  rootMargin: "500px 0px",
};

export const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const videos = section.querySelectorAll<HTMLVideoElement>("video[data-src]");
    if (!videos.length) return;

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        
        const video = entry.target as HTMLVideoElement;
        const src = video.dataset.src;
        if (src && !video.src) {
          video.src = src;
          observer.unobserve(video);
          delete video.dataset.src;
        }
      }
    }, OBSERVER_OPTIONS);

    videos.forEach((v) => observer.observe(v));
    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.backgroundColor}>
      <div className={`${styles.wave} ${styles.secondary}`} />

      <section className={styles.container} id="projects" ref={sectionRef}>
        <h2 className={styles.title}>Projects</h2>
        <div className={styles.projects}>
          {projects.map((project, i) => (
            <ProjectCard key={i} project={project} />
          ))}
        </div>
      </section>
    </div>
  );
};
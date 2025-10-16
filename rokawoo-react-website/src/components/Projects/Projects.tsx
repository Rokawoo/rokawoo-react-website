import { useEffect, useRef } from "react";
import styles from "./Projects.module.css";

import projects from "../../data/projects.json";

import { ProjectCard } from "./ProjectCard";


export const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const videos = section.querySelectorAll('video[data-src]');
    if (videos.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const video = entry.target as HTMLVideoElement;
            const src = video.dataset.src;
            
            if (src && !video.src) {
              video.src = src;
              observer.unobserve(video);
              delete video.dataset.src;
            }
          }
        });
      },
      {
        threshold: 0,
        rootMargin: "500px 0px",
      }
    );

    videos.forEach(video => observer.observe(video));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className={styles.backgroundColor}>
      <div className={`${styles.wave} ${styles.secondary}`}></div>

      <section className={styles.container} id="projects" ref={sectionRef}>
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
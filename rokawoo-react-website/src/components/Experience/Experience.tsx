import styles from "./Experience.module.css";

import skills from "../../data/skills.json";
import history from "../../data/history.json";

import { getAssetUrl } from "../../utils";
import { useSpinAnimation } from "./scripts/spin-animation";


export const Experience = () => {
  const { animatedSkills, handleHover, handleAnimationEnd } = useSpinAnimation(skills);

  return (
    <div className={styles.backgroundColor}>
      <div className={`${styles.wave} ${styles.primary}`}></div>

      <section className={styles.container} id="experience">
        <h2 className={styles.title}>Experience</h2>
        <div className={styles.content}>
          <div className={styles.skills}>
            {skills.map((skill, id) => {
              return (
                <div
                  key={id}
                  className={styles.skill}
                  onMouseEnter={() => handleHover(id)}
                  onAnimationEnd={() => handleAnimationEnd(id)}
                >
                  <div className={styles.skillImgContainer}>
                  <img
                      src={getAssetUrl(skill.imageSrc)}
                      alt={skill.title}
                      className={animatedSkills[id] ? styles.animated : ""}
                      draggable="false"
                  />
                  </div>
                  <p>{skill.title}</p>
                </div>
              );
            })}
          </div>
          <ul className={styles.history}>
            {history.map((historyItem, id) => {
              return (
                <li key={id} className={styles.historyItem}>
                  <img
                    src={getAssetUrl(historyItem.imageSrc)}
                    alt={`${historyItem.organisation} Logo`}
                    draggable="false"
                  />
                  <div className={styles.historyItemDetails}>
                    <h3>{`${historyItem.role}, ${historyItem.organisation}`}</h3>
                    <p>{`${historyItem.startDate} — ${historyItem.endDate}`}</p>
                    <ul>
                      {historyItem.experiences.map((experience, id) => {
                        return <li key={id}>{experience}</li>;
                      })}
                    </ul>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </div>
  );
};
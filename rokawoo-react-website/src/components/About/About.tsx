import React from "react";

import styles from "./About.module.css"
import { getImageUrl } from "../../utils";

export const About = () => {
  return (
    <section className={styles.container} id="about">
      <h2 className={styles.title}>About Me</h2>
      <div className={styles.content}>
        <img 
        src={getImageUrl("about/aboutImage.png")}
        alt="rokawoo-mascot-about-me"
        className={styles.aboutImg}
        draggable="false"
        />
        <ul className={styles.aboutItems}>
          <li className={styles.aboutItem}>
            <img src={getImageUrl("about/cursorIcon.png")} alt="cursor-icon" draggable="false"/>
            <div className={styles.aboutItemText}>
              <h3>Frontend Dev</h3>
              <p>I am a Dev!</p>
            </div>
          </li>
          <li className={styles.aboutItem}>
            <img src={getImageUrl("about/serverIcon.png")} alt="server-icon" draggable="false"/>
            <div className={styles.aboutItemText}>
              <h3>Backend Dev</h3>
              <p>I am a Dev!</p>
            </div>
          </li>
          <li className={styles.aboutItem}>
            <img src={getImageUrl("about/uiIcon.png")} alt="ui-icon" draggable="false"/>
            <div className={styles.aboutItemText}>
              <h3>Ui Dev</h3>
              <p>I am a Dev!</p>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
};
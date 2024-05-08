import React from "react";

import styles from "./About.module.css"
import { getImageUrl } from "../../utils";

export const About = () => {
  return (
    <section className={styles.container} id="about">
      <h2 className={styles.title}>About</h2>
      <div className={styles.content}>
        <img 
        src={getImageUrl("about/aboutImage.png")}
        alt="rokawoo-mascot-about"
        />
        <ul className={styles.aboutItems}>
          <li className={styles.aboutItem}>
            <img src={getImageUrl("about/cursorIcon.png")} alt="cursor-icon"/>
            <div className={styles.aboutItemText}>
              <h3>Frontend Dev</h3>
              <p>I am a Dev!</p>
            </div>
          </li>
          <li className={styles.aboutItem}>
            <img src={getImageUrl("about/serverIcon.png")} alt="server-icon"/>
            <div className={styles.aboutItemText}>
              <h3>Backend Dev</h3>
              <p>I am a Dev!</p>
            </div>
          </li>
          <li className={styles.aboutItem}>
            <img src={getImageUrl("about/uiIcon.png")} alt="ui-icon"/>
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
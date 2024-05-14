import React from "react";

import styles from "./About.module.css"
import { getImageUrl } from "../../utils";

export const About = () => {
  return (
    <div className={styles.backgroundColor}>
      <div className={`${styles.wave} ${styles.secondary}`}></div>

      <section className={styles.container} id="about">
        <h2 className={styles.title}>About</h2>
        <div className={styles.content}>
          <img 
          src={getImageUrl("about/aboutImage.webp")}
          alt="rokawoo-mascot-about-me"
          className={styles.aboutImg}
          draggable="false"
          />
          <ul className={styles.aboutItems}>
            <li className={styles.aboutItem}>
              <img src={getImageUrl("about/cursorIcon.webp")} alt="cursor-icon" draggable="false"/>
              <div className={styles.aboutItemText}>
                <h3>Intro</h3>
                <p>Placeholder</p>
              </div>
            </li>
            <li className={styles.aboutItem}>
              <img src={getImageUrl("about/serverIcon.webp")} alt="server-icon" draggable="false"/>
              <div className={styles.aboutItemText}>
                <h3>Likes</h3>
                <p>Placeholder waewae  aweawe<br />Placeholder</p>
              </div>
            </li>
            <li className={styles.aboutItem}>
              <img src={getImageUrl("about/uiIcon.webp")} alt="ui-icon" draggable="false"/>
              <div className={styles.aboutItemText}>
                <h3>Dislikes</h3>
                <p>Placeholder</p>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};
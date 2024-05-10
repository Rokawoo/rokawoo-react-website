import React from "react";

import styles from "./Hero.module.css";
import { getImageUrl } from "../../utils";

export const Hero = () => {
  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Hello, I'm Rokawoo</h1>
        <p className={styles.description}>
          ⚠ CAUTION: This person is super cool!
        </p>
        <a href="#contact" className={styles.contactBtn}>
          Contact Me
        </a>
      </div>
      <img
        src={getImageUrl("hero/heroImage.png")}
        alt="rokawoo-mascot-hero"
        className={styles.heroImg}
        draggable="false"
      />
      <div className={styles.topBlur} />
      <div className={styles.bottomBlur} />
    </section>
  );
};
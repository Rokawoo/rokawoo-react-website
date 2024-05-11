import React from "react";

import styles from "./Hero.module.css";
import { getImageUrl } from "../../utils";

export const Hero = () => {
  return (
    <>
    <div className={styles.backgroundColor}>
      <div className={`${styles.wave} ${styles.primary}`}></div>

      <section className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>Hello, I'm Rokawoo</h1>
          <p className={styles.description}>
          Welcome to my Rokaspace!
          This site serves the purpose of letting me express the things that I love as well as learn more about web coding. I hope you will enjoy it as much as I do.
          </p>
          {/*
          <a href="#contact" className={styles.contactBtn}>
            Contact Me
          </a>
          */}
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
    </div>
    </>
  );
};
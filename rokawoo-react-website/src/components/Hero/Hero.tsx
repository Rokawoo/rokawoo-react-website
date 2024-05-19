import React from "react";

import Typewriter from "./scripts/Typewriter";
import styles from "./Hero.module.css";
import { getAssetUrl } from "../../utils";

export const Hero = () => {
  return (
    <>
      <div className={styles.backgroundColor}>
        <div className={`${styles.wave} ${styles.primary}`}></div>

        <section className={styles.container}>
          <div className={styles.content}>
            <h1 className={styles.title}>Hello, I'm RΩKΔ</h1>
            <p className={styles.description}>
              <Typewriter />
            </p>
          </div>
          <img
            src={getAssetUrl("hero/heroImage.webp")}
            alt="rokawoo-mascot-hero"
            className={styles.heroImg}
            draggable="false"
          />
        </section>
      </div>
    </>
  );
};

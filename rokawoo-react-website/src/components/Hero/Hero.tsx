import styles from "./Hero.module.css";

import Typewriter from "./scripts/Typewriter";

import { getAssetUrl } from "../../utils";


export const Hero = () => {
  return (
    <>
      <div className={styles.backgroundColor}>
        <div className={`${styles.wave} ${styles.primary}`}></div>

        <section className={styles.container}>
          <div className={styles.content}>
            <h1 className={styles.title}>Hello, I'm RΩKΔ</h1>
            <div className={styles.description}>
              <Typewriter />
            </div>
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

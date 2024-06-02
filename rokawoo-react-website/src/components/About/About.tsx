import React from "react";

import styles from "./About.module.css";

import { getAssetUrl } from "../../utils";
import { useBounceClickAnimation } from "./scripts/bounce-click-animation";


export const About = () => {
  const audioSrc = getAssetUrl("about/awoo.mp3");
  const {
    isAnimated,
    handleHover,
    handleAnimationEnd,
    handleClick
  } = useBounceClickAnimation(audioSrc);

  return (
    <div className={styles.backgroundColor}>
      <div className={`${styles.wave} ${styles.secondary}`}></div>

      <section className={styles.container} id="about">
        <h2 className={styles.title}>About</h2>
        <div className={styles.content}>
          <img 
            src={getAssetUrl("about/aboutImage.webp")}
            alt="rokawoo-mascot-about-me"
            className={`${styles.aboutImg} ${isAnimated ? styles.animated : ""}`}
            onMouseEnter={handleHover}
            onAnimationEnd={handleAnimationEnd}
            onClick={handleClick}
            draggable="false"
          />
          <ul className={styles.aboutItems}>
            <li className={styles.aboutItem}>
              <img src={getAssetUrl("about/c.webp")} alt="c-icon" draggable="false"/>
              <div className={styles.aboutItemText}>
                <h3>Hiya!</h3>
                <p>I'm Roka; Honors Computer Science Student @ Drexel University.<br />My interestes mainly revolve AI, but web-dev is just so much fun.</p>
              </div>
            </li>
            <li className={styles.aboutItem}>
              <img src={getAssetUrl("about/m.webp")} alt="m-icon" draggable="false"/>
              <div className={styles.aboutItemText}>
                <h3>Likes</h3>
                <p>Anime: Evangelion, SE Lain, Elfen Lied, Japari, FLCL, Soul Eater…<br />Games: Omori, OneShot, VR Chat, Sky: CTOL, Minecraft, Leauge…</p>
              </div>
            </li>
            <li className={styles.aboutItem}>
              <img src={getAssetUrl("about/y.webp")} alt="y-icon" draggable="false"/>
              <div className={styles.aboutItemText}>
                <h3>Hobbies</h3>
                <p>Coding, Drawing, Gaming, Anime, Sillymaxxing, Arts and Crafts.<br />If you want to be friends, I'd love to be! ^^</p>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};
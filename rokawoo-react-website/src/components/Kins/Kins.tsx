import React from "react";

import styles from "./Kins.module.css";

import kins from "../../data/kins.json";
import favorite from "../../data/favorite.json";

import { getAssetUrl } from "../../utils";
import { useSpinAnimation } from "./scripts/spin-animation";


export const Kins = () => {
  const { animatedKins, handleHover, handleAnimationEnd } = useSpinAnimation(kins);

  return (
    <div className={styles.backgroundColor}>
      <div className={`${styles.wave} ${styles.primary}`}></div>

      <section className={styles.container} id="kins">
        <h2 className={styles.title}>Kins</h2>
        <div className={styles.content}>
          <div className={styles.kins}>
            {kins.map((kin, id) => {
              return (
                <div
                  key={id}
                  className={styles.kin}
                  onMouseEnter={() => handleHover(id)}
                  onAnimationEnd={() => handleAnimationEnd(id)}
                >
                  <div className={styles.kinImgContainer}>
                  <img
                      src={getAssetUrl(kin.imageSrc)}
                      alt={kin.title}
                      className={animatedKins[id] ? styles.animated : ""}
                      draggable="false"
                  />
                  </div>
                  <p>{kin.title}</p>
                </div>
              );
            })}
          </div>
          <ul className={styles.favorite}>
            {favorite.map((favoriteItem, id) => {
              return (
                <li key={id} className={styles.favoriteItem}>
                  <img
                    src={getAssetUrl(favoriteItem.imageSrc)}
                    alt={`${favoriteItem.name} Logo`}
                    draggable="false"
                  />
                  <div className={styles.favoriteItemDetails}>
                    <h3>{`${favoriteItem.name}`}</h3>
                    <p>{`${favoriteItem.origin}`}</p>
                    <ul>
                      {favoriteItem.attributes.map((attribute, id) => {
                        return <li key={id}>{attribute}</li>;
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
import React, { useState } from "react";

import styles from "./Navbar.module.css";
import { getImageUrl } from "../../utils";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className={styles.backgroundColor}>
      <nav className={styles.navbar}>
        <a className={styles.title} href="/">
          Welcome to Rokaspace
        </a>
        <div className={styles.menu}>
          <img
            className={styles.menuBtn}
            src={
              menuOpen
                ? getImageUrl("nav/closeIcon.png")
                : getImageUrl("nav/menuIcon.png")
            }
            alt="menu-button"
            draggable="false"
            onClick={() => setMenuOpen(!menuOpen)}
          />
          <ul
            className={`${styles.menuItems} ${menuOpen && styles.menuOpen}`}
            onClick={() => setMenuOpen(false)}
          >
            <li className={styles.menuItem}>
              <a href="#about">[About]</a>
            </li>
            <li className={styles.menuItem}>
              <a href="#experience">[Experience]</a>
            </li>
            <li className={styles.menuItem}>
              <a href="#projects">[Projects]</a>
            </li>
            <li className={styles.menuItem}>
              <a href="#contact">[Contact]</a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};
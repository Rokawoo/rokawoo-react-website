import React from "react";
import styles from "./Navbar.module.css"

export const Navbar = () => {
    return (
    <nav className={styles.navbar}>
        <a className={styles.title} href="/">
            Portfolio
            </a>
        <div className={styles.menu}>
            <ul className={styles.menuItems}>
                <li>
                    <a href="#about">[About]</a>
                </li>
                <li>
                    <a href="#experiance">[Experiance]</a>
                </li>
                <li>
                    <a href="#projects">[Projects]</a>
                </li>
                <li>
                    <a href="#resume">[Resume]</a>
                </li>
            </ul>
        </div>
    </nav>
    )
};
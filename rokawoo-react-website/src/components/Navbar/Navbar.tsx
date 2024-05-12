import React, { useState, useEffect, useRef } from "react";
import TextScramble from "./scripts/text-scramble.ts";

import styles from "./Navbar.module.css";
import { getImageUrl } from "../../utils";

export const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const titleRef = useRef<HTMLAnchorElement>(null);
    let textScramble: TextScramble | null = null;

    useEffect(() => {
        if (titleRef.current) {
            textScramble = new TextScramble(titleRef.current as HTMLElement, [
              'Wεlcοmε Tο Μγ Rοκαspacε <3',
              'Hοmε Ιs Α Hουsε Wιth Α Hεαrτ',
              'Ι\'m Jυsτ Sο Hαppγ Tο Sεε Υου'
            ]);
        }

        return () => {
            if (textScramble) {
                textScramble.setText(titleRef.current?.textContent || "Welcome to Rokaspace");
            }
        };
    }, []);

    return (
        <div className={styles.backgroundColor}>
            <nav className={styles.navbar}>
                <a ref={titleRef} className={styles.title} href="/">
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

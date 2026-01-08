import { useState, useEffect, useRef, useCallback } from "react";
import styles from "./Navbar.module.css";
import TextScramble from "./scripts/text-scramble.ts";
import { getAssetUrl } from "../../utils";
import { greetAgent } from "./scripts/greet-agent.ts";

const MENU_ITEMS = [
    { href: "#about", label: "[ About ]" },
    { href: "#showcase", label: "[ Experience ]" },
    { href: "#projects", label: "[ Projects ]" },
    { href: "#contact", label: "[ Contact ]" },
] as const;

const SCRAMBLE_STRINGS = [
    "Hοmε Ιs Α Hουsε Wιth Α Hεαrτ",
    "Wεlcοmε Tο Μγ Rοκαspacε <3",
    "Ι'm Jυsτ Sο Hαppγ Tο Sεε Υου",
] as const;

const MENU_ICON = getAssetUrl("nav/menuIcon.webp");
const CLOSE_ICON = getAssetUrl("nav/closeIcon.webp");

export const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [browserImage, setBrowserImage] = useState<string | null>(null);
    const titleRef = useRef<HTMLAnchorElement>(null);

    useEffect(() => {
        const el = titleRef.current;
        if (!el) return;

        const textScramble = new TextScramble(el, SCRAMBLE_STRINGS as unknown as string[]);
        const [title, image] = greetAgent();

        textScramble.start(title);
        setBrowserImage(image);

        return () => textScramble.stop();
    }, []);

    const toggleMenu = useCallback(() => setMenuOpen(prev => !prev), []);
    const closeMenu = useCallback(() => setMenuOpen(false), []);

    return (
        <div className={styles.backgroundColor}>
            <nav className={styles.navbar}>
                {browserImage && (
                    <img
                        className={styles.browserImg}
                        src={browserImage}
                        alt="browser-icon"
                        draggable={false}
                        loading="lazy"
                    />
                )}
                <a ref={titleRef} className={styles.title} href="/">
                    Loading...
                </a>
                <div className={styles.menu}>
                    <img
                        className={styles.menuBtn}
                        src={menuOpen ? CLOSE_ICON : MENU_ICON}
                        alt="menu-button"
                        draggable={false}
                        onClick={toggleMenu}
                    />
                    <ul
                        className={menuOpen ? `${styles.menuItems} ${styles.menuOpen}` : styles.menuItems}
                        onClick={closeMenu}
                    >
                        {MENU_ITEMS.map(({ href, label }) => (
                            <li key={href} className={styles.menuItem}>
                                <a href={href}>{label}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>
        </div>
    );
};
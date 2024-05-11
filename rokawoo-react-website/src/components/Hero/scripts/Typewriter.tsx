import React, { useEffect, useState } from "react";

import styles from "./code-typewriter.module.css";

interface Props {
  text: string;
}

const Typewriter: React.FC<Props> = ({ text }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const typeSpeed = 100;

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayText((prevText) => prevText + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      } else {
        clearInterval(interval);
      }
    }, typeSpeed);

    return () => clearInterval(interval);
  }, [currentIndex, text]);

  return (
    <pre id="typewriter" className={styles.typewriter}>
      {displayText.split("").map((char, index) => (
        <span
          key={index}
          className={
            char === "'" || char === '"' || char === ";"
              ? styles.stringHighlight
              : char === "v" || char === "a" || char === "r"
              ? styles.varHighlight
              : ""
          }
        >
          {char}
        </span>
      ))}
      <span className={styles.cursor}>|</span>
    </pre>
  );
};

export default Typewriter;

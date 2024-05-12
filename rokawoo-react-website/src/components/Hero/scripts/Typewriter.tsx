import React, { useEffect, useState } from "react";
import styles from "./code-typewriter.module.css";

const Typewriter: React.FC = () => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const typeSpeed = 100;

  const text = `var object = {
    name: 'Roka',
    age: '19',
    location: 'Philadelphia, PA',
    properties:['he', 'they', 'UTC-04:00']
};`;

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

  const isVarHighlighted = (index: number) => 
    index >= 0 && index <= 2;
  const isKeyHighlighted = (index: number) => 
    (index >= 19 && index <= 22) ||
    (index >= 36 && index <= 39) ||
    (index >= 52 && index <= 59) ||
    (index >= 86 && index <= 95)  
  const isStringHighlighted = (index: number) =>
    (index >= 25 && index <= 30) ||
    (index >= 42 && index <= 45) ||
    (index >= 62 && index <= 79) ||
    (index >= 98 && index <= 101) ||
    (index >= 104 && index <= 109) ||
    (index >= 112 && index <= 122) ;
    ;
;

  return (
    <pre id="typewriter" className={styles.typewriter}>
      {displayText.split("").map((char, index) => (
        <span
          key={index}
          className={
            isVarHighlighted(index)
              ? styles.varHighlight
              :isKeyHighlighted(index)
              ? styles.keyHighlight
              : isStringHighlighted(index)
              ? styles.stringHighlight
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

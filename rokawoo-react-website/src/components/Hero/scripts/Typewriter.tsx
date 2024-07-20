import React, { useEffect, useState, useMemo } from "react";
import styles from "./code-typewriter.module.css";

const Typewriter: React.FC = () => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const typeSpeed = 100;

  const text = `var object = {
    name: 'Roka',
    age: '20',
    location: 'Philadelphia, PA',
    properties: ['he', 'they', 'UTC-04:00']
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

  const highlightRanges = useMemo(() => ({
    var: new Set([0, 1, 2]),
    key: new Map([[19, 22], [36, 39], [52, 59], [86, 95]]),
    string: new Map([[25, 30], [42, 45], [62, 79], [99, 102], [105, 110], [113, 123]])
  }), []);

  const getHighlightClass = useMemo(() => {
    const { var: varHighlights, key: keyHighlights, string: stringHighlights } = highlightRanges;
    return (index: number) => {
      if (varHighlights.has(index)) return styles.varHighlight;
      for (const [start, end] of keyHighlights.entries()) {
        if (index >= start && index <= end) return styles.keyHighlight;
      }
      for (const [start, end] of stringHighlights.entries()) {
        if (index >= start && index <= end) return styles.stringHighlight;
      }
      return "";
    };
  }, [highlightRanges]);

  return (
    <pre id="typewriter" className={styles.typewriter}>
      {displayText.split("").map((char, index) => (
        <span key={index} className={getHighlightClass(index)}>
          {char}
        </span>
      ))}
      <span className={styles.cursor}>|</span>
    </pre>
  );
};

export default Typewriter;

import React, { useEffect, useState, useMemo } from "react";
import styles from "./code-typewriter.module.css";

interface CharacterData {
  char: string;
  highlightClass: string;
}

const Typewriter: React.FC = () => {
  const [visibleCount, setVisibleCount] = useState(0);
  const typeSpeed = 100;

  const text = `var object = {
    name: 'Roka',
    age: '21',
    location: 'Philadelphia, PA',
    properties: ['he', 'they', 'UTC-04:00']
};`;

  const characters: CharacterData[] = useMemo(() => {
    const highlightRanges = {
      var: new Set([0, 1, 2]),
      key: new Map([[19, 22], [36, 39], [52, 59], [86, 95]]),
      string: new Map([[25, 30], [42, 45], [62, 79], [99, 102], [105, 110], [113, 123]])
    };

    const getHighlightClass = (index: number): string => {
      const { var: varHighlights, key: keyHighlights, string: stringHighlights } = highlightRanges;
      
      if (varHighlights.has(index)) return styles.varHighlight;
      
      for (const [start, end] of keyHighlights.entries()) {
        if (index >= start && index <= end) return styles.keyHighlight;
      }
      
      for (const [start, end] of stringHighlights.entries()) {
        if (index >= start && index <= end) return styles.stringHighlight;
      }
      
      return "";
    };

    return text.split("").map((char, index) => ({
      char,
      highlightClass: getHighlightClass(index)
    }));
  }, [text]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (visibleCount < characters.length) {
        setVisibleCount((prevCount) => prevCount + 1);
      } else {
        clearInterval(interval);
      }
    }, typeSpeed);

    return () => clearInterval(interval);
  }, [visibleCount, characters.length, typeSpeed]);

  return (
    <pre id="typewriter" className={styles.typewriter}>
      {characters.slice(0, visibleCount).map((charData, index) => (
        <span key={index} className={charData.highlightClass}>
          {charData.char}
        </span>
      ))}
      <span className={styles.cursor}>|</span>
    </pre>
  );
};

export default Typewriter;
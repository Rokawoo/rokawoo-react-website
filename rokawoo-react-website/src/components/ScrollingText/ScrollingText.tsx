import { useRef, useEffect, useState, useMemo, useId } from 'react';
import styles from './ScrollingText.module.css';

interface ScrollingTextProps {
  marqueeText?: string;
  speed?: number;
  className?: string;
  direction?: 'left' | 'right';
  color?: 'primary' | 'secondary';
}

const BASE_WIDTH = 1440;

const BASE_POINTS = [
  { x: -100, y: -20 },
  { cx: 30,   cy: -20, x: 95,   y: -20 },
  { cx: 160,  cy: -23, x: 265,  y: -23 },
  { cx: 370,  cy: -13,  x: 455,  y: -10.1 },
  { cx: 540,  cy: -10,  x: 620,  y: -14 },
  { cx: 660,  cy: -16, x: 700,  y: -20 },
  { cx: 800,  cy: -29, x: 850,  y: -32 },
  { cx: 875,  cy: -33, x: 900,  y: -34 },
  { cx: 925,  cy: -35, x: 950,  y: -34 },
  { cx: 1040, cy: -31, x: 1090, y: -28 },
  { cx: 1160, cy: -25, x: 1230, y: 0 },
  { cx: 1335, cy: 0,   x: 1385, y: 0 },
  { cx: 1460, cy: 0,   x: 1540, y: 0 },
];

const ScrollingText = ({
  marqueeText = 'Placeholder',
  speed = 2,
  className = '',
  direction = 'left',
  color = 'primary',
}: ScrollingTextProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<SVGTextElement>(null);
  const textPathRef = useRef<SVGTextPathElement>(null);
  const dirRef = useRef<'left' | 'right'>(direction);
  const animationRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const offsetRef = useRef<number>(0);

  const [spacing, setSpacing] = useState(0);
  const [containerWidth, setContainerWidth] = useState(BASE_WIDTH);

  const uid = useId();
  const pathId = `curve-${uid}`;

  const text = useMemo(() => {
    const trimmed = marqueeText.replace(/\s+$/, '');
    return trimmed + '\u00A0';
  }, [marqueeText]);

  const scale = useMemo(() => containerWidth / BASE_WIDTH, [containerWidth]);

  const pathD = useMemo(() => {
    const scaleX = (x: number) => Math.round(x * scale * 10) / 10;
    const scaleY = (y: number) => Math.round(y * 10) / 10;

    let d = `M${scaleX(BASE_POINTS[0].x)},${scaleY(BASE_POINTS[0].y)}`;
    for (let i = 1; i < BASE_POINTS.length; i++) {
      const p = BASE_POINTS[i];
      d += ` Q${scaleX(p.cx!)},${scaleY(p.cy!)} ${scaleX(p.x)},${scaleY(p.y)}`;
    }
    return d;
  }, [scale]);

  const viewBox = useMemo(
    () => `${-100 * scale} -100 ${containerWidth + 200 * scale} 120`,
    [containerWidth, scale]
  );

  const repetitions = spacing > 0 ? Math.ceil(2000 / spacing) + 3 : 1;
  const totalText = useMemo(() => text.repeat(repetitions), [text, repetitions]);
  const ready = spacing > 0;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let resizeTimeout: number;

    const observer = new ResizeObserver((entries) => {
      if (resizeTimeout) cancelAnimationFrame(resizeTimeout);
      resizeTimeout = requestAnimationFrame(() => {
        const width = entries[0]?.contentRect.width;
        if (width) {
          setContainerWidth((prev) => (Math.abs(prev - width) > 5 ? width : prev));
        }
      });
    });

    observer.observe(container);
    setContainerWidth(container.offsetWidth);

    return () => {
      if (resizeTimeout) cancelAnimationFrame(resizeTimeout);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const measure = () => {
      if (measureRef.current) {
        setSpacing(measureRef.current.getComputedTextLength());
      }
    };
    measure();
    const timer = setTimeout(measure, 50);
    document.fonts?.ready.then(measure);
    return () => clearTimeout(timer);
  }, [text]);

  useEffect(() => {
    if (!spacing || !textPathRef.current) return;
    textPathRef.current.setAttribute('startOffset', '0px');
    offsetRef.current = 0;
  }, [spacing]);

  useEffect(() => {
    if (!spacing || !ready) return;

    const step = (currentTime: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = currentTime;

      const deltaTime = Math.min(currentTime - lastTimeRef.current, 32);
      lastTimeRef.current = currentTime;

      if (textPathRef.current) {
        const delta = (dirRef.current === 'right' ? speed : -speed) * (deltaTime / 16);
        let newOffset = offsetRef.current + delta;

        if (newOffset <= -spacing) newOffset += spacing;
        if (newOffset >= spacing) newOffset -= spacing;

        offsetRef.current = newOffset;
        textPathRef.current.setAttribute('startOffset', newOffset + 'px');
      }

      animationRef.current = requestAnimationFrame(step);
    };

    animationRef.current = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animationRef.current);
      lastTimeRef.current = 0;
    };
  }, [spacing, speed, ready]);

  return (
    <div
      ref={containerRef}
      className={`${styles.container} ${className}`}
      style={{ visibility: ready ? 'visible' : 'hidden' }}
      onMouseDown={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
    >
      <svg
        className={styles.svg}
        viewBox={viewBox}
        preserveAspectRatio="xMidYMid slice"
        style={{ overflow: 'visible', pointerEvents: 'none' }}
      >
        <text
          ref={measureRef}
          xmlSpace="preserve"
          className={`${styles.text} ${styles[color]}`}
          style={{ visibility: 'hidden', opacity: 0, pointerEvents: 'none' }}
        >
          {text}
        </text>

        <defs>
          <path id={pathId} d={pathD} fill="none" />
        </defs>

        {ready && (
          <text xmlSpace="preserve" className={`${styles.text} ${styles[color]}`}>
            <textPath
              ref={textPathRef}
              href={`#${pathId}`}
              startOffset="0px"
              xmlSpace="preserve"
            >
              {totalText}
            </textPath>
          </text>
        )}
      </svg>
    </div>
  );
};

export default ScrollingText;
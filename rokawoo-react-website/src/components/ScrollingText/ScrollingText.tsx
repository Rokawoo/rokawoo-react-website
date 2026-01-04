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

// Quadratic bezier control points (hand-tuned)
const BASE_POINTS = [
  { x: -100, y: -20 },
  { cx: 30,   cy: -20,   x: 95,   y: -20 },
  { cx: 160,  cy: -23,   x: 265,  y: -23 },
  { cx: 370,  cy: -13,   x: 455,  y: -11 },
  { cx: 540,  cy: -10,   x: 620,  y: -14 },
  { cx: 660,  cy: -16,   x: 700,  y: -20 },
  { cx: 800,  cy: -29,   x: 850,  y: -32 },
  { cx: 875,  cy: -33,   x: 900,  y: -34 },
  { cx: 925,  cy: -35,   x: 950,  y: -34 },
  { cx: 1040, cy: -31,   x: 1090, y: -28 },
  { cx: 1160, cy: -25,   x: 1230, y: 0 },
  { cx: 1335, cy: 0,     x: 1385, y: 0 },
  { cx: 1460, cy: 0,     x: 1540, y: 0 },
];

const buildPath = (scale: number): string => {
  const sx = (x: number) => Math.round(x * scale * 10) / 10;
  const sy = (y: number) => Math.round(y * 10) / 10;

  let d = `M${sx(BASE_POINTS[0].x)},${sy(BASE_POINTS[0].y)}`;
  for (let i = 1; i < BASE_POINTS.length; i++) {
    const p = BASE_POINTS[i];
    d += ` Q${sx(p.cx!)},${sy(p.cy!)} ${sx(p.x)},${sy(p.y)}`;
  }
  return d;
};

const preventDefault = (e: React.MouseEvent | React.DragEvent) => e.preventDefault();

const ScrollingText = ({
  marqueeText = 'Placeholder',
  speed = 2,
  className = '',
  direction = 'left',
  color = 'primary',
}: ScrollingTextProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<SVGTextElement>(null);
  const [spacing, setSpacing] = useState(0);
  const [width, setWidth] = useState(BASE_WIDTH);
  const [ready, setReady] = useState(false);

  const pathId = `curve-${useId()}`;
  const text = useMemo(() => marqueeText.replace(/\s+$/, '') + '\u00A0', [marqueeText]);
  const scale = width / BASE_WIDTH;
  const pathD = useMemo(() => buildPath(scale), [scale]);
  const reps = spacing > 0 ? Math.ceil(2000 / spacing) + 3 : 1;
  const totalText = useMemo(() => text.repeat(reps), [text, reps]);

  const visible = ready && spacing > 0;
  const textClass = `${styles.text} ${styles[color]}`;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let w = el.offsetWidth;
    setWidth(w);

    const obs = new ResizeObserver(entries => {
      const nw = entries[0]?.contentRect.width;
      if (nw && Math.abs(w - nw) > 5) setWidth(w = nw);
    });

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const measure = () => {
      const len = measureRef.current?.getComputedTextLength();
      if (len) setSpacing(len);
    };

    measure();
    const timer = setTimeout(measure, 50);

    if (document.fonts?.ready) {
      document.fonts.ready.then(() => { measure(); setReady(true); });
    } else {
      setTimeout(() => { measure(); setReady(true); }, 100);
    }

    return () => clearTimeout(timer);
  }, [text]);

  return (
    <div
      ref={containerRef}
      className={`${styles.container} ${className}`}
      style={{ visibility: visible ? 'visible' : 'hidden' }}
      onMouseDown={preventDefault}
      onDragStart={preventDefault}
    >
      <svg
        className={styles.svg}
        viewBox={`${-100 * scale} -100 ${width + 200 * scale} 120`}
        preserveAspectRatio="xMidYMid slice"
        style={{ overflow: 'visible', pointerEvents: 'none' }}
      >
        <text
          ref={measureRef}
          xmlSpace="preserve"
          className={textClass}
          style={{ visibility: 'hidden', opacity: 0, pointerEvents: 'none' }}
        >
          {text}
        </text>

        <defs>
          <path id={pathId} d={pathD} fill="none" />
        </defs>

        {visible && (
          <text xmlSpace="preserve" className={textClass}>
            <textPath href={`#${pathId}`}>
              {totalText}
              <animate
                attributeName="startOffset"
                from={direction === 'left' ? 0 : -spacing}
                to={direction === 'left' ? -spacing : 0}
                dur={`${spacing / (speed * 62.5)}s`}
                repeatCount="indefinite"
              />
            </textPath>
          </text>
        )}
      </svg>
    </div>
  );
};

export default ScrollingText;
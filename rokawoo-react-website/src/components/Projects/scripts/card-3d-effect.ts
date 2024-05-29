import { useSpring, SpringConfig } from "react-spring";
import { useCallback } from "react";

const BUFFER = 50;
const PERSPECTIVE = 500;
const ROTATE_X_FACTOR = 0.25;
const ROTATE_Y_FACTOR = 0.5;
const SCALE_FACTOR = 1.01;

export const trans = (x: number, y: number, s: number): string =>
  `perspective(${PERSPECTIVE}px) rotateX(${x * ROTATE_X_FACTOR}deg) rotateY(${y * ROTATE_Y_FACTOR}deg) scale(${s})`;

export const calc = (
  x: number,
  y: number,
  rect: DOMRect
): [number, number, number] => [
  -(y - (rect.top + rect.height / 2)) / BUFFER,
  (x - (rect.left + rect.width / 2)) / BUFFER,
  SCALE_FACTOR
];

export const use3DSpring = () => {
  const [props, set] = useSpring(() => ({
    xys: [0, 0, 1],
    config: { mass: 5, tension: 350, friction: 40 } as SpringConfig,
  }));

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const { clientX: x, clientY: y } = e;
    set({ xys: calc(x, y, rect) });
  }, [set]);

  const handleMouseLeave = useCallback(() => {
    set({ xys: [0, 0, 1] });
  }, [set]);

  return { props, handleMouseMove, handleMouseLeave };
};

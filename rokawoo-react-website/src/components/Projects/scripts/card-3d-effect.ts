import { useSpring, SpringConfig } from "react-spring";
import { useCallback } from "react";

const BUFFER = 50;

export const trans = (x: number, y: number, s: number): string =>
  `perspective(500px) rotateX(${x / 3}deg) rotateY(${y / 3}deg) scale(${s})`;

export const calc = (
  x: number,
  y: number,
  rect: DOMRect
): [number, number, number] => {
  const yMovement = -(y - (rect.top + rect.height / 2)) / BUFFER;
  const xMovement = (x - (rect.left + rect.width / 2)) / BUFFER;
  return [yMovement, xMovement, 1.003];
};

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

import { useSpring } from "@react-spring/web";
import { useCallback } from "react";

import { isTouchDevice } from "../../../utils";

const IS_TOUCH = isTouchDevice();

const BUFFER = 50;
const PERSPECTIVE = 500;
const ROTATE_X_FACTOR = 0.25;
const ROTATE_Y_FACTOR = 0.5;
const SCALE = 1.01;

const SPRING_CONFIG = { mass: 5, tension: 350, friction: 40 };
const INITIAL_XYS: [number, number, number] = [0, 0, 1];

export const trans = (x: number, y: number, s: number): string =>
  `perspective(${PERSPECTIVE}px) rotateX(${x * ROTATE_X_FACTOR}deg) rotateY(${y * ROTATE_Y_FACTOR}deg) scale(${s})`;

export const calc = (x: number, y: number, rect: DOMRect): [number, number, number] => [
  -(y - (rect.top + rect.height / 2)) / BUFFER,
  (x - (rect.left + rect.width / 2)) / BUFFER,
  SCALE,
];

export const use3DSpring = () => {
  const [props, api] = useSpring(() => ({ xys: INITIAL_XYS, config: SPRING_CONFIG }));

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (IS_TOUCH) return;
    api.start({ xys: calc(e.clientX, e.clientY, e.currentTarget.getBoundingClientRect()) });
  }, [api]);

  const handleMouseLeave = useCallback(() => {
    if (IS_TOUCH) return;
    api.start({ xys: INITIAL_XYS });
  }, [api]);

  return { props, handleMouseMove, handleMouseLeave };
};
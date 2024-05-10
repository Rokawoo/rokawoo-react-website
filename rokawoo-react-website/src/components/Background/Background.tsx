import React from 'react';
import './Background.module.css';
import '../../vars.css';

const SvgBackground: React.FC = () => (
  <svg viewBox="0 0 500 200">
    <path 
      d="M 0 50 C 150 150 300 0 500 80 L 500 0 L 0 0"
      fill={`var(--color-secondary)`}
      opacity="1"
    />
    <path 
      d="M 0 50 C 150 150 330 -30 500 50 L 500 0 L 0 0"
      fill={`var(--color-primary)`}
      opacity="0.8"
    />
    <path
      d="M 0 50 C 215 150 250 0 500 100 L 500 0 L 0 0"
      fill={`var(--color-primary)`}
      opacity="0.5"
    />
  </svg>
);

const Background: React.FC = () => (
  <div className="container">
    <SvgBackground />
  </div>
);

export default Background;

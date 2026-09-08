/**
 * SkillIcons — Outline icons matching the Skills section reference.
 * Purpose: Same icon language as the design screenshot (code, server, cloud, brain, robot, shield-lock, phone, tools).
 * Used by: src/data/skills.jsx.
 */

const svgProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: '1.7',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
};

export function IconCode(props) {
  return (
    <svg {...svgProps} {...props}>
      <path d="M8.5 7.5 3.5 12l5 4.5" />
      <path d="M15.5 7.5 20.5 12l-5 4.5" />
    </svg>
  );
}

export function IconServer(props) {
  return (
    <svg {...svgProps} {...props}>
      <rect x="4" y="3.5" width="16" height="5" rx="1.4" />
      <rect x="4" y="9.5" width="16" height="5" rx="1.4" />
      <rect x="4" y="15.5" width="16" height="5" rx="1.4" />
      <circle cx="7.2" cy="6" r="0.7" fill="currentColor" stroke="none" />
      <circle cx="7.2" cy="12" r="0.7" fill="currentColor" stroke="none" />
      <circle cx="7.2" cy="18" r="0.7" fill="currentColor" stroke="none" />
      <path d="M10.5 6h6.5M10.5 12h6.5M10.5 18h6.5" />
    </svg>
  );
}

export function IconCloud(props) {
  return (
    <svg {...svgProps} {...props}>
      <path d="M7.5 17.5h9.2a3.8 3.8 0 0 0 .4-7.58 5.2 5.2 0 0 0-10.05-1.1A3.7 3.7 0 0 0 7.5 17.5Z" />
    </svg>
  );
}

export function IconBrain(props) {
  return (
    <svg {...svgProps} {...props}>
      <path d="M9.2 5.4A3.4 3.4 0 0 0 5.1 9.3c0 .9.3 1.6.8 2.2-.6.6-1 1.4-1 2.4a3.4 3.4 0 0 0 3.6 3.4c.7.8 1.7 1.4 3.5 1.4s2.8-.6 3.5-1.4a3.4 3.4 0 0 0 3.6-3.4c0-1-.4-1.8-1-2.4.5-.6.8-1.3.8-2.2a3.4 3.4 0 0 0-4.1-3.9C13.3 4.7 12.6 4.4 12 4.4s-1.3.3-1.8.7c-.3-.2-.6-.3-1-.3Z" />
      <path d="M12 5v13.2" />
      <path d="M7.4 9.4h2.6M7.6 12.1h2.6M7.8 14.7h2.4" />
      <path d="M14 9.6h2.6M13.8 12.2h2.8" />
      <circle cx="7.2" cy="9.4" r="0.65" fill="currentColor" stroke="none" />
      <circle cx="16.8" cy="12.2" r="0.65" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconRobot(props) {
  return (
    <svg {...svgProps} {...props}>
      <path d="M12 3.5v2.2" />
      <circle cx="12" cy="2.8" r="0.85" />
      <rect x="5.2" y="5.8" width="13.6" height="12.4" rx="3.2" />
      <circle cx="9.1" cy="11.2" r="1.15" />
      <circle cx="14.9" cy="11.2" r="1.15" />
      <path d="M9.4 15.2h5.2" />
      <path d="M5.2 10.4H3.6M20.4 10.4h-1.6" />
    </svg>
  );
}

export function IconShieldLock(props) {
  return (
    <svg {...svgProps} {...props}>
      <path d="M12 3.2 19.2 6v5.3c0 4.2-2.9 7.1-7.2 8.5-4.3-1.4-7.2-4.3-7.2-8.5V6L12 3.2Z" />
      <rect x="9.4" y="11.1" width="5.2" height="4.1" rx="1" />
      <path d="M10.5 11.1V9.8a1.5 1.5 0 0 1 3 0v1.3" />
    </svg>
  );
}

export function IconPhone(props) {
  return (
    <svg {...svgProps} {...props}>
      <rect x="7.2" y="2.8" width="9.6" height="18.4" rx="2.2" />
      <path d="M10.4 4.6h3.2" />
      <circle cx="12" cy="18.6" r="0.75" />
    </svg>
  );
}

export function IconTools(props) {
  return (
    <svg {...svgProps} {...props}>
      <path d="M14.8 4.2a3.4 3.4 0 0 0-4.3 4.3L5.2 14l2.1 2.1 5.4-5.3a3.4 3.4 0 0 0 4.3-4.3l-2.1 2.1-1.5-1.5 2.1-2.1Z" />
      <path d="M8.2 16.4 5.8 19a1.3 1.3 0 0 0 1.8 1.8l2.4-2.4" />
      <path d="m13.2 10.8 5.5 5.5a1.6 1.6 0 0 1 0 2.3l-.6.6" />
    </svg>
  );
}

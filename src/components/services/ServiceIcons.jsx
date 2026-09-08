/**
 * ServiceIcons — Outline icons for the Services section cards.
 * Purpose: Match the reference (code/monitor, server, database, brain, robot, cloud, shield, folder, chart, headset).
 * Used by: src/data/services.jsx.
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

export function IconCodeMonitor(props) {
  return (
    <svg {...svgProps} {...props}>
      <rect x="3.2" y="4.2" width="17.6" height="12.4" rx="2" />
      <path d="M8.4 20.2h7.2M12 16.6v3.6" />
      <path d="M9 8.4 6.8 10.6 9 12.8" />
      <path d="M15 8.4 17.2 10.6 15 12.8" />
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

export function IconDatabase(props) {
  return (
    <svg {...svgProps} {...props}>
      <ellipse cx="12" cy="6.2" rx="7.2" ry="2.6" />
      <path d="M4.8 6.2v11.4c0 1.5 3.2 2.7 7.2 2.7s7.2-1.2 7.2-2.7V6.2" />
      <path d="M4.8 11.4c0 1.5 3.2 2.7 7.2 2.7s7.2-1.2 7.2-2.7" />
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

export function IconCloudUpload(props) {
  return (
    <svg {...svgProps} {...props}>
      <path d="M7.5 16.8h9.2a3.8 3.8 0 0 0 .4-7.58 5.2 5.2 0 0 0-10.05-1.1A3.7 3.7 0 0 0 7.5 16.8Z" />
      <path d="M12 14.6V9.8" />
      <path d="M9.7 11.6 12 9.4l2.3 2.2" />
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

export function IconFolder(props) {
  return (
    <svg {...svgProps} {...props}>
      <path d="M3.6 7.2V17a2 2 0 0 0 2 2h12.8a2 2 0 0 0 2-2V9.2a2 2 0 0 0-2-2h-6.4l-1.7-2H5.6a2 2 0 0 0-2 2Z" />
    </svg>
  );
}

export function IconChart(props) {
  return (
    <svg {...svgProps} {...props}>
      <path d="M4 19.2h16" />
      <path d="M7 19.2v-5.2M11.2 19.2V9.4M15.4 19.2v-7.4M19 19.2V7.6" />
      <path d="M6.4 11.2 10.8 8l4 2.2 4.6-5" />
    </svg>
  );
}

export function IconHeadset(props) {
  return (
    <svg {...svgProps} {...props}>
      <path d="M4.6 13.2v-1.6A7.4 7.4 0 0 1 12 4.2a7.4 7.4 0 0 1 7.4 7.4v1.6" />
      <rect x="3.2" y="12.2" width="4.2" height="6.2" rx="1.4" />
      <rect x="16.6" y="12.2" width="4.2" height="6.2" rx="1.4" />
      <path d="M20.8 16.4v1.2A3 3 0 0 1 17.8 20.6H12" />
    </svg>
  );
}

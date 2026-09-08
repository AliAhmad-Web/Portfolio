/**
 * ContactFormWave — Bottom-right cyan particle wave inside the form card.
 * Purpose: Match the reference: dense at the corner, curved, fading left/up.
 * Used by: ContactSection.
 */

function buildWaveDots() {
  const dots = [];

  for (let band = 0; band < 12; band += 1) {
    const count = 28 - band;
    for (let i = 0; i < count; i += 1) {
      const t = i / Math.max(count - 1, 1);
      const x = 318 - t * 250 - band * 1.8;
      const lift = Math.sin(t * Math.PI * 1.15) * (22 + band * 1.4);
      const y = 168 - band * 8.2 - lift * (0.35 + t * 0.7);
      const fade = (1 - t * 0.82) * (1 - band / 14);

      if (fade < 0.12 || x < 40 || y < 8) continue;

      dots.push({
        cx: x,
        cy: y,
        r: 0.9 + fade * 0.75,
        opacity: 0.2 + fade * 0.75,
        cyan: band < 6,
      });
    }
  }

  return dots;
}

const WAVE_DOTS = buildWaveDots();

export default function ContactFormWave() {
  return (
    <svg
      className="contact-form-wave"
      viewBox="0 0 320 176"
      preserveAspectRatio="xMaxYMax meet"
      aria-hidden="true"
    >
      {WAVE_DOTS.map((dot, index) => (
        <circle
          key={`${dot.cx}-${dot.cy}-${index}`}
          cx={dot.cx}
          cy={dot.cy}
          r={dot.r}
          fill={dot.cyan ? '#67e8f9' : '#38bdf8'}
          opacity={dot.opacity}
        />
      ))}
    </svg>
  );
}

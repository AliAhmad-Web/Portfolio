import { useEffect, useRef, useState } from 'react';

function parseMetric(value) {
  const raw = String(value ?? '');
  const match = raw.match(/^([\d.,]+)(.*)$/);
  if (!match) return { amount: 0, suffix: raw };
  return {
    amount: Number(match[1].replace(/,/g, '')) || 0,
    suffix: match[2],
  };
}

export default function AnimatedCounter({
  value,
  duration = 1600,
  active = true,
  className = '',
}) {
  const { amount, suffix } = parseMetric(value);
  const [count, setCount] = useState(0);
  const startedRef = useRef(false);
  const countRef = useRef(0);
  const frameRef = useRef(0);

  useEffect(() => {
    if (!active) return undefined;

    const from = startedRef.current ? countRef.current : 0;
    const to = amount;

    if (startedRef.current && from === to) return undefined;

    startedRef.current = true;
    cancelAnimationFrame(frameRef.current);

    if (from === to) {
      countRef.current = to;
      setCount(to);
      return undefined;
    }

    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      const next = Math.round(from + (to - from) * eased);
      countRef.current = next;
      setCount(next);
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      }
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [active, amount, duration]);

  return (
    <span className={className} aria-label={value}>
      {count}
      {suffix}
    </span>
  );
}

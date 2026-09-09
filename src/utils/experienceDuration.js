/**
 * Experience duration helpers.
 * Purpose: Derive years of learning from a real start date as time passes.
 * Used by: GitHub stats, About section.
 */

export function getExperienceYears(startDate, now = new Date()) {
  const start = new Date(startDate);
  if (Number.isNaN(start.getTime()) || start > now) return 0;

  let years = now.getFullYear() - start.getFullYear();
  const monthDelta = now.getMonth() - start.getMonth();
  const dayDelta = now.getDate() - start.getDate();

  if (monthDelta < 0 || (monthDelta === 0 && dayDelta < 0)) {
    years -= 1;
  }

  return Math.max(0, years);
}

export function formatExperienceValue(startDate, now = new Date()) {
  return `${getExperienceYears(startDate, now)}+`;
}

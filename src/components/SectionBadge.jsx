export default function SectionBadge({ icon: Icon, children }) {
  return (
    <span className="about-badge">
      {Icon ? <Icon aria-hidden="true" /> : null}
      {children}
    </span>
  );
}

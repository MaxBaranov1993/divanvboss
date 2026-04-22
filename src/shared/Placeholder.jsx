import './Placeholder.css';

export default function Placeholder({ label, ratio = '4/3', variant = 'default', style }) {
  return (
    <div
      className={`ph ph--${variant}`}
      style={{ aspectRatio: ratio, ...style }}
      aria-label={label}
    >
      <span className="ph__label">{label}</span>
    </div>
  );
}

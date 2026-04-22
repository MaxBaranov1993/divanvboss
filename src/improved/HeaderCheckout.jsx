import { SITE_LOGO } from '../mock/data.js';
import './HeaderCheckout.css';

export default function HeaderCheckout() {
  const goBack = () => {
    if (window.history.length > 1) window.history.back();
  };

  return (
    <header className="ih-co">
      <div className="container ih-co__in">
        <button type="button" className="ih-co__back" onClick={goBack} aria-label="Назад">
          <IcoArrow />
          <span className="ih-co__back-lbl">Назад</span>
        </button>

        <a href="#" className="ih-co__logo" aria-label="Divan BOSS — на главную">
          <img src={SITE_LOGO} alt="Divan BOSS" />
        </a>

        <div className="ih-co__trust">
          <IcoLock />
          <span>Безопасная оплата · SSL</span>
        </div>

        <a href="tel:+74952605522" className="ih-co__phone">
          <span className="ih-co__phone-num">+7 (495) 260-55-22</span>
          <span className="ih-co__phone-hrs">ежедневно 7:00–21:00 МСК</span>
        </a>
      </div>
    </header>
  );
}

function IcoArrow() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function IcoLock() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="5" y="11" width="14" height="9" rx="2" stroke="currentColor" strokeWidth="1.8"/>
      <path d="M8 11V8a4 4 0 1 1 8 0v3" stroke="currentColor" strokeWidth="1.8"/>
      <circle cx="12" cy="15.5" r="1.4" fill="currentColor"/>
    </svg>
  );
}

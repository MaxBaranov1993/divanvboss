import './CheckoutHeader.css';

export default function CheckoutHeader() {
  return (
    <header className="c-cohdr">
      <div className="container c-cohdr__inner">
        <a href="#" className="c-cohdr__back" onClick={(e) => { e.preventDefault(); window.history.back(); }}>
          <span className="c-cohdr__back-icon" aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M9 3L5 7l4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
          Вернуться к покупкам
        </a>

        <a href="#" className="c-cohdr__logo" aria-label="DIVAN BOSS">
          <span className="c-cohdr__logo-box">DIVAN</span>
          <span className="c-cohdr__logo-text">BOSS</span>
        </a>

        <a href="tel:+74952605522" className="c-cohdr__phone">+7 (495) 260-55-22</a>
      </div>
    </header>
  );
}

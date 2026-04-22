import { useEffect, useState } from 'react';
import { categories, SITE_LOGO } from '../mock/data.js';
import './Header.css';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <header className={`c-hdr ${scrolled ? 'is-scrolled' : ''}`}>
      {/* Верхняя тонкая строка */}
      <div className="c-hdr__top">
        <div className="container c-hdr__top-inner">
          <button className="c-hdr__city">
            <span className="c-hdr__pin">📍</span>
            Нижний Новгород
          </button>
          <nav className="c-hdr__topnav">
            <a href="#">Салоны <span className="c-hdr__dot">4</span></a>
            <a href="#">Журнал</a>
            <a href="#">Доставка</a>
            <a href="#">Кредит и рассрочка</a>
            <a href="#">Гарантия</a>
            <a href="#">Статус заказа</a>
          </nav>
          <div className="c-hdr__phone">
            <a href="tel:+74952605522">+7 (495) 260-55-22</a>
            <div className="c-hdr__hours">Ежедневно, с 7:00–21:00 (МСК)</div>
          </div>
        </div>
      </div>

      {/* Средняя строка: логотип / акции / поиск / иконки */}
      <div className="c-hdr__mid">
        <div className="container c-hdr__mid-inner">
          <a href="#" className="c-hdr__logo" aria-label="DIVAN BOSS">
            <img src={SITE_LOGO} alt="Divan BOSS" className="c-hdr__logo-img" />
          </a>

          <a href="#" className="c-hdr__promo">Акции</a>

          <div className="c-hdr__search">
            <input type="text" placeholder="Диван" />
          </div>

          <a href="#" className="c-hdr__icon">
            <span className="c-hdr__icon-svg">♡</span>
            <span className="c-hdr__icon-label">Избранное</span>
          </a>

          <a href="#" className="c-hdr__icon">
            <span className="c-hdr__icon-svg">🛒</span>
            <span className="c-hdr__icon-label">Корзина</span>
          </a>
        </div>
      </div>

      {/* Категорийная строка */}
      <nav className="c-hdr__cats">
        <div className="container c-hdr__cats-inner">
          {categories.map(c => (
            <a key={c.slug} href="#" className="c-hdr__cat">{c.name}</a>
          ))}
        </div>
      </nav>
    </header>
  );
}

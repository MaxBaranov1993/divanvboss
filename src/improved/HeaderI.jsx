import { useEffect, useRef, useState } from 'react';
import { categories, SITE_LOGO } from '../mock/data.js';
import './HeaderI.css';

const CITIES = ['Нижний Новгород', 'Москва', 'Санкт-Петербург', 'Казань', 'Екатеринбург', 'Новосибирск'];

const SUGGESTIONS = [
  'диван угловой', 'диван-кровать', 'прямой диван',
  'кровать с подъёмным механизмом', 'матрас ортопедический',
  'шкаф-купе', 'пуф', 'кресло-качалка',
];

export default function HeaderI() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cityOpen, setCityOpen] = useState(false);
  const [city, setCity] = useState('Нижний Новгород');
  const [q, setQ] = useState('');
  const searchRef = useRef(null);

  useEffect(() => {
    let ticking = false;
    let collapsed = false;
    const COLLAPSE_AT = 50;
    const EXPAND_AT = 8;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        if (!collapsed && y > COLLAPSE_AT) { collapsed = true; setScrolled(true); }
        else if (collapsed && y < EXPAND_AT) { collapsed = false; setScrolled(false); }
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  useEffect(() => {
    if (searchOpen && searchRef.current) searchRef.current.focus();
  }, [searchOpen]);

  const filteredSuggest = q.trim()
    ? SUGGESTIONS.filter(s => s.toLowerCase().includes(q.toLowerCase())).slice(0, 6)
    : SUGGESTIONS.slice(0, 6);

  return (
    <>
      <header className={`ih ${scrolled ? 'is-scrolled' : ''}`}>
        {/* ───────── TOP THIN BAR ───────── */}
        <div className="ih__top">
          <div className="container ih__top-in">
            <button
              className="ih__city"
              onClick={() => setCityOpen(o => !o)}
              aria-expanded={cityOpen}
              aria-label="Выбрать город"
            >
              <IconPin />
              <span>{city}</span>
              <IconChevron />
              {cityOpen && (
                <div className="ih__city-pop" onClick={e => e.stopPropagation()}>
                  {CITIES.map(c => (
                    <button
                      key={c}
                      className={`ih__city-item ${c === city ? 'is-active' : ''}`}
                      onClick={() => { setCity(c); setCityOpen(false); }}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              )}
            </button>

            <nav className="ih__topnav">
              <a href="#">Салоны <span className="ih__dot">4</span></a>
              <a href="#">Доставка</a>
              <a href="#">Рассрочка 0%</a>
              <a href="#">Гарантия 18 мес</a>
              <a href="#">Статус заказа</a>
              <a href="#">Журнал</a>
            </nav>

            <a href="tel:+74952605522" className="ih__phone">
              <span className="ih__phone-num">+7 (495) 260-55-22</span>
              <span className="ih__phone-hrs">ежедневно 7:00–21:00 МСК</span>
            </a>
          </div>
        </div>

        {/* ───────── MAIN ROW ───────── */}
        <div className="ih__mid">
          <div className="container ih__mid-in">
            {/* Бургер (мобайл/таблет) */}
            <button
              className="ih__burger"
              aria-label="Меню"
              onClick={() => setMenuOpen(true)}
            >
              <IconBurger />
            </button>

            {/* Логотип */}
            <a href="#" className="ih__logo" aria-label="Divan BOSS — на главную">
              <img src={SITE_LOGO} alt="Divan BOSS" />
            </a>

            {/* Кнопка «Акции» — фирменный CTA */}
            <a href="#" className="ih__sale-btn" aria-label="Перейти к акциям">
              <span className="ih__sale-ico"><IconFire /></span>
              <span className="ih__sale-txt">
                <span className="ih__sale-top">Акции</span>
                <span className="ih__sale-sub">скидки до&nbsp;−55%</span>
              </span>
              <span className="ih__sale-pulse" aria-hidden></span>
            </a>

            {/* Поиск */}
            <form className="ih__search" role="search" onSubmit={e => e.preventDefault()}>
              <IconSearch className="ih__search-ico" />
              <input
                ref={searchRef}
                type="search"
                placeholder="Искать диван, кровать, матрас…"
                value={q}
                onChange={e => setQ(e.target.value)}
                onFocus={() => setSearchOpen(true)}
                onBlur={() => setTimeout(() => setSearchOpen(false), 150)}
                aria-label="Поиск по сайту"
              />
              {q && (
                <button type="button" className="ih__search-clr" aria-label="Очистить" onClick={() => setQ('')}>
                  <IconX />
                </button>
              )}
              <button type="submit" className="ih__search-btn">Найти</button>

              {searchOpen && (
                <div className="ih__sug">
                  <div className="ih__sug-title">{q ? 'Подсказки' : 'Часто ищут'}</div>
                  {filteredSuggest.length === 0 && (
                    <div className="ih__sug-empty">Ничего не найдено</div>
                  )}
                  {filteredSuggest.map(s => (
                    <a key={s} href="#" className="ih__sug-item">
                      <IconSearch className="ih__sug-ico" />
                      <span>{s}</span>
                    </a>
                  ))}
                </div>
              )}
            </form>

            {/* Действия */}
            <div className="ih__actions">
              <button className="ih__search-mob" aria-label="Поиск" onClick={() => setSearchOpen(o => !o)}>
                <IconSearch />
              </button>

              <a href="#" className="ih__act" aria-label="Профиль">
                <IconUser />
                <span className="ih__act-lbl">Войти</span>
              </a>

              <a href="#" className="ih__act" aria-label="Избранное">
                <span className="ih__act-ico-wrap">
                  <IconHeart />
                  <span className="ih__badge">3</span>
                </span>
                <span className="ih__act-lbl">Избранное</span>
              </a>

              <a href="#" className="ih__act ih__act--cart" aria-label="Корзина">
                <span className="ih__act-ico-wrap">
                  <IconCart />
                  <span className="ih__badge ih__badge--accent">2</span>
                </span>
                <span className="ih__act-lbl">
                  <span className="ih__act-lbl-top">Корзина</span>
                  <span className="ih__act-lbl-sum">84 990 ₽</span>
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* ───────── CATEGORY NAV ───────── */}
        <nav className="ih__cats" aria-label="Категории">
          <div className="container ih__cats-in">
            {categories.map(c => (
              <a
                key={c.slug}
                href="#"
                className={`ih__cat ${c.accent ? 'is-accent' : ''}`}
              >
                {c.name}
              </a>
            ))}
          </div>
        </nav>
      </header>

      {/* ───────── MOBILE DRAWER ───────── */}
      {menuOpen && (
        <div className="ih-drawer" onClick={() => setMenuOpen(false)}>
          <aside className="ih-drawer__panel" onClick={e => e.stopPropagation()}>
            <div className="ih-drawer__head">
              <a href="#" className="ih-drawer__logo" aria-label="Divan BOSS">
                <img src={SITE_LOGO} alt="Divan BOSS" />
              </a>
              <button className="ih-drawer__close" aria-label="Закрыть" onClick={() => setMenuOpen(false)}>
                <IconClose />
              </button>
            </div>

            <a href="tel:+74952605522" className="ih-drawer__phone">
              <IconPhone />
              <span>
                <b>+7 (495) 260-55-22</b>
                <em>7:00–21:00 МСК</em>
              </span>
            </a>

            <div className="ih-drawer__section-t">Каталог</div>
            <div className="ih-drawer__cats">
              {categories.map(c => (
                <a key={c.slug} href="#" className={`ih-drawer__cat ${c.accent ? 'is-accent' : ''}`}>
                  <span>{c.name}</span>
                  <IconChevron />
                </a>
              ))}
            </div>

            <div className="ih-drawer__section-t">Сервисы</div>
            <div className="ih-drawer__links">
              <a href="#">Салоны <span className="ih__dot">4</span></a>
              <a href="#">Доставка</a>
              <a href="#">Рассрочка 0%</a>
              <a href="#">Гарантия 18 мес</a>
              <a href="#">Статус заказа</a>
              <a href="#">Журнал</a>
            </div>

            <div className="ih-drawer__city">
              <IconPin />
              <span>Ваш город: <b>{city}</b></span>
              <button className="ih-drawer__city-change">изменить</button>
            </div>
          </aside>
        </div>
      )}

      {/* ───────── MOBILE BOTTOM TAB BAR ───────── */}
      <nav className="ih-tabs" aria-label="Быстрая навигация">
        <a href="#" className="ih-tabs__item is-active">
          <IconHome /><span>Главная</span>
        </a>
        <button className="ih-tabs__item" onClick={() => setMenuOpen(true)}>
          <IconBurger /><span>Каталог</span>
        </button>
        <a href="#" className="ih-tabs__item">
          <span className="ih-tabs__ico-wrap">
            <IconHeart /><span className="ih__badge">3</span>
          </span>
          <span>Избранное</span>
        </a>
        <a href="#" className="ih-tabs__item">
          <span className="ih-tabs__ico-wrap">
            <IconCart /><span className="ih__badge ih__badge--accent">2</span>
          </span>
          <span>Корзина</span>
        </a>
        <a href="#" className="ih-tabs__item">
          <IconUser /><span>Профиль</span>
        </a>
      </nav>
    </>
  );
}

/* ─────────── icons ─────────── */
function IconPin() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 22s7-7.5 7-13a7 7 0 1 0-14 0c0 5.5 7 13 7 13Z" stroke="currentColor" strokeWidth="1.8"/>
      <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.8"/>
    </svg>
  );
}
function IconChevron() {
  return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden><path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}
function IconSearch({ className }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/>
      <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}
function IconX() { return <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden><path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>; }
function IconClose() { return <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden><path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>; }
function IconBurger() { return <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden><path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>; }
function IconUser() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.8"/>
      <path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  );
}
function IconHeart() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 20s-7-4.5-7-10a4.5 4.5 0 0 1 8-3 4.5 4.5 0 0 1 8 3c0 5.5-7 10-7 10-.5.3-1.5.3-2 0Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
    </svg>
  );
}
function IconCart() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M3 4h2.5l2 13h12l2-9H7" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round"/>
      <circle cx="9" cy="20" r="1.6" fill="currentColor"/>
      <circle cx="18" cy="20" r="1.6" fill="currentColor"/>
    </svg>
  );
}
function IconHome() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M3 11.5 12 4l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1v-8.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
    </svg>
  );
}
function IconFire() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 3s1 2.5 1 4.5c0 1.5-1 2.5-1 2.5s-2-1.5-2-3.5C10 5 12 3 12 3Z" fill="#fff"/>
      <path d="M12 21c4.4 0 7-3 7-6.5 0-2.4-1.4-4.2-2.6-5.4-.5-.5-1.4-.1-1.4.6 0 1.6-1 2.3-1 2.3s-1-1-1-3.5C13 5 11 2.5 9.5 2c-.6-.2-1.2.3-1 .9.4 1.3.5 3-.5 4.4C6.4 9.4 5 11.6 5 14.5 5 18 7.6 21 12 21Z" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round"/>
    </svg>
  );
}
function IconPhone() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M5 4h3l2 5-2 1a11 11 0 0 0 6 6l1-2 5 2v3a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
    </svg>
  );
}

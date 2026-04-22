import { useState } from 'react';
import { SITE_LOGO, trustStats, seoTags, salons } from '../mock/data.js';
import './Footer.css';

const CATALOG_MAIN = [
  { name: 'Диваны',         href: '#' },
  { name: 'Угловые диваны', href: '#' },
  { name: 'Кровати',        href: '#' },
  { name: 'Матрасы',        href: '#' },
  { name: 'Шкафы',          href: '#' },
  { name: 'Стенки',         href: '#' },
  { name: 'Кресла',         href: '#' },
  { name: 'Распродажа',     href: '#', hot: true },
];

const BUYERS = [
  { name: 'Доставка и самовывоз', href: '#' },
  { name: 'Рассрочка 0%',         href: '#' },
  { name: 'Примерка дома',        href: '#' },
  { name: 'Гарантия 18 месяцев',  href: '#' },
  { name: 'Сборка мебели',        href: '#' },
  { name: 'Способы оплаты',       href: '#' },
  { name: 'Статус заказа',        href: '#' },
  { name: 'Частые вопросы',       href: '#' },
];

const COMPANY = [
  { name: 'О фабрике',       href: '#' },
  { name: 'Салоны',          href: '#' },
  { name: 'Контакты',        href: '#' },
  { name: 'Условия продажи', href: '#' },
  { name: 'Декларации',      href: '#' },
  { name: 'Дилерам',         href: '#' },
  { name: 'Поставщикам',     href: '#' },
  { name: 'Вакансии',        href: '#' },
];

const CITIES = [
  'Москва', 'Санкт-Петербург', 'Нижний Новгород', 'Казань',
  'Екатеринбург', 'Новосибирск', 'Самара', 'Ростов-на-Дону',
  'Воронеж', 'Краснодар', 'Уфа', 'Челябинск',
];

const PAYMENTS = ['Visa', 'Mastercard', 'МИР', 'СБП', 'Тинькофф', 'Сбер'];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  function onSubscribe(e) {
    e.preventDefault();
    if (!email.trim()) return;
    setSent(true);
  }

  return (
    <footer className="i-ftr" itemScope itemType="https://schema.org/Organization">
      {/* 1. CTA / подписка */}
      <section className="i-ftr__cta">
        <div className="container i-ftr__cta-inner">
          <div className="i-ftr__cta-left">
            <div className="i-ftr__cta-eyebrow">Только для подписчиков</div>
            <h2 className="i-ftr__cta-title">
              −3 000 ₽ на&nbsp;первый заказ
            </h2>
            <p className="i-ftr__cta-sub">
              Раз в неделю — подборки новинок, скрытые скидки и промокоды.
              Одно письмо, без спама.
            </p>
          </div>

          <form
            className={`i-ftr__form ${sent ? 'is-sent' : ''}`}
            onSubmit={onSubscribe}
            aria-label="Подписка на рассылку"
          >
            {sent ? (
              <div className="i-ftr__form-ok" role="status">
                <span className="i-ftr__form-check" aria-hidden="true">✓</span>
                <div>
                  <b>Готово</b>
                  <small>Промокод отправлен на {email}</small>
                </div>
              </div>
            ) : (
              <>
                <div className="i-ftr__form-row">
                  <input
                    type="email"
                    required
                    placeholder="Ваш email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    aria-label="Email"
                    className="i-ftr__input"
                  />
                  <button type="submit" className="i-ftr__submit">
                    Получить скидку
                  </button>
                </div>
                <div className="i-ftr__agree">
                  Нажимая кнопку, вы соглашаетесь с{' '}
                  <a href="#">политикой обработки данных</a>
                </div>
              </>
            )}
          </form>
        </div>
      </section>

      {/* 2. Trust-полоса */}
      <section className="i-ftr__trust" aria-label="О компании">
        <div className="container i-ftr__trust-inner">
          <TrustItem label="Собственная фабрика" value="с 2009 года" />
          <TrustItem
            label={`Рейтинг ${trustStats.rating}`}
            value={`${trustStats.reviewCount.toLocaleString('ru-RU')} отзывов`}
          />
          <TrustItem label="Доставка" value="80+ городов России" />
          <TrustItem label="Гарантия 18 месяцев" value="возврат 14 дней" />
        </div>
      </section>

      {/* 3. Основная сетка */}
      <section className="i-ftr__main">
        <div className="container i-ftr__grid">
          {/* Бренд + контакты */}
          <div className="i-ftr__brand">
            <a href="#" className="i-ftr__logo" aria-label="Divan BOSS">
              <img src={SITE_LOGO} alt="Divan BOSS" />
            </a>
            <p className="i-ftr__brand-desc" itemProp="description">
              Фабрика мягкой и корпусной мебели. Производим диваны, кровати,
              матрасы и шкафы с&nbsp;2009&nbsp;года.
            </p>

            <div className="i-ftr__contact">
              <a href="tel:+74952605522" className="i-ftr__phone" itemProp="telephone">
                +7 (495) 260-55-22
              </a>
              <div className="i-ftr__phone-sub">
                Ежедневно 9:00–21:00
              </div>
              <button type="button" className="i-ftr__callback">
                Заказать обратный звонок
              </button>
            </div>

            <div className="i-ftr__social" aria-label="Мы в соцсетях">
              <a href="#" className="i-ftr__soc" aria-label="Telegram"><SocIcon name="tg" /></a>
              <a href="#" className="i-ftr__soc" aria-label="ВКонтакте"><SocIcon name="vk" /></a>
              <a href="#" className="i-ftr__soc" aria-label="Одноклассники"><SocIcon name="ok" /></a>
              <a href="#" className="i-ftr__soc" aria-label="WhatsApp"><SocIcon name="wa" /></a>
              <a href="#" className="i-ftr__soc" aria-label="YouTube"><SocIcon name="yt" /></a>
            </div>
          </div>

          {/* Каталог */}
          <nav className="i-ftr__col" aria-labelledby="ftr-catalog">
            <h3 id="ftr-catalog" className="i-ftr__col-title">Каталог</h3>
            <ul className="i-ftr__list">
              {CATALOG_MAIN.map((c) => (
                <li key={c.name}>
                  <a href={c.href} className={`i-ftr__link ${c.hot ? 'is-hot' : ''}`}>
                    {c.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Покупателям */}
          <nav className="i-ftr__col" aria-labelledby="ftr-buyers">
            <h3 id="ftr-buyers" className="i-ftr__col-title">Покупателям</h3>
            <ul className="i-ftr__list">
              {BUYERS.map((b) => (
                <li key={b.name}>
                  <a href={b.href} className="i-ftr__link">{b.name}</a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Компания */}
          <nav className="i-ftr__col" aria-labelledby="ftr-company">
            <h3 id="ftr-company" className="i-ftr__col-title">Компания</h3>
            <ul className="i-ftr__list">
              {COMPANY.map((c) => (
                <li key={c.name}>
                  <a href={c.href} className="i-ftr__link">{c.name}</a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      {/* 4. Салоны */}
      <section className="i-ftr__salons" aria-labelledby="ftr-salons">
        <div className="container">
          <h3 id="ftr-salons" className="i-ftr__salons-title">
            Салоны в Москве
          </h3>
          <div className="i-ftr__salons-grid">
            {salons.map((s, i) => (
              <a
                key={i}
                className="i-ftr__salon"
                href={`https://yandex.ru/maps/?text=${encodeURIComponent(s.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                itemProp="location"
                itemScope
                itemType="https://schema.org/Place"
              >
                <span className="i-ftr__salon-city" itemProp="name">{s.city}</span>
                <span className="i-ftr__salon-addr" itemProp="address">{s.address}</span>
                <span className="i-ftr__salon-hrs">ежедневно {s.hours}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 5. SEO-тэги + города */}
      <section className="i-ftr__seo" aria-label="Популярные запросы">
        <div className="container i-ftr__seo-inner">
          <div className="i-ftr__seo-block">
            <h3 className="i-ftr__seo-title">Популярные запросы</h3>
            <div className="i-ftr__tags">
              {seoTags.slice(0, 12).map((t) => (
                <a key={t.slug} href={`/catalog/${t.slug}`} className="i-ftr__tag">
                  {t.name}
                </a>
              ))}
            </div>
          </div>
          <div className="i-ftr__seo-block">
            <h3 className="i-ftr__seo-title">Доставка по городам</h3>
            <div className="i-ftr__cities">
              {CITIES.map((city) => (
                <a key={city} href="#" className="i-ftr__city">
                  {city}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Нижняя полоса */}
      <section className="i-ftr__bottom">
        <div className="container i-ftr__bottom-inner">
          <div className="i-ftr__copy">
            <span itemProp="legalName">DIVANBOSS.RU</span>
            <span className="i-ftr__copy-sep">·</span>
            <span>© 2016–2026</span>
            <span className="i-ftr__copy-sep">·</span>
            <span className="i-ftr__copy-muted">ИП Беляков Р.В. ОГРНИП 315643200000440</span>
          </div>

          <div className="i-ftr__pay" aria-label="Способы оплаты">
            {PAYMENTS.map((p) => (
              <span key={p} className="i-ftr__pay-item">{p}</span>
            ))}
          </div>

          <div className="i-ftr__policy">
            <a href="#">Политика</a>
            <a href="#">Cookie</a>
            <a href="#">Карта сайта</a>
          </div>
        </div>
      </section>

      {/* scroll-to-top */}
      <button
        type="button"
        className="i-ftr__top"
        aria-label="Наверх"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </button>
    </footer>
  );
}

/* ---------- Helpers ---------- */

function TrustItem({ label, value }) {
  return (
    <div className="i-ftr__trust-item">
      <b>{label}</b>
      <small>{value}</small>
    </div>
  );
}

function SocIcon({ name }) {
  switch (name) {
    case 'tg':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z" />
        </svg>
      );
    case 'vk':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.8 17.33h1.06s.32-.04.49-.22c.15-.17.15-.48.15-.48s-.02-1.43.63-1.64c.64-.2 1.47 1.36 2.35 1.96.67.46 1.17.36 1.17.36l2.36-.03s1.24-.08.65-1.05c-.05-.08-.34-.72-1.76-2.04-1.48-1.38-1.28-1.15.5-3.53 1.09-1.45 1.52-2.33 1.39-2.71-.13-.36-.93-.26-.93-.26l-2.65.02s-.2-.03-.34.06c-.14.08-.23.28-.23.28s-.42 1.12-.97 2.06c-1.18 2-1.65 2.1-1.84 1.98-.44-.28-.33-1.16-.33-1.77 0-1.93.29-2.74-.57-2.95-.28-.07-.49-.12-1.22-.12-.93 0-1.71 0-2.16.22-.3.14-.53.47-.4.49.17.02.55.1.75.38.26.36.25 1.16.25 1.16s.15 2.19-.35 2.46c-.34.19-.81-.2-1.87-2.02-.54-.94-.95-1.97-.95-1.97s-.08-.2-.22-.31c-.17-.13-.4-.17-.4-.17l-2.52.02s-.38.01-.52.17c-.12.15-.01.45-.01.45s1.97 4.61 4.21 6.93c2.05 2.13 4.38 1.99 4.38 1.99z" />
        </svg>
      );
    case 'ok':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2c2.76 0 5 2.24 5 5s-2.24 5-5 5-5-2.24-5-5 2.24-5 5-5zm0 3c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm4.95 9.29c-1.2.87-2.73 1.43-4.37 1.6l2.95 2.95-1.82 1.82-3.71-3.71-3.71 3.71-1.82-1.82 2.95-2.95c-1.64-.17-3.17-.73-4.37-1.6l1.46-1.85c1.25.91 2.89 1.46 4.49 1.46s3.24-.55 4.49-1.46l1.46 1.85z" />
        </svg>
      );
    case 'wa':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21h.05c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm0 18.17h-.03c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31c-.83-1.32-1.27-2.83-1.27-4.4 0-4.54 3.7-8.24 8.26-8.24 2.2 0 4.28.86 5.84 2.42s2.42 3.64 2.42 5.84c-.01 4.54-3.7 8.24-8.23 8.24zm4.52-6.16c-.25-.12-1.47-.72-1.69-.8-.23-.08-.39-.12-.56.12s-.64.8-.78.97c-.14.17-.29.19-.53.06s-1.04-.38-1.98-1.22c-.73-.65-1.22-1.46-1.37-1.7-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.43s-.56-1.35-.77-1.84c-.2-.48-.41-.42-.56-.43-.14-.01-.31-.01-.47-.01-.17 0-.44.06-.67.31s-.88.86-.88 2.1.9 2.44 1.03 2.61c.12.17 1.78 2.72 4.31 3.81.6.26 1.07.41 1.44.53.6.19 1.15.16 1.59.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.14-1.18-.06-.11-.23-.17-.47-.29z" />
        </svg>
      );
    case 'yt':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.5 6.5a3 3 0 0 0-2.1-2.1C19.4 4 12 4 12 4s-7.4 0-9.4.4A3 3 0 0 0 .5 6.5 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.5 3 3 0 0 0 2.1 2.1C4.6 20 12 20 12 20s7.4 0 9.4-.4a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.5zM9.6 15.5v-7l6.3 3.5-6.3 3.5z" />
        </svg>
      );
    default:
      return null;
  }
}

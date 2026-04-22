import { useEffect, useState } from 'react';
import Header from './HeaderI.jsx';
import Footer from './Footer.jsx';
import {
  popularCategories,
  products,
  salons,
  heroBanners,
  formatPrice,
  trustStats,
  homeReviews,
  whyUs,
  homePromo,
  homeFaq,
  seoTags,
} from '../mock/data.js';
import '../current/HomePage.css';
import './HomePage.css';

const CAT_TINTS = {
  sale:    { bg: '#FFE4DC', ink: '#8A2A14' },
  divany:  { bg: '#EEEAE2', ink: '#1F1F1F', tag: 'Хит сезона' },
  krovati: { bg: '#E6EAEF', ink: '#1F1F1F', tag: 'Новинки' },
  matrasy: { bg: '#E7EEE9', ink: '#1F1F1F' },
  stenki:  { bg: '#F0EBE3', ink: '#1F1F1F' },
  shkafy:  { bg: '#EBE8E1', ink: '#1F1F1F' },
  tumby:   { bg: '#E9EDF1', ink: '#1F1F1F' },
  komody:  { bg: '#EFEAE2', ink: '#1F1F1F' },
  pufy:    { bg: '#EDE8E0', ink: '#1F1F1F', tag: '−20%' },
  stulya:  { bg: '#E8ECE6', ink: '#1F1F1F' },
  _default:{ bg: '#F2F2F2', ink: '#1F1F1F' },
};

function pluralModels(n) {
  const mod10 = n % 10, mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return 'модель';
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return 'модели';
  return 'моделей';
}
function pluralReviews(n) {
  const mod10 = n % 10, mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return 'отзыв';
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return 'отзыва';
  return 'отзывов';
}

const REVIEW_SOURCES = [
  { name: 'Яндекс.Карты', rating: 4.9, count: 1832, icon: '🗺' },
  { name: '2ГИС',          rating: 4.8, count: 485,  icon: '📍' },
  { name: 'Отзовик',       rating: 4.7, count: 230,  icon: '💬' },
];

const RATING_BREAKDOWN = [
  { stars: 5, pct: 91, count: 2318 },
  { stars: 4, pct: 8,  count: 204  },
  { stars: 3, pct: 1,  count: 20   },
  { stars: 2, pct: 0,  count: 3    },
  { stars: 1, pct: 0,  count: 2    },
];

const REVIEW_ENRICH = {
  h1: {
    verified: true, helpful: 34,
    productName: 'Диван Босс Тренд шенилл Клауд крем',
    productImage: 'https://divanboss.ru/upload/iblock/9d9/fpp0wa3hi3u5oi9s7za22dxn7z53goaf/Frame-2.jpg',
    productHref: '/improved/product',
  },
  h2: {
    verified: true, helpful: 21,
    productName: 'Модульный угловой Босс Гранд велюр Алькантара',
    productImage: 'https://divanboss.ru/upload/iblock/a49/zndm6gfykm5mpt51754njrj50v9wjz4i/Frame-5822.jpg',
    productHref: '/improved/product',
    response: 'Спасибо за тёплые слова, Андрей! Рады, что примерка дома сработала. Новинки модульных серий уже в салоне — заходите ещё.',
  },
  h3: {
    verified: true, helpful: 47,
    productName: 'Кровать Босс Мини 90×200 с ПМ',
    productImage: 'https://divanboss.ru/upload/iblock/db1/1uf8hch4c67gs485ps7vumtn0839yy7v/Frame-5815.jpg',
    productHref: '/improved/product',
  },
};

const RECOMMEND_PCT = 98;

export default function HomePage() {
  // Title + meta description + JSON-LD (FAQPage + LocalBusiness)
  useEffect(() => {
    const prevTitle = document.title;
    document.title = 'Divan BOSS — диваны от фабрики, доставка по РФ';
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) { meta = document.createElement('meta'); meta.name = 'description'; document.head.appendChild(meta); }
    const prevDesc = meta.getAttribute('content');
    meta.setAttribute(
      'content',
      'Фабрика диванов Divan BOSS: угловые и прямые диваны, кровати, матрасы от производителя. Гарантия 18 мес, рассрочка 0%, доставка по России.'
    );

    const jsonLd = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'FAQPage',
          mainEntity: homeFaq.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
        },
        ...salons.map((s, i) => ({
          '@type': 'FurnitureStore',
          '@id': `https://divanboss.ru/#salon-${i + 1}`,
          name: `Divan BOSS — ${s.address}`,
          address: {
            '@type': 'PostalAddress',
            streetAddress: s.address,
            addressLocality: s.city,
            addressCountry: 'RU',
          },
          openingHours: `Mo-Su ${s.hours.replace('–', '-')}`,
          telephone: '+7-495-260-55-22',
          priceRange: '₽₽',
        })),
      ],
    };

    const script = document.createElement('script');
    script.id = 'i-home-jsonld';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(jsonLd);
    document.head.appendChild(script);

    return () => {
      document.title = prevTitle;
      if (prevDesc !== null) meta.setAttribute('content', prevDesc);
      const s = document.getElementById('i-home-jsonld');
      if (s) s.remove();
    };
  }, []);

  return (
    <>
      <Header />

      <main className="c-home i-home">
        {/* 1. Первый экран: full-width hero → единая карточка (H1 + trust + USP) */}
        <section className="i-section-annot i-home__first">
          <div className="container">
            <div className="i-home__hero-wrap">
              <HeroSlider banners={heroBanners} />
            </div>
            <header className="i-home__intro">
              <div className="i-home__intro-top">
                <div className="i-home__intro-main">
                  <span className="i-home__eyebrow">Фабрика мебели · Нижний Новгород</span>
                  <h1 className="i-home__h1">Мебель от фабрики: диваны, кровати, шкафы с доставкой по России</h1>
                  <p className="i-home__lead">
                    Собственное производство с 2009 года. Гарантия 18 месяцев,
                    рассрочка 0 % до 24 месяцев, примерка дома 7 дней.
                  </p>
                </div>
                <div className="i-home__intro-trust">
                  <MicroTrust stats={trustStats} />
                </div>
              </div>
              <div className="i-home__intro-usp">
                <div className="i-home__usp-item">
                  <span className="i-home__usp-ico" aria-hidden="true">🏭</span>
                  <div><b>Фабрика</b><span>своё производство с 2009 г.</span></div>
                </div>
                <div className="i-home__usp-item">
                  <span className="i-home__usp-ico" aria-hidden="true">🛡</span>
                  <div><b>18 мес гарантии</b><span>на каркас и механизмы</span></div>
                </div>
                <div className="i-home__usp-item">
                  <span className="i-home__usp-ico" aria-hidden="true">💳</span>
                  <div><b>Рассрочка 0 %</b><span>до 24 месяцев без переплат</span></div>
                </div>
                <div className="i-home__usp-item">
                  <span className="i-home__usp-ico" aria-hidden="true">↩</span>
                  <div><b>Возврат 14 дней</b><span>без объяснения причин</span></div>
                </div>
              </div>
            </header>
          </div>
          <Tag>Было: H1 отсутствовал, trust и USP жили разрозненно</Tag>
        </section>

        {/* 2. Хиты продаж — поднято выше категорий: РСЯ-аудитория (40% трафика, CR 0.30%, отказы 41%) уходит с первого экрана, нужен товарный крючок */}
        <section className="i-section-annot c-home__sec i-hits-sec">
          <div className="container">
            <div className="i-home__sec-head i-hits__head">
              <div>
                <h2 className="c-home__h2">Хиты продаж</h2>
                <p className="i-hits__sub">Покупают чаще всего · скидки до −55%</p>
              </div>
              <a href="#" className="i-link-arrow">Все хиты →</a>
            </div>
            <div className="i-hits">
              {products.filter((p) => p.isHit).slice(0, 4).map((p, idx) => (
                <ProductCardHit key={p.id} p={p} priority={idx < 2} />
              ))}
            </div>
          </div>
          <Tag>Перенесено выше категорий: товар + цена удерживают холодный РСЯ-трафик лучше, чем плитки категорий</Tag>
        </section>

        {/* 5. Популярные категории */}
        <section className="i-section-annot c-home__sec" id="catalog">
          <div className="container">
            <div className="i-home__sec-head">
              <h2 className="c-home__h2">Популярные категории</h2>
              <a href="#" className="i-link-arrow">Все категории →</a>
            </div>
            <div className="i-cats">
              {popularCategories.slice(0, 9).map((c, i) => {
                const t = CAT_TINTS[c.slug] || CAT_TINTS._default;
                const count = 120 + i * 23;
                const isAccent = c.slug === 'sale';
                const cls = [
                  'i-cat2',
                  isAccent && 'i-cat2--accent i-cat2--hero',
                ].filter(Boolean).join(' ');
                return (
                  <a
                    key={c.slug}
                    href="#"
                    className={cls}
                    style={{ '--tint': t.bg, '--ink': t.ink }}
                    aria-label={`${c.name}, ${count} ${pluralModels(count)}`}
                  >
                    <div className="i-cat2__text">
                      <div className="i-cat2__name">{c.name}</div>
                      <div className="i-cat2__count">{count} {pluralModels(count)}</div>
                      {isAccent && <span className="i-cat2__chip">до −55%</span>}
                    </div>
                    {t.tag && !isAccent && <span className="i-cat2__tag">{t.tag}</span>}
                    <img
                      className="i-cat2__img"
                      src={c.image}
                      alt=""
                      loading={i < 3 ? 'eager' : 'lazy'}
                    />
                  </a>
                );
              })}
            </div>
          </div>
          <Tag>Мини-редизайн: асимметричная композиция, мягкие тинты, hover-lift, pluralize</Tag>
        </section>

        {/* 6. Промо-баннер + countdown */}
        <section className="i-section-annot c-home__sec i-home__promo-sec">
          <div className="container">
            <PromoBanner promo={homePromo} />
          </div>
          <Tag>Было: не было акции с таймером срочности</Tag>
        </section>

        {/* 8. Почему Divan BOSS — премиум-блок доверия */}
        <section className="i-section-annot c-home__sec i-why2-sec">
          <div className="container">
            <header className="i-why2__head">
              <span className="i-why2__eyebrow">Почему нам доверяют</span>
              <h2 className="i-why2__h2">Производитель, а не магазин</h2>
              <p className="i-why2__sub">
                Мы делаем мебель сами с 2009 года — поэтому отвечаем за качество, сроки и сервис.
              </p>
            </header>
            <div className="i-why2">
              {whyUs.map((w, i) => (
                <article key={i} className="i-why2__item" style={{ '--i': i }}>
                  <div className="i-why2__top">
                    <span className="i-why2__icon" aria-hidden="true">
                      <WhyIcon name={w.iconKey} />
                    </span>
                    <span className="i-why2__eb">{w.eyebrow}</span>
                  </div>
                  <div className="i-why2__metric-row">
                    <span className="i-why2__metric">{w.metric}</span>
                    <span className="i-why2__unit">{w.unit}</span>
                  </div>
                  <h3 className="i-why2__title">{w.title}</h3>
                  <p className="i-why2__text">{w.text}</p>
                </article>
              ))}
            </div>
          </div>
          <Tag>Премиум-редизайн: SVG-иконки, метрика крупным числом, eyebrow, единый стиль с hero</Tag>
        </section>

        {/* 9. Новинки — editorial layout */}
        <section className="i-section-annot c-home__sec i-home__new-sec">
          <div className="container">
            <header className="i-new__head">
              <div className="i-new__head-text">
                <span className="i-new__eyebrow">
                  <span className="i-new__pulse" aria-hidden="true" />
                  Только что приехало · апрель 2026
                </span>
                <h2 className="i-new__h2">Новинки коллекции</h2>
                <p className="i-new__sub">
                  Свежие модели — пока никто не успел заказать. Поступили на склад в этом месяце.
                </p>
              </div>
              <a href="#" className="i-new__head-link">
                Все новинки
                <span className="i-new__head-arrow" aria-hidden="true">→</span>
              </a>
            </header>

            <NewArrivalsBlock />
          </div>
          <Tag>Мини-редизайн: editorial-сетка, hero + 2 mini, дата поступления, пульс «свежее»</Tag>
        </section>

        {/* 10. Отзывы — CRO-ориентированный блок: summary + verified + product-контекст */}
        <section className="i-section-annot c-home__sec i-home__reviews-sec">
          <div className="container">
            <div className="i-home__sec-head">
              <div>
                <h2 className="c-home__h2">Отзывы покупателей</h2>
                <p className="i-rev2__sub">
                  {trustStats.reviewCount.toLocaleString('ru-RU')} подтверждённых отзывов из 3 источников
                </p>
              </div>
              <div className="i-rev2__head-actions">
                <a href="#" className="i-rev2__btn i-rev2__btn--ghost">+ Оставить отзыв</a>
                <a href="#" className="i-link-arrow">Все отзывы →</a>
              </div>
            </div>

            {/* Summary: агрегированный рейтинг + распределение + источники */}
            <div className="i-rev2__summary">
              <div className="i-rev2__score">
                <div className="i-rev2__score-big">{trustStats.rating}</div>
                <div className="i-rev2__score-stars" aria-hidden="true">
                  {'★★★★★'.split('').map((_, i) => (
                    <span
                      key={i}
                      className={i < Math.round(trustStats.rating) ? 'is-on' : ''}
                    >★</span>
                  ))}
                </div>
                <div className="i-rev2__score-sub">
                  {trustStats.reviewCount.toLocaleString('ru-RU')} {pluralReviews(trustStats.reviewCount)}
                </div>
                <div className="i-rev2__recommend">
                  <b>{RECOMMEND_PCT}%</b> рекомендуют
                </div>
              </div>

              <div className="i-rev2__breakdown" aria-label="Распределение оценок">
                {RATING_BREAKDOWN.map((row) => (
                  <button
                    type="button"
                    key={row.stars}
                    className="i-rev2__bar-row"
                    aria-label={`${row.stars} звёзд, ${row.count} отзывов`}
                  >
                    <span className="i-rev2__bar-star">{row.stars}★</span>
                    <span className="i-rev2__bar-track">
                      <span
                        className="i-rev2__bar-fill"
                        style={{ width: `${row.pct}%` }}
                      />
                    </span>
                    <span className="i-rev2__bar-pct">{row.pct}%</span>
                    <span className="i-rev2__bar-count">{row.count.toLocaleString('ru-RU')}</span>
                  </button>
                ))}
              </div>

              <div className="i-rev2__sources" aria-label="Источники отзывов">
                <div className="i-rev2__sources-title">Отзывы собраны с площадок</div>
                <div className="i-rev2__sources-list">
                  {REVIEW_SOURCES.map((s) => (
                    <a href="#" className="i-rev2__source" key={s.name}>
                      <span className="i-rev2__source-ico" aria-hidden="true">{s.icon}</span>
                      <span className="i-rev2__source-body">
                        <span className="i-rev2__source-name">{s.name}</span>
                        <span className="i-rev2__source-meta">
                          <b>{s.rating}</b> ★ · {s.count.toLocaleString('ru-RU')} {pluralReviews(s.count)}
                        </span>
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Отзывы-карточки */}
            <div className="i-rev2__cards">
              {homeReviews.map((r) => {
                const e = REVIEW_ENRICH[r.id] || {};
                const initial = r.name.charAt(0).toUpperCase();
                return (
                  <article key={r.id} className="i-rev2">
                    <div className="i-rev2__photo">
                      <img src={r.photo} alt={`Фото покупателя — ${r.name}`} loading="lazy" />
                      <span className="i-rev2__photo-chip">📷 Фото покупателя</span>
                    </div>

                    <div className="i-rev2__body">
                      <header className="i-rev2__top">
                        <div className="i-rev2__avatar" aria-hidden="true">{initial}</div>
                        <div className="i-rev2__who">
                          <div className="i-rev2__name">
                            {r.name}
                            {e.verified && (
                              <span className="i-rev2__verify" title="Покупка подтверждена по номеру заказа">
                                ✓ Покупка подтверждена
                              </span>
                            )}
                          </div>
                          <div className="i-rev2__meta">
                            {r.city} · {r.date}
                          </div>
                        </div>
                        <div className="i-rev2__rating" aria-label={`Рейтинг ${r.rating} из 5`}>
                          {'★★★★★'.split('').map((_, i) => (
                            <span
                              key={i}
                              className={i < r.rating ? 'is-on' : ''}
                            >★</span>
                          ))}
                        </div>
                      </header>

                      <p className="i-rev2__text">{r.text}</p>

                      {e.productName && (
                        <a className="i-rev2__product" href={e.productHref || '#'}>
                          <img src={e.productImage} alt="" loading="lazy" />
                          <span className="i-rev2__product-text">
                            <span className="i-rev2__product-label">Отзыв о товаре</span>
                            <span className="i-rev2__product-name">{e.productName}</span>
                          </span>
                          <span className="i-rev2__product-arrow" aria-hidden="true">→</span>
                        </a>
                      )}

                      {e.response && (
                        <div className="i-rev2__response">
                          <div className="i-rev2__response-head">
                            <span className="i-rev2__response-logo" aria-hidden="true">D</span>
                            <b>Divan BOSS</b> ответил
                          </div>
                          <p>{e.response}</p>
                        </div>
                      )}

                      <footer className="i-rev2__actions">
                        <button type="button" className="i-rev2__helpful">
                          <span aria-hidden="true">👍</span> Полезно
                          {typeof e.helpful === 'number' && <b>{e.helpful}</b>}
                        </button>
                        <button type="button" className="i-rev2__share" aria-label="Поделиться">
                          <span aria-hidden="true">↗</span> Поделиться
                        </button>
                      </footer>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
          <Tag>Редизайн: summary-якорь (4.8★, 2547, 98% рекомендуют), verified-бейдж, привязка к товару, ответ магазина, «Полезно»</Tag>
        </section>

        {/* 11. Лид-форма */}
        <section className="i-section-annot i-home__lead-sec" id="lead">
          <div className="container i-lead">
            <div className="i-lead__text">
              <h2 className="i-lead__h2">Не знаете, какой диван выбрать?</h2>
              <p className="i-lead__desc">
                Оставьте телефон — дизайнер-консультант перезвонит за 15 минут,
                подберёт модель под комнату и образ жизни, расскажет про акции.
              </p>
              <ul className="i-lead__bullets">
                <li>Подбор по размеру и материалу</li>
                <li>Расчёт рассрочки 0 %</li>
                <li>Примерка дома 7 дней</li>
              </ul>
            </div>
            <form className="i-lead__form" onSubmit={(e) => e.preventDefault()}>
              <label className="i-field">
                <span>Имя</span>
                <input type="text" placeholder="Как к вам обращаться" />
              </label>
              <label className="i-field">
                <span>Телефон</span>
                <input type="tel" placeholder="+7 ___ ___ __ __" required />
              </label>
              <button type="submit" className="i-btn i-btn--primary i-btn--lg">Получить консультацию</button>
              <div className="i-lead__agree">
                Нажимая кнопку, вы соглашаетесь с <a href="#">политикой обработки данных</a>
              </div>
            </form>
          </div>
          <Tag>Было: не было формы обратного звонка</Tag>
        </section>

        {/* 12. Салоны */}
        <section className="i-section-annot c-home__sec c-home__sec--alt">
          <div className="container">
            <h2 className="c-home__h2">Салоны в Москве и Нижнем Новгороде</h2>
            <div className="c-home__salons">
              {salons.map((s, i) => (
                <div key={i} className="c-home__salon i-salon">
                  <a
                    className="i-salon__map"
                    href={`https://yandex.ru/maps/?text=${encodeURIComponent(s.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Открыть «${s.address}» на Яндекс.Картах`}
                    style={{ '--map-rot': `${i * 11 - 16}deg` }}
                  >
                    <svg
                      className="i-salon__map-svg"
                      viewBox="0 0 400 300"
                      preserveAspectRatio="xMidYMid slice"
                      aria-hidden="true"
                    >
                      <rect width="400" height="300" fill="#e8eef3" />
                      <rect x="250" y="20" width="120" height="90" rx="6" fill="#d7e6c9" />
                      <rect x="30" y="205" width="100" height="75" rx="6" fill="#d7e6c9" />
                      <rect x="20" y="20" width="115" height="75" fill="#dde4eb" />
                      <rect x="160" y="130" width="80" height="55" fill="#dde4eb" />
                      <rect x="260" y="200" width="120" height="80" fill="#dde4eb" />
                      <path d="M-20 260 L420 60" stroke="#ffe8a3" strokeWidth="14" />
                      <path d="M-20 260 L420 60" stroke="#f3c85a" strokeWidth="2" strokeDasharray="8 10" />
                      <path d="M0 110 H400" stroke="#ffffff" strokeWidth="14" />
                      <path d="M0 200 H400" stroke="#ffffff" strokeWidth="10" />
                      <path d="M150 0 V300" stroke="#ffffff" strokeWidth="14" />
                      <path d="M300 0 V300" stroke="#ffffff" strokeWidth="10" />
                      <circle cx="200" cy="150" r="120" fill="none" stroke="#c9d2da" strokeWidth="1" opacity="0.5" />
                    </svg>
                    <span className="i-salon__map-pin" aria-hidden="true">📍</span>
                    <span className="i-salon__map-cta">Как проехать</span>
                  </a>
                  <div className="c-home__salon-body">
                    <div className="c-home__salon-city">{s.city}</div>
                    <div className="c-home__salon-addr">{s.address}</div>
                    <div className="c-home__salon-hrs">
                      <time>Часы работы: {s.hours}</time>
                      {' · '}
                      <a href="tel:+74952605522" className="i-salon__phone">+7 (495) 260-55-22</a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Tag>Было: салоны без карты, телефона и schema.org</Tag>
        </section>

        {/* 13. FAQ */}
        <section className="i-section-annot c-home__sec i-home__faq-sec">
          <div className="container">
            <h2 className="c-home__h2">Частые вопросы</h2>
            <div className="i-faq">
              {homeFaq.map((f, i) => (
                <details key={i} className="i-faq__item">
                  <summary className="i-faq__q">{f.q}</summary>
                  <div className="i-faq__a">{f.a}</div>
                </details>
              ))}
            </div>
          </div>
          <Tag>Было: не было FAQ и FAQPage-разметки</Tag>
        </section>

        {/* 14. SEO-текст с H2/H3 */}
        <section className="i-section-annot c-home__sec">
          <div className="container i-seo-rich">
            <h2>Фабрика диванов Divan BOSS</h2>
            <p>
              Divan BOSS — собственное мебельное производство с 2009 года. Мы выпускаем
              угловые и прямые диваны, модульные комплекты, кровати с подъёмным механизмом,
              матрасы и корпусную мебель. Продаём по цене фабрики — без наценок посредников.
            </p>

            <h3>Почему фабричная мебель выгоднее</h3>
            <p>
              Мы контролируем каждый этап — от раскроя каркаса до пошива обивки. Это значит
              стабильное качество и честная цена: вы платите за материал и работу, а не за
              логистику 3–4 посредников. На каркас и механизмы даём гарантию 18 месяцев.
            </p>

            <h3>Доставка по России и рассрочка 0 %</h3>
            <p>
              Доставляем в 80+ городов России. По Москве — 1–3 дня, в регионы — 5–14 дней.
              Рассрочка до 24 месяцев без переплаты через Тинькофф, Альфа и Сбер.
              Примерка дома 7 дней: если не подойдёт — заберём бесплатно.
            </p>
          </div>
          <Tag>Было: один плоский абзац без H2/H3</Tag>
        </section>

        {/* 15. Тэги — внутренняя перелинковка */}
        <section className="i-section-annot c-home__sec i-home__tags-sec">
          <div className="container">
            <h2 className="c-home__h2">Популярные запросы</h2>
            <div className="i-tags">
              {seoTags.map((t) => (
                <a key={t.slug} href={`/catalog/${t.slug}`} className="i-tags__item">{t.name}</a>
              ))}
            </div>
          </div>
          <Tag>Было: не было перелинковки по тэгам</Tag>
        </section>
      </main>

      <Footer />
    </>
  );
}

function Tag({ children }) {
  return <span className="i-tag">🔧 {children}</span>;
}

function WhyIcon({ name }) {
  const common = {
    width: 22, height: 22, viewBox: '0 0 24 24',
    fill: 'none', stroke: 'currentColor',
    strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round',
  };
  switch (name) {
    case 'factory':
      return (
        <svg {...common} aria-hidden="true">
          <path d="M3 21V11l5 3V11l5 3V8l5 3v10z" />
          <path d="M3 21h18" />
          <path d="M7 17h.01M12 17h.01M17 17h.01" />
          <path d="M19 8V4" />
        </svg>
      );
    case 'home':
      return (
        <svg {...common} aria-hidden="true">
          <path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z" />
          <path d="M9 14h6" />
        </svg>
      );
    case 'truck':
      return (
        <svg {...common} aria-hidden="true">
          <path d="M2 7h11v9H2z" />
          <path d="M13 10h4l3 3v3h-7z" />
          <circle cx="6" cy="18" r="2" />
          <circle cx="17" cy="18" r="2" />
        </svg>
      );
    case 'shield':
      return (
        <svg {...common} aria-hidden="true">
          <path d="M12 3l8 3v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      );
    default:
      return null;
  }
}

function MicroTrust({ stats }) {
  return (
    <div className="i-micro-trust">
      <span className="i-micro-trust__item">
        <b>★ {stats.rating}</b> <small>на Яндекс.Картах</small>
      </span>
      <span className="i-micro-trust__sep" aria-hidden="true">·</span>
      <span className="i-micro-trust__item">
        <b>{stats.reviewCount.toLocaleString('ru-RU')}+</b> <small>отзывов</small>
      </span>
      <span className="i-micro-trust__sep" aria-hidden="true">·</span>
      <span className="i-micro-trust__item">
        <b>{stats.years} лет</b> <small>на рынке</small>
      </span>
      <span className="i-micro-trust__sep" aria-hidden="true">·</span>
      <span className="i-micro-trust__item">
        <b>{stats.salons}</b> <small>салонов</small>
      </span>
    </div>
  );
}

function HeroSlider({ banners }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % banners.length), 5500);
    return () => clearInterval(id);
  }, [banners.length]);
  return (
    <div className="i-hero">
      <div className="i-hero__track" style={{ transform: `translateX(-${i * 100}%)` }}>
        {banners.map((b, idx) => (
          <a key={idx} href="#" className="i-hero__slide" aria-label={b.alt}>
            <img
              src={b.src}
              alt={b.alt}
              loading={idx === 0 ? 'eager' : 'lazy'}
              fetchpriority={idx === 0 ? 'high' : 'auto'}
            />
          </a>
        ))}
      </div>
      <div className="i-hero__dots">
        {banners.map((_, idx) => (
          <button
            key={idx}
            className={`i-hero__dot ${idx === i ? 'is-active' : ''}`}
            onClick={() => setI(idx)}
            aria-label={`Слайд ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

function PromoBanner({ promo }) {
  const [left, setLeft] = useState(() => diff(promo.endsAt));
  useEffect(() => {
    const id = setInterval(() => setLeft(diff(promo.endsAt)), 1000);
    return () => clearInterval(id);
  }, [promo.endsAt]);
  return (
    <div className="i-promo">
      <div className="i-promo__img">
        <img src={promo.image} alt={promo.title} loading="lazy" />
      </div>
      <div className="i-promo__body">
        <div className="i-promo__eyebrow">🔥 Акция недели</div>
        <div className="i-promo__title">{promo.title}</div>
        <div className="i-promo__subtitle">{promo.subtitle}</div>
        <div className="i-promo__cta-row">
          <button className="i-promo__btn" onClick={(e) => e.preventDefault()}>
            {promo.cta}
          </button>
          <div className="i-promo__timer" aria-label="До конца акции">
            <TimeCell v={left.d} l="дн" />
            <TimeCell v={left.h} l="ч" />
            <TimeCell v={left.m} l="мин" />
            <TimeCell v={left.s} l="сек" />
          </div>
        </div>
      </div>
    </div>
  );
}

function TimeCell({ v, l }) {
  return (
    <span className="i-promo__tc">
      <b>{String(v).padStart(2, '0')}</b>
      <small>{l}</small>
    </span>
  );
}

function diff(isoEnd) {
  const ms = Math.max(0, new Date(isoEnd).getTime() - Date.now());
  return {
    d: Math.floor(ms / 86_400_000),
    h: Math.floor((ms % 86_400_000) / 3_600_000),
    m: Math.floor((ms % 3_600_000) / 60_000),
    s: Math.floor((ms % 60_000) / 1000),
  };
}

function NewArrivalsBlock() {
  const news = products.filter((p) => p.isNew);
  if (news.length === 0) return null;
  const [hero, ...rest] = news;
  const arrivals = ['14 апреля', '11 апреля', '8 апреля', '5 апреля'];
  const heroSave = hero.oldPrice ? hero.oldPrice - hero.price : 0;

  return (
    <div className="i-new__grid">
      <article className="i-new__hero">
        <a href="/improved/product" className="i-new__hero-link">
          <div className="i-new__hero-media">
            <img src={hero.image} alt={hero.name} loading="lazy" />
            <div className="i-new__hero-badges">
              <span className="i-new__pill i-new__pill--dark">
                <span className="i-new__pill-dot" aria-hidden="true" />
                NEW · {arrivals[0]}
              </span>
              {hero.discount > 0 && (
                <span className="i-new__pill i-new__pill--sale">−{hero.discount}%</span>
              )}
            </div>
            <button
              className="i-new__hero-fav"
              aria-label="В избранное"
              onClick={(e) => { e.preventDefault(); }}
            >♡</button>
            <span className="i-new__hero-spotlight" aria-hidden="true">
              <span>Модель месяца</span>
            </span>
          </div>
          <div className="i-new__hero-body">
            <div className="i-new__hero-cat">
              {hero.category}{hero.mechanism && ` · ${hero.mechanism}`}
            </div>
            <h3 className="i-new__hero-name">{hero.name}</h3>

            <div className="i-new__hero-meta">
              {hero.colors.length > 0 && (
                <span className="i-new__hero-colors">
                  {hero.colors.slice(0, 5).map((c, i) => (
                    <span key={i} className="i-new__hero-color" style={{ background: c }} />
                  ))}
                  <small>{hero.colors.length} цвет</small>
                </span>
              )}
              {hero.sizes.length > 0 && (
                <span className="i-new__hero-sizes">{hero.sizes.join(' · ')}</span>
              )}
              {hero.inStock && (
                <span className="i-new__hero-stock">
                  <span className="i-new__hero-stock-dot" aria-hidden="true" />
                  В наличии
                </span>
              )}
            </div>

            <div className="i-new__hero-price-row">
              <div className="i-new__hero-prices">
                <b className="i-new__hero-price">{formatPrice(hero.price)}</b>
                {hero.oldPrice && <s className="i-new__hero-old">{formatPrice(hero.oldPrice)}</s>}
              </div>
              {heroSave > 0 && (
                <span className="i-new__hero-save">экономия {formatPrice(heroSave)}</span>
              )}
            </div>

            <span className="i-new__hero-cta">
              Смотреть модель
              <span className="i-new__hero-cta-arrow" aria-hidden="true">→</span>
            </span>
          </div>
        </a>
      </article>

      <div className="i-new__rail">
        {rest.slice(0, 2).map((p, i) => {
          const s = p.oldPrice ? p.oldPrice - p.price : 0;
          return (
            <a key={p.id} href="/improved/product" className="i-new__mini">
              <div className="i-new__mini-media">
                <img src={p.image} alt={p.name} loading="lazy" />
                <span className="i-new__mini-flag">
                  <span className="i-new__pill-dot i-new__pill-dot--green" aria-hidden="true" />
                  NEW
                </span>
              </div>
              <div className="i-new__mini-body">
                <div className="i-new__mini-cat">
                  {p.category} · {arrivals[i + 1] || '5 апреля'}
                </div>
                <div className="i-new__mini-name">{p.name}</div>
                <div className="i-new__mini-prices">
                  <b>{formatPrice(p.price)}</b>
                  {p.oldPrice && <s>{formatPrice(p.oldPrice)}</s>}
                  {s > 0 && <em>−{formatPrice(s)}</em>}
                </div>
                <span className="i-new__mini-link">Подробнее →</span>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}

function ProductCardI({ p }) {
  return (
    <a href="/improved/product" className="c-card">
      <div className="c-card__img-wrap">
        <div className="i-card__img" style={{ aspectRatio: '1/1' }}>
          <img src={p.image} alt={p.name} loading="lazy" />
        </div>
        {p.discount > 0 && <span className="c-card__badge c-card__badge--sale">−{p.discount}%</span>}
        {p.isNew && !p.discount && <span className="c-card__badge c-card__badge--new">new</span>}
        <button className="c-card__fav" onClick={(e) => { e.preventDefault(); }}>♡</button>
      </div>
      <div className="c-card__body">
        <div className="c-card__name">{p.name}</div>
        <div className="c-card__prices">
          <span className="c-card__price">{formatPrice(p.price)}</span>
          {p.oldPrice && <span className="c-card__old">{formatPrice(p.oldPrice)}</span>}
        </div>
        {p.colors.length > 0 && (
          <div className="c-card__swatches">
            {p.colors.slice(0, 5).map((c, i) => (
              <span key={i} className="c-card__sw" style={{ background: c }} />
            ))}
            {p.colors.length > 5 && <span className="c-card__sw-more">+{p.colors.length - 5}</span>}
          </div>
        )}
      </div>
    </a>
  );
}

function ProductCardHit({ p, priority }) {
  const save = p.oldPrice ? p.oldPrice - p.price : 0;
  const monthly = Math.round(p.price / 24 / 100) * 100;
  const rating = (4.6 + ((p.id * 7) % 4) / 10).toFixed(1);
  const reviews = 38 + (p.id * 17) % 220;

  return (
    <a href="/improved/product" className="i-hit">
      <div className="i-hit__media">
        <img
          src={p.image}
          alt={p.name}
          loading={priority ? 'eager' : 'lazy'}
          fetchpriority={priority ? 'high' : 'auto'}
        />
        <div className="i-hit__badges">
          <span className="i-hit__badge i-hit__badge--hit">★ Хит</span>
          {p.discount > 0 && (
            <span className="i-hit__badge i-hit__badge--sale">−{p.discount}%</span>
          )}
        </div>
        <button
          className="i-hit__fav"
          aria-label="В избранное"
          onClick={(e) => { e.preventDefault(); }}
        >♡</button>
        <div className="i-hit__overlay">
          <span className="i-hit__overlay-btn">Купить в 1 клик →</span>
        </div>
      </div>

      <div className="i-hit__body">
        <div className="i-hit__top">
          <span className="i-hit__cat">{p.category}</span>
          <span className="i-hit__rating" aria-label={`Рейтинг ${rating} из 5, ${reviews} отзывов`}>
            <span className="i-hit__star">★</span>
            <b>{rating}</b>
            <span className="i-hit__rcount">· {reviews}</span>
          </span>
        </div>

        <div className="i-hit__name">{p.name}</div>

        {p.colors.length > 0 && (
          <div className="i-hit__colors">
            {p.colors.slice(0, 5).map((c, i) => (
              <span key={i} className="i-hit__color" style={{ background: c }} />
            ))}
            {p.colors.length > 1 && (
              <span className="i-hit__colors-text">{p.colors.length} цвет{p.colors.length === 1 ? '' : p.colors.length < 5 ? 'а' : 'ов'}</span>
            )}
          </div>
        )}

        <div className="i-hit__price-row">
          <div className="i-hit__price-main">
            <span className="i-hit__price">{formatPrice(p.price)}</span>
            {p.oldPrice && <span className="i-hit__old">{formatPrice(p.oldPrice)}</span>}
          </div>
          {save > 0 && (
            <span className="i-hit__save">Экономия {formatPrice(save)}</span>
          )}
        </div>

        <div className="i-hit__meta">
          <span className="i-hit__meta-item">
            <span className="i-hit__meta-ico" aria-hidden="true">💳</span>
            от {formatPrice(monthly)}/мес · 0%
          </span>
          {p.inStock && (
            <span className="i-hit__meta-item i-hit__meta-item--ok">
              <span className="i-hit__meta-dot" aria-hidden="true" />
              В наличии
            </span>
          )}
        </div>
      </div>
    </a>
  );
}

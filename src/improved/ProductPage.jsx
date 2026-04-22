import { useEffect, useMemo, useRef, useState } from 'react';
import Header from './HeaderI.jsx';
import Footer from './Footer.jsx';
import {
  mainProduct,
  mainProductGallery,
  mainProductRating,
  mainProductColors,
  mainProductSpecs,
  mainProductFeatures,
  mainProductDescription,
  mainProductSplitPayment,
  mainProductPromoBenefit,
  mainProductSchemeImage,
  mainProductReviews,
  ratingBreakdown,
  reviewPhotos,
  relatedProducts,
  giftCrossSell,
  giftBundleHero,
  discount5kItems,
  formatPrice,
} from '../mock/data.js';
import './ProductPage.css';

const HUMAN_TITLE = 'Кровать Босс Мини с подъёмным механизмом, 90×200';
const MODEL_SKU = 'DB-1002';
const CANONICAL = 'https://divanboss.ru/catalog/krovati-s-pm/boss-mini-90x200/';
const META_DESC =
  'Кровать Boss Mini 90×200 с подъёмным механизмом и бельевым ящиком HideBox 480 л. ' +
  'Гарантия 36 мес, примерка дома 7 дней, доставка от 1 500 ₽. Цена 29 700 ₽.';

const BREADCRUMBS = [
  { name: 'Главная', url: 'https://divanboss.ru/' },
  { name: 'Кровати', url: 'https://divanboss.ru/catalog/krovati/' },
  { name: 'Кровати с подъёмным механизмом', url: 'https://divanboss.ru/catalog/krovati-s-pm/' },
  { name: 'Кровать Босс Мини 90×200' },
];

const PRODUCT_FAQ = [
  {
    q: 'Можно ли стирать обивку «велюр Монолит»?',
    a: 'Чехол несъёмный. Рекомендована сухая чистка или мягкая губка с мыльным раствором. ' +
       'Велюр Монолит имеет пропитку Water Repellent и защиту «антикоготь» — большинство загрязнений удаляется без химчистки.',
  },
  {
    q: 'Кровать поставляется в собранном виде?',
    a: 'Нет, приезжает в 4 упаковках. Сборку можно заказать — от 1 500 ₽, мастер соберёт за 1–1,5 часа. ' +
       'Инструкция с картинками идёт в комплекте, при самостоятельной сборке достаточно отвёртки и шестигранника.',
  },
  {
    q: 'Какой объём бельевого ящика HideBox?',
    a: 'Объём 480 литров — помещается весь сезонный гардероб и постельное бельё. ' +
       'Подъёмный механизм на газ-лифтах, плавное открытие, удерживает раму в верхнем положении без помощи.',
  },
  {
    q: 'Какие сроки доставки по Москве и России?',
    a: 'По Москве и области — 1–3 дня. В регионы — 5–14 дней транспортной компанией. ' +
       'При заказе от 30 000 ₽ доставка по Москве бесплатна.',
  },
  {
    q: 'Можно ли примерить кровать дома?',
    a: 'Да, есть услуга «примерка дома на 7 дней». Если не подойдёт — заберём бесплатно, деньги вернём в полном объёме.',
  },
  {
    q: 'Какая гарантия на кровать?',
    a: 'Гарантия 36 месяцев на каркас и подъёмный механизм, 12 месяцев на обивку. ' +
       'При заводском браке — бесплатная замена или полный возврат.',
  },
];

function buildProductJsonLd(p, gallery, rating, colorName) {
  return {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: HUMAN_TITLE,
    description: META_DESC,
    image: gallery.slice(0, 6),
    sku: MODEL_SKU,
    mpn: MODEL_SKU,
    brand: { '@type': 'Brand', name: 'Divanboss' },
    category: 'Кровати с подъёмным механизмом',
    color: colorName,
    offers: {
      '@type': 'Offer',
      url: CANONICAL,
      priceCurrency: 'RUB',
      price: p.price,
      priceValidUntil: new Date(Date.now() + 1000 * 60 * 60 * 24 * 60)
        .toISOString()
        .slice(0, 10),
      itemCondition: 'https://schema.org/NewCondition',
      availability: p.inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      seller: { '@type': 'Organization', name: 'Divanboss' },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: rating.value,
      reviewCount: rating.count,
      bestRating: 5,
      worstRating: 1,
    },
  };
}

function buildBreadcrumbsJsonLd(items) {
  return {
    '@context': 'https://schema.org/',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      ...(it.url ? { item: it.url } : {}),
    })),
  };
}

function buildFaqJsonLd(faq) {
  return {
    '@context': 'https://schema.org/',
    '@type': 'FAQPage',
    mainEntity: faq.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
}

function setMeta(name, content, attr = 'name') {
  let tag = document.head.querySelector(`meta[${attr}="${name}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, name);
    tag.dataset.iProd = '1';
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
  return tag;
}

function setCanonical(href) {
  let tag = document.head.querySelector('link[rel="canonical"]');
  const created = !tag;
  if (!tag) {
    tag = document.createElement('link');
    tag.setAttribute('rel', 'canonical');
    if (created) tag.dataset.iProd = '1';
    document.head.appendChild(tag);
  }
  tag.setAttribute('href', href);
  return tag;
}

function insertJsonLd(id, data) {
  let tag = document.getElementById(id);
  if (!tag) {
    tag = document.createElement('script');
    tag.type = 'application/ld+json';
    tag.id = id;
    tag.dataset.iProd = '1';
    document.head.appendChild(tag);
  }
  tag.textContent = JSON.stringify(data);
  return tag;
}

export default function ImprovedProductPage() {
  const p = mainProduct;
  const gallery = mainProductGallery;

  const [activeImg, setActiveImg] = useState(0);
  const [color, setColor] = useState(mainProductColors[1].id);
  const [thumbOffset, setThumbOffset] = useState(0);
  const [tab, setTab] = useState('desc');
  const [oneClickOpen, setOneClickOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [zip, setZip] = useState('');

  const buyRef = useRef(null);

  const colorName = useMemo(
    () => mainProductColors.find(c => c.id === color)?.name || '',
    [color]
  );

  const deliveryCost = zip.length === 6
    ? (zip.startsWith('1') || zip.startsWith('4') ? 1500 : 3500)
    : null;

  useEffect(() => {
    const prevTitle = document.title;
    document.title = HUMAN_TITLE + ' — купить в Divanboss.ru';

    setMeta('description', META_DESC);
    setMeta('og:title', HUMAN_TITLE, 'property');
    setMeta('og:description', META_DESC, 'property');
    setMeta('og:type', 'product', 'property');
    setMeta('og:url', CANONICAL, 'property');
    setMeta('og:image', gallery[0], 'property');
    setMeta('twitter:card', 'summary_large_image');
    setCanonical(CANONICAL);

    insertJsonLd(
      'ld-product',
      buildProductJsonLd(p, gallery, mainProductRating, colorName)
    );
    insertJsonLd('ld-breadcrumbs', buildBreadcrumbsJsonLd(BREADCRUMBS));
    insertJsonLd('ld-faq', buildFaqJsonLd(PRODUCT_FAQ));

    return () => {
      document.title = prevTitle;
      document.head
        .querySelectorAll('[data-i-prod="1"]')
        .forEach(n => n.remove());
    };
  }, [p, gallery, colorName]);

  const THUMB_VISIBLE = 7;
  const canScrollUp = thumbOffset > 0;
  const canScrollDown = thumbOffset + THUMB_VISIBLE < gallery.length;

  return (
    <>
      <Header />

      <main className="i-prod">
        <div className="container">
          {/* ═════════ крошки + заголовок ═════════ */}
          <nav className="i-prod__crumbs" aria-label="Хлебные крошки">
            {BREADCRUMBS.map((b, i) => (
              <span key={i} className="i-prod__crumb">
                {b.url ? <a href={b.url}>{b.name}</a> : <span>{b.name}</span>}
                {i < BREADCRUMBS.length - 1 && <span className="i-prod__crumb-sep">›</span>}
              </span>
            ))}
          </nav>

          {/* ═════════ hero: галерея + buy-box ═════════ */}
          <div className="i-prod__hero" ref={buyRef}>
            <div className="i-prod__gallery">
              <div className="i-prod__main-img">
                <img
                  src={gallery[activeImg]}
                  alt={`${HUMAN_TITLE} — ракурс ${activeImg + 1}, ${colorName.toLowerCase()}`}
                />
                <button className="i-prod__fav" aria-label="В избранное">♡</button>
                <div className="i-prod__counter">
                  {activeImg + 1} / {gallery.length}
                </div>
                <button
                  type="button"
                  className="i-prod__nav i-prod__nav--prev"
                  aria-label="Предыдущее фото"
                  onClick={() => setActiveImg((activeImg - 1 + gallery.length) % gallery.length)}
                >‹</button>
                <button
                  type="button"
                  className="i-prod__nav i-prod__nav--next"
                  aria-label="Следующее фото"
                  onClick={() => setActiveImg((activeImg + 1) % gallery.length)}
                >›</button>
              </div>

              <div className="i-prod__thumbs-row">
                <button
                  type="button"
                  className="i-prod__thumbs-arrow"
                  aria-label="Предыдущие превью"
                  disabled={!canScrollUp}
                  onClick={() => setThumbOffset(Math.max(0, thumbOffset - 1))}
                >‹</button>
                <div className="i-prod__thumbs-viewport">
                  <div
                    className="i-prod__thumbs"
                    style={{ transform: `translateX(${-thumbOffset * 100}px)` }}
                  >
                    {gallery.map((src, i) => (
                      <button
                        key={i}
                        type="button"
                        className={'i-prod__thumb' + (i === activeImg ? ' is-active' : '')}
                        onClick={() => setActiveImg(i)}
                        aria-label={`Показать фото ${i + 1}`}
                      >
                        <img src={src} alt="" loading="lazy" />
                      </button>
                    ))}
                  </div>
                </div>
                <button
                  type="button"
                  className="i-prod__thumbs-arrow"
                  aria-label="Следующие превью"
                  disabled={!canScrollDown}
                  onClick={() =>
                    setThumbOffset(Math.min(gallery.length - THUMB_VISIBLE, thumbOffset + 1))
                  }
                >›</button>
              </div>

              {/* «сразу под галереей» — ключевые факты и плюсы, чтобы левая колонка
                  не пустовала и совпадала по высоте с buy-box */}
              <section className="i-prod__chips" aria-label="Ключевые характеристики">
                <span className="i-prod__chip">🛏 Кровать с ПМ</span>
                <span className="i-prod__chip">📐 90×200 см</span>
                <span className="i-prod__chip">📦 HideBox 480 л</span>
                <span className="i-prod__chip">🪵 Массив + ЛДСП</span>
                <span className="i-prod__chip">🧵 Велюр Монолит</span>
                <span className="i-prod__chip">🛡 Гарантия 36 мес</span>
              </section>

              <ul className="i-prod__highlights" aria-label="Почему эту кровать покупают">
                <li>
                  <span className="i-prod__hl-ico">📦</span>
                  <div>
                    <b>Бельевой ящик HideBox 480 л</b>
                    <span>Вмещает сезонный гардероб целой семьи — газ-лифты держат раму наверху без помощи</span>
                  </div>
                </li>
                <li>
                  <span className="i-prod__hl-ico">🪵</span>
                  <div>
                    <b>Каркас — массив берёзы + ЛДСП E1</b>
                    <span>Нагрузка до 220 кг, не скрипит при ежедневной эксплуатации</span>
                  </div>
                </li>
                <li>
                  <span className="i-prod__hl-ico">🧵</span>
                  <div>
                    <b>Антикоготь и водоотталкивающая пропитка</b>
                    <span>Обивка велюр Монолит — не боится когтей питомцев и пролитого кофе</span>
                  </div>
                </li>
                <li>
                  <span className="i-prod__hl-ico">🏠</span>
                  <div>
                    <b>Примерка дома 7 дней</b>
                    <span>Не подошла — заберём бесплатно, вернём деньги в полном объёме</span>
                  </div>
                </li>
              </ul>
            </div>

            <aside className="i-prod__buy" aria-label="Заказ товара">
              <header className="i-prod__head">
                <p className="i-prod__brand-line">
                  Divanboss · арт. {MODEL_SKU}
                </p>
                <h1 className="i-prod__title">{HUMAN_TITLE}</h1>
                <p className="i-prod__sku-line">
                  Обивка — велюр Монолит {colorName.toLowerCase()}
                </p>
                <div className="i-prod__meta">
                  <span className="i-prod__rating">
                    <span className="i-prod__stars" aria-hidden="true">★★★★★</span>
                    <b>{mainProductRating.value}</b>
                    <a href="#reviews" className="i-prod__rating-link">
                      {mainProductRating.count} отзывов
                    </a>
                  </span>
                  <span className="i-prod__stock">
                    <span className="i-prod__stock-dot" /> В наличии
                  </span>
                </div>
                <div className="i-prod__badges">
                  <span className="i-prod__badge i-prod__badge--hit">🔥 Хит продаж</span>
                  <span className="i-prod__badge">🚚 Отгрузка завтра</span>
                </div>
              </header>

              <div className="i-prod__prices">
                <span className="i-prod__price">{formatPrice(p.price)}</span>
                {p.oldPrice && (
                  <span className="i-prod__old">{formatPrice(p.oldPrice)}</span>
                )}
                {p.discount > 0 && (
                  <span className="i-prod__disc">−{p.discount}%</span>
                )}
              </div>
              <div className="i-prod__split">
                <span className="i-prod__split-ico">С</span>
                <span>
                  <b>{mainProductSplitPayment.toLocaleString('ru-RU')} ₽</b> × 4 в Сплит
                  <span className="i-prod__split-or"> · от {formatPrice(Math.round(p.price / 12))}/мес в рассрочку 0 %</span>
                </span>
              </div>

              <div className="i-prod__opt">
                <div className="i-prod__opt-head">
                  <span>Цвет обивки</span>
                  <b>{colorName}</b>
                </div>
                <div className="i-prod__swatches">
                  {mainProductColors.map(c => (
                    <button
                      key={c.id}
                      type="button"
                      className={'i-prod__swatch' + (c.id === color ? ' is-active' : '')}
                      onClick={() => setColor(c.id)}
                      aria-label={`Цвет: ${c.name}`}
                      title={c.name}
                    >
                      <span
                        className="i-prod__swatch-dot"
                        style={{ background: c.color }}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="i-prod__opt i-prod__opt--size">
                <div className="i-prod__opt-head">
                  <span>Спальное место</span>
                  <b>{p.sizes[0]} см</b>
                </div>
              </div>

              <div className="i-prod__promo">
                <span className="i-prod__promo-icon">🎁</span>
                <div>
                  <b>Матрас в подарок</b>
                  <span>выгода до {formatPrice(mainProductPromoBenefit)}</span>
                </div>
              </div>

              <button className="i-prod__cart" type="button">
                В корзину
              </button>
              <button
                className="i-prod__oneclick"
                type="button"
                onClick={() => setOneClickOpen(true)}
              >
                ⚡ Купить в 1 клик — перезвоним за 10 минут
              </button>

              <div className="i-prod__ship">
                <div className="i-prod__ship-head">
                  <span>🚚 Доставка</span>
                  {deliveryCost !== null && (
                    <b className="i-prod__ship-cost">
                      {formatPrice(deliveryCost)}, 3–5 дней
                    </b>
                  )}
                </div>
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  placeholder="Индекс — посчитаем точную стоимость"
                  value={zip}
                  onChange={e => setZip(e.target.value.replace(/\D/g, ''))}
                />
                {deliveryCost === null && (
                  <p className="i-prod__ship-hint">
                    от 1 500 ₽ по Нижнему Новгороду · бесплатно при заказе от 30 000 ₽
                  </p>
                )}
              </div>

              <ul className="i-prod__trust">
                <li><span>🛡️</span>Гарантия 36 мес</li>
                <li><span>🏠</span>Примерка дома 7 дней</li>
                <li><span>🔧</span>Сборка от 1 500 ₽</li>
                <li><span>↩️</span>Возврат 14 дней</li>
              </ul>
            </aside>
          </div>

          {/* ═════════ описание / характеристики / преимущества (табы на десктопе, аккордеоны на моб.) ═════════ */}
          <section className="i-prod__tabs" aria-label="Подробная информация">
            <div className="i-prod__tabs-head">
              {[
                ['desc', 'Описание'],
                ['specs', 'Характеристики'],
                ['feat', 'Преимущества материала'],
                ['delivery', 'Доставка и оплата'],
              ].map(([k, label]) => (
                <button
                  key={k}
                  className={'i-prod__tab' + (tab === k ? ' is-active' : '')}
                  onClick={() => setTab(k)}
                  type="button"
                >{label}</button>
              ))}
            </div>

            <div className="i-prod__tabs-body">
              {tab === 'desc' && (
                <div className="i-prod__desc">
                  <h2 className="i-prod__h2">Описание</h2>
                  <p>{mainProductDescription}</p>
                </div>
              )}
              {tab === 'specs' && (
                <div className="i-prod__specs-wrap">
                  <h2 className="i-prod__h2">Характеристики</h2>
                  <div className="i-prod__specs-layout">
                    <table className="i-prod__specs">
                      <tbody>
                        {mainProductSpecs.map(([k, v]) => (
                          <tr key={k}>
                            <th scope="row">{k}</th>
                            <td>{v}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <figure className="i-prod__scheme">
                      <img
                        src={mainProductSchemeImage}
                        alt="Схема габаритов кровати Босс Мини 90×200"
                        loading="lazy"
                      />
                      <figcaption>Габариты (ШхДхВ) — 108×218×90 см</figcaption>
                    </figure>
                  </div>
                </div>
              )}
              {tab === 'feat' && (
                <div>
                  <h2 className="i-prod__h2">Преимущества материала «Велюр Монолит»</h2>
                  <ul className="i-prod__feat">
                    {mainProductFeatures.map((f, i) => (
                      <li key={i}>
                        <span className="i-prod__feat-ico">✓</span>{f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {tab === 'delivery' && (
                <div className="i-prod__delivery">
                  <h2 className="i-prod__h2">Доставка и оплата</h2>
                  <ul>
                    <li>По Москве и области — 1–3 дня, от 1 500 ₽. Бесплатно при заказе от 30 000 ₽.</li>
                    <li>В регионы России — 5–14 дней через транспортную компанию.</li>
                    <li>Оплата: карта/СБП, наличными при получении, Яндекс.Сплит (4 × {mainProductSplitPayment.toLocaleString('ru-RU')} ₽), рассрочка 0 % до 24 мес.</li>
                    <li>Подъём на этаж и сборка — по желанию, от 1 500 ₽.</li>
                  </ul>
                </div>
              )}
            </div>
          </section>

          {/* ═════════ gift-bundle ═════════ */}
          <section className="i-prod__gift" aria-label="Матрас в подарок">
            <div className="i-prod__gift-left">
              <h2 className="i-prod__h2">Матрас в подарок при покупке комплекта</h2>
              <p className="i-prod__gift-lead">
                Кровать + матрас + тумба + бортик + топпер — экономия до {formatPrice(mainProductPromoBenefit)}.
              </p>
              <img src={giftBundleHero} alt="Комплект: кровать Босс Мини с матрасом и аксессуарами" loading="lazy" />
            </div>
            <ul className="i-prod__gift-list">
              {giftCrossSell.map(item => (
                <li key={item.id}>
                  <div className="i-prod__gift-thumb">
                    <img src={item.image} alt={item.name} loading="lazy" />
                  </div>
                  <div className="i-prod__gift-info">
                    <p>{item.name}</p>
                    <b>{formatPrice(item.price)}</b>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* ═════════ cross-sell скидка 5000 ═════════ */}
          <section className="i-prod__cross" aria-label="Скидка при покупке с этим товаром">
            <header className="i-prod__cross-head">
              <div>
                <span className="i-prod__cross-eyebrow">Выгоднее с кроватью</span>
                <h2 className="i-prod__h2">Скидка до 5 000 ₽ на дополнения</h2>
              </div>
              <p className="i-prod__cross-sub">
                Цены ниже — только при оформлении одним заказом с кроватью
              </p>
            </header>
            <div className="i-prod__cross-grid">
              {discount5kItems.map(item => {
                const save = item.oldPrice - item.newPrice;
                const pct = Math.round((save / item.oldPrice) * 100);
                return (
                  <article key={item.id} className="i-prod__cross-card">
                    <div className="i-prod__cross-badge">−{pct}%</div>
                    <div className="i-prod__cross-img">
                      <img src={item.image} alt={item.name} loading="lazy" />
                    </div>
                    {item.swatches?.length > 0 && (
                      <div className="i-prod__cross-swatches" aria-label="Доступные цвета">
                        {item.swatches.slice(0, 4).map((c, i) => (
                          <span key={i} style={{ background: c }} />
                        ))}
                        {item.swatches.length > 4 && (
                          <span className="i-prod__cross-swatches-more">
                            +{item.swatches.length - 4}
                          </span>
                        )}
                      </div>
                    )}
                    <h3 className="i-prod__cross-name">{item.name}</h3>
                    <div className="i-prod__cross-price">
                      <b>{formatPrice(item.newPrice)}</b>
                      <s>{formatPrice(item.oldPrice)}</s>
                    </div>
                    <div className="i-prod__cross-save">
                      Ваша выгода {formatPrice(save)}
                    </div>
                    <button className="i-prod__cross-btn" type="button">
                      Добавить к кровати
                    </button>
                  </article>
                );
              })}
            </div>
          </section>

          {/* ═════════ отзывы ═════════ */}
          <section id="reviews" className="i-prod__reviews" aria-label="Отзывы покупателей">
            <div className="i-prod__reviews-head">
              <h2 className="i-prod__h2">Отзывы ({mainProductRating.count})</h2>
              <button className="i-prod__write-btn" type="button">Написать отзыв</button>
            </div>

            <div className="i-prod__reviews-layout">
              <div className="i-prod__reviews-main">
                <div className="i-prod__photos" aria-label="Фото от покупателей">
                  <h3>Фото от покупателей</h3>
                  <div className="i-prod__photos-grid">
                    {reviewPhotos.map((src, i) => (
                      <div key={i} className="i-prod__photo">
                        <img src={src} alt={`Фото покупателя ${i + 1}`} loading="lazy" />
                      </div>
                    ))}
                  </div>
                </div>

                <ul className="i-prod__reviews-list">
                  {mainProductReviews.map(r => (
                    <li key={r.id} className="i-prod__review">
                      <div className="i-prod__review-head">
                        <div className="i-prod__review-avatar">{r.name[0]}</div>
                        <div className="i-prod__review-who">
                          <b>{r.name}</b>
                          <span>{r.date}</span>
                        </div>
                        <div className="i-prod__review-stars" aria-label={`Оценка ${r.rating} из 5`}>
                          {'★'.repeat(r.rating)}
                          <span className="i-prod__review-stars-empty">
                            {'★'.repeat(5 - r.rating)}
                          </span>
                        </div>
                      </div>
                      {r.photos.length > 0 && (
                        <div className="i-prod__review-photos">
                          {r.photos.map((src, i) => (
                            <img key={i} src={src} alt="" loading="lazy" />
                          ))}
                        </div>
                      )}
                      <p>{r.text}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <aside className="i-prod__reviews-aside">
                <div className="i-prod__aside-top">
                  <span className="i-prod__aside-value">{mainProductRating.value}</span>
                  <span className="i-prod__aside-stars">★★★★★</span>
                  <span className="i-prod__aside-count">
                    на основе {mainProductRating.count} отзывов
                  </span>
                </div>
                <div className="i-prod__bars">
                  {ratingBreakdown.map(({ stars, pct, count }) => (
                    <div key={stars} className="i-prod__bar-row">
                      <span>{stars} ★</span>
                      <div className="i-prod__bar"><div style={{ width: `${pct}%` }} /></div>
                      <span>{count}</span>
                    </div>
                  ))}
                </div>
              </aside>
            </div>
          </section>

          {/* ═════════ FAQ ═════════ */}
          <section className="i-prod__faq" aria-label="Частые вопросы">
            <h2 className="i-prod__h2">Частые вопросы про эту кровать</h2>
            <ul className="i-prod__faq-list">
              {PRODUCT_FAQ.map((item, i) => (
                <li key={i} className={'i-prod__faq-item' + (openFaq === i ? ' is-open' : '')}>
                  <button
                    type="button"
                    className="i-prod__faq-q"
                    onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                    aria-expanded={openFaq === i}
                  >
                    <span>{item.q}</span>
                    <span className="i-prod__faq-ico">{openFaq === i ? '−' : '+'}</span>
                  </button>
                  {openFaq === i && <p className="i-prod__faq-a">{item.a}</p>}
                </li>
              ))}
            </ul>
          </section>

          {/* ═════════ похожие ═════════ */}
          <section className="i-prod__related" aria-label="Похожие товары">
            <h2 className="i-prod__h2">С этим товаром покупают</h2>
            <div className="i-prod__related-grid">
              {relatedProducts.map(rp => (
                <a key={rp.id} href="/improved/product" className="i-prod__related-card">
                  <div className="i-prod__related-img">
                    <img src={rp.image} alt={rp.name} loading="lazy" />
                    {rp.discount > 0 && <span className="i-prod__related-disc">−{rp.discount}%</span>}
                  </div>
                  <div className="i-prod__related-name">{rp.name}</div>
                  <div className="i-prod__related-price">
                    <b>{formatPrice(rp.price)}</b>
                    {rp.oldPrice && <s>{formatPrice(rp.oldPrice)}</s>}
                  </div>
                </a>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* ═════════ mobile sticky bottom CTA ═════════ */}
      <div className="i-prod__mobile-bar" role="region" aria-label="Быстрый заказ">
        <div className="i-prod__mobile-bar-inner">
          <div className="i-prod__mobile-bar-info">
            <img src={gallery[activeImg]} alt="" />
            <div>
              <b>{formatPrice(p.price)}</b>
              {p.oldPrice && <s>{formatPrice(p.oldPrice)}</s>}
            </div>
          </div>
          <button type="button" className="i-prod__mobile-cart">В корзину</button>
        </div>
        <button
          type="button"
          className="i-prod__mobile-oneclick"
          onClick={() => setOneClickOpen(true)}
        >
          Купить в 1 клик — перезвоним за 10 минут
        </button>
      </div>

      <Footer />

      {oneClickOpen && (
        <OneClickModal onClose={() => setOneClickOpen(false)} product={p} />
      )}
    </>
  );
}

function OneClickModal({ onClose, product }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [done, setDone] = useState(false);

  const submit = e => {
    e.preventDefault();
    console.log('[one-click]', { product: product.slug, name, phone });
    setDone(true);
  };

  return (
    <div className="i-modal" onClick={onClose} role="dialog" aria-modal="true">
      <div className="i-modal__box" onClick={e => e.stopPropagation()}>
        <button className="i-modal__close" onClick={onClose} aria-label="Закрыть">×</button>
        {!done ? (
          <>
            <h3>Купить в 1 клик</h3>
            <p className="i-modal__lead">
              Оставьте имя и телефон. Менеджер перезвонит за 10 минут, уточнит цвет, размер и дату доставки.
            </p>
            <form onSubmit={submit}>
              <input
                required
                placeholder="Как к вам обращаться?"
                value={name}
                onChange={e => setName(e.target.value)}
              />
              <input
                required
                type="tel"
                placeholder="+7 (___) ___-__-__"
                value={phone}
                onChange={e => setPhone(e.target.value)}
              />
              <button type="submit">Жду звонка</button>
              <p className="i-modal__terms">
                Нажимая «Жду звонка», вы соглашаетесь с <a href="#">обработкой ПДн</a>.
              </p>
            </form>
          </>
        ) : (
          <div className="i-modal__done">
            <div className="i-modal__done-ico">✓</div>
            <h3>Спасибо, {name || 'заявка принята'}!</h3>
            <p>Менеджер перезвонит на {phone} в течение 10 минут.</p>
            <button onClick={onClose}>Закрыть</button>
          </div>
        )}
      </div>
    </div>
  );
}

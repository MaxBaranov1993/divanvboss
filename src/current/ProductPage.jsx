import { useState, useEffect, useRef } from 'react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import Placeholder from '../shared/Placeholder.jsx';
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
  giftCrossSell,
  giftBundleHero,
  discount5kItems,
  discount1kItems,
  mainProductReviews,
  ratingBreakdown,
  reviewPhotos,
  relatedProducts,
  formatPrice,
} from '../mock/data.js';
import './ProductPage.css';

export default function ProductPage() {
  const p = mainProduct;
  const [activeImg, setActiveImg] = useState(0);
  const [color, setColor] = useState(mainProductColors[1].id);
  const [size, setSize] = useState(p.sizes[0]);
  const [tab, setTab] = useState('specs');
  const [stickyVisible, setStickyVisible] = useState(false);
  const [thumbOffset, setThumbOffset] = useState(0);

  const buyRef = useRef(null);

  useEffect(() => {
    const hdr = document.querySelector('.c-hdr');
    const top = document.querySelector('.c-hdr__top');
    const updateTop = () => {
      if (!hdr) return;
      const topH = top?.offsetHeight || 0;
      const visibleH = hdr.offsetHeight - (window.scrollY > 80 ? topH : 0);
      document.documentElement.style.setProperty('--sticky-top', `${visibleH}px`);
    };
    const onScroll = () => {
      updateTop();
      if (!buyRef.current) return;
      const rect = buyRef.current.getBoundingClientRect();
      setStickyVisible(rect.bottom < 0);
    };
    updateTop();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', updateTop);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', updateTop);
    };
  }, []);

  const totalReviews = ratingBreakdown.reduce((s, r) => s + r.count, 0);
  const THUMB_VISIBLE = 6;
  const canScrollUp = thumbOffset > 0;
  const canScrollDown = thumbOffset + THUMB_VISIBLE < mainProductGallery.length;

  return (
    <>
      <Header />

      <div className={'c-prod__sticky-bar' + (stickyVisible ? ' is-visible' : '')}>
        <div className="c-prod__sticky-inner">
          <div className="c-prod__sticky-product">
            <div className="c-prod__sticky-thumb">
              <img src={mainProductGallery[activeImg]} alt="" />
            </div>
            <div className="c-prod__sticky-name">{p.name}</div>
          </div>
          <div className="c-prod__sticky-prices">
            <span className="c-prod__price">{formatPrice(p.price)}</span>
            {p.oldPrice && <span className="c-prod__old">{formatPrice(p.oldPrice)}</span>}
            {p.discount > 0 && <span className="c-prod__discount">−{p.discount}%</span>}
          </div>
          <button className="c-prod__cart c-prod__sticky-cart">Добавить в корзину</button>
        </div>
        <div className="c-prod__sticky-promo">
          <span>Товар участвует в акции</span>
          <span>Выгода до {formatPrice(mainProductPromoBenefit)}</span>
          <a href="#">Подробнее</a>
        </div>
      </div>

      <main className="c-prod">
        <div className="container c-prod__crumbs-wrap">
          <nav className="c-prod__crumbs">
            <a href="#" className="c-prod__crumb-home">⌂</a>
            <span>›</span>
            <a href="#">Кровати</a>
            <span>›</span>
            <a href="#">Кровати с подъёмным механизмом</a>
            <span>›</span>
            <span>{p.name}</span>
          </nav>
        </div>

        <div className="c-prod__hero">
          <div className="c-prod__grid" ref={buyRef}>
            <div className="c-prod__gallery">
              <div className="c-prod__thumbs-col">
                <button
                  className="c-prod__thumbs-arrow"
                  aria-label="вверх"
                  disabled={!canScrollUp}
                  onClick={() => setThumbOffset(Math.max(0, thumbOffset - 1))}
                >↑</button>
                <div className="c-prod__thumbs-viewport">
                  <div
                    className="c-prod__thumbs"
                    style={{ transform: `translateY(${-thumbOffset * 108}px)` }}
                  >
                    {mainProductGallery.map((src, i) => (
                      <button
                        key={i}
                        className={'c-prod__thumb' + (i === activeImg ? ' is-active' : '')}
                        onClick={() => setActiveImg(i)}
                        aria-label={`Фото ${i + 1}`}
                      >
                        <img src={src} alt="" />
                      </button>
                    ))}
                  </div>
                </div>
                <button
                  className="c-prod__thumbs-arrow"
                  aria-label="вниз"
                  disabled={!canScrollDown}
                  onClick={() => setThumbOffset(Math.min(mainProductGallery.length - THUMB_VISIBLE, thumbOffset + 1))}
                >↓</button>
              </div>

              <div className="c-prod__main">
                <img src={mainProductGallery[activeImg]} alt={p.name} />
              </div>
            </div>

            <aside className="c-prod__buy">
              <button className="c-prod__fav" aria-label="В избранное">♡</button>

              <div className="c-prod__toprow-pills">
                <span className="c-prod__gift">Матрас в подарок</span>
                <span className="c-prod__pill">
                  <img className="c-prod__pill-ico" src="https://divanboss.ru/local/templates/mm_2021/frontend/dist/assets/img/svg/Rating.svg" alt="" />
                  {mainProductRating.value}
                </span>
                <span className="c-prod__pill">
                  <img className="c-prod__pill-ico" src="https://divanboss.ru/local/templates/mm_2021/frontend/dist/assets/img/svg/Photos.svg" alt="" />
                  {mainProductRating.count} отзывов
                </span>
                <span className="c-prod__pill">
                  <img className="c-prod__pill-ico" src="https://divanboss.ru/local/templates/mm_2021/frontend/dist/assets/img/svg/Media.svg" alt="" />
                  Фото и видео покупателей
                </span>
              </div>

              <h1 className="c-prod__title">{p.name}</h1>

              <div className="c-prod__buy-row">
                <div className="c-prod__prices">
                  <span className="c-prod__price">{formatPrice(p.price)}</span>
                  {p.oldPrice && <span className="c-prod__old">{formatPrice(p.oldPrice)}</span>}
                  {p.discount > 0 && <span className="c-prod__discount">−{p.discount}%</span>}
                </div>
                <button className="c-prod__cart">Добавить в корзину</button>
              </div>

              <div className="c-prod__split">
                <span className="c-prod__split-ico" aria-hidden="true" />
                {mainProductSplitPayment.toLocaleString('ru-RU')} ₽ × 4 платежа в Сплит
              </div>

              <div className="c-prod__color-box">
                <div className="c-prod__color-label">
                  Цвет<span className="c-prod__color-star">*</span>:
                  <span className="c-prod__color-value"> {mainProductColors.find(c => c.id === color)?.name}</span>
                </div>
                <div className="c-prod__color-swatches">
                  {mainProductColors.map(c => (
                    <button
                      key={c.id}
                      className={'c-prod__swatch' + (c.id === color ? ' is-active' : '')}
                      onClick={() => setColor(c.id)}
                      aria-label={c.name}
                    >
                      <span className="c-prod__swatch-dot" style={{ background: c.color }} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="c-prod__promo-banner">
                <span className="c-prod__promo-label">Товар участвует в акции</span>
                <span className="c-prod__promo-benefit">Выгода до {formatPrice(mainProductPromoBenefit)}</span>
                <a href="#" className="c-prod__promo-more">Подробнее</a>
              </div>

              {p.sizes.length > 1 && (
                <div className="c-prod__opt-box">
                  <div className="c-prod__opt-label">Размер спального места</div>
                  <div className="c-prod__sizes">
                    {p.sizes.map(s => (
                      <button
                        key={s}
                        className={'c-prod__size' + (s === size ? ' is-active' : '')}
                        onClick={() => setSize(s)}
                      >{s}</button>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>

        <div className="container">
          <section className="c-prod__tabs">
            <div className="c-prod__tabs-head">
              {[
                ['specs', 'Характеристики'],
                ['features', 'Преимущества материала'],
                ['instructions', 'Инструкции'],
                ['desc', 'Описание'],
              ].map(([k, label]) => (
                <button
                  key={k}
                  className={'c-prod__tab' + (tab === k ? ' is-active' : '')}
                  onClick={() => setTab(k)}
                >{label}</button>
              ))}
            </div>

            <div className="c-prod__tabs-body">
              {tab === 'specs' && (
                <div className="c-prod__specs-wrap">
                  <div className="c-prod__specs-col">
                    <ul className="c-prod__specs-list">
                      {mainProductSpecs.map(([k, v]) => (
                        <li key={k}>
                          <p className="c-prod__spec-k">{k}</p>
                          <p className="c-prod__spec-v">{v}</p>
                        </li>
                      ))}
                    </ul>
                    <div className="c-prod__specs-disclaimer">
                      <strong>*</strong>Цвет товара на фото может незначительно отличаться по тону от реального из-за особенностей цветопередачи вашего монитора
                    </div>
                  </div>
                  <div className="c-prod__specs-scheme">
                    <img src={mainProductSchemeImage} alt="Габариты кровати" loading="lazy" />
                  </div>
                </div>
              )}
              {tab === 'features' && (
                <ul className="c-prod__feat-list">
                  {mainProductFeatures.map((f, i) => (
                    <li key={i}><span className="c-prod__feat-check">✓</span>{f}</li>
                  ))}
                </ul>
              )}
              {tab === 'instructions' && (
                <div className="c-prod__instructions">
                  <p>Все инструкции прилагаются в комплекте. Для скачивания PDF — нажмите ссылку ниже.</p>
                  <a href="#" className="c-prod__pdf-link">
                    <span className="c-prod__pdf-ico">📄</span> Инструкция по сборке кровати Boss Mini (PDF, 2.4 МБ)
                  </a>
                </div>
              )}
              {tab === 'desc' && (
                <p>{mainProductDescription}</p>
              )}
            </div>
          </section>

          <section className="c-prod__gift-bundle">
            <h2>Матрас Босс мини в подарок</h2>
            <p className="c-prod__gift-subtitle">При покупке: кровати + матраса + тумбы + бортика + топпера.</p>
            <div className="c-prod__gift-layout">
              <div className="c-prod__gift-hero">
                <img src={giftBundleHero} alt="Матрас Босс мини в подарок" loading="lazy" />
              </div>
              <ul className="c-prod__gift-list">
                {giftCrossSell.map(item => (
                  <li key={item.id} className="c-prod__gift-row">
                    <div className="c-prod__gift-row-img">
                      <img src={item.image} alt={item.name} loading="lazy" />
                    </div>
                    <div className="c-prod__gift-row-info">
                      <p className="c-prod__gift-row-name">{item.name}</p>
                      {item.swatches?.length > 0 && (
                        <div className="c-prod__gift-row-colors">
                          <span className="c-prod__gift-row-colors-label">Цвет:</span>
                          {item.swatches.map((c, i) => (
                            <span
                              key={i}
                              className={'c-prod__gift-row-swatch' + (i === 0 ? ' is-active' : '')}
                              style={{ background: c }}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="c-prod__gift-row-price">{formatPrice(item.price)}</div>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="c-prod__discount-slider">
            <h2>Скидка до 5000 ₽ при покупке с этим товаром</h2>
            <div className="c-prod__discount-grid">
              {discount5kItems.map(item => (
                <article key={item.id} className="c-prod__discount-card">
                  <div className="c-prod__discount-badge">−{formatPrice(item.oldPrice - item.newPrice)}</div>
                  <div className="c-prod__discount-img">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <h3 className="c-prod__discount-name">{item.name}</h3>
                  {item.swatches?.length > 0 && (
                    <div className="c-prod__card-swatches c-prod__card-swatches--pad">
                      {item.swatches.map((c, i) => (
                        <span key={i} className="c-prod__card-swatch" style={{ background: c }} />
                      ))}
                    </div>
                  )}
                  <div className="c-prod__discount-price">
                    <span className="c-prod__discount-strike">{formatPrice(item.oldPrice)}</span>
                    <span className="c-prod__discount-now">{formatPrice(item.newPrice)}</span>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="c-prod__discount-slider">
            <h2>Скидка 1000 ₽ при покупке с этим товаром</h2>
            <div className="c-prod__discount-grid">
              {discount1kItems.map(item => (
                <article key={item.id} className="c-prod__discount-card">
                  <div className="c-prod__discount-badge">−{formatPrice(item.oldPrice - item.newPrice)}</div>
                  <div className="c-prod__discount-img">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <h3 className="c-prod__discount-name">{item.name}</h3>
                  {item.swatches?.length > 0 && (
                    <div className="c-prod__card-swatches c-prod__card-swatches--pad">
                      {item.swatches.map((c, i) => (
                        <span key={i} className="c-prod__card-swatch" style={{ background: c }} />
                      ))}
                    </div>
                  )}
                  <div className="c-prod__discount-price">
                    <span className="c-prod__discount-strike">{formatPrice(item.oldPrice)}</span>
                    <span className="c-prod__discount-now">{formatPrice(item.newPrice)}</span>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="c-prod__reviews">
            <h2 className="c-prod__reviews-title">
              Отзывы<sup className="c-prod__reviews-sup">{mainProductRating.count}</sup>
            </h2>

            <div className="c-prod__reviews-layout">
              <div className="c-prod__reviews-main">
                <label className="c-prod__sort-field">
                  <span className="c-prod__sort-label">Сортировка</span>
                  <select className="c-prod__sort-select" defaultValue="new">
                    <option value="new">Сначала новые</option>
                    <option value="old">Сначала старые</option>
                    <option value="rating-high">Сначала с высоким рейтингом</option>
                    <option value="rating-low">Сначала с низким рейтингом</option>
                  </select>
                </label>

                <h3 className="c-prod__photos-title">Фото и видео от покупателей</h3>
                <div className="c-prod__reviews-photos">
                  {reviewPhotos.map((src, i) => (
                    <div key={i} className="c-prod__review-photo">
                      <img src={src} alt="" />
                    </div>
                  ))}
                </div>

                <div className="c-prod__reviews-list">
                  {mainProductReviews.map(r => (
                    <article key={r.id} className="c-prod__review-card">
                      <div className="c-prod__review-head">
                        <div className="c-prod__review-author">
                          <div className="c-prod__review-avatar">{r.name[0]}</div>
                          <div>
                            <div className="c-prod__review-name">{r.name}</div>
                            <div className="c-prod__review-date">{r.date}</div>
                          </div>
                        </div>
                        <div className="c-prod__review-stars">
                          {'★'.repeat(r.rating)}<span className="c-prod__review-stars-empty">{'★'.repeat(5 - r.rating)}</span>
                        </div>
                      </div>
                      {r.photos?.length > 0 && (
                        <div className="c-prod__review-photos">
                          {r.photos.map((src, i) => (
                            <div key={i} className="c-prod__review-photos-item">
                              <img src={src} alt="" />
                            </div>
                          ))}
                        </div>
                      )}
                      <p className="c-prod__review-text">{r.text}</p>
                    </article>
                  ))}
                </div>
              </div>

              <aside className="c-prod__reviews-aside">
                <div className="c-prod__aside-top">
                  <span className="c-prod__aside-stars">★★★★★</span>
                  <span className="c-prod__aside-value">{mainProductRating.value} / 5</span>
                </div>
                <div className="c-prod__aside-bars">
                  {ratingBreakdown.map(({ stars, pct }) => (
                    <div key={stars} className="c-prod__aside-bar-row">
                      <span className="c-prod__aside-bar-label">
                        {stars} {stars === 1 ? 'звезда' : 'звёзды'}
                      </span>
                      <div className="c-prod__aside-bar">
                        <div className="c-prod__aside-bar-fill" style={{ width: `${pct}%` }} />
                      </div>
                      <span className="c-prod__aside-bar-count">{pct} %</span>
                    </div>
                  ))}
                </div>
                <button className="c-prod__aside-btn">Написать отзыв</button>
                <a href="#" className="c-prod__aside-rules">Правила публикации отзывов</a>
              </aside>
            </div>
          </section>

          <section className="c-prod__related">
            <h2>Похожие товары</h2>
            <div className="c-prod__related-grid">
              {relatedProducts.map(rp => (
                <a key={rp.id} href="/current/product" className="c-prod__related-card">
                  <Placeholder label={rp.name} ratio="1/1" />
                  <div className="c-prod__related-name">{rp.name}</div>
                  <div className="c-prod__related-price">{formatPrice(rp.price)}</div>
                </a>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}

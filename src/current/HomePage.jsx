import { useState } from 'react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import Placeholder from '../shared/Placeholder.jsx';
import { popularCategories, products, salons, formatPrice, heroBanners, specialOffers } from '../mock/data.js';
import './HomePage.css';

export default function HomePage() {
  const [slide, setSlide] = useState(0);
  return (
    <>
      <Header />

      <main className="c-home">
        {/* Главный баннер — большой слайдер */}
        <section className="c-home__hero">
          <div className="container">
            <div className="c-home__hero-slider">
              <button
                className="c-home__hero-nav c-home__hero-nav--prev"
                aria-label="Назад"
                onClick={() => setSlide((slide - 1 + heroBanners.length) % heroBanners.length)}
              >‹</button>
              <div className="c-home__hero-track">
                {heroBanners.map((b, i) => (
                  <div key={i} className={`c-home__hero-slide ${i === slide ? 'is-active' : ''}`}>
                    <img src={b.src} alt={b.alt} />
                    <span className="c-home__hero-ad">Реклама</span>
                  </div>
                ))}
              </div>
              <button
                className="c-home__hero-nav c-home__hero-nav--next"
                aria-label="Вперёд"
                onClick={() => setSlide((slide + 1) % heroBanners.length)}
              >›</button>
              <div className="c-home__hero-dots">
                {heroBanners.map((_, i) => (
                  <button
                    key={i}
                    className={`c-home__hero-dot ${i === slide ? 'is-active' : ''}`}
                    onClick={() => setSlide(i)}
                    aria-label={`Слайд ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Популярные категории */}
        <section className="c-home__sec">
          <div className="container">
            <h2 className="c-home__h2">Популярные категории</h2>
            <div className="c-home__cats">
              {popularCategories.map(c => (
                <a key={c.slug} href="#" className="c-home__cat">
                  <div className="c-home__cat-header">
                    <p className="c-home__cat-title">{c.name}</p>
                  </div>
                  <div className="c-home__cat-img">
                    <img src={c.image} alt={c.name} title={c.name} loading="lazy" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Хиты продаж */}
        <section className="c-home__sec">
          <div className="container">
            <h2 className="c-home__h2">Хиты продаж</h2>
            <p className="c-home__sec-lead">
              В данном разделе собраны самые популярные модели мебели, которые пользуются
              стабильным спросом. Эти товары уже оценили за комфорт, качество и практичность —
              оптимальный выбор для тех, кто ищет надёжное и востребованное решение.
            </p>
            <div className="c-home__products">
              {products.filter(p => p.isHit).slice(0, 4).map(p => <ProductCard key={p.id} p={p} />)}
            </div>
          </div>
        </section>

        {/* Специальные предложения */}
        <section className="c-home__sec">
          <div className="container">
            <h2 className="c-home__h2">Специальные предложения</h2>
            <div className="c-home__specials">
              {specialOffers.map((s, i) => (
                <a key={i} href="#" className="c-home__special">
                  <div className="c-home__special-img">
                    <img src={s.src} alt={s.alt} loading="lazy" />
                  </div>
                  <div className="c-home__special-body">
                    <p className="c-home__special-title">{s.title}</p>
                    <button className="c-home__special-cta" onClick={e => e.preventDefault()}>К акции</button>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Новинки */}
        <section className="c-home__sec">
          <div className="container">
            <h2 className="c-home__h2">Новинки</h2>
            <p className="c-home__sec-lead">
              Свежие поступления — новые коллекции диванов, кроватей и корпусной мебели
              с нашей фабрики. Современные ткани, актуальные формы и механизмы.
            </p>
            <div className="c-home__products">
              {products.filter(p => p.isNew).slice(0, 4).map(p => <ProductCard key={p.id} p={p} />)}
            </div>
          </div>
        </section>

        {/* Адреса салонов */}
        <section className="c-home__sec c-home__sec--alt">
          <div className="container">
            <h2 className="c-home__h2">Адреса салонов в Москва</h2>
            <div className="c-home__salons">
              {salons.map((s, i) => (
                <div key={i} className="c-home__salon">
                  <Placeholder label={`Салон №${i + 1}`} ratio="4/3" />
                  <div className="c-home__salon-body">
                    <div className="c-home__salon-city">{s.city}</div>
                    <div className="c-home__salon-addr">{s.address}</div>
                    <div className="c-home__salon-hrs">Часы работы: {s.hours}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Тексты SEO (как на divanboss) */}
        <section className="c-home__sec">
          <div className="container c-home__seo">
            <p>
              Divan BOSS — собственная фабрика диванов, кроватей и корпусной мебели.
              Доставка по Москве и регионам, гарантия 18 месяцев. У нас вы можете купить
              диван в Москва по цене производителя.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

function ProductCard({ p }) {
  const splitPrice = Math.round(p.price / 4 / 100) * 100;
  return (
    <a href="/current/product" className="c-card">
      <div className="c-card__img-wrap">
        {p.image
          ? <img className="c-card__img" src={p.image} alt={p.name} loading="lazy" />
          : <Placeholder label={p.name} ratio="4/3" />}
        <div className="c-card__badges">
          <span className="c-card__badge c-card__badge--gift">Журнальный стол в подарок!</span>
          {p.isHit && <span className="c-card__badge c-card__badge--hit">Хит</span>}
          {p.isNew && <span className="c-card__badge c-card__badge--online">Эксклюзив ONLINE</span>}
        </div>
      </div>
      <div className="c-card__body">
        <div className="c-card__name">{p.name}</div>
        {p.colors.length > 0 && (
          <div className="c-card__sw-wrap">
            <span className="c-card__sw" style={{ background: p.colors[0] }} />
          </div>
        )}
        <div className="c-card__mech">{p.mechanism}</div>
        <div className="c-card__prices">
          {p.oldPrice && <span className="c-card__old">{formatPrice(p.oldPrice)}</span>}
          <span className="c-card__price">{formatPrice(p.price)}</span>
        </div>
        <div className="c-card__actions">
          {p.oldPrice ? (
            <span className="c-card__split">
              <span className="c-card__split-dot" />
              {formatPrice(splitPrice)} в Сплит
            </span>
          ) : <span />}
          <button className="c-card__buy" onClick={e => { e.preventDefault(); }}>
            <span className="c-card__buy-ico">🛒</span> В корзину
          </button>
        </div>
      </div>
    </a>
  );
}

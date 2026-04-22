import { useState, useMemo, useEffect, useRef } from 'react';
import Header from './HeaderCheckout.jsx';
import Footer from './Footer.jsx';
import { mainProduct, formatPrice, dadataSuggestions, crossSellAccessories, GIFT_TABLE_IMAGE } from '../mock/data.js';
import '../current/CheckoutPage.css';
import './CheckoutPage.css';

const FREE_DELIVERY_THRESHOLD = 100000;
const INSTALLMENT_MONTHS = 12;

const MONTHS_RU = ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
function deliveryWindow() {
  const a = new Date(); a.setDate(a.getDate() + 3);
  const b = new Date(); b.setDate(b.getDate() + 5);
  const fmt = d => `${d.getDate()} ${MONTHS_RU[d.getMonth()]}`;
  return `${fmt(a)} – ${fmt(b)}`;
}
function maskPhone(raw) {
  const d = raw.replace(/\D/g, '').replace(/^8/, '7').slice(0, 11);
  const p = d.padEnd(11, '_');
  return `+7 (${p.slice(1, 4)}) ${p.slice(4, 7)}-${p.slice(7, 9)}-${p.slice(9, 11)}`.replace(/_/g, '_');
}

const DOW_RU = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];
function deliverySlots() {
  const mk = (daysAhead, tFrom, tTo, labelPrefix) => {
    const d = new Date(); d.setDate(d.getDate() + daysAhead);
    const label = labelPrefix || `${d.getDate()} ${MONTHS_RU[d.getMonth()]}, ${DOW_RU[d.getDay()]}`;
    return { id: `${daysAhead}-${tFrom}`, label, time: `${tFrom}–${tTo}`, daysAhead };
  };
  return [
    mk(1, '10:00', '14:00', 'Завтра'),
    mk(1, '14:00', '18:00', 'Завтра'),
    mk(1, '18:00', '22:00', 'Завтра'),
    mk(2, '10:00', '14:00', 'Послезавтра'),
    mk(2, '14:00', '18:00', 'Послезавтра'),
    mk(3, '10:00', '14:00'),
  ];
}
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const GIFT_TABLE = {
  key: 'gift-table',
  name: 'Журнальный стол «Босс» — ПОДАРОК по акции',
  meta: 'Дуб сонома · 90×50 · при покупке кровати Boss Mini',
  price: 1,
  isGift: true,
  image: GIFT_TABLE_IMAGE,
};

export default function ImprovedCheckoutPage() {
  const p = mainProduct;

  const [items, setItems] = useState([
    {
      key: 'main',
      productId: p.id,
      name: p.name,
      meta: `Артикул: DB-${1000 + p.id} · Велюр Монолит аква · 90×200`,
      price: p.price,
      oldPrice: p.oldPrice,
      discount: p.discount,
      qty: 1,
      image: p.image,
    },
    { ...GIFT_TABLE, qty: 1 },
  ]);
  const [pendingRemoval, setPendingRemoval] = useState(null); // { item, index }
  const removalTimer = useRef(null);

  const [promo, setPromo] = useState('');
  const [addr, setAddr] = useState('');
  const [addrPicked, setAddrPicked] = useState(false);
  const [apt, setApt] = useState('');
  const [floor, setFloor] = useState('');
  const [freightLift, setFreightLift] = useState(false);
  const [delivery, setDelivery] = useState('courier');
  const [payment, setPayment] = useState('card');
  const [services, setServices] = useState({ assembly: false, disposal: false, lift: false });
  const [extras, setExtras] = useState({});
  const [phoneOrderOpen, setPhoneOrderOpen] = useState(false);
  const [saveCartOpen, setSaveCartOpen] = useState(false);

  // — UX/UI v2 —
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [promoOpen, setPromoOpen] = useState(false);
  const [loyaltyOpen, setLoyaltyOpen] = useState(false);
  const [mbarOpen, setMbarOpen] = useState(false);
  const [slot, setSlot] = useState(null);
  const [touched, setTouched] = useState({ phone: false, name: false, email: false });
  const slots = useMemo(() => deliverySlots(), []);
  const phoneFilled = phone.replace(/\D/g, '').length >= 11;
  const nameFilled = name.trim().length >= 2;
  const emailValid = email === '' || EMAIL_RE.test(email);
  const emailHasError = email !== '' && !EMAIL_RE.test(email);
  const stepDelivery = (addrPicked && (delivery !== 'courier' || slot)) || delivery === 'pickup';
  const stepPayment = !!payment;
  const stepContacts = phoneFilled && nameFilled && emailValid;
  const deliveryStr = deliveryWindow();

  // Б5. Программа лояльности в корзине
  const [loyaltyPhone, setLoyaltyPhone] = useState('');
  const [loyaltyJoined, setLoyaltyJoined] = useState(false);

  const suggestions = addr.length > 1 && !addrPicked
    ? dadataSuggestions.filter(s => s.toLowerCase().includes(addr.toLowerCase())).slice(0, 5)
    : [];

  const hasMainPromoProduct = items.some(it => it.key === 'main');
  const hasGift = items.some(it => it.isGift);
  const showGiftReminder = hasMainPromoProduct && !hasGift && !pendingRemoval?.item?.isGift;

  const productsSum = items.reduce((s, it) => s + it.price * it.qty, 0);
  const deliveryCost = addrPicked && delivery === 'courier'
    ? (productsSum >= FREE_DELIVERY_THRESHOLD ? 0 : 1900)
    : 0;
  const servicePrices = { assembly: 1990, disposal: 2390, lift: 800 };
  const servicesTotal = Object.entries(services).reduce((s, [k, v]) => v ? s + servicePrices[k] : s, 0);
  const extrasTotal = Object.entries(extras).reduce((s, [id, q]) => {
    const acc = crossSellAccessories.find(a => a.id === Number(id));
    return s + (acc ? acc.price * q : 0);
  }, 0);

  const grand = useMemo(() => productsSum + deliveryCost + servicesTotal + extrasTotal,
    [productsSum, deliveryCost, servicesTotal, extrasTotal]);

  const toFreeDelivery = Math.max(0, FREE_DELIVERY_THRESHOLD - productsSum);
  const freeDeliveryProgress = Math.min(100, (productsSum / FREE_DELIVERY_THRESHOLD) * 100);
  const perMonth = Math.round(grand / INSTALLMENT_MONTHS / 10) * 10;

  const cashbackForecast = Math.round(grand * 0.03);

  const updateQty = (key, next) => {
    setItems(xs => xs.map(it => it.key === key ? { ...it, qty: Math.max(1, next) } : it));
  };

  const removeItem = (key) => {
    const idx = items.findIndex(it => it.key === key);
    if (idx === -1) return;
    const item = items[idx];
    setItems(xs => xs.filter(it => it.key !== key));
    setPendingRemoval({ item, index: idx });
    if (removalTimer.current) clearTimeout(removalTimer.current);
    removalTimer.current = setTimeout(() => setPendingRemoval(null), 7000);
  };

  const undoRemove = () => {
    if (!pendingRemoval) return;
    const { item, index } = pendingRemoval;
    setItems(xs => {
      const next = [...xs];
      next.splice(index, 0, item);
      return next;
    });
    setPendingRemoval(null);
    if (removalTimer.current) clearTimeout(removalTimer.current);
  };

  const addGiftBack = () => {
    if (hasGift) return;
    setItems(xs => [...xs, { ...GIFT_TABLE, qty: 1 }]);
  };

  useEffect(() => () => removalTimer.current && clearTimeout(removalTimer.current), []);

  const joinLoyalty = (e) => {
    e.preventDefault();
    if (loyaltyPhone.replace(/\D/g, '').length < 10) return;
    setLoyaltyJoined(true);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log('[improved/checkout] submit', { items, addr, apt, services, extras, payment, grand, loyaltyPhone });
    alert('Заказ оформлен (демо). Смотрите console.log.');
  };

  return (
    <>
      <Header />

      <main className="c-co i-co">
        <div className="container">
          <div className="i-co__topbar">
            <header className="i2-head">
              <h1 className="i2-head__title">Оформление заказа</h1>
              <p className="i2-head__sub">
                {items.length} {items.length === 1 ? 'товар' : 'товара'} · доставка <b>{deliveryStr}</b>
              </p>
            </header>

            <Stepper
              steps={[
                { label: 'Корзина', done: true },
                { label: 'Доставка', done: stepDelivery },
                { label: 'Оплата', done: stepPayment },
                { label: 'Контакты', done: stepContacts },
              ]}
            />
          </div>

          <div className="i-co__layout">
            {/* Левая колонка — товар + форма */}
            <div className="i-co__left">
              {/* Товары */}
              <section className="c-co__cart i-co__cart">
                {items.map(it => (
                  <div key={it.key} className={'c-co__item i-co__item' + (it.isGift ? ' i-co__item--gift' : '')}>
                    <div className="c-co__item-img i-co__item-img">
                      {it.image
                        ? <img src={it.image} alt={it.name} loading="lazy" />
                        : <div className="i-co__item-ph" aria-label={it.name} />}
                    </div>
                    <div className="c-co__item-info">
                      {it.isGift && <span className="i-co__gift-badge">🎁 Подарок по акции</span>}
                      <div className="c-co__item-name">{it.name}</div>
                      <div className="c-co__item-meta">{it.meta}</div>
                    </div>

                    {/* A3/A4: цена за шт, старая цена, % скидки */}
                    <div className="i-co__prices">
                      {it.oldPrice && it.oldPrice > it.price && (
                        <div className="i-co__oldprice">
                          <s>{formatPrice(it.oldPrice * it.qty)}</s>
                          <span className="i-co__discount">−{it.discount}%</span>
                        </div>
                      )}
                      <div className="i-co__finalprice">{formatPrice(it.price * it.qty)}</div>
                      {it.qty > 1 && (
                        <div className="i-co__unitprice">{formatPrice(it.price)} × {it.qty}</div>
                      )}
                      {it.price >= 5000 && (
                        <div className="i-co__permonth">
                          или от <b>{formatPrice(Math.round(it.price * it.qty / INSTALLMENT_MONTHS / 10) * 10)}</b>/мес
                        </div>
                      )}
                    </div>

                    <div className="c-co__qty">
                      <button onClick={() => updateQty(it.key, it.qty - 1)} disabled={it.isGift}>−</button>
                      <span>{it.qty}</span>
                      <button onClick={() => updateQty(it.key, it.qty + 1)} disabled={it.isGift}>+</button>
                    </div>

                    <button className="c-co__remove" onClick={() => removeItem(it.key)} title="Удалить">×</button>
                  </div>
                ))}

                {/* Б1. Undo-отмена удаления */}
                {pendingRemoval && (
                  <div className="i-co__undo">
                    <span className="i-tag">🔧 Правка Б1 — Undo</span>
                    <span>Товар «{pendingRemoval.item.name}» удалён.</span>
                    <button onClick={undoRemove}>Отменить</button>
                  </div>
                )}

                {/* Г10. Валидатор подарка — если подарок удалили */}
                {showGiftReminder && (
                  <div className="i-co__gift-remind">
                    <span className="i-tag">🔧 Правка Г10 — валидатор подарка</span>
                    <span>🎁 Вам полагается журнальный стол за 1 ₽ по акции.</span>
                    <button onClick={addGiftBack}>Вернуть подарок</button>
                  </div>
                )}

                {!promoOpen ? (
                  <button type="button" className="i2-promo-toggle" onClick={() => setPromoOpen(true)}>
                    <IcoTag /> <span>Есть промокод?</span>
                  </button>
                ) : (
                  <div className="c-co__promo i2-promo">
                    <input autoFocus type="text" placeholder="Введите код" value={promo} onChange={e => setPromo(e.target.value)} />
                    <button type="button">Применить</button>
                  </div>
                )}
              </section>

              {/* Г2. Прогресс до бесплатной доставки */}
              <section className="i-co__freeship">
                <span className="i-tag">🔧 Правка Г2 — прогресс до бесплатной доставки</span>
                {toFreeDelivery > 0 ? (
                  <>
                    <div className="i-co__freeship-text">
                      До <b>бесплатной доставки</b> осталось <b>{formatPrice(toFreeDelivery)}</b>
                    </div>
                    <div className="i-co__freeship-bar">
                      <div className="i-co__freeship-fill" style={{ width: `${freeDeliveryProgress}%` }} />
                    </div>
                  </>
                ) : (
                  <div className="i-co__freeship-ok">
                    ✓ Бесплатная доставка включена
                  </div>
                )}
              </section>

              {/* Кросс-селл v2 */}
              <section className="c-co__sec i-co__xsell i2-xsell">
                <span className="i-tag">🔧 Правка Г3 — кросс-селл «С этим покупают»</span>
                <div className="i2-xsell__head">
                  <h2>С этим часто покупают</h2>
                  <p className="i2-xsell__sub">Добавьте в один клик — привезём вместе с заказом</p>
                </div>
                <div className="i-co__xsell-grid i2-xsell__grid">
                  {crossSellAccessories.map(a => {
                    const q = extras[a.id] || 0;
                    const inCart = q > 0;
                    return (
                      <div
                        key={a.id}
                        className={'i-co__xsell-card i2-xsell__card' + (inCart ? ' is-in-cart' : '')}
                      >
                        {/* Изображение + оверлей-бейджи */}
                        <div className="i-co__xsell-img i2-xsell__img">
                          {a.tag && (
                            <span className={'i2-xsell__tag' + (a.discount ? ' i2-xsell__tag--sale' : ' i2-xsell__tag--hit')}>
                              {a.tag}
                            </span>
                          )}
                          <img src={a.image} alt={a.name} loading="lazy" />
                          {inCart && (
                            <span className="i2-xsell__in-cart" aria-label="В заказе">
                              <IcoCheck />
                            </span>
                          )}
                        </div>

                        {/* Рейтинг */}
                        {a.rating && (
                          <div className="i2-xsell__rate">
                            <span className="i2-xsell__stars">
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="#FBC531" stroke="none" aria-hidden="true">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                              </svg>
                              {a.rating}
                            </span>
                            <span className="i2-xsell__reviews">· {a.reviews} отзывов</span>
                          </div>
                        )}

                        {/* Название */}
                        <div className="i-co__xsell-name i2-xsell__name">{a.name}</div>

                        {/* Цена */}
                        <div className="i2-xsell__price-row">
                          <span className="i-co__xsell-price i2-xsell__price">{formatPrice(a.price)}</span>
                          {a.oldPrice && (
                            <s className="i2-xsell__old">{formatPrice(a.oldPrice)}</s>
                          )}
                        </div>

                        {/* CTA */}
                        <div className="i-co__xsell-row i2-xsell__cta-row">
                          {!inCart ? (
                            <button
                              type="button"
                              className="i2-xsell__add"
                              onClick={() => setExtras({ ...extras, [a.id]: 1 })}
                            >
                              + Добавить
                            </button>
                          ) : (
                            <div className="c-co__qty i2-xsell__qty">
                              <button type="button" onClick={() => {
                                const next = { ...extras };
                                if (q <= 1) delete next[a.id]; else next[a.id] = q - 1;
                                setExtras(next);
                              }}>−</button>
                              <span>{q} шт</span>
                              <button type="button" onClick={() => setExtras({ ...extras, [a.id]: q + 1 })}>+</button>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              <form className="c-co__form" onSubmit={onSubmit}>
                {/* 🔧 Правка №1: один адрес с автоподсказкой */}
                <section className="c-co__sec">
                  <span className="i-tag">🔧 Правка №1 — 1 поле + DaData</span>
                  <h2>Адрес доставки</h2>
                  <div className="i-co__addr">
                    {!addrPicked ? (
                      <label className="c-co__field">
                        <span>Адрес<i>*</i></span>
                        <input
                          required
                          placeholder="Начните вводить: «Нижний Новгород, ул. ...»"
                          value={addr}
                          onChange={e => { setAddr(e.target.value); setAddrPicked(false); }}
                        />
                        {suggestions.length > 0 && (
                          <div className="i-co__dropdown">
                            {suggestions.map(s => (
                              <button
                                type="button"
                                key={s}
                                onClick={() => { setAddr(s); setAddrPicked(true); }}
                              >
                                <span>{s}</span>
                                <span className="i-co__dropdown-hint">индекс и дом подставятся автоматически</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </label>
                    ) : (
                      <div className="i2-addr-card">
                        <div className="i2-addr-card__check"><IcoCheck /></div>
                        <div className="i2-addr-card__body">
                          <div className="i2-addr-card__lbl">Адрес доставки</div>
                          <div className="i2-addr-card__val">{addr}</div>
                        </div>
                        <button type="button" className="i2-addr-card__edit" onClick={() => setAddrPicked(false)}>
                          Изменить
                        </button>
                      </div>
                    )}
                    <div className="i-co__addr-extra">
                      <label className="c-co__field">
                        <span>Квартира</span>
                        <input value={apt} onChange={e => setApt(e.target.value)} />
                      </label>
                      <label className="c-co__field">
                        <span>Этаж</span>
                        <input value={floor} onChange={e => setFloor(e.target.value)} />
                      </label>
                      <label className="c-co__field c-co__field--chk">
                        <input
                          type="checkbox"
                          checked={freightLift}
                          onChange={e => setFreightLift(e.target.checked)}
                        />
                        <span>Грузовой лифт</span>
                      </label>
                    </div>
                  </div>
                </section>

                {/* Способ доставки — карточки */}
                <section className="c-co__sec">
                  <h2>Способ доставки</h2>
                  <div className="i2-tiles i2-tiles--2">
                    <Tile
                      icon={<IcoTruck />}
                      title="Курьером"
                      sub={addrPicked ? `${deliveryStr} · до подъезда` : 'введите адрес для расчёта'}
                      price={addrPicked ? (deliveryCost === 0 ? 'Бесплатно' : formatPrice(1900)) : null}
                      active={delivery === 'courier'}
                      onClick={() => setDelivery('courier')}
                    />
                    <Tile
                      icon={<IcoStore />}
                      title="Самовывоз"
                      sub="4 салона в городе · сегодня"
                      price="Бесплатно"
                      active={delivery === 'pickup'}
                      onClick={() => setDelivery('pickup')}
                    />
                  </div>

                  {/* Slot-picker — только для курьера и после выбора адреса */}
                  {delivery === 'courier' && addrPicked && (
                    <div className="i2-slots">
                      <div className="i2-slots__lbl">Выберите удобное время:</div>
                      <div className="i2-slots__row">
                        {slots.map(s => (
                          <button
                            key={s.id}
                            type="button"
                            className={'i2-slot' + (slot?.id === s.id ? ' is-active' : '')}
                            onClick={() => setSlot(s)}
                          >
                            <span className="i2-slot__day">{s.label}</span>
                            <span className="i2-slot__time">{s.time}</span>
                          </button>
                        ))}
                      </div>
                      {!slot && (
                        <div className="i2-slots__hint">Без выбора слота — свяжемся для согласования</div>
                      )}
                    </div>
                  )}
                </section>

                {/* 🔧 Правка №5: доп. услуги тумблерами */}
                <section className="c-co__sec">
                  <span className="i-tag">🔧 Правка Г4 — доп. услуги (сборка / утилизация / подъём)</span>
                  <h2>Доп. услуги</h2>
                  <div className="i-co__services">
                    {[
                      ['assembly', 'Сборка мебели', 1990],
                      ['disposal', 'Вывоз старой мебели', 2390],
                      ['lift', 'Подъём на этаж (за этаж)', 800],
                    ].map(([k, label, price]) => (
                      <label key={k} className="i-co__toggle">
                        <input
                          type="checkbox"
                          checked={services[k]}
                          onChange={e => setServices({ ...services, [k]: e.target.checked })}
                        />
                        <span className="i-co__toggle-slider" />
                        <span className="i-co__toggle-label">
                          <b>{label}</b><span>{formatPrice(price)}</span>
                        </span>
                      </label>
                    ))}
                  </div>
                </section>

                {/* Оплата — карточки */}
                <section className="c-co__sec">
                  <h2>Способ оплаты</h2>
                  <div className="i2-tiles i2-tiles--4">
                    <Tile icon={<IcoCard />} title="Карта / СБП" sub="онлайн, моментально"
                      active={payment === 'card'} onClick={() => setPayment('card')} />
                    <Tile icon={<IcoCash />} title="Наличные" sub="при получении"
                      active={payment === 'cash'} onClick={() => setPayment('cash')} />
                    <Tile icon={<IcoSplit />} title="Я.Сплит" sub="4 платежа без %"
                      active={payment === 'yasplit'} onClick={() => setPayment('yasplit')} />
                    <Tile icon={<IcoInstal />} title="Рассрочка" sub="0% до 24 мес"
                      active={payment === 'instal'} onClick={() => setPayment('instal')} />
                  </div>
                </section>

                {/* Контакты — email опциональный */}
                <section className="c-co__sec">
                  <span className="i-tag">🔧 Email стал опциональным</span>
                  <h2>Контактные данные</h2>
                  <div className="c-co__contacts">
                    <label className={'c-co__field i2-valid' + (touched.phone && phoneFilled ? ' is-ok' : '') + (touched.phone && !phoneFilled ? ' is-err' : '')}>
                      <span>Телефон<i>*</i></span>
                      <input
                        required type="tel"
                        placeholder="+7 (___) ___-__-__"
                        value={phone}
                        onChange={e => setPhone(maskPhone(e.target.value))}
                        onFocus={() => { if (!phone) setPhone('+7 (___) ___-__-__'); }}
                        onBlur={() => setTouched(t => ({ ...t, phone: true }))}
                      />
                      {touched.phone && phoneFilled && <span className="i2-valid__ok" aria-label="OK"><IcoCheck /></span>}
                      {touched.phone && !phoneFilled && <span className="i2-valid__err">Введите номер полностью</span>}
                    </label>
                    <label className={'c-co__field i2-valid' + (touched.name && nameFilled ? ' is-ok' : '') + (touched.name && !nameFilled ? ' is-err' : '')}>
                      <span>Имя<i>*</i></span>
                      <input required placeholder="Как к вам обращаться?"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        onBlur={() => setTouched(t => ({ ...t, name: true }))}
                      />
                      {touched.name && nameFilled && <span className="i2-valid__ok"><IcoCheck /></span>}
                      {touched.name && !nameFilled && <span className="i2-valid__err">Минимум 2 буквы</span>}
                    </label>
                    <label className={'c-co__field i2-valid' + (touched.email && email && emailValid ? ' is-ok' : '') + (touched.email && emailHasError ? ' is-err' : '')}>
                      <span>Email <em className="i-co__optional">— для электронного чека</em></span>
                      <input type="email" placeholder="vasya@example.com"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        onBlur={() => setTouched(t => ({ ...t, email: true }))}
                      />
                      {touched.email && email && emailValid && <span className="i2-valid__ok"><IcoCheck /></span>}
                      {touched.email && emailHasError && <span className="i2-valid__err">Проверьте адрес</span>}
                    </label>
                  </div>
                </section>

                {/* submit скрытый — основная кнопка справа в sticky-блоке */}
                <button type="submit" style={{ display: 'none' }}>submit</button>
              </form>
            </div>

            {/* 🔧 Правка №4: sticky-блок «Итого + CTA» справа */}
            <aside className="i-co__aside">
              <div className="i-co__aside-box i2-aside-box">
                <div className="i2-aside-h">Ваш заказ</div>
                <div className="c-co__total-row"><span>Товары ({items.length})</span><b>{formatPrice(productsSum)}</b></div>
                <div className="c-co__total-row">
                  <span>Доставка</span>
                  <b>{addrPicked
                    ? (deliveryCost === 0 ? 'Бесплатно' : formatPrice(deliveryCost))
                    : (delivery === 'pickup' ? 'Бесплатно' : <span className="c-co__muted">введите адрес</span>)}</b>
                </div>
                {servicesTotal > 0 && (
                  <div className="c-co__total-row"><span>Доп. услуги</span><b>{formatPrice(servicesTotal)}</b></div>
                )}
                {extrasTotal > 0 && (
                  <div className="c-co__total-row"><span>Аксессуары</span><b>{formatPrice(extrasTotal)}</b></div>
                )}
                <div className="c-co__total-row c-co__total-row--big">
                  <span>Итого</span><b>{formatPrice(grand)}</b>
                </div>
                <div className="i-co__permonth i-co__permonth--big">
                  или от <b>{formatPrice(perMonth)}</b>/мес в рассрочку
                </div>

                {/* Г8. Блок доверия — SVG-иконки */}
                <div className="i2-trust">
                  <div className="i2-trust__item"><IcoShield /><b>18 мес</b><i>гарантия</i></div>
                  <div className="i2-trust__item"><IcoReturn /><b>14 дней</b><i>возврат</i></div>
                  <div className="i2-trust__item"><IcoTruck /><b>{deliveryStr.split('–')[0]}</b><i>доставка</i></div>
                  <div className="i2-trust__item"><IcoLockSec /><b>SSL</b><i>оплата</i></div>
                </div>

                <button
                  type="button"
                  className="i2-cta"
                  onClick={() => {
                    const form = document.querySelector('.c-co__form');
                    if (form) form.requestSubmit();
                  }}
                >
                  <span className="i2-cta__main">Оплатить {formatPrice(grand)}</span>
                  <span className="i2-cta__sub">{items.length} {items.length === 1 ? 'товар' : 'товара'} · доставка {deliveryStr}</span>
                </button>

                {/* Микрокопирайт — снимает страх покупки */}
                <div className="i2-cta-micro">
                  <div className="i2-cta-micro__row">
                    <IcoLockSec /> <span>Списание после подтверждения менеджером</span>
                  </div>
                  <div className="i2-cta-micro__row">
                    <IcoReturn /> <span>Можно отменить в течение часа без объяснений</span>
                  </div>
                  <div className="i2-cta-micro__pay">
                    <span className="i2-pay i2-pay--mir" aria-label="МИР">
                      <svg viewBox="0 0 60 20" width="34" height="14" aria-hidden="true">
                        <text x="0" y="15" fontFamily="Arial Black, Arial, sans-serif" fontWeight="900" fontSize="15" fill="#0F754F" letterSpacing="0.5">МИР</text>
                      </svg>
                    </span>
                    <span className="i2-pay i2-pay--ypay" aria-label="Яндекс Pay">
                      <svg viewBox="0 0 60 20" width="50" height="14" aria-hidden="true">
                        <text x="0" y="15" fontFamily="-apple-system, BlinkMacSystemFont, Arial, sans-serif" fontWeight="800" fontSize="14" fill="#000">Я Pay</text>
                      </svg>
                    </span>
                    <span className="i2-pay i2-pay--sbp" aria-label="СБП">
                      <svg viewBox="0 0 18 18" width="14" height="14" aria-hidden="true" style={{ marginRight: 4 }}>
                        <path d="M2 2l5 7-5 7M9 2l5 7-5 7" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <svg viewBox="0 0 44 14" width="30" height="11" aria-hidden="true">
                        <text x="0" y="11" fontFamily="Arial Black, Arial, sans-serif" fontWeight="900" fontSize="11" fill="#fff" letterSpacing="0.5">СБП</text>
                      </svg>
                    </span>
                  </div>
                </div>

                {/* Лояльность — свернуто */}
                <details className="i2-loyalty" open={loyaltyOpen} onToggle={e => setLoyaltyOpen(e.target.open)}>
                  <summary>
                    <IcoGift /> <span>Получить <b>{formatPrice(cashbackForecast)}</b> бонусов</span>
                  </summary>
                  <div className="i2-loyalty__body">
                    {!loyaltyJoined ? (
                      <>
                        <div className="i2-loyalty__hint">Бонусы покроют до 30% следующей покупки.</div>
                        <form className="i-co__loyalty-form" onSubmit={joinLoyalty}>
                          <input
                            type="tel"
                            placeholder="+7 (___) ___-__-__"
                            value={loyaltyPhone}
                            onChange={e => setLoyaltyPhone(e.target.value)}
                          />
                          <button type="submit">Получить бонусы</button>
                        </form>
                      </>
                    ) : (
                      <div className="i-co__loyalty-done">
                        ✓ Бонусы отправлены на <b>{loyaltyPhone}</b>.
                      </div>
                    )}
                  </div>
                </details>

                {/* 🔧 Правка №3: «Оформить по телефону» как альтернатива */}
                <button
                  type="button"
                  className="i-co__phone-order"
                  onClick={() => setPhoneOrderOpen(true)}
                >
                  📞 Оформить по телефону
                </button>

                {/* Г11. Сохранить / отправить корзину себе */}
                <button
                  type="button"
                  className="i-co__save-cart"
                  onClick={() => setSaveCartOpen(true)}
                >
                  📧 Сохранить список — отправить себе
                </button>

                <div className="i-co__bonus">💰 Начислим {formatPrice(cashbackForecast)} кешбэка за заказ</div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />

      {/* Mobile sticky bottom-bar v2 */}
      <div className={'i2-mbar' + (mbarOpen ? ' is-open' : '')}>
        <button
          type="button"
          className="i2-mbar__head"
          onClick={() => setMbarOpen(o => !o)}
          aria-expanded={mbarOpen}
        >
          <div className="i2-mbar__head-l">
            <div className="i2-mbar__lbl">Итого · {items.length} {items.length === 1 ? 'товар' : 'товара'}</div>
            <div className="i2-mbar__sum">{formatPrice(grand)}</div>
          </div>
          <span className={'i2-mbar__chev' + (mbarOpen ? ' is-open' : '')} aria-hidden>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
          </span>
        </button>

        {mbarOpen && (
          <div className="i2-mbar__sheet">
            <div className="i2-mbar__row"><span>Товары ({items.length})</span><b>{formatPrice(productsSum)}</b></div>
            <div className="i2-mbar__row">
              <span>Доставка</span>
              <b>{addrPicked
                ? (deliveryCost === 0 ? 'Бесплатно' : formatPrice(deliveryCost))
                : (delivery === 'pickup' ? 'Бесплатно' : <span className="c-co__muted">введите адрес</span>)}</b>
            </div>
            {servicesTotal > 0 && (
              <div className="i2-mbar__row"><span>Доп. услуги</span><b>{formatPrice(servicesTotal)}</b></div>
            )}
            {extrasTotal > 0 && (
              <div className="i2-mbar__row"><span>Аксессуары</span><b>{formatPrice(extrasTotal)}</b></div>
            )}
            <div className="i2-mbar__row i2-mbar__row--big">
              <span>Итого</span><b>{formatPrice(grand)}</b>
            </div>
            <div className="i2-mbar__permonth">или от <b>{formatPrice(perMonth)}</b>/мес в рассрочку</div>
            <div className="i2-mbar__trust">
              <span><IcoShield /> 18 мес</span>
              <span><IcoReturn /> 14 дн</span>
              <span><IcoLockSec /> SSL</span>
            </div>
          </div>
        )}

        <div className="i2-mbar__cta-wrap">
          <button
            type="button"
            className="i2-mbar__cta"
            onClick={() => {
              setMbarOpen(false);
              const form = document.querySelector('.c-co__form');
              if (form) form.requestSubmit();
            }}
          >
            <span className="i2-mbar__cta-main">Оплатить {formatPrice(grand)}</span>
            <span className="i2-mbar__cta-sub">{items.length} {items.length === 1 ? 'товар' : 'товара'} · {deliveryStr}</span>
          </button>
          <div className="i2-mbar__micro">Спишем после подтверждения · отмена в течение часа</div>
        </div>
      </div>
      {mbarOpen && <div className="i2-mbar__backdrop" onClick={() => setMbarOpen(false)} />}

      {phoneOrderOpen && <PhoneOrderModal onClose={() => setPhoneOrderOpen(false)} />}
      {saveCartOpen && <SaveCartModal onClose={() => setSaveCartOpen(false)} grand={grand} count={items.length} />}
    </>
  );
}

function PhoneOrderModal({ onClose }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [done, setDone] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    console.log('[phone-order]', { name, phone });
    setDone(true);
  };

  return (
    <div className="i-modal" onClick={onClose}>
      <div className="i-modal__box" onClick={e => e.stopPropagation()}>
        <button className="i-modal__close" onClick={onClose}>×</button>
        {!done ? (
          <>
            <h3>Оформим заказ по телефону</h3>
            <p className="i-modal__lead">Менеджер перезвонит за 10 минут, уточнит адрес и способ оплаты.</p>
            <form onSubmit={submit}>
              <input required placeholder="Имя" value={name} onChange={e => setName(e.target.value)} />
              <input required type="tel" placeholder="+7 (___) ___-__-__" value={phone} onChange={e => setPhone(e.target.value)} />
              <button type="submit">Жду звонка</button>
            </form>
          </>
        ) : (
          <div className="i-modal__done">
            <div className="i-modal__done-ico">✓</div>
            <h3>Заявка принята</h3>
            <p>Менеджер перезвонит на {phone}.</p>
            <button onClick={onClose}>Закрыть</button>
          </div>
        )}
      </div>
    </div>
  );
}

function SaveCartModal({ onClose, grand, count }) {
  const [channel, setChannel] = useState('email');
  const [contact, setContact] = useState('');
  const [done, setDone] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    console.log('[save-cart]', { channel, contact, grand, count });
    setDone(true);
  };

  const placeholder = channel === 'email' ? 'vasya@example.com' : '+7 (___) ___-__-__';
  const ctaLabel = channel === 'email' ? 'Отправить на email' : (channel === 'telegram' ? 'Открыть в Telegram' : 'Отправить в WhatsApp');

  return (
    <div className="i-modal" onClick={onClose}>
      <div className="i-modal__box" onClick={e => e.stopPropagation()}>
        <button className="i-modal__close" onClick={onClose}>×</button>
        {!done ? (
          <>
            <h3>Сохранить корзину</h3>
            <p className="i-modal__lead">
              Отправим вам ссылку на корзину ({count} товаров на {formatPrice(grand)}) — вернётесь, когда удобно.
            </p>
            <div className="i-modal__channels">
              {[
                ['email', '📧 Email'],
                ['telegram', '💬 Telegram'],
                ['whatsapp', '🟢 WhatsApp'],
              ].map(([k, label]) => (
                <button
                  key={k}
                  type="button"
                  className={'i-modal__channel' + (channel === k ? ' is-active' : '')}
                  onClick={() => setChannel(k)}
                >{label}</button>
              ))}
            </div>
            <form onSubmit={submit}>
              <input
                required
                type={channel === 'email' ? 'email' : 'tel'}
                placeholder={placeholder}
                value={contact}
                onChange={e => setContact(e.target.value)}
              />
              <button type="submit">{ctaLabel}</button>
            </form>
          </>
        ) : (
          <div className="i-modal__done">
            <div className="i-modal__done-ico">✓</div>
            <h3>Отправлено</h3>
            <p>Корзина сохранена. Ссылка ушла на {contact}.</p>
            <button onClick={onClose}>Закрыть</button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══════════ UX/UI v2 — компоненты ═══════════ */

function Stepper({ steps }) {
  const activeIdx = steps.findIndex(s => !s.done);
  const cur = activeIdx === -1 ? steps.length - 1 : activeIdx;
  return (
    <ol className="i2-stepper" aria-label="Шаги оформления">
      {steps.map((s, i) => (
        <li
          key={s.label}
          className={`i2-step${s.done ? ' is-done' : ''}${i === cur ? ' is-current' : ''}`}
        >
          <span className="i2-step__num">{s.done ? <IcoCheck /> : i + 1}</span>
          <span className="i2-step__lbl">{s.label}</span>
        </li>
      ))}
    </ol>
  );
}

function Tile({ icon, title, sub, price, active, onClick }) {
  return (
    <button
      type="button"
      className={`i2-tile${active ? ' is-active' : ''}`}
      onClick={onClick}
      aria-pressed={active}
    >
      <span className="i2-tile__ico">{icon}</span>
      <span className="i2-tile__body">
        <span className="i2-tile__title">{title}</span>
        {sub && <span className="i2-tile__sub">{sub}</span>}
      </span>
      {price && <span className="i2-tile__price">{price}</span>}
      <span className="i2-tile__check" aria-hidden><IcoCheck /></span>
    </button>
  );
}

/* ─── icons ─── */
function IcoCheck() { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden><path d="m5 12 5 5 9-11" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>; }
function IcoTruck() { return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden><path d="M3 16V6h11v10M14 9h4l3 3v4h-7" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/><circle cx="7" cy="18" r="2" stroke="currentColor" strokeWidth="1.8"/><circle cx="17" cy="18" r="2" stroke="currentColor" strokeWidth="1.8"/></svg>; }
function IcoStore() { return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden><path d="M4 9V7l2-3h12l2 3v2a3 3 0 0 1-6 0 3 3 0 0 1-6 0 3 3 0 0 1-6 0Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/><path d="M5 11v9h14v-9M10 20v-5h4v5" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/></svg>; }
function IcoCard() { return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden><rect x="3" y="6" width="18" height="13" rx="2.5" stroke="currentColor" strokeWidth="1.8"/><path d="M3 10h18M7 15h3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>; }
function IcoCash() { return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden><rect x="2" y="7" width="20" height="11" rx="2" stroke="currentColor" strokeWidth="1.8"/><circle cx="12" cy="12.5" r="2.5" stroke="currentColor" strokeWidth="1.8"/></svg>; }
function IcoSplit() { return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden><rect x="3" y="5" width="6" height="6" rx="1.2" stroke="currentColor" strokeWidth="1.8"/><rect x="15" y="5" width="6" height="6" rx="1.2" stroke="currentColor" strokeWidth="1.8"/><rect x="3" y="13" width="6" height="6" rx="1.2" stroke="currentColor" strokeWidth="1.8"/><rect x="15" y="13" width="6" height="6" rx="1.2" stroke="currentColor" strokeWidth="1.8"/></svg>; }
function IcoInstal() { return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden><path d="M3 7h18v10H3z" stroke="currentColor" strokeWidth="1.8"/><path d="M7 12h2M11 12h2M15 12h2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>; }
function IcoTag() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden><path d="M3 12V4h8l10 10-8 8L3 12Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/><circle cx="8" cy="9" r="1.4" fill="currentColor"/></svg>; }
function IcoShield() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden><path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/><path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>; }
function IcoReturn() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden><path d="M4 11a8 8 0 0 1 14-5l3-1-1 4-4-1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M20 13a8 8 0 0 1-14 5l-3 1 1-4 4 1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>; }
function IcoLockSec() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden><rect x="5" y="11" width="14" height="9" rx="2" stroke="currentColor" strokeWidth="1.8"/><path d="M8 11V8a4 4 0 1 1 8 0v3" stroke="currentColor" strokeWidth="1.8"/><circle cx="12" cy="15.5" r="1.4" fill="currentColor"/></svg>; }
function IcoGift() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden><rect x="3" y="9" width="18" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.8"/><path d="M3 13h18M12 9v11" stroke="currentColor" strokeWidth="1.8"/><path d="M12 9c-3 0-5-1-5-3a2 2 0 0 1 4-1l1 4 1-4a2 2 0 0 1 4 1c0 2-2 3-5 3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/></svg>; }

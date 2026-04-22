import { useState } from 'react';
import CheckoutHeader from './CheckoutHeader.jsx';
import Footer from './Footer.jsx';
import Placeholder from '../shared/Placeholder.jsx';
import { formatPrice } from '../mock/data.js';
import './CheckoutPage.css';

const CheckIcon = (props) => (
  <svg viewBox="0 0 16 16" fill="none" width="14" height="14" {...props}>
    <path d="M3 8.5l3.5 3L13 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

function Field({ label, required, type = 'text', className = '', ...rest }) {
  return (
    <label className={'c-co__field ' + className}>
      <input type={type} placeholder=" " required={required} {...rest} />
      <span>{label}{required && <i>*</i>}</span>
      <CheckIcon className="c-co__field-check" />
    </label>
  );
}

export default function CheckoutPage() {
  const [qty, setQty] = useState(1);
  const [promo, setPromo] = useState('');
  const [delivery, setDelivery] = useState('courier');
  const [payment, setPayment] = useState('card');
  const [sameReceiver, setSameReceiver] = useState(true);
  const [cookieDismissed, setCookieDismissed] = useState(false);

  const productName = 'Босс ХО Кровать 180*200 велюр Монолит синий';
  const price = 116700;
  const oldPrice = 183999;
  const subtotal = price * qty;

  const onSubmit = (e) => {
    e.preventDefault();
    console.log('[current/checkout] submit', { qty, delivery, payment });
    alert('Заказ оформлен (демо). Смотрите console.log.');
  };

  const Tile = ({ active, onClick, children }) => (
    <button
      type="button"
      className={'c-co__tile' + (active ? ' is-active' : '')}
      onClick={onClick}
    >
      <span>{children}</span>
      {active && <CheckIcon className="c-co__tile-check" />}
    </button>
  );

  return (
    <>
      <CheckoutHeader />

      <main className="c-co">
        <div className="container c-co__grid">
          <div className="c-co__main">
            <h1 className="c-co__title">Корзина</h1>

            <section className="c-co__cart">
              <div className="c-co__item">
                <div className="c-co__item-img">
                  <Placeholder label={productName} ratio="1/1" />
                </div>
                <div className="c-co__item-info">
                  <div className="c-co__item-name">{productName}</div>
                  <div className="c-co__item-color">
                    <span className="c-co__color-dot" />
                    <span className="c-co__color-label">Цвет: синий</span>
                  </div>
                </div>
                <div className="c-co__item-prices">
                  <div className="c-co__item-price">{formatPrice(price * qty)}</div>
                  <div className="c-co__item-oldprice">{formatPrice(oldPrice * qty)}</div>
                  <div className="c-co__qty-wrap">
                    <select
                      className="c-co__qty-select"
                      value={qty}
                      onChange={e => setQty(Number(e.target.value))}
                    >
                      {[1,2,3,4,5].map(n => (
                        <option key={n} value={n}>{n} шт.</option>
                      ))}
                    </select>
                  </div>
                </div>
                <button className="c-co__remove" title="Удалить">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
            </section>

            <h2 className="c-co__section-title">Оформление заказа</h2>

            <form className="c-co__form" onSubmit={onSubmit}>
              <section className="c-co__sec">
                <h3 className="c-co__sec-title">Способ доставки</h3>
                <div className="c-co__tiles">
                  <Tile active={delivery === 'courier'} onClick={() => setDelivery('courier')}>Курьерская доставка</Tile>
                  <Tile active={delivery === 'pickup'} onClick={() => setDelivery('pickup')}>Самовывоз</Tile>
                </div>
              </section>

              {delivery === 'courier' && (
                <section className="c-co__sec">
                  <h3 className="c-co__sec-title">Адрес доставки</h3>
                  <div className="c-co__addr-grid">
                    <Field label="Регион" required />
                    <Field label="Индекс" />
                    <Field label="Город" required />
                    <Field label="Улица" required />
                    <Field label="Дом" required />
                    <Field label="Квартира" />
                  </div>
                </section>
              )}

              <section className="c-co__sec">
                <h3 className="c-co__sec-title">Способ оплаты</h3>
                <div className="c-co__tiles c-co__tiles--grid">
                  <Tile active={payment === 'card'} onClick={() => setPayment('card')}>Банковская карта | СБП</Tile>
                  <Tile active={payment === 'yasplit'} onClick={() => setPayment('yasplit')}>Яндекс Сплит</Tile>
                  <Tile active={payment === 'credit'} onClick={() => setPayment('credit')}>Кредит</Tile>
                  <Tile active={payment === 'instal'} onClick={() => setPayment('instal')}>Рассрочка без переплат</Tile>
                </div>
              </section>

              <section className="c-co__sec">
                <h3 className="c-co__sec-title">Контакты</h3>
                <label className="c-co__field--chk">
                  <input type="checkbox" checked={sameReceiver} onChange={e => setSameReceiver(e.target.checked)} />
                  <span>ФИО получателя совпадает с ФИО покупателя</span>
                </label>
                <div className="c-co__contacts">
                  <Field label="Телефон" required type="tel" />
                  <Field label="Email" required type="email" />
                  <Field label="ФИО" required className="c-co__field--wide" />
                </div>
              </section>

              <div className="c-co__consents">
                <label className="c-co__field--chk">
                  <input type="checkbox" defaultChecked />
                  <span>Даю согласие на <a href="#">обработку персональных данных</a></span>
                </label>
                <label className="c-co__field--chk">
                  <input type="checkbox" />
                  <span>Даю согласие на <a href="#">получение рассылок об акциях и скидках</a></span>
                </label>
              </div>

              <div className="c-co__notes">
                <p>Согласен с условиями <a href="#">продажи</a> и <a href="#">оплаты.</a></p>
                <p>* Стоимость доставки приблизительная, оплачивается по факту доставки.</p>
                <p>* Доставка товара за пределы города расположения ближайшего салона оплачивается дополнительно из расчёта 35 руб за каждый километр, за вычетом 10 км от границы города ближайшего салона.</p>
                <p>* Передача мебели осуществляется на дату, согласованную с Покупателем, в течение дня в период с 9 до 22.</p>
              </div>
            </form>
          </div>

          <aside className="c-co__aside">
            <div className="c-co__aside-inner">
              <div className="c-co__promo">
                <label className="c-co__field c-co__field--promo">
                  <input
                    type="text"
                    placeholder=" "
                    value={promo}
                    onChange={e => setPromo(e.target.value)}
                  />
                  <span>Промокод</span>
                </label>
                <button type="button" className="c-co__promo-btn">Применить</button>
              </div>
              <a href="#" className="c-co__promo-link">Условия предоставления скидки по промо-коду</a>

              <div className="c-co__totals">
                <div className="c-co__total-row">
                  <span>Товары</span>
                  <b>{formatPrice(subtotal)}</b>
                </div>
                <div className="c-co__total-row">
                  <span>Скидка по акции</span>
                  <b>- 0 ₽</b>
                </div>
                <div className="c-co__total-row c-co__total-row--big">
                  <span>Итого к оплате</span>
                  <b>{formatPrice(subtotal)}</b>
                </div>
              </div>

              <button type="submit" className="c-co__submit" onClick={onSubmit}>
                Оформить заказ
              </button>

              <div className="c-co__services">
                <div className="c-co__services-title">Услуги<span className="c-co__services-star">*</span></div>
                <div className="c-co__services-group">
                  <div className="c-co__services-label">Доставка за единицу товара:</div>
                  <div className="c-co__services-line">— Крупногабаритная мебель до 2600 ₽</div>
                  <div className="c-co__services-line">— Мелкогабаритная мебель до 1350 ₽</div>
                </div>
                <div className="c-co__services-group">
                  <div className="c-co__services-label">Подъём за единицу товара:</div>
                  <div className="c-co__services-line">— до 400 ₽ за этаж</div>
                </div>
                <div className="c-co__services-foot">
                  <span className="c-co__services-label">Сборка мебели</span>
                  <a href="#" className="c-co__services-more">Подробнее</a>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />

      {!cookieDismissed && (
        <div className="c-co__cookie">
          <p>
            Мы используем файлы cookie, чтобы улучшить работу сайта. Продолжая
            пользоваться сайтом, вы соглашаетесь на использование cookie.
          </p>
          <button onClick={() => setCookieDismissed(true)}>Принять</button>
        </div>
      )}
    </>
  );
}

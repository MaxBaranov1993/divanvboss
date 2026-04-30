import { useMemo, useState } from 'react';
import Header from './HeaderI.jsx';
import Footer from '../current/Footer.jsx';
import './LoyaltyPage.css';

const TIERS = [
  {
    key: 'bronze',
    name: 'Диванный эксперт',
    sub: 'Бронзовый',
    pct: 3,
    threshold: 'После 1-й покупки от 30 000 ₽',
    perks: [
      'Кешбэк 3% бонусами с любой покупки',
      'Бонусы складываются с акциями и промокодами',
      '1000 ₽ при регистрации + 500 ₽ за заполненный профиль',
    ],
    accent: '#b07a3a',
  },
  {
    key: 'gold',
    name: 'Мебельный ценитель',
    sub: 'Золотой',
    pct: 5,
    threshold: 'При обороте от 200 000 ₽',
    perks: [
      'Кешбэк 5% бонусами',
      'Ранний доступ к распродажам — за 48 ч до старта',
      'X2 бонусов на товар месяца',
      'Персональный менеджер в чате',
    ],
    accent: '#a78035',
    featured: true,
  },
  {
    key: 'platinum',
    name: 'Дизайн-гуру',
    sub: 'Платиновый',
    pct: 10,
    threshold: 'При обороте от 500 000 ₽',
    perks: [
      'Кешбэк 10% бонусами',
      'Бесплатная сборка и подъём на этаж',
      'Бесплатный визит дизайнера-замерщика',
      'X3 бонусов на товар месяца',
      'Приоритетная доставка',
    ],
    accent: '#6c5128',
  },
];

const FACTS = [
  { value: 'до 10%', label: 'бонусами с каждой покупки', accent: true },
  { value: '1500 ₽', label: 'сразу после регистрации и профиля' },
  { value: '+ к акциям', label: 'бонусы складываются с промокодами' },
  { value: '3000 ₽', label: 'за приглашённого друга' },
];

const STEPS = [
  {
    n: '01',
    title: 'Регистрируетесь — получаете 1000 ₽',
    text: 'Введите телефон и подтвердите код из SMS. На счёт сразу падает 1000 бонусов = 1000 ₽.',
  },
  {
    n: '02',
    title: 'Заполняете профиль — ещё 500 ₽',
    text: 'ФИО, e-mail, дата рождения. Эти данные нужны, чтобы поздравлять и присылать персональные офферы.',
  },
  {
    n: '03',
    title: 'Покупаете и копите кешбэк',
    text: 'Бонусы начисляются после доставки — 3, 5 или 10% от суммы чека в зависимости от уровня.',
  },
  {
    n: '04',
    title: 'Списываете на следующую покупку',
    text: 'До 10% от суммы чека можно оплатить бонусами. Они складываются с акциями и промокодами.',
  },
];

const TRIGGERS = [
  {
    when: 'Сразу после регистрации',
    what: '1000 ₽ welcome-бонусов',
    cond: 'Срок жизни — 30 дней. Стимул быстро выбрать первый диван.',
  },
  {
    when: 'Через 3 дня, если профиль не дозаполнен',
    what: '+500 ₽ за полный профиль',
    cond: 'Email + дата рождения — данные для персональных офферов.',
  },
  {
    when: 'На следующий день после доставки',
    what: 'Письмо «вам начислено N бонусов»',
    cond: 'С блоком «X2 бонусов на подушки и аксессуары в этом месяце».',
  },
  {
    when: 'Через 10 дней после доставки',
    what: '+300 ₽ за честный отзыв',
    cond: 'Социальное доказательство для будущих покупателей.',
  },
  {
    when: 'За 60 / 30 / 7 дней до сгорания',
    what: 'Напоминание о неиспользованных бонусах',
    cond: 'Самый сильный возвратный триггер. Recovery rate 15–25%.',
  },
  {
    when: 'В день рождения',
    what: '+1000 ₽ и персональный промокод',
    cond: 'Срок 7 дней — мотивация принять решение быстро.',
  },
  {
    when: 'Через 6 месяцев бездействия',
    what: 'Реактивация: 1000 ₽ + промокод',
    cond: 'Возврат «уснувших» клиентов до того, как они уйдут к конкурентам.',
  },
  {
    when: 'Через 3–4 года после покупки',
    what: '3000 ₽ на обновление мебели',
    cond: 'Цикл смены дивана — 3–5 лет. Ловим второй заход.',
  },
];

const FAQ = [
  {
    q: 'Сколько бонусов я получаю с покупки?',
    a: 'От 3 до 10% от суммы чека — в зависимости от уровня. Новичок получает 3% (Бронзовый), при обороте 200 000 ₽ переходит на 5% (Золотой), при 500 000 ₽ — на 10% (Платиновый).',
  },
  {
    q: 'Бонусы суммируются со скидками и акциями?',
    a: 'Да. Бонусы складываются и с акциями каталога, и с промокодами. Это редкое условие на рынке — большинство магазинов запрещают комбинировать.',
  },
  {
    q: 'Можно ли оплатить бонусами весь заказ?',
    a: 'Бонусами можно оплатить до 10% от суммы чека. На диване за 60 000 ₽ это 6000 ₽ — гарантированная скидка к любой акции.',
  },
  {
    q: 'Когда начисляются бонусы?',
    a: 'После доставки заказа. Это защищает обе стороны: вы получаете бонусы только за реально полученный товар.',
  },
  {
    q: 'Сколько живут бонусы?',
    a: '12 месяцев с момента начисления. За 60, 30 и 7 дней до сгорания мы пришлём напоминание, чтобы вы успели использовать.',
  },
  {
    q: 'Как работает приглашение друга?',
    a: 'В личном кабинете создаётся персональная ссылка. Друг переходит, регистрируется и совершает первую покупку — вам начисляется 3000 ₽ бонусами.',
  },
];

const REFERRAL_LINK = 'mnogomebeli.com/?ref=anna_ivanova';

function pluralBonus(n) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return 'бонус';
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return 'бонуса';
  return 'бонусов';
}

function formatThousands(n) {
  return n.toLocaleString('ru-RU').replace(/,/g, ' ');
}

export default function LoyaltyPage() {
  const [calcSum, setCalcSum] = useState(60000);
  const [calcTier, setCalcTier] = useState('gold');
  const [openFaq, setOpenFaq] = useState(0);
  const [copied, setCopied] = useState(false);

  const tierObj = useMemo(() => TIERS.find((t) => t.key === calcTier), [calcTier]);
  const earned = Math.round((calcSum * tierObj.pct) / 100);
  const maxRedeem = Math.round(calcSum * 0.1);

  const equivalents = useMemo(() => {
    if (earned >= 8000) return 'Хватит на анатомическую подушку, плед и журнальный столик';
    if (earned >= 4000) return 'Хватит на анатомическую подушку и плед';
    if (earned >= 2000) return 'Хватит на анатомическую подушку премиум-серии';
    if (earned >= 1000) return 'Хватит на декоративную подушку для дивана';
    return 'Накопится на аксессуары — подушки, пледы, чехлы';
  }, [earned]);

  function copyRef() {
    if (navigator.clipboard) {
      navigator.clipboard.writeText('https://' + REFERRAL_LINK).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  }

  return (
    <div className="lp-page">
      <Header />

      <div className="container">
        <nav className="lp-crumbs" aria-label="Хлебные крошки">
          <a href="/improved/home">Главная</a>
          <span aria-hidden>›</span>
          <span>Программа лояльности «Доступ к выгоде»</span>
        </nav>

        {/* HERO */}
        <section className="lp-hero">
          <div className="lp-hero__kicker">
            <span className="lp-hero__rule" />
            ПРОГРАММА ЛОЯЛЬНОСТИ
            <span className="lp-hero__rule" />
          </div>
          <h1 className="lp-hero__title">
            До <span className="lp-hero__accent">10%</span> бонусами<br />с каждой покупки
          </h1>
          <p className="lp-hero__lead">
            1500 ₽ сразу после регистрации. Бонусы складываются с акциями и промокодами.
            Никаких скрытых правил — кешбэк за то, что вы уже покупаете.
          </p>
          <div className="lp-hero__cta">
            <button className="lp-btn lp-btn--primary">Зарегистрироваться за 30 секунд</button>
            <button className="lp-btn lp-btn--ghost">Уже участник — войти</button>
          </div>
          <div className="lp-hero__facts">
            {FACTS.map((f, i) => (
              <div key={i} className={'lp-fact' + (f.accent ? ' lp-fact--accent' : '')}>
                <div className="lp-fact__value">{f.value}</div>
                <div className="lp-fact__label">{f.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* CALCULATOR */}
        <section className="lp-calc">
          <div className="lp-section__head">
            <span className="lp-section__kicker">КАЛЬКУЛЯТОР ВЫГОДЫ</span>
            <h2 className="lp-section__title">Сколько вы получите?</h2>
            <p className="lp-section__lead">
              Двиньте слайдер — увидите, сколько бонусов вернётся на ваш счёт и что на них можно купить.
            </p>
          </div>

          <div className="lp-calc__card">
            <div className="lp-calc__controls">
              <label className="lp-calc__label">Сумма покупки</label>
              <div className="lp-calc__sumrow">
                <input
                  type="range"
                  min={10000}
                  max={300000}
                  step={1000}
                  value={calcSum}
                  onChange={(e) => setCalcSum(Number(e.target.value))}
                  className="lp-range"
                />
                <div className="lp-calc__sum">{formatThousands(calcSum)} ₽</div>
              </div>

              <div className="lp-calc__tiers">
                {TIERS.map((t) => (
                  <button
                    key={t.key}
                    className={'lp-calc__tier' + (calcTier === t.key ? ' lp-calc__tier--active' : '')}
                    onClick={() => setCalcTier(t.key)}
                  >
                    <span className="lp-calc__tier-name">{t.sub}</span>
                    <span className="lp-calc__tier-pct">{t.pct}%</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="lp-calc__result">
              <div className="lp-calc__earned">
                <div className="lp-calc__earned-label">Вернётся на счёт</div>
                <div className="lp-calc__earned-value">+{formatThousands(earned)} ₽</div>
                <div className="lp-calc__earned-note">{formatThousands(earned)} {pluralBonus(earned)}</div>
              </div>
              <div className="lp-calc__hint">
                <div className="lp-calc__hint-row">
                  <span>На следующей покупке спишете до</span>
                  <strong>{formatThousands(maxRedeem)} ₽</strong>
                </div>
                <div className="lp-calc__hint-eq">{equivalents}</div>
              </div>
            </div>
          </div>
        </section>

        {/* TIERS */}
        <section className="lp-tiers">
          <div className="lp-section__head">
            <span className="lp-section__kicker">УРОВНИ</span>
            <h2 className="lp-section__title">Чем больше — тем выгоднее</h2>
            <p className="lp-section__lead">
              Уровень присваивается автоматически по сумме всех ваших покупок. Понизиться нельзя.
            </p>
          </div>

          <div className="lp-tiers__grid">
            {TIERS.map((t) => (
              <article
                key={t.key}
                className={'lp-tier' + (t.featured ? ' lp-tier--featured' : '')}
                style={{ '--tier-accent': t.accent }}
              >
                {t.featured && <div className="lp-tier__badge">Популярный</div>}
                <div className="lp-tier__pct">{t.pct}%</div>
                <div className="lp-tier__name">{t.name}</div>
                <div className="lp-tier__sub">{t.sub}</div>
                <div className="lp-tier__threshold">{t.threshold}</div>
                <ul className="lp-tier__perks">
                  {t.perks.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="lp-steps">
          <div className="lp-section__head">
            <span className="lp-section__kicker">КАК ЭТО РАБОТАЕТ</span>
            <h2 className="lp-section__title">4 шага — и вы экономите</h2>
          </div>
          <div className="lp-steps__grid">
            {STEPS.map((s) => (
              <div key={s.n} className="lp-step">
                <div className="lp-step__n">{s.n}</div>
                <div className="lp-step__title">{s.title}</div>
                <div className="lp-step__text">{s.text}</div>
              </div>
            ))}
          </div>
        </section>

        {/* REFERRAL */}
        <section className="lp-ref">
          <div className="lp-ref__inner">
            <div className="lp-ref__col">
              <span className="lp-section__kicker">ПРИГЛАСИ ДРУГА</span>
              <h2 className="lp-ref__title"><span className="lp-ref__num">3000 ₽</span> — вам.<br />И ещё <span className="lp-ref__num">1000 ₽</span> — другу</h2>
              <p className="lp-ref__text">
                Поделитесь персональной ссылкой из личного кабинета. Когда друг сделает первую покупку —
                на ваш счёт упадёт 3000 ₽ бонусами. Ему — приветственная 1000 ₽ за регистрацию по вашей ссылке.
              </p>

              <div className="lp-ref__linkbox">
                <div className="lp-ref__link">{REFERRAL_LINK}</div>
                <button className="lp-btn lp-btn--primary lp-btn--small" onClick={copyRef}>
                  {copied ? 'Скопировано ✓' : 'Скопировать'}
                </button>
              </div>

              <div className="lp-ref__share">
                <span>Поделиться:</span>
                <button className="lp-share-btn" aria-label="WhatsApp">WhatsApp</button>
                <button className="lp-share-btn" aria-label="Telegram">Telegram</button>
                <button className="lp-share-btn" aria-label="VK">VK</button>
              </div>
            </div>

            <div className="lp-ref__viz">
              <div className="lp-ref__bubble lp-ref__bubble--you">
                <div className="lp-ref__avatar">Вы</div>
                <div className="lp-ref__bonus">+3000 ₽</div>
              </div>
              <div className="lp-ref__arrow" aria-hidden>→</div>
              <div className="lp-ref__bubble lp-ref__bubble--friend">
                <div className="lp-ref__avatar">Друг</div>
                <div className="lp-ref__bonus">+1000 ₽</div>
              </div>
            </div>
          </div>
        </section>

        {/* TRIGGERS */}
        <section className="lp-triggers">
          <div className="lp-section__head">
            <span className="lp-section__kicker">КОММУНИКАЦИЯ</span>
            <h2 className="lp-section__title">Когда вы получите бонусы и письма</h2>
            <p className="lp-section__lead">
              Никакого спама — только то, что реально влияет на ваш кошелёк.
            </p>
          </div>
          <div className="lp-triggers__list">
            {TRIGGERS.map((t, i) => (
              <div key={i} className="lp-trigger">
                <div className="lp-trigger__when">{t.when}</div>
                <div className="lp-trigger__what">{t.what}</div>
                <div className="lp-trigger__cond">{t.cond}</div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="lp-faq">
          <div className="lp-section__head">
            <span className="lp-section__kicker">ВОПРОСЫ И ОТВЕТЫ</span>
            <h2 className="lp-section__title">Что обычно спрашивают</h2>
          </div>
          <div className="lp-faq__list">
            {FAQ.map((item, i) => (
              <div
                key={i}
                className={'lp-faq__item' + (openFaq === i ? ' lp-faq__item--open' : '')}
              >
                <button
                  className="lp-faq__q"
                  onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                  aria-expanded={openFaq === i}
                >
                  <span>{item.q}</span>
                  <span className="lp-faq__icon" aria-hidden>{openFaq === i ? '−' : '+'}</span>
                </button>
                {openFaq === i && <div className="lp-faq__a">{item.a}</div>}
              </div>
            ))}
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="lp-final">
          <h2 className="lp-final__title">1500 ₽ ждут на счёте</h2>
          <p className="lp-final__text">
            Регистрация занимает 30 секунд. Приветственные бонусы можно потратить уже на первой покупке.
          </p>
          <button className="lp-btn lp-btn--primary lp-btn--large">Получить 1500 ₽ бонусами</button>
          <div className="lp-final__links">
            <a href="#">Правила программы (PDF)</a>
            <span aria-hidden>·</span>
            <a href="#">Магазины-партнёры</a>
          </div>
        </section>

        {/* WHAT'S NEW NOTE — note for stakeholders */}
        <aside className="lp-note">
          <div className="lp-note__title">Что изменено относительно текущей страницы divanboss.ru/loyalty-program/</div>
          <ul className="lp-note__list">
            <li><strong>Главный оффер «до 10%» вместо «5%»</strong> — на текущей странице тиры скрыты, а главный фактор выгоды не показан.</li>
            <li><strong>Калькулятор</strong> — снимает абстракцию «5%», переводит в рубли и эквиваленты.</li>
            <li><strong>3 тира с понятными порогами</strong> — даёт цель и рост LTV.</li>
            <li><strong>Реферальный блок с UI и шарингом</strong> — на текущей странице механика заявлена, но интерфейса нет.</li>
            <li><strong>Прозрачная карта триггеров</strong> — снимает страх «обманут с бонусами».</li>
            <li><strong>FAQ-разметка</strong> — даёт SEO-сниппеты в Яндексе по запросам «бонусы divanboss», «срок годности бонусов».</li>
          </ul>
        </aside>
      </div>

      <Footer />
    </div>
  );
}

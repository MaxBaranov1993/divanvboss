import { useEffect, useMemo, useState } from 'react';
import Header from './HeaderI.jsx';
import Footer from '../current/Footer.jsx';
import { products, formatPrice } from '../mock/data.js';
import './JournalPage.css';

const CATEGORIES = [
  { slug: 'all',       name: 'Всё',              emoji: '📚' },
  { slug: 'guides',    name: 'Гайды по выбору',  emoji: '🧭' },
  { slug: 'interior',  name: 'Идеи интерьера',   emoji: '🛋' },
  { slug: 'reviews',   name: 'Обзоры моделей',   emoji: '⭐' },
  { slug: 'care',      name: 'Уход и чистка',    emoji: '🧴' },
  { slug: 'trends',    name: 'Тренды 2026',      emoji: '🔥' },
  { slug: 'stories',   name: 'Истории клиентов', emoji: '💬' },
  { slug: 'small',     name: 'Малогабаритка',    emoji: '📐' },
];

const CAT_META = Object.fromEntries(CATEGORIES.map((c) => [c.slug, c]));

const ARTICLES = [
  {
    id: 1,
    slug: 'kak-vybrat-divan-dlya-sna',
    category: 'guides',
    title: 'Как выбрать диван для ежедневного сна: 7 критериев, которые важны только первые 3 года',
    excerpt: 'Механизм, наполнитель, каркас, обивка — разбираем, что ломается первым и на чём реально нельзя экономить, если спите каждую ночь.',
    image: 'https://divanboss.ru/upload/iblock/9d9/fpp0wa3hi3u5oi9s7za22dxn7z53goaf/Frame-2.jpg',
    date: '2026-04-18',
    dateLabel: '18 апреля 2026',
    readTime: 9,
    author: 'Анна Котова',
    authorRole: 'Дизайнер-консультант',
    authorAvatar: 'https://i.pravatar.cc/80?img=5',
    views: 12840,
    featured: true,
    tags: ['диван-кровать', 'еврокнижка', 'независимые пружины'],
    productIds: [1, 3],
  },
  {
    id: 2,
    slug: 'malenkaya-gostinaya-18-kvm',
    category: 'small',
    title: 'Гостиная 18 м²: как впихнуть диван, ТВ и рабочее место без ощущения склада',
    excerpt: 'Три готовые планировки с точными размерами мебели, зонирование ковром и светом, бюджет от 84 000 ₽.',
    image: 'https://divanboss.ru/upload/iblock/681/slxsapblj1cxyy27uv9umbasnrglxkj8/Frame-1.jpg',
    date: '2026-04-15',
    dateLabel: '15 апреля',
    readTime: 7,
    author: 'Михаил Соловьёв',
    authorRole: 'Дизайнер интерьера',
    authorAvatar: 'https://i.pravatar.cc/80?img=12',
    views: 9410,
    featured: true,
    tags: ['малогабаритка', 'хрущёвка', 'зонирование'],
    productIds: [2],
  },
  {
    id: 3,
    slug: 'velur-ili-shenill',
    category: 'guides',
    title: 'Велюр или шенилл: что износится быстрее, если дома кот и двое детей',
    excerpt: 'Тест 4 обивок на пиллинг, затяжки и пятна от сока. Снимки до / после 6 месяцев использования.',
    image: 'https://divanboss.ru/upload/iblock/a49/zndm6gfykm5mpt51754njrj50v9wjz4i/Frame-5822.jpg',
    date: '2026-04-12',
    dateLabel: '12 апреля',
    readTime: 6,
    author: 'Анна Котова',
    authorRole: 'Дизайнер-консультант',
    authorAvatar: 'https://i.pravatar.cc/80?img=5',
    views: 7320,
    featured: false,
    tags: ['обивка', 'велюр', 'шенилл', 'коты'],
    productIds: [1],
  },
  {
    id: 4,
    slug: 'uglovoy-divan-levyy-ili-pravyy',
    category: 'guides',
    title: 'Левый или правый угол: простая шпаргалка, чтобы не ошибиться при заказе',
    excerpt: 'Разбираемся, как производители определяют сторону угла и почему вашу «правую» могут собрать зеркально.',
    image: 'https://divanboss.ru/upload/iblock/89b/v8kqleqtm2o6gosixih9a9s5wmbox1av/Frame-5820.jpg',
    date: '2026-04-10',
    dateLabel: '10 апреля',
    readTime: 4,
    author: 'Редакция',
    authorRole: 'Divan BOSS',
    authorAvatar: 'https://i.pravatar.cc/80?img=68',
    views: 15230,
    featured: false,
    tags: ['угловой диван', 'выбор'],
    productIds: [3],
  },
  {
    id: 5,
    slug: 'skandi-stil-2026',
    category: 'trends',
    title: 'Скандинавский стиль в 2026: почему белое ушло, а пришли охра и тёмное дерево',
    excerpt: 'Пять цветовых связок, которые заменили холодный минимализм. Подборка 12 моделей под новый стандарт.',
    image: 'https://divanboss.ru/upload/iblock/5e6/cafv6n43kgwnifod6rt5yak8111tp0m9/Frame-5.jpg',
    date: '2026-04-08',
    dateLabel: '8 апреля',
    readTime: 5,
    author: 'Михаил Соловьёв',
    authorRole: 'Дизайнер интерьера',
    authorAvatar: 'https://i.pravatar.cc/80?img=12',
    views: 5840,
    featured: false,
    tags: ['скандинавский стиль', 'тренды'],
    productIds: [1, 2],
  },
  {
    id: 6,
    slug: 'chistka-divana-domashnimi-sredstvami',
    category: 'care',
    title: 'Чистка дивана дома: что работает, а что испортит обивку навсегда',
    excerpt: 'Сода, уксус, хозяйственное мыло, Vanish — тестируем на 6 типах пятен и показываем, где кроется подстава.',
    image: 'https://divanboss.ru/upload/iblock/f45/4c0j99hri79yxkb4h3oo0md0gqw3o3kv/Frame-6.jpg',
    date: '2026-04-05',
    dateLabel: '5 апреля',
    readTime: 8,
    author: 'Ирина Гришина',
    authorRole: 'Эксперт по текстилю',
    authorAvatar: 'https://i.pravatar.cc/80?img=47',
    views: 22180,
    featured: false,
    tags: ['уход', 'чистка', 'пятна'],
    productIds: [],
  },
  {
    id: 7,
    slug: 'obzor-divan-boss-trend',
    category: 'reviews',
    title: 'Обзор «Босс Тренд»: разобрали до каркаса, чтобы понять, за что вы платите 89 900 ₽',
    excerpt: 'Снимаем обивку, смотрим на пружинный блок, проверяем механизм 500 раз. Объективно — плюсы и минусы.',
    image: 'https://divanboss.ru/upload/iblock/f78/muzhhccs75e1hnbgu2skd3phwtnceqdo/9da15afe0abb0cf958ab7f3da6352d54.jpg',
    date: '2026-04-02',
    dateLabel: '2 апреля',
    readTime: 11,
    author: 'Редакция',
    authorRole: 'Divan BOSS',
    authorAvatar: 'https://i.pravatar.cc/80?img=68',
    views: 18470,
    featured: false,
    tags: ['обзор', 'Босс Тренд'],
    productIds: [1],
  },
  {
    id: 8,
    slug: 'istoriya-semi-kravchenko',
    category: 'stories',
    title: 'История семьи Кравченко: как обставили первую квартиру за 214 000 ₽ и не поругались',
    excerpt: 'Планировка, список покупок, реальный бюджет и фото «до / после». Что бы они сделали иначе.',
    image: 'https://divanboss.ru/upload/iblock/b4c/tu2h05iu8i3syaq1f30c5a6691osnxvc/Frame-8.jpg',
    date: '2026-03-28',
    dateLabel: '28 марта',
    readTime: 6,
    author: 'Анна Котова',
    authorRole: 'Дизайнер-консультант',
    authorAvatar: 'https://i.pravatar.cc/80?img=5',
    views: 8120,
    featured: false,
    tags: ['истории', 'первая квартира', 'бюджет'],
    productIds: [2],
  },
  {
    id: 9,
    slug: 'spalnya-12-kvm-krovat-i-shkaf',
    category: 'small',
    title: 'Спальня 12 м²: кровать 160×200 + шкаф + комод — без ощущения коробки',
    excerpt: 'Три реальные планировки, размеры с миллиметрами, расстановка света и выбор корпусной мебели.',
    image: 'https://divanboss.ru/upload/iblock/521/14fa6yjauhqyuey7ywfeldvds9hlnrro/Frame-3.jpg',
    date: '2026-03-25',
    dateLabel: '25 марта',
    readTime: 8,
    author: 'Михаил Соловьёв',
    authorRole: 'Дизайнер интерьера',
    authorAvatar: 'https://i.pravatar.cc/80?img=12',
    views: 11230,
    featured: false,
    tags: ['спальня', 'малогабаритка', 'планировка'],
    productIds: [2],
  },
  {
    id: 10,
    slug: 'matras-nezavisimye-pruzhiny',
    category: 'guides',
    title: 'Независимые пружины против пены: что выбрать для спины, если вам за 35',
    excerpt: 'Рассказываем вместе с ортопедом: когда матрас жёсткий, а когда — наоборот, мягкий. И почему бокс-блоки — почти всегда плохо.',
    image: 'https://divanboss.ru/upload/iblock/9dd/03i8pw8eukthups4tymq2brhn4pr6pjn/Frame-4.jpg',
    date: '2026-03-22',
    dateLabel: '22 марта',
    readTime: 9,
    author: 'Ирина Гришина',
    authorRole: 'Эксперт по текстилю',
    authorAvatar: 'https://i.pravatar.cc/80?img=47',
    views: 14560,
    featured: false,
    tags: ['матрасы', 'спина', 'независимые пружины'],
    productIds: [],
  },
  {
    id: 11,
    slug: 'kuhnya-gostinaya-bez-peregorodki',
    category: 'interior',
    title: 'Кухня-гостиная без перегородки: 6 приёмов зонирования, которые работают',
    excerpt: 'Разные полы, «островок», потолочные балки, ковёр, диван спинкой к кухне. Где лучше ставить ТВ.',
    image: 'https://divanboss.ru/upload/iblock/c46/7g3enb6n0ew6vnapxdb6c5vtvisrmm55/Frame-7.jpg',
    date: '2026-03-18',
    dateLabel: '18 марта',
    readTime: 7,
    author: 'Михаил Соловьёв',
    authorRole: 'Дизайнер интерьера',
    authorAvatar: 'https://i.pravatar.cc/80?img=12',
    views: 9870,
    featured: false,
    tags: ['кухня-гостиная', 'зонирование'],
    productIds: [1],
  },
  {
    id: 12,
    slug: 'trendy-mebeli-2026',
    category: 'trends',
    title: 'Мебельные тренды 2026: модульность, карамель, мягкие формы. Что уйдёт из моды',
    excerpt: 'Разобрали подборки Milan Design Week и Maison&Objet. Что купить сейчас, а с чем лучше подождать год.',
    image: 'https://divanboss.ru/upload/iblock/815/wy572mghr7px7mosayz5w8exepq7j2o4/Frame-9.jpg',
    date: '2026-03-15',
    dateLabel: '15 марта',
    readTime: 6,
    author: 'Редакция',
    authorRole: 'Divan BOSS',
    authorAvatar: 'https://i.pravatar.cc/80?img=68',
    views: 7340,
    featured: false,
    tags: ['тренды', '2026', 'модульные диваны'],
    productIds: [3],
  },
];

const POPULAR_TAGS = [
  'угловой диван', 'диван-кровать', 'велюр', 'малогабаритка',
  'еврокнижка', 'независимые пружины', 'кровать с ПМ', 'хрущёвка',
  'скандинавский стиль', 'модульный диван', 'обзор', 'уход',
];

function pluralViews(n) {
  const mod10 = n % 10, mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return 'просмотр';
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return 'просмотра';
  return 'просмотров';
}

function pluralMin(n) {
  const mod10 = n % 10, mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return 'минута';
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return 'минуты';
  return 'минут';
}

function formatViews(n) {
  if (n >= 1000) return (n / 1000).toFixed(1).replace('.', ',') + 'K';
  return String(n);
}

export default function JournalPage() {
  const [active, setActive] = useState('all');
  const [query, setQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);

  // SEO: title, description, JSON-LD Blog
  useEffect(() => {
    const prevTitle = document.title;
    document.title = 'Журнал Divan BOSS — гайды, обзоры и идеи интерьера от фабрики';
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    const prevDesc = meta.getAttribute('content');
    meta.setAttribute(
      'content',
      'Как выбрать диван, матрас и кровать, как ухаживать за обивкой, идеи для малогабаритных квартир. Экспертные материалы от фабрики мебели Divan BOSS.'
    );

    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: 'Журнал Divan BOSS',
      description: 'Гайды по выбору мебели, обзоры моделей, идеи интерьера и уход.',
      blogPost: ARTICLES.map((a) => ({
        '@type': 'BlogPosting',
        headline: a.title,
        image: a.image,
        datePublished: a.date,
        author: { '@type': 'Person', name: a.author },
        publisher: { '@type': 'Organization', name: 'Divan BOSS' },
        articleSection: CAT_META[a.category]?.name,
        wordCount: a.readTime * 220,
      })),
    };
    const script = document.createElement('script');
    script.id = 'i-journal-jsonld';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(jsonLd);
    document.head.appendChild(script);

    return () => {
      document.title = prevTitle;
      if (prevDesc !== null) meta.setAttribute('content', prevDesc);
      const s = document.getElementById('i-journal-jsonld');
      if (s) s.remove();
    };
  }, []);

  const filtered = useMemo(() => {
    let list = ARTICLES;
    if (active !== 'all') list = list.filter((a) => a.category === active);
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q) ||
          a.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return list;
  }, [active, query]);

  const hero = filtered.find((a) => a.featured) || filtered[0];
  const secondary = filtered.filter((a) => a.id !== hero?.id).slice(0, 2);
  const rest = filtered.filter(
    (a) => a.id !== hero?.id && !secondary.find((s) => s.id === a.id)
  );

  const editorsPick = ARTICLES.filter((a) => a.views > 10000).slice(0, 5);
  const totalArticles = ARTICLES.length;

  return (
    <>
      <Header />

      <main className="j-page">
        {/* Breadcrumbs */}
        <nav className="container j-crumbs" aria-label="Хлебные крошки">
          <a href="/improved/home">Главная</a>
          <span aria-hidden="true">›</span>
          <span>Журнал</span>
        </nav>

        {/* Masthead — editorial */}
        <section className="container j-masthead">
          <div className="j-masthead__kicker">
            <span className="j-masthead__rule" aria-hidden="true" />
            <span>Divan BOSS · Издание</span>
          </div>
          <h1 className="j-masthead__h1">Журнал</h1>
          <p className="j-masthead__tagline">
            О мебели, планировках и жизни дома — от дизайнеров и инженеров фабрики.
          </p>
        </section>

        {/* Sticky subnav — text tabs + expandable search */}
        <div className="j-subnav">
          <div className="container j-subnav__row">
            <nav className="j-tabs" role="tablist" aria-label="Категории журнала">
              {CATEGORIES.map((c) => {
                const count =
                  c.slug === 'all'
                    ? ARTICLES.length
                    : ARTICLES.filter((a) => a.category === c.slug).length;
                return (
                  <button
                    key={c.slug}
                    type="button"
                    role="tab"
                    aria-selected={active === c.slug}
                    className={`j-tab ${active === c.slug ? 'is-active' : ''}`}
                    onClick={() => setActive(c.slug)}
                  >
                    {c.name}
                    <sup className="j-tab__count">{count}</sup>
                  </button>
                );
              })}
            </nav>

            <form
              className={`j-search ${searchOpen || query ? 'is-open' : ''}`}
              onSubmit={(e) => e.preventDefault()}
              role="search"
            >
              <button
                type="button"
                className="j-search__toggle"
                onClick={() => setSearchOpen((s) => !s)}
                aria-label={searchOpen ? 'Закрыть поиск' : 'Открыть поиск'}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5" />
                </svg>
              </button>
              <input
                type="search"
                className="j-search__input"
                placeholder="Найти статью"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Поиск по журналу"
                onBlur={() => { if (!query) setSearchOpen(false); }}
              />
              {query && (
                <button
                  type="button"
                  className="j-search__clear"
                  onClick={() => { setQuery(''); setSearchOpen(false); }}
                  aria-label="Очистить"
                >×</button>
              )}
            </form>
          </div>
        </div>

        {/* Hero + secondary */}
        {hero && (
          <section className="container j-hero-grid">
            <HeroArticle a={hero} />
            <div className="j-hero-grid__side">
              {secondary.map((a) => (
                <SecondaryArticle key={a.id} a={a} />
              ))}
              {secondary.length === 0 && <EmptyTile />}
            </div>
          </section>
        )}

        {/* Main: cards + sidebar */}
        <section className="container j-body">
          <div className="j-body__main">
            <header className="j-section-head">
              <h2 className="j-section-title">
                {active === 'all' ? 'Свежее в журнале' : CAT_META[active]?.name}
              </h2>
              <span className="j-section-count">
                {filtered.length} {filtered.length === 1 ? 'статья' : 'статей'}
              </span>
            </header>

            {rest.length === 0 ? (
              <div className="j-empty">
                <div className="j-empty__emoji">📭</div>
                <div className="j-empty__title">По вашему запросу ничего не нашли</div>
                <div className="j-empty__text">
                  Попробуйте другую категорию или сбросьте поиск —
                  <button
                    type="button"
                    className="j-empty__link"
                    onClick={() => { setActive('all'); setQuery(''); }}
                  >
                    показать все статьи
                  </button>
                </div>
              </div>
            ) : (
              <div className="j-cards">
                {rest.map((a) => (
                  <ArticleCard key={a.id} a={a} />
                ))}
              </div>
            )}

            {/* CTA inside feed */}
            <aside className="j-inline-cta">
              <div className="j-inline-cta__text">
                <div className="j-inline-cta__eyebrow">Помощь дизайнера — бесплатно</div>
                <h3 className="j-inline-cta__h3">
                  Не хотите читать 10 гайдов? Подберём мебель под вашу комнату за 15 минут.
                </h3>
                <p className="j-inline-cta__sub">
                  Оставьте размеры — дизайнер пришлёт 3 варианта с ценами в мессенджер.
                </p>
              </div>
              <form
                className="j-inline-cta__form"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="tel"
                  className="j-inline-cta__input"
                  placeholder="+7 ___ ___ __ __"
                  aria-label="Телефон"
                  required
                />
                <button type="submit" className="j-inline-cta__btn">
                  Подобрать мебель →
                </button>
              </form>
            </aside>
          </div>

          {/* Sidebar */}
          <aside className="j-side">
            {/* Newsletter */}
            <div className="j-widget j-widget--primary">
              <div className="j-widget__emoji" aria-hidden="true">✉</div>
              <h3 className="j-widget__title">Одно письмо в неделю</h3>
              <p className="j-widget__text">
                Свежие гайды, акции фабрики и закрытые промокоды. Отписаться — в один клик.
              </p>
              <form
                className="j-widget__form"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="email"
                  className="j-widget__input"
                  placeholder="вас@email.ru"
                  aria-label="Email"
                />
                <button type="submit" className="j-widget__btn">Подписаться</button>
              </form>
              <div className="j-widget__agree">
                Нажимая, вы соглашаетесь с <a href="#">политикой обработки</a>
              </div>
            </div>

            {/* Editor's pick */}
            <div className="j-widget">
              <h3 className="j-widget__title j-widget__title--simple">
                <span className="j-widget__pulse" aria-hidden="true" />
                Читают чаще всего
              </h3>
              <ol className="j-top">
                {editorsPick.map((a, i) => (
                  <li key={a.id} className="j-top__item">
                    <span className="j-top__num">{i + 1}</span>
                    <a className="j-top__link" href={`/improved/journal/${a.slug}`}>
                      <span className="j-top__title">{a.title}</span>
                      <span className="j-top__meta">
                        {CAT_META[a.category]?.name} · {formatViews(a.views)} {pluralViews(a.views)}
                      </span>
                    </a>
                  </li>
                ))}
              </ol>
            </div>

            {/* Popular tags for SEO link-juice */}
            <div className="j-widget">
              <h3 className="j-widget__title j-widget__title--simple">Популярные темы</h3>
              <div className="j-tags">
                {POPULAR_TAGS.map((t) => (
                  <a key={t} href="#" className="j-tag">{t}</a>
                ))}
              </div>
            </div>

            {/* Mini product shelf — CRO */}
            <div className="j-widget j-widget--shelf">
              <h3 className="j-widget__title j-widget__title--simple">Товары из статей</h3>
              <div className="j-shelf">
                {products.slice(0, 3).map((p) => (
                  <a key={p.id} href="/improved/product" className="j-shelf__item">
                    <div className="j-shelf__img">
                      <img src={p.image} alt={p.name} loading="lazy" />
                      {p.discount > 0 && (
                        <span className="j-shelf__sale">−{p.discount}%</span>
                      )}
                    </div>
                    <div className="j-shelf__body">
                      <div className="j-shelf__name">{p.name}</div>
                      <div className="j-shelf__price">
                        <b>{formatPrice(p.price)}</b>
                        {p.oldPrice && <s>{formatPrice(p.oldPrice)}</s>}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
              <a href="/improved/home#catalog" className="j-shelf__all">Весь каталог →</a>
            </div>
          </aside>
        </section>

        {/* SEO text block */}
        <section className="container j-seo">
          <h2>О журнале Divan BOSS</h2>
          <p>
            Журнал Divan BOSS — это экспертные материалы о выборе и использовании
            мебели: диванов, кроватей, матрасов, шкафов и корпусной мебели.
            Статьи пишут дизайнеры-консультанты салонов, технологи фабрики и
            приглашённые эксперты по текстилю и эргономике.
          </p>
          <h3>Кому пригодится</h3>
          <p>
            Покупателям, которые выбирают мебель впервые и хотят разобраться
            в терминах: «независимый пружинный блок», «шенилл vs велюр»,
            «еврокнижка vs аккордеон». А ещё — тем, кто планирует ремонт
            и ищет идеи планировки для малогабаритных комнат.
          </p>
          <h3>Как мы готовим материалы</h3>
          <p>
            Каждая статья проходит проверку у профильного специалиста: обивку
            комментирует эксперт по текстилю, механизмы — инженер производства,
            планировки — практикующий дизайнер интерьера. Цены и фото актуальны
            на момент публикации и обновляются раз в квартал.
          </p>
        </section>
      </main>

      <Footer />
    </>
  );
}

function HeroArticle({ a }) {
  const cat = CAT_META[a.category];
  return (
    <article className="j-hero">
      <a href={`/improved/journal/${a.slug}`} className="j-hero__link">
        <div className="j-hero__media">
          <img src={a.image} alt={a.title} loading="eager" fetchpriority="high" />
          <span className="j-hero__pill">
            <span aria-hidden="true">{cat?.emoji}</span> {cat?.name}
          </span>
          <span className="j-hero__featured">Главное</span>
        </div>
        <div className="j-hero__body">
          <h2 className="j-hero__title">{a.title}</h2>
          <p className="j-hero__excerpt">{a.excerpt}</p>
          <footer className="j-hero__foot">
            <img className="j-hero__avatar" src={a.authorAvatar} alt="" />
            <div className="j-hero__who">
              <b>{a.author}</b>
              <span>{a.authorRole}</span>
            </div>
            <span className="j-hero__dot" aria-hidden="true">·</span>
            <span className="j-hero__meta-item">{a.dateLabel}</span>
            <span className="j-hero__dot" aria-hidden="true">·</span>
            <span className="j-hero__meta-item">
              {a.readTime} {pluralMin(a.readTime)} чтения
            </span>
          </footer>
        </div>
      </a>
    </article>
  );
}

function SecondaryArticle({ a }) {
  const cat = CAT_META[a.category];
  return (
    <article className="j-sec">
      <a href={`/improved/journal/${a.slug}`} className="j-sec__link">
        <div className="j-sec__media">
          <img src={a.image} alt={a.title} loading="lazy" />
          <span className="j-sec__pill">{cat?.name}</span>
        </div>
        <div className="j-sec__body">
          <h3 className="j-sec__title">{a.title}</h3>
          <div className="j-sec__meta">
            {a.dateLabel} · {a.readTime} {pluralMin(a.readTime)}
          </div>
        </div>
      </a>
    </article>
  );
}

function ArticleCard({ a }) {
  const cat = CAT_META[a.category];
  return (
    <article className="j-card">
      <a href={`/improved/journal/${a.slug}`} className="j-card__link">
        <div className="j-card__media">
          <img src={a.image} alt={a.title} loading="lazy" />
          <span className="j-card__pill">
            <span aria-hidden="true">{cat?.emoji}</span> {cat?.name}
          </span>
        </div>
        <div className="j-card__body">
          <h3 className="j-card__title">{a.title}</h3>
          <p className="j-card__excerpt">{a.excerpt}</p>
          <footer className="j-card__foot">
            <span className="j-card__author">
              <img src={a.authorAvatar} alt="" />
              <span>{a.author}</span>
            </span>
            <span className="j-card__meta">
              {a.dateLabel} · {a.readTime} {pluralMin(a.readTime)} · 👁 {formatViews(a.views)}
            </span>
          </footer>
        </div>
      </a>
    </article>
  );
}

function EmptyTile() {
  return (
    <div className="j-sec j-sec--empty">
      <div className="j-sec__media j-sec__media--empty">
        <span aria-hidden="true">📖</span>
      </div>
      <div className="j-sec__body">
        <h3 className="j-sec__title">Скоро новые статьи</h3>
        <div className="j-sec__meta">Подпишитесь на рассылку — пришлём первыми</div>
      </div>
    </div>
  );
}

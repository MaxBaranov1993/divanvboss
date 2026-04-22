export const categories = [
  { slug: 'sale', name: 'Распродажа', accent: true },
  { slug: 'divany', name: 'Диваны' },
  { slug: 'krovati', name: 'Кровати' },
  { slug: 'matrasy', name: 'Матрасы' },
  { slug: 'stenki', name: 'Стенки' },
  { slug: 'shkafy', name: 'Шкафы' },
  { slug: 'tumby', name: 'Тумбы' },
  { slug: 'komody', name: 'Комоды' },
  { slug: 'sleep-acc', name: 'Аксессуары для сна' },
  { slug: 'stoly', name: 'Столы' },
  { slug: 'stulya', name: 'Стулья' },
  { slug: 'kresla', name: 'Кресла' },
  { slug: 'pufy', name: 'Пуфы' },
];

export const SITE_LOGO = 'https://divanboss.ru/local/templates/db_2025/frontend/dist/assets/img/svg/logo-white-2022.svg';

export const popularCategories = [
  { slug: 'sale', name: 'Скидки', image: 'https://divanboss.ru/upload/iblock/681/slxsapblj1cxyy27uv9umbasnrglxkj8/Frame-1.jpg' },
  { slug: 'divany', name: 'Диваны', image: 'https://divanboss.ru/upload/iblock/9d9/fpp0wa3hi3u5oi9s7za22dxn7z53goaf/Frame-2.jpg' },
  { slug: 'krovati', name: 'Кровати', image: 'https://divanboss.ru/upload/iblock/521/14fa6yjauhqyuey7ywfeldvds9hlnrro/Frame-3.jpg' },
  { slug: 'matrasy', name: 'Матрасы', image: 'https://divanboss.ru/upload/iblock/9dd/03i8pw8eukthups4tymq2brhn4pr6pjn/Frame-4.jpg' },
  { slug: 'stenki', name: 'Стенки', image: 'https://divanboss.ru/upload/iblock/5e6/cafv6n43kgwnifod6rt5yak8111tp0m9/Frame-5.jpg' },
  { slug: 'shkafy', name: 'Шкафы', image: 'https://divanboss.ru/upload/iblock/f45/4c0j99hri79yxkb4h3oo0md0gqw3o3kv/Frame-6.jpg' },
  { slug: 'tumby', name: 'Тумбы', image: 'https://divanboss.ru/upload/iblock/c46/7g3enb6n0ew6vnapxdb6c5vtvisrmm55/Frame-7.jpg' },
  { slug: 'komody', name: 'Комоды', image: 'https://divanboss.ru/upload/iblock/b4c/tu2h05iu8i3syaq1f30c5a6691osnxvc/Frame-8.jpg' },
  { slug: 'pufy', name: 'Пуфы', image: 'https://divanboss.ru/upload/iblock/815/wy572mghr7px7mosayz5w8exepq7j2o4/Frame-9.jpg' },
  { slug: 'stulya', name: 'Стулья', image: 'https://divanboss.ru/upload/iblock/537/qndlx35zt9pyfumxhsprjdku37u2ik57/Frame-10-_1_.jpg' },
];

export const specialOffers = [
  { title: 'СУПЕРКОМФОРТ', alt: 'Диван + пуф + стол + шкаф', src: 'https://divanboss.ru/upload/iblock/e58/ruwcsi8qf4680tuo4wh50cxjtolnjybm/Frame-2223.jpg' },
  { title: 'Журнальный стол в подарок', alt: 'При покупке дивана Boss Prime', src: 'https://divanboss.ru/upload/iblock/6ee/ut3hfqdg2jwoccgep4kpyxoy4vtm2m7i/INT_Boss_Prime_MAX_ygol_royal_agat_0001_1284kh1000.jpg' },
  { title: 'Скидка 20 000 ₽ на кровать Босс ХО', alt: 'Кровать Boss XO', src: 'https://divanboss.ru/upload/iblock/6ac/td39gtwccwept7s09s02kp9ie5ph6rud/INT_bed_Boss_XO_160_monolith_blue_77_0002_1284kh1000.jpg' },
  { title: 'Акция «2 по цене 1»', alt: 'Шкаф Рим', src: 'https://divanboss.ru/upload/iblock/c04/ytxbboz1abx7b7i9xyj47cyf55h9lrlp/INT_shkaf_RIM_120_kashemir_grey_stellage_0000_1284kh1000.jpg' },
];

export const heroBanners = [
  { src: 'https://divanboss.ru/upload/resize_cache/iblock/a63/g7xlauk3ziwhmmyg6js4569o7gxccrxr/1346_450_1/1920kh600-DB-Aprel-2026-Superkomfort-dlya-dachi.png', alt: 'Суперкомфорт для дачи' },
  { src: 'https://divanboss.ru/upload/resize_cache/iblock/eb4/zsts6ke8ahzfsxmhn8dcczf361ie9384/1346_450_1/1920kh600-DB-Aprel-2026-Divan-podstroitsya.png', alt: 'Диван подстроится' },
  { src: 'https://divanboss.ru/upload/resize_cache/iblock/46f/fiy763bfi74stpxb3hc77shr8chlmmtv/1346_450_1/1920kh600-DB-Aprel-2026-Praktichnyy-vybor-_1_.png', alt: 'Практичный выбор для дома' },
  { src: 'https://divanboss.ru/upload/resize_cache/iblock/a01/pz2jifnr9hnn9rkq1yt20e34lc23fpdf/1346_450_1/1920kh600-DB-Aprel-2026-Komfort.png', alt: 'Комфорт говорит' },
];

export const products = [
  { id: 1, name: 'Диван Босс велюр Алькантара пепел', slug: 'divan-boss-alkantara-pepel', image: 'https://divanboss.ru/upload/resize_cache/iblock/f78/muzhhccs75e1hnbgu2skd3phwtnceqdo/480_300_1/9da15afe0abb0cf958ab7f3da6352d54.jpg', price: 57400, oldPrice: 115999, discount: 51, category: 'Диваны', isHit: true, isNew: false, inStock: true, mechanism: 'Независимые пружины, еврокнижка', sizes: ['140×200', '160×200', '180×200'], colors: ['#8a8a8a'] },
  { id: 2, name: 'Босс Мини Кровать+ПМ 90*200 велюр Монолит аква', slug: 'boss-mini-monolit-akva', image: 'https://divanboss.ru/upload/resize_cache/iblock/db1/1uf8hch4c67gs485ps7vumtn0839yy7v/480_300_1/Frame-5815.jpg', price: 29700, oldPrice: 41999, discount: 29, category: 'Кровати', isHit: true, isNew: false, inStock: true, mechanism: 'С подъемным механизмом 90x200', sizes: ['90×200'], colors: ['#8ba6ad'] },
  { id: 3, name: 'Диван Кинг велюр Алькантара серый', slug: 'divan-king-alkantara-seraya', image: 'https://divanboss.ru/upload/resize_cache/iblock/89b/v8kqleqtm2o6gosixih9a9s5wmbox1av/480_300_1/0e85yydbmdm2kqk3znnvb4b72sehklu1.jpg', price: 66700, oldPrice: 149999, discount: 55, category: 'Диваны', isHit: true, isNew: false, inStock: true, mechanism: 'Независимые пружины, еврокнижка', sizes: ['140×200', '160×200'], colors: ['#4a4a4a'] },
  { id: 4, name: 'Босс Стандарт 180*236 шкаф распашной 4Д+ящики Кашемир', slug: 'boss-standart-180-236-kashemir', image: 'https://divanboss.ru/upload/resize_cache/iblock/936/s9hmfw05hbkb7qr7xh7k5ltn0ag5mdcs/480_300_1/Frame-2915.jpg', price: 34999, oldPrice: null, discount: 0, category: 'Шкафы', isHit: true, isNew: false, inStock: true, mechanism: '', sizes: ['180×236'], colors: ['#d9d1c3'] },
  { id: 5, name: 'Диван Босс Тренд Шенилл Клауд крем', slug: 'divan-boss-trend-cloud-milk', image: 'https://divanboss.ru/upload/resize_cache/iblock/751/bw5hzuzp5rv929z5t25c2pb77yrp1kx7/480_300_1/o4m29bj45ifh9e2qptntxxc4jq9jbaja.jpg', price: 62400, oldPrice: 124999, discount: 50, category: 'Диваны', isHit: false, isNew: true, inStock: true, mechanism: 'Независимые пружины, еврокнижка', sizes: ['140×200', '160×200'], colors: ['#e8dcc6'] },
  { id: 6, name: 'Идея 120 шкаф распашной 3Д+ящики Кашемир', slug: 'ideya-120-kashemir', image: 'https://divanboss.ru/upload/resize_cache/iblock/438/fdhym5ibyzr2zus673j3kgwwizmicafb/480_300_1/Frame_2039.jpg', price: 21999, oldPrice: 28999, discount: 24, category: 'Шкафы', isHit: false, isNew: true, inStock: true, mechanism: '', sizes: ['120×230'], colors: ['#d9d1c3'] },
  { id: 7, name: 'Угловой диван Босс Софт Модуль Макс Вельвет Корд бежевый', slug: 'divan-boss-soft-modul-max-bezh', image: 'https://divanboss.ru/upload/resize_cache/iblock/d4d/8im1n50umcqr1d3hgvekpmgsy9xxxqcd/480_300_1/1vplv5g1o3lb4pdgk4gk9rl082c1nnrm.jpg', price: 89900, oldPrice: 159999, discount: 44, category: 'Диваны', isHit: false, isNew: true, inStock: true, mechanism: 'Еврокнижка, модульный', sizes: ['Модульный'], colors: ['#c9b79a'] },
  { id: 8, name: 'Пуф «Босс»', slug: 'puf-boss', image: 'https://divanboss.ru/upload/resize_cache/iblock/d4d/8im1n50umcqr1d3hgvekpmgsy9xxxqcd/480_300_1/1vplv5g1o3lb4pdgk4gk9rl082c1nnrm.jpg', price: 4900, oldPrice: 7900, discount: 38, category: 'Пуфы', isHit: true, isNew: false, inStock: true, mechanism: '', sizes: [], colors: ['#8a6b4b'] },
];

export const mainProduct = {
  ...products[1],
  mechanism: 'Подъёмный механизм',
  sizes: ['90×200'],
};

// Галерея — 13 фото с сайта divanboss.ru (resize_cache 1310×610)
export const mainProductGallery = [
  'https://divanboss.ru/upload/resize_cache/iblock/db1/1uf8hch4c67gs485ps7vumtn0839yy7v/1310_610_1/Frame-5815.jpg',
  'https://divanboss.ru/upload/resize_cache/iblock/a49/zndm6gfykm5mpt51754njrj50v9wjz4i/1310_610_1/Frame-5822.jpg',
  'https://divanboss.ru/upload/resize_cache/iblock/153/ufk73avru0308k6e4uw4f8330wzjfgh1/1310_610_1/Frame-5816.jpg',
  'https://divanboss.ru/upload/resize_cache/iblock/88d/fy1rvfc6lidiiuql5cd71rx70uev8jvs/1310_610_1/Frame-5805.jpg',
  'https://divanboss.ru/upload/resize_cache/iblock/229/n7y3flszwfkw59ypgb7j1klzvyfc0325/1310_610_1/Frame-5818.jpg',
  'https://divanboss.ru/upload/resize_cache/iblock/f31/78qjq8xn9ch97lf62mz7l0bq1uosyisp/1310_610_1/Frame-5889.jpg',
  'https://divanboss.ru/upload/resize_cache/iblock/ecc/ehzj9zl9byfqbxd7311n32u1tlrodp99/1310_610_1/Frame-5809.jpg',
  'https://divanboss.ru/upload/resize_cache/iblock/744/u7mrwl6b7qphhcvkkq3do04ceiliyu4w/1310_610_1/Frame-5810.jpg',
  'https://divanboss.ru/upload/resize_cache/iblock/f08/cteobb6rjtn74395619epnrcqur2m7l9/1310_610_1/Frame-5823.jpg',
  'https://divanboss.ru/upload/resize_cache/iblock/8b2/zflsnfcwj730o5enwphza8aeqe93pwfr/1310_610_1/Frame-5893.jpg',
  'https://divanboss.ru/upload/resize_cache/iblock/820/z031761p3f9mx7kyt48jtpdu9ri23vpu/1310_610_1/Frame-5932.jpg',
  'https://divanboss.ru/upload/resize_cache/iblock/840/9fkfpx3539wes4hhj07bxcc0zjyw9zhn/1310_610_1/Frame-5821.jpg',
  'https://divanboss.ru/upload/iblock/45e/lkz1k3u8ffknmsea4b5ud3na0fuiwoke/e43gebvc9ffos94ir9280qxszlgtlhdt.jpg',
];

export const mainProductRating = { value: 4.9, count: 11 };

// Цвета — как на живом сайте (4 варианта)
export const mainProductColors = [
  { id: 'c1', name: 'роуз', color: '#a88285' },
  { id: 'c2', name: 'аква', color: '#8ba6ad' },
  { id: 'c3', name: 'Латте', color: '#E2D5C5' },
  { id: 'c4', name: 'сталь', color: '#aaa9ad' },
];

export const mainProductSplitPayment = 11010;  // платёж в Сплит × 4
export const mainProductPromoBenefit = 16600;  // Выгода до ₽

// Схема (габариты) — картинка справа от таблицы характеристик
export const mainProductSchemeImage =
  'https://divanboss.ru/upload/iblock/e6e/oal8tj0qn6e8fxmusb81arm033hnk29e/boss-mini.jpg?1772644200138125';

// Характеристики — с живой страницы
export const mainProductSpecs = [
  ['Габариты (ШхДхВ)', '108x218x90 см'],
  ['Спальное место (ШхД)', '90x200 см'],
  ['Материал', 'ДСП, ППУ, ЛДСП'],
  ['Гарантия', '36 месяцев'],
  ['Срок службы', '10 лет'],
  ['Количество упаковок', '4'],
  ['Вес', '110 кг'],
  ['Тип ткани', 'Велюр Монолит'],
];

// Преимущества материала — с живого сайта
export const mainProductFeatures = [
  'Водоотталкивающая пропитка Water Repellent',
  'Высокая стойкость к истиранию — 40 000 циклов',
  'Гипоаллергенный материал',
  'Тактильно приятный, мягкий ворс',
  'Мебельный бархат — тренд 2026 года',
];

export const mainProductDescription =
  'Кровать Boss Mini — флагманская модель серии в минималистичном скандинавском стиле. ' +
  'Ортопедическое основание HEALTHY SLEEP на латах обеспечивает правильную поддержку позвоночника. ' +
  'Под подъёмным механизмом — бельевой ящик HideBox объёмом 480 литров. ' +
  'Обивка из велюра Монолит с защитой «антикоготь» легко чистится и сохраняет внешний вид. ' +
  'Гарантия производителя — 36 месяцев.';

const SW_AQUA = '#7fa7b8';
const SW_TERRA = '#a86b6b';
const SW_CREAM = '#e4d9c5';
const SW_GRAPH = '#9aa0a6';
const SW_OAK = '#c9a97a';
const SW_WAL = '#6b4a2b';
const SW_WHITE = '#f0ece4';

const IMG_MATTRESS = 'https://divanboss.ru/upload/iblock/f31/78qjq8xn9ch97lf62mz7l0bq1uosyisp/Frame-5889.jpg';
const IMG_BED = 'https://divanboss.ru/upload/iblock/45e/lkz1k3u8ffknmsea4b5ud3na0fuiwoke/e43gebvc9ffos94ir9280qxszlgtlhdt.jpg';
const IMG_BEDLOW = 'https://divanboss.ru/upload/iblock/db1/1uf8hch4c67gs485ps7vumtn0839yy7v/Frame-5815.jpg';
const IMG_NIGHTSTAND = 'https://divanboss.ru/upload/iblock/820/z031761p3f9mx7kyt48jtpdu9ri23vpu/Frame-5932.jpg';
const IMG_CHEST = 'https://divanboss.ru/upload/iblock/840/9fkfpx3539wes4hhj07bxcc0zjyw9zhn/Frame-5821.jpg';
const IMG_TABLE = 'https://divanboss.ru/upload/iblock/f08/cteobb6rjtn74395619epnrcqur2m7l9/Frame-5823.jpg';
const IMG_POUF = 'https://divanboss.ru/upload/iblock/8b2/zflsnfcwj730o5enwphza8aeqe93pwfr/Frame-5893.jpg';
const IMG_SIDE = 'https://divanboss.ru/upload/iblock/229/n7y3flszwfkw59ypgb7j1klzvyfc0325/Frame-5818.jpg';
const IMG_PILLOW = 'https://divanboss.ru/upload/iblock/a49/zndm6gfykm5mpt51754njrj50v9wjz4i/Frame-5822.jpg';

export const giftBundleHero =
  'https://divanboss.ru/upload/iblock/081/6grw3xao1par52q6z49sc01gxxqnvyx6/db2c39b20b31a346f3de6a5642c3a24d.png';

export const giftCrossSell = [
  {
    id: 'g1',
    name: 'Босс Мини - матрас 90*200',
    price: 16600,
    image: 'https://divanboss.ru/upload/resize_cache/iblock/d07/wo7dkg29h98qu9hxbc9kvi649vwc04fx/600_600_1/Frame-6021.jpg',
    swatches: ['#f2f2f2'],
  },
  {
    id: 'g2',
    name: 'Босс Мини Кровать+ПМ 90*200 велюр Монолит аква',
    price: 29700,
    image: 'https://divanboss.ru/upload/resize_cache/iblock/db1/1uf8hch4c67gs485ps7vumtn0839yy7v/600_600_1/Frame-5815.jpg',
    swatches: ['#a88285', '#8ba6ad', '#E2D5C5', '#aaa9ad'],
  },
  {
    id: 'g3',
    name: 'Бортик для Босс Мини велюр Монолит аква',
    price: 3999,
    image: 'https://divanboss.ru/upload/resize_cache/iblock/7b0/qi314kldsi1to1i9i1xb6pwdjq1n2n5l/600_600_1/Frame-5931.jpg',
    swatches: ['#8ba6ad', '#a88285', '#E2D5C5', '#aaa9ad'],
  },
  {
    id: 'g4',
    name: 'Тумба Босс велюр Монолит аква, Орех селект',
    price: 9700,
    image: 'https://divanboss.ru/upload/resize_cache/iblock/1c7/c92vkltt1qdwzmwc29fjgod3c28bi5rn/600_600_1/Frame-5886.jpg',
    swatches: ['#8ba6ad', '#a88285', '#E2D5C5'],
  },
  {
    id: 'g5',
    name: 'Топпер Люкс 90*200',
    price: 4999,
    image: 'https://divanboss.ru/upload/resize_cache/iblock/bbb/0k6uhgrmj3aa9ndrfec1kd57aejnc4q5/600_600_1/Frame-5932.jpg',
    swatches: ['#f2f2f2'],
  },
];

export const discount5kItems = [
  { id: 'd5-1', name: 'Журнальный стол-трансформер «Лофт»', oldPrice: 10900, newPrice: 5900, image: IMG_TABLE, swatches: [SW_OAK, SW_WAL] },
  { id: 'd5-2', name: 'Столик прикроватный «Норд» дуб', oldPrice: 8400, newPrice: 3400, image: IMG_NIGHTSTAND, swatches: [SW_OAK, SW_WHITE, SW_WAL] },
  { id: 'd5-3', name: 'Обеденный стол «Босс 120»', oldPrice: 18900, newPrice: 13900, image: IMG_TABLE, swatches: [SW_OAK, SW_WAL, SW_GRAPH] },
  { id: 'd5-4', name: 'Пуф-банкетка «Велюр»', oldPrice: 6900, newPrice: 1900, image: IMG_POUF, swatches: [SW_TERRA, SW_AQUA, SW_CREAM, SW_GRAPH] },
];

export const discount1kItems = [
  { id: 'd1-1', name: 'Бортик безопасности 1.5 м', oldPrice: 2490, newPrice: 1490, image: IMG_SIDE, swatches: [SW_AQUA, SW_TERRA, SW_CREAM] },
  { id: 'd1-2', name: 'Тумба прикроватная «Мини» дуб', oldPrice: 5900, newPrice: 4900, image: IMG_NIGHTSTAND, swatches: [SW_OAK, SW_WAL, SW_WHITE] },
  { id: 'd1-3', name: 'Комод «Босс 4Я» кашемир', oldPrice: 14900, newPrice: 13900, image: IMG_CHEST, swatches: [SW_CREAM, SW_WHITE, SW_GRAPH] },
  { id: 'd1-4', name: 'Декоративная подушка 45×45', oldPrice: 1890, newPrice: 890, image: IMG_PILLOW, swatches: [SW_AQUA, SW_TERRA, SW_CREAM, SW_GRAPH, SW_WAL] },
];

export const reviewPhotos = [
  'https://divanboss.ru/upload/iblock/db1/1uf8hch4c67gs485ps7vumtn0839yy7v/Frame-5815.jpg',
  'https://divanboss.ru/upload/iblock/a49/zndm6gfykm5mpt51754njrj50v9wjz4i/Frame-5822.jpg',
  'https://divanboss.ru/upload/iblock/153/ufk73avru0308k6e4uw4f8330wzjfgh1/Frame-5816.jpg',
  'https://divanboss.ru/upload/iblock/88d/fy1rvfc6lidiiuql5cd71rx70uev8jvs/Frame-5805.jpg',
  'https://divanboss.ru/upload/iblock/229/n7y3flszwfkw59ypgb7j1klzvyfc0325/Frame-5818.jpg',
  'https://divanboss.ru/upload/iblock/f31/78qjq8xn9ch97lf62mz7l0bq1uosyisp/Frame-5889.jpg',
];

export const mainProductReviews = [
  {
    id: 'r1',
    name: 'Елена',
    date: '29 апреля 2024',
    rating: 5,
    text: 'Выбирали долго, остановились на Boss Mini из-за HideBox. Поместилось всё постельное бельё и сезонные вещи. Подъёмный механизм работает плавно, бельевой ящик огромный. Очень довольны!',
    photos: [
      'https://divanboss.ru/upload/iblock/db1/1uf8hch4c67gs485ps7vumtn0839yy7v/Frame-5815.jpg',
      'https://divanboss.ru/upload/iblock/a49/zndm6gfykm5mpt51754njrj50v9wjz4i/Frame-5822.jpg',
      'https://divanboss.ru/upload/iblock/153/ufk73avru0308k6e4uw4f8330wzjfgh1/Frame-5816.jpg',
    ],
  },
  {
    id: 'r2',
    name: 'Ольга',
    date: '18 марта 2024',
    rating: 5,
    text: 'Кровать супер! Обивка приятная на ощупь, оттенок аква — именно как на фото. Сборка заняла час вдвоём, инструкция понятная.',
    photos: [],
  },
  {
    id: 'r3',
    name: 'Дмитрий',
    date: '02 марта 2024',
    rating: 4,
    text: 'Качество хорошее, доставили в срок. Единственный минус — цвет в реальности чуть ярче, чем на фото. В остальном рекомендую.',
    photos: [],
  },
  {
    id: 'r4',
    name: 'Андрей',
    date: '11 февраля 2024',
    rating: 5,
    text: 'Спим уже месяц — спина не устаёт. Собрали сами за вечер. HideBox реально вместительный, весь гардероб туда сложили.',
    photos: [
      'https://divanboss.ru/upload/iblock/88d/fy1rvfc6lidiiuql5cd71rx70uev8jvs/Frame-5805.jpg',
      'https://divanboss.ru/upload/iblock/229/n7y3flszwfkw59ypgb7j1klzvyfc0325/Frame-5818.jpg',
    ],
  },
  {
    id: 'r5',
    name: 'Мария',
    date: '29 января 2024',
    rating: 5,
    text: 'Красивая, удобная, вместительная. Велюр Монолит не пачкается, кошка когти не точит — чехол действительно работает.',
    photos: [],
  },
];

export const ratingBreakdown = [
  { stars: 5, count: 10, pct: 91 },
  { stars: 4, count: 1, pct: 9 },
  { stars: 3, count: 0, pct: 0 },
  { stars: 2, count: 0, pct: 0 },
  { stars: 1, count: 0, pct: 0 },
];

export const fabrics = [
  { id: 'f1', name: 'Велюр бежевый', color: '#c9b79a' },
  { id: 'f2', name: 'Рогожка коричневая', color: '#8a6b4b' },
  { id: 'f3', name: 'Микровелюр графит', color: '#4a4037' },
  { id: 'f4', name: 'Шенилл олива', color: '#7a8370' },
  { id: 'f5', name: 'Велюр терракот', color: '#a56a5a' },
  { id: 'f6', name: 'Экокожа кремовая', color: '#d9cbb0' },
];

export const salons = [
  { city: 'Москва', address: 'ул. Ленина, 12, ТЦ «Мебельград»', hours: '10:00–21:00' },
  { city: 'Москва', address: 'МКАД 41-й км, ТЦ «Гранд»', hours: '10:00–22:00' },
  { city: 'Москва', address: 'Варшавское ш., 87', hours: '10:00–21:00' },
  { city: 'Москва', address: 'Каширское ш., 14', hours: '10:00–21:00' },
];

export const relatedProducts = products.slice(1, 5);

export const crossSellAccessories = [
  { id: 101, name: 'Декоративная подушка 45×45',    price: 1490, oldPrice: 1990, discount: 25, rating: 4.8, reviews: 142, tag: 'Хит',        image: 'https://divanboss.ru/upload/iblock/815/wy572mghr7px7mosayz5w8exepq7j2o4/Frame-9.jpg' },
  { id: 102, name: 'Плед тёплый 140×200',           price: 2390, oldPrice: 2990, discount: 20, rating: 4.9, reviews: 87,  tag: '−20%',       image: 'https://divanboss.ru/upload/iblock/537/qndlx35zt9pyfumxhsprjdku37u2ik57/Frame-10-_1_.jpg' },
  { id: 103, name: 'Чехол на диван',                price: 3990, oldPrice: null, discount: 0,  rating: 4.7, reviews: 56,  tag: null,          image: 'https://divanboss.ru/upload/iblock/9d9/fpp0wa3hi3u5oi9s7za22dxn7z53goaf/Frame-2.jpg' },
  { id: 104, name: 'Наматрасник водонепроницаемый', price: 2790, oldPrice: 3490, discount: 20, rating: 4.6, reviews: 203, tag: 'Популярное', image: 'https://divanboss.ru/upload/iblock/9dd/03i8pw8eukthups4tymq2brhn4pr6pjn/Frame-4.jpg' },
];

// картинка для подарка (журнальный стол) — используем фото тумбы из ассортимента
export const GIFT_TABLE_IMAGE = 'https://divanboss.ru/upload/iblock/c46/7g3enb6n0ew6vnapxdb6c5vtvisrmm55/Frame-7.jpg';

// мок-автоподсказка адреса (DaData style)
export const dadataSuggestions = [
  'г. Нижний Новгород, ул. Большая Покровская, д. 1',
  'г. Нижний Новгород, ул. Большая Покровская, д. 10',
  'г. Нижний Новгород, ул. Большая Покровская, д. 22',
  'г. Нижний Новгород, ул. Белинского, д. 61',
  'г. Нижний Новгород, пр. Гагарина, д. 48',
];

export const formatPrice = (n) => n.toLocaleString('ru-RU') + ' ₽';

// ───── моки для improved/HomePage ─────

export const trustStats = {
  rating: 4.8,
  reviewCount: 2547,
  years: 17,
  salons: 8,
};

export const homeReviews = [
  {
    id: 'h1', name: 'Елена', city: 'Москва', rating: 5, date: '2 апреля 2026',
    text: 'Брали диван Босс Тренд — привезли точно в срок, собрали за час. Ткань приятная, цвет как на фото, спать удобно.',
    photo: 'https://divanboss.ru/upload/iblock/db1/1uf8hch4c67gs485ps7vumtn0839yy7v/Frame-5815.jpg',
  },
  {
    id: 'h2', name: 'Андрей', city: 'Нижний Новгород', rating: 5, date: '18 марта 2026',
    text: 'Выбирали модульный угловой, приехали в салон — разрешили посидеть/полежать. На доме примерка 7 дней — это вообще огонь, редко у кого такое есть.',
    photo: 'https://divanboss.ru/upload/iblock/a49/zndm6gfykm5mpt51754njrj50v9wjz4i/Frame-5822.jpg',
  },
  {
    id: 'h3', name: 'Ольга', city: 'Казань', rating: 5, date: '05 марта 2026',
    text: 'Кровать Boss Mini — ящик реально огромный, туда весь сезонный гардероб поместился. Подъёмный механизм работает плавно.',
    photo: 'https://divanboss.ru/upload/iblock/153/ufk73avru0308k6e4uw4f8330wzjfgh1/Frame-5816.jpg',
  },
];

export const whyUs = [
  { icon: '🏭', iconKey: 'factory', eyebrow: 'Производство', metric: '2009', unit: 'на рынке',     title: 'Своя фабрика',           text: 'Производство в Нижнем Новгороде, контроль качества на каждом этапе — без посредников.' },
  { icon: '🛋️', iconKey: 'home',    eyebrow: 'Примерка',     metric: '7',    unit: 'дней дома',    title: 'Тест-драйв в интерьере', text: 'Не подошёл — заберём бесплатно. Решайте без спешки, в своих стенах.' },
  { icon: '🚚', iconKey: 'truck',   eyebrow: 'Логистика',    metric: '1',    unit: 'день на сборку', title: 'Привезём и соберём',     text: 'Мастера привезут, соберут и унесут упаковку в удобное для вас время.' },
  { icon: '🛡️', iconKey: 'shield',  eyebrow: 'Гарантия',     metric: '18',   unit: 'месяцев',     title: 'Замена при браке',       text: 'На каркас, механизмы и швы. При дефекте меняем за наш счёт.' },
];

export const homePromo = {
  title: 'Скидки до 51% на хиты недели',
  subtitle: 'Диваны и кровати с собственного склада — забирайте по цене производителя',
  cta: 'Забрать скидку',
  endsAt: (() => {
    const d = new Date();
    d.setDate(d.getDate() + 3);
    d.setHours(23, 59, 59, 0);
    return d.toISOString();
  })(),
  image: 'https://divanboss.ru/upload/iblock/e58/ruwcsi8qf4680tuo4wh50cxjtolnjybm/Frame-2223.jpg',
};

export const categoryPills = [
  { slug: 'uglovye', name: 'Угловые диваны' },
  { slug: 'pryamye', name: 'Прямые диваны' },
  { slug: 'modulnye', name: 'Модульные' },
  { slug: 'krovati', name: 'Кровати с ПМ' },
  { slug: 'kuhonnye', name: 'Кухонные уголки' },
  { slug: 'divany-knizhki', name: 'Диваны-книжки' },
  { slug: 'detskie', name: 'Детские' },
  { slug: 'matrasy', name: 'Матрасы' },
];

export const homeFaq = [
  {
    q: 'Какие сроки доставки по России?',
    a: 'По Москве и области — 1–3 дня. В регионы — 5–14 дней через транспортную компанию. По Москве при заказе от 30 000 ₽ — доставка бесплатно.',
  },
  {
    q: 'Входит ли сборка в стоимость?',
    a: 'Сборка оплачивается отдельно — от 1 500 ₽, но часто идёт в подарок при акции. Мастера соберут диван или кровать за 1–2 часа в удобное для вас время.',
  },
  {
    q: 'Что с возвратом, если не подойдёт?',
    a: 'В течение 14 дней после доставки вы можете вернуть товар без объяснения причин. Товар должен быть в оригинальной упаковке и без следов использования.',
  },
  {
    q: 'Есть ли рассрочка 0%?',
    a: 'Да, рассрочка до 24 месяцев без переплат через Тинькофф, Альфа и Сбер. Решение приходит за 2 минуты в карточке товара или в салоне.',
  },
  {
    q: 'Какая гарантия на мебель?',
    a: 'Гарантия 18 месяцев на каркас, механизмы трансформации и швы. На обивку — 12 месяцев. При заводском браке — бесплатная замена.',
  },
  {
    q: 'Можно ли посмотреть диван вживую до покупки?',
    a: 'Да, приходите в любой из 8 салонов в Москве — все модели выставлены, можно посидеть и примерить. Или закажите бесплатную примерку дома на 7 дней.',
  },
];

export const seoTags = [
  { slug: 'uglovoy-divan-s-ottomankoy', name: 'Угловой диван с оттоманкой' },
  { slug: 'divan-knizhka', name: 'Диван-книжка' },
  { slug: 'divan-evroknizhka', name: 'Диван-еврокнижка' },
  { slug: 'divan-akkordeon', name: 'Диван-аккордеон' },
  { slug: 'divan-krovat-dlya-ezhednevnogo-sna', name: 'Диван-кровать для ежедневного сна' },
  { slug: 'modulnyy-divan', name: 'Модульный диван' },
  { slug: 'divan-s-baryom', name: 'Диван с баром' },
  { slug: 'krovat-s-podyemnym-mehanizmom', name: 'Кровать с подъёмным механизмом' },
  { slug: 'dvuspalnaya-krovat-160', name: 'Двуспальная кровать 160×200' },
  { slug: 'detskiy-divan', name: 'Детский диван' },
  { slug: 'kuhonnyy-ugolok', name: 'Кухонный уголок' },
  { slug: 'divan-dlya-ofisa', name: 'Диван для офиса' },
  { slug: 'myagkiy-ugolok', name: 'Мягкий уголок' },
  { slug: 'divan-s-myagkim-sideniem', name: 'Диван с мягким сиденьем' },
  { slug: 'divan-rasladushka', name: 'Диван-раскладушка' },
];

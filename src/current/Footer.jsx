import { SITE_LOGO } from '../mock/data.js';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="c-ftr">
      <div className="container c-ftr__inner">
        <div className="c-ftr__col">
          <h4 className="c-ftr__title">Покупателям</h4>
          <ul>
            <li><a href="#">Салоны</a></li>
            <li><a href="#">Доставка</a></li>
            <li><a href="#">Сборка мебели</a></li>
            <li><a href="#">Гарантия</a></li>
            <li><a href="#">Способы оплаты</a></li>
            <li><a href="#">Статус заказа</a></li>
            <li><a href="#">Часто задаваемые вопросы</a></li>
          </ul>
        </div>

        <div className="c-ftr__col">
          <h4 className="c-ftr__title">Компания</h4>
          <ul>
            <li><a href="#">О компании</a></li>
            <li><a href="#">Контакты</a></li>
            <li><a href="#">Условия продажи</a></li>
            <li><a href="#">Политика оплаты</a></li>
            <li><a href="#">Декларации</a></li>
            <li><a href="#">Дилерам</a></li>
            <li><a href="#">Поставщикам</a></li>
            <li><a href="#">Вебмастерам</a></li>
          </ul>
        </div>

        <div className="c-ftr__col c-ftr__col--wide">
          <h4 className="c-ftr__title">Каталог</h4>
          <div className="c-ftr__catalog">
            <ul>
              <li><a href="#">Диваны</a></li>
              <li><a href="#">Кровати</a></li>
              <li><a href="#">Матрасы</a></li>
              <li><a href="#">Стенки</a></li>
              <li><a href="#">Шкафы</a></li>
              <li><a href="#">Столы</a></li>
              <li><a href="#">Кресла</a></li>
            </ul>
            <ul>
              <li><a href="#">Тумбы</a></li>
              <li><a href="#">Пуфы</a></li>
              <li><a href="#">Комоды</a></li>
              <li><a href="#">Стеллажи</a></li>
              <li><a href="#">Стулья</a></li>
              <li><a href="#">Распродажа</a></li>
            </ul>
          </div>
        </div>

        <div className="c-ftr__col c-ftr__col--contacts">
          <a href="tel:+74952605522" className="c-ftr__phone">+7 (495) 260-55-22</a>
          <div className="c-ftr__social">
            <a href="#" aria-label="Telegram" className="c-ftr__soc">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z"/></svg>
            </a>
            <a href="#" aria-label="VK" className="c-ftr__soc">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.8 17.33h1.06s.32-.04.49-.22c.15-.17.15-.48.15-.48s-.02-1.43.63-1.64c.64-.2 1.47 1.36 2.35 1.96.67.46 1.17.36 1.17.36l2.36-.03s1.24-.08.65-1.05c-.05-.08-.34-.72-1.76-2.04-1.48-1.38-1.28-1.15.5-3.53 1.09-1.45 1.52-2.33 1.39-2.71-.13-.36-.93-.26-.93-.26l-2.65.02s-.2-.03-.34.06c-.14.08-.23.28-.23.28s-.42 1.12-.97 2.06c-1.18 2-1.65 2.1-1.84 1.98-.44-.28-.33-1.16-.33-1.77 0-1.93.29-2.74-.57-2.95-.28-.07-.49-.12-1.22-.12-.93 0-1.71 0-2.16.22-.3.14-.53.47-.4.49.17.02.55.1.75.38.26.36.25 1.16.25 1.16s.15 2.19-.35 2.46c-.34.19-.81-.2-1.87-2.02-.54-.94-.95-1.97-.95-1.97s-.08-.2-.22-.31c-.17-.13-.4-.17-.4-.17l-2.52.02s-.38.01-.52.17c-.12.15-.01.45-.01.45s1.97 4.61 4.21 6.93c2.05 2.13 4.38 1.99 4.38 1.99z"/></svg>
            </a>
            <a href="#" aria-label="Одноклассники" className="c-ftr__soc">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c2.76 0 5 2.24 5 5s-2.24 5-5 5-5-2.24-5-5 2.24-5 5-5zm0 3c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm4.95 9.29c-1.2.87-2.73 1.43-4.37 1.6l2.95 2.95-1.82 1.82-3.71-3.71-3.71 3.71-1.82-1.82 2.95-2.95c-1.64-.17-3.17-.73-4.37-1.6l1.46-1.85c1.25.91 2.89 1.46 4.49 1.46s3.24-.55 4.49-1.46l1.46 1.85z"/></svg>
            </a>
          </div>
        </div>
      </div>

      <div className="c-ftr__bottom">
        <div className="container c-ftr__bottom-inner">
          <a href="#" className="c-ftr__logo">
            <img src={SITE_LOGO} alt="Divan BOSS" />
          </a>
          <div className="c-ftr__copy">
            <div>DIVANBOSS.RU © 2016–2026</div>
            <div className="c-ftr__copy-muted">ИП Беляков Р.В.; ОГРНИП 315643200000440</div>
          </div>
          <div className="c-ftr__policy">
            <a href="#">Политика обработки персональных данных</a>
            <a href="#">Политика использования файлов Cookie</a>
            <a href="#">Правила работы сайта</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

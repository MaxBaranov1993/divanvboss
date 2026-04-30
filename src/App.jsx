import { Routes, Route, Navigate, NavLink, useLocation } from 'react-router-dom';
import CurrentHome from './current/HomePage.jsx';
import CurrentProduct from './current/ProductPage.jsx';
import CurrentCheckout from './current/CheckoutPage.jsx';
import ImprovedHome from './improved/HomePage.jsx';
import ImprovedProduct from './improved/ProductPage.jsx';
import ImprovedCheckout from './improved/CheckoutPage.jsx';
import ImprovedJournal from './improved/JournalPage.jsx';
import ImprovedLoyalty from './improved/LoyaltyPage.jsx';
import VersionSwitcher from './shared/VersionSwitcher.jsx';

export default function App() {
  const location = useLocation();
  const hideBar = location.pathname === '/';

  return (
    <>
      {!hideBar && <VersionSwitcher />}
      <Routes>
        <Route path="/" element={<LandingIndex />} />
        <Route path="/current/home" element={<CurrentHome />} />
        <Route path="/current/product" element={<CurrentProduct />} />
        <Route path="/current/checkout" element={<CurrentCheckout />} />
        <Route path="/improved/home" element={<ImprovedHome />} />
        <Route path="/improved/product" element={<ImprovedProduct />} />
        <Route path="/improved/checkout" element={<ImprovedCheckout />} />
        <Route path="/improved/journal" element={<ImprovedJournal />} />
        <Route path="/improved/loyalty" element={<ImprovedLoyalty />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

function LandingIndex() {
  return (
    <div className="landing">
      <div className="landing__inner">
        <h1>Прототип divanboss.ru</h1>
        <p className="landing__lead">
          Слева — копия текущих страниц сайта <b>точь-в-точь</b>.
          Справа — те же страницы с предложенными правками.
          Сравните и отдайте разработчикам.
        </p>

        <div className="landing__grid">
          <div className="landing__col">
            <h2>Как сейчас</h2>
            <NavLink className="landing__link" to="/current/home">Главная</NavLink>
            <NavLink className="landing__link" to="/current/product">Карточка товара</NavLink>
            <NavLink className="landing__link" to="/current/checkout">Оформление заказа</NavLink>
          </div>
          <div className="landing__col landing__col--accent">
            <h2>Как можно улучшить</h2>
            <NavLink className="landing__link" to="/improved/home">Главная <span>+ H1, корректные мета-теги</span></NavLink>
            <NavLink className="landing__link" to="/improved/product">Карточка <span>+ «Купить в 1 клик», sticky-колонка</span></NavLink>
            <NavLink className="landing__link" to="/improved/checkout">Оформление <span>+ 1 поле адреса, стоимость доставки, кросс-селл</span></NavLink>
            <NavLink className="landing__link" to="/improved/journal">Журнал <span>+ SEO-контент, editorial-вёрстка, CTA и рассылка</span></NavLink>
            <NavLink className="landing__link" to="/improved/loyalty">Программа лояльности <span>+ калькулятор, тиры, реферальный блок, FAQ-схема</span></NavLink>
          </div>
        </div>

        <p className="landing__note">
          Обоснование правок — в <code>reports/2026-04-21-top5-checkout-pravok.md</code> и
          <code>analyses/2026-04-17-homepage-tech-audit.md</code>.
        </p>
      </div>

      <style>{landingStyles}</style>
    </div>
  );
}

const landingStyles = `
.landing {
  min-height: 100vh;
  background: linear-gradient(180deg, #f6f3ef 0%, #ffffff 100%);
  padding: 48px 20px;
}
.landing__inner { max-width: 960px; margin: 0 auto; }
.landing h1 { font-size: 34px; font-weight: 800; margin-bottom: 12px; }
.landing__lead { color: #7a7166; font-size: 16px; margin-bottom: 40px; max-width: 680px; }
.landing__grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 32px; }
@media (max-width: 720px) { .landing__grid { grid-template-columns: 1fr; } }
.landing__col { background: #fff; border: 1px solid #e2ddd4; border-radius: 12px; padding: 24px; }
.landing__col--accent { border-color: #b8935a; box-shadow: 0 4px 20px rgba(184,147,90,0.15); }
.landing__col h2 { font-size: 18px; font-weight: 700; margin-bottom: 16px; }
.landing__col--accent h2 { color: #9a7841; }
.landing__link {
  display: block; padding: 14px 16px; border-radius: 8px;
  background: #f6f3ef; margin-bottom: 8px; font-weight: 500;
  transition: background 0.15s;
}
.landing__link:hover { background: #ece7df; color: inherit; }
.landing__link span { display: block; font-size: 12px; font-weight: 400; color: #7a7166; margin-top: 2px; }
.landing__note { color: #a89f93; font-size: 13px; }
.landing__note code { background: #ece7df; padding: 1px 6px; border-radius: 4px; font-size: 12px; }
`;

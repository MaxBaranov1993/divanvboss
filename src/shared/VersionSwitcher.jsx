import { useLocation, Link } from 'react-router-dom';
import './VersionSwitcher.css';

export default function VersionSwitcher() {
  const { pathname } = useLocation();
  const parts = pathname.split('/').filter(Boolean);
  const version = parts[0]; // current | improved
  const page = parts[1] || 'home';
  const other = version === 'current' ? 'improved' : 'current';
  const pageLabel = { home: 'Главная', product: 'Карточка', checkout: 'Оформление' }[page] || '';

  return (
    <div className={`vs vs--${version}`}>
      <div className="vs__inner">
        <Link to="/" className="vs__home">← Все страницы</Link>
        <div className="vs__label">
          <b>{pageLabel}</b> — {version === 'current' ? 'копия текущего сайта' : 'с улучшениями'}
        </div>
        <Link to={`/${other}/${page}`} className="vs__switch">
          Переключить на «{other === 'current' ? 'как сейчас' : 'как улучшить'}» →
        </Link>
      </div>
    </div>
  );
}

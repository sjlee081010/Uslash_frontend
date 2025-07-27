import './nav.css'; // CSS 파일은 그대로 사용합니다.
import home from './assets/home.png'
import search from './assets/search.png'
import plus from './assets/plus.png'
import chat from './assets/chat.png'
import my from './assets/my.png'
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <nav className="nav-container">
      <Link to="/Main" className="nav-item">
        <img src={home} alt="홈" />
      </Link>
      <Link to="/Search" className="nav-item">
        <img src={search} alt="검색" />
      </Link>
      <Link to="/Create" className="nav-item">
        <img src={plus} alt="글쓰기" />
      </Link>
      <Link to="/Chat" className="nav-item">
        <img src={chat} alt="채팅" />
      </Link>
      <Link to="/MyPage" className="nav-item">
        <img src={my} alt="마이페이지" />
      </Link>
    </nav>
  );
}

export default Nav;
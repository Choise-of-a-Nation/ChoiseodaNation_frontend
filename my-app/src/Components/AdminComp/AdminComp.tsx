import { Link } from 'react-router-dom';
import './AdminComp.css';

function AdminComp() {

    return (
        <div className="admin-dashboard">
            <h1>Адмін панель</h1>
            <div className="admin-sections">
                <Link to="/admin/users">👤 Користувачі</Link>
                <Link to="/admin/forum">💬 Форум</Link>
                <Link to="/admin/news">📰 Новини</Link>
                <Link to="/admin/history">📰 Історична довідка</Link>
                <Link to="/admin/statisctic">📰 Статистика</Link>
            </div>
        </div>
    );
}

export default AdminComp;
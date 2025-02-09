import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

function Header() {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        setIsAuthenticated(!!token); 
    }, []);

    const handleButtonClick = () => {
        if (isAuthenticated) {
            navigate("/profile"); 
        } else {
            navigate("/sign"); 
        }
    };

    return (
        <div className='header'>
            <img src='img/logo.png' alt='logo' />

            <div className='zagolovku'>
                <h1>Choise of a Nation</h1>
                <h1>Не знання історії - не звільняє від відповідальності</h1>
            </div>

            <div className='dropdowns'>
                <button>Новини</button>
                <button>Форум</button>
                <button>Історична довідка</button>
                <button onClick={handleButtonClick}>
                    {isAuthenticated ? "Профіль" : "Увійти"}
                </button>
            </div>
        </div>
    );
}

export default Header;

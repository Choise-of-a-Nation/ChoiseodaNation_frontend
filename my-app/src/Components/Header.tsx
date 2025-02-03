import './Header.css';

function Header() {

    return (
        <div className='header'>
            <img src='img/logo.png' alt='logo'/>

            <div className='zagolovku'>
                <h1>Choise of a Nation</h1>
                <h1>Не знання історії - не звільняє від відповідальності</h1>
            </div>

            <div className='dropdowns'>
                <button>Новини</button>
                <button>Форум</button>
                <button>Історична довідка</button>
                <button>Увійти</button>
            </div>
        </div>
    );
}

export default Header;
import { useState } from 'react';
import './MainHome.css'
import { useNavigate } from 'react-router-dom';

function MainHome()
{
    const navigate = useNavigate();
    const [message, setMessage] = useState("");

    const handlePlay = () => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            const gameUrl = `https://choise-of-a-nation-game-web.vercel.app/?token=${encodeURIComponent(token)}`;
            window.open(gameUrl, "_blank");
        } else {
            setMessage("Помилка: токен не знайдено");
        }
    };
    
    const handleButtonClick = () => {
        const token = localStorage.getItem("accessToken"); 
        if (token) {
          handlePlay();
        } else {
          window.location.href = "/sign"; 
        }
      };

      const handleButtonClickNav = (page: string) => {
        navigate(page);
    };

    return(
        <div className='main'>
            <div className='vstup'>
                <h1>Слава Україні!</h1>
                <p>Історія формує майбутнє. Вибір кожного визначає шлях цілої нації.</p>
                <p>"Choise of a Nation" – це унікальний проєкт, що допомагає зануритися у ключові моменти історії, аналізувати події та робити власні висновки. Ми віримо, що знання минулого є ключем до розуміння сучасності та будівництва майбутнього.</p>
                <ul>
                    <li>Досліджуйте важливі історичні події.</li>
                    <li>Аналізуйте альтернативні сценарії розвитку.</li>
                    <li>Долучайтеся до обговорень та дискусій.</li>
                </ul>
            </div>
            <div className='block-news'>
                <div>
                    <img src='img/news-icon.png'/>
                </div>
                <div>
                    <h2>Новини</h2>
                    <p>Ласкаво просимо!</p>
                    <p>На цій сторінці ви знайдете найсвіжіші новини та оновлення, пов’язані з нашим проєктом. Ми постійно додаємо актуальну інформацію, щоб ви завжди були в курсі всіх подій.</p>
                    <p>Хочете дізнатися більше? Натискайте на посилання нижче та ознайомлюйтеся з останніми оновленнями прямо зараз!</p>
                    <button onClick={() => handleButtonClickNav("/news")}>Детальніше</button>
                </div>
            </div>
            <div className='block-forum'>
                <div>
                    <h2>Форум</h2>
                    <p>Хочете поділитися своїми думками, обговорити ідеї або поставити питання? Наш форум — це місце, де ви можете спілкуватися з іншими учасниками, ділитися досвідом та дізнаватися більше про наш проєкт.</p>
                    <p>Приєднуйтесь до обговорень та залишайте свої коментарі! Натискайте на посилання нижче, щоб перейти на форум.</p>
                    <button onClick={() => handleButtonClickNav("/forum")}>Детальніше</button>
                </div>
                <div>
                    <img src='img/forum-icon.png'/>
                </div>
            </div>
            <div className='block-history'>
                <div>
                    <img src='img/history-icon.png'/>
                </div>
                <div>
                    <h2>Історична довідка</h2>
                    <p>Україна має багатовікову історію, сповнену героїчних подій, боротьби та становлення нації. У розділі історична довідка ви знайдете матеріали про ключові історичні події, видатних постатей та важливі віхи в розвитку української державності.</p>
                    <p>Дізнайтеся більше про історію України, адже знання минулого допомагає краще розуміти сьогодення! Натискайте на посилання нижче, щоб перейти до розділу.</p>
                    <button onClick={() => handleButtonClickNav("/forum")}>Детальніше</button>
                </div>
            </div>
            <div className='block-game'>
                <div>
                    <h2>Наш проект!</h2>
                    <p>Якщо ви цікавитеся історією або прагнете вплинути на її хід, наш проєкт саме для вас! Тут ви зможете заглибитися в події минулого, дізнатися більше про ключові моменти історії та навіть уявити, яким міг би бути альтернативний розвиток подій.</p>
                    <p>Приєднуйтеся до нас, досліджуйте історію разом із нами та станьте частиною спільноти, яка цінує знання та має сміливість змінювати майбутнє. Натискайте на посилання нижче та долучайтеся до проєкту!</p>
                    <button onClick={handleButtonClick}>Детальніше</button>
                </div>
                <div>
                    <img src='img/logo.png'/>
                </div>
            </div>
        </div>
    );
}

export default MainHome;
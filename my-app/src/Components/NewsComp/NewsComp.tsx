import { useEffect, useState } from 'react';
import './NewsComp.css';
import { getNews } from '../../ApiService/ApiService';
import { News } from '../../Entity/News';
import { Link } from 'react-router-dom';

function NewsComp()
{
    const [news, setNews] = useState<News[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => { 
        getNews()
            .then(async (fetchedNews) => {
                if (!Array.isArray(fetchedNews)) {
                    console.error("Помилка: отримані новини не є масивом", fetchedNews);
                    return;
                }

                const sortedNews = fetchedNews.sort((a, b) => 
                    new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
                );

                setNews(sortedNews);
            })
            .catch((err) => console.error("Помилка при завантаженні новин:", err))
            .finally(() => setLoading(false));
        }, []);

    return(
        <div className='news-container'>
            <h1>Новини</h1>

            {loading ? (
                <p>Завантаження новин...</p>
            ) : (
                <ul>
                    {news.map((now) => (
                        <li key={now.id} className="question">
                            <img src={now?.url || "/img/default-avatar.png"} alt="News Avatar"/>
                            <h3>{now.name}</h3>
                            <Link to={`/news/${now.id}`}><button>Перейти</button></Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default NewsComp;
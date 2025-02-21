import { useEffect, useState } from 'react';
import './WikiComp.css';
import { Link } from 'react-router-dom';
import { HistoryWiki } from '../../Entity/HistoryWiki';
import { getWiki } from '../../ApiService/ApiService';

function WikiComp()
{
    const [wiki, setWiki] = useState<HistoryWiki[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => { 
        getWiki()
            .then(async (fetchedWiki) => {
                if (!Array.isArray(fetchedWiki)) {
                    console.error("Помилка: отримані новини не є масивом", fetchedWiki);
                    return;
                }

                const sortedWiki = fetchedWiki.sort((a, b) => 
                    new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
                );

                setWiki(sortedWiki);
            })
            .catch((err) => console.error("Помилка при завантаженні новин:", err))
            .finally(() => setLoading(false));
        }, []);

    return(
        <div className='news-container'>
            <h1>Історична довідка</h1>

            {loading ? (
                <p>Завантаження довідок...</p>
            ) : (
                <ul>
                    {wiki.map((wik) => (
                        <li key={wik.id} className="question">
                            <img src={wik?.url || "/img/default-avatar.png"} alt="News Avatar"/>
                            <h3>{wik.title}</h3>
                            <Link to={`/history/${wik.id}`}><button>Перейти</button></Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default WikiComp;
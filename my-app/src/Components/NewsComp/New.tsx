import { useParams } from 'react-router-dom';
import './New.css';
import { News } from '../../Entity/News';
import { useEffect, useState } from 'react';
import { getNew } from '../../ApiService/ApiService';

const New: React.FC = () => {
    const { newId } = useParams<{ newId: string }>();
    const parsedNewId = Number(newId);
    const [now, setNow] = useState<News | null>(null);

    const fetchNow = async () => {
        if (!newId) return;
        
        try {
            const nowData = await getNew(parsedNewId);
            setNow(nowData);
        } catch (err) {
            console.error("Помилка завантаження новини:", err);
        }
    };

    useEffect(() => {
        fetchNow();
    }, [parsedNewId]);

    return(
        <div>
            {now ? (
                <>
                    <div className='new-container'>
                        <h2>{now.name}</h2>
                        <p>Дата: {new Date(now.createdDate).toLocaleString()}</p>
                        <img src={now?.url || "/img/default-avatar.png"} alt="Now Avatar"/>
                        <p className='desc'>{now.description}</p>
                    </div>
                </>
            ) : (
                <p>Завантаження...</p>
            )}
        </div>
    );
}

export default New;
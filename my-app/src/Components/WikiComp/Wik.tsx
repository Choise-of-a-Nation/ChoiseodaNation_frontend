import { useParams } from 'react-router-dom';
import './Wik.css';
import { useEffect, useState } from 'react';
import { HistoryWiki } from '../../Entity/HistoryWiki';
import { getWik } from '../../ApiService/ApiService';

const Wik: React.FC = () => {
    const { wikId } = useParams<{ wikId: string }>();
    const parsedwikId = Number(wikId);
    const [now, setNow] = useState<HistoryWiki | null>(null);

    const fetchNow = async () => {
        if (!wikId) return;
        
        try {
            const nowData = await getWik(parsedwikId);
            setNow(nowData);
        } catch (err) {
            console.error("Помилка завантаження довідки:", err);
        }
    };

    useEffect(() => {
        fetchNow();
    }, [parsedwikId]);

    return(
        <div>
            {now ? (
                <>
                    <div className='new-container'>
                        <h2>{now.title}</h2>
                        <p>Дата: {new Date(now.createdDate).toLocaleString()}</p>
                        <img src={now?.url || "/img/default-avatar.png"} alt="Wiki Avatar"/>
                        <p className='desc'>{now.description}</p>
                    </div>
                </>
            ) : (
                <p>Завантаження...</p>
            )}
        </div>
    );
}

export default Wik;
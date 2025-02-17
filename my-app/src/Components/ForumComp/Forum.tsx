import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Forum.css";
import { getTopics, getUser } from "../../ApiService/ApiService";

interface Topic {
    id: string;
    title: string;
    userId: string;
    authorName?: string; 
    createdAt: string;
}

const Forum: React.FC = () => {
    const [topics, setTopics] = useState<Topic[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getTopics()
            .then(async (fetchedTopics) => {
                if (!Array.isArray(fetchedTopics)) {
                    console.error("Помилка: отримані теми не є масивом", fetchedTopics);
                    return;
                }
    
                const topicsWithAuthors = await Promise.all(
                    fetchedTopics.map(async (topic) => {
                        try {
                            const author = await getUser(topic.userId);
                            return { 
                                ...topic, 
                                authorName: `${author.firstName} ${author.lastName}` 
                            };
                        } catch {
                            return { 
                                ...topic, 
                                authorName: "Невідомий автор" 
                            };
                        }
                    })
                );
    
                setTopics(topicsWithAuthors);
            })
            .catch((err) => console.error("Помилка при завантаженні тем:", err))
            .finally(() => setLoading(false));
    }, []);     

    return (
        <div className="forum-container">
            <h1>Форум</h1>
            <Link to="/forum/new-topic">
                <button>Створити нову тему</button>
            </Link>

            {loading ? (
                <p>Завантаження тем...</p>
            ) : (
                <ul>
                    {topics.map((topic) => (
                        <li key={topic.id}>
                            <Link to={`/forum/${topic.id}`}>{topic.title}</Link>
                            <span>Автор: {topic.authorName} | {new Date(topic.createdAt).toLocaleDateString()}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Forum;
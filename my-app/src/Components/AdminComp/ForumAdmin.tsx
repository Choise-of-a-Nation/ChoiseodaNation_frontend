import React, { useEffect, useState } from "react";
import "./ForumAdmin.css";
import { deleteForum, getTopics, getUser } from "../../ApiService/ApiService";
import Topic from "../ForumComp/Topic";

const ForumAdmin = () => {
    const [topics, setTopics] = useState<Topic[]>([]);

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
    }, []); 

    const handleDeleteTopic = (id: string) => {
        deleteForum(id).then(() => {
            setTopics(topics.filter(topic => topic.id !== id));
        });
    };

    return (
        <div className="forum-admin">
            <h2>Форум</h2>
            <ul>
                {topics.map(topic => (
                    <li key={topic.id}>
                        <h3>{topic.title}</h3>
                        <p>Автор: {topic.authorName}</p>
                        <button onClick={() => handleDeleteTopic(topic.id)}>Видалити</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ForumAdmin;
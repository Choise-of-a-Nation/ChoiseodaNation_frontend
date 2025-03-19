import React, { useEffect, useState } from "react";
import "./NewsAdmin.css";
import { deleteNews, getNews, createNews } from "../../ApiService/ApiService";
import { News } from "../../Entity/News";

const NewsAdmin = () => {
    const [news, setNews] = useState<News[]>([]);
    const [formData, setFormData] = useState<{ name: string; description: string; url: string }>({
        name: "",
        description: "",
        url: "",
    });

    useEffect(() => {
        getNews().then(setNews);
    }, []);

    const handleDeleteNews = (id: number) => {
        deleteNews(id).then(() => {
            setNews(news.filter(n => n.id !== id));
        });
    };

    const handleCreateNews = async () => {
        if (!formData.name.trim() || !formData.description.trim()) {
            alert("Заповніть всі поля!");
            return;
        }

        try {
            const newNews = await createNews(formData);
            setNews([...news, newNews]);
            setFormData({ name: "", description: "", url: "" }); 
        } catch (error) {
            console.error("Помилка при створенні новини:", error);
        }
    };

    return (
        <div className="news-admin">
            <h2>Новини</h2>

            <div className="news-form">
                <h3>Створити новину</h3>
                <label>
                    Назва:
                    <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Введіть назву"
                    />
                </label>

                <label>
                    Опис:
                    <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Введіть опис"
                    />
                </label>

                <label>
                    URL зображення:
                    <input
                        type="text"
                        value={formData.url}
                        onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                        placeholder="Додайте посилання на зображення"
                    />
                </label>

                <button onClick={handleCreateNews} className="news-button">Додати новину</button>
            </div>

            <ul className="news-list">
                {news.map(n => (
                    <li key={n.id} className="news-item">
                        <div className="news-content">
                            <h3>{n.name}</h3>
                            <p>{n.description}</p>
                        </div>
                        {n.url && <img src={n.url} alt={n.name} className="news-image" />}
                        <button onClick={() => handleDeleteNews(n.id)} className="news-button">Видалити</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NewsAdmin;
import React, { useEffect, useState } from "react";
import "./HistoryAdmin.css";
import { HistoryWiki } from "../../Entity/HistoryWiki";
import { deleteHistory, getWiki, createWiki } from "../../ApiService/ApiService";

const HistoryAdmin = () => {
    const [hist, setHist] = useState<HistoryWiki[]>([]);
    const [formData, setFormData] = useState<{ title: string; description: string; url: string }>({
        title: "",
        description: "",
        url: "",
    });

    useEffect(() => {
        getWiki().then(setHist);
    }, []);

    const handleDeleteHist = (id: number) => {
        deleteHistory(id).then(() => {
            setHist(hist.filter(n => n.id !== id));
        });
    };

    const handleCreateHist = async () => {
        if (!formData.title.trim() || !formData.description.trim()) {
            alert("Заповніть всі поля!");
            return;
        }

        try {
            const newHist = await createWiki(formData);
            setHist([...hist, newHist]);
            setFormData({ title: "", description: "", url: "" }); 
        } catch (error) {
            console.error("Помилка при створенні історичної довідки:", error);
        }
    };

    return (
        <div className="hist-admin">
            <h2>Історичні Довідки</h2>

            <div className="hist-form">
                <h3>Додати історичну довідку</h3>
                <label>
                    Заголовок:
                    <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="Введіть заголовок"
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

                <button onClick={handleCreateHist}>Додати</button>
            </div>

            <ul className="hist-list">
                {hist.map(n => (
                    <li key={n.id} className="hist-item">
                        <div className="hist-content">
                            <h3>{n.title}</h3>
                            <p>{n.description}</p>
                        </div>
                        {n.url && <img src={n.url} alt={n.title} className="hist-image" />}
                        <button onClick={() => handleDeleteHist(n.id)}>Видалити</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HistoryAdmin;
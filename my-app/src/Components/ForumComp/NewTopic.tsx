import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NewTopic.css";
import { createTopic } from "../../ApiService/ApiService";
import { getUserIdFromToken } from "../../Utilits/Auth";

const NewTopic: React.FC = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();

    const handleCreateTopic = async () => {
        if (!title.trim()) return;

        try {
            const userId = getUserIdFromToken();
            if (!userId) {
                console.error("User ID не знайдено!");
                return;
            }

            await createTopic(title, userId, description);
            navigate("/forum");
        } catch (error) {
            console.error("Помилка при створенні теми:", error);
        }
    };

    return (
        <div className="new-topic-container">
            <h2>Створити нову тему</h2>

            <div className="group">
            <div className="form-group">
                <label htmlFor="title">Назва теми:</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Введіть назву теми"
                />
            </div>

            <div className="form-group">
                <label htmlFor="description">Опис:</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Додайте короткий опис теми"
                />
            </div>
            </div>

            <button onClick={handleCreateTopic}>Створити</button>
        </div>
    );
};

export default NewTopic;

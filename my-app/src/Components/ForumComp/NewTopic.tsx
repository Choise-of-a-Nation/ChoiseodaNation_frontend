import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './NewTopic.css';
import { createTopic } from "../../ApiService/ApiService";
import { getUserIdFromToken } from "../../Utilits/Auth";

const NewTopic: React.FC = () => {
    const [title, setTitle] = useState("");
    const navigate = useNavigate();

    const handleCreateTopic = async () => {
        if (!title.trim()) return;
    
        try {
            const userId = getUserIdFromToken();
            if (!userId) {
                console.error("User ID не знайдено!");
                return;
            }
    
            await createTopic(title, userId);
    
            navigate("/forum");
        } catch (error) {
            console.error("Помилка при створенні теми:", error);
        }
    };    

    return (
        <div className="new-topic-container">
            <h2>Створити нову тему</h2>
            <input 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                placeholder="Назва теми"
            />
            <button onClick={handleCreateTopic}>Створити</button>
        </div>
    );
};

export default NewTopic;
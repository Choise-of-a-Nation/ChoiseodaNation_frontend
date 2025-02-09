import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../ApiService/ApiService"; // Імпортуємо `logout`
import "./ProfileCom.css";

const ProfileCom = () => {
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState("");

    // Отримуємо email користувача (якщо потрібно)
    useEffect(() => {
        const email = localStorage.getItem("userEmail"); // Якщо email зберігається в localStorage
        if (email) setUserEmail(email);
    }, []);

    // Функція виходу
    const handleLogout = async () => {
        try {
            await logout(); // Викликаємо метод `logout` з `ApiService`

            // Видаляємо токени та email
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("userEmail");

            // Перенаправляємо користувача на сторінку входу
            navigate("/sign");
        } catch (error) {
            console.error("Помилка при виході:", error);
        }
    };

    return (
        <div className="profile-container">
            <h2>Профіль</h2>
            {userEmail && <p>Email: {userEmail}</p>}
            <button className="logout-btn" onClick={handleLogout}>Вийти</button>
        </div>
    );
};

export default ProfileCom;

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser, logout, updateUser, changePassword, uploadPhoto, getAchivs } from "../ApiService/ApiService";
import { User } from "../Entity/User";
import { Achivments } from "../Entity/Achivment";
import "./ProfileCom.css";
import { getUserIdFromToken } from "../Utilits/Auth";
import { UpdateUserDTO } from "../Entity/interfaces/UpdateDTO";

const ProfileCom = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    const [achivs, setAchivs] = useState<Achivments[]>([]);
    const [loading, setLoading] = useState(true);
    const userId = getUserIdFromToken();
    const [editedUser, setEditedUser] = useState<UpdateUserDTO | null>(null);
    const [passwordModal, setPasswordModal] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");
    
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (userId) {
            getUser(userId)
                .then((data) => {
                    setUser(data);
                    setEditedUser(data);
                })
                .catch((err) => console.error(err))
                .finally(() => setLoading(false));
        }
    }, [userId]);

    useEffect(() => {
        getAchivs()
            .then((data) => {
                setAchivs(data);
            })
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedUser(prev => prev ? { ...prev, [e.target.name]: e.target.value } : null);
    };

    const handlePlay = () => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            const gameUrl = `https://choise-of-a-nation-game-web.vercel.app/?token=${encodeURIComponent(token)}`;
            window.open(gameUrl, "_blank");
        } else {
            setMessage("Помилка: токен не знайдено");
        }
    };

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            try {
                const imageUrl = await uploadPhoto(file);
                setUser((prev) => prev ? { ...prev, url: imageUrl } : null);
                setEditedUser((prev) => prev ? { ...prev, url: imageUrl } : null);
            } catch (error) {
                console.error("Помилка завантаження фото", error);
                setMessage("Помилка завантаження фото!");
            }
        }
    };

    const handleSave = async () => {
        if (!userId || !editedUser) return;

        try {
            await updateUser(userId, editedUser);
            setMessage("Дані успішно оновлено!");
        } catch (error) {
            setMessage("Помилка при оновленні даних!");
            console.error(error);
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            navigate("/sign");
        } catch (error) {
            console.error("Помилка при виході:", error);
        }
    };

    const handlePasswordChange = async () => {
        if (!userId || !newPassword) {
            setMessage("Введіть новий пароль");
            return;
        }

        try {
            await changePassword(userId, newPassword);
            setMessage("Пароль успішно змінено!");
            setPasswordModal(false);
        } catch (error) {
            setMessage("Помилка при зміні пароля!");
            console.error(error);
        }
    };

    return (
        <div className="profile-container">
            <h1>Профіль</h1>
            {loading ? (
                <p>Завантаження...</p>
            ) : editedUser ? (
                <div className="user-info">
                    <div className="img" onClick={handleImageClick}>
                        <img src={user?.url || "/img/default-avatar.png"} alt="User Avatar" className="user-avatar" />
                    </div>
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        accept="image/*"
                        onChange={handleFileChange}
                    />

                    <div className="labels">
                        <label>
                            <strong>Ім'я:</strong>
                            <input 
                                type="text" 
                                name="firstName" 
                                value={editedUser.firstName || ""} 
                                onChange={(e) => {
                                    const value = e.target.value.replace(/[^a-zA-Zа-яА-ЯїієґЇІЄҐ\s\-]/g, "");
                                    setEditedUser(prev => prev ? { ...prev, firstName: value } : null);
                                }}                            
                            />
                        </label>
                        <label>
                            <strong>Прізвище:</strong>
                            <input 
                                type="text" 
                                name="lastName" 
                                value={editedUser.lastName || ""} 
                                onChange={(e) => {
                                    const value = e.target.value.replace(/[^a-zA-Zа-яА-ЯїієґЇІЄҐ\s\-]/g, "");
                                    setEditedUser(prev => prev ? { ...prev, lastName: value } : null);
                                }}
                            />
                        </label>
                        <label>
                            <strong>Username:</strong>
                            <input 
                                type="text" 
                                name="username" 
                                value={editedUser.username || ""} 
                                onChange={handleInputChange} 
                            />
                        </label>
                        <label>
                            <strong>Email:</strong>
                            <input 
                                type="email" 
                                name="email" 
                                value={editedUser.email || ""} 
                                onChange={handleInputChange} 
                            />
                        </label>
                        <label>
                            <strong>Телефон:</strong>
                            <input
                                type="tel"
                                name="phoneNumber"
                                value={editedUser.phoneNumber || ""}
                                onChange={(e) => {
                                    const cleaned = e.target.value.replace(/[^0-9+\-()\s]/g, "");
                                    setEditedUser(prev => prev ? { ...prev, phoneNumber: cleaned } : null);
                                }}
                                pattern="[0-9+\-()\s]*"
                                placeholder="+380..."
                            />
                        </label>
                        <label>
                            <strong>Кількість зіграних годин: </strong>
                            <strong>{user ? (user.playedHours / 3600 / 3600 / 60).toFixed(1) : "0"} год.</strong>
                        </label>

                        {user && achivs.length > 0 && (
                            <div className="achievements">
                                <h2>Досягнення</h2>
                                <ul>
                                    {achivs
                                        .filter(achiv => achiv.userId === user.id)
                                        .map((achiv, idx) => (
                                            <li key={idx}>
                                                <strong>{achiv.name}</strong>: {achiv.description}
                                            </li>
                                        ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <p>Користувач не знайдений</p>
            )}
            {message && <p>{message}</p>}
            <div className="buttons">
                <button onClick={handlePlay}>Грати</button>
                <button onClick={handleSave}>Зберегти</button>
                <button onClick={() => setPasswordModal(true)}>Змінити пароль</button>
                <button onClick={handleLogout}>Вийти</button>
            </div>

            {passwordModal && (
                <div className="modal">
                    <h3>Змінити пароль</h3>
                    <input
                        type="password"
                        placeholder="Новий пароль"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <button onClick={handlePasswordChange}>Підтвердити</button>
                    <button onClick={() => setPasswordModal(false)}>Закрити</button>
                </div>
            )}
        </div>
    );
};

export default ProfileCom;

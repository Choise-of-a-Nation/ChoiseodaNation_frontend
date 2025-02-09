import React, { useState } from "react";
import { LoginDTO, UserDTO } from "../Entity/interfaces/RegLogInt";
import { loginUser, registerUser } from "../ApiService/ApiService";
import "./LoginRegister.css";

const LoginRegister: React.FC = () => {
  const [isRegistering, setIsRegistering] = useState(true);
  const [formData, setFormData] = useState<UserDTO | LoginDTO>({
    username: "",
    email: "",
    password: "",
  });

  const [confirmPassword, setConfirmPassword] = useState(""); 
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (isRegistering) {
      if ((formData as UserDTO).password !== confirmPassword) {
        setError("Паролі не співпадають!");
        return;
      }
    }

    try {
      if (isRegistering) {
        const data = await registerUser(formData as UserDTO);
        localStorage.setItem("accessToken", data.AccessToken);
        localStorage.setItem("refreshToken", data.RefreshToken);
        setSuccess("Реєстрація успішна! Тепер увійдіть у систему.");
        window.location.href = "/";
      } else {
        const data = await loginUser(formData as LoginDTO);
        localStorage.setItem("accessToken", data.AccessToken);
        localStorage.setItem("refreshToken", data.RefreshToken);
        setSuccess("Вхід успішний! Ви авторизовані.");
        window.location.href = "/";
      }
    } catch (err: any) {
      setError("Помилка: " + err.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>{isRegistering ? "Реєстрація" : "Вхід"}</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      <form onSubmit={handleSubmit}>
        {isRegistering && (
          <input
            type="text"
            name="username"
            placeholder="Ім'я користувача"
            value={(formData as UserDTO).username || ""}
            onChange={handleChange}
            required
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Пароль"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {isRegistering && (
          <input
            type="password"
            name="confirmPassword"
            placeholder="Підтвердіть пароль"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
          />
        )}
        <button type="submit">
          {isRegistering ? "Зареєструватися" : "Увійти"}
        </button>
      </form>

      <p>
        {isRegistering ? "Вже маєте акаунт?" : "Не маєте акаунту?"}{" "}
        <button onClick={() => setIsRegistering(!isRegistering)}>
          {isRegistering ? "Увійти" : "Реєстрація"}
        </button>
      </p>
    </div>
  );
};

export default LoginRegister;

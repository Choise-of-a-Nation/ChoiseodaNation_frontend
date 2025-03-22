import React, { useState } from "react";
import { LoginDTO, UserDTO } from "../Entity/interfaces/RegLogInt";
import { loginUser, registerUser, loginWithGoogle } from "../ApiService/ApiService";
import { GoogleLogin } from '@react-oauth/google';
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
  
    try {
      if (isRegistering) {
        const data = await registerUser(formData as UserDTO);
        window.location.href = "/";
      } else {
        const data = await loginUser(formData as LoginDTO);
  
        if (data.accessToken && data.refreshToken) {
          console.log("Tokens received:", data);
  
          localStorage.setItem("accessToken", data.accessToken);
          localStorage.setItem("refreshToken", data.refreshToken);
          
          setSuccess("Вхід успішний! Ви авторизовані.");
          window.location.href = "/";
        } else {
          throw new Error("Сервер не повернув токени.");
        }
      }
    } catch (err: any) {
      setError("Помилка: " + err.message);
    }
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      const data = await loginWithGoogle(credentialResponse.credential);
      if (data.accessToken && data.refreshToken) {
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        setSuccess("Вхід через Google успішний!");
        window.location.href = "/";
      }
    } catch (err: any) {
      setError("Помилка входу через Google: " + err.message);
    }
  };

  const handleGoogleError = () => {
    setError("Помилка входу через Google");
  };

  return (
    <div className="auth-container">
      <h2>{isRegistering ? "Реєстрація" : "Вхід"}</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      <form onSubmit={handleSubmit}>
        {isRegistering && (
          <div className="input-group">
          <label>Ім'я користувача</label>
          <input
            type="text"
            name="username"
            placeholder="Ім'я користувача"
            value={(formData as UserDTO).username || ""}
            onChange={handleChange}
            required
          />
          </div>
        )}
        <div className="input-group">
        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        </div>
        <div className="input-group">
        <label>Пароль</label>
        <input
          type="password"
          name="password"
          placeholder="Пароль"
          value={formData.password}
          onChange={handleChange}
          required
        />
        </div>
        {isRegistering && (
          <div className="input-group">
          <label>Підтвердження пароля</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Підтвердіть пароль"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
          />
          </div>
        )}
        <button type="submit">
          {isRegistering ? "Зареєструватися" : "Увійти"}
        </button>
      </form>

      {!isRegistering && (
        <div className="google-login-container">
          <p>Або увійдіть через Google:</p>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            useOneTap
          />
        </div>
      )}

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

export const getUserIdFromToken = (): string | null => {
    const token = localStorage.getItem("accessToken");
    if (!token) return null;

    try {
        const payload = JSON.parse(atob(token.split(".")[1])); // Декодуємо payload токена
        return payload.UserId || null; // Отримуємо UserId
    } catch (error) {
        console.error("Помилка декодування токена:", error);
        return null;
    }
};

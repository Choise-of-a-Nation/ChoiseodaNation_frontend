
export const getUserIdFromToken = (): string | null => {
    const token = localStorage.getItem("accessToken");
    if (!token) return null;

    try {
        const payload = JSON.parse(atob(token.split(".")[1])); 
        return payload.UserId || null; 
    } catch (error) {
        console.error("Помилка декодування токена:", error);
        return null;
    }
};

export const getUserRoleFromToken = (): string | null => {
    const token = localStorage.getItem("accessToken");
    if (!token) return null;

    try {
        const payload = JSON.parse(atob(token.split(".")[1])); 
        return payload.RoleId || null;
    } catch (error) {
        console.error("Помилка декодування токена:", error);
        return null;
    }
};

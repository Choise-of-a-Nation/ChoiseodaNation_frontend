export const baseUrl = "https://cn-api-man.azure-api.net/"
export const getUsersUrl = "register/get-users"
export const loginUrl = "register/login"
export const registerUrl = "register/register"
export const logoutUrl = "register/logout"
export const getUserUrl = (userId: number) => `register/get-user?id=${userId}`;
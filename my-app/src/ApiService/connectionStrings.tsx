export const baseUrl = "https://cn-api-man.azure-api.net/"
export const getUsersUrl = "register/get-users"
export const loginUrl = "register/login"
export const registerUrl = "register/register"
export const logoutUrl = "register/logout"
export const getUserUrl = (userId: string) => `register/get-user/${userId}`;
export const uploadAv = "register/upload-photo";
export const getNewsUrl = "news/get-news";
export const getNewUrl = (newId: number) => `news/get-new/${newId}`;
export const createNewsUrl = "news/create-news";
export const getWikiUrl = "history/get-wiki";
export const getWikUrl = (wikId: number) => `history/get-wik/${wikId}`;
export const createWikiUrl = "history/create-wiki";
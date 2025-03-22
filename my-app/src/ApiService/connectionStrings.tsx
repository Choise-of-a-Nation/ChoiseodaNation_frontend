export const baseUrl = "https://choiseofanation.tryasp.net/"
export const getUsersUrl = "register/get-users"
export const loginUrl = "register/login"
export const googleLoginUrl = "register/google-login"
export const registerUrl = "register/register"
export const registerUrlAdmin = "register/register-admin"
export const logoutUrl = "register/logout"
export const getUserUrl = (userId: string) => `register/get-user/${userId}`;
export const uploadAv = "register/upload-photo";
export const getNewsUrl = "news/get-news";
export const getNewUrl = (newId: number) => `news/get-new/${newId}`;
export const createNewsUrl = "news/create-news";
export const getWikiUrl = "history/get-wiki";
export const getWikUrl = (wikId: number) => `history/get-wik/${wikId}`;
export const createWikiUrl = "history/create-wiki";
export const deleteUserUrl = (id: string) => `register/delete-user/${id}`;
export const deleteNewsUrl = (id: number) => `news/delete-news/${id}`;
export const deleteHistoryUrl = (id: number) => `history/delete-history/${id}`;
export const deleteTopicUrl = (id: string) => `forum/delete-topic/${id}`;
import axios from 'axios';
import { baseUrl, createNewsUrl, createWikiUrl, deleteHistoryUrl, deleteNewsUrl, deleteTopicUrl, deleteUserUrl, getNewUrl, getNewsUrl, getUserUrl, getUsersUrl, getWikUrl, getWikiUrl, loginUrl, logoutUrl, registerUrl, registerUrlAdmin, uploadAv, googleLoginUrl, getAchivsUrl } from './connectionStrings';
import { LoginDTO, UserDTO, UserDTOAdmin } from '../Entity/interfaces/RegLogInt';
import { UpdateUserDTO, UpdateUserDTOAdmin } from '../Entity/interfaces/UpdateDTO';
import { NewsDTO } from '../Entity/interfaces/NewsDTO';
import { WikiDTO } from '../Entity/interfaces/WikiDTO';

export const getUsers = () => {
    return axios.get(baseUrl + getUsersUrl)
      .then(response => response.data)
      .catch(error => {
        throw error;
      });
  };

  export const getAchivs = () => {
    return axios.get(baseUrl + getAchivsUrl)
      .then(response => response.data)
      .catch(error => {
        throw error;
      });
  };

  export const registerUser = (userData: UserDTO) => {
    return axios.post(baseUrl + registerUrl, userData)
      .then(response => response.data)
      .catch(error => {
        throw error;
      });
  };

  export const registerUserAdmin = (userData: UserDTOAdmin) => {
    return axios.post(baseUrl + registerUrlAdmin, userData)
      .then(response => response.data)
      .catch(error => {
        throw error;
      });
  };
  
 
  export const loginUser = async (loginData: LoginDTO) => {
    try {
      const response = await axios.post(baseUrl + loginUrl, loginData);
      
      console.log("RAW response:", response.data); 
      
      const parsedData = typeof response.data === "string" ? JSON.parse(response.data) : response.data;
  
      console.log("Parsed response:", parsedData); 
  
      return parsedData;
    } catch (error) {
      console.error("Login Error:", error);
      throw error;
    }
  };
  
  export const logout = () => {
    return axios.post(baseUrl + logoutUrl)
      .then(response => response.data)
      .catch(error => {
        throw error;
      });
  };

  export const getUser = (id: string) => {
    return axios.get(baseUrl + getUserUrl(id))
      .then(response => response.data)
      .catch(error => {
        throw error;
      });
  };

  export const updateUser = async (userId: string, userData: UpdateUserDTO) => {
    return axios.put(`${baseUrl}register/update-user/${userId}`, userData)
        .then(response => response.data)
        .catch(error => {
            throw error;
        });
  };

  export const updateUserAdmin = async (userId: string, userData: UpdateUserDTOAdmin) => {
    return axios.put(`${baseUrl}register/update-user-admin/${userId}`, userData)
        .then(response => response.data)
        .catch(error => {
            throw error;
        });
  };

  export const changePassword = async (userId: string, newPassword: string) => {
    return axios.put(`${baseUrl}register/change-password/${userId}`, {
        newPassword
    })
    .then(response => response.data)
    .catch(error => {
        throw error;
    });
  };

  export const uploadPhoto = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
  
    const response = await axios.post(
      baseUrl + uploadAv,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
  
    return response.data.imageUrl;
  };

  export const getTopics = async () => {
    return axios.get(`${baseUrl}forum/get-topics`)
        .then(res => res.data)
        .catch(error => { throw error; });
};

export const getTopicById = async (id: string) => {
    return axios.get(`${baseUrl}forum/get-topic/${id}`)
        .then(res => res.data)
        .catch(error => { throw error; });
};

export const createTopic = async (title: string, userId: string, description: string) => {
    return axios.post(`${baseUrl}forum/create-topic`, { title, description, userId})
        .then(res => res.data)
        .catch(error => { throw error; });
};

export const addComment = async (topicId: string, userId: string, content: string) => {
    return axios.post(`${baseUrl}forum/add-comment`, { topicId, userId, content })
        .then(res => res.data)
        .catch(error => { throw error; });
};


export const getCommentsByTopicId = async (topicId: string) => {
  return axios.get(`${baseUrl}forum/get-comments/${topicId}`)
      .then(response => response.data)
      .catch(error => {
          console.error("Помилка завантаження коментарів:", error);
          throw error;
      });
};

export const deleteComment = async (commentId: string) => {
    return axios.delete(`${baseUrl}forum/delete-comm/${commentId}`)
        .then(response => response.data)
        .catch(error => {
            console.error("Помилка видалення коментаря:", error);
            throw error;
        });
};

export const getNews = () => {
  return axios.get(baseUrl + getNewsUrl)
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};

export const createNews = (newsData: NewsDTO) => {
  return axios.post(baseUrl + createNewsUrl, newsData)
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};

export const getNew = (id: number) => {
  return axios.get(baseUrl + getNewUrl(id))
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};

export const getWiki = () => {
  return axios.get(baseUrl + getWikiUrl)
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};

export const createWiki = (wikiData: WikiDTO) => {
  return axios.post(baseUrl + createWikiUrl, wikiData)
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};

export const getWik = (id: number) => {
  return axios.get(baseUrl + getWikUrl(id))
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};

export const deleteUser = (id: string) => {
  return axios.delete(baseUrl + deleteUserUrl(id))
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};

export const deleteNews = (id: number) => {
  return axios.delete(baseUrl + deleteNewsUrl(id))
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};

export const deleteHistory = (id: number) => {
  return axios.delete(baseUrl + deleteHistoryUrl(id))
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};

export const deleteForum = (id: string) => {
  return axios.delete(baseUrl + deleteTopicUrl(id))
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};

export const loginWithGoogle = async (credential: string) => {
  try {
    const response = await axios.post(baseUrl + googleLoginUrl, { credential });
    const parsedData = typeof response.data === "string" ? JSON.parse(response.data) : response.data;
    return parsedData;
  } catch (error) {
    console.error("Google Login Error:", error);
    throw error;
  }
};
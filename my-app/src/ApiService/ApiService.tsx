import axios from 'axios';
import { baseUrl, getUserUrl, getUsersUrl, loginUrl, logoutUrl, registerUrl, uploadAv } from './connectionStrings';
import { LoginDTO, UserDTO } from '../Entity/interfaces/RegLogInt';
import { UpdateUserDTO } from '../Entity/interfaces/UpdateDTO';

export const getUsers = () => {
    return axios.get(baseUrl + getUsersUrl)
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
    return axios.put(`${baseUrl}/register/update-user/${userId}`, userData)
        .then(response => response.data)
        .catch(error => {
            throw error;
        });
  };

  export const changePassword = async (userId: string, newPassword: string) => {
    return axios.put(`${baseUrl}/register/change-password/${userId}`, {
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

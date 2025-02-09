import axios from 'axios';
import { baseUrl, getUserUrl, getUsersUrl, loginUrl, logoutUrl, registerUrl } from './connectionStrings';
import { LoginDTO, UserDTO } from '../Entity/interfaces/RegLogInt';

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
  
 
  export const loginUser = (loginData: LoginDTO) => {
    return axios.post(baseUrl + loginUrl, loginData)
      .then(response => response.data)
      .catch(error => {
        throw error;
      });
  };

  export const logout = () => {
    return axios.post(baseUrl + logoutUrl)
      .then(response => response.data)
      .catch(error => {
        throw error;
      });
  };

  export const getUser = (userId: number) => {
    return axios.get(baseUrl + getUserUrl(userId))
      .then(response => response.data)
      .catch(error => {
        throw error;
      });
  };
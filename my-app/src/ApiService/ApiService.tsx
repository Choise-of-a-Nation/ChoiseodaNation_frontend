import axios from 'axios';
import { baseUrl, getUsersUrl, loginUrl, registerUrl } from './connectionStrings';
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
  
 
  export const loginUser = async (loginData: LoginDTO) => {
    return axios.post(baseUrl + loginUrl, loginData)
      .then(response => response.data)
      .catch(error => {
        throw error;
      });
  };
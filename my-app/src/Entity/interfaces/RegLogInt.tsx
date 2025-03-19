export interface UserDTO {
    username: string;
    email: string;
    password: string;
  }

  export interface UserDTOAdmin {
    username: string;
    email: string;
    password: string;
    roleId: number;
  }
  
  export interface LoginDTO {
    email: string;
    password: string;
  }
  
export interface UpdateUserDTO {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    phoneNumber: string;
    url: string;
  }

  export interface UpdateUserDTOAdmin {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    phoneNumber: string;
    url: string;
    roleId: number;
  }
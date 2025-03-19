export class User{
    id: string;
    firstName: string;
    lastName: string;
    roleId: number;
    url: string;
    username: string;
    email: string;
    phoneNumber: string;
    password: string;

    constructor(id: string, 
                firstName: string, 
                lastName: string, 
                roleId: number, 
                url: string, 
                username: string, 
                email: string, 
                phoneNumber: string,
                password: string)
    {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.roleId = roleId;
        this.url = url;
        this.username = username;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.password = password;
    }
}
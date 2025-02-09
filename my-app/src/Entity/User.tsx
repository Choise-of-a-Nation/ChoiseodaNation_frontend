export class User{
    id: number;
    firstName: string;
    lastName: string;
    roleId: number;
    url: string;
    username: string;
    email: string;
    phoneNumber: string;

    constructor(id: number, 
                firstName: string, 
                lastName: string, 
                roleId: number, 
                url: string, 
                username: string, 
                email: string, 
                phoneNumber: string)
    {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.roleId = roleId;
        this.url = url;
        this.username = username;
        this.email = email;
        this.phoneNumber = phoneNumber;
    }
}
import { useEffect, useState } from "react";
import "./UserAdmin.css";
import { deleteUser, getUsers, registerUserAdmin, updateUserAdmin } from "../../ApiService/ApiService";
import { User } from "../../Entity/User";
import { UserDTO, UserDTOAdmin } from "../../Entity/interfaces/RegLogInt";

function UserAdmin() {
    const [users, setUsers] = useState<User[]>([]);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [formData, setFormData] = useState<Omit<User, "id">>({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        roleId: 2,   
        url: "",      
        username: "",
        password: "",
        playedHours: 0
    });
    

    useEffect(() => {
        getUsers().then(setUsers);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (editingUser) {
            await updateUserAdmin(editingUser.id, formData);
            setUsers(users.map((user) => (user.id === editingUser.id ? { ...user, ...formData } : user)));
        } else {
            const newUser: UserDTOAdmin = {
                ...formData,
                password: formData.password || "defaultPassword", 
            };
        
            const createdUser = await registerUserAdmin(newUser);
            setUsers([...users, createdUser]);
        }
        
        setEditingUser(null);
        setFormData({ firstName: "", lastName: "", email: "", phoneNumber: "", roleId: 2, url: "", username: "", password: "", playedHours: 0 });
    };

    const handleEditUser = (user: User) => {
        setEditingUser(user);
        setFormData({ firstName: user.firstName, lastName: user.lastName, email: user.email, phoneNumber: user.phoneNumber, roleId: user.roleId, url: user.url, username: user.username, password: user.password, playedHours: user.playedHours });
    };

    const handleDeleteUser = async (id: string) => {
        await deleteUser(id);
        setUsers(users.filter((user) => user.id !== id));
    };

    return (
        <div className="users-admin">
            <h2>Користувачі</h2>

            <form onSubmit={handleSubmit} className="user-form">
                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="Ім'я" required />
                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Прізвище" required />
                <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" required />
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
                <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="Номер телефону" required />
                <select name="roleId" value={formData.roleId} onChange={handleChange} required>
                    <option value="">Оберіть роль</option>
                    <option value="Full">Адмін</option>
                    <option value="Client">Користувач</option>
                </select>
                <button type="submit">{editingUser ? "Оновити" : "Додати"}</button>
                {editingUser && <button type="button" onClick={() => setEditingUser(null)}>Скасувати</button>}
            </form>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Ім'я</th>
                        <th>Прізвище</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Номер телефону</th>
                        <th>Роль</th>
                        <th>Дії</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.phoneNumber}</td>
                            <td>{user.roleId}</td>
                            <td>
                                <button onClick={() => handleEditUser(user)}>Редагувати</button>
                                <button onClick={() => handleDeleteUser(user.id)}>Видалити</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UserAdmin;
import bcrypt from 'bcryptjs';

export interface User {
    id: number;
    username: string;
    password: string; // Almacena la contraseña hash
}

export const users: User[] = [];
let nextUserId = 1;

// Función para registrar un nuevo usuario
export const registerUser = (username: string, password: string): User => {
    const hashedPassword = bcrypt.hashSync(password, 8);
    const newUser: User = { id: nextUserId++, username, password: hashedPassword };
    users.push(newUser);
    return newUser;
};

// Función para autenticar un usuario
export const authenticateUser = (username: string, password: string): User | undefined => {
    const user = users.find(user => user.username === username);
    if (user && bcrypt.compareSync(password, user.password)) {
        return user;
    }
    return undefined;
};

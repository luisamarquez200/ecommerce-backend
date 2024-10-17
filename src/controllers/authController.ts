import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { registerUser, authenticateUser } from '../models/user';

const JWT_SECRET = 'your_jwt_secret';

export const register = (req: Request, res: Response) => {
    const { username, password } = req.body;
    const newUser = registerUser(username, password);
    res.status(201).json({ id: newUser.id, username: newUser.username });
};

export const login = (req: Request, res: Response) => {
    const { username, password } = req.body;
    const user = authenticateUser(username, password);
    if (user) {
        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ auth: true, token });
    } else {
        res.status(401).json({ auth: false, message: 'Invalid credentials' });
    }
};

export const verifyToken = (req: Request, res: Response, next: Function) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(403).json({ auth: false, message: 'No token provided' });

    jwt.verify(token, JWT_SECRET, (err: any) => {
        if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token' });
        next();
    });
};

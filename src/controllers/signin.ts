import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/index.js'; // Asegúrate de importar bien
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || '';

export const signin = async (req: any, res: any) => {

    try {
            const { user_name, user_lastname, email, password, asset_link } = req.body;
            // ¿Ya existe ese email?
            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                return res.status(400).json({ message: 'Email already registered' });
            }

            // Hashear la contraseña
            const hashedPassword = await bcrypt.hash(password, 10);

            // Crear el usuario
            const newUser = await User.create({
                user_name,
                user_lastname,
                email,
                password: hashedPassword,
            });

            const token = jwt.sign({ id: newUser.id }, JWT_SECRET, { expiresIn: '1h' });

            res.status(201).json({ message: 'User created successfully', token });

    } catch (err: any) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};
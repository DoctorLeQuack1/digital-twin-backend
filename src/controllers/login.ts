import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/index.js'; 
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || '';

export const login = async (req: any, res: any) => {
    const { email, password } = req.body;
    try {
            
            const user = await User.findOne({ where: { email } });
            if (!user) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
            res.status(200).json({ message: 'Login successful', token, user_email: email,user_name: user.user_name, user_last_name: user.user_lastname});
    } catch (err: any) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}
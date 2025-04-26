import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || '';
export const validate = async (req, res) => {
    const authHeader = req.headers.authorization;
    // Validar si el token existe
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token missing or malformed' });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET); // Tu clave secreta
        res.status(200).json({ valid: true }); // Opcional: enviar datos del token
    }
    catch (err) {
        res.status(403).json({ message: 'Invalid or expired token' });
    }
};

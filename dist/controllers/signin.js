import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User, Asset } from '../models/index.js'; // Asegúrate de importar bien
import dotenv from 'dotenv';
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || '';
const asset_list = ["https://storage.googleapis.com/digital_twin_assets/Computer.glb",
    "https://storage.googleapis.com/digital_twin_assets/DeaverHouse.glb",
    "https://storage.googleapis.com/digital_twin_assets/Factory.glb",
    "https://storage.googleapis.com/digital_twin_assets/Vancouver.glb",
    "https://storage.googleapis.com/digital_twin_assets/camping.glb"];
export const signin = async (req, res) => {
    const num = Math.floor(Math.random() * 5);
    console.log(`This is the num: ${num}`);
    try {
        const { user_name, user_lastname, email, password } = req.body;
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
        // Crear un valor en la tabla con el id del usuario
        const newAsset = await Asset.create({
            user_id: newUser.id,
            asset_link: asset_list[num]
        });
        const token = jwt.sign({ id: newUser.id }, JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ message: 'User created successfully', token, user_email: email, user_name: user_name, user_last_name: user_lastname });
    }
    catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

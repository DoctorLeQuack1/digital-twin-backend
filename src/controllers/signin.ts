import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { NoSQLUser, NoSQLAsset } from '../models/NoSQLSchema.js'; // Importa tus modelos de Mongoose
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || '';

const asset_list = ["https://storage.googleapis.com/digital_twin_assets/Computer.glb",
    "https://storage.googleapis.com/digital_twin_assets/DeaverHouse.glb",
    "https://storage.googleapis.com/digital_twin_assets/Factory.glb",
    "https://storage.googleapis.com/digital_twin_assets/Vancouver.glb",
    "https://storage.googleapis.com/digital_twin_assets/camping.glb"]

export const signin = async (req: any, res: any) => {
    const num = Math.floor(Math.random() * 5);
    console.log(`This is the num: ${num}`);

    try {
        const { user_name, user_lastname, email, password } = req.body;
        
        // ¿Ya existe ese email?
        const existingUser = await NoSQLUser.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

       const user = new NoSQLUser({
            user_name,
            user_lastname,
            email,
            password: hashedPassword
        });

        await user.save();

        const asset = new NoSQLAsset({
            user_id: user._id, // Usar el _id de Mongoose
            asset_link: asset_list[num]
        });

        await asset.save();

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ message: 'User created successfully', token, user_email: email, user_name: user_name, user_last_name: user_lastname });

    } catch (err: any) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};
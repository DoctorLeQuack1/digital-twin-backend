import dotenv from 'dotenv';
import { Users } from '../models/index.js';
dotenv.config();


const asset_list = ["https://storage.googleapis.com/digital_twin_assets/Computer.glb",
    "https://storage.googleapis.com/digital_twin_assets/DeaverHouse.glb",
    "https://storage.googleapis.com/digital_twin_assets/Factory.glb",
    "https://storage.googleapis.com/digital_twin_assets/Vancouver.glb",
    "https://storage.googleapis.com/digital_twin_assets/camping.glb"]

export const addUser = async (input: any) => {

    const num = Math.floor(Math.random() * 5);
    console.log(`This is the num: ${num}`);

    try {

         // ¿Ya existe ese email?
        const existingUser = await Users.findOne({ email: input.email });

        if (existingUser) {
            throw new Error('Email already registered');
        }
        input.asset = asset_list[num];
        const users = await Users.create({ ...input });

        return { users };

    } catch (err: any) {
        throw new Error(`Server error: ${err.message}`);
    }
};
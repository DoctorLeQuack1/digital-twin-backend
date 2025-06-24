
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { NoSQLAsset, NoSQLUser} from '../models/NoSQLSchema.js';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || '';

export const fetch_glb = async (req: any, res: any) => {
    try {
        const authHeader = req.headers.authorization;
        const user_email = req.headers['useremail'];
        if (!authHeader) {
            return res.status(401).json({ valid: false, asset: undefined });
        }
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET || '5up3R_54f3_P4a55W0rD#1_3@2$4%3^5&0*8(9)7'); // usa tu secret aquí

        const user = await NoSQLUser.findOne({ email : user_email });

        if (user) {
            const asset_link = await NoSQLAsset.findOne({
                user_id : user.id
            });
            return res.status(200).json({ valid: true, asset: asset_link });
        } else {
            return res.status(200).json({ valid: true, asset: undefined});
        }

    } catch (error) {
        return res.status(401).json({ valid: false, asset: undefined });
    }
};
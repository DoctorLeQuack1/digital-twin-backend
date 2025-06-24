// Define Mongoose
import { Schema, model } from 'mongoose';
const userSchema = new Schema({
    user_name: {
        type: String,
        required: true
    },
    user_lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});
const assetSchema = new Schema({
    user_id: {
        type: String,
        required: true,
        ref: 'User' // Reference to the User model
    },
    asset_link: {
        type: String,
        required: true
    }
});
export const NoSQLUser = model('User', userSchema);
export const NoSQLAsset = model('Asset', assetSchema);
// Define a schema for grocery items

// Define Mongoose
import { Schema, model, Document } from 'mongoose';


// Define an interface for the Item document
interface IUser extends Document {
  _id: string; // Mongoose will create an _id field by default
  user_name: string;
  user_lastname: string;
  email: string;
  password: string;
}

interface IAsset extends Document {
  _id: string; // Mongoose will create an _id field by default
  user_id: string; // Reference to the user
  asset_link: string; // URL of the asset
}

const userSchema = new Schema<IUser>({
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

const assetSchema = new Schema<IAsset>({
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

export const NoSQLUser = model<IUser>('User', userSchema);
export const NoSQLAsset = model<IAsset>('Asset', assetSchema);
// Define a schema for grocery items


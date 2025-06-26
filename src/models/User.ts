import { Schema, model, type Document } from 'mongoose';
import bcrypt from 'bcrypt'


export interface IUsers extends Document {
    email: string;
    password: string;
    name: string;
    last_name: string;
    asset: string;
    isCorrectPassword(password: string): Promise<boolean>
};

const usersSchema = new Schema<IUsers>({
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Must match an email address!'],
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    last_name: {
        type: String,
        required: true
    },
    asset: {
        type: String,
        trim: true
    }
});

// pre save middleware
usersSchema.pre<IUsers>('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds)
    }
    next();
});

// compare the incoming password with the hashed one
usersSchema.methods.isCorrectPassword = async function (password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password)
}

const Users = model<IUsers>('users', usersSchema);

export default Users
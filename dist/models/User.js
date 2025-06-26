import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
;
const usersSchema = new Schema({
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
usersSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
});
// compare the incoming password with the hashed one
usersSchema.methods.isCorrectPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};
const Users = model('users', usersSchema);
export default Users;

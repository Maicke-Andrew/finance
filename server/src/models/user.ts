const bcrypt = require('bcrypt');
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    id: {
        type: String,
        default: () => Math.random().toString(36).substr(2, 9),
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    login: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    pictureUrl: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

UserSchema.pre("save", async function (next) {
    this.password = await bcrypt.hash(this.password, 10)

    next()
});

const User = mongoose.model('user', UserSchema);

export default User
const bcrypt = require('bcrypt');
import User from '../models/user';
import jwt from 'jsonwebtoken';
import temporaryUser from '../models/temporaryUser';

export const login = async (req: any) => {
    try {
        const { login, password } = req.body;

        const user = await User.findOne({ login: login }).select("+password");


        if (!user) {
            return { error: "User or Password not found" }
        }

        const passwordIsValid = bcrypt.compareSync(password, user.password);

        if (!passwordIsValid) {
            return { error: "User or Password not found" }
        }

        const token = jwt.sign({ id: user._id }, process.env.SECRET_JWT!, { expiresIn: 86400 });

        return { user, token }
    } catch (e) {
        return { error: e }
    }
}

export const emailUsedOrNot = async (email: string) => {
    try {
        const user = await User.findOne({ email: email })

        if (user) {
            return { error: 'Email is already in use' }
        }

        const userTemporary = await temporaryUser.findOne({ email: email })

        if (userTemporary) {
            return { error: 'You start create account recently with this email, check your email for validate your account' }
        }

        return false
    } catch (e) {
        return { error: e }
    }
}

export const loginUsedOrNot = async (login: string) => {
    try {
        const user = await User.findOne({ login: login })

        if (user) {
            return { error: 'Login is alredy in used' }
        }

        const userTemporary = await temporaryUser.findOne({ login: login })

        if (userTemporary) {
            return { error: 'This login was sent recently, if it was you, wait a moment or check your email' }
        }

        return true
    } catch (e) {
        return { error: e }
    }
}

export const validateTokenPass = async (token: string) => {
    try {
        if (!token) {
            return { error: 'Has no token try again' }
        }

        try {
            await jwt.verify(token, process.env.SECRET_JWT!)
        } catch {
            return { error: 'Token has expired try again' }
        }

        return true
    } catch (e) {
        return { error: e }
    }
}

export const loginWithGoogle = async (req: any) => {
    try {
        const { login, password } = req;

        const user = await User.findOne({ login: login }).select("+password");

        if (!user) {
            return { error: "User or Password not found" };
        }

        const passwordIsValid = bcrypt.compareSync(password, user.password);

        if (!passwordIsValid) {
            return { error: "User or Password not found" };
        }

        const token = jwt.sign({ id: user._id }, process.env.SECRET_JWT!, { expiresIn: 86400 });

        return { user, token }
    } catch (e) {
        return { error: e }
    }
}
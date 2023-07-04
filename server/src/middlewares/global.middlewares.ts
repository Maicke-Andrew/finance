import mongoose from "mongoose";
import path from 'path';
import User from '../models/user';
import multer from 'multer'
import jwt from 'jsonwebtoken'

export const validId = (req: any, res: any, next: any) => {
    try {
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({ message: "id invalido" });
        }

        next();
    } catch (err: any) {
        res.satus(500).send({ message: err.message });
    }
}

export const validUser = async (req: any, res: any, next: any) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).send({ message: "usuário não encontrado" });
        }

        req.id = id;
        req.user = user;
        next();
    } catch (err: any) {
        res.satus(500).send({ message: err.message });
    }
}

export const validateToken = async (token: string) => {
    try {
        if (!token) {
            return "Has no token"
        }

        const response: any = jwt.verify(token, process.env.SECRET_JWT!)

        if (!response.id) {
            return "token expired"
        }

        const user = await User.findById(response.id).select('+pasword');

        if (!user) {
            return 'error'
        }

        return user
    } catch (err: any) {
        return err
    }
}


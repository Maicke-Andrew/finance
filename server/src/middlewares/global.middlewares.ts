import mongoose from "mongoose";
import path from 'path';
import User from '../models/user';
// const multer = require('multer');
import multer from 'multer'
const jwt = require('jsonwebtoken');

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

        const id = jwt.verify(token, process.env.SECRET_JWT!)

        if (!id) {
            return "token expired"
        }

        const user = await User.findById(id).select('+pasword');

        if (!user) {
            return 'error'
        }

        return user
    } catch (err: any) {
        return err
    }
}

export const fileMulter = multer.diskStorage({
    destination: (req: any, file: any, cb: any) => {
        const uploadsDir = path.join(__dirname, `../../uploads/${req.body.dest}`);
        cb(null, uploadsDir)
    },
    filename: (req: any, file: any, cb: any) => {
        const time = new Date();
        const formatedTime = `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()}_${time.getHours()};${time.getMinutes()};${time.getSeconds()}`;
        cb(null, `${formatedTime}_${file.originalname}`)
    }
})
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateImage = exports.updatePassword = exports.newPasswordRedirect = exports.emailUpdatePassword = exports.confirmAccountByLink = exports.sendEmailNewAccount = exports.googleAuthentic = void 0;
const bcrypt = require('bcrypt');
const https_1 = __importDefault(require("https"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const shortid_1 = __importDefault(require("shortid"));
const temporaryUser_1 = __importDefault(require("../models/temporaryUser"));
const user_1 = __importDefault(require("../models/user"));
const auth_service_1 = require("./auth.service");
const googleAuthentic = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const options = {
            hostname: 'www.googleapis.com',
            path: `/oauth2/v1/userinfo?access_token=${token}`,
            method: 'GET'
        };
        return new Promise((resolve, reject) => {
            const request = https_1.default.request(options, response => {
                let data = '';
                response.on('data', chunk => {
                    data += chunk;
                });
                response.on('end', () => __awaiter(void 0, void 0, void 0, function* () {
                    const userData = JSON.parse(data);
                    if (!userData.error) {
                        const user = yield user_1.default.findOne({ email: userData.email });
                        if (!user) {
                            const newUser = {
                                name: userData.given_name,
                                surname: userData.family_name,
                                login: userData.name,
                                email: userData.email,
                                password: userData.id,
                                pictureUrl: userData.picture
                            };
                            const newLogin = yield newUserWithGoogle(newUser);
                            if (newLogin) {
                                const response = yield (0, auth_service_1.login)(newUser);
                                resolve(response);
                            }
                        }
                        if (user) {
                            const userProprieties = {
                                body: {
                                    login: userData.name,
                                    password: userData.id
                                }
                            };
                            const response = yield (0, auth_service_1.login)(userProprieties);
                            resolve(response);
                        }
                    }
                    else {
                        reject('Token inválido!');
                    }
                }));
            });
            request.end();
        });
    }
    catch (e) {
        return { error: e };
    }
});
exports.googleAuthentic = googleAuthentic;
const newUserWithGoogle = (newUser) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, surname, login, email, password } = newUser;
        if (!login || !email || !password || !name || !surname) {
            return { error: 'faltando' };
        }
        const user = yield user_1.default.create(newUser);
        if (!user) {
            return { error: 'Erro creating user.' };
        }
        return true;
    }
    catch (e) {
        return { error: e };
    }
});
const sendEmailNewAccount = (newUser) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, surname, login, email, password } = newUser;
        const token = encodeURIComponent(jsonwebtoken_1.default.sign({ email: email }, process.env.SECRET_JWT, { expiresIn: '10m' }));
        if (!login || !email || !password || !name || !surname) {
            return { error: 'missing one of the required items to create a temporary user' };
        }
        const user = yield temporaryUser_1.default.create(newUser);
        if (!user) {
            return { error: 'error for creating temporary user' };
        }
        const transporter = nodemailer_1.default.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });
        const mailOptions = {
            from: 'financa.developer@gmail.com',
            to: `${email}`,
            subject: 'Confirm your new account',
            text: `${process.env.DOMAIN_API}/user/confirmAccount?token=${token}`
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return { error: error };
            }
            else {
                console.log(`send to ${info.accepted}`);
            }
        });
        return true;
    }
    catch (e) {
        return { error: e };
    }
});
exports.sendEmailNewAccount = sendEmailNewAccount;
const confirmAccountByLink = (userToken) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield newUserToken(userToken);
        if (typeof (response) == 'string') {
            const nameCookie = shortid_1.default.generate();
            const redirectUrl = `${process.env.DOMAIN_WEB}/validatemail?res=${nameCookie}`;
            return { redirectUrl, response, nameCookie };
        }
        const newToken = yield jsonwebtoken_1.default.sign({ id: response }, process.env.SECRET_JWT, { expiresIn: 86400 });
        const redirectUrl = `${process.env.DOMAIN_WEB}/home`;
        return { redirectUrl, newToken };
    }
    catch (e) {
        return { error: e };
    }
});
exports.confirmAccountByLink = confirmAccountByLink;
const newUserToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!token) {
            return { error: 'has no token' };
        }
        let responseToken;
        try {
            responseToken = yield jsonwebtoken_1.default.verify(token, process.env.SECRET_JWT);
        }
        catch (error) {
            return { error: 'token has expired' };
        }
        const alreadyUser = yield user_1.default.findOne({ email: responseToken.email });
        if (alreadyUser) {
            return { error: 'user already exist' };
        }
        const userForCreate = yield temporaryUser_1.default.findOne({ email: responseToken.email }).select('+password');
        if (!userForCreate) {
            return { error: 'user not found' };
        }
        return yield createNewUser(userForCreate);
    }
    catch (e) {
        return { error: e };
    }
});
const createNewUser = (newUser) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { login, email, password, name, surname } = newUser;
        if (!login || !email || !password || !name || !surname) {
            return { error: 'Some user information is missing' };
        }
        const userForCreate = {
            login: login,
            email: email,
            password: password,
            pictureUrl: '',
            name: name,
            surname: surname
        };
        const createInUser = yield user_1.default.create(userForCreate);
        if (!createInUser) {
            return false;
        }
        return createInUser._id;
    }
    catch (err) {
        return err.message;
    }
});
const emailUpdatePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const user = yield user_1.default.findOne({ email: email });
        if (!user) {
            return { error: 'this email is not registered' };
        }
        const token = encodeURIComponent(jsonwebtoken_1.default.sign({ email: user.email }, process.env.SECRET_JWT, { expiresIn: '10m' }));
        const transporter = nodemailer_1.default.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });
        const mailOptions = {
            from: 'financa.developer@gmail.com',
            to: `${email}`,
            subject: 'Create a new password',
            text: `${process.env.DOMAIN_API}/user/newPassword?token=${token}`
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return { error: error };
            }
            else {
                console.log(`send to ${info.accepted}`);
            }
        });
        res.cookie('token', token, { maxAge: 10 * 60 * 1000 });
        return { token: token, response: true };
    }
    catch (e) {
        return { error: e };
    }
});
exports.emailUpdatePassword = emailUpdatePassword;
const newPasswordRedirect = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, auth_service_1.validateTokenPass)(token);
        if (response) {
            const nameCookie = shortid_1.default.generate();
            const redirectUrl = `${process.env.DOMAIN_WEB}/newpassword?res=${nameCookie}`;
            return { redirectUrl, nameCookie, response };
        }
        const redirectUrl = `${process.env.DOMAIN_WEB}/createNewPassword`;
        return { redirectUrl, token };
    }
    catch (e) {
        return { error: e };
    }
});
exports.newPasswordRedirect = newPasswordRedirect;
const updatePassword = (token, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!token) {
            return { error: 'has no token' };
        }
        if (!password) {
            return { error: 'has no password' };
        }
        let responseToken;
        try {
            responseToken = yield jsonwebtoken_1.default.verify(token, process.env.SECRET_JWT);
        }
        catch (_a) {
            return { error: 'token expired' };
        }
        const user = yield user_1.default.findOne({ email: responseToken.email }).select("+password");
        if (!user) {
            return { error: 'user not exist' };
        }
        const passwordIsValid = bcrypt.compareSync(password, user.password);
        if (passwordIsValid) {
            return { error: 'Try another password' };
        }
        const newPass = yield bcrypt.hash(password, 10);
        const newPasswordSucess = yield user_1.default.findOneAndUpdate({ _id: user._id }, { password: newPass });
        if (!newPasswordSucess) {
            return { error: 'some error in change a password' };
        }
        return 'password altered sucefully';
    }
    catch (e) {
        return { error: e };
    }
});
exports.updatePassword = updatePassword;
const updateImage = (userId, fileInfo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!userId) {
            return "userId is missing";
        }
        if (!fileInfo) {
            return "image missing";
        }
        const response = yield user_1.default.findOneAndUpdate({ id: userId }, { pictureUrl: fileInfo.filename });
        if (!response) {
            return "update not successfully";
        }
        return 'Update successfully';
    }
    catch (e) {
        return { error: e };
    }
});
exports.updateImage = updateImage;

const bcrypt = require('bcrypt');
import https from 'https';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import shortId from 'shortid';
import temporaryUser from '../models/temporaryUser';
import User from '../models/user';
import { login, validateTokenPass } from './auth.service';

interface newUser {
    name: string;
    surname: string;
    login: string;
    email: string;
    password: string;
}

export const googleAuthentic = async (token: string) => {
    try {
        const options = {
            hostname: 'www.googleapis.com',
            path: `/oauth2/v1/userinfo?access_token=${token}`,
            method: 'GET'
        };

        return new Promise((resolve, reject) => {
            const request = https.request(options, response => {
                let data = '';

                response.on('data', chunk => {
                    data += chunk;
                });

                response.on('end', async () => {
                    const userData = JSON.parse(data);
                    if (!userData.error) {
                        const user = await User.findOne({ email: userData.email })

                        if (!user) {
                            const newUser = {
                                name: userData.given_name,
                                surname: userData.family_name,
                                login: userData.name,
                                email: userData.email,
                                password: userData.id,
                                pictureUrl: userData.picture
                            }

                            const newLogin = await newUserWithGoogle(newUser)

                            if (newLogin) {
                                const response = await login(newUser)
                                resolve(response)
                            }

                        }

                        if (user) {
                            const userProprieties = {
                                body: {
                                    login: userData.name,
                                    password: userData.id
                                }
                            }

                            const response = await login(userProprieties)
                            resolve(response)
                        }
                    } else {
                        reject('Token inválido!')
                    }
                });
            });

            request.end();
        })
    } catch (e) {
        return { error: e }
    }
}

const newUserWithGoogle = async (newUser: newUser) => {
    try {
        const { name, surname, login, email, password } = newUser;

        if (!login || !email || !password || !name || !surname) {
            return { error: 'faltando' }
        }

        const user = await User.create(newUser)

        if (!user) {
            return { error: 'Erro creating user.' }
        }

        return true
    } catch (e) {
        return { error: e }
    }
}

export const sendEmailNewAccount = async (newUser: newUser) => {
    try {
        const { name, surname, login, email, password } = newUser;

        const token = encodeURIComponent(jwt.sign({ email: email }, process.env.SECRET_JWT!, { expiresIn: '10m' }))

        if (!login || !email || !password || !name || !surname) {
            return { error: 'missing one of the required items to create a temporary user' }
        }

        const user = await temporaryUser.create(newUser)

        if (!user) {
            return { error: 'error for creating temporary user' }
        }

        const transporter = nodemailer.createTransport({
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
                return { error: error }
            } else {
                console.log(`send to ${info.accepted}`)
            }
        })

        return true
    } catch (e) {
        return { error: e }
    }
}

export const confirmAccountByLink = async (userToken: string) => {
    try {
        const response = await newUserToken(userToken)

        if (typeof (response) == 'string') {
            const nameCookie = shortId.generate()
            const redirectUrl = `${process.env.DOMAIN_WEB}/validatemail?res=${nameCookie}`

            return { redirectUrl, response, nameCookie }
        }

        const newToken = await jwt.sign({ id: response }, process.env.SECRET_JWT!, { expiresIn: 86400 })
        const redirectUrl = `${process.env.DOMAIN_WEB}/home`

        return { redirectUrl, newToken }
    } catch (e) {
        return { error: e }
    }
}

const newUserToken = async (token: string) => {
    try {
        if (!token) {
            return { error: 'has no token' };
        }

        let responseToken: any;

        try {
            responseToken = await jwt.verify(token, process.env.SECRET_JWT!);
        } catch (error) {
            return { error: 'token has expired' };
        }

        const alreadyUser = await User.findOne({ email: responseToken.email })

        if (alreadyUser) {
            return { error: 'user already exist' }
        }

        const userForCreate = await temporaryUser.findOne({ email: responseToken.email }).select('+password')

        if (!userForCreate) {
            return { error: 'user not found' }
        }

        return await createNewUser(userForCreate)
    } catch (e) {
        return { error: e }
    }
}

const createNewUser = async (newUser: newUser) => {
    try {
        const { login, email, password, name, surname } = newUser;

        if (!login || !email || !password || !name || !surname) {
            return { error: 'Some user information is missing' }
        }

        const userForCreate = {
            login: login,
            email: email,
            password: password,
            pictureUrl: '',
            name: name,
            surname: surname
        }

        const createInUser = await User.create(userForCreate)

        if (!createInUser) {
            return false
        }

        return createInUser._id
    } catch (err: any) {
        return err.message;
    }
}

export const emailUpdatePassword = async (req: any, res: any) => {
    try {
        const { email } = req.body

        const user = await User.findOne({ email: email })

        if (!user) {
            return { error: 'this email is not registered' }
        }

        const token = encodeURIComponent(jwt.sign({ email: user.email }, process.env.SECRET_JWT!, { expiresIn: '10m' }))


        const transporter = nodemailer.createTransport({
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
                return { error: error }
            } else {
                console.log(`send to ${info.accepted}`)
            }
        })

        res.cookie('token', token, { maxAge: 10 * 60 * 1000 })
        return { token: token, response: true }
    } catch (e) {
        return { error: e }
    }
}

export const newPasswordRedirect = async (token: string) => {
    try {
        const response = await validateTokenPass(token)

        if (response) {
            const nameCookie = shortId.generate()
            const redirectUrl = `${process.env.DOMAIN_WEB}/newpassword?res=${nameCookie}`
            return { redirectUrl, nameCookie, response }
        }


        const redirectUrl = `${process.env.DOMAIN_WEB}/createNewPassword`;
        return { redirectUrl, token }
    } catch (e) {
        return { error: e }
    }

}

export const updatePassword = async (token: string, password: string) => {
    try {
        if (!token) {
            return { error: 'has no token' }
        }

        if (!password) {
            return { error: 'has no password' }
        }

        let responseToken: any;

        try {
            responseToken = await jwt.verify(token, process.env.SECRET_JWT!)
        } catch {
            return { error: 'token expired' }
        }

        const user = await User.findOne({ email: responseToken.email }).select("+password")

        if (!user) {
            return { error: 'user not exist' }
        }

        const passwordIsValid = bcrypt.compareSync(password, user.password)

        if (passwordIsValid) {
            return { error: 'Try another password' }
        }

        const newPass = await bcrypt.hash(password, 10)

        const newPasswordSucess = await User.findOneAndUpdate({ _id: user._id }, { password: newPass })

        if (!newPasswordSucess) {
            return { error: 'some error in change a password' }
        }

        return 'password altered sucefully'
    } catch (e) {
        return { error: e }
    }
}

export const updateImage = async (userId: string, fileInfo: { filename: string }) => {
    try {
        if (!userId) {
            return "userId is missing"
        }

        if (!fileInfo) {
            return "image missing"
        }

        const response = await User.findOneAndUpdate({ id: userId }, { pictureUrl: fileInfo.filename })

        if (!response) {
            return "update not successfully"
        }

        return 'Update successfully'
    } catch (e) {
        return { error: e }
    }
}
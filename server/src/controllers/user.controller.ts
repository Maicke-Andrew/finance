import { confirmAccountByLink, emailUpdatePassword, googleAuthentic, newPasswordRedirect, sendEmailNewAccount, takeImg, updateImage, updatePassword } from '../services/user.service';

interface iConfirmAccount {
    response?: string;
    newToken?: string;
    redirectUrl?: string;
    nameCookie?: string;
    token?: string;
}

interface inewPass {
    response?: string;
    token?: string;
}

const userController = {
    enterWithGoogle: async (req: any, res: any) => {
        try {
            const response: any = await googleAuthentic(req.body.token);

            if (response!.error) {
                return res.status(400).send(response.error);
            }

            return res.status(201).send(response);
        } catch (e) {
            return res.status(500).send(e);
        }
    },

    sendEmail: async (req: any, res: any) => {
        try {
            const response: any = await sendEmailNewAccount(req.body)

            if (response.error) {
                return res.status(400).send(response.error)
            }

            return res.status(201).send(response)
        } catch (e) {
            return res.status(500).send(e);
        }
    },

    confirmAccount: async (req: any, res: any) => {
        try {
            const response = await confirmAccountByLink(req.query.token) as iConfirmAccount;

            if (response.newToken) {
                res.cookie('token', response.newToken, { maxAge: 86400, secure: true })
            }

            if (response.nameCookie) {
                res.cookie(response.nameCookie, response.response, { maxAge: 10 * 60 * 100 })
            }

            if (!response.nameCookie || !response.newToken) {
                return res.status(400).send(response)
            }

            return res.status(201).redirect(response.redirectUrl)
        } catch (e) {
            return res.status(500).send(e);
        }
    },

    emailNewPassword: async (req: any, res: any) => {
        try {
            const response: any = await emailUpdatePassword(req, res) as inewPass;
            res.cookie('token', response.token, { maxAge: 10 * 60 * 1000 })

            if (response.error) {
                return res.status(400).send(response)
            }

            return res.status(201).send(response.response)
        } catch (e) {
            return res.status(500).send(e);
        }
    },

    newPassword: async (req: any, res: any) => {
        try {
            const response: any = await newPasswordRedirect(req.query.token) as iConfirmAccount;

            if (response.nameCookie) {
                res.cookie(response.nameCookie, response.response, { maxAge: 10 * 60 * 1000 })
            } else {
                res.cookie('userToken', response.token, { maxAge: 10 * 60 * 1000 })
            }

            if (response.error) {
                return res.status(400).send(response)
            }

            return res.status(201).redirect(response.redirectUrl)
        } catch (e) {
            return res.status(500).send(e);
        }
    },

    changePassword: async (req: any, res: any) => {
        try {
            const response: any = await updatePassword(req.body.token, req.body.password)

            if (response.error) {
                return res.status(400).send(response)
            }

            return res.status(201).send(response)
        } catch (e) {
            return res.status(500).send(e);
        }
    },

    updateImg: async (req: any, res: any) => {
        try {
            const response: any = await updateImage(req.body.userId, req.file.location)

            if (response.error) {
                return res.status(400).send(response)
            }

            return res.status(201).send(response)
        } catch (e) {
            return res.status(500).send(e)
        }
    },

    getImg: async (req: any, res: any) => {
        try {
            const response: any = await takeImg(req.body)

            if (response.error) {
                return res.status(400).send(response)
            }

            return res.status(201).send(response)
        } catch (e) {
            return res.status(500).send(e)
        }
    },

    logout: async (req: any, res: any) => {
        try {
            return res.status(201).send('sucefully logout')
        } catch (e) {
            return res.status(500).send(e);
        }
    },
}

export default userController
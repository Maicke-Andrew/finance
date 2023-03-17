import { validateToken } from "../middlewares/global.middlewares"
import { emailUsedOrNot, login, loginUsedOrNot } from "../services/auth.service"

const authController = {
    makeLogin: async (req: any, res: any) => {
        try {
            const response = await login(req)

            if (response.error) {
                return res.status(501).send(response.error)
            }

            return res.status(201).send(response)
        } catch (e) {
            return res.send(e)
        }
    },
    doValidateToken: async (req: any, res: any) => {
        try {
            const response = await validateToken(req.body.token)

            if (response.error) {
                return res.status(501).send(response.error)
            }

            return res.status(201).send(response)
        } catch (e) {
            return res.send(e)
        }
    },
    emailAlreadyUsed: async (req: any, res: any) => {
        try {
            const response: any = await emailUsedOrNot(req.body.email)

            if (response.error) {
                return res.status(501).send(response.error)
            }

            return res.status(201).send(response)
        } catch (e) {
            return res.send(e)
        }
    },
    loginAlreadyUsed: async (req: any, res: any) => {
        try {
            const response: any = await loginUsedOrNot(req.body.login)

            if (response.error) {
                return res.status(501).send(response.error)
            }

            return res.status(201).send(response)
        } catch (e) {
            return res.send(e)
        }
    }
}

export default authController
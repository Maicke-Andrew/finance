import { createFeedback, todayFeedbackUser } from "../services/feedback.service"

const FeedbackController = {
    sendFeedback: async (req: any, res: any) => {
        try {
            const response: any = await createFeedback(req.files, req.body)

            if (response.error) {
                return res.status(501).send(response.error)
            }

            return res.status(201).send(response)
        } catch (e) {
            return res.status(501).send(e)
        }
    },
    userFeedback: async (req: any, res: any) => {
        try {
            const response: any = await todayFeedbackUser(req.body.email)

            if (response.error) {
                return res.status(501).send(response.error)
            }

            return res.status(201).send(response)
        } catch (e) {
            return res.status(501).send(e)
        }
    }

}

export default FeedbackController
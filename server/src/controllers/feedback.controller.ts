import { createFeedback } from "../services/feedback.service"

const FeedbackController = {
    sendFeedback: async (req: any, res: any) => {
        try {
            const response: any = await createFeedback(req.files, req.body)

            if (response.error) {
                return res.status(501).send(response.error)
            }

            return res.status(201).send(response)
        } catch (e) {
            return res.send(e)
        }
    }

}

export default FeedbackController
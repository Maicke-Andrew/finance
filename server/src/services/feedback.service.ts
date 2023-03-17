import Feedback from "../models/feedback"
import User from "../models/user"

export const createFeedback = async (file: any, feedbackBody: any) => {
    try {
        if (!file && !feedbackBody.text) {
            return { error: 'Missing some file and text' }
        }

        const fileRefs: string[] = [];

        if (file) {
            file.forEach((item: any) => {
                fileRefs.push(item.filename)
            });
        }

        const user = await User.findOne({ id: feedbackBody.userId })

        const feedbackInfo = {
            text: feedbackBody.text,
            src: fileRefs,
            userEmail: user?.email
        }

        const response = await Feedback.create(feedbackInfo)

        if (!response) {
            return { error: 'failed to create' }
        }

        return 'feedback create succesfully'
    } catch (e) {
        return { error: e }
    }
}
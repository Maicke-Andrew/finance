import Feedback from "../models/feedback"
import User from "../models/user"

export const createFeedback = async (files: any, feedbackBody: any) => {
    try {
        if (!files && !feedbackBody.text) {
            return { error: 'Missing some file or some text' }
        }

        const fileRefs: string[] = [];

        if (files) {
            if (files.length > 1) {
                files.forEach((item: any) => {
                    fileRefs.push(item.location)
                });
            } else {
                fileRefs.push(files.location)
            }
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


export const todayFeedbackUser = async (userEmail: string) => {
    try {

        const today = new Date();
        today.setUTCHours(0, 0, 0, 0);

        const filter = {
            userEmail: userEmail,
            createAt: {
                $gte: today,
            },
        };

        const response = await Feedback.find(filter);

        return { todayItems: response.length }
    } catch (e) {
        return { error: e }
    }
}
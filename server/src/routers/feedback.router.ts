import { Router } from "express";
import upload from "../config/multer";
import FeedbackController from "../controllers/feedback.controller";

const feedbackRouter = Router()

feedbackRouter.post('/sendFeedback', upload.array('files'), FeedbackController.sendFeedback);
feedbackRouter.post('/recentFeedback', FeedbackController.userFeedback);

export default feedbackRouter
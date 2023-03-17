import { Router } from "express";
import multer from "multer";
import FeedbackController from "../controllers/feedback.controller";
import { fileMulter } from "../middlewares/global.middlewares";

const upload = multer({ storage: fileMulter })
const feedbackRouter = Router()

feedbackRouter.post('/sendFeedback', upload.array('files', 10), FeedbackController.sendFeedback);

export default feedbackRouter
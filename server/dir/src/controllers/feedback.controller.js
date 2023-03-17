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
Object.defineProperty(exports, "__esModule", { value: true });
const feedback_service_1 = require("../services/feedback.service");
const FeedbackController = {
    sendFeedback: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield (0, feedback_service_1.createFeedback)(req.files, req.body);
            if (response.error) {
                return res.status(501).send(response.error);
            }
            return res.status(201).send(response);
        }
        catch (e) {
            return res.send(e);
        }
    })
};
exports.default = FeedbackController;

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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFeedback = void 0;
const feedback_1 = __importDefault(require("../models/feedback"));
const user_1 = __importDefault(require("../models/user"));
const createFeedback = (file, feedbackBody) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!file && !feedbackBody.text) {
            return { error: 'Missing some file and text' };
        }
        const fileRefs = [];
        if (file) {
            file.forEach((item) => {
                fileRefs.push(item.filename);
            });
        }
        const user = yield user_1.default.findOne({ id: feedbackBody.userId });
        const feedbackInfo = {
            text: feedbackBody.text,
            src: fileRefs,
            userEmail: user === null || user === void 0 ? void 0 : user.email
        };
        const response = yield feedback_1.default.create(feedbackInfo);
        if (!response) {
            return { error: 'failed to create' };
        }
        return 'feedback create succesfully';
    }
    catch (e) {
        return { error: e };
    }
});
exports.createFeedback = createFeedback;

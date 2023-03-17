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
const item_service_1 = require("../services/item.service");
const itemController = {
    create: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield (0, item_service_1.createItem)(req.body);
            if (response.error) {
                return res.status(401).send(response.error);
            }
            return res.status(200).send(response);
        }
        catch (e) {
            return res.status(500).send(e);
        }
    }),
    getUserItems: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield (0, item_service_1.getAllUserItem)(req.query.id);
            return res.status(200).send(response);
        }
        catch (e) {
            return res.status(501).send(e);
        }
    }),
    delete: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield (0, item_service_1.deleteItemById)(req.query.id);
            if (response.error) {
                return res.status(401).send(response.error);
            }
            return res.status(200).send(response);
        }
        catch (e) {
            return res.status(501).send(e);
        }
    }),
    update: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield (0, item_service_1.updateItem)(req.body);
            return res.status(200).send(response);
        }
        catch (e) {
            return res.status(501).send(e);
        }
    })
};
exports.default = itemController;

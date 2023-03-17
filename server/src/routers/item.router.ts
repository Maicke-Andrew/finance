import { Router } from "express"
import itemController from "../controllers/item.controller"
import { validId } from "../middlewares/global.middlewares"

const itemRouter = Router()

itemRouter.post('/create/:id', validId, itemController.create)
itemRouter.get('/items/:id', validId, itemController.getUserItems)
itemRouter.delete('/delete/:id', validId, itemController.delete)
itemRouter.patch('/update/:id', validId, itemController.update)

export default itemRouter
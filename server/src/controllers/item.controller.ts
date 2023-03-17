import { createItem, deleteItemById, getAllUserItem, updateItem } from '../services/item.service';


const itemController = {
    create: async (req: any, res: any) => {
        try {
            const response: any = await createItem(req.body)

            if (response!.error) {
                return res.status(401).send(response.error)
            }

            return res.status(200).send(response)
        } catch (e) {
            return res.status(500).send(e)
        }
    },
    getUserItems: async (req: any, res: any) => {
        try {
            const response = await getAllUserItem(req.query.id)
            return res.status(200).send(response)
        } catch (e) {
            return res.status(501).send(e)
        }
    },
    delete: async (req: any, res: any) => {
        try {
            const response: any = await deleteItemById(req.query.id)

            if (response.error) {
                return res.status(401).send(response.error)
            }

            return res.status(200).send(response)
        } catch (e) {
            return res.status(501).send(e)
        }
    },
    update: async (req: any, res: any) => {
        try {
            const response = await updateItem(req.body)
            return res.status(200).send(response)
        } catch (e) {
            return res.status(501).send(e)
        }
    }
}

export default itemController
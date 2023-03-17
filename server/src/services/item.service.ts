import Item from "../models/Item";

interface item {
    userId: string;
    category: string;
    value: string;
    title: string;
    installments: string;
    receive: string;
    _id?: any;
}

export const createItem = async (reqItem: item) => {
    try {
        const { userId, category, value, title, installments, receive } = reqItem

        if (!userId || !category || !value || receive === null || !title || !installments) {
            return { error: "Some required input empty" }
        }

        const response = await Item.insertMany(reqItem);


        if (!response) {
            return { error: 'some error with the insert' }
        }

        return response
    } catch (e) {
        return { error: e }
    }
}

export const getAllUserItem = async (id: string) => {
    try {
        if (!id) {
            return { error: 'Need to pass id' }
        }

        const items = await Item.find({ userId: id })

        return items
    } catch (e) {
        return { error: e }
    }
}

export const deleteItemById = async (id: string) => {
    try {
        if (!id) {
            return { error: 'id is missing' }
        }

        const response = await Item.deleteOne({ _id: id })

        if (!response) {
            return { error: 'some problem to delete' }
        }

        return response
    } catch (e) {
        return { error: e }
    }
}

export const updateItem = async (reqItem: item) => {
    try {
        if (!reqItem) {
            return { error: "item is missing" }
        }

        const response = await Item.updateOne({ _id: reqItem._id }, reqItem)

        if (!response) {
            return { error: 'some problem to update' }
        }

        return response
    } catch (e) {
        return { error: e }
    }
}

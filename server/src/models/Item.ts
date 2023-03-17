import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
    userId: {
        type: String,
        require: true,
        select: false
    },
    category: {
        type: String,
    },
    value: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        require: true
    },
    installments: {
        type: Array
    },
    receive: {
        type: Boolean,
        required: true
    },
    createAt: {
        type: Date,
        default: () => Date.now() - 3 * 60 * 60 * 1000,
        required: true
    }
})

const Item = mongoose.model('item', ItemSchema)

export default Item
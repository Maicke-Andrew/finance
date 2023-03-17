// const mongoose = require('mongoose');
import mongoose from 'mongoose'

const connectDatabase = () => {
    console.log('Conneting to DataBase');

    mongoose.connect(
        process.env.MONGODB_CONNECT!,
        // { useNewUrlParser: true, useUnifiedTopology: true }
    ).then(() => console.log("DB Connected"))
        .catch((error) => console.log(error))
};

export default connectDatabase
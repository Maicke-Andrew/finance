import mongoose from 'mongoose'

const connectDatabase = () => {
    mongoose.connect(
        process.env.MONGODB_CONNECT!,
        // { useNewUrlParser: true, useUnifiedTopology: true }
    ).then(() => console.log("DB Connected"))
        .catch((e: any) => console.log(e))
};

export default connectDatabase
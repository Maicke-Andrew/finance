import dotenv from 'dotenv';
import express from 'express';
import connectDatabase from './src/database/db';
import router from './src/routers/index';
import cookieParser from 'cookie-parser'

dotenv.config();

const port = process.env.PORT || 8080;
const app = express();
connectDatabase();
app.use(express.json());
app.use(cookieParser());

/////////////////////////////////DISABLE CORS/////////////////////////////////////////
app.all("/*", (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');

    res.header('Access-Control-Allow-Methods', '*');

    res.header("Access-Control-Allow-Headers", '*');

    next();
})
/////////////////////////////////DISABLE CORS/////////////////////////////////////////

app.use('/', router);
app.use('/feedback', express.static('/uploads/feedbackImg'));
app.use('/user', express.static('/uploads/userImg'));

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
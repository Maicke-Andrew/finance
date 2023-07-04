import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import connectDatabase from './src/database/db';
import router from './src/routers/index';

dotenv.config();
connectDatabase();
const app = express();
app.use(express.json());
app.use(cookieParser());
const domains: string[] = process.env.SERVERSALLOWED!.split(',').map(item => item)
app.use(cors({
    origin: domains
}))


app.use('/', router);
app.use('/feedback', express.static('/uploads/feedbackImg'));
app.use('/user', express.static('/uploads/userImg'));

app.listen(process.env.PORT || 8080);
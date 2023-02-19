import dotenv from 'dotenv'
dotenv.config();
import express from 'express';
const app = express();
import cors from "cors";
import cookieParser from 'cookie-parser';

import auth from '../BE/auth/auth.js';
import userRouter from './routes/users.router.js';
const redirectURI = "auth/google/callback";

const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));
app.get(`/${redirectURI}`, auth.getUserFromGoogle)

app.use('/api/', userRouter);

app.listen(PORT, () => {
    console.log("Open localhost: http://localhost:5000/");
})
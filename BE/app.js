import dotenv from 'dotenv'
dotenv.config();
import express from 'express';

import cors from "cors";
import cookieParser from 'cookie-parser';

import auth from '../BE/auth/auth.js';
import userRouter from './routes/users.router.js';

const redirectURI = "api/auth/google/callback";
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000',
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
}));
app.use('/api/', userRouter);

app.get(`/${redirectURI}`, auth.getUserFromGoogle)


app.listen(PORT, () => {
    console.log("Open localhost: http://localhost:5000/");
})
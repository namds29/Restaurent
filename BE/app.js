require('dotenv').config();
const express = require('express');
const app = express();
const cors = require("cors");
const cookieParser = require('cookie-parser')

const userRouter = require('./routes/users.router');

const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));
app.use('/api/', userRouter);

app.listen(PORT, () => {
    console.log("Open localhost: http://localhost:5000/");
})
import dotenv from 'dotenv'
dotenv.config();
import Customer from '../models/users.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const getListCustomer = async (req, res) => {
    const data = await Customer.listCustomer();
    console.log('controller data: ', data);
    res.json(data);
}
const getDetailCustomer = async (req, res) => {
    try {
        const cookie = req.cookies['auth_token'];
        const claims = jwt.verify(cookie, process.env.ACCESS_TOKEN_SECRET);
        if (!claims) return res.status(401).send({ message: 'Unauthenticated' });
        if (claims.email === undefined && claims.googleUser.email) {
            const user = await Customer.getAccountByEmail(claims.googleUser.email);
            console.log(user);
            res.send(...user)
        } else {
            const user = await Customer.getAccountByEmail(claims.email);
            const { password, ...data } = user[0]
            res.send(data)
        }

    } catch (error) {
        return res.status(401).send({ message: error });
    }
}
const register = async (req, res) => {
    const { username, password, email } = req.body;
    console.log(username, password, email);
    const salt = await bcrypt.genSalt(10);
    const cryptedPassword = await bcrypt.hash(password, salt);

    const data = await Customer.insertCustomer(username, cryptedPassword, email)
        .then(() => res.status(201).send({ message: "Create User successful" }))
        .catch(() => res.status(409).send("Duplicate account"));
}

export default { getListCustomer, getDetailCustomer, register };
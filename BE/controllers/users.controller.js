require('dotenv').config();
const Customer = require('../models/users.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getListCustomer = async (req, res) => {
    const data = await Customer.listCustomer();
    console.log('controller data: ', data);
    res.json(data);
}
const getDetailCustomer = async (req, res) => {
    try {
        const cookie = req.cookies['jwt'];
        const claims = jwt.verify(cookie, process.env.ACCESS_TOKEN_SECRET);
        if (!claims) return res.status(401).send({ message: 'Unauthenticated' });

        const user = await Customer.getAccountByName(claims.name);
        console.log(user);
        const { password, ...data } = user[0]
        res.send(data)
    } catch (error) {
        return res.status(401).send({ message: 'Unauthenticated' });
    }
}
const register = async (req, res) => {
    const { name, password, email } = req.body;
    console.log(name, password, email);
    const salt = await bcrypt.genSalt(10);
    const cryptedPassword = await bcrypt.hash(password, salt);

    const data = await Customer.insertCustomer(name, cryptedPassword, email)
    .then(() => res.status(201).send({ message: "Create User successful" }))
    .catch(() => res.status(409).send("Duplicate account"));
}

module.exports = { getListCustomer, getDetailCustomer, register };
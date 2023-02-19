const con = require('../connect.js');

async function listCustomer() {
    const [data] = await con.query('select  * from customer');
    return data;
}

async function getIdListCustomer(id) {
    const [data] = await con.query(`select  * from customer where id = ?`, [id]);
    return data;
}
async function insertCustomer(name, password, email) {
    const [data] = await con.query(`insert into customer (name, password, email) values (?,?,?) `, [name, password, email]);
    return data;
}

async function getAccountByName(name) {
    const [res] = await con.query(`select * from customer where name =?`, [name]);
    if (res.length === 0) return;
    return res;
}

module.exports = { listCustomer, getIdListCustomer, insertCustomer, getAccountByName };
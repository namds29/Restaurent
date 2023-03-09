import con from '../connect.js';

async function listCustomer() {
    const [data] = await con.query('select  * from customer');
    return data;
}

async function getIdListCustomer(id) {
    const [data] = await con.query(`select  * from customer where id = ?`, [id]);
    return data;
}
async function insertCustomer(username, password, email, picture, locale, name) {
    const [data] = await con.query(`insert into customer (username, password, email, picture, locale, name) values (?,?,?,?,?,?) `, [username, password, email, picture, locale,name]);
    return data;
}

async function getAccountByUsername(username) {
    const [res] = await con.query(`select * from customer where username =?`, [username]);
    if (res.length === 0) return;
    return res;
}
async function getAccountByEmail(email) {
    const [res] = await con.query(`select * from customer where email =?`, [email]);
    if (res.length === 0) return;
    return res;
}

export default { listCustomer, getIdListCustomer, insertCustomer, getAccountByUsername, getAccountByEmail };
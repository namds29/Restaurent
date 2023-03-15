import mysql from 'mysql2';

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Harveynash@123',
    database: "shopify",
}).promise();

con.connect(function (err) {
    console.log("Connected!");
});

export default con
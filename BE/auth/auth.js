import dotenv from 'dotenv'
dotenv.config();
import Customer from '../models/users.model.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import querystring from 'querystring';
import fetch from "node-fetch"

const redirectURI = 'api/auth/google/callback';

const login = async (req, res) => {
    const { username, password } = req.body;
    const data = await Customer.getAccountByUsername(username).catch(err => console.log(err));
    if (!data) {
        return res.status(401).send('No Account here')
    } else {
        await bcrypt.compare(password, data[0].password).then(function (result) {
            if (!result) return res.status(401).send('username or password is incorrect');
            const accessToken = jwt.sign({ username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
            res.cookie('auth_token', accessToken, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000,
            })
            return res.json({ data: data[0].username, token: accessToken });
        });
    }
};
const authenToken = async (req, res, next) => {
    const authorization = req.headers['authorization'];
    // Bearer token
    console.log(authorization);
    const token = authorization.split(' ')[1]
    console.log('authen: ', token);
    if (!token) res.sendStatus(401);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
        console.log(err, data);
        if (err) res.sendStatus(403);
        next();
    });
}
const logout = async (req, res) => {
    res.cookie('auth_token', '', { maxAge: 0 })
    res.send({
        message: 'logout success'
    })
}

function getGoogleAuthURL() {
    const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
    const options = {
        redirect_uri: `${process.env.SERVER_URL}/${redirectURI}`,
        client_id: process.env.GOOGLE_CLIENT_ID,
        access_type: "offline",
        response_type: "code",
        prompt: "consent",
        scope: [
            "https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/userinfo.email",
        ].join(" "),
    };
    return `${rootUrl}?${querystring.stringify(options)}`;
}

async function getTokens({ code }) {
    /*
     * Uses the code to get tokens
     * that can be used to fetch the user's profile
     */
    const url = "https://oauth2.googleapis.com/token";
    const values = {
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET_ID,
        redirect_uri: `${process.env.SERVER_URL}/${redirectURI}`,
        grant_type: "authorization_code",
    };
    try {
        const res = await fetch(url, {
            method: 'POST',
            body: querystring.stringify(values),
            credentials: 'same-origin',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        })
        const result = await res.json();
        return result
    } catch (error) {
        console.error(error, 'failed fetch Google token');
        throw new Error(error.message)
    }
}

const getUserFromGoogle = async (req, res) => {
    const code = req.query.code;
    const { id_token, access_token } = await getTokens({ code });
    // Fetch the user's profile with the access token and bearer
    const googleUser = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`, {
        headers: {
            Authorization: `Bearer ${id_token}`,
        },
    }).then(res => res.json())
        .catch((error) => {
            console.error(`Failed to fetch user`);
            throw new Error(error.message);
        });
    const { username, email, picture, locale, name } = await googleUser;
    const data = await Customer.getAccountByEmail(email);
    if (!data) {
        await Customer.insertCustomer(username, '', email, picture, locale, name);
    }
    const token = jwt.sign({ googleUser }, process.env.ACCESS_TOKEN_SECRET);

    res.cookie('auth_token', token, {
        maxAge: 900000,
        httpOnly: true,
        secure: false,
    });
    res.redirect(process.env.FE_URL);
}

export default { login, logout, authenToken, getGoogleAuthURL, getUserFromGoogle };
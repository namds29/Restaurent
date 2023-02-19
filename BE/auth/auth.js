require('dotenv').config();
const Customer = require('../models/users.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const redirectURL = 'auth/google/callback';
const querystring = require('querystring');
import fetch from "node-fetch"

const login = async (req, res) => {
    const { name, password } = req.body;
    const data = await Customer.getAccountByName(name).catch(err => console.log(err));
    if (!data) {
        return res.status(401).send('No Account here')
    } else {
        await bcrypt.compare(password, data[0].password).then(function (result) {
            if (!result) return res.status(401).send('username or password is incorrect');
            const accessToken = jwt.sign({ name }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
            res.cookie('jwt', accessToken, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000
            })
            return res.json({ data: data[0].name, token: accessToken });
        });
    }
};
const authenToken = async (req, res, next) => {
    const authorization = req.headers['authorization'];
    // Bearer token
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
    res.cookie('jwt', '', { maxAge: 0 })
    res.send({
        message: 'logout success'
    })
}

function getGoogleAuthURL() {
    const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
    const options = {
        redirect_uri: `${process.env.SERVER_URL}/${redirectURL}`,
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

 function getTokens({
    code,
    clientId,
    clientSecret,
    redirectUri,
}) {
    /*
     * Uses the code to get tokens
     * that can be used to fetch the user's profile
     */
    const url = "https://oauth2.googleapis.com/token";
    const values = {
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
    };

    const data =  fetch(url, {
        method: 'POST',
        body: querystring.stringify(values),
        credentials: 'same-origin',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
    })
        .then((res) => res.data
        )
        .catch((error) => {
            console.error(`Failed to fetch auth tokens`);
            throw new Error(error.message);
        });
    return data
}
const getUserFromGoogle = async (req, res) => {
    const code = req.query.code;

    const { id_token, access_token } = await getTokens({
        code,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        redirectUri: `${process.env.SERVER_URL}/${redirectURL}`,
    });
    // Fetch the user's profile with the access token and bearer
    const googleUser = await fetch( `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`, {
        headers: {
          Authorization: `Bearer ${id_token}`,
        },
      })
      .then((res) => console.log(res))
      .catch((error) => {
        console.error(`Failed to fetch user`);
        throw new Error(error.message);
      });

    const token = jwt.sign(googleUser, JWT_SECRET);

    res.cookie(COOKIE_NAME, token, {
      maxAge: 900000,
      httpOnly: true,
      secure: false,
    });

    res.redirect(UI_ROOT_URI);
} 

export default { login, logout, authenToken, getGoogleAuthURL,getUserFromGoogle  };
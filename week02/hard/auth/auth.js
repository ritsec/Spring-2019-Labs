const express = require('express');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const app = express();
const port = 3000;

const key = fs.readFileSync("keys/signing.key");
const cert = fs.readFileSync("keys/signing.pem");

app.get("/", (req, res) => {
    res.send('This is for authentication. For api usage, Head on to port 4000/ for more info!');
});

app.get('/auth', (req, res) => {
    if (!req.query.name) {
        return res.status(400).json({
            reason: "missing name parameter"
        });
    }
    try {
        let token = jwt.sign({
            name: req.query.name,
            type: "user"
        }, key, {algorithm: "RS256"});
        res.json({
            token: token
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            reason: "signing error"
        });
    }
});

app.get('/robots.txt', (req, res) => {
    res.send("User-agent: *\nDisallow: /signing.pem\nDisallow: /auth");
})

app.get('/signing.pem', (req, res) => {
    res.send(cert);
});

app.listen(port, () => console.log(`Auth server running on ${port}`));

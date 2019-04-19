const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
const userInfoFile = 'users.json';
let users = [];

app.use(bodyParser.json());
app.use(express.static(__dirname));

function createUserDb() {
    try {
        fs.readFile(userInfoFile, {encoding: 'utf8'}, (err, result) => {
            users = JSON.parse(result);
        });
    } catch(error) {
        console.log('Error reading user info file: ', userInfoFile);
    }
}

function authenticate(req, res) {
    res.setHeader('Content-Type', 'application/json');
    const username = (req.body.username || '').toLowerCase() || null;
    const password = req.body.password || null;
    const userInfo = users.filter(user => user.username === username)[0];
    const response = {username: username};
    if (userInfo) {
        if (userInfo.password === password) {
            response.status = 'OK';
        } else {
            response.status = 'FAILED';
        }
    } else {
        response.status = 'INVALID';
    }
    res.end(JSON.stringify(response));
}

function handleRequests(req, res) {
    if (req.url.includes('authenticate')) {
        authenticate(req, res);
    } else {
        const fileStream = fs.createReadStream('index.html');
        fileStream.pipe(res);
    }
}

app.use(handleRequests);

createUserDb();

app.listen(port, () => {
    console.log(`Server listening on ${port}`)
});

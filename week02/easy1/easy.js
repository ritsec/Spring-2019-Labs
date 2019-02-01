const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const app = express();
const port = 4000;

const FLAG = "RS{N0T_G3T_R3QUEST}";

router.get('/', (req,res) => {
    res.sendFile(path.join(__dirname+'/index.html'));
});

app.use('/',router);


app.post('/getFlag', (req, res) => {
    return res.json({
        flag: FLAG
    });
});

app.listen(port, () => console.log(`Easy server running on ${port}`));

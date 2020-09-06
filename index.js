require('dotenv').config({
    path: __dirname + '/.env'
});
const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const app = express();
const port = 5000;
const { savePost } = require('./save-post-html');

// CORs
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.json({
    limit: '1gb' // overkill for html including base64 images
}));

app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

// middleware for handling mutli-part data
app.use(fileUpload());

// receive text
// https://stackoverflow.com/questions/12497358/handling-text-plain-in-express-via-connect/12497793#12497793
app.use(function(req, res, next){
    if (req.is('text/*')) {
        req.text = '';
        req.setEncoding('utf8');
        req.on('data', function(chunk){ req.text += chunk });
        req.on('end', next);
    } else {
        next();
    }
});

// routes
app.post('/save-post', savePost);

app.listen(port, () => {
    console.log(`App running... on port ${port}`);
});
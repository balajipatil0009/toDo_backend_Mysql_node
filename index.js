const express = require('express');
const router = require('./routes');
const db = require('./database')
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use('/',router);

const port = process.env.PORT || 7000;

app.get('/',(req, res)=>{
    res.send("hello world")
})
app.listen(port, ()=>{
    console.log(`jay shree ram on ${port}`);
})

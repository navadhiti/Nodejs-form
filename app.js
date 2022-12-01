const express = require('express');
const mysql = require("mysql")
const path = require("path")
const dotenv = require('dotenv')
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const request = require('request');

dotenv.config({ path: './.env'})

const app = express();

// const db = mysql.createConnection({
//     host: process.env.DATABASE_HOST,
//     user: process.env.DATABASE_USER,
//     password: process.env.DATABASE_PASSWORD,
//     database: process.env.DATABASE
// })

const publicDir = path.join(__dirname, './public')

app.use(express.static(publicDir))
app.use(express.urlencoded({extended: 'false'}))
app.use(express.json())

app.set('view engine', 'hbs')

// db.connect((error) => {
//     if(error) {
//         console.log(error)
//     } else {
//         console.log("MySQL connected!")
//     }
// })

app.get("/home", (req, res) => {
    res.render("index")
})
app.get("/login", (req, res) => {
    res.render("login")
})

app.get("/", (req, res) => {
    var options = {
        'method': 'POST',
        'url': `https://insp.memberclicks.net/oauth/v1/token?grant_type=authorization_code&code=${req.query.code}&scope=read&redirect_uri=https://dev.isop.navadhiti.com`,
        'headers': {
          'Authorization': 'Basic NHlJSDBKVU10NFB6VkhqMWVNTGo6Y2JhZTcxOGI1YmYwNDdmN2EzODE2OTAxNzkzNGFlZDE=',
          'Content-Type': 'application/x-www-form-urlencoded',
          'Cache-Control': 'no-cache',
          'Cookie': 'SESSION=MDFhZDBjYTAtZTc4Mi00NjdkLWEzY2EtZmFlZjg3MmZhZTUz; __cfruid=d9b3c5d9a5a7ae46e02a9c4a70ad8e09c343fb36-1669903335'
        }
      };
      request(options, function (error, response) {
        if (error) throw new Error(error);
        console.log(response.body);
        res.send(response.body);
      });
})

app.listen(8001, ()=> {
    console.log("server started on port 8001")
})
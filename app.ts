import { Request, Response } from "express";
const path = require('path');
const nunjucks = require('nunjucks');
const express = require("express");
const app = express();

// Configure Nunjucks.
const appViews = path.join(__dirname, '/views/');

const nunjucksConfig = {
    autoescape: true,
    noCache: true,
    express: app
};

nunjucks.configure(appViews, nunjucksConfig);

// Configure express.
app.set('view engine', 'html');
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use('/public', express.static(path.join(__dirname, '/public')));

app.use(express.json())

app.use(express.urlencoded({ extended: true}));

app.listen(3000, () => {
    console.log("*** Server listening on port 3000 ***");
});

app.get('/', (req: Request, res: Response)=>{
    res.render('index')
});



require('./controller/JobController')(app);
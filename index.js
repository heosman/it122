console.log('HW 4')

"use strict"
import express from 'express';
import handlebars from "express-handlebars"
import { Fruit } from "./fruit.js";

const app = express();
app.set("port", process.env.PORT || 3000);
app.use(express.static('./public')); 
app.use(express.urlencoded());
app.use(express.json());

app.engine('hbs', handlebars({defaultLayout: false}));
app.set("view engine", "hbs");

// GET requests
app.get('/', (req,res) => {
    Fruit.find({}).lean()
        .then((fruits) => {
            res.render('home', { fruits });
        })
        .catch(err => next(err));
});

app.get('/about', (req,res) => {
    res.type('text/plain');
    res.send('About page \r\n \r\n My name is Hanan Osman. I am currently in the Web Development program at Seattle Central.');
   });

app.get('/detail', (req,res,next) => {
    Fruit.findOne({ fruitname:req.query.fruitname }).lean()
        .then((fruit) => {
            res.render('details', {result: fruit} );
        })
        .catch(err => next(err));
});

// handle POST
app.post('/detail', (req,res, next) => {
    Fruit.findOne({ fruitname:req.body.fruitname }).lean()
        .then((fruit) => {
            res.render('details', {result: fruit} );
        })
        .catch(err => next(err));
});

// 404 handler
app.use((req,res) => {
    res.type('text/plain'); 
    res.status(404);
    res.send('404 - Not found');
});

// to start server
app.listen(app.get('port'), () => {
    console.log('Express started');    
});
console.log('HW 3')

"use strict"
import * as fruit from "./data.js";
import express from 'express';
import handlebars from "express-handlebars"

const app = express();
app.set("port", process.env.PORT || 3000);
app.use(express.static('./public')); 
app.use(express.urlencoded());
app.use(express.json());

app.engine('hbs', handlebars({defaultLayout: false}));
app.set("view engine", "hbs");

// GET requests
app.get('/', (req,res) => {
    res.render('home', {fruits: fruit.getAll()});
});

app.get('/about', (req,res) => {
    res.type('text/plain');
    res.send('About page \r\n \r\n My name is Hanan Osman. I am currently in the Web Development program at Seattle Central.');
   });

app.get('/detail', (req,res) => {
    console.log(req.query)
    let result = fruit.getItem(req.query.fruitname);
    res.render("details", {
        fruitname: req.query.fruitname, 
        result
        }
    );
});

// handle POST
app.post('/detail', (req,res) => {
    console.log(req.body)
    let found = fruit.getItem(req.body.fruitname);
    res.render("details", {fruitname: req.body.fruitname, result: found, fruits: fruit.getAll()});
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
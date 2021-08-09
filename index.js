console.log('HW 6')

"use strict"
import express from 'express';
import handlebars from "express-handlebars"
import { Fruit } from "./fruit.js";
import cors from 'cors';

const app = express();
app.set("port", process.env.PORT || 3000);
app.use(express.static('./public')); 
app.use(express.urlencoded());
app.use(express.json());

app.use('/api', cors()); // set Access-Control-Allow-Origin header for api route

app.engine('hbs', handlebars({defaultLayout: false}));
app.set("view engine", "hbs");


// GET requests

app.get('/', (req,res, next) => {
    Fruit.find({}).lean()
        .then((fruits) => {
            res.render('home', {fruits: JSON.stringify(fruits)});
        })
        .catch(err => next(err));
});

app.get('/about', (req,res, next) => {
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

app.post('/detail', (req,res, next) => {
    Fruit.findOne({ fruitname:req.body.fruitname }).lean()
        .then((fruit) => {
            res.render('details', {result: fruit} );
        })
        .catch(err => next(err));
});



// API routes

app.get('/api/fruits', (req,res) => {
    Fruit.find({}).lean()
        .then((fruits) => {
            if (fruits.length > 0) {
                res.json(fruits)
            } else {
                return res.status(500).send('Database Error occurred');
            }
        })
        .catch(err => next(err));
});

app.get('/api/fruits/detail', (req,res,next) => {
    Fruit.findOne({ fruitname:req.query.fruitname }).lean()
        .then((fruit) => {
            res.json(fruit);
        })
        .catch(err => next(err));
});

app.post('/api/fruits/detail', (req,res, next) => {
    Fruit.findOne({ fruitname:req.query.fruitname }).lean()
        .then((fruit) => {
            res.json(fruit);
        })
        .catch(err => next(err));
});

app.get('/api/fruits/delete/:id', (req,res) => {
    Fruit.deleteOne({"_id":req.params.id }, (err, result) => {
        if (err) return next(err);
        // return # of items deleted
        return res.json({"deleted": result});
    });
});

app.get('/api/fruits/add/:fruitname/:price/:quantity/:unit', (req,res, next) => {
    // find & update existing item, or add new 
    let fruitname = req.params.fruitname;
    Fruit.updateOne({ fruitname: fruitname}, {fruitname:fruitname, price: req.params.price, quantity: req.params.quantity, unit: req.params.unit }, {upsert: true }, (err, result) => {
        if (err) return next(err);
        // nModified = 0 for new item, = 1+ for updated item 
        res.json({updated: result.nModified});
    });
});

app.post('/api/fruits/add', (req,res) => {
    if (!req.body._id) { // insert new document
        let fruit = new Fruit({fruitname:req.body.fruitname,price:req.body.price,quantity:req.body.quantity,unit:req.body.unit});
        fruit.save((err,newFruit) => {
            if (err) return next(err);
            return res.json({updated: 0, _id: newFruit._id});
        });
    } else { // update existing document
        Fruit.updateOne({ _id: req.body._id}, { fruitname:req.body.fruitname, price:req.body.price, quantity:req.body.quantity, unit:req.body.unit }, (err, result) => {
            if (err) return next(err);
            return res.json({updated: result.nModified, _id: req.body._id});
        });
    }
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
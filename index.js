console.log('HW 2')

import http from 'http';
import { getAll, getItem } from './data.js';
import { parse } from "querystring";

// To start the web server
http.createServer((req,res) => {
    let url = req.url.split("?"); 
    let query = parse(url[1]);
    var path = req.url.toLowerCase();
    console.log(path);
    switch(url[0]) {
        case '/':
            let allFruits = getAll();
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end(JSON.stringify(allFruits));
            break;
        case '/detail':
            console.log(query);
            let getFruit = getItem(query.fruitname);
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end(JSON.stringify(getFruit));
            break; 
        case '/about':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('About page \r\n \r\n My name is Hanan Osman. I am currently in the Web Development program at Seattle Central.');
            break;
        default:
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('Not found');
            break;
    }
}).listen(process.env.PORT || 3000);
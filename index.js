console.log('HW 2')

import http from 'http';
import { parse } from 'querystring';
import { getAll, getItem } from './data.js';


// To start the web server
http.createServer((req,res) => {
    var path = req.url.toString();
    let url = req.url.split("?");
    let query = parse(url[1]);
    switch(path) {
        case '/':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end(JSON.stringify(getAll));
            break;
        case '/detail':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end(JSON.stringify(getItem("green grapes")));
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
const http = require('node:http');
const url = require(`url`)
const fs = require(`fs`)

http.createServer((req,res) => {

    const parsedUrl = url.parse(req.url, true);
    const queryParameters = parsedUrl.query;

    let contentType = 'text/html';
    if (parsedUrl.pathname.endsWith('.css')) {
        contentType = 'text/css';
    } else if (parsedUrl.pathname.match(/\.(png|jpg|jpeg|gif)$/)) {
        contentType = 'image/png';
    }

    let filePath = `.${parsedUrl.pathname}`;
    if (filePath === './') {
        filePath = './index.html';
    }
        
    if (queryParameters.name) {
        const name = queryParameters.name

        if (name === 'corgi') {
            filePath = './html/corgi.html';

        } else if (name === 'pride') {
            filePath = './html/pride.html';

        } else if (name === 'space') {
            filePath = './html/space.html';

        } else if (name === 'watermelon') {
            filePath = './html/watermelon.html'

        } else {
            console.log('Error: Invalid file path or request')
        }
   
    }    
    
    fs.readFile(filePath, (err, data) => {
    
        if (err) {
            res.writeHead(404);
            res.end('404 - File Not Found');


        } else {
            res.writeHead(200, { 'Content-Type': contentType});
            res.end(data);
        }
    });
}).listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
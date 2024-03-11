const http = require('node:http');
const url = require(`url`)
const fs = require(`fs`)

http.createServer((req,res) => {

    const parsedUrl = url.parse(req.url, true);

    let contentType = 'text/html';
    if (parsedUrl.pathname.endsWith('.css')) {
        contentType = 'text/css';
    } else if (parsedUrl.pathname.match(/\.(png|jpg|jpeg|gif)$/)) {
        contentType = 'image/png';
    }

    let filePath = `.${parsedUrl.pathname}`;
    if (filePath === './') {
        filePath = './index.html';
    } else {
        console.log('Error: Invalid file path or request');
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

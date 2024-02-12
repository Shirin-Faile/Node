const http = require('node:http');
const url = require(`url`)
const fs = require(`fs`)

http.createServer((req,res) => {

    //Request the URL
    const parsedUrl = url.parse(req.url, true);

    // Images and text will be read and shown on the website
    let contentType = 'text/html';
    if (parsedUrl.pathname.endsWith('.css')) {
        contentType = 'text/css';
    } else if (parsedUrl.pathname.match(/\.(png|jpg|jpeg|gif)$/)) {
        contentType = 'image/png'; //Will make it so that no matter what image you get, it will be set to png (can be changed).
    }

    //Read the requested file
    let filePath = `.${parsedUrl.pathname}`;
    if (filePath === './') {
        filePath = './index.html';
    }
    fs.readFile(filePath, (err, data) => {
        //If error happens then it will display a 404 error message
        if (err) {
            res.writeHead(404);
            res.end('404 - File Not Found');

            //if no error to be found than proceed
        } else {
            res.writeHead(200, { 'Content-Type': contentType});
            res.end(data);
        }
    });
}).listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
